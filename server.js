//recharge de page automatique
//cmd : npm i -S nodemon
//json : "start": "nodemon server.js"
//cmd: npm run start


let express = require ('express')// import et affectation à la variable app de la classe express
let app = express()

//cmd : npm i -S body-parser // formate des données POST //middle ware 

let bodyParser = require ('body-parser') 

//cmd : npm i -S express-session // gerer des sessions

let session = require ('express-session') 

//cmd : npm i -S ejs // moteur de template // ejs -> format des fichiers template
app.set('view engine','ejs')

app.use (express.static('public'))//
app.use(bodyParser.urlencoded({extended: false}))//parametrage body-parser pour URL
app.use(bodyParser.json())//parametrage body-parser pour json 
app.use(session({
	secret:'viveosaka',// chiffrement - on met un peu ce qu'on veut
	resave: false,
	saveUninitialized : true,
	cookie: {secure:false}//true -> https / false -> http
}))




app.get('/',(request,response)=>{
	// ou // response.locals.test = 'Coucou'
	if (request.session.error){//on teste la presence de session error

		response.locals.error = request.session.error //on renseigne locals qui regroupe les variables injectées
		//console.log(response.locals.error)
		request.session.error = undefined
	}
	response.render('pages/index', {test:"Coucou"})//on injecte une variable vers le template
})
app.post('/',(request,response)=>{
if (request.body.message === undefined || request.body.message ==='' ){
	request.session.error = "Il y a une erreur"
	//console.log(request.session.error)
	response.redirect('/')
}
})

app.listen(8080)