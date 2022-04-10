//Data assignment
function loadData() {
    var bestsellingIdx = getBestsellingOrder();
    for (var bestsellingID = 0; bestsellingID < 6; bestsellingID++) {
        $("#topShelf" + (bestsellingID + 1) + " > a > img").attr("src", "images/bookcovers/" + bestsellingIdx[bestsellingID] + ".jpg");
        $("#topShelf" + (bestsellingID + 1) + " > a").attr("href", "product.html?id=" + bestsellingIdx[bestsellingID]);
        $("#topShelf" + (bestsellingID + 1) + " > .productAuthor").text(books[bestsellingIdx[bestsellingID]]["author"]);
        $("#topShelf" + (bestsellingID + 1) + " > .productPrice").text(books[bestsellingIdx[bestsellingID]]["price"]);
    }
    for (var gamingID = 0; gamingID < 6; gamingID++) {
        $("#secondShelf" + (gamingID + 1) + " > a > img").attr("src", "images/bookcovers/" + gamingCollection[gamingID] + ".jpg");
        $("#secondShelf" + (gamingID + 1) + " > a").attr("href", "product.html?id=" + gamingCollection[gamingID]);
        $("#secondShelf" + (gamingID + 1) + " > .productAuthor").text(books[gamingCollection[gamingID]]["author"]);
        $("#secondShelf" + (gamingID + 1) + " > .productPrice").text(books[gamingCollection[gamingID]]["price"]);
    }
    for (var youtubeID = 0; youtubeID < 6; youtubeID++) {
        $("#thirdShelf" + (youtubeID + 1) + " > a > img").attr("src", "images/bookcovers/" + youtubeCollection[youtubeID] + ".jpg");
        $("#thirdShelf" + (youtubeID + 1) + " > a").attr("href", "product.html?id=" + youtubeCollection[youtubeID]);
        $("#thirdShelf" + (youtubeID + 1) + " > .productAuthor").text(books[youtubeCollection[youtubeID]]["author"]);
        $("#thirdShelf" + (youtubeID + 1) + " > .productPrice").text(books[youtubeCollection[youtubeID]]["price"]);
    }
    for (var foodID = 0; foodID < 6; foodID++) {
        $("#fourthShelf" + (foodID + 1) + " > a > img").attr("src", "images/bookcovers/" + foodCollection[foodID] + ".jpg");
        $("#fourthShelf" + (foodID + 1) + " > a").attr("href", "product.html?id=" + foodCollection[foodID]);
        $("#fourthShelf" + (foodID + 1) + " > .productAuthor").text(books[foodCollection[foodID]]["author"]);
        $("#fourthShelf" + (foodID + 1) + " > .productPrice").text(books[foodCollection[foodID]]["price"]);
    }
}

window.onload = loadData;

