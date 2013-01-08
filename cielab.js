
var REF_X = 95.047;
var REF_Y = 100;
var REF_Z = 108.883;

function colorTransformation(color) {
    if (color > 0.04045) {
        color = Math.pow((color + 0.055) / 1.055, 2.4);
    } else {
        color /= 12.92;
    }

    return color * 100;
}

function getY(r, g, b) {
    /* color components go from 0 to 255 */
    r = colorTransformation(r / 255);
    g = colorTransformation(g / 255);
    b = colorTransformation(b / 255);

    return r * 0.2126 + g * 0.7152 + b * 0.0722;
}

function pixelIntensity(r, g, b) {
    /* we only need the Y component for the intensity calculation */
    var y = getY(r, g, b) / REF_Y;
    if (y > 0.008856) {
        y = Math.pow(y, 1 / 3);
    } else {
        y = 7.787 * y + 16 / 116;
    }

    return 116 * y - 16;
}

