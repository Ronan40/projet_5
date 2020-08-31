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

