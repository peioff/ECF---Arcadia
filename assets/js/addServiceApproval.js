let baseUrl;
if (window.location.hostname === 'localhost') {
    baseUrl = window.location.origin + '/ecf/';
} else {
    baseurl = "https://ecf-arcadia-00d8251bc78c.herokuapp.com/";
}
function formApproval() {
    let serviceName = document.getElementById('serviceName').value;
    let serviceSchedule = document.getElementById('serviceSchedule').value;
    let serviceContact = document.getElementById('serviceContact').value;
    let serviceDescription = document.getElementById('serviceDescription').value;

    if (serviceName.trim() === '') {
        toast('Please enter service name.', 'error');
    }
    if (serviceSchedule.trim() === '') {
        toast('Please enter schedule.', 'error');
    }
    if (serviceContact.trim() === '') {
        toast('Please enter contactInfos.', 'error');
    }
    if (serviceDescription.trim() === '') {
        toast('Please enter description.', 'error');
    }

    let serviceFile = document.getElementById('serviceFile').files;
    if (typeof serviceFile[0] !== 'undefined') {
        let file = serviceFile[0];
        let fileName = file.name;
        let split = fileName.split('.');
        let formats = ['jpg', 'png', 'jpeg'];
        if (!formats.includes(split[split.length - 1])) {
            toast('FileType not supported', 'error');
        }
    } else {
        toast('Select a file', 'error');
    }


    $( '#addServiceForm' )
        .submit( function( e ) {
            $.ajax( {
                url: baseUrl + "addServiceToDatabase",
                type: 'POST',
                dataType:'json',
                data: new FormData( this ),
                processData: false,
                contentType: false
            } ).done( function( response ) {
                if (response.error === 'none') {
                    toast('Service ajouté! Redirection dans 3 secondes', 'success');
                    window.setTimeout(() => {
                        window.location.replace("dashboardServices");
                    }, 3000);
                }

            }).fail( function( e ) {
                toast('Une erreur s\'est produite, retour à la page Animaux dans 3 secondes','error');
                // Simulate an HTTP redirect:
                window.setTimeout(() => {
                    window.location.replace("dashboardServices");
                }, 3000);
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