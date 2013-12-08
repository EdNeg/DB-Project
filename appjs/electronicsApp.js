

$(document).on('pagebeforeshow', "#electronics-view", function( event, ui ) {
	
	$.ajax({
		url : "http://localhost:3412/DB-Project/Electronics",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			
			var electCatList = data.electronics;
			var len = electCatList.length;
			var list = $("#Electronics");
			list.empty();
			var electCat;
			for (var i=0; i < len; ++i){
				electCat = electCatList[i];
				list.append("<li><a onclick=GetElectCat(" + electCat.subCategoryID + ")>" + "<center>" +
					"<img src= " +  electCat.subCategoryDesc + "/>"+
					"<h1>" + electCat.subCategoryName +  "</h1>" + "</center>" +
					
					"</a></li>");
			}
			list.listview("refresh");	
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});
});// --------------------------------------------Electronics-List-------------------------------------



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

function SaveSubCat(){
	$.mobile.loading("show");
	var form = $("#subCat-form");
	var formData = form.serializeArray();
	console.log("form Data: " + formData);
	var newSubCat = ConverToJSON(formData);
	console.log("New SubCat: " + JSON.stringify(newSubCat));
	var newSubCatJSON = JSON.stringify(newSubCat);
	$.ajax({
		url : "http://localhost:3412/DB-Project/Electronics",
		method: 'post',
		data : newSubCatJSON,
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#Electronics");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			alert("Data could not be added!");
		}
	});


}

var currentElectCat = {};

function GetElectCat(id){
	$.mobile.loading("show");
	if(id == 5){
		$.ajax({
		url : "http://localhost:3412/DB-Project/Electronics/" + id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentElectCat = data.subCat;
			$.mobile.loading("hide");
			$.mobile.navigate("#tv");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("SubCat not found.");
			}
			else {
				alter("Internal Server Error.");
			}
		}
		});
	}
		
	else if(id == 6){
		$.ajax({
		url : "http://localhost:3412/DB-Project/Electronics/" + id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentElectCat = data.subCat;
			$.mobile.loading("hide");
			$.mobile.navigate("#audio");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("SubCat not found.");
			}
			else {
				alter("Internal Server Error.");
			}
		}
		});
	}
	else if(id == 7){
		$.ajax({
		url : "http://localhost:3412/DB-Project/Electronics/" + id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentElectCat = data.subCat;
			$.mobile.loading("hide");
			$.mobile.navigate("#phones");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("SubCat not found.");
			}
			else {
				alter("Internal Server Error.");
			}
		}
		});
	}
	else if(id == 8){
		$.ajax({
		url : "http://localhost:3412/DB-Project/Electronics/" + id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentElectCat = data.subCat;
			$.mobile.loading("hide");
			$.mobile.navigate("#cameras");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("SubCat not found.");
			}
			else {
				alter("Internal Server Error.");
			}
		}
		});
	}
	else if(id == 9){
		$.ajax({
		url : "http://localhost:3412/DB-Project/Electronics/" + id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentElectCat = data.subCat;
			$.mobile.loading("hide");
			$.mobile.navigate("#video");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("SubCat not found.");
			}
			else {
				alter("Internal Server Error.");
			}
		}
		});
	}
}

function UpdateSubCat(){
	$.mobile.loading("show");
	var form = $("#subCat-view-form");
	var formData = form.serializeArray();
	console.log("form Data: " + formData);
	var updSubCat = ConverToJSON(formData);
	updSubCat.id = currentElectCat.id;
	console.log("Updated SubCat: " + JSON.stringify(updSubCat));
	var updSubCatJSON = JSON.stringify(updSubCat);
	$.ajax({
		url : "http://localhost:3412/DB-Project/Electronics/" + updSubCat.id,
		method: 'put',
		data : updSubCatJSON,
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#Electronics");
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

function DeleteSubCat(){
	$.mobile.loading("show");
	var id = currentElectCat.id;
	$.ajax({
		url : "http://localhost:3412/DB-Project/Electronics/" + id,
		method: 'delete',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#Electronics");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("subCat not found.");
			}
			else {
				alter("Internal Server Error.");
			}
		}
	});
}