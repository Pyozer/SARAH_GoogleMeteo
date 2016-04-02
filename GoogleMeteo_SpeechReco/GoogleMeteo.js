var token;
var interval = 100;		// msec
var repeat = 50;		// n x interval = timeout ... 50 x 100 = 5000 msec de timeout ...
var cnt = 0;
var cpt_initial;

exports.init = function () {
    info('[ GoogleMeteo ] is initializing ...');
}

exports.action = function(data, callback){

	config = Config.modules.GoogleMeteo;

	cpt_initial = SARAH.context.SpeechReco.compteur;
	cnt = 0;
	token = setInterval(function() {
		checkSpeechReco(SARAH, callback, data)
	}, interval);
}

function checkSpeechReco(SARAH, callback, data) {
	var new_cpt = SARAH.context.SpeechReco.compteur;

	if (new_cpt != cpt_initial) {

		var search = SARAH.context.SpeechReco.lastReco;
		console.log ("Search: " + search);

		if(data.dateask == 'true') {
			var rgxp = /(la météo|quelle est la météo|tu peux me donner la météo|peux tu me donner la météo|quelle est le temps|quelle temps fait il|il fait quelle temps|quelle est la température) (.+)/i;
		} else {
			var rgxp = /(la météo|quelle est la météo|tu peux me donner la météo|peux tu me donner la météo|quelle est le temps|quelle temps fait il|il fait quelle temps|quelle est la température)/i;
		}

		var match = search.match(rgxp);
		if (!match || match.length <= 1){
			console.log("FAIL");
			clearInterval(token);
			return callback({'tts': "Je ne comprends pas"});
		}

		search = (data.dateask == 'true') ? match[2] : "";
		clearInterval(token);
		console.log("Cnt: " + cnt);
		return meteo(search, callback);
	} else {
		cnt+= interval;
		if (cnt > (interval * repeat)) {
			clearInterval(token);
			return callback ({'tts': "Google Chrome n'a pas répondu assez vite"});
		}
	}
}

function meteo(dateandcity, callback) {
	var search = "quelle est la météo " + dateandcity;
	var url = "https://www.google.fr/search?q=" + encodeURI(search) + "&btnG=Rechercher&gbv=1";
	console.log('Url Request: ' + url);

	var request = require('request');
	var cheerio = require('cheerio');

	var options = {
		'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.87 Safari/537.36',
		'Accept-Charset': 'utf-8'
	};
	request({ 'uri': url, 'headers': options }, function(error, response, html) {

    	if (error || response.statusCode != 200) {
			clearInterval(token);
			callback({'tts': "L'action a échoué. Erreur " + response.statusCode });
			return;
	    }
        var $ = cheerio.load(html);

        var temperature = $('.g .e span.wob_t').first().text().trim().replace('°C', " degrés");

        var infos = $("#search .g .e tr:nth-child(3) td").text().trim();

        var ville = $('.g .e h3').text().trim().replace('Météo à ', '');

        if(temperature == "" || infos == "" || ville == "") {
        	console.log("Impossible de récupérer les informations météo sur Google");

        	callback({'tts': "Désolé, je n'ai pas réussi à récupérer les informations" });
        } else {
        	console.log("Température: " + temperature);
        	console.log("Informations: " + infos);
        	console.log("Localisation: " + ville);

        	callback({'tts': "La météo " + dateandcity + " est " + infos + " avec une température de " + temperature });
        }
	    return;
    });
}