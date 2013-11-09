module.exports =  { 
	Product : function (name, brand, model, description, dimensions, bidPrice, instPrice, imgSrc, tag1, tag2, tag3){
		this.id = "";
		this.name = name;
		this.brand = brand;
		this.model = model;
		this.description = description;
		this.dimensions = dimensions;
		this.bidPrice = bidPrice;
		this.instPrice = instPrice;
		this.imgSrc = imgSrc;
		this.tag1 = tag1;/////////////////////////Category////////////////////////////////////////////////////////////////////
		this.tag2 = tag2;/////////////////////////SubCategory///////////////////////////////////////////////////////////////////////
		this.tag3 = tag3;/////////////////////////SubSubCategory///////////////////////////////////////////////////////////////////////

	}
};