(() => {

    "use strict";

    let myOrder = JSON.parse(localStorage.getItem('myOrder'));
    

    // Une constante est créée afin de récupérer les informations dans le local storage et les parse.

    const paraId = document.getElementById('identif');
    const prenom = document.getElementById('first-name');
    const priceTo = document.getElementById('price-total');

    paraId.innerText = 'n° : ' + myOrder.orderId; // On affiche l'ID de la commande.
    prenom.innerText = myOrder.contact.firstName;
    priceTo.innerText = myOrder.contact.prix;

    // Un event est créé afin de vider le local storage
    myOrder = localStorage.clear();

})();

