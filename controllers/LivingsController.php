<?php
declare(strict_types=1);

/**
 * Classe LivingsController
 * Used to diplay the livings page
 * Display is done with a View Object
 * The View Object Method (render) requires an array as param
 */

class LivingsController
{
    public function display(){
        $databaseManager = new DatabaseManager();
        $livings = $databaseManager->getLivings();
        $animals = $databaseManager->getAllAnimals();
        $allLivingPageData = array($livings, $animals);

        $livingsView = new View('livings');
        $livingsView->render(array('allLivingPageData' => $allLivingPageData));
    }
}

