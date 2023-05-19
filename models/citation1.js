let connection = require ('./connection1')
let moment = require('./moment1')

class Citation{

	constructor(id,content, firstname, lastname, id_a){
		this.id = id
		this.content = content
		this.firstname = firstname
		this.lastname = lastname
		this.id_a = id_a
	}


	static all (cb){
	 connection.query (`SELECT citations.id, citations.content, authors.firstname, authors.lastname, citations.id_a 
	 					FROM citations JOIN authors WHERE citations.id_a = authors.id`,(err,rows) => {
 	if (err) throw err
 		cb(rows.map((row) => new Citation(row.id,row.content,row.firstname,row.lastname,row.id_a)))//resultat du callback
 }) 
}


	static nbLinesByType (cb){
	 connection.query ('SELECT * FROM citations', (err,rows) => {
 	if (err) throw err
 		cb(rows.reduce((acc,value) =>{
 			if(!acc[value.lastname]){
 				acc[value.lastname] = 1
 			}else{
 				acc[value.lastname]++
 			}
 			return acc},{}))

 }) 
}

	static nbLines (cb){
	 connection.query ('SELECT * FROM citations', (err,rows) => {
 	if (err) throw err
 		let ii =0;
 		cb(rows.reduce((row, b) => (ii++,ii)))//resultat du callback
 }) 
}

static find(id,cb){
	 connection.query (`SELECT citations.id, citations.content, authors.firstname, authors.lastname, citations.id_a 
	 					FROM citations JOIN authors WHERE citations.id_a = authors.id AND authors.id = ?`,[id], (err,rows) => {//rows etant le resultat de la requete
if (err) throw err
 		cb(rows.map((row) => new Citation(row.id,row.content,row.firstname,row.lastname,row.id_a)))//resultat du callback
 		
 })
}

static findId(id,cb){
	 connection.query ('SELECT id FROM authors WHERE id = ? LIMIT 1',[id], (err,rows) => {//rows etant le resultat de la requete
 	if (err){
 		throw err
 	}else
 	{
 		if(rows == ''){
 			cb(false)
 		}else{
 			cb(true)
 		}
 	}
 		
 })
}

}

module.exports = Citation