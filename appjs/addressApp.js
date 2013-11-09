

$(document).on('pagebeforeshow', "#accounts", function( event, ui ) {
	console.log("Jose");
	$.ajax({
		url : "http://localhost:3412/DB-Project/addrs",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var list = $("#addresses-list");
			list.empty();
			var address;
			
				list.append("<li data-role="list-divider" role="heading">" + "Mailing Address Info" + "</li>" +	
						"<li>" + "<h2>" + "Address Line 1: " + currentAddress1.addressLine1 + "</h2>" + 
						"<h2>" + "Address Line 2: " + currentAddress1.addressLine2 + "</h2>" +
						"<h2>" + "City: " + currentAddress1.city + "</h2>" +
						"<h2>" + "State: " + currentAddress1.state + "</h2>" + 
						"<h2>" + "Country: " + currentAddress1.country + "</h2>" +
						"<h2>" + "ZipCode: " + currentAddress1.zipcode + "</h2>" +
						"<li data-role="list-divider" role="heading">" + "Billing Address Info" + "</li>" +	
							"<li>" + "<h2>" + "Address Line 1: " + currentAddress.addressLine1 + "</h2>" + 
							"<h2>" + "Address Line 2: " + currentAddress.addressLine2 + "</h2>" +
							"<h2>" + "City: " + currentAddress.city + "</h2>" +
							"<h2>" + "State: " + currentAddress.state + "</h2>" + 
							"<h2>" + "Country: " + currentAddress.country + "</h2>" +
							"<h2>" + "ZipCode: " + currentAddress.zipcode + "</h2>" + "</li>");
			
		list.listview("refresh");		
	},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});
});



$(document).on('pagebeforeshow', "#address-view", function( event, ui ) {
	// currentCar has been set at this point
	$("#upd-addressLine1").val(currentAddress.addressLine1);
	$("#upd-addressLine2").val(currentAddress.addressLine2);
	$("#upd-city").val(currentAddress.city);
	$("#upd-state").val(currentAddress.state);
	$("#upd-country").val(currentAddress.country);
	$("#upd-zipcode").val(currentAddress.zipcode);
	
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

function VerifyAddress(){
	$.ajax({
		url : "http://localhost:3412/DB-Project/addrs/",
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			var verifyList = data.addrs;
			var len = verifyList.length;
			var verify;
			for (var i=0; i < len; ++i){
				verify = verifyList[i];
				if(verify.isShipping == "1"){
					currentAddress1 = verify;
					$.mobile.loading("hide");
					$.mobile.navigate("#accounts");
				}
				else if(verify.isShipping == "0"){
					currentAddress = verify;
					$.mobile.loading("hide");
					$.mobile.navigate("#accounts");
				}
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


function SaveAddressMailing(){
	$.mobile.loading("show");
	var form = $("#address-mailing-form");
	var formData = form.serializeArray();
	console.log("form Data: " + formData);
	var newAddress = ConverToJSON(formData);
	newAddress.isShipping = 1;
	console.log("New Address: " + JSON.stringify(newAddress));
	var newAddressJSON = JSON.stringify(newAddress);
	$.ajax({
		url : "http://localhost:3412/DB-Project/addrs",
		method: 'post',
		data : newAddressJSON,
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#addr");
			alert("You have created an Address!");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			alert("Data could not be added!");
		}
	});


}

function SaveAddressBilling(){
	$.mobile.loading("show");
	var form = $("#address-billing-form");
	var formData = form.serializeArray();
	console.log("form Data: " + formData);
	var newAddress = ConverToJSON(formData);
	newAddress.isShipping = 0;
	console.log("New Address: " + JSON.stringify(newAddress));
	var newAddressJSON = JSON.stringify(newAddress);
	$.ajax({
		url : "http://localhost:3412/DB-Project/addrs",
		method: 'post',
		data : newAddressJSON,
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#addrs");
			alert("You have created an Address!");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			alert("Data could not be added!");
		}
	});


}

var currentAddress = {};
var currentAddress1 = {};

function GetAddress(id){
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/DB-Project/addrs/" + id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentAddress = data.address;
			$.mobile.loading("hide");
			$.mobile.navigate("#addrs");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Address not found.");
			}
			else {
				alter("Internal Server Error.");
			}
		}
	});
}

function UpdateAddress(){
	$.mobile.loading("show");
	var form = $("#address-view-form");
	var formData = form.serializeArray();
	console.log("form Data: " + formData);
	var updAddress = ConverToJSON(formData);
	updAddress.id = currentAddress.id;
	console.log("Updated Address: " + JSON.stringify(updAddress));
	var updAddressJSON = JSON.stringify(updAddress);
	$.ajax({
		url : "http://localhost:3412/DB-Project/addrs/" + updAddress.id,
		method: 'put',
		data : updAddressJSON,
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentAddress = data.address;
			$.mobile.loading("hide");
			$.mobile.navigate("#addrs");
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

function DeleteAddress(){
	$.mobile.loading("show");
	var id = currentAddress.id;
	$.ajax({
		url : "http://localhost:3412/DB-Project/addrs/" + id,
		method: 'delete',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#addrs");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Address not found.");
			}
			else {
				alter("Internal Server Error.");
			}
		}
	});
}