let connection = require ('./connection1')
let moment = require('./moment1')

class Message {

	constructor(row){
		this.row = row
	}

	get content (){
		return this.row.content
	}

	get id (){
		return this.row.id

	}

	get created_at (){
		return moment(this.row.created_at).format('LLLL')
	}

	get created_atFromNow (){
		return moment(this.row.created_at,'MMMM Do YYYY, h:mm:ss a').fromNow()
	}

	get avatar(){
		return "http://placekitten.com/200/200"
	}

static create (content, cb){
 connection.query ('INSERT INTO messages SET content = ?, created_at = ?',[content, new Date()], (err,result) => {
 	if (err) throw err
 		cb(result)//resultat du callback
 })
}


static all(cb){
	 connection.query ('SELECT * FROM messages', (err,rows) => {
 	if (err) throw err
 		cb(rows.map((row) => new Message(row)))//resultat du callback
 }) 
}


static find(id,cb){
	 connection.query ('SELECT * FROM messages WHERE id = ? LIMIT 1',[id], (err,rows) => {//rows etant le resultat de la requete
 	if (err){
 		throw err
 	}else
 	{
 		cb(new Message(rows[0]))//resultat du callback//premier enregistrement de la requete SQL
 	}
 		
 })
}

static findId(id,cb){
	 connection.query ('SELECT id FROM messages WHERE id = ? LIMIT 1',[id], (err,rows) => {//rows etant le resultat de la requete
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
module.exports = Message