function loadBasket() {
    loadCart();
    if (cartItems.length == 0) window.location.href="index.html";

    // Format cart information
    var items = {};
    var totalCost = 0.0;
    
    cartItems.forEach(function(bookID) {
        totalCost += parseFloat(books[bookID]["price"]);
        if (bookID in items) {
            items[bookID] += 1;
        } else {
            items[bookID] = 1;
        }
    });

    totalCost = totalCost.toFixed(2);

    // Load general information
    $("#totalCount").text(cartItems.length + (cartItems.length > 1 ? " items" : " item"));
    $(".cartPrice").text("NZ $" + totalCost);

    // Load items
    Object.keys(items).forEach(function(bookID) {
        var totalRatings = books[bookID]["stars"].reduce((a, b) => a + b, 0);
        var totalScore = 0;
        totalScore += books[bookID]["stars"][0] * 5;
        totalScore += books[bookID]["stars"][1] * 4;
        totalScore += books[bookID]["stars"][2] * 3;
        totalScore += books[bookID]["stars"][3] * 2;
        totalScore += books[bookID]["stars"][4] * 1;
        totalScore /= totalRatings;

        var appendString = `
        <div class="basketItem" id="book` + bookID + `">
        <a href="product.html?id=` + bookID + `"><img src="images/bookcovers/` + bookID + `.jpg" class="bookcover"></a>
        <h2 class="bookTitle">` + books[bookID]["name"] + `</h2>
        <img src="images/svgs/` + (totalScore >= 1 ? "filled" : "empty") + `Star.svg" class="stars">
        <img src="images/svgs/` + (totalScore >= 2 ? "filled" : "empty") + `Star.svg" class="stars">
        <img src="images/svgs/` + (totalScore >= 3 ? "filled" : "empty") + `Star.svg" class="stars">
        <img src="images/svgs/` + (totalScore >= 4 ? "filled" : "empty") + `Star.svg" class="stars">
        <img src="images/svgs/` + (totalScore >= 5 ? "filled" : "empty") + `Star.svg" class="stars">
        <p class="bookInfo"><span class="authorName">` + books[bookID]["author"] + `</span> | <span class="language">` + books[bookID]["language"] + `</span> <span class="type">Paperback</span></p>
        <h2><span class="bookPrice">NZ $` + books[bookID]["price"] + `</span>
        ` + (books[bookID]["price"] == books[bookID]["originalPrice"] ? "" : (`<span class="originalPrice">NZ $` + books[bookID]["originalPrice"] + `</span></h2><p class="percentOff">NZ $` + (books[bookID]["originalPrice"] - books[bookID]["price"]).toFixed(2) + ` off</p>`)) + `
        <h3>Available. Expected delivery to New Zealand in 23-28 business days.</h3>
        <div class="dropdown">
            <span>` + items[bookID] + `</span>
            <button type="button"><span class="dropdownClosed">▼</span><span class="dropdownOpen">▲</span></button>
            <div class="dropdown-content">
               <p>1<br>
        `;

        for (var itemCount = 1; itemCount < items[bookID]; itemCount++) {
            appendString += itemCount + 1 + "<br>";
        }

        appendString += `</p>
            </div>
            </div>
            <p class="bookPrice">NZ $` + (books[bookID]["price"] * items[bookID]).toFixed(2) + `</p>
            <p class="quantityText">Quantity</p>
            <button type="button" class="removeButton" onclick="removeItem(` + bookID + `)">Remove</h2>
            </div>
        `;
        $("#checkoutBreakdown").append(appendString);
    });
    updateLinks();

}

window.onload = loadBasket;

function removeItem(id) {
    $("#book" + id).css("display", "none");
    var newCart = [];
    cartItems.forEach(function(bookID) {
        if (bookID != id) {
            newCart.push(bookID);
        }
    });
    cartItems = newCart;
    saveCart();
    if (cartItems.length == 0) window.location.href="index.html";

    // Update UI
    updateCart();

    var totalCost = 0.0;
    
    cartItems.forEach(function(bookID) {
        totalCost += parseFloat(books[bookID]["price"]);
    });

    totalCost = totalCost.toFixed(2);

    // Load general information
    $("#totalCount").text(cartItems.length + (cartItems.length > 1 ? " items" : " item"));
    $(".cartPrice").text("NZ $" + totalCost);
}

function buyCart() {
    if (confirm("Confirm purchase?")) {
        alert("Purchase successful");
        window.location.href="index.html";
    }
}