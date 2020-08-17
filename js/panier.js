const orderJson = localStorage.getItem('newOrder');

const orderParse = orderJson && JSON.parse(orderJson);



console.log(orderParse);



