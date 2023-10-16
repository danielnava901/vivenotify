const Bull = require('bull');
const REDIS_URL = 'localhost:6379';
const redis = require('redis');
const clientRedis = redis.createClient();
const clientSub = redis.createClient();

const {io} = require('../server');

const reportQueue = new Bull("report_queue", {
    redis: REDIS_URL,
});

/******************************** */
clientRedis.connect().then(() => {
    console.log("cliente redis conectado");
});

clientSub.connect().then(() => {
    console.log("cliente sub redis conectado");
});
/******************************** */

clientSub.subscribe('report_completed', (message) => {
    console.log("en socketIO message antes de emit", message);
    io.emit("report_completed", message);
});


/************* Este procesa la cola de mensajes (que podría estar en otro lenguaje) ******************* */
reportQueue.process((job) => {
    let {data} = job;
    console.log("PROCESANDO JOB: ", data);
    let secs = 0;
    let interval = setInterval(() => {
        console.log("secs", secs);
        
        if(secs === 30) {
            clientRedis.publish("report_completed", JSON.stringify({id: 1, user: "dani"}));
            console.log("process completado");
            clearInterval(interval);
        }

        secs = secs + 1;
    }, 1000);

});



module.exports = {
    reportQueue,
    clientRedis
}