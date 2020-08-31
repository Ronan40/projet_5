(() => {

    "use strict";

    const ident = localStorage.getItem("openclassroomsp5_camId") // On récupere l'ID stocker dans le local storage.


    request('GET', 'https://oc-p5-api.herokuapp.com/api/cameras/' + ident, null).then(function (camera) {

        // On crée des éléments HTML afin de pouvoir positioner le produit sur la page détail.

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
        $titleProduct.style.fontFamily = 'Blue Spirits';
        $titleProduct.innerText = camera.name;

        const $descript = document.createElement('p');
        $descript.className = "descript"
        $descript.style.fontFamily = 'Kaushan Script';
        $descript.innerText = camera.description;

        const $priceDiv = document.createElement('div');
        $priceDiv.className = "m-bot15";

        const $priceSpan = document.createElement('span');
        $priceSpan.className = "pro-price";
        $priceSpan.style.fontFamily = 'VintageOne';
        $priceSpan.innerText = "Prix : " + camera.price + " €";

        const $quantiDiv = document.createElement('div');
        $quantiDiv.className = "form-group";

        const $quantiLab = document.createElement('label');
        $quantiLab.innerText = "Quantité :";
        $quantiLab.style.fontFamily = 'Kaushan Script';
        $quantiLab.className = "quanti"

        const $quantInput = document.createElement('input');
        $quantInput.type = "number";
        $quantInput.placeholder = "1";
        $quantInput.required = true;
        $quantInput.style.fontFamily = 'Kaushan Script';
        $quantInput.className = "form-control quantity";

        const $paraButton = document.createElement('p');

        const $buttonProd = document.createElement('button');
        $buttonProd.className = "btn btn-round btn-danger";
        $buttonProd.type = 'button';
        $buttonProd.innerText = ' Panier ';
        $buttonProd.style.fontFamily = 'Kaushan Script';

        const $iButton = document.createElement('i');
        $iButton.className = "fa fa-shopping-cart";

        const $lenseLab = document.createElement('label');
        $lenseLab.innerText = 'Choix de la lentille :';
        $lenseLab.style.fontFamily = 'Kaushan Script';
        $lenseLab.className = 'lenselab';

        const $lenses = document.createElement('select');

        // Un forEach est créé afin de parcourir et générer chaque lentille existante.

        camera.lenses.forEach(lense => {
            const $option = document.createElement('option');
            $option.value = lense;
            $option.innerText = lense;

            $lenses.appendChild($option);
        });

        const $erreur = document.createElement('p')

        $mainDiv.appendChild($colDiv);
        $mainDiv.appendChild($colDiv2);
        $mainDiv.appendChild($erreur);

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


        $buttonProd.addEventListener('click', function () {

            // Un addEventListener est attribué au bouton "panier".

            // Ces "if" demande si le champ quantité est bien supérieur à 0,
            // si non, il retourne un message d'erreur

            var erreur;

            if ($quantInput.value < 1) {
                erreur = 'Veuillez renseigner le champ "quantité" !';
            };

            if (erreur) {
                document.getElementById("erreur").innerHTML = erreur;
                return false;
            } else {

            };

            // Un tableau d'objet est créé afin de pouvoir stocker seulement les détails de chaque produit voulus.
            const order = {
                price: camera.price,
                name: camera.name,
                id: camera._id,
                quantity: parseInt($quantInput.value)
            };

            let orders = localStorage.getItem("openclassroomsp5_newOrder");

            if (!orders) {
                orders = [order]
            } else {
                orders = JSON.parse(orders)

                const index = orders.findIndex(element => element.id == camera._id)
                if (index > -1) {
                    orders[index].quantity += parseInt($quantInput.value)

                } else {
                    orders.push(order)
                }
            }

            const stringOrder = JSON.stringify(orders);
            localStorage.setItem('openclassroomsp5_newOrder', stringOrder);

            window.location.href = '../html/panier.html'; // Redirige vers la page panier.

            // Ce "if-else" demande confirmation à l'utilisateur sur sa commande

            if (confirm('Veuillez confirmer votre sélection ?')) {
                window.location.href = '../html/panier.html';
            } else {
                window.location.href = '../html/produit.html';
                localStorage.removeItem('openclassroomsp5_newOrder')
            };
        });

    });

})();



