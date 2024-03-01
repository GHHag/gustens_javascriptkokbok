import fetch from 'node-fetch';

// Synchronous
console.log('synchronous 1');

// Macrotask
setTimeout(_ => console.log('timeout 2'), 0);

// Microtask
Promise.resolve().then(_ => console.log('promise'));

// Synchronous
console.log('synchronous 4');


////////////////////////////////////////////////////////////////////////

const promise = fetch('https://jsonplaceholder.typicode.com/todos/1');

promise
		.then(res => res.json())
		/*.then(user => {
				throw new Error('error');
				return user;
		})*/
		.then(user => console.log(user))
		.catch(err => console.error(err));

////////////////////////////////////////////////////////////////////////

const tick = Date.now();
const log = (v) => console.log(`${v} \n Elapsed: ${Date.now() - tick}`);

const codeBlocker = () => {
	let i = 0;
	while(i < 1_000_000_000) { i++; }

	return 'billion loops done';
}

console.log('synchronous 5');

log(codeBlocker());

log('synchronous 6');

// Wrapped in a Promise
const codeBlocker2 = ()  => {
		return new Promise((resolve, reject) => {
				let i = 0;
				while(i < 1_000_000_000){ i++;  }

				resolve('billion loops done');
		});
}

console.log('synchronous 7');

codeBlocker2().then(log);

log('synchronous 8');

const codeBlocker3 = ()  => {
		return Promise.resolve().then(v => {
				let i = 0;
				while(i < 1_000_000_000){ i++;  }
				return('billion loops done');
		});
}

console.log('synchronous 9');

codeBlocker3().then(log);

log('synchronous 10');

////////////////////////////////////////////////////////////////////////

// async functions returns a Promise
// When you use the async keyword, the return value is resolved as a Promise.
const getPromise = async() => {
		return 'hello';
}

// equal function without using async
const getPromise2 = () => {
		return Promise.resolve('hello');
}

getPromise().then(console.log);
getPromise2().then(console.log);

/*
async also sets up a context for using the await keyword. The real power of
and async function comes when you combine it with the await keyword to pause
the execution of the function. 
You really only need to await one thing after the other if the second value
is dependant on the first value.
*/
const f = async() => {
		const hello = await getPromise();
		const hello2 = await getPromise();

		//return [hello, hello2];

		/*
		We know that an async function always returns a promise, so instead
		of doing one after the other, we can add both of our promises to 
		Promise.all(). This will make all the promises in the array run
		concurrently and then have the resolved values be at that index in
		the array.
		*/
		//return Promise.all([hello, hello2]);

		// Instead of awaiting multiple individual promises, you might want to
		// add all of your promises to an array and then await the Promise.all()
		const hellos = Promise.all([hello, hello2]);

		return hellos;
}

// equal function without async and await
const f2 = () => {
		let hello;
		return getPromise()
			.then(v => {
					v = hello;
					return getPromise()
			})
			.then(v => [v, hello]);
}

/*
If you want to run a loop and have every iteration await a Promise you need to
use a traditional for loop. When you write your code like this it will pause at
each iteration of the loop until that Promise is resolved.
*/
const helloLoop = async() => {
		for(let i = 0; i < 5; i++){
				const hello = await getPromise();
				log(hello);
		}
}

helloLoop();

const helloLoop2 = async() => {
		for await(const promise of [getPromise(), getPromise()]) {
				log(promise);
		}
}

helloLoop2();
