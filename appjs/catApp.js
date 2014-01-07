
function Popup(msg){
	$("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h3>"+msg+"</h3></div>")
	.css({ display: "block", 
		opacity: 0.90, 
		position: "fixed",
		padding: "7px",
		"text-align": "center",
		width: "270px",
		left: ($(window).width() - 284)/2,
		top: $(window).height()/2 })
	.appendTo( $.mobile.pageContainer ).delay( 1500 )
	.fadeOut( 400, function(){
		$(this).remove();
	});
}

$(document).on('pagebeforeshow', "#categories", function( event, ui ) {
	
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

					"<img src= " + category.categoryDesc + "/>"+

					"<h1>" + category.categoryName +  "</h1>" + "</center>" +
					"</a></li>");
			}
			list.listview("refresh");	
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			Popup("Data not found!");
		}
	});
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

var currentCategory = {};

function GetCategory(id){
	$.mobile.loading("show");
		$.ajax({
		url : "http://localhost:3412/DB-Project/categories/" + id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentCategory = data.category;
			$.mobile.loading("hide");
			$.mobile.navigate("#subCategories");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				Popup("SubCat not found.");
			}
			else {
				Popup("Internal Server Error.");
			}
		}
		});
}

$(document).on('pagebeforeshow', "#subCategories", function( event, ui ) {
	
	$.ajax({
		url : "http://localhost:3412/DB-Project/subCategoriesParent/" + currentCategory.categoryID,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var categoryList = data.subCategories;
			var len = categoryList.length;
			var list = $("#subCategories-list");
			list.empty();
			var category;
			for (var i=0; i < len; ++i){
				category = categoryList[i];
				list.append("<li><a onclick=GetSubCategory(" + category.subCategoryID + ")>" + "<center>" +

					"<img src= " + category.subCategoryDesc + "/>"+

					"<h1>" + category.subCategoryName +  "</h1>" + "</center>" +
					"</a></li>");
			}
			list.listview("refresh");	
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.navigate("#categories");
			Popup("Category doesn't have any sub-categories!");
		}
	});
});

var currentSubCat;
function GetSubCategory(id){
	$.mobile.loading("show");
		$.ajax({
		url : "http://localhost:3412/DB-Project/subCategory/" + id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentSubCat = data.subCategory;
			$.mobile.loading("hide");
			$.mobile.navigate("#tags");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				Popup("Category not found.");
			}
			else {
				Popup("Internal Server Error.");
			}
		}
		});
}

$(document).on('pagebeforeshow', "#tags", function( event, ui ) {
	
	$.ajax({
		url : "http://localhost:3412/DB-Project/tagsParent/" + currentSubCat.subCategoryID,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var categoryList = data.tags;
			var len = categoryList.length;
			if(len == 1){
				GetProductsByTag(categoryList[0].tagID);
			}
			else{
				var list = $("#tags-list");
				list.empty();
				var category;
				for (var i=0; i < len; ++i){
					category = categoryList[i];
					list.append("<li><a onclick=GetProductsByTag(" + category.tagID + ")>" + "<center>" +
	
						"<img src= " + category.tagIcon + "/>"+
	
						"<h1>" + category.tagName +  "</h1>" + "</center>" +
						"</a></li>");
				}
				list.listview("refresh");
			}	
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			Popup("Items not found!");
			$.mobile.navigate("#subCategories");
		}
	});
});




function SaveCategory(){
	$.mobile.loading("show");
	var form = $("#category-form");
	var formData = form.serializeArray();
	console.log("form Data: " + formData);
	var newCategory = ConverToJSON(formData);
	console.log("New Category: " + JSON.stringify(newCategory));
	var newCategoryJSON = JSON.stringify(newCategory);
	var radioValue;
  	if (document.getElementById('arrow').checked) {
  		radioValue = document.getElementById('arrow').value;
	}
	else if (document.getElementById('paw').checked) {
  		radioValue = document.getElementById('paw').value;
	}
	else if (document.getElementById('bow').checked) {
  		radioValue = document.getElementById('bow').value;
	}
	else if (document.getElementById('bug').checked) {
  		radioValue = document.getElementById('bug').value;
	}
	else if (document.getElementById('clock').checked) {
  		radioValue = document.getElementById('clock').value;
	}
	else if (document.getElementById('controller').checked) {
  		radioValue = document.getElementById('controller').value;
	}
	else if (document.getElementById('doghouse').checked) {
  		radioValue = document.getElementById('doghouse').value;
	}
	else if (document.getElementById('dumbell').checked) {
  		radioValue = document.getElementById('dumbell').value;
	}
	else if (document.getElementById('mug').checked) {
  		radioValue = document.getElementById('mug').value;
	}
	else if (document.getElementById('toolbox').checked) {
  		radioValue = document.getElementById('toolbox').value;
	}

	$.ajax({
		url : "http://localhost:3412/DB-Project/newCategory/" + radioValue,
		method: 'post',
		data : newCategoryJSON,
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			Popup("Category Successfully Added!");
			$.mobile.navigate("#adminProfile");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			Popup("Data could not be added!");
			
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
				Popup("Data could not be updated!");
			}
			else {
				Popup("Internal Error.");		
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
				Popup("category not found.");
			}
			else {
				Popup("Internal Server Error.");
			}
		}
	});
}

