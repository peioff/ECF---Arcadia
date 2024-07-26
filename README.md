# Bienvenue

Bienvenue sur mon repository Git.    

Ce repository contient le code nécessaire à l'éxécution de l'application web crée lors de mon cursus de formation et nommée ECF-Arcadia.  
Ce fichier README.md contient les instructions à suivre afin d'être en mesure de déployer l'application web en local.

LE CLONAGE OU LE TELECHARGEMENT DU CODE POUR UNE EXECUTION LOCALE DOIT SE FAIRE DEPUIS LA BRANCHE DEV

# Instructions de déploiement en local

## 1-Télécharger et installer XAMPP
[XAMPP-Download](https://www.apachefriends.org/fr/index.html)

Il est recommandé d'installer xampp à la racine du disque local

## 2 - Télécharger et installer MySQL
[MySQL-Download](https://dev.mysql.com/downloads/mysql/)

## 3-Configurer les variables d'environnement
Si vous êtes sur un environnement Windows, assurer vous que les variables d'environnement PHP, PostgresSQL et MySQL server sont ajoutées.

### Pour vérifier :
Dans paramètres, rechercher : "Modifier les variables d'environnement pour votre compte"  

Dans la section "Variables utilisateurs pour "Nom d'utilisateur", sélectionner "Path" et cliquer sur "Modifier..."

Vérifier que les chemins "C:\xampp\php", "C:\xampp\mysql\bin", "C:\Program Files\MySQL\MySQL Server 8.0\bin" et "C:\Program Files\PostgresSQL\16\bin" sont bien présents sinon, ajouter manuellement en cliquant sur "Nouveau"

## 4 - Télécharger ou cloner le repository git

Choisir une méthode afin de récupérer le code source.

## 5 - Déplacer les fichiers

Créer un dossier "\ecf" dans "C:\\...\xampp\htdocs"

Déplacer les fichiers récupérés dans ce nouveau dossier

Le chemin final doit être "C:\\...\xampp\htdocs\ecf\"

## 6 - Modifier les identifiants d'accès à la base de donnée

Il faut modifier le fichier situé dans le dossier "models" et nommé DatabaseManager.php

```
//Remplacer dans le contructeur
         $this->bdd = new PDO('mysql:host=localhost;dbname=ecf', 'admin', 'N0pl4c3t0h1d3?');

//Par   
         $this->bdd = new PDO('mysql:host=localhost;dbname=ecf', '[nom_uisateur]', '[mot_de-passe]');
         
//Si aucun utilisateur configuré :
         $this->bdd = new PDO('mysql:host=localhost;dbname=ecf', 'root', '');

```

## 7 - Lancer XAMPP Control Panel

Une fois lancé, activer le module Apache en cliquant sur "Start"  
activer le module MySQL en cliquant sur "Start"

## 8 - Importer database.sql dans PhpMyAdmin

Il est maintenant nécessaire d'importer la base de donnée fournie.  

Le fichier "database.sql" se trouve à la racine du dossier.  

Dans XAMPP, dans le module MySQL, cliquer sur "Admin"  

Dans la fenêtre principale, cliquer sur "Importer"  

Sélectionner "database.sql" et cliquer sur "Importer"

## 9 - Naviguer

L'application web est maintenant déployée, elle est accessible via l'URL :
"http://localhost/nom-du_dossier_cloné_ou_téléchargé/"


  

  

  

  

  
  
  




