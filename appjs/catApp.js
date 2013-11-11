
$(document).on('pagebeforeshow', "#categories", function( event, ui ) {
	console.log("Jose");
	$.ajax({
		url : "http://localhost:3412/DB-Project/categories",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var categoryList = data.categories;
			var len = categoryList.length;
			var list = $("#categories-list");
			list.empty();
			var category;
			for (var i=0; i < len; ++i){
				category = categoryList[i];
				list.append("<li><a onclick=GetCategory(" + category.categoryID + ")>" + "<center>" +
					"<img src= " +  category.iconSrc + "/>"+
					"<h1>" + category.categoryName +  "</h1>" + "</center>" +
					"</a></li>");
			}
			list.listview("refresh");	
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});
});

var algo = {};
$(document).on('pagebeforeshow', "#category-view", function( event, ui ) {
	// currentCategory has been set at this point
	var listy = $("#testy");
	listy.empty();
	document.getElementById("currCat-Name").innerHTML = currentCategory.name;
	//document.getElementById("currCatName2").innerHTML = currentCategory.name;
	//document.write(currentCategory.name);
	algo = currentCategory.name;
	switch(algo){
		case "Books":
			listy.append("<ol id='Books' data-role='list-divider' data-inset='true' data-theme='b'></ol>");
			break;
			
		case "Computers":
			listy.append("<ol id='Computers' data-role='listview' data-inset='true'></ol>");
			break;
		
		case "Clothing":
			listy.append("<ol id='Clothing' data-role='listview' data-inset='true'></ol>");
			break;
			
		case "Electronics":
			listy.append("<ol id='Electronics' data-role='listview' data-inset='true'></ol>");
			break;
			
		case "Shoes":
			listy.append("<ol id='Shoes' data-role='listview' data-inset='true'></ol>");
			break;
			
		case "Sports":
			listy.append("<ol id='Sports' data-role='listview' data-inset='true'></ol>");
			break;
	}
	
	//document.getElementById("currIcoSrc").src = currentCategory.iconSrc;
	

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

function convert(dbModel){
	var cliModel = {};
	
	cliModel.categoryName = dbModel.categoryName;
	cliModel.iconSrc = dbModel.iconSrc;
	return cliModel;
}

function SaveCategory(){
	$.mobile.loading("show");
	var form = $("#category-form");
	var formData = form.serializeArray();
	console.log("form Data: " + formData);
	var newCategory = ConverToJSON(formData);
	console.log("New Category: " + JSON.stringify(newCategory));
	var newCategoryJSON = JSON.stringify(newCategory);
	$.ajax({
		url : "http://localhost:3412/DB-Project/categories",
		method: 'post',
		data : newCategoryJSON,
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#categories");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			alert("Data could not be added!");
		}
	});


}

var currentCategory = {};

function GetCategory(id){
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/DB-Project/categories/" + id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentCategory = convert(data.category);
			$.mobile.loading("hide");
			$.mobile.navigate("#category-view");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Category not found.");
			}
			else {
				alter("Internal Server Error.");
			}
		}
	});
}

function UpdateCategory(){
	$.mobile.loading("show");
	var form = $("#category-view-form");
	var formData = form.serializeArray();
	console.log("form Data: " + formData);
	var updCategory = ConverToJSON(formData);
	updCategory.id = currentCategory.id;
	console.log("Updated Category: " + JSON.stringify(updCategory));
	var updCategoryJSON = JSON.stringify(updCategory);
	$.ajax({
		url : "http://localhost:3412/DB-Project/categories/" + updCategory.id,
		method: 'put',
		data : updCategoryJSON,
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#categories");
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

function DeleteCategory(){
	$.mobile.loading("show");
	var id = currentCategory.id;
	$.ajax({
		url : "http://localhost:3412/DB-Project/categories/" + id,
		method: 'delete',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#categories");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("category not found.");
			}
			else {
				alter("Internal Server Error.");
			}
		}
	});
}