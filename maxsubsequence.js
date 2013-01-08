
function sumSequence(values, index, length) {
    var sum = 0;
    for (var i = index; i < length; i++) {
        sum += values[i];
    }
    return sum;
}


function findMaxSubsequenceIndex(values, width) {
    var maxSum = -1, maxIndex = 0;
    if (values.length <= width) {
        return 0;
    }

    maxSum = sumSequence(values, 0, width);
    maxIndex = 0;

    var currentSum = maxSum;
    var length = values.length;
    for (var index = width; index < length; index++) {
        currentSum += values[index] - values[index - width];
        /* we tend to prefer images on the left */
        if (currentSum > maxSum) {
            maxSum = currentSum;
            maxIndex = index - 1;
        }

    }
    
    return maxIndex;
}

