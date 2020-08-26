const orderJson = localStorage.getItem('newOrder'); // On récupere les éléments stockés

const orderParse = orderJson && JSON.parse(orderJson); // On vérifie si "orderJson" existe, si oui, on le "parse"

const prenom = document.getElementById('first-name');
const nom = document.getElementById('last-name');
const ville = document.getElementById('city');
const adresse = document.getElementById('address');
const email = document.getElementById('email');
const submit = document.getElementById('submit');


let totaux = 0

orderParse.forEach(function (order) {

    // Ce forEach sert à mettre en place un container qui contiendra chaque produit

    const $trContain = document.createElement('tr');

    const $tdProd = document.createElement('td');

    const $strongProd = document.createElement('strong');
    $strongProd.innerText = order.name;

    const $tdForm = document.createElement('td');

    const $form = document.createElement('form');
    $form.className = "form-inline";

    const $input = document.createElement('input');
    $input.className = "form-control";
    $input.type = 'text';
    $input.value = order.quantity;

    const $button = document.createElement('button');
    $button.rel = "tooltip";
    $button.className = "btn btn-default";

    const $iPen = document.createElement('i');
    $iPen.className = "fa fa-pencil";

    const $aButton = document.createElement('a');
    $aButton.className = "btn btn-primary";

    const $iButton = document.createElement('i');
    $iButton.className = "fa fa-trash-o";

    const $tdPrice = document.createElement('td');
    $tdPrice.id = 'td-price';
    $tdPrice.innerText = order.price + ' €';

    const $tdTotal = document.createElement('td');

    const totalPrice = order.price * order.quantity;
    $tdTotal.id = 'td-total';

    $tdTotal.innerText = totalPrice + ' €';

    totaux += totalPrice;


    $trContain.appendChild($tdProd);
    $trContain.appendChild($tdForm);
    $trContain.appendChild($tdPrice);
    $trContain.appendChild($tdTotal);

    $tdProd.appendChild($strongProd);

    $tdForm.appendChild($form);

    $form.appendChild($input);
    $form.appendChild($button);
    $form.appendChild($aButton);

    $button.appendChild($iPen);

    $aButton.appendChild($iButton);

    const $tbody = document.getElementById('tbody');

    $tbody.appendChild($trContain);



    $aButton.addEventListener('click', function () {

        // On fait en sorte que le bouton corbeille supprime le produit correspondant à celui-ci

        const index = orderParse.findIndex(element => element.id == order.id);

        orderParse.splice(index, 1);

        localStorage.setItem('newOrder', JSON.stringify(orderParse));

        $tbody.removeChild($trContain);

        totaux -= totalPrice;

        $subTotal.innerText = 'Total : ' + totaux + ' €';

        console.log(orderParse)
    });

});

const py2 = document.getElementById('py-2');

const $subTotal = document.createElement('span');
$subTotal.innerText = 'Total : ' + totaux + ' €';

py2.appendChild($subTotal);


document.getElementById('formu').addEventListener('submit', function (e) {
   
    e.preventDefault();

    var erreur;

    var inputs = document.getElementsByTagName("input");

    for (var i = 0; i < inputs.length; i++) {
        if(inputs[i].value.trim().length === 0){
            erreur = "Veuillez renseigner tous les champs";
            break;
        };
    }

    if(erreur) {
       
        document.getElementById("erreur").innerHTML = erreur;
        return false;
    } else {
        alert('formulaire envoyé')

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
    };
    
    orderParse.forEach(function (element) {
        for (let i = 0; i < element.quantity; i++) {
            orderForm.products.push(element.id);
        }
    });
    
    request('POST', 'http://localhost:3000/api/cameras/order', null, function(){

    });

    window.location.href = "../html/confirmation.html";

});






