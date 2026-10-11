//this is middleware function that runs before response is send to client
function logger(request, response, next){
    const timeStamp = new Date().toISOString();//storing current date and time
    console.log(`[${timeStamp} ${request.method} ${request.path}]`);//displaying date, time, method and path
    next();//letting system to contniue working
}

export default logger;