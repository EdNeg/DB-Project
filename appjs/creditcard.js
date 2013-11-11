module.exports =  { 
	Creditcard : function (creditCardNumber, creditCardOwner, securityCode, expDate, addressID){
		this.creditCardID = "";
		this.creditCardNumber = creditCardNumber;
		this.creditCardOwner = creditCardOwner;
		this.securityCode = securityCode;
		this.expDate = expDate;
		this.addressID = addressID;
	}
}
