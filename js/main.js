
var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCat = document.getElementById("productCat");
var productDesc = document.getElementById("productDesc");
var productImg = document.getElementById("productImg");
var row = document.getElementById("row");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var searchProduct = document.getElementById("searchProduct");
var notFoundP = document.getElementById("notFoundP");
var searchCat = document.getElementById("searchCat");

var globalTerm;
var catTerm;
var globalIndex;
var productList;

if (localStorage.getItem("productList") !== null) {
    productList = JSON.parse(localStorage.getItem("productList"));
    displayProduct(productList);
} else {
    productList = [];
}

// Function to add product
function addProduct() {
    var product = {

        name: productName.value,
        price: productPrice.value,
        category: productCat.value,
        desc: productDesc.value,
        img: productImg.files[0].name,
    }
    productList.push(product);
    displayProduct(productList);
    clearInputs();
    saveToLocalStorage();

}



// function to display
function displayProduct(productList) {

    if (productList.length > 0) {
        var cartoona = "";
        for (var i = 0; i < productList.length; i++) {
            cartoona += ` <div class="col-md-3 card">
                    <img src="./images/${productList[i].img}" class="py-3 w-100"  alt="">
                    <p>Product Name :<strong> ${globalTerm ? productList[i].name.toLowerCase().replace(new RegExp(globalTerm, "i"), `<span class="bg-warning">${globalTerm}</span>`) : productList[i].name}</strong> </p>
                    <p>Product Price : <strong> ${productList[i].price}</strong> </p>
                    <p>Product Category : <strong> ${catTerm ? productList[i].category.toLowerCase().replace(new RegExp(catTerm, "i"), `<span class="bg-warning">${catTerm}</span>`) : productList[i].category}</strong> </p>
                    <p>Product Description : <strong> ${productList[i].desc}</strong> </p>
                    <button class="btn btn-outline-success w-100 py-1 my-1" onclick="setFormToUpdate(${i})">Update</button>
                    <button class="btn btn-outline-danger w-100 py-1 my-1" onclick="deleteProduct(${i})">Delete</button>
                </div>`
        }

        row.innerHTML = cartoona;

    } else {
        row.innerHTML = `<div class = "text-center alert alert-danger p-4">No Match Found</div>`

    }

}

// function to delete product
function deleteProduct(index) {
    productList.splice(index, 1)
    displayProduct(productList);
    saveToLocalStorage();
}

// function to clear

function clearInputs() {
    productName.value = null;
    productPrice.value = null;
    productCat.value = null;
    productDesc.value = null;
    productImg.value = null;
}


// function to save to local storage

function saveToLocalStorage() {
    localStorage.setItem("productList", JSON.stringify(productList))
}

// function to set form to update 

function setFormToUpdate(index) {
    globalIndex = index;
    productName.value = productList[index].name
    productPrice.value = productList[index].price
    productCat.value = productList[index].category
    productDesc.value = productList[index].desc
    addBtn.classList.add("d-none")
    updateBtn.classList.remove("d-none")
}

// function to update the product

function updateProduct() {
    productList[globalIndex].name = productName.value;
    productList[globalIndex].price = productPrice.value;
    productList[globalIndex].category = productCat.value;
    productList[globalIndex].desc = productDesc.value;
    displayProduct(productList);
    saveToLocalStorage();
    addBtn.classList.remove("d-none")
    updateBtn.classList.add("d-none")
    clearInputs()

}

// function to search product by name

function searchProductName() {
    var term = searchProduct.value

    globalTerm = term;

    var searchList = [];

    for (var i = 0; i < productList.length; i++) {
        if (productList[i].name.toLowerCase().includes(term.toLowerCase())) {
            searchList.push(productList[i]);
        }
    }
        displayProduct(searchList);

}


// function to search product by Category


function searchProductCat() {
    var term = searchCat.value;
    console.log("hii");
    
    catTerm = term;

    var catList = [];

    for (var i = 0; i < productList.length; i++) {
        if (productList[i].category.toLowerCase().includes(term.toLowerCase())) {
            catList.push(productList[i]);
        }
    }
        displayProduct(catList);

}