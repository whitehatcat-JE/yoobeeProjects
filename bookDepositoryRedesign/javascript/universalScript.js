function closeHeaderDropdowns() {
    languageMenuOpen = false;
    categoryMenuOpen = false;
    currencyMenuOpen = false;
    $("#languageDropdown").hide();
    $("#languageDropdownText").text("English\xa0\xa0\xa0▼");
    $("#currencyDropdown").hide();
    $("#currencyDropdownText").text("$ NZD\xa0\xa0\xa0▼");
    $("#categoryDropdown").hide();
    $("#categoryMenu").text("Shop by category\xa0\xa0\xa0▼");
}

var categoryMenuOpen = false;
$("#categoryMenu").on( "click", function() {
    categoryMenuOpen = !categoryMenuOpen;
    if (categoryMenuOpen) {
        closeHeaderDropdowns();
        categoryMenuOpen = true;
        $("#categoryDropdown").show();
        $("#categoryMenu").text("Shop by category\xa0\xa0\xa0▲");
    } else {
        closeHeaderDropdowns();
    }
});
$("#categoryDropdown").on( "mouseleave", function() {
    closeHeaderDropdowns();
});

var languageMenuOpen = false;
$("#languageMenu").on( "click", function() {
    languageMenuOpen = !languageMenuOpen;
    if (languageMenuOpen) {
        closeHeaderDropdowns();
        languageMenuOpen = true;
        $("#languageDropdown").show();
        $("#languageDropdownText").text("English\xa0\xa0\xa0▲");
    } else {
        closeHeaderDropdowns();
    }
});
$("#languageDropdown").on( "mouseleave", function(event) {
    closeHeaderDropdowns(); 
});

var currencyMenuOpen = false;
$("#currencyMenu").on( "click", function() {
    currencyMenuOpen = !currencyMenuOpen;
    if (currencyMenuOpen) {
        closeHeaderDropdowns();
        currencyMenuOpen = true;
        $("#currencyDropdown").show();
        $("#currencyDropdownText").text("$ NZD\xa0\xa0\xa0▲");
    } else {
        closeHeaderDropdowns();
    }
});
$("#currencyDropdown").on( "mouseleave", function(event) {
    closeHeaderDropdowns(); 
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

$("#footerCompressedExplore").on("click", function () {
    document.getElementById("footerCompressedCategories").innerHTML = `
            <li class="footerLink"><a href="about.html">About us</a></li>
            <li class="footerDivider"></li>
            <li class="footerLink"><a href="about.html">Sitemap</a></li>
            <li class="footerDivider"></li>
            <li class="footerLink"><a href="about.html">Bookmarks</a></li>
            <li class="footerDivider"></li>
            <li class="footerLink"><a href="login.html">Sign in/Join</a></li>
            <li class="footerDivider"></li>
        `;
    updateLinks();
});

$("#footerCompressedHelp").on("click", function () {
    document.getElementById("footerCompressedCategories").innerHTML = `
            <li class="footerLink"><a href="help.html">Help</a></li>
            <li class="footerDivider"></li>
            <li class="footerLink"><a href="contact.html">Contact us</a></li>
            <li class="footerDivider"></li>
            <li class="footerLink"><a href="about.html">Where's my stuff?</a></li>
            <li class="footerDivider"></li>
            <li class="footerLink"><a href="about.html">Where do you deliver?</a></li>
            <li class="footerDivider"></li>
        `;
    updateLinks();
});

$("#footerCompressedJoin").on("click", function () {
    document.getElementById("footerCompressedCategories").innerHTML = `
            <li class="footerLink"><a href="about.html">Affiliates</a></li>
            <li class="footerDivider"></li>
            <li class="footerLink"><a href="about.html">Jobs</a></li>
            <li class="footerDivider"></li>
        `;
    updateLinks();
});

$("#footerCompressedImportant").on("click", function () {
    document.getElementById("footerCompressedCategories").innerHTML = `
            <li class="footerLink"><a href="about.html">Cookies</a></li>
            <li class="footerDivider"></li>
            <li class="footerLink"><a href="about.html">Privacy policy</a></li>
            <li class="footerDivider"></li>
            <li class="footerLink"><a href="about.html">Terms & Conditions</a></li>
            <li class="footerDivider"></li>
            <li class="footerLink"><a href="about.html">UK Modern Slavery Statement</a></li>
            <li class="footerDivider"></li>
        `;
    updateLinks();
});

// Cart data assignment fallback
window.onload = updateCart();