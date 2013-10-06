module.exports =  { 
	Product : function (name, brand, model, description, dimensions, bidPrice, instPrice, imgSrc){
		this.id = "";
		this.name = name;
		this.brand = brand;
		this.model = model;
		this.description = description;
		this.dimensions = dimensions;
		this.bidPrice = bidPrice;
		this.instPrice = instPrice;
		this.imgSrc = imgSrc;
	}
};