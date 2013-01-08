
var RED_OFFSET = 0;
var GREEN_OFFSET = 1;
var BLUE_OFFSET = 2;

function clearSequence(sequence, size) {
    for (var i = 0; i < size; i++) {
        sequence[i] = 0;
    }
}

function getPixelLocation(imageData, x, y) {
    return y * imageData.width * 4 + x * 4
}

function getIntensity(imageData, x, y) {
    var pixelBase = getPixelLocation(imageData, x, y);
    /* getY returns a value between 0 and 255 */
    return Math.round(getY(
        imageData.data[pixelBase + RED_OFFSET],
        imageData.data[pixelBase + GREEN_OFFSET],
        imageData.data[pixelBase + BLUE_OFFSET]
    ));
}

function calculateHistogramPerImage(imageData) {
    var histogram = new Array(256);
    clearSequence(histogram, 256);

    var width = imageData.width;
    var height = imageData.height;

    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            histogram[getIntensity(imageData, x, y)]++;
        }
    }

    // normalize
    var sum = sumSequence(histogram, 0, 256);
    for (var i = 0; i < 256; i++) {
        histogram[i] /= sum;
    }

    return histogram;
}

function getEstimates(imageData, histogram) {
    var width = imageData.width;
    var height = imageData.height;

    var estimatedByX = new Array(width);
    var estimatedByY = new Array(height);
    clearSequence(estimatedByX, width);
    clearSequence(estimatedByY, height);

    for (var x = 0; x < width; x++) {
        for(var y = 0; y < height; y++) {
            var intensity = getIntensity(imageData, x, y);
            var p = -Math.log(histogram[intensity]);

            estimatedByX[x] += p;
            estimatedByY[y] += p;
        }
    }

    return [estimatedByX, estimatedByY];
}

function getInterestingZone(canvasId, width, height) {
    var canvas = document.getElementById(canvasId);
    if (canvas === null) {
        alert('Could not find canvas');
        return;
    }

    var context = canvas.getContext('2d');
    var imageWidth = canvas.width;
    var imageHeight = canvas.height;
    var xCoord = -1;
    var yCoord = -1;

    if (imageWidth <= width) {
        xCoord = 0;
    }
    if (imageHeight <= height) {
        yCoord = 0;
    }

    if (xCoord < 0 || yCoord < 0) {
        var imageData = context.getImageData(0, 0, imageWidth, imageHeight);
        var histogram = calculateHistogramPerImage(imageData);
        var estimates = getEstimates(imageData, histogram);
        
        if (xCoord < 0) {
            xCoord = findMaxSubsequenceIndex(estimates[0], width);
        }
        
        if (yCoord < 0) {
            yCoord = findMaxSubsequenceIndex(estimates[1], height);
        }
    }

    return [xCoord, yCoord];
}

