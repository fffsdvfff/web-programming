const SortingLib = {

    prepareArray(arr) {
        let hasUndefined = arr.includes(undefined);
        let clean = arr.filter(el => el !== undefined);

        if (hasUndefined) {
            console.log("Є undefined елементи, вони були видалені перед сортуванням");
        }

        return clean;
    },

    bubbleSort(arr, asc = true) {
        let comparisons = 0;
        let swaps = 0;

        let array = this.prepareArray(arr).slice();

        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                comparisons++;

                if (asc ? array[j] > array[j + 1] : array[j] < array[j + 1]) {
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    swaps++;
                }
            }
        }

        console.log("Bubble:", { comparisons, swaps });
        return array;
    },

    selectionSort(arr, asc = true) {
        let comparisons = 0;
        let swaps = 0;

        let array = this.prepareArray(arr).slice();

        for (let i = 0; i < array.length; i++) {
            let index = i;

            for (let j = i + 1; j < array.length; j++) {
                comparisons++;

                if (asc ? array[j] < array[index] : array[j] > array[index]) {
                    index = j;
                }
            }

            if (index !== i) {
                [array[i], array[index]] = [array[index], array[i]];
                swaps++;
            }
        }

        console.log("Selection:", { comparisons, swaps });
        return array;
    },

    insertionSort(arr, asc = true) {
        let comparisons = 0;
        let swaps = 0;

        let array = this.prepareArray(arr).slice();

        for (let i = 1; i < array.length; i++) {
            let key = array[i];
            let j = i - 1;

            while (j >= 0 && (asc ? array[j] > key : array[j] < key)) {
                comparisons++;
                array[j + 1] = array[j];
                swaps++;
                j--;
            }

            array[j + 1] = key;
        }

        console.log("Insertion:", { comparisons, swaps });
        return array;
    },

    shellSort(arr, asc = true) {
        let comparisons = 0;
        let swaps = 0;

        let array = this.prepareArray(arr).slice();
        let n = array.length;

        for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
            for (let i = gap; i < n; i++) {
                let temp = array[i];
                let j = i;

                while (j >= gap && (asc ? array[j - gap] > temp : array[j - gap] < temp)) {
                    comparisons++;
                    array[j] = array[j - gap];
                    swaps++;
                    j -= gap;
                }

                array[j] = temp;
            }
        }

        console.log("Shell:", { comparisons, swaps });
        return array;
    },

    quickSort(arr, asc = true) {
        let comparisons = 0;
        let swaps = 0;

        let array = this.prepareArray(arr).slice();

        function sort(a) {
            if (a.length <= 1) return a;

            let pivot = a[Math.floor(a.length / 2)];
            let left = [];
            let right = [];
            let equal = [];

            for (let el of a) {
                comparisons++;

                if (el === pivot) {
                    equal.push(el);
                } else if (asc ? el < pivot : el > pivot) {
                    left.push(el);
                } else {
                    right.push(el);
                }
            }

            return [...sort(left), ...equal, ...sort(right)];
        }

        let result = sort(array);

        console.log("Quick:", { comparisons, swaps });
        return result;
    }

};
