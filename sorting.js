// bubble sort, O(n^2) quadratic time
function bubbleSort(array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }

    return array;
}


// insertion sort, O(n^2) quadratic time
function insertionSort(array) {
    for (let i = 1; i < array.length; i++) {
        let current = array[i];
        let j = i - 1;
        while (j > -1 && current < array[j]) {
            array[j + 1] = array[j];
            j--;
        }
        array[j + 1] = current;
    }

    return array;
}


// selection sort, O(n^2) quadratic time
function selectionSort(array) {
    for (let i = 0; i < array.length; i++) {
        let min = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[min]) {
                min = j;
            }
        }
        if (min !== i) {
            [array[i], array[min]] = [array[min], array[i]];
        }
    }

    return array;
}


// merge sort, O(n log n) quasilinear time
// implemented in JavaScript's .sort() function, uses extra memory
function merge(left, right) {
    let array = [];
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            array.push(left.shift());
        }
        else {
            array.push(right.shift());
        }
    }

    return [...array, ...left, ...right];
}

function mergeSort(array) {
    const mid = array.length / 2;

    if (array.length < 2) {
        return array;
    }

    const left = array.splice(0, mid);
    return merge(mergeSort(left), mergeSort(array));
}


// quick sort, divide & conquer algorithm
function swap(array, firstIndex, secondIndex) {
    let temp = array[firstIndex];
    array[firstIndex] = array[secondIndex];
    array[secondIndex] = temp;
}

function partition(array, left, right) {
    let pivotValue = array[right];
    let partitionIndex = left;

    for (let i = left; i < right; i++) {
        if (array[i] < pivotValue) {
            swap(array, i, partitionIndex);
            partitionIndex++;
        }
    }

    swap(array, right, partitionIndex);
    return partitionIndex;
}

function quickSort(array, left = 0, right = array.length - 1) {
    if (left >= right) {
        return;
    }

    let pivotIndex = partition(array, left, right);
    quickSort(array, left, pivotIndex - 1);
    quickSort(array, pivotIndex + 1, right);

    return array;
}

function simplifiedQuickSort(array) {
    if (array.length <= 1) {
        return array;
    }
    let pivot = array[0];
    let left = array.filter(x => x < pivot);
    let right = array.filter(x => x > pivot);
    return [...quickSort(left), pivot, ...quickSort(right)];
}


// radix sort, Least Significant Digit (LSD), 
// can also be implemented with Most Significant Digit(MSD)
function getDigit(num, place) {
    return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
}

function getNumberOfDigits(num) {
    return Math.floor(Math.log10(Math.abs(num))) + 1;
}

function radixSort(array) {
    let maxDigits = 0;

    for (let i = 0; i < array.length; i++) {
        maxDigits = Math.max(maxDigits, getNumberOfDigits(array[i]));
    }

    for (let i = 0; i < maxDigits; i++) {
        let buckets = Array.from({ length: 10 }, () => []);

        for (let j = 0; j < array.length; j++) {
            let digit = getDigit(array[j], i);
            buckets[digit].push(array[j]);
        }

        array = [].concat(...buckets);
    }

    return array;
}


// gnome sort
function gnomeSort(array) {
    let i = 1;
    let j = 2;
    while (i < array.length) {
        if (array[i - 1] <= array[i]) {
            i = j;
            j++;
        }
        else {
            [array[i - 1], array[i]] = [array[i], array[i - 1]];
            i--;
            if (i === 0) {
                i = j;
                j++;
            }
        }
    }

    return array;
}


// heap sort
function heapSwap(array, i, j) {
    [array[i], array[j]] = [array[j], array[i]];
}

function siftDown(array, start, end) {
    let root = start, child, toSwap;
    while ((root * 2 + 1) <= end) {
        child = root * 2 + 1;
        toSwap = root;
        if (array[toSwap] < array[child]) {
            toSwap = child;
        }
        if (child + 1 <= end && array[toSwap] < array[child + 1]) {
            toSwap = child + 1;
        }
        if (toSwap === root) {
            return;
        }
        else {
            heapSwap(array, root, toSwap);
            root = toSwap;
        }
    }
}

function heapify(array, len) {
    let mid = Math.floor((len - 2) / 2);
    while (mid >= 0) {
        siftDown(array, mid--, len - 1);
    }
}

function heapSort(array) {
    let len = array.length;
    let end = len - 1;
    heapify(array, len);
    while (end > 0) {
        heapSwap(array, end--, 0);
        siftDown(array, 0, end);
    }

    return array;
}


// shell sort
function shellSort(array) {
    const len = array.length;
    let gap = Math.floor(len / 2);

    while (gap > 0) {
        for (let i = gap; i < len; i++) {
            let j = i;
            let current = array[i];
            while (j - gap >= 0 && current < array[j - gap]) {
                array[j] = array[j - gap];
                j = j - gap;
            }
            array[j] = current;
        }
        gap = Math.floor(gap / 2);
    }

    return array;
}


