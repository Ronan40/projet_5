const ident = localStorage.getItem("openclassroomsp5")

request('GET', 'http://localhost:3000/api/cameras/' + ident, null, function (camera) {

    const $mainDiv = document.createElement('div');
    $mainDiv.className = "panel-body";

    const $colDiv = document.createElement('div');
    $colDiv.className = 'col-8';

    const $imgDiv = document.createElement('div');
    $imgDiv.className = 'pro-img-details';

    const $imgProduct = document.createElement('img');
    $imgProduct.alt = 'appareil photo';
    $imgProduct.src = camera.imageUrl;

    const $colDiv2 = document.createElement('div');
    $colDiv2.className = 'col-lg-12';

    const $titleProduct = document.createElement('h4');
    $titleProduct.className = 'pro-d-title';
    $titleProduct.innerText = camera.name;

    const $descript = document.createElement('p');
    $descript.className = "descript"
    $descript.innerText = camera.description;

    const $priceDiv = document.createElement('div');
    $priceDiv.className = "m-bot15";

    const $priceSpan = document.createElement('span');
    $priceSpan.className = "pro-price";
    $priceSpan.innerText = "Prix : " + camera.price + " €";

    const $quantiDiv = document.createElement('div');
    $quantiDiv.className = "form-group";

    const $quantiLab = document.createElement('label');
    $quantiLab.innerText = "Quantité :";
    $quantiLab.className = "quanti"

    const $quantInput = document.createElement('input');
    $quantInput.type = "quantibut";
    $quantInput.placeholder = "1";
    $quantInput.className = "form-control quantity";

    const $paraButton = document.createElement('p');
    
    const $buttonProd = document.createElement('button');
    $buttonProd.className = "btn btn-round btn-danger";
    $buttonProd.type = 'button';
    $buttonProd.innerText = ' Panier ';

    const $iButton = document.createElement('i');
    $iButton.className = "fa fa-shopping-cart";

    const $lenseLab = document.createElement('label');
    $lenseLab.innerText = 'Choix de la lentille :';
    $lenseLab.className = 'lenselab';

    const $lenses = document.createElement('select');
    
    
    camera.lenses.forEach(lense => {
        const $option = document.createElement('option');
        $option.value = lense;
        $option.innerText = lense;
    
        $lenses.appendChild($option);
    });


    $mainDiv.appendChild($colDiv);
    $mainDiv.appendChild($colDiv2);

    $colDiv.appendChild($imgDiv);
    $imgDiv.appendChild($imgProduct);

    $colDiv2.appendChild($titleProduct);
    $colDiv2.appendChild($descript);
    $colDiv2.appendChild($priceDiv);

    $priceDiv.appendChild($priceSpan);

    $colDiv2.appendChild($lenseLab);
    $colDiv2.appendChild($quantiDiv);
   

    $lenseLab.appendChild($lenses);

    $quantiDiv.appendChild($quantiLab);
    $quantiDiv.appendChild($quantInput);
   
    $colDiv2.appendChild($paraButton);

    $paraButton.appendChild($buttonProd);
    $buttonProd.appendChild($iButton);

    document.getElementById('panel').appendChild($mainDiv)
    

    console.log(camera);


});





