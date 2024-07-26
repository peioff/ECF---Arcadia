let baseUrl;
if (window.location.hostname === 'localhost') {
    baseUrl = window.location.origin + '/ecf/';
} else {
    baseurl = "https://ecf-arcadia-00d8251bc78c.herokuapp.com/";
}
function animalOnClick(animalId,element){
   console.log(element);
    //Init
        //Variables
    let isVisible = false;
        // DOM elements
    const main = document.querySelector('main');
    const mainContainer = document.createElement("div");

    const infoContainer = document.createElement("div");
    const mainTitle = document.createElement("h1");

    const animalInfo = document.createElement("div");
    const name = document.createElement("h2");
    const animalImg = document.createElement("img");
    const specie = document.createElement("p");
    const living = document.createElement("p");

    const feedingContainer = document.createElement("div");
    const feedingTitle = document.createElement("p");
    const food = document.createElement("p");
    const foodQuantity = document.createElement("p");
    const feedingDate = document.createElement("p");

    const vetContainer = document.createElement("div");
    const vetTitle = document.createElement("p");
    const vetDate = document.createElement("p");
    const health = document.createElement("p");
    const remark = document.createElement("p");






    const promise = new Promise((resolve, reject) => {
        const animal = new Animal();
        let image;
        //Reaching Server and creating a new Animal
        $.ajax({
            url: baseUrl + "animalOnClick",
            method: "GET",
            dataType: "json",
            data: {
                animalId: animalId,
            }
        })
            .done(function (response) {
                console.log(JSON.stringify(response));
                animal.name = response.name;
                animal.specie = response.specie;
                animal.living = response.living;
                animal.food = response.food;
                animal.foodQuantity = response.foodQuantity;
                animal.feedingDate = response.feedingDate;
                animal.date = response.date;
                animal.health = response.health;
                animal.remark = response.remark;
                resolve(animal) // Resolve
            })
            .fail(function (error) {
                console.log(JSON.stringify(error));
                reject('Failed to load animal'); // Reject
            })
   })

    promise
        .then((response) => {
            domInsertion(response);
      console.log( 'Réponse résolue :' ,response);
    })
        .catch((error) => {
            console.log(error);
        })
    console.log(promise)

    function domInsertion(animal){
        // DOM manipulation

        main.appendChild(mainContainer);
        mainContainer.appendChild(infoContainer);

        // //Main Title
        // infoContainer.appendChild(mainTitle);
        // $(mainTitle).attr('id',"mainTitle");
        // mainTitle.innerHTML = 'Carte d\'identité:';

        //Info container
        infoContainer.appendChild(animalInfo);
        $(animalInfo).attr('id',"animalInfo");

        //Picture
        animalInfo.appendChild(animalImg);
        $(animalImg).attr('id',"picture");
        $(animalImg).attr('src',element.src);
            //Name
        animalInfo.appendChild(name);
        $(animalInfo).attr('id',"animalInfo");
        name.innerHTML = "Nom : " + animal.name;
            //Specie
        animalInfo.appendChild(specie);
        specie.innerHTML = "Espèce : " + animal.specie;
            //Living
        animalInfo.appendChild(living);
        living.innerText = "Habitat : " + animal.living;

        //Section title
        infoContainer.appendChild(feedingTitle);
        $(feedingTitle).addClass('section-title');
        feedingTitle.innerText = 'Dernière nourriture consommée';

        //FoodContainer
        infoContainer.appendChild(feedingContainer);
        $(feedingContainer).attr('id',"feedingContainer");
            //FeedingDate
        feedingContainer.appendChild(feedingDate);
        feedingDate.innerText = "Le : " + animal.feedingDate;
            //Food
        feedingContainer.appendChild(food);
        food.innerText = "Nourriture : " + animal.food;
            //FoodQuantity
        feedingContainer.appendChild(foodQuantity);
        foodQuantity.innerText = "Quantité : " + animal.foodQuantity + " g";

        //Section Title
        infoContainer.appendChild(vetTitle);
        vetTitle.innerText = 'Avis du vétérinaire';
        $(vetTitle).addClass('section-title');

        //Vet
        infoContainer.appendChild(vetContainer);
        $(vetContainer).attr('id',"vetContainer");
            //Date
        vetContainer.appendChild(vetDate);
        vetDate.innerText = "Date de passage : " + animal.date;
            //Health
        vetContainer.appendChild(health);
        health.innerText = "Santé : " + animal.health;
            //Remark
        vetContainer.appendChild(remark);
        remark.innerText = "Avis : " + animal.remark;




        //Display the popup
        if(!isVisible){
            // Popup show
            $(mainContainer).addClass('popup');
            $(infoContainer).addClass('contained');
            isVisible = true;
        }
        // Hide onclick
        window.setTimeout(() => {
            $(window).click(function(){
                if (isVisible) {
                    $(mainContainer).removeClass('popupShow');
                    $(mainContainer).addClass('popupHide');
                    isVisible = false;
                }
            })
        }, 500);
    }




}

