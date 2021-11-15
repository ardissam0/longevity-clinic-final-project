// Filename: store.js
// Author: Samuel Ardis
// Date: 11/11/2021
// HTML5 and CSS3 Illustrated, Final Draft

let carts = document.querySelectorAll('.product-item-button');

let products = [
    {
        name: 'Nutrition Plan',
        tag: 'nutriplan',
        price: 49.99,
        inCart: 0
    },
    {
        name: 'Exercise Plan',
        tag: 'exercise',
        price: 49.99,
        inCart: 0
    },
    {
        name: 'Fasting Regimen',
        tag: 'fasting',
        price: 29.99,
        inCart: 0
    },
    {
        name: 'Success Coach',
        tag: 'coach',
        price: 99.99,
        inCart: 0
    },
    {
        name: 'Counseling Session',
        tag: 'counseling',
        price: 99.99,
        inCart: 0
    },
    {
        name: 'Longevity Package',
        tag: 'longevitypackage',
        price: 249.99,
        inCart: 0
    }
]

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);
    if(productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        } 
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');
    
    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price);
    } else {
        localStorage.setItem('totalCost', product.price);
    }
}


function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector('.cart-items');
    let cartCost = localStorage.getItem('totalCost');

    if(cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="cart-item">
            <div class="cart-name">
                <ion-icon name="close-circle-outline" class="btn-danger" onclick="removeItem(this);"></ion-icon>
                <span>${item.name}</span>
            </div>
            <div class="cart-price">
               $${item.price}
            </div>
            <div class="cart-quantity">
                <span>${item.inCart}</span>
            </div>
            <div class="cart-total-price>
                $${item.inCart * item.price}
            </div>
            </div>
            `
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Total
                    </h4>
                    <h4 class="basketTotal">
                    $${(Math.round(cartCost * 100) / 100).toFixed(2)}
                    </h4>
            </div>
        `
    }
}

function removeItem(btn){
    ((btn.parentNode.parentNode).parentNode).removeChild(btn.parentNode.parentNode);
}

function purchaseClearStorage() {
    localStorage.clear();
    alert("Purchase successful!");
}

function reload() {
    reload = location.reload();
}

onLoadCartNumbers()
displayCart();