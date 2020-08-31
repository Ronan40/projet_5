(() => {

    "use strict";

    const myOrder = JSON.parse(localStorage.getItem('myOrder'));

    // Une constante est créée afin de récupérer les informations dans le local storage et les parse.

    const paraId = document.getElementById('identif');
    const prenom = document.getElementById('first-name');

    paraId.innerText = 'n° : ' + myOrder.orderId; // On affiche l'ID de la commande.
    prenom.innerText = myOrder.contact.firstName;

    // Un event est créé afin de vider le local storage

    document.getElementById('a-clear').addEventListener('click', function () {
        localStorage.clear();
    });

    document.getElementById('a-home').addEventListener('click', function () {
        localStorage.clear();
    });

    document.getElementById('a-nav').addEventListener('click', function () {
        localStorage.clear();
    });

})();

