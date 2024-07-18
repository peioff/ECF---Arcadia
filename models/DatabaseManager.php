<?php

class DatabaseManager
{

    private $bdd;

    public function __construct()
    {
        $this->bdd = new PDO('mysql:host=localhost;dbname=ecf', 'admin', 'N0pl4c3t0h1d3?');
    }

    // Users
    private function getusers(): array
    {
        $bdd = $this->bdd;
        $query = $bdd->prepare('SELECT * FROM `users`');
        $req = $query->execute();
        while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
            $user = new UserModel();
            $user->setUsername($row['username']);
            $user->setRole($row['role']);
            $user->setPassword($row['password']);
            $user->setLastname($row['lastname']);
            $user->setFirstname($row['firstname']);
            $user->setEmail($row['email']);
            $users[] = $user;
        }
        return $users;
    }
    public function getUser($username)
    {
        foreach ($this->getusers() as $user) {
            if ($user->getUsername() == $username) {
                return $user;
            }
        }
        return null;
    }

    // Livings
    public function getLivings(): array
    {
        $bdd = $this->bdd;
        $query = "SELECT * FROM livings";
        $req = $bdd->prepare($query);
        $req->execute();


        while ($row = $req->fetch(PDO::FETCH_ASSOC)) {

            $living = new LivingModel();
            $living->setId($row['living_id']);
            $living->setName($row['name']);
            $living->setDescription($row['description']);
            $living->setImageId($row['image_id']);
            $living->setImage($this->getImg($row['image_id']));
            $livings[] = $living; // array of objects (LivingModel)
        }
        return $livings;
    }
    public function getLivingById(int $living_id): LivingModel
    {
        $bdd = $this->bdd;
        $query = "SELECT * from livings WHERE living_id = :living_id";
        $req = $bdd->prepare($query);
        $req->bindValue(':living_id',$living_id);
        $req->execute();
        while ($row = $req->fetch(PDO::FETCH_ASSOC)){
            $living = new LivingModel();
            $living->setId($row['living_id']);
            $living->setName($row['name']);
            $living->setDescription($row['description']);
            $living->setImageId($row['image_id']);
            $living->setImage($this->getImg($row['image_id']));

        }
        return $living;
    }
    public function addLivingToDatabase($living){
        $bdd = $this->bdd;
        $query = "INSERT INTO livings(name,description,image_id) VALUES (:name, :description, :image_id)";
        $req = $bdd->prepare($query);
        $req->bindValue(':name', $living->getName());
        $req->bindValue(':description', $living->getDescription());
        $req->bindValue(':image_id', $living->getImageId());
        $req->execute();

    }
    public function updateLiving(LivingModel $living)
    {
        $bdd = $this->bdd;
        $query = "UPDATE livings SET name = :name, description = :description, image_id = :image_id WHERE living_id = :living_id";
        $req = $bdd->prepare($query);
        $req->bindValue(':name', $living->getName());
        $req->bindValue(':description', $living->getDescription());
        $req->bindValue(':image_id', $living->getImageId());
        $req->bindValue(':living_id', $living->getId());

        $req->execute();
    }
    public function deleteLiving(int $livingId)
    {
        $bdd = $this->bdd;
        $query = "DELETE FROM livings WHERE living_id = :living_id";
        $req = $bdd->prepare($query);
        $req->bindValue(':living_id', $livingId);
        $image_id = $this->getLivingById($livingId)->getImageId();
        $this->deleteImg($image_id);
        $req->execute();
    }

    // Animals
    public function getAllAnimals(): array
    {
        $bdd = $this->bdd;
        $query = "SELECT * FROM animals";
        $req = $bdd->prepare($query);
        $req->execute();

        while ($row = $req->fetch(PDO::FETCH_ASSOC)) {
            $animal = new AnimalModel();
            $animal->setId($row['animal_id']);
            $animal->setName($row['name']);
            $animal->setSpecies($row['species']);
            $animal->setLiving($row['living']);
            $animal->setImageId($row['image_id']);
            $animal->setImage($this->getImg($row['image_id']));

            $animals[] = $animal; // Array of all animals in database
        }
        return $animals;
    }
    public function getAnimalById(int $animal_id): AnimalModel
    {
        $bdd = $this->bdd;
        $query = "SELECT * from animals WHERE animal_id = :animal_id";
        $req = $bdd->prepare($query);
        $req->bindValue(':animal_id',$animal_id);
        $req->execute();

        while ($row = $req->fetch(PDO::FETCH_ASSOC)){
            $animal = new AnimalModel();
            $animal->setId($row['animal_id']);
            $animal->setName($row['name']);
            $animal->setSpecies($row['species']);
            $animal->setLiving($row['living']);
            $animal->setImageId($row['image_id']);
            $animal->setImage($this->getImg($row['image_id']));
        }
        return $animal;
    }
    public function addAnimal($name, $species, $living, $lastInsertedId)
    {
        $bdd = $this->bdd;
        $query = "INSERT INTO animals(name, species, living, image_id) VALUES ('$name', '$species', '$living', '$lastInsertedId')";
        $req = $bdd->prepare($query);
        $req->execute();
    }
    public function updateAnimal(AnimalModel $animal)
    {
        $bdd = $this->bdd;
        $query = "UPDATE animals SET name = :name, species = :species, living = :living, image_id = :image_id WHERE animal_id = :animal_id";
        $req = $bdd->prepare($query);
        $req->bindValue(':name', $animal->getName());
        $req->bindValue(':species', $animal->getSpecies());
        $req->bindValue(':living', $animal->getLiving());
        $req->bindValue(':image_id', $animal->getImageId());
        $req->bindValue(':animal_id', $animal->getId());
        $req->execute();
    }
    public function deleteAnimal(int $animal_id){
        $bdd = $this->bdd;
        $query = "DELETE FROM animals WHERE animal_id = :animal_id";
        $req = $bdd->prepare($query);
        $req->bindValue(':animal_id', $animal_id);
        $image_id = $this->getAnimalById($animal_id)->getImageId();
        $this->deleteImg($image_id);
        $req->execute();
    }

    // Services
    public function getServices(): array
    {
        $bdd = $this->bdd;
        $query = "SELECT * FROM services";
        $req = $bdd->prepare($query);
        $req->execute();
        while ($row = $req->fetch(PDO::FETCH_ASSOC)) {

            $service = new ServiceModel();
            $service->setId($row['service_id']);
            $service->setName($row['name']);
            $service->setSchedule($row['schedule']);
            $service->setContactInfo($row['contact_info']);
            $service->setImageId($row['image_id']);
            $service->setImage($this->getImg($row['image_id']));
            $service->setDescription($row['description']);

            $services[] = $service; // array of objects (ServiceModel)
        }
        return $services;
    }
    public function getServiceById(int $serviceId): ServiceModel
    {
        $bdd = $this->bdd;
        $query = "SELECT * from services WHERE service_id = :service_id";
        $req = $bdd->prepare($query);
        $req->bindValue(':service_id',$serviceId);
        $req->execute();
        while ($row = $req->fetch(PDO::FETCH_ASSOC)){
            $service = new ServiceModel();
            $service->setId($row['service_id']);
            $service->setName($row['name']);
            $service->setSchedule($row['schedule']);
            $service->setContactInfo($row['contact_info']);
            $service->setDescription($row['description']);
            $service->setImageId($row['image_id']);
            $service->setImage($this->getImg($row['image_id']));
        }
        return $service;
    }
    public function addServiceToDatabase($service){
        $bdd = $this->bdd;
        $query = "INSERT INTO services(name,schedule,contact_info,description,image_id) VALUES (:name,:schedule,:contact_info, :description, :image_id)";
        $req = $bdd->prepare($query);
        $req->bindValue(':name', $service->getName());
        $req->bindValue(':schedule', $service->getSchedule());
        $req->bindValue(':contact_info', $service->getContactInfo());
        $req->bindValue(':description', $service->getDescription());
        $req->bindValue(':image_id', $service->getImageId());
        $req->execute();
    }
    public function updateService(ServiceModel $service)
    {
        $bdd = $this->bdd;
        $query = "UPDATE services SET name = :name, schedule = :schedule, contact_info = :contact_info , description = :description, image_id = :image_id WHERE service_id = :service_id";
        $req = $bdd->prepare($query);
        $req->bindValue(':name', $service->getName());
        $req->bindValue(':schedule', $service->getSchedule());
        $req->bindValue(':contact_info', $service->getContactInfo());
        $req->bindValue(':description', $service->getDescription());
        $req->bindValue(':image_id', $service->getImageId());
        $req->bindValue(':service_id', $service->getId());
        $req->execute();
    }
    public function deleteService(int $serviceId)
    {
        $bdd = $this->bdd;
        $query = "DELETE FROM services WHERE service_id = :service_id";
        $req = $bdd->prepare($query);
        $req->bindValue(':service_id', $serviceId);
        $image_id = $this->getServiceById($serviceId)->getImageId();
        $this->deleteImg($image_id);
        $req->execute();
    }

    // Comments
    public function getComments(): array
    {
        $bdd = $this->bdd;
        $query = "SELECT * FROM comments";
        $req = $bdd->prepare($query);
        $req->execute();
        while ($row = $req->fetch(PDO::FETCH_ASSOC)) {
            $comment = new CommentModel();
            $comment->setId($row['comment_id']);
            $comment->setNickname($row['nickname']);
            $comment->setContent($row['content']);
            $comment->setVisibility($row['visibility']);
            $comments[] = $comment;
        }
        return $comments;
    }
    public function insertComment(string $nickname, string $message)
    {
        $bdd = $this->bdd;
        $query = "INSERT INTO comments (nickname, content,visibility) VALUES ('$nickname', '$message' , 1)";
        $req = $bdd->prepare($query);
        $req->execute();
    }

    // Feeding
    public function getFeedings():array{
        $bdd = $this->bdd;
        $query = "SELECT * FROM feedings";
        $req = $bdd->prepare($query);
        $req->execute();
        while ($row = $req->fetch(PDO::FETCH_ASSOC)){
            $feeding = new FeedingModel();
            $feeding->setId($row['feeding_id']);
            try {
                $feeding->setDate(new DateTime($row['date']));
            } catch (Exception $e) {
            }
            $feeding->setFood($row['food']);
            $feeding->setQuantity($row['quantity']);
            $feeding->setAnimalId($row['animal_id']);
            $feedings[] = $feeding;
        }
        return $feedings;
    }
    public function getFeedingById(int $feedingId): FeedingModel
    {
        $bdd = $this->bdd;
        $query = "SELECT * from feedings WHERE feeding_id = :feeding_id";
        $req = $bdd->prepare($query);
        $req->bindValue(':feeding_id',$feedingId);
        $req->execute();
        while ($row = $req->fetch(PDO::FETCH_ASSOC)){
            $feeding = new FeedingModel();
            $feeding->setId(intval($row['feeding_id']));
            try {
                $feeding->setDate(new DateTime($row['date']));
            } catch (Exception $e) {
            }
            $feeding->setFood($row['food']);
            $feeding->setQuantity($row['quantity']);
            $feeding->setAnimalId(intval($row['animal_id']));
        }
        return $feeding;
    }
    public function addFeedingToDatabase(FeedingModel $feeding){
        $bdd = $this->bdd;
        $query = "INSERT INTO feedings(date,food,quantity,animal_id) VALUES (:date,:food,:quantity,:animal_id)";
        $req = $bdd->prepare($query);
        $date = $feeding->getDate();
        $result =  $date->format('d-m-Y');
        $req->bindValue(':date', $result);
        $req->bindValue(':food', $feeding->getFood());
        $req->bindValue(':quantity', $feeding->getQuantity());
        $req->bindValue(':animal_id', $feeding->getAnimalId());
        $req->execute();
    }
    public function updateFeeding(FeedingModel $feeding)
    {
        $bdd = $this->bdd;
        $query = "UPDATE feedings SET date = :date, food = :food, quantity = :quantity , animal_id = :animal_id WHERE feeding_id = :feeding_id";
        $req = $bdd->prepare($query);
        $date = $feeding->getDate();
        $result =  $date->format('d-m-Y');
        $req->bindValue(':date', $result);
        $req->bindValue(':food', $feeding->getFood());
        $req->bindValue(':quantity', $feeding->getQuantity());
        $req->bindValue(':animal_id', $feeding->getAnimalId());
        $req->bindValue(':feeding_id', $feeding->getId());
        $req->execute();
    }
    public function deleteFeeding(int $feedingId){
        $bdd = $this->bdd;
        $query = "DELETE FROM feedings WHERE feeding_id = :feeding_id";
        $req = $bdd->prepare($query);
        $req->bindValue(':feeding_id', $feedingId);
        $req->execute();
    }

    //Report
    public function getReports():array{
        $bdd = $this->bdd;
        $query = "SELECT * FROM reports";
        $req = $bdd->prepare($query);
        $req->execute();
        while ($row = $req->fetch(PDO::FETCH_ASSOC)){
            $report = new ReportModel();
            $report->setId($row['report_id']);

            try {
                $report->setDate(new DateTime($row['date']));
            } catch (Exception $e) {
            }
            $report->setHealth($row['health']);
            $report->setFood($row['food']);
            $report->setFoodQuantity($row['food_quantity']);
            try {
                $report->setFeedingDate(new DateTime($row['feeding_date']));
            } catch (Exception $e) {
            }
            $report->setRemark($row['remark']);
            $report->setAnimalId($row['animal_id']);
            $reports[] = $report;
        }
        return $reports;
    }
    public function addReportToDatabase(ReportModel $report){
        $bdd = $this->bdd;
        $query = "INSERT INTO reports(date,health,food,food_quantity,feeding_date,remark,animal_id) VALUES (:date,:health,:food,:food_quantity,:feeding_date,:remark,:animal_id)";
        $req = $bdd->prepare($query);
        $date =   $report->getDate();
        $result = $date->format('d-m-Y');

        $req->bindValue(':date', $result);
        $req->bindValue(':health', $report->getHealth());
        $req->bindValue(':food', $report->getFood());
        $req->bindValue(':food_quantity', $report->getFoodQuantity());
        $date = $report->getFeedingDate();
        $result = $date->format('d-m-Y');
        $req->bindValue(':feeding_date', $result);
        $req->bindValue(':remark', $report->getRemark());
        $req->bindValue(':animal_id', $report->getAnimalId());
        $req->execute();
    }
    public function deleteReport(int $reportId){
        $bdd = $this->bdd;
        $query = "DELETE FROM reports WHERE report_id = :report_id";
        $req = $bdd->prepare($query);
        $req->bindValue(':report_id', $reportId);
        $req->execute();
    }

    //Img
    public function getImg($image_id):ImageModel
    {
        $bdd = $this->bdd;
        $query = "SELECT * FROM images WHERE image_id = :image_id";
        $req = $bdd->prepare($query);
        $req->bindValue(':image_id', $image_id);
        $req->execute();

        while ($row = $req->fetch(PDO::FETCH_ASSOC)) {
            $image = new ImageModel();
            $image->setId($row['image_id']);
            $image->setData($row['image_data']);
        }
        return $image;
    }

    public function addImage($image_name, $image_data):int
    {
        $bdd = $this->bdd;
        $query = "INSERT INTO `images`(`image_name`, image_data) VALUES (:image_name,:image_data)";
        $req = $bdd->prepare($query);
        $req->bindValue(':image_name', $image_name);
        $req->bindValue(':image_data', $image_data);
        $req->execute();

        $query = "SELECT LAST_INSERT_ID() FROM images";
        $req = $bdd->prepare($query);
        $req->execute();
        while ($row = $req->fetch(PDO::FETCH_ASSOC)) {
            $result = $row['LAST_INSERT_ID()'];
        }
        return $result;
    }

    public function deleteImg(int $image_id){
        $bdd = $this->bdd;
        $query = "DELETE FROM images WHERE image_id = :image_id";
        $req = $bdd->prepare($query);
        $req->bindValue(':image_id', $image_id);
        $req->execute();
    }
}