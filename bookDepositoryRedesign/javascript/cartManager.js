var cartItems = [];

function getCartString() {
    var cartStr = "";
    cartItems.forEach(function(item) {
        cartStr += item + "_";
    });
    return cartStr;
}

function loadCart() {
    cartItems = [];
    var searchParams = new URLSearchParams(window.location.search);
    if (!searchParams.has('cart')) return;
    var cartStr = searchParams.get('cart');
    var curNum = "";
    for (var charIdx = 0; charIdx < cartStr.length; charIdx++) {
        if (cartStr[charIdx] != "_") {
            curNum += cartStr[charIdx];
        } else {
            cartItems.push(parseFloat(curNum));
            curNum = "";
        }
    }
    updateLinks();
}

function saveCart() {
    updateLinks();
}

function updateLinks() {
    var cartStr = getCartString();
    $('a').each(function(i, obj) {
        if (!$(obj).attr("href").includes("http")) {
            if ($(obj).attr("href").includes("cart=")) {
                $(obj).attr("href", $(obj).attr("href").replace(/cart=.*$/, ""));
            } else if ($(obj).attr("href").includes("?")) {
                $(obj).attr("href", $(obj).attr("href") + "&");
            } else {
                $(obj).attr("href", $(obj).attr("href") + "?");
            }
            $(obj).attr("href", $(obj).attr("href") + "cart=" + cartStr);
        }
    });

    $('button').each(function(i, obj) {
        if ($(obj).attr("onclick") != undefined) {
            if ($(obj).attr("onclick").includes("window")) {
                if ($(obj).attr("onclick").includes("cart=")) {
                    $(obj).attr("onclick", $(obj).attr("onclick").replace(/cart=.*$/, ""));
                } else if ($(obj).attr("onclick").includes("?")) {
                    $(obj).attr("onclick", $(obj).attr("onclick") + " + '&");
                } else {
                    $(obj).attr("onclick", $(obj).attr("onclick") + " + '?");
                }
                $(obj).attr("onclick", $(obj).attr("onclick") + "cart=" + cartStr + "'");
            }
        }
    });

    var searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('cart') != cartStr) {
        var url = new URL(window.location.href);
        url.searchParams.set("cart", cartStr);
        url.searchParams.set("reloadPos", window.pageYOffset || document.documentElement.scrollTop);
        window.location.href = url;
    }
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

    $("#cart").attr("onclick", cartItems.length > 0 ? ("window.location.href='cart.html?cart=" + getCartString() + "'") : "");
    $("#cart").css("cursor", cartItems.length > 0 ? "pointer" : "default");
    $(".itemCountPopup").text(cartItems.length + (cartItems.length > 1 ? " items" : " item"));
    $(".itemPricePopup").text("NZ $" + cost.toFixed(2));

    var searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has("reloadPos")) {
        if (!window.location.href.includes("cart.html")) {
            $(".itemPopupBackdrop").css("display", "unset");
            $(".itemPopup").css("display", "unset");
        }
        window.scroll(0, searchParams.get("reloadPos"));
    }
}