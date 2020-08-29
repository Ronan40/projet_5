const orderJson = localStorage.getItem('openclassroomsp5_newOrder'); // On récupere les éléments stockés

const orderParse = orderJson && JSON.parse(orderJson); // On vérifie si "orderJson" existe, si oui, on le "parse"

const prenom = document.getElementById('first-name');
const nom = document.getElementById('last-name');
const ville = document.getElementById('city');
const adresse = document.getElementById('address');
const email = document.getElementById('email');
const submit = document.getElementById('submit');

let totaux = 0 

orderParse.forEach(function (order) {

    // Un forEach est mis en place afin de créer autant de containeur qu'il y a de produit sélectionné.

    const $trContain = document.createElement('tr');

    const $tdProd = document.createElement('td');

    const $strongProd = document.createElement('strong');
    $strongProd.innerText = order.name;
    $strongProd.style.fontFamily = 'Blue Spirits';
    $strongProd.style.fontSize = '20px';

    const $tdForm = document.createElement('td');

    const $form = document.createElement('form');
    $form.className = "form-inline";

    const $input = document.createElement('input');
    $input.className = "form-control";
    $input.type = 'text';
    $input.style.fontFamily = 'Kaushan Script';
    $input.value = order.quantity;

    const $aButton = document.createElement('a');
    $aButton.className = "btn btn-primary trash";

    const $iButton = document.createElement('i');
    $iButton.className = "fa fa-trash-o";

    const $tdPrice = document.createElement('td');
    $tdPrice.id = 'td-price';
    $tdPrice.innerText = order.price + ' €';
    $tdPrice.style.fontFamily = 'VintageOne';
    $tdPrice.style.fontSize = '20px';

    const $tdTotal = document.createElement('td');

    const totalPrice = order.price * order.quantity;
    $tdTotal.id = 'td-total';
    $tdTotal.style.fontFamily = 'VintageOne';
    $tdTotal.style.fontSize = '20px';

    $tdTotal.innerText = totalPrice + ' €';

    totaux += totalPrice;
    

    $trContain.appendChild($tdProd);
    $trContain.appendChild($tdForm);
    $trContain.appendChild($tdPrice);
    $trContain.appendChild($tdTotal);

    $tdProd.appendChild($strongProd);

    $tdForm.appendChild($form);

    $form.appendChild($input);
    $form.appendChild($aButton);

    $aButton.appendChild($iButton);

    const $tbody = document.getElementById('tbody');

    $tbody.appendChild($trContain);

    $aButton.addEventListener('click', function () {

        // On fait en sorte que le bouton corbeille supprime le produit correspondant à celui cliqué.

        const index = orderParse.findIndex(element => element.id == order.id);

        orderParse.splice(index, 1);

        localStorage.setItem('openclassroomsp5_newOrder', JSON.stringify(orderParse));

        $tbody.removeChild($trContain);

        totaux -= totalPrice;

        $subTotal.innerText = 'Total : ' + totaux + ' €';
        
    });
    
});

const py2 = document.getElementById('py-2');

const $subTotal = document.createElement('span');
$subTotal.innerText = 'Total : ' + totaux + ' €';

py2.appendChild($subTotal);

document.getElementById('formu').addEventListener('submit', function (e) {

   // Cet event est appliqué au bouton 'submit' qui enverra les informations de la commande.

    e.preventDefault();

    var erreur;

    var inputs = document.getElementsByTagName("input");

    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].value.trim().length === 0) {
            erreur = "Veuillez renseigner tous les champs";
            break;
        };
    }

    if (erreur) {
        document.getElementById("erreur").innerHTML = erreur;
        return false;
    } else {

    };

    const orderForm = {
        contact: {
            firstName: prenom.value,
            lastName: nom.value,
            address: adresse.value,
            city: ville.value,
            email: email.value
        },
        products: [],
    }; // On stock dans un objet les informations recueillies dans le formulaire.

    orderParse.forEach(function (element) {
        for (let i = 0; i < element.quantity; i++) {
            orderForm.products.push(element.id);
        }
    }); // un For est imbriqué dans un forEach afin d'insérer l'ID de chaque produit dans le tableau 'products'.

    request('POST', 'http://localhost:3000/api/cameras/order', orderForm).then(function (resultOrder) {

        const finalOrder = JSON.stringify(resultOrder); // On transforme cet objet en chaine de caractère
        localStorage.setItem('myOrder', finalOrder);

        window.location.href = '../html/confirmation.html';
    });

});






