

$(document).on('pagebeforeshow', "#addrs", function( event, ui ) {
	console.log("Jose");
	$.ajax({
		url : "http://localhost:3412/DB-Project/addrs",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var addressList = data.addrs;
			var len = addressList.length;
			var list = $("#addresses-list");
			list.empty();
			var address;
			for(var i=0; i < len; ++i){
				address = addressList[i];
				if(address.isShipping == "1"){
				list.append("<li data-role="list-divider" role="heading">" + "Mailing Address Info" + "</li>" +	
						"<li>" + "<h2>" + "Address Line 1: " + address.addressLine1 + "</h2>" + 
						"<h2>" + "Address Line 2: " + address.addressLine2 + "</h2>" +
						"<h2>" + "City: " + address.city + "</h2>" +
						"<h2>" + "State: " + address.state + "</h2>" + 
						"<h2>" + "Country: " + address.country + "</h2>" +
						"<h2>" + "ZipCode: " + address.zipcode + "</h2>" + "</li>");
				else{
					list.append("<li data-role="list-divider" role="heading">" + "Billing Address Info" + "</li>" +	
							"<li>" + "<h2>" + "Address Line 1: " + address.addressLine1 + "</h2>" + 
							"<h2>" + "Address Line 2: " + address.addressLine2 + "</h2>" +
							"<h2>" + "City: " + address.city + "</h2>" +
							"<h2>" + "State: " + address.state + "</h2>" + 
							"<h2>" + "Country: " + address.country + "</h2>" +
							"<h2>" + "ZipCode: " + address.zipcode + "</h2>" + "</li>");
				}
		}
			}
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

//function VerifyUser(){
	//$.mobile.loading("show");
	//var form = $("#verify-form");
	//var formData = form.serializeArray();
	//console.log("form Data: " + formData);
	//var updAddress = ConverToJSON(formData);
	//console.log("Updated Address: " + JSON.stringify(updAddress));
	//var updAddressJSON = JSON.stringify(updAddress);
	//$.ajax({
		//url : "http://localhost:3412/DB-Project/Addresss/",
		//method: 'get',
		//contentType: "application/json",
		//dataType:"json",
		//success : function(data, textStatus, jqXHR){
			//var verifyList = data.Addresss;
			//var len = verifyList.length;
			//var verify;
			//for (var i=0; i < len; ++i){
				//verify = verifyList[i];
				//if(verify.addressLine2 == updAddress.addressLine2 && verify.city == updAddress.city){
					//currentAddress = verify;
					//$.mobile.loading("hide");
					//$.mobile.navigate("#Addresss");
				//}
				//else{
					//alert("addressLine2 and city Invalid");
				//}
			//}
			
		//},
		//error: function(data, textStatus, jqXHR){
			//console.log("textStatus: " + textStatus);
			//$.mobile.loading("hide");
			//if (data.status == 404){
				//alert("Data could not be updated!");
			//}
			//else {
				//alert("Internal Error.");		
			//}
		//}
	//});
	
//}

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