

$(document).on('pagebeforeshow', "#category-view", function( event, ui ) {
	
	$.ajax({
		url : "http://localhost:3412/DB-Project/Clothing",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var clothCatList = data.Clothing;
			var len = clothCatList.length;
			var list = $("#Clothing");
			list.empty();
			var clothCat;
			for (var i=0; i < len; ++i){
				clothCat = clothCatList[i];
				list.append("<li><a onclick=GetClothCat(" + clothCat.id + ")>" + 
					"<h1>" + clothCat.name +  "</h1>" +
					
					"</a></li>");
			}
			list.listview("refresh");	
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});
});// --------------------------------------------Clothings-List-------------------------------------

$(document).on('pagebeforeshow', "#subCat-view", function( event, ui ) {
	// currentclothCat has been set at this point
	document.getElementById("currSubCat-Name").innerHTML = currentClothCat.name;
	
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

function SaveSubCat(){
	$.mobile.loading("show");
	var form = $("#subCat-form");
	var formData = form.serializeArray();
	console.log("form Data: " + formData);
	var newSubCat = ConverToJSON(formData);
	console.log("New SubCat: " + JSON.stringify(newSubCat));
	var newSubCatJSON = JSON.stringify(newSubCat);
	$.ajax({
		url : "http://localhost:3412/DB-Project/Clothing",
		method: 'post',
		data : newSubCatJSON,
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#Clothing");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			alert("Data could not be added!");
		}
	});


}

var currentClothCat = {};

function GetClothCat(id){
	$.mobile.loading("show");
	if(id == 0){
		$.ajax({
		url : "http://localhost:3412/DB-Project/Clothing/" + id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentSubCat = data.subCat;
			$.mobile.loading("hide");
			$.mobile.navigate("#childrenC");
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
		
	else if(id == 1){
		$.ajax({
		url : "http://localhost:3412/DB-Project/Clothing/" + id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentSubCat = data.subCat;
			$.mobile.loading("hide");
			$.mobile.navigate("#menC");
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
	else if(id == 2){
		$.ajax({
		url : "http://localhost:3412/DB-Project/Clothing/" + id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentSubCat = data.subCat;
			$.mobile.loading("hide");
			$.mobile.navigate("#womenC");
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
	updSubCat.id = currentClothCat.id;
	console.log("Updated SubCat: " + JSON.stringify(updSubCat));
	var updSubCatJSON = JSON.stringify(updSubCat);
	$.ajax({
		url : "http://localhost:3412/DB-Project/Clothing/" + updSubCat.id,
		method: 'put',
		data : updSubCatJSON,
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#Clothing");
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
	var id = currentClothCat.id;
	$.ajax({
		url : "http://localhost:3412/DB-Project/Clothing/" + id,
		method: 'delete',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#Clothing");
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