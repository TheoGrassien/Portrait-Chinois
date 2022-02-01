// Initialiser un compteur de case à 0
var numCase = 0

// Fonction de vérification de validité d'un champ pour le formulaire
function verif(champ) {
    if (document.querySelector(champ).value == '') {
        document.querySelector(champ).classList.add('erreur')
    } else {
        document.querySelector(champ).classList.remove('erreur')
    }
}


document.addEventListener("DOMContentLoaded", function () {
    // Instructions Javascript exécutées après chargement du DOM


    // Afficher les analogies dans la side-bar
    data.forEach(function afficheAnalogie(analogie) {

        // Inclure les données du tableau data dans le code HTML
        document.querySelector(".liste-analogies").innerHTML = document.querySelector(".liste-analogies").innerHTML +
            "<li class='bloc-analogie button-" + data[numCase].type + "' draggable='true' data-numero='" + numCase + "'><h2>" + data[numCase].analogie + "</h2></li>"

        // Ajouter 1 au compteur afin de modifier l'analogie suivante
        numCase++;

    });



    // Drag & Drop

    // Créer une variable indiquant le statut du drag
    var drag = false
    // Déclarer une variable permettant de connaitre quel bloc est selectionné
    var numeroBlocDrag

    document.querySelectorAll('.bloc-analogie').forEach(function (bloc) {

        // Détecter le maintien de la souris sur le bloc
        bloc.addEventListener('mousedown', function (e) {
            drag = true
            numeroBlocDrag = parseInt(e.target.parentElement.getAttribute('data-numero'))
        });

        // Détecter si le bloc a été relaché dans la zone de drop
        // Récupérer les limites de la zone de drop
        bloc.addEventListener('dragend', function (e) {
            // Vérifier si la souris est dans la zone de drop
            if (e.screenX > document.querySelector('main').offsetLeft) {

                // Attribuer la classe correspondante
                document.querySelector('main').setAttribute('class', data[numeroBlocDrag].type)

                // Afficher le contenu correspondant
                document.querySelector("main").innerHTML = "<h1>" + data[numeroBlocDrag].analogie + ", je serais...</h1> <div class='reponse'> <img src='" + data[numeroBlocDrag].illustration + "' alt=''><h2>" + data[numeroBlocDrag].valeurAnalogie + "</h2><strong>" + data[numeroBlocDrag].surnom + "</strong><p>" + data[numeroBlocDrag].explication + "</p></div><p>Glisser un autre mot</p>"



                // Si l'utilisateur glisse le bloc "Personnalisé"
                // Afficher le formulaire si l'utilisateur n'a pas encore créer son analogie personnalisée.
                if (document.querySelector('main').classList.contains('personnalise-defaut')) {
                    document.querySelector('main').innerHTML = "<form action='' method=''><section><h1>Créer ton analogie</h1></section><section><p><abbr title='obligatoire'>*</abbr> Ces champs sont obligatoires</p><div class='champ'><label for='analogie'> <abbr title='obligatoire'>*</abbr> Si j'étais</label><br><input type='text' name='analogie' id='analogie' placeholder='un animal' required><br><strong class='alert'>Ce champ est obligatoire</strong></div><div class='champ'><label for='valeurAnalogie'><abbr title='obligatoire'>*</abbr> Je serais </label><br><input type='text' name='valeurAnalogie' id='valeurAnalogie' placeholder='un loup' required ><br><strong class='alert'>Ce champ est obligatoire</strong></div><div class='champ'><label for='explication'><abbr title='obligatoire'>*</abbr> Pourquoi ?</label><br><textarea name='explication' id='explication' cols='' rows='' placeholder='Parce que...' required></textarea><br><strong class='alert'>Ce champ est obligatoire</strong></div><div class='champ'><label for='illustration'>Image d'illustration (URL) (optionnel)</label><br><input type='text' name='illustration' id='illustration' placeholder='URL de l&apos;image'></div></section><section><div class='accord'><small>En cliquant sur Valider, j'accepte que mon adresse mail et mon adresse IP soit collectées. (Plus d'informations sur le traitement des données personnelles dans la rubrique Mentions légales)</small></div><div><input type='button' value='Valider'></section></form>"
                }

                // Afficher l'analogie suggérée sur le bouton de la side bar
                document.querySelector('#analogie').addEventListener('keyup', function (e) {
                    console.log('mohand')
                    document.querySelector('.button-personnalise-defaut').innerHTML = "<h2>" + document.querySelector('#analogie').value + "</h2>"
                })


                // Créer la page personnalisée avec les données rentrées par l'utilisateur
                document.querySelector('input[type=button]').addEventListener('click', function (e) {


                    // Effectuer les actions uniquement si les champs obligatoires ont été remplis
                    if (document.querySelector('#analogie').value != '' && document.querySelector('#valeurAnalogie').value != '' && document.querySelector('#explication').value != '') {
                        // Injecter les valeurs tapées dans le tableau data
                        data[data.length - 1].analogie = document.querySelector('#analogie').value
                        data[data.length - 1].valeurAnalogie = document.querySelector('#valeurAnalogie').value
                        data[data.length - 1].explication = document.querySelector('#explication').value
                        data[data.length - 1].illustration = document.querySelector('#illustration').value
                        // Modifier le type pour que la page soit affichée et non le formulaire
                        data[data.length - 1].type = 'personnalise-suggeree'
                        // Afficher la page au moment de la validation
                        document.querySelector('main').setAttribute('class', data[data.length - 1].type)
                        // Afficher le contenu correspondant
                        document.querySelector("main").innerHTML = "<h1>" + data[numeroBlocDrag].analogie + ", je serais...</h1> <div class='reponse'><img src='" + data[numeroBlocDrag].illustration + "' alt=''><h2>" + data[numeroBlocDrag].valeurAnalogie + "</h2><strong>" + data[numeroBlocDrag].surnom + "</strong><p>" + data[numeroBlocDrag].explication + "</p></div><p>Glisser un autre mot</p>"

                        // Afficher l'URL modifié dans la console au moment du clic sur le bouton de validation
                        var url_api = "https://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=theo.grassien&courriel=philippe.gambette@u-pem.fr&message=Si j'étais " + data[data.length - 1].analogie + ", je_serais " + data[data.length - 1].valeurAnalogie + ". " + data[data.length - 1].explication + ". URL de limage dillustration : " + data[data.length - 1].illustration;

                        // Remplacer les espaces par des underscore afin que le lien ne soit pas interrompu
                        url_api = url_api.split(" ").join("_")

                        // Envoyer les données à l'API
                        fetch(url_api).then(function (response) {
                            response.json().then(function (data) {
                                console.log("Réponse reçue : ")
                                console.log(data);
                            })
                        })


                    } else {
                        // Vérifier que chaque champ est valide, si ce n'est pas le cas : afficher le message d'erreur
                        verif('#analogie')
                        verif('#valeurAnalogie')
                        verif('#explication')

                    }



                })




            }

        });

    })



    // Volet déroulant

    // Détecter le clic sur le bouton Mentions légales
    document.querySelector('.volet').addEventListener('click', function (detecterClic) {

        // Dérouler ou enrouler les mentions légales

        // Si le volet était enroulé
        // Le dérouler
        if (document.querySelector('.volet').classList.contains('volet-invisible')) {
            document.querySelector('.volet-invisible').animate([{
                height: "37em"
            }], {
                duration: 600
            })
            
            // Modifier sa classe de invisible à visible
            function f() {
                document.querySelector('.volet-invisible').classList.add('volet-visible')
                document.querySelector('.volet-invisible').classList.remove('volet-invisible')
            }

            setTimeout(f, 600)

        // Si le volet était dérouler
        } else {

            // L'enrouler
            document.querySelector('.volet-visible').animate([{
                height: "2em"
            }], {
                duration: 200
            })

            // Modifier sa classe de visible à invisible
            function g() {
                document.querySelector('.volet-visible').classList.add('volet-invisible')
                document.querySelector('.volet-visible').classList.remove('volet-visible')
            }

            setTimeout(g, 200)
        }


    });



})