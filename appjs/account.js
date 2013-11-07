module.exports =  { 
	Account : function (name, username, password, mailingaddress, billingaddress, creditcard){
		this.id = "";
		this.name = name;
		this.username = username;
		this.password = password;
		this.mailingaddress = mailingaddress;
		this.billingaddress = billingaddress;
		this.creditcard = creditcard;
	}
}
