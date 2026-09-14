let cart =
    JSON.parse(localStorage.getItem("foodCart")) || [];


// ADD TO CART

function addToCart(name, price) {

    let existing =
        cart.find(item => item.name === name);

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    saveCart();

    alert(name + " added to cart!");

}


// SAVE CART

function saveCart() {

    localStorage.setItem(
        "foodCart",
        JSON.stringify(cart)
    );

}


// DISPLAY CART

function displayCart() {

    let container =
        document.getElementById("cartItems");

    let totalElement =
        document.getElementById("cartTotal");

    if (!container) return;

    container.innerHTML = "";

    let total = 0;


    if (cart.length === 0) {

        container.innerHTML =
            "<h3>Your cart is empty 😔</h3>";

        totalElement.innerText = "0";

        return;

    }


    cart.forEach((item, index) => {

        total +=
            item.price * item.quantity;


        container.innerHTML += `

        <div class="cart-item">

            <div>

                <h3>${item.name}</h3>

                <p>
                ₹${item.price} ×
                ${item.quantity}
                </p>

            </div>


            <div>

                <button
                onclick="changeQuantity(${index},1)">
                +
                </button>


                <button
                onclick="changeQuantity(${index},-1)">
                -
                </button>


                <button
                onclick="removeItem(${index})">
                Remove
                </button>

            </div>

        </div>

        `;

    });


    totalElement.innerText = total;

}


// CHANGE QUANTITY

function changeQuantity(index, change) {

    cart[index].quantity += change;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    saveCart();

    displayCart();

}


// REMOVE

function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

    displayCart();

}


// SEARCH FOOD

function searchFood() {

    let input =
        document.getElementById("search");

    let cards =
        document.querySelectorAll(".food-card");

    let search =
        input.value.toLowerCase();


    cards.forEach(card => {

        let text =
            card.innerText.toLowerCase();

        if (text.includes(search)) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

}


// PLACE ORDER

function placeOrder(event) {

    event.preventDefault();


    if (cart.length === 0) {

        alert(
            "Your cart is empty. Please add food first."
        );

        return;

    }


    alert(
        "🎉 Order placed successfully!"
    );


    cart = [];

    saveCart();

    window.location.href =
        "index.html";

}


// LOGIN

function loginUser(event) {

    event.preventDefault();

    alert(
        "Login successful! Welcome to FoodExpress."
    );

    window.location.href =
        "index.html";

}


// LOAD CART

displayCart();
