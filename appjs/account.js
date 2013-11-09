module.exports = {
	Account :function (name, mailingaddress, billingaddress, creditcard){
		this.id = "";
		this.name = name;
		this.mailingaddress = mailingaddress;
		this.billingaddress = billingaddress;
		this.creditcard = creditcard;
	}
};
