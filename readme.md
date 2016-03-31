Plugin Météo pour S.A.R.A.H
================================================================================

Le plugin nécessite tout d'abord SpeechReco (similaire à Scribe).

Que vous pouvez trouver ici: https://github.com/tilleul/Sarah.dictation.v2

Vous pouvez toujours modifier le plugin pour l'adapter au système habitutel pour le Garbage ;)

Prérequis
---------
- Sarah v4
- Le plugin SpeechReco
- Et ce plugin ;)

Installation
------------
- Copier le dossier GoogleMeteo dans votre dossier "plugins" de Sarah
- Remplacez Jarvis dans GoogleMeteo.xml par celui que vous utilisez (ex: Sarah, ...)

Comment ça marche ?
--------------------------
- Démarrez S.A.R.A.H (ainsi que le serveur https du plugin SpeechReco)
- Allez sur la page https://127.0.0.1:4300 pour avoir la reconnaissance du Garbage via Google Chrome
- Vous n'avez plus qu'a demander par exemple: "Jarvis quelle est la météo pour après demain ?"
- Vous pouvez demander la météo pour la ville de votre choix, ainsi qu'une date comme "Après demain", "demain", "mardi", "dimanche", "dans 3 jours", etc... . Il n'y a pas d'ordre pour la date et le lieu.
- En faite, le plugin récupère seulement la réponse que google renvoi à "Quelle est la météo " + votre requete.