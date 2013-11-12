module.exports =  { 
	Product : function (productName, brand, model, productDesc, dimensions, bidPrice, productPrice, productPhoto, tag1, tag2, tag3){
		this.id = "";
		this.productName = productName;
		this.brand = brand;
		this.model = model;
		this.productDesc = productDesc;
		this.dimensions = dimensions;
		this.bidPrice = bidPrice;
		this.productPrice = productPrice;
		this.productPhoto = productPhoto;
		this.tag1 = tag1;/////////////////////////Category////////////////////////////////////////////////////////////////////
		this.tag2 = tag2;/////////////////////////SubCategory///////////////////////////////////////////////////////////////////////
		this.tag3 = tag3;/////////////////////////SubSubCategory///////////////////////////////////////////////////////////////////////

	}
};