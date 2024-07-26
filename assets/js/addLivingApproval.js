let baseUrl;
if (window.location.hostname === 'localhost') {
    baseUrl = window.location.origin + '/ecf/';
} else {
    baseurl = "https://ecf-arcadia-00d8251bc78c.herokuapp.com/";
}
function formApprovalTest() {
    let livingName = document.getElementById('livingName').value;
    let livingDescription = document.getElementById('livingDescription').value;

    if (livingName.trim() === '') {
        toast('Please enter living name.', 'error');
    }
    if (livingDescription.trim() === '') {
        toast('Please enter a description.', 'error');
    }

    let livingFile = document.getElementById('livingFile').files;
    if (typeof livingFile[0] !== 'undefined') {
        let file = livingFile[0];
        let fileName = file.name;
        let split = fileName.split('.');
        let formats = ['jpg', 'png', 'jpeg'];
        if (!formats.includes(split[split.length - 1])) {
            toast('FileType not supported', 'error');
        }
    } else {
        toast('Select a file', 'error');
    }

    console.log(livingName);
    console.log(livingDescription);
    console.log(livingFile);

    $( '#addLivingForm' )
        .submit( function( e ) {
            $.ajax( {
                url: baseUrl + "addLivingToDatabase",
                type: 'POST',
                dataType:'json',
                data: new FormData( this ),
                processData: false,
                contentType: false
            } ).done( function( response ) {
                if (response.error === 'none') {
                    toast('Habitat ajouté! Redirection dans 3 secondes', 'success');
                    window.setTimeout(() => {
                        window.location.replace("dashboardLivings");
                    }, 3000);
                }

            }).fail( function( e ) {
                toast('Une erreur s\'est produite, retour à la page Animaux dans 3 secondes','error');
                // Simulate an HTTP redirect:
                window.setTimeout(() => {
                    window.location.replace("dashboardLivings");
                }, 3000);
            });
            e.preventDefault();
        } );


    //
    // $( '#addLivingForm' )
    //     .submit( function( e ) {
    //         $.ajax( {
    //             url: "http://localhost/ecf/addLivingToDatabase",
    //             type: 'POST',
    //             dataType: "json",
    //             data: new FormData( this ),
    //             processData: false,
    //             contentType: false
    //         } ).done( function( response ) {
    //             console.log(response);
    //             if (response.error === 'none') {
    //                 // toast('Habitat ajouté! Redirection dans 3 secondes', 'success');
    //                 // window.setTimeout(() => {
    //                 //     window.location.replace("http://localhost/ecf/dashboardLivings");
    //                 // }, 3000);
    //             }
    //         }).fail( function( e ) {
    //             console.log(e);
    //
    //             toast('Une erreur s\'est produite, retour à la page Habitat dans 3 secondes','error');
    //             // Simulate an HTTP redirect:
    //             // window.setTimeout(() => {
    //             //     window.location.replace("http://localhost/ecf/dashboardLivings");
    //             // }, 3000);
    //         });
    //         e.preventDefault();
    //     } );
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