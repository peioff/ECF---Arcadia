let baseUrl;
if (window.location.hostname === 'localhost') {
    baseUrl = window.location.origin + '/ecf/';
} else {
    baseurl = "https://ecf-arcadia-00d8251bc78c.herokuapp.com/";
}

function formApproval() {
    let animalName = document.getElementById('animalName').value;
    let animalSpecie = document.getElementById('animalSpecie').value;
    let animalLiving = document.getElementById('animalLiving').value;

    if (animalName.trim() === '') {
        toast('Please enter animal name.', 'error');
    }
    if (animalSpecie.trim() === '') {
        toast('Please enter a specie name.', 'error');
    }
    if (animalLiving.trim() === '') {
        toast('Please enter a living name.', 'error');
    }
    let animalFile = document.getElementById('animalFile').files;
    if (typeof animalFile[0] !== 'undefined') {
        let file = animalFile[0];
        let fileName = file.name;
        let split = fileName.split('.');
        let formats = ['jpg', 'png', 'jpeg'];
        if (!formats.includes(split[split.length - 1])) {
            toast('FileType not supported', 'error');
        }
    } else {
        toast('Select a file', 'error');
    }


    $( '#formId' )
        .submit( function( e ) {
            $.ajax( {
                url: baseUrl + "addAnimalToDatabase",
                type: 'POST',
                dataType: "json",
                data: new FormData( this ),
                processData: false,
                contentType: false
            } ).done( function( response ) {
                console.log(response.success);
                if (response.error === 'none') {
                    toast('Animal ajouté! Redirection dans 3 secondes', 'success');
                    window.setTimeout(() => {
                        window.location.replace("dashboardAnimals");
                        }, 3000);
                }


            }).fail( function( e ) {
                toast('Une erreur s\'est produite, retour à la page Animaux dans 3 secondes','error');
                // Simulate an HTTP redirect:
                window.setTimeout(() => {
                    window.location.replace("dashboardAnimals");
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