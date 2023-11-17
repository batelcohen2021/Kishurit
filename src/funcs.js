export function divideArrayBySetsOfN(array, n = 3) {
    return !(array instanceof Array) ? [] : array?.reduce((arr, curr, i) => {
        if (i % n === 0) arr.push([]);
        arr[arr.length - 1].push(curr);
        return arr;
    }, [])
}
