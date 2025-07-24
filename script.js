const randomNumbers = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10) + 1);
const sortedNumbers = Array.from({ length:100 }, (_, i) => i + 1);
const arrayContainer = document.getElementById('arrayContainer');

function displayArray(array) {
    // displays the array of numbers
    arrayContainer.innerHTML = '';
    array.forEach((num, index) => {
        const item = document.createElement('div');
        item.classList.add('array-item');
        item.textContent = num;
        item.id = 'item-' + index;
        arrayContainer.appendChild(item);
    });
}

displayArray(sortedNumbers);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function linearSearch(array, target) {

    // Linear search. Itterates over each index until the target is found and returned.
    for (let i = 0; i < array.length; i++) {
        const item = document.getElementById('item-' + i);

        item.classList.add('highlight');
        await sleep(500);

        if (array[i] == target) {
            item.classList.remove('highlight');
            item.classList.add('found');
            return i;
        } else {
            item.classList.remove('highlight');
        }
    }
    alert(`Target not found`)
}

async function binarySearch(array, target) {

    // Binary search. Itterates through a set of sorted numbers.
    // Reducing the size of the searchable numbers if the target is higher or lower than initial guess.
   
    let low = 0
    let high = array.length - 1

    while (low <= high) {

        for (let i = 0; i < array.length; i++) {
            const item = document.getElementById('item-' + i);
            if (i < low || i > high) {
                item.classList.add('inactive');
            } else {
                item.classList.remove('inactive');
            }
        }

        const mid = Math.floor((low + high) / 2);
        const item = document.getElementById('item-' + mid);

        item.classList.add('highlight');
        await sleep(1000);

        if (array[mid] === target) {
            item.classList.remove('highlight');
            item.classList.add('found');
            return mid;
        } else {
            item.classList.remove('highlight');
            if (array[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1
            }
        }
    }
    return -1;
}

async function bubbleSort(array) {

    // sorts an unsorted array from lowest to highest.
    // moves the highest number to the last index untill all numbers are sorted.

    const len = array.length;

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < (array.length - i - 1); j++) {
            const item1 = document.getElementById('item-' + j);
            const item2 = document.getElementById('item-' + (j + 1));

            item1.classList.add('highlight');
            item2.classList.add('highlight');

            await sleep(1000);

            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                swapDOMElements(item1, item2);

                item1.id = 'temp';
                item2.id = 'item-' + j;
                item1.id = 'item-' + (j + 1);

            }
            item1.classList.remove('highlight');
            item2.classList.remove('highlight');
        }
        const sortedItem = document.getElementById('item-' + (len - i - 1));
        sortedItem.classList.add('found');
    }
    return -1;
}

async function selectionSort(array) {

    // itterates through an unsorted array looking for the lowest number index.
    // moves the lowest number to the first index until all numbers are sorted from lowest to highest.

    const size = array.length;

    for (let i = 0; i < size; i++) {
        let min_index = i;

        for (let j = i + 1; j < size; j++) {
            // Highlight compared items
            const item1 = document.getElementById('item-' + min_index);
            const item2 = document.getElementById('item-' + j);

            item1.classList.add('highlight');
            item2.classList.add('highlight');

            await sleep(1000);

            if (array[j] < array[min_index]) {
                min_index = j;
            }

            item1.classList.remove('highlight');
            item2.classList.remove('highlight');
        }

        if (min_index !== i) {
            // Swap in the array
            let temp = array[i];
            array[i] = array[min_index];
            array[min_index] = temp;

            // Re-render the whole array to reflect new order
            displayArray(array);
            await sleep(1000); // Small delay to show updated swap
        }

        // Mark sorted item
        const sortedItem = document.getElementById('item-' + i);
        sortedItem.classList.add('found');
    }
}



function swapDOMElements(el1, el2) {

    // swaps two elements assuming both have the same parent.

    const parent = el1.parentNode;
    const nextSibling = el2.nextSibling;
    if(nextSibling === el1) {
        parent.insertBefore(el1, el2);
    } else {
        parent.insertBefore(el2, el1);
    }
}

// event listeners for each of the search and sort buttons

document.getElementById('linearSearch').addEventListener('click', () => {
    const target = parseInt(prompt('Enter a target: '), 10);
    if (!isNaN(target)) {
        linearSearch(sortedNumbers, target);
    } else {
        alert('Invalid input');
    }
});

document.getElementById('binarySearch').addEventListener('click', () => {
    const target = parseInt(prompt('Enter a target: '), 10);
    if (!isNaN(target)) {
        binarySearch(sortedNumbers, target);
    } else {
        alert('Invalid Input');
    }
});

document.getElementById('bubbleSort').addEventListener('click', () => {
    const randomNumbers = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100) + 1);
    displayArray(randomNumbers);
    bubbleSort(randomNumbers);
})

document.getElementById('selectionSort').addEventListener('click', () => {
    const randomNumbers = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100) + 1);
    displayArray(randomNumbers);
    selectionSort(randomNumbers);
})
