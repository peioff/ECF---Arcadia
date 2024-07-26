let baseUrl;
if (window.location.hostname === 'localhost') {
    baseUrl = window.location.origin + '/ecf/';
} else {
    baseurl = "https://ecf-arcadia-00d8251bc78c.herokuapp.com/";
}
function formApproval() {
    let username = document.getElementById('formUsername').value;
    let password = document.getElementById('formPassword').value;
    let confirmPassword = document.getElementById('formConfirmPassword').value;
    let role = document.getElementById('formRole').value;
    let lastName = document.getElementById('formLastname').value;
    let firstName = document.getElementById('formFirstname').value;
    let email = document.getElementById('formEmail').value;

    if (username.trim() === '') {
        toast('Please enter username.', 'error');
    }
    if (password.trim() === '') {
        toast('Please enter password.', 'error');
    }
    if (confirmPassword.trim() === '') {
        toast('Please confirm password.', 'error');

    }
    if ((password !== '' && password !== confirmPassword) || (confirmPassword !== '' && password !== confirmPassword)) {
        toast('Passwords don\'t match', 'error');
    }
    if (role.trim() === 'Choose Role') {
        toast('Please select a role', 'error');
    }
    if (lastName.trim() === '') {
        toast('Please enter a lastname', 'error');
    }
    if (firstName.trim() === '') {
        toast('Please enter a firstname', 'error');
    }
    if (!checkPassword(password)) {
        toast('Please enter a new password', 'error');
    }

    $('#addUserForm')
        .submit(function (e) {
            $.ajax({
                url: baseUrl + "addUserToDatabase",
                type: 'POST',
                dataType: 'json',
                data: new FormData(this),
                processData: false,
                contentType: false,
                cache:false
            }).done(function (response) {
                if (response.error === 'MismatchPassword') {
                    toast('Passwords not matching', 'error');
                }
                if (response.error === 'InvalidPassword'){
                    toast('Password must contain at least 6 characters, one capitalized letter, one number and one special character', 'error');
                }
                if (response.error === 'none') {
                    toast('Utilisateur ajouté! Redirection dans 2 secondes', 'success');
                    window.setTimeout(() => {
                        window.location.replace("dashboardUsers");
                    }, 2000);
                }
            }).fail(function (e) {
                console.log(e)
                toast('Une erreur s\'est produite, retour à la page Utilisateurs dans 2 secondes', 'error');
                window.setTimeout(() => {
                    window.location.replace("dashboardUsers");
                }, 2000);
            });
            e.preventDefault();
        });


}


function toast(message, type) {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-bottom-full-width",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    toastr[type](message)
}


function checkPassword(password) {
    let validLength = false;
    let validCapitalize = false;
    let validNumber = false;
    let validSpecial = false;

    if (password.match(/[A-Z]+/)) {
        validCapitalize = true;
    }
    if (password.match(/[0-9]+/)) {
        validNumber = true;
    }
    if (password.match(/[$@#&!?]+/)) {
        validSpecial = true
    }
    if (password.length > 6) {
        validLength = true;
    }
    return validLength && validCapitalize && validNumber && validSpecial;
}


function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}