const myOrder = JSON.parse(localStorage.getItem('myOrder'));
console.log(myOrder)

const paraId = document.getElementById('identif');
const prenom = document.getElementById('first-name');



// AFFICHAGE DES INFORMATIONS DE CONFIRMATION


paraId.innerText = 'n° : ' + myOrder.orderId;
prenom.innerText = myOrder.contact.firstName;





