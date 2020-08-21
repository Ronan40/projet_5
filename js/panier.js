const orderJson = localStorage.getItem('newOrder');

const orderParse = orderJson && JSON.parse(orderJson);

let totaux = 0

orderParse.forEach(function (order) {

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

