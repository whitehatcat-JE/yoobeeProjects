var cartItems = [];

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function loadCart() {
    cartItems = [];
    var cartStr = getCookie("cart");
    if (cartStr == undefined) return;
    var curNum = "";
    for (var charIdx = 0; charIdx < cartStr.length; charIdx++) {
        if (cartStr[charIdx] != "_") {
            curNum += cartStr[charIdx];
        } else {
            cartItems.push(parseFloat(curNum));
            curNum = "";
        }
    }
}

function saveCart() {
    var cartStr = "";
    cartItems.forEach(function(item) {
        cartStr += item + "_";
    });
    document.cookie = "cart=" + cartStr;
}

function updateCart(formatType=1) {
    loadCart();
    var cost = 0.0;
    cartItems.forEach(function(item) {
        cost += parseFloat(books[item]["price"]);
    });
    if (formatType == 0) {
        $("#cartText").text("NZ $" + cost.toFixed(2) + " \xa0|\xa0 " + cartItems.length + " ");
    } else {
        $("#cartText").text("NZ $" + cost.toFixed(2));
        $("#cartCount").text(cartItems.length);
    }
    $(".itemCountPopup").text(cartItems.length + (cartItems.length > 1 ? " items" : " item"));
    $(".itemPricePopup").text("NZ $" + cost.toFixed(2));
}