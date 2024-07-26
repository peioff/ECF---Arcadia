let baseUrl;
if (window.location.hostname === 'localhost') {
    baseUrl = window.location.origin + '/ecf/';
} else {
    baseurl = "https://ecf-arcadia-00d8251bc78c.herokuapp.com/";
}
function formApproval() {
    let feedingDate = document.getElementById('feedingDate').value;
    let feedingFood = document.getElementById('feedingFood').value;
    let feedingQuantity = document.getElementById('feedingQuantity').value;

    if (feedingDate.trim() === '') {
        toast('Please enter a date.', 'error');
    }
    if (feedingFood.trim() === '') {
        toast('Please enter food name', 'error');
    }
    if (feedingQuantity.trim() === '') {
        toast('Please enter a quantity', 'error');
    }


    $( '#addFeedingForm' )
        .submit( function( e ) {
            $.ajax( {
                url: baseUrl + "addFeedingToDatabase",
                type: 'POST',
                dataType:'json',
                data: new FormData( this ),
                processData: false,
                contentType: false
            } ).done( function( response ) {
                if (response.error === 'none') {
                    toast('Nourrissage ajouté! Redirection dans 2 secondes', 'success');
                    window.setTimeout(() => {
                        window.location.replace( baseUrl + "dashboardFeedings");
                    }, 2000);
                }

            }).fail( function( e ) {
                toast('Une erreur s\'est produite, retour à la page Nourrissage dans 2 secondes','error');
                // Simulate an HTTP redirect:
                window.setTimeout(() => {
                    window.location.replace(baseUrl + "dashboardFeedings");
                }, 2000);
            });
            e.preventDefault();
        } );

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