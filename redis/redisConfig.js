const Bull = require('bull');
const REDIS_URL = 'localhost:6379';

const reportQueue = new Bull("report_queue", {
    redis: REDIS_URL,
});

reportQueue.process((job) => {
    let {data} = job;
    console.log("PROCESS JOB: ", data);
});


module.exports = {
    reportQueue,
}