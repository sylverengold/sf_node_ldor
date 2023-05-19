
//cmd: npm install -g npm
//cmd: npm init
//cmd: npm install -g serve
//recharge de page automatique
//cmd : npm i -S nodemon
//json : "start": "nodemon server.js"
//prod : "start" : "NODE_ENV=production nodemon server1.js"
//cmd: npm run start



//cmd : npm i -S express 

let express = require ('express')// import et affectation à la variable app de la classe express
let app = express()

//cmd : npm i -S body-parser // formate des données POST //middle ware 

let bodyParser = require ('body-parser') 

//cmd : npm i -S express-session // gerer des sessions

let session = require ('express-session') 

//cmd : npm i -S ejs // moteur de template // ejs -> format des fichiers template
app.set('view engine','ejs')

//cmd : npm i -S mysql

//cmd : npm i -S moment // gestion affichage des dates
let moment = require('moment')

//cmd : npm i -S lodash 

let countBy = require('lodash/countBy')

app.use (express.static('public'))//
app.use(bodyParser.urlencoded({extended: false}))//parametrage body-parser pour URL
app.use(bodyParser.json())//parametrage body-parser pour json 
app.use(session({
	secret:'viveosaka',// chiffrement - on met un peu ce qu'on veut
	resave: false,
	saveUninitialized : true,
	cookie: {secure:false}//true -> https / false -> http
}))

app.use(require('./middlewares/flash1'))


app.get('/',(request,response)=>{
	let Message = require("./models/message1")

	Message.all(function(messages){

			response.render('pages/index1', {messages:messages})//on injecte une variable vers le template

	})

})


app.post('/',(request,response)=>{
if (request.body.message === undefined || request.body.message ==='' ){
	request.flash('error',"Vous n'avez pas posté de message !")
	response.redirect('/')// on redirige vers la racine // ici server1.js
} else {

let Message = require("./models/message1")

Message.create(request.body.message, function () {// on recupere le message POST dans une classe Message
	request.flash('success',"Merci pour le message")
	response.redirect('/')// on redirige vers la racine // ici server1.js
})// methode asynchrone

}

})


app.get('/message/:id',(request, response)=>{
	let Message = require("./models/message1")
	Message.findId(request.params.id, function(test){test => test=test
		if(test){
			Message.find(request.params.id, function(message){//request.params -> expressJS et la fonction call back
			response.render('pages/show1',{message:message})
			// on renvoie vers la page message une variable message qui contient le message

	})
		}else{
			request.flash('error',"URL est foireuse !")
			response.redirect('/')// on redirige vers la racine // ici server1.js
		}

	})
})

app.get('/citations',(request, response)=>{
	let Citation = require("./models/citation1")
	let nbLines = 100
	Citation.nbLines( function(nbLines){nbLines=nbLines
	Citation.all( function(citations){console.log(citations);response.render('pages/citation1',{citations:citations,nbLines:nbLines })
	
	})
	})
})

app.get('/citations/:id',(request, response)=>{
	let Citation = require("./models/citation1")
	Citation.findId(request.params.id, function(test){test => test=test
		if(test){
			Citation.find(request.params.id, function(citations){//request.params -> expressJS et la fonction call back
			response.render('pages/citation1',{citations:citations})
			// on renvoie vers la page message une variable message qui contient le message

	})
		}else{
			request.flash('error',"URL est foireuse !")
			response.redirect('/citations')// on redirige vers la racine // ici server1.js
		}

	})
})





//let Rectangle = require("./models/classGeo")//recuperation de la classe
//r = new Rectangle(12,25)//creation d'une instance
//console.log(r.width)//parametre
//console.log(r.perimeter)
//console.log(r.isValid)//methode d'instance
//console.log(Rectangle.rect())//methode de class



app.listen(8080)