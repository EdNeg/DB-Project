module.exports =  { 
	Creditcard : function (number, ownerName, securityCode, expDate){
		this.id = "";
		this.number = number;
		this.ownerName = ownerName;
		this.securityCode = securityCode;
		this.expDate = expDate;
	}
}
