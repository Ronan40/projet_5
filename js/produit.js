const ident = localStorage.getItem("openclassroomsp5")

request('GET', 'http://localhost:3000/api/cameras/' + ident, null, function (camera) {






});