// cocktail shaker sort
function cocktailShakerSort(array) {
    let isSorted = true;
    while (isSorted) {
        for (let i = 0; i < array.length - 1; i++) {
            if (array[i] > array[i + 1]) {
                let temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                isSorted = true;
            }
        }

        if (!isSorted) {
            break;
        }

        isSorted = false;

        for (let j = array.length - 1; j > 0; j--) {
            if (array[j - 1] > array[j]) {
                let temp = array[j];
                array[j] = array[j - 1];
                array[j - 1] = temp;
                isSorted = true;
            }
        }
    }

    return array;
}


let littleArray = [123, 23815, 1231, 1235, 1, 4957, 9, 345, 79, 1, 96, 30, 29, 2394, 23489, 553, 868, 2384, 48, 23, 35, 0, 2839, 81283];
let bubbleSortedArray = bubbleSort(littleArray);

let littleArray1 = [123, 23815, 1231, 1235, 1, 4957, 9, 345, 79, 1, 96, 30, 29, 2394, 23489, 553, 868, 2384, 48, 23, 35, 0, 2839, 81283];
let insertionSortedArray = insertionSort(littleArray1);

let littleArray2 = [123, 23815, 1231, 1235, 1, 4957, 9, 345, 79, 1, 96, 30, 29, 2394, 23489, 553, 868, 2384, 48, 23, 35, 0, 2839, 81283];
let selectionSortedArray = selectionSort(littleArray2);

let littleArray3 = [123, 23815, 1231, 1235, 1, 4957, 9, 345, 79, 1, 96, 30, 29, 2394, 23489, 553, 868, 2384, 48, 23, 35, 0, 2839, 81283];
let mergeSortedArray = mergeSort(littleArray3);

let littleArray4 = [123, 23815, 1231, 1235, 1, 4957, 9, 345, 79, 1, 96, 30, 29, 2394, 23489, 553, 868, 2384, 48, 23, 35, 0, 2839, 81283];
let quickSortedArray = quickSort(littleArray4);
let littleArray5 = [123, 23815, 1231, 1235, 1, 4957, 9, 345, 79, 1, 96, 30, 29, 2394, 23489, 553, 868, 2384, 48, 23, 35, 0, 2839, 81283];
let simplifiedQuickSortedArray = simplifiedQuickSort(littleArray5);

let littleArray6 = [123, 23815, 1231, 1235, 1, 4957, 9, 345, 79, 1, 96, 30, 29, 2394, 23489, 553, 868, 2384, 48, 23, 35, 0, 2839, 81283];
let radixSortedArray = radixSort(littleArray6);

let littleArray7 = [123, 23815, 1231, 1235, 1, 4957, 9, 345, 79, 1, 96, 30, 29, 2394, 23489, 553, 868, 2384, 48, 23, 35, 0, 2839, 81283];
let gnomeSortedArray = gnomeSort(littleArray7);

let littleArray8 = [123, 23815, 1231, 1235, 1, 4957, 9, 345, 79, 1, 96, 30, 29, 2394, 23489, 553, 868, 2384, 48, 23, 35, 0, 2839, 81283];
let heapSortedArray = heapSort(littleArray8);

let littleArray9 = [123, 23815, 1231, 1235, 1, 4957, 9, 345, 79, 1, 96, 30, 29, 2394, 23489, 553, 868, 2384, 48, 23, 35, 0, 2839, 81283];
let shellSortedArray = shellSort(littleArray9);

let littleArray10 = [123, 23815, 1231, 1235, 1, 4957, 9, 345, 79, 1, 96, 30, 29, 2394, 23489, 553, 868, 2384, 48, 23, 35, 0, 2839, 81283];
let cocktailShakerSortedArray = cocktailShakerSort(littleArray10);

console.log('\nbubble sort');
console.log(bubbleSortedArray);

console.log('\ninsertion sort');
console.log(insertionSortedArray);

console.log('\nselection sort');
console.log(selectionSortedArray);

console.log('\nmerge sort');
console.log(mergeSortedArray);

console.log('\nquick sort');
console.log(quickSortedArray);
console.log('\nquick sort (simplified)');
console.log(simplifiedQuickSortedArray);

console.log('\nradix sort');
console.log(radixSortedArray);

console.log('\ngnome sort');
console.log(gnomeSortedArray);

console.log('\nheap sort');
console.log(heapSortedArray);

console.log('\nshell sort');
console.log(shellSortedArray);

console.log('\ncocktail shaker sort');
console.log(cocktailShakerSortedArray);