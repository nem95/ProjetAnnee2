<?php

	$app->map('/:x+', function($x) {http_response_code(200);})->via('OPTIONS');


	//$pdo = new pdo("mysql:dbname=db317889_tim;host=db317889-tim.sql-pro.online.net","db82530","supercon18");
	//$pdo = new pdo("mysql:dbname=voixture;host=localhost","root","");

	$bddLocal = "projetannee2";
	//"root" = "root";

	/* ############################################################ VOIXTURE ############################################################################# */

			$app->post('/addUser', function() use ($app, $mpd)  {
				$param = json_decode($app->request->getBody());
				$firstname = $param->firstname;
				$name = $param->name;
				$email = $param->email;
				$password = $param->password;


				if (!empty($firstname) && !empty($name) && !empty($email) && !empty($password)) {
					$pdo = new pdo("mysql:dbname=projetannee2;host=localhost","root", "root");
					$statement = $pdo->prepare("INSERT INTO `user`(`prenom`,`nom`,`email`,`password`) VALUES (?,?,?,?)");
					$statement->execute(array($firstname,$name,$email,$password));
					$row["message"] = "Bienvenue";
					echoResponse(200, $row);
				}else {
					$row["message"] = "Le formulaire doit etre complet";
					echoResponse(404, $row);
				}

			});
			$app->post('/getProfilCu',function() use ($app, $mpd)  {
				$param = json_decode($app->request->getBody());
				$id = $param->id;

				if((isset($id)))
				{
					$pdo = new pdo("mysql:dbname=projetannee2;host=localhost","root", "root");
					$statement = $pdo->prepare("SELECT * FROM user WHERE id = $id");
					$statement->execute();
					$profil = array();
					$profil = $statement->fetchAll(PDO::FETCH_ASSOC);
					$row["message"] = "BIEN AFFICHER";
					echoResponse(200, $profil);
				}
			});
			$app->post('/getUser',function() use ($app)  {
				$param = json_decode($app->request->getBody());
				$id = $param->id;
				if((isset($id)))
				{
					$pdo = new pdo("mysql:dbname=projetannee2;host=localhost","root","root");
					$statement = $pdo->prepare("SELECT * FROM user WHERE id = $id");
					$statement->execute();
					$profil = array();
					$profil = $statement->fetchAll(PDO::FETCH_ASSOC);
					$row["message"] = "BIEN AFFICHER";
					echoResponse(200, $profil);
				}
			});

			$app->post('/updateUser', function() use ($app)  {
				$param = json_decode($app->request->getBody());
				$id = $param->id;
				$firstname = $param->firstname;
				$name = $param->name;
				$email = $param->email;
				$sport = $param->sport;
				$age = $param->age;
				$ville = $param->ville;
				if (!empty($id)) {
					$pdo = new pdo("mysql:dbname=projetannee2;host=localhost","root","root");
					//$statement = $pdo->prepare("UPDATE user SET `user`(`prenom`,`nom`,`email`) VALUES (?,?,?) WHERE id = $id");
					$statement = $pdo->prepare("UPDATE user SET prenom = :firstname, nom = :name, email = :email,ville = :ville, age = :age, sport = :sport WHERE id = :id");
					$statement->execute([
											':firstname' => $firstname,
											':name' => $name,
											':email' => $email,
											':id' => $id,
											':sport' => $sport,
											':ville' => $ville,
											':age' => $age,
					          ]);					//$statement->execute(array($firstname,$name,$email));
					$row["message"] = "Bienvenue";
					echoResponse(200, $row);
				}
				else {
					$row["message"] = "Le formulaire doit etre complet";
					echoResponse(404, $row);
				}

			});
			$app->post('/updateMdp', function() use ($app)  {
				$param = json_decode($app->request->getBody());
				$id = $param->id;
				$password = $param->password;
				$passwordconfirmation = $param->passwordconfirmation;
				if (!empty($password) && (!empty($passwordconfirmation) && ($password===$passwordconfirmation))) {
					$pdo = new pdo("mysql:dbname=projetannee2;host=localhost","root","root");
					//$statement = $pdo->prepare("UPDATE user SET `user`(`prenom`,`nom`,`email`) VALUES (?,?,?) WHERE id = $id");
					$statement = $pdo->prepare("UPDATE user SET password = :password WHERE id = :id");
					$statement->execute([
						':password' => $password,
						':id' => $id,
					]);					//$statement->execute(array($firstname,$name,$email));
					$row["message"] = "Bienvenue";
					echoResponse(200, $row);
				}
				else {
					$row["message"] = "Le formulaire doit etre complet";
					echoResponse(404, $row);
				}

			});

			$app->post('/login',function() use ($app)  {
				$param = json_decode($app->request->getBody());
	  		$email = $param->email;
				$password = $param->password;
    		if((isset($email)) && (isset($password)))
      	{
					$pdo = new pdo("mysql:dbname=projetannee2;host=localhost","root","root");
			 		$result = $pdo->prepare("SELECT * FROM user WHERE email = '$email' AND password = '$password'");
					$result->execute();
			 		$user = array();
			 		$user = $result->fetchAll(PDO::FETCH_ASSOC);

			 		echoResponse(200, $user);
			 		}else {
						$row["message"] = "Le formulaire doit etre complet";
						echoResponse(404, $row);
					}
			});

			//########## EVENT ##########\\

		$app->post('/Event', function() use ($app)  {
			$param = json_decode($app->request->getBody());
			$id_orga = $param->id_orga;
			$titre = $param->titre;
			$activity = $param->activity;
			$lieu = $param->lieu;
			$depart = $param->depart;
			$arrivee = $param->arrivee;
			$date = $param->date;
			$var = 0;

			if ($lieu == '') {
				$pdo = new pdo("mysql:dbname=projetannee2;host=localhost","root","root");
				$statement = $pdo->prepare("INSERT INTO `event`(`id_orga`,`title`, `activity`, `depart`, `arrivee`, `date`) VALUES (?,?,?,?,?,?)");
				$statement->execute(array($id_orga,$titre,$activity,$depart,$arrivee,$date));
				$row["message"] = "Le message est bien envoyer.";
				echoResponse(200, $row);
			}elseif($depart == '' && $arrivee == '') {
				$pdo = new pdo("mysql:dbname=projetannee2;host=localhost","root","root");
				$statement = $pdo->prepare("INSERT INTO `event`(`id_orga`,`title`, `activity`, `lieu`, `date`) VALUES (?,?,?,?,?)");
				$statement->execute(array($id_orga,$titre,$activity,$lieu,$date));
				$row["message"] = "Le message est bien envoyer.";
				echoResponse(200, $row);
			}else {
				$row["message"] = "Le message ,n'a pas etait' envoyer.";
				echoResponse(404, $row);
			}
		});

		$app->get('/Events', function()  {
			$pdo = new pdo("mysql:dbname=projetannee2;host=localhost","root","root");
			$statement = $pdo->prepare("SELECT * FROM event");
			$statement->execute();
			$event = array();
			$event = $statement->fetchAll(PDO::FETCH_ASSOC);
			if ($event) {
				$event["message"] = "Ce favori a bien été ajouter";
				echoResponse(200, $event);
			}else {
				$event["message"] = "Ca ne marche pas";
				echoResponse(200, $event);
			}
		});


		$app->post('/deleteEvent',function() use ($app)  {
			$param = json_decode($app->request->getBody());
			$id = $param->id;
			if((isset($id)))
			{
				$pdo = new pdo("mysql:dbname=projetannee2;host=localhost","root","root");
				$result = $pdo->prepare("DELETE FROM event WHERE id = $id");
				$result->execute();
				$row["message"] = "Ce favori a bien été supprimé";
				echoResponse(200, $row);
			}
		});

		$app->post('/getEvent',function() use ($app)  {
			$param = json_decode($app->request->getBody());
			$id = $param->id;
			if((isset($id)))
			{
				$pdo = new pdo("mysql:dbname=projetannee2;host=localhost","root","root");
				$statement = $pdo->prepare("SELECT * FROM event WHERE id = $id");
				$statement->execute();
				$event = array();
				$event = $statement->fetchAll(PDO::FETCH_ASSOC);
				$row["message"] = "BIEN AFFICHER";
				echoResponse(200, $event);
			}
		});

		$app->post('/participe', function() use ($app)  {
			$param = json_decode($app->request->getBody());
			$id_event = $param->id_event;
			$id_user = $param->id_user;
			$name_user = $param->name_user;
			$firstname_user = $param->firstname_user;

				$pdo = new pdo("mysql:dbname=projetannee2;host=localhost","root","root");
				$statement = $pdo->prepare("INSERT INTO `participants`(`id_event`,`id_user`,`name_user`,`firstname_user`) VALUES (?,?,?,?)");
				$statement->execute(array($id_event,$id_user,$name_user,$firstname_user));
				$row["message"] = "Participation enrengistrer";
				echoResponse(200, $row);

		});

		$app->post('/placeLeft',function() use ($app)  {
			$param = json_decode($app->request->getBody());
			$id = $param->id;

				$pdo = new pdo("mysql:dbname=projetannee2;host=localhost","root","root");
				$statement = $pdo->prepare("SELECT COUNT(*) as counter  FROM participants WHERE id_event = $id ");
				$statement->execute();
				$event = array();
				$event = $statement->fetchAll(PDO::FETCH_ASSOC);
				$row["message"] = "BIEN AFFICHER";
				echoResponse(200, $event);

		});

		$app->post('/getPlace',function() use ($app)  {
			$param = json_decode($app->request->getBody());
			$id = $param->id;
			$id_user = $param->id_user;
			if((isset($id)))
			{
				$pdo = new pdo("mysql:dbname=projetannee2;host=localhost","root","root");
				$statement = $pdo->prepare("SELECT COUNT(*) as place FROM participants WHERE id_user = $id_user AND id_event = $id ");
				$statement->execute();
				$event = array();
				$event = $statement->fetchAll(PDO::FETCH_ASSOC);
				$row["message"] = "BIEN AFFICHER";
				echoResponse(200, $event);
			}
		});

		$app->post('/getParticipant',function() use ($app)  {
			$param = json_decode($app->request->getBody());
			$id = $param->id;
			$id_user = $param->id_user;
			if((isset($id)))
			{
				$pdo = new pdo("mysql:dbname=projetannee2;host=localhost","root","root");
				$statement = $pdo->prepare("SELECT * FROM participants WHERE id_event = $id ");
				$statement->execute();
				$event = array();
				$event = $statement->fetchAll(PDO::FETCH_ASSOC);
				$row["message"] = "BIEN AFFICHER";
				echoResponse(200, $event);
			}
		});

		$app->post('/showParticipant',function() use ($app)  {
			$param = json_decode($app->request->getBody());
			$id = $param->id;
			$id_user = $param->id_user;
			if((isset($id)))
			{
				$pdo = new pdo("mysql:dbname=projetannee2;host=localhost","root","root");
				$statement = $pdo->prepare("SELECT * FROM user WHERE id_event = $id ");
				$statement->execute();
				$event = array();
				$event = $statement->fetchAll(PDO::FETCH_ASSOC);
				$row["message"] = "BIEN AFFICHER";
				echoResponse(200, $event);
			}
		});


		$app->post('/adresse', function() use ($app)  {
			$param = json_decode($app->request->getBody());
			$id_orga = $param->id_orga;
			$titre = $param->titre;
			$activity = $param->activity;
			$lieu = $param->lieu;
			$date = $param->date;
			$var = 0;
			if ($depart != "" && $arrivee ) {

			    $address = $donnees['ville'];
			    $coordinates = file_get_contents('http://maps.googleapis.com/maps/api/geocode/json?address=' . urlencode($address) . '&sensor=true');
			    $coordinates = json_decode($coordinates, true);


			    if ($coordinates['status'] == "OK") {
			        $lat = $coordinates['results'][0]['geometry']['location']['lat'];
			        $lng = $coordinates['results'][0]['geometry']['location']['lng'];
			    } else {
			        return array("error", $coordinates['status']);
			    }
			}
			if ($var == 0) {
				$pdo = new pdo("mysql:dbname=projetannee2;host=localhost","root","");
				$statement = $pdo->prepare("INSERT INTO `event`(`id_orga`,`title`, `activity`, `lieu`, `date`) VALUES (?,?,?,?,?)");
				$statement->execute(array($id_orga,$titre,$activity,$lieu,$date));
				$row["message"] = "Le message est bien envoyer.";
				echoResponse(200, $row);
			}else {
				$row["message"] = "Le message ,n'a pas etait' envoyer.";
				echoResponse(404, $row);
			}
		});

/*

		$reponse = $pdo->query('SELECT * FROM virtuo_references_contents WHERE idcontent = \''.$id.'\' LIMIT 1');
		$donnees = $reponse->fetch();

		// INITIALISATION GOOGLE MAP : CONVERT VILLE -> LAT/LNG

		if ($donnees['ville'] != "") {

		    $address = $donnees['ville'];
		    $coordinates = file_get_contents('http://maps.googleapis.com/maps/api/geocode/json?address=' . urlencode($address) . '&sensor=true');
		    $coordinates = json_decode($coordinates, true);


		    if ($coordinates['status'] == "OK") {
		        $lat = $coordinates['results'][0]['geometry']['location']['lat'];
		        $lng = $coordinates['results'][0]['geometry']['location']['lng'];
		    } else {
		        return array("error", $coordinates['status']);
		    }
		}
*/
					//#########################################################//
					//#########################################################//
					//#########################################################//
					//#########################################################//
					//#########################################################//



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
