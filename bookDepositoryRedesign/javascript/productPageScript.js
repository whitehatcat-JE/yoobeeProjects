$("#purchaseButton").on("click", function () {
    $(".itemPopupBackdrop").css("display", "unset");
    $(".itemPopup").css("display", "unset");
});

$("#wishlistButton").on("click", addToWishlist);

function addToWishlist() {
    $("#wishlistButton").text(" Remove Book ");
    $("#wishlistButton").css("background-color", "#312533");
    $("#wishlistButton").css("border-color", "#312533");
    $("#wishlistButton").css("margin-left", "160px");
    $("#wishlistButton").on("click", removeFromWishlist);
};

function removeFromWishlist() {
    $("#wishlistButton").text("Add to wishlist");
    $("#wishlistButton").css("background-color", "#4C394E");
    $("#wishlistButton").css("border-color", "#4C394E");
    $("#wishlistButton").css("margin-left", "160px");
    $("#wishlistButton").on("click", addToWishlist);
};

function loadPageInfo() {
    var searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('id')) {
        var id = searchParams.get('id');
        // General Product Data
        $("#bookName").text(books[id]["name"]);
        $("#authorName").text(books[id]["author"]);
        $("#bookLanguage").text(books[id]["language"]);
        $("#bookBlurb").text(books[id]["blurb"]);

        $("#dimensions").text(books[id]["dimensions"]);
        $("#pubDate").text(books[id]["publicationDate"]);
        $("#publisher").text(books[id]["publisher"]);
        $("#imprint").text(books[id]["imprint"]);
        $("#pubLoc").text(books[id]["location"]);
        $("#language").text(books[id]["language"]);
        $("#illusNote").text(books[id]["illustrationNote"]);
        $("#illusNote").text(books[id]["illustrationNote"]);
        $("#isbn").text(books[id]["isbn"]);
        $("#rank").text(books[id]["bestsellerRank"]);

        $("#currentPrice").text(books[id]["price"]);
        $("#inNamePrice").text("NZ $" + books[id]["price"]);
        $("#originalPrice").text(books[id]["originalPrice"]);
        if (books[id]["originalPrice"] == books[id]["price"]) {
            $("#pricing > h2").css("visibility", "hidden");
            $("#pricing > h3").css("visibility", "hidden");
        } else {
            $("#priceSavings").text((books[id]["originalPrice"] - books[id]["price"]).toFixed(2));
        }
        $("#book > img").attr("src", "images/bookcovers/" + id + ".jpg");

        // Category Buttons
        books[id]["categories"].forEach(function (category) {
            $("#categories").append("<button type=\"button\" onclick=\"window.location.href='searchQuery.html?query=" + category + "&type=5'\" class=\"categoryButton\">" + category + "</button>");
        });

        // Type Buttons
        var bookTypes = [".paperbackOption", ".hardcoverOption", ".bundleOption", ".audioOption", ".stationaryOption"];
        for (var i = 0; i < bookTypes.length; i++) {
            if (books[id]["type"] == i) {
                $("#bookInfo > " + bookTypes[i]).css("display", "unset");
                $("#altTypes > " + bookTypes[i]).css("display", "none");
            } else if (Object.keys(books[id]["alternativeTypes"]).includes(i.toString())) {
                $("#altTypes > " + bookTypes[i]).css("display", "unset");
                $("#bookInfo > " + bookTypes[i]).css("display", "none");
            } else {
                $("#bookInfo > " + bookTypes[i]).css("display", "none");
                $("#altTypes > " + bookTypes[i]).css("display", "none");
            }
        }

        // Star Rating
        var totalRatings = books[id]["stars"].reduce((a, b) => a + b, 0);
        var totalScore = 0;
        totalScore += books[id]["stars"][0] * 5;
        totalScore += books[id]["stars"][1] * 4;
        totalScore += books[id]["stars"][2] * 3;
        totalScore += books[id]["stars"][3] * 2;
        totalScore += books[id]["stars"][4] * 1;
        totalScore /= totalRatings;

        $(".starRating > p").text(totalScore.toFixed(2) + " (" + totalRatings.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " ratings by Goodreads)");

        while (totalScore > 0) {
            $(".starRating > img:nth-child(" + Math.floor(totalScore) + ")").attr("src", "images/svgs/filledStar.svg");
            totalScore -= 1;
        }

        // Rating breakdown
        $("#star5 > .percentBarForeground").css("width", (books[id]["stars"][0] / totalRatings * 30).toFixed(2) + "%");
        $("#star5 > h2").text((books[id]["stars"][0] / totalRatings * 100).toFixed(0) + "% (" + books[id]["stars"][0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ")");

        $("#star4 > .percentBarForeground").css("width", (books[id]["stars"][1] / totalRatings * 30).toFixed(2) + "%");
        $("#star4 > h2").text((books[id]["stars"][1] / totalRatings * 100).toFixed(0) + "% (" + books[id]["stars"][1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ")");

        $("#star3 > .percentBarForeground").css("width", (books[id]["stars"][2] / totalRatings * 30).toFixed(2) + "%");
        $("#star3 > h2").text((books[id]["stars"][2] / totalRatings * 100).toFixed(0) + "% (" + books[id]["stars"][2].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ")");

        $("#star2 > .percentBarForeground").css("width", (books[id]["stars"][3] / totalRatings * 30).toFixed(2) + "%");
        $("#star2 > h2").text((books[id]["stars"][3] / totalRatings * 100).toFixed(0) + "% (" + books[id]["stars"][3].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ")");

        $("#star1 > .percentBarForeground").css("width", (books[id]["stars"][4] / totalRatings * 30).toFixed(2) + "%");
        $("#star1 > h2").text((books[id]["stars"][4] / totalRatings * 100).toFixed(0) + "% (" + books[id]["stars"][4].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ")");

        // Related Books
        var relatedBooks = books[id]["relatedBooks"];
        if (relatedBooks.length > 0) {
            $("#topShelf1").css("display", "unset");
            $("#topShelf1 > .productAuthor").text(books[relatedBooks[0]]["author"]);
            $("#topShelf1 > .productPrice").text(books[relatedBooks[0]]["price"]);
            $("#topShelf1 > a").attr("href", "product.html?id=" + relatedBooks[0]);
            $("#topShelf1 > a > img").attr("src", "images/bookcovers/" + relatedBooks[0] + ".jpg");
        } else {
            $("#topShelf1").css("display", "none");
        }

        if (relatedBooks.length > 1) {
            $("#topShelf2").css("display", "unset");
            $("#topShelf2 > .productAuthor").text(books[relatedBooks[1]]["author"]);
            $("#topShelf2 > .productPrice").text(books[relatedBooks[1]]["price"]);
            $("#topShelf2 > a").attr("href", "product.html?id=" + relatedBooks[1]);
            $("#topShelf2 > a > img").attr("src", "images/bookcovers/" + relatedBooks[1] + ".jpg");
        } else {
            $("#topShelf2").css("display", "none");
        }

        if (relatedBooks.length > 2) {
            $("#topShelf3").css("display", "unset");
            $("#topShelf3 > .productAuthor").text(books[relatedBooks[2]]["author"]);
            $("#topShelf3 > .productPrice").text(books[relatedBooks[2]]["price"]);
            $("#topShelf3 > a").attr("href", "product.html?id=" + relatedBooks[2]);
            $("#topShelf3 > a > img").attr("src", "images/bookcovers/" + relatedBooks[2] + ".jpg");
        } else {
            $("#topShelf3").css("display", "none");
        }

        if (relatedBooks.length > 3) {
            $("#topShelf4").css("display", "unset");
            $("#topShelf4 > .productAuthor").text(books[relatedBooks[3]]["author"]);
            $("#topShelf4 > .productPrice").text(books[relatedBooks[3]]["price"]);
            $("#topShelf4 > a").attr("href", "product.html?id=" + relatedBooks[3]);
            $("#topShelf4 > a > img").attr("src", "images/bookcovers/" + relatedBooks[3] + ".jpg");
        } else {
            $("#topShelf4").css("display", "none");
        }


    } else {
        document.location.href = "index.html";
    }
}

window.onload = loadPageInfo;