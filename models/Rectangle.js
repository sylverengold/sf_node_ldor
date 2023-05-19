class Rectangle{

constructor (width, height){
		this.width = width
		this.height = height
	}

get perimeter (){
	return this.width*this.height*2
}

get isValid(){
	return this.width > 0 && this.height > 0
}


}



class Square extends Rectangle{
	}

module.exports = Rectangle
module.exports = Square