//Search Bar
var query = "";
function updateSearchResults() {
    //Ensures inputted text is transferred when page is resized
    $("#homeSearchInputFull").val(query);
    $("#homeSearchInputShorter").val(query);
    $("#homeSearchInputShortest").val(query);
    $("#landingLogo").css("display", "unset");
    $("#exploreText").css("visibility", "visible");
    if (query == "") { //Hides search results if nothing has been entered into search bar
        $("#searchResults").css("display", "none");
    } else {
        if (window.matchMedia("(max-width: 1000px)").matches) {
            $("#landingLogo").css("display", "none");
            $("#exploreText").css("visibility", "hidden");
        }
        $("#searchResults").css("display", "unset");
        $("#searchResults > h1").text(query);
        //Retrieves all books that match query
        var results = findImgResults(query);
        //Retrieves all text search results
        var textResultDicts = findTextResults(query);
        var textResults = Object.keys(textResultDicts);
        //Checks if any results have been found
        if (textResults.length + results.length == 0) {
            $("#noResults").css("display", "unset");
            $(".searchResultDivider").css("visibility", "hidden");
        } else {
            $("#noResults").css("display", "none");
            $(".searchResultDivider").css("visibility", "visible");
        }
        //Updates text search results
        for (var textResultID = 0; textResultID < 5; textResultID++) {
            if (textResults.length > textResultID) {
                $("#textResult" + (textResultID + 1)).text(textResults[textResultID]);
                $("#textResult" + (textResultID + 1)).css("display", "unset");
                $("#textResult" + (textResultID + 1)).attr("onclick", "window.location.href='searchQuery.html?query=" + textResults[textResultID] + "&type=" + textResultDicts[textResults[textResultID]] + "'");
                $("#textDivider" + (textResultID + 1)).css("visibility", "visible");
            } else {
                $("#textResult" + (textResultID + 1)).css("display", "none");
                $("#textDivider" + (textResultID + 1)).css("visibility", "hidden");
            }
        }

        //Image search results
        if (results.length > 0 && (!window.matchMedia("(max-width: 1000px)").matches || !window.matchMedia("(max-height: 565px)").matches)) {
            updateImgResult(1, books[results[0]]["type"], Object.keys(books[results[0]]["alternativeTypes"]), results);
            $("#imageDivider4").css("visibility", "visible");
            $("#imageResult1 > img").on("click", function () {
                document.location.href = "product.html?id=" + results[0];
            });
        } else {
            $("#imageResult1").css("display", "none");
            $("#imageDivider4").css("visibility", "hidden");
        }
        if (results.length > 1 && (!window.matchMedia("(max-height: 610px)").matches && (!window.matchMedia("(max-height: 740px)").matches || !window.matchMedia("(max-width: 1000px)").matches))) {
            $("#imageDivider1").css("visibility", "visible");
            updateImgResult(2, books[results[1]]["type"], Object.keys(books[results[1]]["alternativeTypes"]), results);
            $("#imageResult2 > img").on("click", function () {
                document.location.href = "product.html?id=" + results[1];
            });
        } else {
            $("#imageResult2").css("display", "none");
            $("#imageDivider1").css("visibility", "hidden");
        }
        if (results.length > 2 && (!window.matchMedia("(max-height: 740px)").matches && ((!window.matchMedia("(max-height: 920px)").matches && window.matchMedia("(max-width: 940px)").matches) || !window.matchMedia("(max-width: 1000px)").matches))) {
            $("#imageDivider2").css("visibility", "visible");
            updateImgResult(3, books[results[2]]["type"], Object.keys(books[results[2]]["alternativeTypes"]), results);
            $("#imageResult3 > img").on("click", function () {
                document.location.href = "product.html?id=" + results[2];
            });
        } else {
            $("#imageResult3").css("display", "none");
            $("#imageDivider2").css("visibility", "hidden");
        }
        if (results.length > 3 && !window.matchMedia("(max-height: 880px)").matches && !window.matchMedia("(max-width: 1000px)").matches) {
            $("#imageDivider3").css("visibility", "visible");
            updateImgResult(4, books[results[3]]["type"], Object.keys(books[results[3]]["alternativeTypes"]), results);
            $("#imageResult4 > img").on("click", function () {
                document.location.href = "product.html?id=" + results[3];
            });
        } else {
            $("#imageResult4").css("display", "none");
            $("#imageDivider3").css("visibility", "hidden");
        }

        //Type search results (Re-uses image book data)
        var types = [".searchPaperbackOption", ".searchHardcoverOption", ".searchBundleOption", ".searchAudioOption", ".searchStationaryOption"];
        var typesAvailable = [];

        for (var bookID = 0; bookID < results.length; bookID++) {
            if (!typesAvailable.includes(books[results[bookID]]["type"])) {
                typesAvailable.push(books[results[bookID]]["type"]);
            }
        }

        types.forEach(function (type, index) {
            $("#searchTypes" + " > " + type).css("display", "none");
            $("#searchTypes" + " > " + type).removeClass("firstTypeButton lastTypeButton onlyTypeButton");
        });

        typesAvailable.forEach(function (id, index) {
            $("#searchTypes" + " > " + types[id]).css("display", "unset");
        })

        if (typesAvailable.length > 1) {
            $("#searchTypes" + " > " + types[typesAvailable[0]]).addClass("firstTypeButton");
            $("#searchTypes" + " > " + types[typesAvailable[typesAvailable.length - 1]]).addClass("lastTypeButton");
        } else {
            $("#searchTypes" + " > " + types[typesAvailable[typesAvailable.length - 1]]).addClass("onlyTypeButton");
        }
    }
}

