import { AsyncRequestQueue } from './AsyncRequestQueue.mjs';

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const q = new AsyncRequestQueue();

function promiseFactory(index) {
    return async () => {
        const wait = getRandomNumber(1000, 5000);
        console.log(`Running task ${index} - waiting for ${wait / 1000} seconds`);
        await new Promise(r => setTimeout(r, wait));
        console.log(`Finished task ${index} - Waiting for ${wait / 1000} seconds`);
    }
}

q.enqueue(promiseFactory(1));
q.enqueue(promiseFactory(2));
q.enqueue(promiseFactory(3));
q.enqueue(promiseFactory(4));
q.enqueue(promiseFactory(5));
q.enqueue(promiseFactory(6));
q.enqueue(promiseFactory(7));