
const inner = document.querySelector('.carousel-inner'); 

// On utilise la requéte afin de récupérer les cameras et on utilise un forEach permettant ainsi de les positionner dans le carousel.
request('GET', 'http://localhost:3000/api/cameras', null, function (cameras) {
  cameras.forEach(function (camera, index) {

    const $carouselItem = document.createElement('div');
    $carouselItem.className = 'carousel-item';

    if (index === 0) {
      $carouselItem.classList.add('active');
    }

    const $img = document.createElement('img');
    $img.className = 'd-block img-fluid';

    $img.src = camera.imageUrl;
    $img.alt = "slide " + (index + 1);

    $carouselItem.appendChild($img);

    inner.appendChild($carouselItem);

    createCard(camera)



  });

});

// On met en place une fonction qui créera autant de carte produit qu'il y a de cameras

function createCard(cam) {
  const $cardContainer = document.createElement('div');
  $cardContainer.className = "col-lg-4 col-md-6 mb-4";

  const $cardSubcontainer = document.createElement('div');
  $cardSubcontainer.className = "card h-100";

  const $img = document.createElement('img');
  $img.className = 'card-img-top';
  $img.alt = 'appareil photo';

  $img.src = cam.imageUrl;

  const $cardBody = document.createElement('div');
  $cardBody.className = "card-body";

  const $cardTitle = document.createElement('h4');
  $cardTitle.className = "card-title";
  $cardTitle.innerText = cam.name;

  const $cardPrice = document.createElement('h5');
  $cardPrice.className = "card-price";
  $cardPrice.innerText = cam.price + ' €';

  const $cardText = document.createElement('p');
  $cardText.className = "card-text";
  $cardText.innerText = cam.description;

  $cardContainer.appendChild($cardSubcontainer);
  $cardSubcontainer.appendChild($img);
  $cardSubcontainer.appendChild($cardBody);
  $cardBody.appendChild($cardTitle);
  $cardBody.appendChild($cardPrice);
  $cardBody.appendChild($cardText);

  document.getElementById('card-product-container').appendChild($cardContainer);


// On rend chaque carte produit cliquable grâce à addEventListener et on stock l'ID dans le local storage ce qui nous redirige sur la page détail du produit cliqué

  $cardSubcontainer.addEventListener('click', function () {

    localStorage.setItem("openclassroomsp5", cam._id);

    window.location.href = '../html/produit.html';
  });


};
