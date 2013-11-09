module.exports =  { 
	Creditcard : function (number, ownerName, isShipping, securityCode, expDate){
		this.id = "";
		this.number = number;
		this.ownerName = ownerName;
		this.isShipping = isShipping;
		this.securityCode = securityCode;
		this.expDate = expDate;
	}
}
