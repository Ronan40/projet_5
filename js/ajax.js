function request(reqtype, url, toSend) {

    return new Promise(resolve => {
        const xhr = new XMLHttpRequest();

        xhr.open(reqtype, url);
        let jsonToSend = null;
        if (reqtype == 'POST' && toSend) {
            xhr.setRequestHeader('Content-Type', 'application/json');
            jsonToSend = JSON.stringify(toSend);
        }
        xhr.send(jsonToSend);
        xhr.addEventListener('load', () => {

            const parseResult = JSON.parse(xhr.response);

            resolve(parseResult);

        });

    })

}

/*function request(reqtype, url, toSend, callback) {
    const xhr = new XMLHttpRequest();

    xhr.open(reqtype, url);
    let jsonToSend = null;
    if (reqtype == 'POST' && toSend) {
        xhr.setRequestHeader('Content-Type', 'application/json');
        jsonToSend = JSON.stringify(toSend);
    }
    xhr.send(jsonToSend);
    xhr.addEventListener('load', function () {

        const parseResult = JSON.parse(xhr.response);

        callback(parseResult);


    });
} */
