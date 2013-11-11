

$(document).on('pagebeforeshow', "#creditCards", function( event, ui ) {
	console.log("Jose");
	$.ajax({
		url : "http://localhost:3412/DB-Project/creditcards",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var list = $("#creditcards-list");
			list.empty();
				list.append("<li>" +
				"<h2>" + "CreditCard Number: " + currentCreditcard.creditCardNumber + "</h2>" +
				"<h2>" + "Owner Name: " + currentCreditcard.creditCardOwner + "</h2>" +
				"<h2>" + "Security Code: " + currentCreditcard.securityCode + "</h2>" +
				"<h2>" + "Expiration Date: " + currentCreditcard.expDate + "</h2>" + "</li>");
				
			
		list.listview("refresh");		
	},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});
});



$(document).on('pagebeforeshow', "#account-view", function( event, ui ) {
	// currentCar has been set at this point
	$("#upd-creditCardNumber").val(currentCreditcard.creditCardNumber);
	$("#upd-creditCardOwner").val(currentCreditcard.creditCardOwner);
	$("#upd-securityCode").val(currentCreditcard.securityCode);
	$("#upd-expDate").val(currentCreditcard.expDate);		
});

////////////////////////////////////////////////////////////////////////////////////////////////
/// Functions Called Directly from Buttons ///////////////////////

function ConverToJSON(formData){
	var result = {};
	$.each(formData, 
		function(i, o){
			result[o.name] = o.value;
	});
	return result;
}

function VerifyCreditcard(){
	$.ajax({
		url : "http://localhost:3412/DB-Project/creditcards/",
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			var verifyList = data.creditcards;
			var len = verifyList.length;
			var verify;
			for (var i=0; i < len; ++i){
				verify = verifyList[i];
					currentCreditcard = verify;
					$.mobile.loading("hide");
					$.mobile.navigate("#accounts");
			}
			
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Data could not be updated!");
			}
			else {
				alert("Internal Error.");		
			}
		}
	});
	
}

function SaveCreditcard(){
	$.mobile.loading("show");
	var form = $("#creditcard-form");
	var formData = form.serializeArray();
	console.log("form Data: " + formData);
	var newCreditcard = ConverToJSON(formData);
	console.log("New Creditcard: " + JSON.stringify(newCreditcard));
	var newCreditcardJSON = JSON.stringify(newCreditcard);
	$.ajax({
		url : "http://localhost:3412/DB-Project/creditcards",
		method: 'post',
		data : newCreditcardJSON,
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#creditcards");
			alert("You have created an creditcard!");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			alert("Data could not be added!");
		}
	});


}

var currentCreditcard = {};

function GetCreditcard(id){
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/DB-Project/creditcards/" + id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentCreditcard = data.creditcard;
			$.mobile.loading("hide");
			$.mobile.navigate("#creditcards");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Creditcard not found.");
			}
			else {
				alter("Internal Server Error.");
			}
		}
	});
}

function UpdateCreditcard(){
	$.mobile.loading("show");
	var form = $("#creditcard-view-form");
	var formData = form.serializeArray();
	console.log("form Data: " + formData);
	var updCreditcard = ConverToJSON(formData);
	updCreditcard.id = currentCreditcard.id;
	console.log("Updated creditcard: " + JSON.stringify(updCreditcard));
	var updCreditcardJSON = JSON.stringify(updCreditcard);
	$.ajax({
		url : "http://localhost:3412/DB-Project/creditcards/" + updCreditcard.id,
		method: 'put',
		data : updCreditcardJSON,
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentCreditcard = data.creditcard;
			$.mobile.loading("hide");
			$.mobile.navigate("#accounts");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Data could not be updated!");
			}
			else {
				alert("Internal Error.");		
			}
		}
	});
}

function DeleteCreditcard(){
	$.mobile.loading("show");
	var id = currentCreditcard.id;
	$.ajax({
		url : "http://localhost:3412/DB-Project/creditcards/" + id,
		method: 'delete',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#creditcards");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Creditcard not found.");
			}
			else {
				alter("Internal Server Error.");
			}
		}
	});
}