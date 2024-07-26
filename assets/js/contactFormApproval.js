let baseUrl;
if (window.location.hostname === 'localhost') {
    baseUrl = window.location.origin + '/ecf/';
} else {
    baseurl = "https://ecf-arcadia-00d8251bc78c.herokuapp.com/";
}
function formApproval() {
    let nickname =document.getElementById('contactNickname').value;
    let title =document.getElementById('contactTitle').value;
    let email =document.getElementById('contactMail').value;
    let content =document.getElementById('contactContent').value;

    if (nickname === "" || title === "" || email ==="" || content ==="") {
       // new Notification('Hi, How are you?');
    this.toast("Merci de remplir tous les champs", "warning");
    }

    if(email !== "" && !validateEmail(email)) {
        this.toast("Format d'adresse e-mail invalide", "info");
    }
    else {
        $.ajax({
                url: baseUrl + "contactApproval",
                method: "post",
                dataType: "json"
                ,
                data:{
                    nickname: nickname,
                    title : title,
                    email : email,
                    content : content,
                },
            }
        ).done(function (response) {
            console.log(response);

            if (response.error === 'invalidEmail') {
                toast(response.message,'error');
            }

            if (response.error !== 'invalidEmail' && response.error !== 'emptyField') {
                toast(response.message,'success');
                // Simulate an HTTP redirect:
                window.setTimeout(() => {
                    window.location.replace("home");
                }, 3000);
            }
        })
            .fail(function (error) {
                toast('Une erreur s\'est produite, retour à la page d\'accueil dans 3 secondes','error');
                // Simulate an HTTP redirect:
                window.setTimeout(() => {
                    window.location.replace("home");
                }, 3000);            })
            .always(function () {
            });
    }

}

function toast(message,type){
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

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}


