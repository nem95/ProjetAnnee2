<?php
	require_once('../../stripe-php/init.php');
	$app->map('/:x+', function($x) {http_response_code(200);})->via('OPTIONS');


	//$pdo = new pdo("mysql:dbname=db317889_tim;host=db317889-tim.sql-pro.online.net","db82530","supercon18");
	//$pdo = new pdo("mysql:dbname=voixture;host=localhost","root","");

	$bddLocal = "voixture";

	/* ############################################################ VOIXTURE ############################################################################# */

																					/*#################### NAVIGATEUR ###################### */

			$app->post('/login',function() use ($app)  {
				$param = json_decode($app->request->getBody());
	  		$nom = $param->nom;
				$password = $param->password;
    		if((isset($nom)) && (isset($password)))
      	{
					$pdo = new pdo("mysql:dbname=voixture;host=localhost","root","");
			 		$result = $pdo->prepare("SELECT * FROM clients WHERE nom_client = '$nom' AND password_client = '$password'");
			 		$result->execute();
			 		$user = array();
			 		$user = $result->fetchAll(PDO::FETCH_ASSOC);
			 		echoResponse(200, $user);
			 		}
			});


			/*#################### Todolist ###################### */
			$app->post('/todo', function() use ($app)  {
				$param = json_decode($app->request->getBody());
				$todo = $param->todo;
				if (!empty($todo)) {
					$pdo = new pdo("mysql:dbname=voixture;host=localhost","root","");
					$statement = $pdo->prepare("INSERT INTO `voixture`.`todo_bureau` (`todo`) VALUES (?)");
					$statement->execute(array($todo));
					$row["message"] = "Le message est bien envoyer.";
					echoResponse(200, $row);
				}
			});


			$app->get('/todoBur', function()  {
				$pdo = new pdo("mysql:dbname=voixture;host=localhost","root","");
				$statement = $pdo->prepare("SELECT * FROM todo_bureau");
				$statement->execute();
				$todoBur = array();
				$todoBur = $statement->fetchAll(PDO::FETCH_ASSOC);
				echoResponse(200, $todoBur);
			});

			$app->post('/deleteTodo',function() use ($app)  {
				$param = json_decode($app->request->getBody());
				$id = $param->id;
				if((isset($id)))
				{
					$pdo = new pdo("mysql:dbname=voixture;host=localhost","root","");
					$result = $pdo->prepare("DELETE FROM todo_bureau WHERE id = $id");
					$result->execute();
					$row["message"] = "Ce favori a bien été supprimé";
					echoResponse(200, $row);
				}
			});

			$app->post('/loginB',function() use ($app)  {
				$param = json_decode($app->request->getBody());
				$nom = $param->nom;
				$password = $param->password;
				if((isset($nom)) && (isset($password)))
				{
					$pdo = new pdo("mysql:dbname=voixture;host=localhost","root","");
					$result = $pdo->prepare("SELECT * FROM chauffeurs WHERE nom_chauffeur = '$nom' AND password_chauffeur = '$password'");
					$result->execute();
					$userB = array();
					$userB = $result->fetchAll(PDO::FETCH_ASSOC);
					echoResponse(200, $userB);
					}
			});

			$app->post('/loginC',function() use ($app)  {
				$param = json_decode($app->request->getBody());
				$nom = $param->nom;
				$password = $param->password;
				if((isset($nom)) && (isset($password)))
				{
					$pdo = new pdo("mysql:dbname=voixture;host=localhost","root","");
					$result = $pdo->prepare("SELECT * FROM admin WHERE nom_admin = '$nom' AND password_admin = '$password'");
					$result->execute();
					$user = array();
					$user = $result->fetchAll(PDO::FETCH_ASSOC);
					echoResponse(200, $user);
					}
			});

			$app->post('/FavorisClient',function() use ($app)  {
				$param = json_decode($app->request->getBody());
				$nom = $param->nom;
				$password = $param->password;
				if((isset($nom)) && (isset($password)))
				{
					$pdo = new pdo("mysql:dbname=voixture;host=localhost","root","");
					$result = $pdo->prepare("SELECT * FROM favoris WHERE nom_client = '$nom' AND password_client = '$password'");
					$result->execute();
					$userFavoris = array();
					$userFavoris = $result->fetchAll(PDO::FETCH_ASSOC);
					echoResponse(200, $userFavoris);
					}
			});

			$app->post('/ReservationsClient',function() use ($app)  {
				$param = json_decode($app->request->getBody());
				$nom = $param->nom;
				$password = $param->password;
				if((isset($nom)) && (isset($password)))
				{
					$pdo = new pdo("mysql:dbname=voixture;host=localhost","root","");
					$result = $pdo->prepare("SELECT * FROM reservations WHERE nom_client = '$nom' AND password_client = '$password'");
					$result->execute();
					$userReservations = array();
					$userReservations = $result->fetchAll(PDO::FETCH_ASSOC);
					echoResponse(200, $userReservations);
					}
			});

			$app->post('/CoursesClient',function() use ($app)  {
				$param = json_decode($app->request->getBody());
				$nom = $param->nom;
				$password = $param->password;
				if((isset($nom)) && (isset($password)))
				{
					$pdo = new pdo("mysql:dbname=voixture;host=localhost","root","");
					$result = $pdo->prepare("SELECT * FROM courses WHERE nom_client = '$nom' AND password_client = '$password'");
					$result->execute();
					$userCourses = array();
					$userCourses = $result->fetchAll(PDO::FETCH_ASSOC);
					echoResponse(200, $userCourses);
					}
			});

			$app->post('/CoursesChauffeur',function() use ($app)  {
				$param = json_decode($app->request->getBody());
				$nom = $param->nom;
				$password = $param->password;
				if((isset($nom)) && (isset($password)))
				{
					$pdo = new pdo("mysql:dbname=voixture;host=localhost","root","");
					$result = $pdo->prepare("SELECT * FROM courses WHERE nom_chauffeur = '$nom' AND password_chauffeur = '$password'");
					$result->execute();
					$userBCourses = array();
					$userBCourses = $result->fetchAll(PDO::FETCH_ASSOC);
					echoResponse(200, $userBCourses);
				}
			});

			$app->get('/liste', function()  {
				$pdo = new pdo("mysql:dbname=voixture;host=localhost","root","");
				$statement = $pdo->prepare("SELECT * FROM cdp");
				$statement->execute();
				$liste = array();
				$liste = $statement->fetchAll(PDO::FETCH_ASSOC);
				echoResponse(200, $liste);
			});

			$app->get('/TableauCourses', function()  {
				$pdo = new pdo("mysql:dbname=voixture;host=localhost","root","");
				$statement = $pdo->prepare("SELECT * FROM reservations");
				$statement->execute();
				$tableauCourses = array();
				$tableauCourses = $statement->fetchAll(PDO::FETCH_ASSOC);
				echoResponse(200, $tableauCourses);
			});

			$app->get('/AdminCourses', function()  {
				$pdo = new pdo("mysql:dbname=voixture;host=localhost","root","");
				$statement = $pdo->prepare("SELECT * FROM courses");
				$statement->execute();
				$tableauCourses = array();
				$tableauCourses = $statement->fetchAll(PDO::FETCH_ASSOC);
				echoResponse(200, $tableauCourses);
			});

			$app->get('/AdminClients', function()  {
				$pdo = new pdo("mysql:dbname=voixture;host=localhost","root","");
				$statement = $pdo->prepare("SELECT * FROM clients");
				$statement->execute();
				$tableauCourses = array();
				$tableauCourses = $statement->fetchAll(PDO::FETCH_ASSOC);
				echoResponse(200, $tableauCourses);
			});

			$app->get('/AdminChauffeurs', function()  {
				$pdo = new pdo("mysql:dbname=voixture;host=localhost","root","");
				$statement = $pdo->prepare("SELECT * FROM chauffeurs");
				$statement->execute();
				$tableauCourses = array();
				$tableauCourses = $statement->fetchAll(PDO::FETCH_ASSOC);
				echoResponse(200, $tableauCourses);
			});

				$app->post('/addClient', function() use ($app)  {
					$param = json_decode($app->request->getBody());
					$nom = $param->nom;
					$prenom = $param->prenom;
					$password = $param->password;
					$email =  $param->email;
					$telephone =  $param->telephone;


					$pdo = new pdo("mysql:dbname=voixture;host=localhost","root","");
					$statement = $pdo->prepare("INSERT INTO `voixture`.`clients` (`nom_client`,`prenom_client`,`password_client`,`email_client`,`telephone_client`) VALUES (?,?,?,?,?)");
					$statement->execute(array($nom,$prenom,$password,$email,$telephone));
					$row["message"] = "Bienvenue chez Voixture '$prenom' '$nom'.";
					echoResponse(200, $row);
				});

				$app->post('/addFav', function() use ($app)  {
					$param = json_decode($app->request->getBody());
					$nom_client = $param->nom_client;
					$password_client = $param->password_client;
					$numero_voie = $param->numero_favoris;
					$voie = $param->voie_favoris;
					$ville =  $param->ville_favoris;
					$cp = $param->cp_favoris;

					$pdo = new pdo("mysql:dbname=voixture;host=localhost","root","");
					$statement = $pdo->prepare("INSERT INTO `voixture`.`favoris` (`nom_client`,`password_client`,`numero_favoris`,`voie_favoris`,`ville_favoris`,`cp_favoris`) VALUES (?,?,?,?,?,?)");
					$statement->execute(array($nom_client,$password_client,$numero_voie,$voie,$ville,$cp));
					$row["message"] = "Favori enregistré";
					echoResponse(200, $row);
				});

				$app->post('/addCourse', function() use ($app)  {
					$param = json_decode($app->request->getBody());
					$nom_client = $param->nom_client;
					$password_client = $param->password_client;
					$date = $param->date;
					$heures = $param->heures;
					$minutes = $param->minutes;
					$adresseA = $param->adresseA;
					$adresseB = $param->adresseB;
					$montant =  $param->montant;
					$time =  $param->time;
					$msg =  $param->msg;
					$status =  $param->status;
					$charge = $param->charge;

					$pdo = new pdo("mysql:dbname=voixture;host=localhost","root","");
					$statement = $pdo->prepare("INSERT INTO `voixture`.`reservations` (`nom_client`,`password_client`,`date`,`heures`,`minutes`,`adresseA`,`adresseB`,`montant`,`time`,`msg`,`status`,`Charge`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)");
					$statement->execute(array($nom_client,$password_client,$date,$heures,$minutes,$adresseA,$adresseB,$montant,$time,$msg,$status,$charge));
					$row["message"] = "Course enregistré";
					echoResponse(200, $row);
				});

				$app->post('/paiement', function() use ($app)  {

					$param = json_decode($app->request->getBody());

					\Stripe\Stripe::setApiKey("sk_test_aDSIu14jDZiTVgSiXr6GxLtr ");

					// Get the credit card details submitted by the form
					$token = $param->token;
					$euro = $param->euro;
					// Create the charge on Stripe's servers - this will charge the user's card
					try {
					  $charge = \Stripe\Charge::create(array(
					    "amount" => $euro, // amount in cents, again
					    "currency" => "eur",
					    "source" => $token,
					    "description" => "Example charge"
					    ));

					} catch(\Stripe\Error\Card $e) {
					  // The card has been declined
					}

					echoResponse(200, $charge);
				});

				$app->post('/refund', function() use ($app)  {

					$param = json_decode($app->request->getBody());
					$montant = $param->montant;
					$charge = $param->charge;
					$id = $param->id;

					\Stripe\Stripe::setApiKey("sk_test_aDSIu14jDZiTVgSiXr6GxLtr");

					$re = \Stripe\Refund::create(array(
					  "charge" => $charge
					));

					echoResponse(200, $re);

					if((isset($id)))
					{
						$pdo = new pdo("mysql:dbname=voixture;host=localhost","root","");
						$result = $pdo->prepare("DELETE FROM reservations WHERE id_reservation = $id");
						$result->execute();
						$row["message"] = "Ce Chef de projet a bien été supprimé de votre projet";
						echoResponse(200, $row);
					}
				});

				$app->post('/confirmCourse', function() use ($app)  {
					$param = json_decode($app->request->getBody());
					$nom_client = $param->nom_client;
					$password_client = $param->password_client;
					$date = $param->date;
					$adresseA = $param->adresseA;
					$adresseB = $param->adresseB;
					$montant =  $param->montant;
					$paiement = $param->paiement;
					$nom_chauffeur = $param->nom_chauffeur ;
					$password_chauffeur = $param->password_chauffeur;
					$type_voiture = $param->type_voiture;

					$pdo = new pdo("mysql:dbname=voixture;host=localhost","root","");
					$statement = $pdo->prepare("INSERT INTO `voixture`.`courses` (`nom_client`,`password_client`,`date_course`,`adresseA_course`,`adresseB_course`,`montant_course`,`mode_paiement_course`,`nom_chauffeur`,`password_chauffeur`,`type_voiture_course`) VALUES (?,?,?,?,?,?,?,?,?,?)");
					$statement->execute(array($nom_client,$password_client,$date,$adresseA,$adresseB,$montant,$paiement,$nom_chauffeur,$password_chauffeur,$type_voiture));
					$row["message"] = "Course enregistré";
					echoResponse(200, $row);
				});

				$app->post('/confirmDelete',function() use ($app)  {
					$param = json_decode($app->request->getBody());
					$id = $param->id;
					if((isset($id)))
					{
						$pdo = new pdo("mysql:dbname=voixture;host=localhost","root","");
						$result = $pdo->prepare("DELETE FROM reservations WHERE id_reservation = $id");
						$result->execute();
						$row["message"] = "Ce Chef de projet a bien été supprimé de votre projet";
						echoResponse(200, $row);
					}
				});

				$app->post('/annuleCourse', function() use ($app)  {
					$param = json_decode($app->request->getBody());
					$nom_client = $param->nom_client;
					$password_client = $param->password_client;
					$date = $param->date;
					$adresseA = $param->adresseA;
					$adresseB = $param->adresseB;
					$montant =  $param->montant;
					$mode_paiement = $param->mode_paiement;

					$pdo = new pdo("mysql:dbname=voixture;host=localhost","root","");
					$statement = $pdo->prepare("INSERT INTO `voixture`.`reservations` (`nom_client`,`password_client`,`date`,`adresseA`,`adresseB`,`montant`,`mode_paiement`) VALUES (?,?,?,?,?,?,?)");
					$statement->execute(array($nom_client,$password_client,$date,$adresseA,$adresseB,$montant,$mode_paiement));
					$row["message"] = "Course enregistré";
					echoResponse(200, $row);
				});

				$app->post('/annuleDelete',function() use ($app)  {
					$param = json_decode($app->request->getBody());
					$id = $param->id_course;
					if((isset($id)))
					{
						$pdo = new pdo("mysql:dbname=voixture;host=localhost","root","");
						$result = $pdo->prepare("DELETE FROM courses WHERE id_course = $id");
						$result->execute();
						$row["message"] = "Ce Chef de projet a bien été supprimé de votre projet";
						echoResponse(200, $row);
					}
				});

				$app->post('/addChauffeur', function() use ($app)  {
					$param = json_decode($app->request->getBody());
					$nom = $param->nom;
					$prenom = $param->prenom;
					$password = $param->password;
					$email =  $param->email;
					$telephone =  $param->telephone;
					$type_voiture =  $param->type_voiture;
					$photo =  $param->photo;

					$pdo = new pdo("mysql:dbname=voixture;host=localhost","root","");
					$statement = $pdo->prepare("INSERT INTO `voixture`.`chauffeurs` (`nom_chauffeur`,`prenom_chauffeur`,`password_chauffeur`,`email_chauffeur`,`telephone_chauffeur`,`type_voiture_chauffeur`,`photo_chauffeur`) VALUES (?,?,?,?,?,?,?)");
					$statement->execute(array($nom,$prenom,$password,$email,$telephone,$type_voiture,$photo));
					$row["message"] = "Bienvenue chez Voixture '$prenom' '$nom'.";
					echoResponse(200, $row);
				});

				$app->post('/update', function() use ($app)  {
					$param = json_decode($app->request->getBody());
					$id = $param->id;
					$nom = $param->nom;
					$prenom = $param->prenom;
					$password = $param->password;
					$email =  $param->email;
					$telephone =  $param->telephone;
					$adresse =  $param->adresse;

					$pdo = new pdo("mysql:dbname=voixture;host=localhost","root","");
					$statement = $pdo->prepare("UPDATE clients SET nom_client = '$nom', prenom_client = '$prenom', password_client = '$password', email_client = '$email', telephone_client= '$telephone', adresse_client = '$adresse' WHERE id_client = '$id'");
					$statement->execute();
					$row["message"] = "Modification enregistré";
					echoResponse(200, $row);
				});

				$app->post('/updateB', function() use ($app)  {
					$param = json_decode($app->request->getBody());
					$id = $param->id;
					$nom = $param->nom;
					$prenom = $param->prenom;
					$password = $param->password;
					$email =  $param->email;
					$telephone =  $param->telephone;
					$type_voiture =  $param->type_voiture;

					$pdo = new pdo("mysql:dbname=voixture;host=localhost","root","");
					$statement = $pdo->prepare("UPDATE chauffeurs SET  nom_chauffeur = '$nom', prenom_chauffeur = '$prenom', password_chauffeur = '$password', email_chauffeur = '$email', telephone_chauffeur = '$telephone', type_voiture_chauffeur = '$type_voiture' WHERE id_chauffeur = '$id'");
					$statement->execute();
					$row["message"] = "Modification enregistré";
					echoResponse(200, $row);
				});

				$app->post('/delete',function() use ($app)  {
					$param = json_decode($app->request->getBody());
					$id = $param->id;
					if((isset($id)))
					{
						$pdo = new pdo("mysql:dbname=voixture;host=localhost","root","");
						$result = $pdo->prepare("DELETE FROM cdp WHERE id = $id");
						$result->execute();
						$row["message"] = "Ce Chef de projet a bien été supprimé de votre projet";
						echoResponse(200, $row);
					}
				});

				$app->post('/deleteFav',function() use ($app)  {
					$param = json_decode($app->request->getBody());
					$id = $param->id;
					if((isset($id)))
					{
						$pdo = new pdo("mysql:dbname=voixture;host=localhost","root","");
						$result = $pdo->prepare("DELETE FROM favoris WHERE id_favoris = $id");
						$result->execute();
						$row["message"] = "Ce favori a bien été supprimé";
						echoResponse(200, $row);
					}
				});

				$app->post('/deleteCli',function() use ($app)  {
					$param = json_decode($app->request->getBody());
					$id = $param->id;
					if((isset($id)))
					{
						$pdo = new pdo("mysql:dbname=voixture;host=localhost","root","");
						$result = $pdo->prepare("DELETE FROM clients WHERE id_client = $id");
						$result->execute();
						$row["message"] = "Ce Client a bien été supprimé";
						echoResponse(200, $row);
					}
				});

				$app->post('/deleteChau',function() use ($app)  {
					$param = json_decode($app->request->getBody());
					$id = $param->id;
					if((isset($id)))
					{
						$pdo = new pdo("mysql:dbname=voixture;host=localhost","root","");
						$result = $pdo->prepare("DELETE FROM chaufeurs WHERE id_chauffeur = $id");
						$result->execute();
						$row["message"] = "Ce Chauffeur a bien été supprimé";
						echoResponse(200, $row);
					}
				});



																					/*#################### Fin : NAVIGATEUR ###################### */

	/* ############################################################# Fin : VOIXTURE #################################################################### */

	?>
