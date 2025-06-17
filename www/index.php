<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Formulaire de contact</title>
</head>
<body>

<main>
    <section id="vos-coordonnees">
        <h2>Vos coordonnées</h2>
        <form action="submit.php" method="POST">
            <label for="sexe">Sexe :</label>
            <input type="radio" id="homme" name="sexe" value="homme" required> Homme
            <input type="radio" id="femme" name="sexe" value="femme" required> Femme

            <label for="nom">Nom :</label>
            <input type="text" id="nom" name="nom" required>

            <label for="prenom">Prénom :</label>
            <input type="text" id="prenom" name="prenom" required>

            <label for="email">Adresse email :</label>
            <input type="email" id="email" name="email" required>

            <label for="telephone">Téléphone :</label>
            <input type="tel" id="telephone" name="telephone" required>
        </form>
    </section>

    <section id="votre-message">
        <h2>Votre message</h2>
        <form>
            <label for="demande">Demande :</label>
            <input type="checkbox" id="visite" name="demande" value="visite"> Demande de visite
            <input type="checkbox" id="rappel" name="demande" value="rappel"> Être rappelé.e
            <input type="checkbox" id="photo" name="demande" value="photo"> Plus de photos

            <label for="message">Message :</label>
            <textarea id="message" name="message" rows="5" required></textarea>
        </form>
    </section>

    <section id="disponibilite-visite">
        <h2>Disponibilité pour une visite</h2>
        <form>
            <label for="jour">Jour :</label>
            <input type="date" id="jour" name="jour" required>

            <label for="heure">Heure :</label>
            <input type="number" id="heure" name="heure" min="0" max="23" required>

            <label for="minute">Minute :</label>
            <input type="number" id="minute" name="minute" min="0" max="59" required>

            <button type="button" id="ajouter-dispo">Ajouter une disponibilité</button>
        </form>
    </section>

    <button type="submit">Envoyer</button>
</main>

</body>
</html>