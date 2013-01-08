
function loadImageIntoCanvas(file, canvasId, onsuccess) {
    if (!file.type.match('image.*')) {
        alert('Please select an image!');
        return;
    }
    var context = document.getElementById(canvasId).getContext('2d');
    var reader = new FileReader();
    reader.onload = function(event) {
        var loadedImage = new Image();
        loadedImage.onload = function() {
            context.drawImage(loadedImage, 0, 0);
            onsuccess();
        };

        loadedImage.src = event.target.result;
    };
    reader.onerror = function(event) {
        alert('error: ' + event.target.error);
    };

    reader.readAsDataURL(file);
}

function copyToAnotherCanvas(
    canvasSourceId,
    xSource,
    ySource,
    widthSource,
    heightSource,
    canvasDestinationId,
    xDestination,
    yDestination
) {
    var sourceCanvas = document.getElementById(canvasSourceId);
    if (sourceCanvas == null) {
        alert('No source canvas with such id exists.');
        return;
    }

    var destinationCanvas = document.getElementById(canvasDestinationId);
    if (destinationCanvas == null) {
        alert('No destination canvas with such id exists.');
        return;
    }

    var sourceContext = sourceCanvas.getContext('2d');
    var destinationContext = destinationCanvas.getContext('2d');
    destinationContext.putImageData(
        sourceContext.getImageData(
            xSource,
            ySource,
            widthSource,
            heightSource
        ),
        xDestination,
        yDestination
    );
}