$(document).on('pagebeforeshow', "#adminCategories", function( event, ui ) {
	
	$.ajax({
		url : "http://localhost:3412/DB-Project/categories",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var categoryList = data.categories;
			var len = categoryList.length;
			var list = $("#categories-list-admin");
			list.empty();
			var category;
			for (var i=0; i < len; ++i){
				category = categoryList[i];
				list.append("<li><a onclick=GetCategoryAdmin(" + category.categoryID + ")>" + "<center>" +

					"<img src= " + category.categoryDesc + "/>"+

					"<h1>" + category.categoryName +  "</h1>" + "</center>" +
					"</a></li>");
			}
			list.listview("refresh");	
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			Popup("Data not found!");
		}
	});
});

var currentCatAdmin;
function GetCategoryAdmin(id){
	$.mobile.loading("show");
		$.ajax({
		url : "http://localhost:3412/DB-Project/categories/" + id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentCatAdmin = data.category;
			$.mobile.loading("hide");
			$.mobile.navigate("#adminSelectedCat");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				Popup("Category not found.");
			}
			else {
				Popup("Internal Server Error.");
			}
		}
		});
}

$(document).on('pagebeforeshow', "#adminSelectedCat", function( event, ui ) {
        // currentCatAdmin has been set at this point
        var catName = "Options For Category: " + currentCatAdmin.categoryName;
        var subCatThing = "Enter New Sub-Category Information For: " + currentCatAdmin.categoryName;
        document.getElementById("currCatAdmin").innerHTML = catName; 
        document.getElementById("currCatAdmin2").innerHTML = subCatThing;
});

function SaveSubCategory(){
	$.mobile.loading("show");
	var form = $("#subCategory-form");
	var formData = form.serializeArray();
	console.log("form Data: " + formData);
	var newCategory = ConverToJSON(formData);
	console.log("New Category: " + JSON.stringify(newCategory));
	var newCategoryJSON = JSON.stringify(newCategory);
	var radioValue;
  	if (document.getElementById('arrow2').checked) {
  		radioValue = document.getElementById('arrow').value;
	}
	else if (document.getElementById('paw2').checked) {
  		radioValue = document.getElementById('paw').value;
	}
	else if (document.getElementById('bow2').checked) {
  		radioValue = document.getElementById('bow').value;
	}
	else if (document.getElementById('bug2').checked) {
  		radioValue = document.getElementById('bug').value;
	}
	else if (document.getElementById('clock2').checked) {
  		radioValue = document.getElementById('clock').value;
	}
	else if (document.getElementById('controller2').checked) {
  		radioValue = document.getElementById('controller').value;
	}
	else if (document.getElementById('doghouse2').checked) {
  		radioValue = document.getElementById('doghouse').value;
	}
	else if (document.getElementById('dumbell2').checked) {
  		radioValue = document.getElementById('dumbell').value;
	}
	else if (document.getElementById('mug2').checked) {
  		radioValue = document.getElementById('mug').value;
	}
	else if (document.getElementById('toolbox2').checked) {
  		radioValue = document.getElementById('toolbox').value;
	}

	$.ajax({
		url : "http://localhost:3412/DB-Project/newSubCategory/" + radioValue + "/" + currentCatAdmin.categoryID,
		method: 'post',
		data : newCategoryJSON,
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			Popup("Sub-Category Successfully Added!");
			$.mobile.navigate("#adminSelectedCat");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			Popup("Data could not be added!");
		}
	});


}

