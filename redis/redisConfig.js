const Bull = require('bull');
const REDIS_URL = 'localhost:6379';
const redis = require('redis');
const client = redis.createClient();


const reportQueue = new Bull("report_queue", {
    redis: REDIS_URL,
});

client.connect().then(() => {});

reportQueue.process((job) => {
    let {data} = job;
    console.log("PROCESS JOB: ", data);
    client.publish("report_completed", JSON.stringify({id: 1, user: "dani"}));
    console.log("process completado");
});


/*
reportQueue.on("message", function(channel, message) {
    console.log("tarea completada ", channel, message)
})
 */


module.exports = {
    reportQueue,
}