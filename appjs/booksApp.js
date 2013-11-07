

$(document).on('pagebeforeshow', "#category-view", function( event, ui ) {
	console.log("Jose");
	$.ajax({
		url : "http://localhost:3412/DB-Project/subCats",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var subCatList = data.subCats;
			var len = subCatList.length;
			var list = $("#Books");
			list.empty();
			var subCat;
			for (var i=0; i < len; ++i){
				subCat = subCatList[i];
				list.append("<li><a onclick=GetSubCat(" + subCat.id + ")>" + 
					"<h1>" + subCat.name +  "</h1>" +
					"<img src= " +  subCat.iconSrc + "/>" + 
					"</a></li>");
			}
			list.listview("refresh");	
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});
});// --------------------------------------------Books-List-------------------------------------

$(document).on('pagebeforeshow', "#subCats", function( event, ui ) {
	console.log("Jose");
	$.ajax({
		url : "http://localhost:3412/DB-Project/subCats",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var subCatList = data.subCats;
			var len = subCatList.length;
			var list = $("#Computers");
			list.empty();
			var subCat;
			for (var i=0; i < len; ++i){
				subCat = subCatList[i];
				list.append("<li><a onclick=GetSubCat(" + subCat.id + ")>" + 
					"<h1>" + subCat.name +  "</h1>" +
					"<img src= " +  subCat.iconSrc + "/>" + 
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

$(document).on('pagebeforeshow', "#subCats", function( event, ui ) {
	console.log("Jose");
	$.ajax({
		url : "http://localhost:3412/DB-Project/subCats",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var subCatList = data.subCats;
			var len = subCatList.length;
			var list = $("#Clothing-list");
			list.empty();
			var subCat;
			for (var i=0; i < len; ++i){
				subCat = subCatList[i];
				list.append("<li><a onclick=GetSubCat(" + subCat.id + ")>" + 
					"<h1>" + subCat.name +  "</h1>" +
					"<img src= " +  subCat.iconSrc + "/>" + 
					"</a></li>");
			}
			list.listview("refresh");	
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});
});// --------------------------------------------Clothing-List-------------------------------------

$(document).on('pagebeforeshow', "#subCats", function( event, ui ) {
	console.log("Jose");
	$.ajax({
		url : "http://localhost:3412/DB-Project/subCats",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var subCatList = data.subCats;
			var len = subCatList.length;
			var list = $("#Electronics-list");
			list.empty();
			var subCat;
			for (var i=0; i < len; ++i){
				subCat = subCatList[i];
				list.append("<li><a onclick=GetSubCat(" + subCat.id + ")>" + 
					"<h1>" + subCat.name +  "</h1>" +
					"<img src= " +  subCat.iconSrc + "/>" + 
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

$(document).on('pagebeforeshow', "#subCats", function( event, ui ) {
	console.log("Jose");
	$.ajax({
		url : "http://localhost:3412/DB-Project/subCats",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var subCatList = data.subCats;
			var len = subCatList.length;
			var list = $("#Shoes-list");
			list.empty();
			var subCat;
			for (var i=0; i < len; ++i){
				subCat = subCatList[i];
				list.append("<li><a onclick=GetSubCat(" + subCat.id + ")>" + 
					"<h1>" + subCat.name +  "</h1>" +
					"<img src= " +  subCat.iconSrc + "/>" + 
					"</a></li>");
			}
			list.listview("refresh");	
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});
});// ---------------------------------------------Shoes-List-------------------------------------

$(document).on('pagebeforeshow', "#subCats", function( event, ui ) {
	console.log("Jose");
	$.ajax({
		url : "http://localhost:3412/DB-Project/subCats",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var subCatList = data.subCats;
			var len = subCatList.length;
			var list = $("#Sports-list");
			list.empty();
			var subCat;
			for (var i=0; i < len; ++i){
				subCat = subCatList[i];
				list.append("<li><a onclick=GetSubCat(" + subCat.id + ")>" + 
					"<h1>" + subCat.name +  "</h1>" +
					"<img src= " +  subCat.iconSrc + "/>" + 
					"</a></li>");
			}
			list.listview("refresh");	
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});
});// --------------------------------------------Sports-List-------------------------------------



$(document).on('pagebeforeshow', "#subCat-view", function( event, ui ) {
	// currentSubCat has been set at this point
	$("#upd-name3").val(currentSubCat.name);
	$("#upd-iconSrc3").val(currentSubCat.iconSrc);
	
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
		url : "http://localhost:3412/DB-Project/subCats",
		method: 'post',
		data : newSubCatJSON,
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#subCats");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			alert("Data could not be added!");
		}
	});


}

var currentSubCat = {};

function GetSubCat(id){
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/DB-Project/subCats/" + id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentSubCat = data.subCat;
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
	updSubCat.id = currentSubCat.id;
	console.log("Updated SubCat: " + JSON.stringify(updSubCat));
	var updSubCatJSON = JSON.stringify(updSubCat);
	$.ajax({
		url : "http://localhost:3412/DB-Project/subCats/" + updSubCat.id,
		method: 'put',
		data : updSubCatJSON,
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#subCats");
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
	var id = currentSubCat.id;
	$.ajax({
		url : "http://localhost:3412/DB-Project/subCats/" + id,
		method: 'delete',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#subCats");
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