module.exports =  { 
	Address : function (addressLine1, addressLine2, city, state, country, zipcode, isShipping){
		this.id = "";
		this.addressLine1 = addressLine1;
		this.addressLine2 = addressLine2;
		this.city = city;
		this.state = state;
		this.country = country;
		this.zipcode = zipcode;
		this.isShipping = isShipping;
	}
}