function updateImgResult(resultID, selectedType, alternatives, results) {
    $("#imageResult" + resultID + " > .imageBlurb > h1").text(books[results[resultID - 1]]["name"]);
    $("#imageResult" + resultID + " > .imageBlurb > p").text(books[results[resultID - 1]]["author"]);
    $("#imageResult" + resultID + "> img").attr("src", "images/bookcovers/" + results[resultID - 1] + ".jpg");
    $("#imageResult" + resultID).css("display", "unset");
    var types = [".searchPaperbackOption", ".searchHardcoverOption", ".searchBundleOption", ".searchAudioOption", ".searchStationaryOption"];
    var allowedIDs = [];
    alternatives.forEach(function (type, index) {
        allowedIDs.push(parseInt(type));
    });
    allowedIDs.push(selectedType);
    allowedIDs.sort();
    types.forEach(function (type, index) {
        $("#imageResult" + resultID + " > " + type).css("display", "none");
        $("#imageResult" + resultID + " > " + type).removeClass("firstTypeButton lastTypeButton selectedTypeButton onlyTypeButton");
    });

    allowedIDs.forEach(function (id, index) {
        $("#imageResult" + resultID + " > " + types[id]).css("display", "unset");
        if (Object.keys(books[results[resultID - 1]]["alternativeTypes"]).includes(id.toString())) {
            $("#imageResult" + resultID + " > " + types[id]).attr("onclick", "window.location.href='product.html?id=" + books[results[resultID - 1]]["alternativeTypes"][id] + "'");
        } else {
            $("#imageResult" + resultID + " > " + types[id]).attr("onclick", "window.location.href='product.html?id=" + results[resultID - 1] + "'");
        }
    });

    if (allowedIDs.length > 1) {
        $("#imageResult" + resultID + " > " + types[allowedIDs[0]]).addClass("firstTypeButton");
        $("#imageResult" + resultID + " > " + types[allowedIDs[allowedIDs.length - 1]]).addClass("lastTypeButton");
    } else {
        $("#imageResult" + resultID + " > " + types[allowedIDs[allowedIDs.length - 1]]).addClass("onlyTypeButton");
    }
    $("#imageResult" + resultID + " > " + types[selectedType]).addClass("selectedTypeButton");
}

//Prevents search result overflow when resizing window
$(window).resize(updateSearchResults);

$("#homeSearchInputFull").on('input propertychange', function () {
    query = $("#homeSearchInputFull").val();
    updateSearchResults();
});

$("#homeSearchInputShorter").on('input propertychange', function () {
    query = $("#homeSearchInputShorter").val();
    updateSearchResults();
});

$("#homeSearchInputShortest").on('input propertychange', function () {
    query = $("#homeSearchInputShortest").val();
    updateSearchResults();
});

//Body Interactions
$(".itemPopupBackdrop").on("click", function () {
    $(".itemPopupBackdrop").css("display", "none");
    $(".itemPopup").css("display", "none");
});

$(".itemMinimize").on("click", function () {
    $(".itemPopupBackdrop").css("display", "none");
    $(".itemPopup").css("display", "none");
});

$(".itemContinuePopup").on("click", function () {
    $(".itemPopupBackdrop").css("display", "none");
    $(".itemPopup").css("display", "none");
});

$(".productPrice").on("click", function () {
    $(".itemPopupBackdrop").css("display", "unset");
    $(".itemPopup").css("display", "unset");
});

$(".productBasket").on("click", function () {
    $(".itemPopupBackdrop").css("display", "unset");
    $(".itemPopup").css("display", "unset");
});
$("#footerCompressedExplore").on("click", function () {
    document.getElementById("footerCompressedCategories").innerHTML = `
            <li class="footerLink"><a href="index.html">About us</a></li>
            <li class="footerDivider"></li>
            <li class="footerLink"><a href="index.html">Sitemap</a></li>
            <li class="footerDivider"></li>
            <li class="footerLink"><a href="index.html">Bookmarks</a></li>
            <li class="footerDivider"></li>
            <li class="footerLink"><a href="index.html">Sign in/Join</a></li>
            <li class="footerDivider"></li>
        `;
});

$("#footerCompressedHelp").on("click", function () {
    document.getElementById("footerCompressedCategories").innerHTML = `
            <li class="footerLink"><a href="index.html">Help</a></li>
            <li class="footerDivider"></li>
            <li class="footerLink"><a href="index.html">Contact us</a></li>
            <li class="footerDivider"></li>
            <li class="footerLink"><a href="index.html">Where's my stuff?</a></li>
            <li class="footerDivider"></li>
            <li class="footerLink"><a href="index.html">Where do you deliver?</a></li>
            <li class="footerDivider"></li>
        `;
});

$("#footerCompressedJoin").on("click", function () {
    document.getElementById("footerCompressedCategories").innerHTML = `
            <li class="footerLink"><a href="index.html">Affiliates</a></li>
            <li class="footerDivider"></li>
            <li class="footerLink"><a href="index.html">Jobs</a></li>
            <li class="footerDivider"></li>
        `;
});

$("#footerCompressedImportant").on("click", function () {
    document.getElementById("footerCompressedCategories").innerHTML = `
            <li class="footerLink"><a href="index.html">Cookies</a></li>
            <li class="footerDivider"></li>
            <li class="footerLink"><a href="index.html">Privacy policy</a></li>
            <li class="footerDivider"></li>
            <li class="footerLink"><a href="index.html">Terms & Conditions</a></li>
            <li class="footerDivider"></li>
            <li class="footerLink"><a href="index.html">UK Modern Slavery Statement</a></li>
            <li class="footerDivider"></li>
        `;
});