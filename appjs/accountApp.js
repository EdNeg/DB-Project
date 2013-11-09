

$(document).on('pagebeforeshow', "#accounts", function( event, ui ) {
	console.log("Frances");
	$.ajax({
		url : "http://localhost:3412/RegularUserSrv/accounts",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var accountList = data.accounts;
			var len = accountList.length;
			var list = $("#accounts-list");
			list.empty();
			var account;
			for (var i=0; i < len; ++i){
				account = accountList[i];
				list.append("<li><a onclick=GetAccount(" + account.id + ")>" + 
						"<h2>" + "Name: " + account.name + "</h2>" + 
						"<h2>" + "Mailing Address: " + account.mailingaddress + "</h2>" + 
						"<h2>" + "Billing Address: " + account.billingaddress + "</h2>" +
						"<h2>" + "Credit Card: " + account.creditcard + "</h2>" + "</a></p>");
			}
			
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
	$("#upd-name").val(currentAccount.name);
	$("#upd-mailingaddress").val(currentAccount.mailingaddress);
	$("#upd-billingaddress").val(currentAccount.billingaddress);
	$("#upd-creditcard").val(currentAccount.creditcard);
	
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

function SaveAccount(){
	$.mobile.loading("show");
	var form = $("#account-form");
	var formData = form.serializeArray();
	console.log("form Data: " + formData);
	var newAccount = ConverToJSON(formData);
	console.log("New Account: " + JSON.stringify(newCar));
	var newAccountJSON = JSON.stringify(newCar);
	$.ajax({
		url : "http://localhost:3412/RegularUserSrv/accounts",
		method: 'post',
		data : newAccountJSON,
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#accounts");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			alert("Data could not be added!");
		}
	});


}

var currentAccount = {};

function GetAccount(id){
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/RegularUserSrv/accounts/" + id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentAccount = data.account;
			$.mobile.loading("hide");
			$.mobile.navigate("#account-view");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Account not found.");
			}
			else {
				alter("Internal Server Error.");
			}
		}
	});
}

function UpdateAccount(){
	$.mobile.loading("show");
	var form = $("#account-view-form");
	var formData = form.serializeArray();
	console.log("form Data: " + formData);
	var updAccount = ConverToJSON(formData);
	currentAccount.id = 0;
	updAccount.id = currentAccount.id;
	console.log("Updated Account: " + JSON.stringify(updAccount));
	var updAccountJSON = JSON.stringify(updAccount);
	$.ajax({
		url : "http://localhost:3412/RegularUserSrv/accounts/" + updAccount.id,
		method: 'put',
		data : updAccountJSON,
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
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

function DeleteAccount(){
	$.mobile.loading("show");
	var id = currentAccount.id;
	$.ajax({
		url : "http://localhost:3412/RegularUserSrv/accounts/" + id,
		method: 'delete',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#accounts");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Account not found.");
			}
			else {
				alter("Internal Server Error.");
			}
		}
	});
}