const {ProcessRequest} = require('./helper')
const express = require('express')

const app = express() 

app.use(express.json());


app.get("/mean", (req, res) =>{

    let process_request = new ProcessRequest(req.query.nums)
    response = process_request.mean();

    if(req.query.save)
        process_request.save_in_file(JSON.stringify({response}));

    return res.json({response});

});

app.get("/median", (req, res) =>{

    let process_request = new ProcessRequest(req.query.nums)
    response = process_request.median();

    if(req.query.save)
        process_request.save_in_file(JSON.stringify({response}));

    return res.json({response});
    

});

app.get("/mode", (req, res) =>{

    let process_request = new ProcessRequest(req.query.nums)
    response = process_request.mode();

    if(req.query.save)
        process_request.save_in_file(JSON.stringify({response}));

    return res.json({response});

});

app.get("/all", (req, res) =>{

    let process_request = new ProcessRequest(req.query.nums)
    response = process_request.all();

    if(req.query.save)
        process_request.save_in_file(JSON.stringify({response}));

    return res.json({response});
   
});

app.use((req, res, next) => {

    return next({'Page not found': '404 bad request'});

});

app.use((error, req, res, next) => {

    let response = error;
    return res.json({response});

});


const server  = app.listen(3000, () => {
                    console.log('Server started on port 3000.');
                });


module.exports = {app, server}