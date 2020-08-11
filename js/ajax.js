function request(reqtype, url, toSend, callback) {
    const xhr = new XMLHttpRequest();

    xhr.open(reqtype, url);
    let jsonToSend = null;
    if (reqtype == 'POST' && toSend) {
        jsonToSend = JSON.stringify(toSend);
    }
    xhr.send(jsonToSend);
    xhr.addEventListener('load', function () {

        const parseResult = JSON.parse(xhr.response);

        callback(parseResult);


    });
}


