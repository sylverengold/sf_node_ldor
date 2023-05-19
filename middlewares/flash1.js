// la fonction flash est un middleware -> il traite les données en la requete et la reponse
module.exports = function (request,response,next){
	if(request.session.flash){
		response.locals.flash = request.session.flash // si ya une message dans la requete on l'envoie vers le template
		request.session.flash = undefined // puis on detruit la session
	}
	request.flash = function (type,content){
		if(request.session.flash === undefined){
			request.session.flash = {}//on creee un objet vide par defaut
		}
		request.session.flash[type] = content// type est la clé .error .variable etc...
	}
	next()
}