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