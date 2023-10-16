const express = require('express');
const router = express.Router();
const {reportQueue} = require("../../redis/redisConfig");

router.get('/', async (req, res) => {

    res.render('dashboard/reports');
});


router.get('/getReport', async (req,
                 res) => {

    reportQueue.add({ id: 1, name: "proc", a: "lalala" });


    res.send({
        code: 200,
        data: [

        ],
        status: "Reporte solicitado, deberá esperar 60seg"
    });
});

module.exports =  router;