$(document).on('pagebeforeshow', "#adminSubCategories", function( event, ui ) {
	
	$.ajax({
		url : "http://localhost:3412/DB-Project/subCategoriesParent/" + currentCatAdmin.categoryID,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var categoryList = data.subCategories;
			var len = categoryList.length;
			var list = $("#subCategories-list-admin");
			list.empty();
			var category;
			for (var i=0; i < len; ++i){
				category = categoryList[i];
				list.append("<li><a onclick=GetSubCategoryAdmin(" + category.subCategoryID + ")>" + "<center>" +

					"<img src= " + category.subCategoryDesc + "/>"+

					"<h1>" + category.subCategoryName +  "</h1>" + "</center>" +
					"</a></li>");
			}
			list.listview("refresh");	
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.navigate("#adminSelectedCat");
			Popup("Category doesn't have any sub-categories!");
			
		}
	});
});

var currentSubCatAdmin;
function GetSubCategoryAdmin(id){
	$.mobile.loading("show");
		$.ajax({
		url : "http://localhost:3412/DB-Project/subCategory/" + id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentSubCatAdmin = data.subCategory;
			$.mobile.loading("hide");
			$.mobile.navigate("#adminSelectedSubCat");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				Popup("Category not found.");
			}
			else {
				Popup("Internal Server Error.");
			}
		}
		});
}

$(document).on('pagebeforeshow', "#adminSelectedSubCat", function( event, ui ) {
        // currentSubCatAdmin has been set at this point
        var subCatName = "Options For Sub-Category: " + currentSubCatAdmin.subCategoryName;
        var tagThing = "Enter New Tag Information For: " + currentSubCatAdmin.subCategoryName;
        document.getElementById("currSubCatAdmin").innerHTML = subCatName; 
        document.getElementById("currSubCatAdmin2").innerHTML = tagThing;
});

$(document).on('pagebeforeshow', "#adminViewTags", function( event, ui ) {
	
	$.ajax({
		url : "http://localhost:3412/DB-Project/tagsParent/" + currentSubCatAdmin.subCategoryID,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var categoryList = data.tags;
			var len = categoryList.length;
			var list = $("#tags-list-admin");
			list.empty();
			var category;
			for (var i=0; i < len; ++i){
				category = categoryList[i];
				
				if(category.tagName == null){
					Popup("Sub-Category doesn't have tags!");
					$.mobile.navigate("#adminSelectedSubCat");
				}
				else{
				list.append("<li><a onclick=GetTagAdmin(" + category.tagID + ")>" + "<center>" +

					"<img src= " + category.tagIcon + "/>"+

					"<h1>" + category.tagName+  "</h1>" + "</center>" +
					"</a></li>");
				}
			}
			list.listview("refresh");	
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			Popup("Sub-Category doesn't have tags!");
			$.mobile.navigate("#adminSelectedSubCat");
		}
	});
});

var currentTagAdmin;
function GetTagAdmin(id){
	$.mobile.loading("show");
		$.ajax({
		url : "http://localhost:3412/DB-Project/tag/" + id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentTagAdmin = data.tag;
			$.mobile.loading("hide");
			$.mobile.navigate("#adminSelectedTag");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				Popup("Tag not found.");
			}
			else {
				Popup("Internal Server Error.");
			}
		}
		});
}

$(document).on('pagebeforeshow', "#adminSelectedTag", function( event, ui ) {
        // currentTagAdmin has been set at this point
        var tagName = "Options For Tag: " + currentTagAdmin.tagName;
        //var subCatThing = "Enter New Sub-Category Information For: " + currentCatAdmin.categoryName;
        document.getElementById("currTagAdmin").innerHTML = tagName; 
        //document.getElementById("currSubCatAdmin").innerHTML = subCatThing;
});

