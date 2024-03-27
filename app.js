'use strict';

const leftImg = document.getElementById('img1');
const middleImg = document.getElementById('img2');
const rightImg = document.getElementById('img3');
const showResultsButton = document.getElementById('showResults');
const showResultsSection = document.getElementById('results');

const productNames = ['boots', 'bathroom', 'breakfast', 'bubblegum', 'chair', 'dog-duck', 'tauntaun', 'scissors', 'water-can', 'wine-glass', 'bag', 'banana', 'cthulhu', 'dragon', 'pen', 'pet-sweep', 'shark', 'sweep', 'unicorn'];

let leftProduct = null;
let middleProduct = null;
let rightProduct = null;
let voteCount = 0;
const maxRounds = 25;
let currentRound = 0;

function Product(name, src) {
  this.name = name;
  this.src = src;
  this.votes = 0;
  this.views = 0;
}

Product.allProducts = [];
Product.workingProducts = [];


function initProducts() {
  for (let i = 0; i < productNames.length; i++) {
    const productName = productNames[i];
    const productInstance = new Product(productName, `img/${productName}.jpg`);
    Product.allProducts.push(productInstance);
  }
}

function renderProducts() {
  if (currentRound === maxRounds) {
    endVoting();
    return;
  }
  currentRound += 1;
  if (Product.workingProducts.length < 3) {
    Product.workingProducts = Product.allProducts.slice();
    shuffleArray(Product.workingProducts);
  }

  leftProduct = Product.workingProducts.pop();
  middleProduct = Product.workingProducts.pop();
  rightProduct = Product.workingProducts.pop();

  leftProduct.views += 1;
  middleProduct.views += 1;
  rightProduct.views += 1;

  leftImg.setAttribute('src', leftProduct.src);
  middleImg.setAttribute('src', middleProduct.src);
  rightImg.setAttribute('src', rightProduct.src);
}

function handleLeftProductClick() {
  leftProduct.votes += 1;
  voteCount += 1;
  renderProducts();
}

function handleMiddleProductClick() {
  middleProduct.votes += 1;
  voteCount += 1;
  renderProducts();
}

function handleRightProductClick() {
  rightProduct.votes += 1;
  voteCount += 1;
  renderProducts();
}

function handleShowResultsClick() {
  renderChart();
  removeResultsListener();
}

function initEventListeners() {
  leftImg.addEventListener('click', handleLeftProductClick);
  middleImg.addEventListener('click', handleMiddleProductClick);
  rightImg.addEventListener('click', handleRightProductClick);
}

function endVoting() {
  leftImg.removeEventListener('click', handleLeftProductClick);
  middleImg.removeEventListener('click', handleMiddleProductClick);
  rightImg.removeEventListener('click', handleRightProductClick);
  showResultsButton.hidden = false;
  showResultsButton.addEventListener('click', handleShowResultsClick);
  const resultsHeaderElem = document.createElement('h2');
  //showResultsSection.appendChild(resultsHeaderElem);
  resultsHeaderElem.textContent = 'Results';
  //saveProductResults();
}

function removeResultsListener() {
  showResultsButton.removeEventListener('click', handleShowResultsClick);
}

// function renderResults() {

//   const ul = document.createElement('ul');
//   showResultsSection.appendChild(ul);

//   for (let i = 0; i < Product.allProducts.length; i++) {
//     const productInstance = Product.allProducts[i];
//     const result = `The product ${productInstance.name} received ${productInstance.votes} votes and was viewed ${productInstance.views} times.`;
//     const li = document.createElement('li');
//     ul.appendChild(li);
//     li.textContent = result;
//   }
// }

// Fisher Yates via Chat GPT
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Generate a random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements at i and j
  }
}


function startApp() {
  initProducts();
  initEventListeners();
  renderProducts();
}

/////// CHARTS ///////////////

function renderChart() {
  let productNames = [];
  let productVotes = [];
  let productViews = [];

  for (let i = 0; i < Product.allProducts.length; i++) {
    let currentProduct = Product.allProducts[i];
    productNames.push(currentProduct.name);
    productVotes.push(currentProduct.votes);
    productViews.push(currentProduct.views);
  }

  // refer to Chart.js
  // https://www.chartjs.org/docs/latest/charts/bar.html
  const data = {
    labels: productNames,
    datasets: [
      {
        label: 'Votes',
        data: productVotes,
        backgroundColor: ['rgba(255, 128, 114, 0.2)'],
        borderColor: ['rgb(255, 128, 114)'],
        borderWidth: 1,
      },
      {
        label: 'Views',
        data: productViews,
        backgroundColor: ['rgba(97, 113, 128, 0.2)'],
        borderColor: ['rgb(97, 113, 128)'],
        borderWidth: 1,
      },
    ],
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        x: {
          stacked: false,
        },
        y: {
          stacked: false,
          beginAtZero: true,
        },
      },
    },
  };
  const canvasChart = document.getElementById('myChart');
  new Chart(canvasChart, config);
}

startApp();