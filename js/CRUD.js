// create product -
// clear values -
// display product ---- // search product -
// retrive product local storge -
// delete product  -
// image file -
// update product

var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescriptionInput = document.getElementById("productDescription");
var productImageInput = document.getElementById("productImage");
var searchProductInput = document.getElementById("searchProduct");
var addProductbtn = document.getElementById("addProduct");
var updateProductbtn = document.getElementById("updateProduct");
var currentIndex = 0;

var productList = [];

if (localStorage.getItem("productContainer")) {
  productList = JSON.parse(localStorage.getItem("productContainer"));

  displayProduct();
}

function addProduct() {
  if ( nameValidation() &&  priceValidation() && categoryValidation() && descriptionValidation() ) {
    var product = {
      name: productNameInput.value.trim(),
      price: productPriceInput.value,
      category: productCategoryInput.value.trim(),
      description: productDescriptionInput.value.trim(),
      image: productImageInput.files[0]
        ? `images/${productImageInput.files[0]?.name}`: `images/blog-1.jpg`,
    };
    productList.push(product);
    localStorage.setItem("productContainer", JSON.stringify(productList));
    displayProduct();
    clearProduct();
  } else {
    alert("Please enter vaild data");
  }
}

function clearProduct() {
  productNameInput.value = null;
  productPriceInput.value = null;
  productCategoryInput.value = null;
  productDescriptionInput.value = null;
  productImageInput.value = null;
  searchProductInput.value = null;
  productNameInput.classList.remove("is-valid");
  productPriceInput.classList.remove("is-valid");
  productCategoryInput.classList.remove("is-valid");
  productDescriptionInput.classList.remove("is-valid");
}

function deletProduct(index) {
  productList.splice(index, 1);
  displayProduct();
  localStorage.setItem("productContainer", JSON.stringify(productList));
}

function createCols(i) {
  var regex = new RegExp(searchProductInput.value, "gi");
  return `
            <div class="col">
                <div class="card h-100">
                    <img height="170px" src="${
                      productList[i].image
                    }" class="card-img-top" alt="${productList[i].name}">
                    <div class="card-body">
                        <span class="bg-info rounded-2 py-0 px-2 text-white">ID: ${
                          i + 1
                        }</span>
                        <h3>${productList[i].name.replace(
                          regex,
                          (match) => `<span class="bg-warning">${match}</span>`
                        )}</h3>
                        <h4>${productList[i].price}$</h4>
                        <h5>${productList[i].category}</h5>
                        <p>${productList[i].description}</p>
                    </div>
                    <div class="card-footer text-center">
                        <button onclick="deletProduct(${i})" class="btn btn-outline-danger btn-sm " id="deleteProduct"><i class="fas fa-trash"></i></button>
                        <button onclick="produtInfo(${i})" class="btn btn-outline-warning btn-sm " id="updateProduct"><i class="fas fa-edit"></i></button>
                    </div>
                </div>
            </div>
            `;
}

function displayProduct() {
  var cartona = "";
  for (var i = 0; i < productList.length; i++) {
    cartona += createCols(i);
  }
  document.getElementById("rowData").innerHTML = cartona;
}

function searchProduct() {
  var term = searchProductInput.value;
  var cartona = "";
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(term.toLowerCase())) {
      cartona += createCols(i);
    }
  }
  document.getElementById("rowData").innerHTML = cartona;
}

function produtInfo(index) {
  currentIndex = index;
  productNameInput.value = productList[index].name;
  productPriceInput.value = productList[index].price;
  productCategoryInput.value = productList[index].category;
  productDescriptionInput.value = productList[index].description;

  addProductbtn.classList.add("d-none");
  updateProductbtn.classList.remove("d-none");
  console.log(index);
}

function updateProduct() {
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    description: productDescriptionInput.value,
    image: productImageInput.files[0]
      ? `images/${productImageInput.files[0]?.name}`
      : `images/blog-1.jpg`,
  };
  productList.splice(currentIndex, 1, product);
  localStorage.setItem("productContainer", JSON.stringify(productList));
  displayProduct();
  addProductbtn.classList.remove("d-none");
  updateProductbtn.classList.add("d-none");
  clearProduct();
}

function nameValidation() {
  var namePattern = /^[a-zA-Z][a-zA-Z0-9\s-_]{1,48}[a-zA-Z0-9]$/;
  var term = productNameInput.value;
  if (namePattern.test(term)) {
    productNameInput.classList.add("is-valid");
    productNameInput.classList.remove("is-invalid");
    return true;
  } else {
    productNameInput.classList.add("is-invalid");
    productNameInput.classList.remove("is-valid");
    return false;
  }
}

function priceValidation() {
  var pricePattern = /^\d+(\.\d{1,2})?$/;
  var term = productPriceInput.value;
  if (pricePattern.test(term)) {
    productPriceInput.classList.add("is-valid");
    productPriceInput.classList.remove("is-invalid");
    return true;
  } else {
    productPriceInput.classList.add("is-invalid");
    productPriceInput.classList.remove("is-valid");
    return false;
  }
}

function categoryValidation() {
  var categoryPattern = /^(tvs|mobiles|screens|electronics)$/i;
  var term = productCategoryInput.value;
  if (categoryPattern.test(term)) {
    productCategoryInput.classList.add("is-valid");
    productCategoryInput.classList.remove("is-invalid");
    return true;
  } else {
    productCategoryInput.classList.add("is-invalid");
    productCategoryInput.classList.remove("is-valid");
    return false;
  }
}

function descriptionValidation() {
  var descriptionPattern = /^[a-zA-Z0-9.,'"\-!?() ]{10,500}$/;
  var term = productDescriptionInput.value;
  if (descriptionPattern.test(term)) {
    productDescriptionInput.classList.add("is-valid");
    productDescriptionInput.classList.remove("is-invalid");
    return true;
  } else {
    productDescriptionInput.classList.add("is-invalid");
    productDescriptionInput.classList.remove("is-valid");
    return false;
  }
}
