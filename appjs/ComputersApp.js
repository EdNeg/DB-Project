

$(document).on('pagebeforeshow', "#category-view", function( event, ui ) {
	
	$.ajax({
		url : "http://localhost:3412/DB-Project/Computers",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var compCatList = data.Computers;
			var len = compCatList.length;
			var list = $("#Computers");
			list.empty();
			var compCat;
			for (var i=0; i < len; ++i){
				compCat = compCatList[i];
				list.append("<li><a onclick=GetCompCat(" + compCat.id + ")>" + 
					"<h1>" + compCat.name +  "</h1>" +
					
					"</a></li>");
			}
			list.listview("refresh");	
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});
});// --------------------------------------------Computers-List-------------------------------------

$(document).on('pagebeforeshow', "#subCat-view", function( event, ui ) {
	// currentCompCat has been set at this point
	document.getElementById("currSubCat-Name").innerHTML = currentCompCat.name;
	
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
		url : "http://localhost:3412/DB-Project/Computers",
		method: 'post',
		data : newSubCatJSON,
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#Computers");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			alert("Data could not be added!");
		}
	});


}

var currentCompCat = {};

function GetCompCat(id){
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/DB-Project/Computers/" + id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentCompCat = data.compCat;
			$.mobile.loading("hide");
			$.mobile.navigate("#subCat-view");
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

function UpdateSubCat(){
	$.mobile.loading("show");
	var form = $("#subCat-view-form");
	var formData = form.serializeArray();
	console.log("form Data: " + formData);
	var updSubCat = ConverToJSON(formData);
	updSubCat.id = currentCompCat.id;
	console.log("Updated SubCat: " + JSON.stringify(updSubCat));
	var updSubCatJSON = JSON.stringify(updSubCat);
	$.ajax({
		url : "http://localhost:3412/DB-Project/Computers/" + updSubCat.id,
		method: 'put',
		data : updSubCatJSON,
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#Computers");
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
	var id = currentCompCat.id;
	$.ajax({
		url : "http://localhost:3412/DB-Project/Computers/" + id,
		method: 'delete',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#Computers");
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