function SaveTag(){
	$.mobile.loading("show");
	var form = $("#tag-form");
	var formData = form.serializeArray();
	console.log("form Data: " + formData);
	var newCategory = ConverToJSON(formData);
	console.log("New Category: " + JSON.stringify(newCategory));
	var newCategoryJSON = JSON.stringify(newCategory);
	var radioValue;
  	if (document.getElementById('arrow3').checked) {
  		radioValue = document.getElementById('arrow').value;
	}
	else if (document.getElementById('paw3').checked) {
  		radioValue = document.getElementById('paw').value;
	}
	else if (document.getElementById('bow3').checked) {
  		radioValue = document.getElementById('bow').value;
	}
	else if (document.getElementById('bug3').checked) {
  		radioValue = document.getElementById('bug').value;
	}
	else if (document.getElementById('clock3').checked) {
  		radioValue = document.getElementById('clock').value;
	}
	else if (document.getElementById('controller3').checked) {
  		radioValue = document.getElementById('controller').value;
	}
	else if (document.getElementById('doghouse3').checked) {
  		radioValue = document.getElementById('doghouse').value;
	}
	else if (document.getElementById('dumbell3').checked) {
  		radioValue = document.getElementById('dumbell').value;
	}
	else if (document.getElementById('mug3').checked) {
  		radioValue = document.getElementById('mug').value;
	}
	else if (document.getElementById('toolbox3').checked) {
  		radioValue = document.getElementById('toolbox').value;
	}

	$.ajax({
		url : "http://localhost:3412/DB-Project/newTag/" + radioValue + "/" + currentSubCatAdmin.subCategoryID,
		method: 'post',
		data : newCategoryJSON,
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			Popup("Tag Successfully Added!");
			$.mobile.navigate("#adminSelectedSubCat");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			Popup("Data could not be added!");
		}
	});


}

function UpdateCategory(){
        $.mobile.loading("show");
        var form = $("#updateCategory");
        var formData = form.serializeArray();
        console.log("form Data: " + formData);
        var updAccount = ConverToJSON(formData);
        console.log("Updated Account: " + JSON.stringify(updAccount));
        var updAccountJSON = JSON.stringify(updAccount);
        var radioValue;
  	if (document.getElementById('arrow4').checked) {
  		radioValue = document.getElementById('arrow').value;
	}
	else if (document.getElementById('paw4').checked) {
  		radioValue = document.getElementById('paw').value;
	}
	else if (document.getElementById('bow4').checked) {
  		radioValue = document.getElementById('bow').value;
	}
	else if (document.getElementById('bug4').checked) {
  		radioValue = document.getElementById('bug').value;
	}
	else if (document.getElementById('clock4').checked) {
  		radioValue = document.getElementById('clock').value;
	}
	else if (document.getElementById('controller4').checked) {
  		radioValue = document.getElementById('controller').value;
	}
	else if (document.getElementById('doghouse4').checked) {
  		radioValue = document.getElementById('doghouse').value;
	}
	else if (document.getElementById('dumbell4').checked) {
  		radioValue = document.getElementById('dumbell').value;
	}
	else if (document.getElementById('mug4').checked) {
  		radioValue = document.getElementById('mug').value;
	}
	else if (document.getElementById('toolbox4').checked) {
  		radioValue = document.getElementById('toolbox').value;
	}
        
        $.ajax({
                url : "http://localhost:3412/DB-Project/categoryUpdate/" +  currentCatAdmin.categoryID + "/" + radioValue,
                method: 'put',
                data : updAccountJSON,
                contentType: "application/json",
                dataType:"json",
                success : function(data, textStatus, jqXHR){
                        $.mobile.loading("hide");
                        $.mobile.navigate("#adminCategories");
                        Popup("You have successfully updated a category!");
                },
                error: function(data, textStatus, jqXHR){
                        console.log("textStatus: " + textStatus);
                        $.mobile.loading("hide");
                        if (data.status == 404){
                                Popup("Data could not be updated!");
                        }
                        else if (data.status == 400){
                                Popup("Error: Missing fields for account.");
                        }
                        else {
                                Popup(data.status);
                                Popup("Internal Error.");               
                        }
                }
        });
}

$(document).on('pagebeforeshow', "#editCategory", function( event, ui ) {
	// currentCatAdmin has been set at this point

	var categoryName = "Edit category: " + currentCatAdmin.categoryName;
	document.getElementById("currCategory").innerHTML = categoryName;
	// document.getElementById("adminUserName").innerHTML = currentAdmin.adminUserName;
	// document.getElementById("adminPassword").innerHTML = currentAdmin.adminPassword;
	$("#name4").val(currentCatAdmin.categoryName);        

});

$(document).on('pagebeforeshow', "#deleteCategory", function( event, ui ) {
// currentCatAdmin has been set at this point
var temp = "Are you sure you want to delete the category: " + currentCatAdmin.categoryName + "?";
document.getElementById("categoryDel").innerHTML = temp;
});

function DeleteCategory(){
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/DB-Project/categoryDel/" + currentCatAdmin.categoryID,
		method: 'delete',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			Popup("You have succesfully removed a category!");
			$.mobile.navigate("#adminProfile");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			Popup("Category could not be removed!");
		}
	});
}