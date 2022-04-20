var shelfSlots = 6;
function updateResults() {
    var searchParams = new URLSearchParams(window.location.search);
    var results = [];
    var type = 7;
    var query = "All";
    if (searchParams.has("type") && searchParams.has("query")) {
        var type = searchParams.get("type");
        var query = searchParams.get("query").replace(/_/g, " ").replace(/ and /g, " & ");
        results = findQueryResults(query, type);
    } else {
        results = Object.keys(books);
    }

    $("#searchInputFull").val(query);
    $("#searchInputShorter").val(query);
    $("#searchInputShortest").val(query);
    $("#searchQuery").text(query);
    $("#totalBookCount").text(results.length);
    $("#endingBookNum").text(results.length);

    var shelves = ["#topShelf", "#secondShelf", "#thirdShelf", "#forthShelf", "#fifthShelf", "#sixthShelf"];
    var itemNum = 0;

    for (var shelf = 0; shelf < shelves.length; shelf++) {
        for (var slot = 0; slot < shelfSlots; slot++) {
            var selectedSlot = shelves[shelf] + (slot + 1);
            if (itemNum < results.length) {
                $(selectedSlot).closest("article").css("display", "block");
                $(selectedSlot).css("visibility", "visible");
                $(selectedSlot + " > .productAuthor").text(books[results[itemNum]]["author"]);
                $(selectedSlot + " > .productPrice").text(books[results[itemNum]]["price"]);
                $(selectedSlot + " > a").attr("href", "product.html?id=" + results[itemNum]);
                $(selectedSlot + " > a > img").attr("src", "images/bookcovers/" + results[itemNum] + ".jpg");
                $(selectedSlot + " > .productPrice").attr("onclick", "addItem(" + results[itemNum] + ")");
                $(selectedSlot + " > .productBasket").attr("onclick", "addItem(" + results[itemNum] + ")");
            } else {
                $(selectedSlot).css("visibility", "hidden");
                if (slot == 0) {
                    $(selectedSlot).closest("article").css("display", "none");
                }
            }
            itemNum++;
        }            
    }

    updateCart();
}

window.onload = updateResults;

//Adjustments Popout menu controls (Used when width < 1100px)
$("#adjustmentPopoutButton").on("click", function() {
    $("#searchAdjustments").css("visibility", "visible");
    $("#adjustmentPopoutButton").css("display", "none");
    $("#queryResults").css("z-index", "-1");
});

$("#adjustmentPopinButton").on("click", function() {
    $("#searchAdjustments").css("visibility", "hidden");
    $("#adjustmentPopoutButton").css("display", "unset");
    $("#queryResults").css("z-index", "0");
});

//Disables adjustment popup button if un-needed.
$(window).resize(function() {
    if (window.matchMedia("(min-width: 1100px)").matches) {
        $("#searchAdjustments").css("visibility", "visible");
        $("#adjustmentPopoutButton").css("display", "none");
    } else {
        $("#searchAdjustments").css("visibility", "hidden");
        $("#adjustmentPopoutButton").css("display", "unset");
        $("#queryResults").css("z-index", "0");
    }

    if (window.matchMedia("(min-width: 951px)").matches) {
        shelfSlots = 6;
    } else if (window.matchMedia("(min-width: 781px)").matches) {
        shelfSlots = 5;
    } else if (window.matchMedia("(min-width: 626px)").matches) {
        shelfSlots = 4;
    } else {
        shelfSlots = 3;
    }


    updateResults();
});


function addItem(id) {
    cartItems.push(id);
    saveCart();
    updateCart();
}