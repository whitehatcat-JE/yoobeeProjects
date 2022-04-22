var invalidCreation = false;
function confirmAccount() {
    var searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has("email") && searchParams.has("password") && !invalidCreation) {
        if (searchParams.get("email") == $("#loginEmail").val() && searchParams.get("password") == $("#loginPassword").val()) {
            window.location.href="index.html?cart=Å";
        } else {
            window.alert("Incorrect email and/or password");
        }
    } else {
        window.alert("No accounts have been created.");
    }
}

function reEnterAccount() {
    var searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has("email") || searchParams.has("password") || searchParams.has("name")) {
        if (searchParams.get("email") == "" || searchParams.get("password") == "" || searchParams.get("name") == "") {
            invalidCreation = true;
            window.alert("Please enter information into all sign-up fields");
        } else {
            window.alert("Account created successfully");
        }
    }
}

window.onload = reEnterAccount;