

$(document).on('pagebeforeshow', "#shoes-view", function( event, ui ) {
	
	$.ajax({
		url : "http://localhost:3412/DB-Project/Shoes",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var shoeCatList = data.shoes;
			var len = shoeCatList.length;
			var list = $("#Shoes");
			list.empty();
			var shoeCat;
			for (var i=0; i < len; ++i){
				shoeCat = shoeCatList[i];
				list.append("<li><a onclick=GetShoeCat(" + shoeCat.subCategoryID + ")>" + "<center>" +

					"<img src= " +  "'" +  shoeCat.subCategoryDesc +  "'" + "/>"+

					"<h1>" + shoeCat.subCategoryName +  "</h1>" + "</center>" +
					
					"</a></li>");
			}
			list.listview("refresh");	
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});
});// --------------------------------------------Shoes-List-------------------------------------



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
		url : "http://localhost:3412/DB-Project/Shoes",
		method: 'post',
		data : newSubCatJSON,
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#Shoes");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			alert("Data could not be added!");
		}
	});


}

var currentShoeCat = {};

function GetShoeCat(id){
	$.mobile.loading("show");
	if(id == 17){
		$.ajax({
		url : "http://localhost:3412/DB-Project/Shoes/" + id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentShoeCat = data.subCat;
			$.mobile.loading("hide");
			$.mobile.navigate("#childrenS");
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
		
	else if(id == 18){
		$.ajax({
		url : "http://localhost:3412/DB-Project/Shoes/" + id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentSubCat = data.subCat;
			$.mobile.loading("hide");
			$.mobile.navigate("#womenS");
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
	else if(id == 19){
		$.ajax({
		url : "http://localhost:3412/DB-Project/Shoes/" + id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentSubCat = data.subCat;
			$.mobile.loading("hide");
			$.mobile.navigate("#menS");
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
	updSubCat.id = currentShoeCat.id;
	console.log("Updated SubCat: " + JSON.stringify(updSubCat));
	var updSubCatJSON = JSON.stringify(updSubCat);
	$.ajax({
		url : "http://localhost:3412/DB-Project/Shoes/" + updSubCat.id,
		method: 'put',
		data : updSubCatJSON,
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#Shoes");
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
	var id = currentShoeCat.id;
	$.ajax({
		url : "http://localhost:3412/DB-Project/Shoes/" + id,
		method: 'delete',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#Shoes");
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