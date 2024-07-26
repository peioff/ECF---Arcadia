let baseUrl;
if (window.location.hostname === 'localhost') {
    baseUrl = window.location.origin + '/ecf/';
} else {
    baseurl = "https://ecf-arcadia-00d8251bc78c.herokuapp.com/";
}
function formApproval() {
    let animalName = document.getElementById('animalName').value;
    let reportDate = document.getElementById('reportDate').value;
    let animalHealth = document.getElementById('animalHealth').value;
    let reportRemark = document.getElementById('reportRemark').value;


    if (animalName.trim() === '' || animalName === 'Choose Animal') {
        toast('Please select an animal.', 'error');
    }
    if (reportDate.trim() === '') {
        toast('Please enter a date', 'error');
    }
    if (animalHealth.trim() === '') {
        toast('Please select a health status', 'error');
    }
    if (reportRemark.trim() === '') {
        toast('Remark is empty', 'info');
    }


    $( '#addReportForm' )
        .submit( function( e ) {
            $.ajax( {
                url: baseUrl + "addReportToDatabase",
                type: 'POST',
                dataType:'json',
                data: new FormData( this ),
                processData: false,
                contentType: false
            } ).done( function( response ) {
                if (response.error === 'none') {
                    toast('Rapport ajouté! Redirection dans 2 secondes', 'success');
                    window.setTimeout(() => {
                        window.location.replace("dashboardVet");
                    }, 2000);
                }
            }).fail( function( e ) {
                console.log(e)
                toast('Une erreur s\'est produite, retour à la page Nourrissage dans 2 secondes','error');
                // Simulate an HTTP redirect:
                window.setTimeout(() => {
                    window.location.replace("dashboardVet");
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