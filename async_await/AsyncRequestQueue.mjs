export class AsyncRequestQueue {

	constructor() {
		this.queue = [];
		this.runningTasks = 0;
		this.maxConcurrentTasks = 3;
	}

	enqueue(promiseFactory) {
		const task = async () => {
			this.runningTasks++;
			try {
				await promiseFactory();
			}
			finally {
				this.runningTasks--;
				this.tryToExecute();
			}
		}

		if (this.runningTasks < this.maxConcurrentTasks) {
			task();
		}
		else {
			this.queue.push(task);
		}
	}

	tryToExecute() {
		if (this.queue.length === 0 || this.runningTasks >= this.maxConcurrentTasks) {
			return;
		}

		const nextTask = this.queue.shift();

		nextTask();
	}

}
