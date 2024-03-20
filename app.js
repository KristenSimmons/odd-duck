'use strict';

const productNames = ['boots', 'bathroom', 'breakfast', 'bubblegum', 'chair', 'dog-duck', 'tauntaun', 'scissors', 'water-can', 'wine-glass', 'bag', 'banana', 'cthulhu', 'dragon', 'pen', 'pet-sweep', 'shark', 'sweep', 'unicorn'];

const leftImg = document.getElementById('img1');
const middleImg = document.getElementById('img2');
const rightImg = document.getElementById('img3');
const showResultsButton = document.getElementById('showResults');
const showResultsSection = document.getElementById('results');

let leftProduct = null;
let middleProduct = null;
let rightProduct = null;
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

function endVoting() {
  leftImg.removeEventListener('click', handleLeftProductClick);
  middleImg.removeEventListener('click', handleMiddleProductClick);
  rightImg.removeEventListener('click', handleRightProductClick);

  showResultsButton.hidden = false;
  showResultsButton.addEventListener('click', handleShowResultsClick);
}

function handleShowResultsClick() {
  renderResults();
}

function renderResults() {

  const ul = document.createElement('ul');
  showResultsSection.appendChild(ul);

  for (let i = 0; i < Product.allProducts.length; i++) {
    const productInstance = Product.allProducts[i];
    const result = `The product ${productInstance.name} received ${productInstance.votes} votes and was viewed ${productInstance.views} times.`;
    const li = document.createElement('li');
    ul.appendChild(li);
    li.textContent = result;
  }
}

// Fisher Yates via Chat GPT
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Generate a random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements at i and j
  }
}

function initEventListeners() {
  leftImg.addEventListener('click', handleLeftProductClick);
  middleImg.addEventListener('click', handleMiddleProductClick);
  rightImg.addEventListener('click', handleRightProductClick);
}

function handleLeftProductClick() {
  leftProduct.votes += 1;
  renderProducts();
}

function handleMiddleProductClick() {
  middleProduct.votes += 1;
  renderProducts();
}

function handleRightProductClick() {
  rightProduct.votes += 1;
  renderProducts();
}

function startApp() {
  initProducts();
  initEventListeners();
  renderProducts();
}

startApp();
