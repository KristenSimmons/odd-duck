'use strict';

const sectionElem = document.getElementById('resultsContainer');
const button = document.getElementById('showResults');

const leftImage = document.querySelector('section img:first-child');
const centerImage = document.querySelector('section img:nth-child(2)');
const rightImage = document.querySelector('section img:nth-child(3)');
const allProducts = [
  'bag',
  'banana',
  'bathroom',
  'boots',
  'breakfast',
  'bubblegum',
  'chair',
  'cthulhu',
  'dog-duck',
  'dragon',
  'pen',
  'pet-sweep',
  'scissors',
  'shark',
  'sweep',
  'tauntaun',
  'unicorn',
  'water-can',
  'wine-glass',
];

let leftInstance = null;
let centerInstance = null;
let rightInstance = null;
let clickCount = 0; // running total of votes
const maxClicks = 25; // max number of votes
const productStorageKey = 'product-key';

function Product(name, src, views = 0, clicks = 0) {
  this.name = name;
  this.src = src;
  this.views = views;
  this.clicks = clicks;
}
Product.allProducts = [];
Product.workingProducts = [];

function instProducts() {
  for (let productName of allProductNames) {
    const productInstance = new Product(productName, `img/${productName}.jpg`);
    Product.allProducts.push(productInstance);
  }
}

function renderProducts() {
  if (clickCount >= maxClicks) {
    removeVotingListener();
    endVotingRound();
    return;
  }

  let leftOver = null;
  if (Product.workingProducts.length === 1) {
    leftOver = Product.workingProducts[0];
  }

  if (Product.workingProducts.length < 3) {
    Product.workingProducts = Product.allProducts.slice();
    shuffleArray(Product.workingProducts);

    if (leftOver) {
      removeItem(Product.workingProducts, leftOver);
      Product.workingProducts.push(leftOver);
    }
  }

  leftInstance = Product.workingProducts.pop();
  leftImage.setAttribute('src', leftInstance.src);

  centerInstance = Product.workingProducts.pop();
  centerImage.setAttribute('src', centerInstance.src);

  rightInstance = Product.workingProducts.pop();
  rightImage.setAttribute('src', rightInstance.src);

  leftInstance.views += 1;
  centerInstance.views += 1;
  rightInstance.views += 1;
}

function handleLeftClick() {
  leftInstance.clicks += 1;
  clickCount += 1;
  renderProducts();
}

function handleCenterClick() {
  centerInstance.clicks += 1;
  clickCount += 1;
  renderProducts();
}

function handleRightClick() {
  rightInstance.clicks += 1;
  clickCount += 1;
  renderProducts();
}

function handleViewResultsClick() {
  renderChart();
  removeResultsListener();
}

function setupVotingListeners() {
  leftImage.addEventListener('click', handleLeftClick);
  centerImage.addEventListener('click', handleCenterClick);
  rightImage.addEventListener('click', handleRightClick);
}

function removeVotingListener() {
  leftImage.removeEventListener('click', handleLeftClick);
  centerImage.removeEventListener('click', handleCenterClick);
  rightImage.removeEventListener('click', handleRightClick);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function removeItem(array, item) {
  const index = array.indexOf(item);
  if (index !== -1) {
    array.splice(index, 1);
  }
}

function endVotingRound() {
  button.addEventListener('click', handleViewResultsClick);
  button.style.display = 'block';
  button.removeAttribute('hidden');

  const resultsHeaderElem = document.createElement('h2');
  sectionElem.appendChild(resultsHeaderElem);
  resultsHeaderElem.textContent = 'Results';
  saveProductResults();
}

function removeResultsListener() {
  button.removeEventListener('click', handleViewResultsClick);
}

function saveProductResults() {
  const productStorageText = JSON.stringify(Product.allProducts);
  localStorage.setItem(productStorageKey, productStorageText);
}

function parseStoredProducts(storageText) {
  const storedProductObjects = JSON.parse(storageText);

  Product.allProducts.length = 0;

  for (let productObject of storedProductObjects) {
    const currentProduct = new Product(
      productObject.name,
      productObject.src,
      productObject.views,
      productObject.clicks
    );
    Product.allProducts.push(currentProduct);
  }
  console.log(Product.allProducts);
}

function loadProducts() {
  const productStorageText = localStorage.getItem(productStorageKey); 
  console.log(productStorageText);
  if (productStorageText) {
    parseStoredProducts(productStorageText); 
  } else {
    instProducts();
  }
}



loadProducts();
renderProducts();
setupVotingListeners();
