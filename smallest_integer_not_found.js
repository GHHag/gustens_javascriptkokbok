function find_smallest_int_not_in_arr(arr) {
	arr = arr.sort(compareNumbers);
	let smallest_int = arr[0];
	console.log(arr);
	for (let i = 0; i < arr.length; i++) {
		if (smallest_int < arr[i]) {
			return smallest_int;
		}
		else {
			smallest_int += 1;
		}
	}
	return smallest_int;
}

function compareNumbers(a, b){
	return a - b;
}

let x = find_smallest_int_not_in_arr([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
console.log(x);
let y = [1, 4, 3, 10, 8, 2, 7, 6, 11, 12, 9, 13];
let z = find_smallest_int_not_in_arr(y);
console.log(z);
y.push(5)
console.log(find_smallest_int_not_in_arr(y));
