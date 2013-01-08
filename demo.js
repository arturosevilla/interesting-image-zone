
if (window.FileReader === undefined) {
    alert('Screen on fire! HTML5 not supported');
}

function locateInterestingZone() {
    var txtWidth = document.getElementById('txtWidth');
    var txtHeight = document.getElementById('txtHeight');
    var desiredWidth = Number(txtWidth.value);
    var desiredHeight = Number(txtHeight.value);
    var inputFile = document.getElementById('inputImageFile');
    if (isNaN(desiredWidth) || isNaN(desiredHeight)) {
        alert('Desired width or height is wrong -_-!');
        return;
    }

    var destinationCanvas = document.getElementById('interestingCanvas');
    destinationCanvas.width = desiredWidth;
    destinationCanvas.height = desiredHeight;

    loadImageIntoCanvas(
        inputFile.files[0],
        'sourceCanvas',
        function() {
            var zone = getInterestingZone(
                'sourceCanvas',
                desiredWidth,
                desiredHeight
            );

            copyToAnotherCanvas(
                'sourceCanvas',
                zone[0],
                zone[1],
                desiredWidth,
                desiredWidth,
                'interestingCanvas',
                0,
                0
            );
        }
    );

}
