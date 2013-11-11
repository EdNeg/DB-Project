


//----------------------*******************************************************************************************************-->
//----------------------********************************SUBCATEGORIES START****************************************************-->
//----------------------*******************************************************************************************************-->


//////////////////////////////////////***************BOOKS******************///////////////////////////////////////////////////////////////////////

$(document).on('pagebeforeshow', "#childrenB", function( event, ui ) {
	$.ajax({
		url : "http://localhost:3412/DB-Project/products",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.products;
			var len = productList.length;
			var list = $("#BCList");
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				superTag = product.tag1 + product.tag2;
				if(superTag =="BooksChildren"){
					list.append("<li><a onclick=GetProduct(" + product.id + ")>" + 
						"<img src= " +  product.imgSrc + "/>" +
						"<p><i>" + product.brand + " " + product.name +  "</i></p>" +
						"<p> Model: " + product.model + "</p>" + 
						"<p> Dimensions: " + product.dimensions + "</p>" +
						"<p>" + product.description + "</p>" +
						"<p class=\"ui-li-aside\"> Instant Price: " + accounting.formatMoney(product.instPrice) + "</p>" +
						"<p class=\"ui-li-aside\">" + "_" + "</p>" +
						"<p class=\"ui-li-aside\"> Bid Price: " + accounting.formatMoney(product.bidPrice) + "</p>" +
						"</a></li>");
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


$(document).on('pagebeforeshow', "#fiction", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/products",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.products;
			var len = productList.length;
			var list = $("#BFList");
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				superTag = product.tag1 + product.tag2;
				if(superTag =="BooksFiction"){///////////////////////////////////////////REMEMBER TO CHANGE !!!!!
					list.append("<li><a onclick=GetProduct(" + product.id + ")>" + 
						"<img src= " +  product.imgSrc + "/>" +
						"<p><i>" + product.brand + " " + product.name +  "</i></p>" +
						"<p> Model: " + product.model + "</p>" + 
						"<p> Dimensions: " + product.dimensions + "</p>" +
						"<p>" + product.description + "</p>" +
						"<p class=\"ui-li-aside\"> Instant Price: " + accounting.formatMoney(product.instPrice) + "</p>" +
						"<p class=\"ui-li-aside\">" + "_" + "</p>" +
						"<p class=\"ui-li-aside\"> Bid Price: " + accounting.formatMoney(product.bidPrice) + "</p>" +
						"</a></li>");
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


$(document).on('pagebeforeshow', "#technology", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/products",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.products;
			var len = productList.length;
			var list = $("#BTList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				superTag = product.tag1 + product.tag2;
				if(superTag =="BooksTechnology"){///////////////////////////////////////////REMEMBER TO CHANGE !!!!!
					list.append("<li><a onclick=GetProduct(" + product.id + ")>" + 
						"<img src= " +  product.imgSrc + "/>" +
						"<p><i>" + product.brand + " " + product.name +  "</i></p>" +
						"<p> Model: " + product.model + "</p>" + 
						"<p> Dimensions: " + product.dimensions + "</p>" +
						"<p>" + product.description + "</p>" +
						"<p class=\"ui-li-aside\"> Instant Price: " + accounting.formatMoney(product.instPrice) + "</p>" +
						"<p class=\"ui-li-aside\">" + "_" + "</p>" +
						"<p class=\"ui-li-aside\"> Bid Price: " + accounting.formatMoney(product.bidPrice) + "</p>" +
						"</a></li>");
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


$(document).on('pagebeforeshow', "#business", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/products",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.products;
			var len = productList.length;
			var list = $("#BBList");///////////////////////////////////////////REMEMBER TO CHANGE !!!!!
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				superTag = product.tag1 + product.tag2;
				if(superTag =="BooksBusiness"){///////////////////////////////////////////REMEMBER TO CHANGE !!!!!
					list.append("<li><a onclick=GetProduct(" + product.id + ")>" + 
						"<img src= " +  product.imgSrc + "/>" +
						"<p><i>" + product.brand + " " + product.name +  "</i></p>" +
						"<p> Model: " + product.model + "</p>" + 
						"<p> Dimensions: " + product.dimensions + "</p>" +
						"<p>" + product.description + "</p>" +
						"<p class=\"ui-li-aside\"> Instant Price: " + accounting.formatMoney(product.instPrice) + "</p>" +
						"<p class=\"ui-li-aside\">" + "_" + "</p>" +
						"<p class=\"ui-li-aside\"> Bid Price: " + accounting.formatMoney(product.bidPrice) + "</p>" +
						"</a></li>");
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


///////////////////////************************COMPUTERS**************************//////////////////////////////////////////////



$(document).on('pagebeforeshow', "#laptops", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/products",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.products;
			var len = productList.length;
			var list = $("#CLList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				superTag = product.tag1 + product.tag2;
				if(superTag =="ComputersLaptops"){///////////////////////////////////////////REMEMBER TO CHANGE !!!!!
					list.append("<li><a onclick=GetProduct(" + product.id + ")>" + 
						"<img src= " +  product.imgSrc + "/>" +
						"<p><i>" + product.brand + " " + product.name +  "</i></p>" +
						"<p> Model: " + product.model + "</p>" + 
						"<p> Dimensions: " + product.dimensions + "</p>" +
						"<p>" + product.description + "</p>" +
						"<p class=\"ui-li-aside\"> Instant Price: " + accounting.formatMoney(product.instPrice) + "</p>" +
						"<p class=\"ui-li-aside\">" + "_" + "</p>" +
						"<p class=\"ui-li-aside\"> Bid Price: " + accounting.formatMoney(product.bidPrice) + "</p>" +
						"</a></li>");
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



$(document).on('pagebeforeshow', "#desktops", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/products",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.products;
			var len = productList.length;
			var list = $("#CDList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				superTag = product.tag1 + product.tag2;
				if(superTag =="ComputersDesktops"){///////////////////////////////////////////REMEMBER TO CHANGE !!!!!
					list.append("<li><a onclick=GetProduct(" + product.id + ")>" + 
						"<img src= " +  product.imgSrc + "/>" +
						"<p><i>" + product.brand + " " + product.name +  "</i></p>" +
						"<p> Model: " + product.model + "</p>" + 
						"<p> Dimensions: " + product.dimensions + "</p>" +
						"<p>" + product.description + "</p>" +
						"<p class=\"ui-li-aside\"> Instant Price: " + accounting.formatMoney(product.instPrice) + "</p>" +
						"<p class=\"ui-li-aside\">" + "_" + "</p>" +
						"<p class=\"ui-li-aside\"> Bid Price: " + accounting.formatMoney(product.bidPrice) + "</p>" +
						"</a></li>");
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

$(document).on('pagebeforeshow', "#tablets", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/products",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.products;
			var len = productList.length;
			var list = $("#CTList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				superTag = product.tag1 + product.tag2;
				if(superTag =="ComputersTablets"){///////////////////////////////////////////REMEMBER TO CHANGE !!!!!
					list.append("<li><a onclick=GetProduct(" + product.id + ")>" + 
						"<img src= " +  product.imgSrc + "/>" +
						"<p><i>" + product.brand + " " + product.name +  "</i></p>" +
						"<p> Model: " + product.model + "</p>" + 
						"<p> Dimensions: " + product.dimensions + "</p>" +
						"<p>" + product.description + "</p>" +
						"<p class=\"ui-li-aside\"> Instant Price: " + accounting.formatMoney(product.instPrice) + "</p>" +
						"<p class=\"ui-li-aside\">" + "_" + "</p>" +
						"<p class=\"ui-li-aside\"> Bid Price: " + accounting.formatMoney(product.bidPrice) + "</p>" +
						"</a></li>");
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


$(document).on('pagebeforeshow', "#printers", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/products",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.products;
			var len = productList.length;
			var list = $("#CPList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				superTag = product.tag1 + product.tag2;
				if(superTag =="ComputersPrinters"){///////////////////////////////////////////REMEMBER TO CHANGE !!!!!
					list.append("<li><a onclick=GetProduct(" + product.id + ")>" + 
						"<img src= " +  product.imgSrc + "/>" +
						"<p><i>" + product.brand + " " + product.name +  "</i></p>" +
						"<p> Model: " + product.model + "</p>" + 
						"<p> Dimensions: " + product.dimensions + "</p>" +
						"<p>" + product.description + "</p>" +
						"<p class=\"ui-li-aside\"> Instant Price: " + accounting.formatMoney(product.instPrice) + "</p>" +
						"<p class=\"ui-li-aside\">" + "_" + "</p>" +
						"<p class=\"ui-li-aside\"> Bid Price: " + accounting.formatMoney(product.bidPrice) + "</p>" +
						"</a></li>");
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


///////////////////////************************CLOTHING**************************//////////////////////////////////////////////

$(document).on('pagebeforeshow', "#childrenC", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/products",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.products;
			var len = productList.length;
			var list = $("#CCList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				superTag = product.tag1 + product.tag2;
				if(superTag =="ClothingChildren"){///////////////////////////////////////////REMEMBER TO CHANGE !!!!!
					list.append("<li><a onclick=GetProduct(" + product.id + ")>" + 
						"<img src= " +  product.imgSrc + "/>" +
						"<p><i>" + product.brand + " " + product.name +  "</i></p>" +
						"<p> Model: " + product.model + "</p>" + 
						"<p> Dimensions: " + product.dimensions + "</p>" +
						"<p>" + product.description + "</p>" +
						"<p class=\"ui-li-aside\"> Instant Price: " + accounting.formatMoney(product.instPrice) + "</p>" +
						"<p class=\"ui-li-aside\">" + "_" + "</p>" +
						"<p class=\"ui-li-aside\"> Bid Price: " + accounting.formatMoney(product.bidPrice) + "</p>" +
						"</a></li>");
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


$(document).on('pagebeforeshow', "#menShirts", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/products",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.products;
			var len = productList.length;
			var list = $("#CMSList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				superTag = product.tag1 + product.tag2 + product.tag3;
				if(superTag =="ClothingMenShirts"){///////////////////////////////////////////REMEMBER TO CHANGE !!!!!
					list.append("<li><a onclick=GetProduct(" + product.id + ")>" + 
						"<img src= " +  product.imgSrc + "/>" +
						"<p><i>" + product.brand + " " + product.name +  "</i></p>" +
						"<p> Model: " + product.model + "</p>" + 
						"<p> Dimensions: " + product.dimensions + "</p>" +
						"<p>" + product.description + "</p>" +
						"<p class=\"ui-li-aside\"> Instant Price: " + accounting.formatMoney(product.instPrice) + "</p>" +
						"<p class=\"ui-li-aside\">" + "_" + "</p>" +
						"<p class=\"ui-li-aside\"> Bid Price: " + accounting.formatMoney(product.bidPrice) + "</p>" +
						"</a></li>");
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


$(document).on('pagebeforeshow', "#menPants", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/products",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.products;
			var len = productList.length;
			var list = $("#CMPList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				superTag = product.tag1 + product.tag2 + product.tag3;
				if(superTag =="ClothingMenPants"){///////////////////////////////////////////REMEMBER TO CHANGE !!!!!
					list.append("<li><a onclick=GetProduct(" + product.id + ")>" + 
						"<img src= " +  product.imgSrc + "/>" +
						"<p><i>" + product.brand + " " + product.name +  "</i></p>" +
						"<p> Model: " + product.model + "</p>" + 
						"<p> Dimensions: " + product.dimensions + "</p>" +
						"<p>" + product.description + "</p>" +
						"<p class=\"ui-li-aside\"> Instant Price: " + accounting.formatMoney(product.instPrice) + "</p>" +
						"<p class=\"ui-li-aside\">" + "_" + "</p>" +
						"<p class=\"ui-li-aside\"> Bid Price: " + accounting.formatMoney(product.bidPrice) + "</p>" +
						"</a></li>");
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


$(document).on('pagebeforeshow', "#menSocks", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/products",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.products;
			var len = productList.length;
			var list = $("#CMSkList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				superTag = product.tag1 + product.tag2 + product.tag3;
				if(superTag =="ClothingMenSocks"){///////////////////////////////////////////REMEMBER TO CHANGE !!!!!
					list.append("<li><a onclick=GetProduct(" + product.id + ")>" + 
						"<img src= " +  product.imgSrc + "/>" +
						"<p><i>" + product.brand + " " + product.name +  "</i></p>" +
						"<p> Model: " + product.model + "</p>" + 
						"<p> Dimensions: " + product.dimensions + "</p>" +
						"<p>" + product.description + "</p>" +
						"<p class=\"ui-li-aside\"> Instant Price: " + accounting.formatMoney(product.instPrice) + "</p>" +
						"<p class=\"ui-li-aside\">" + "_" + "</p>" +
						"<p class=\"ui-li-aside\"> Bid Price: " + accounting.formatMoney(product.bidPrice) + "</p>" +
						"</a></li>");
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



$(document).on('pagebeforeshow', "#womenShirts", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/products",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.products;
			var len = productList.length;
			var list = $("#CWSList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				superTag = product.tag1 + product.tag2 + product.tag3;
				if(superTag =="ClothingWomenShirts"){///////////////////////////////////////////REMEMBER TO CHANGE !!!!!
					list.append("<li><a onclick=GetProduct(" + product.id + ")>" + 
						"<img src= " +  product.imgSrc + "/>" +
						"<p><i>" + product.brand + " " + product.name +  "</i></p>" +
						"<p> Model: " + product.model + "</p>" + 
						"<p> Dimensions: " + product.dimensions + "</p>" +
						"<p>" + product.description + "</p>" +
						"<p class=\"ui-li-aside\"> Instant Price: " + accounting.formatMoney(product.instPrice) + "</p>" +
						"<p class=\"ui-li-aside\">" + "_" + "</p>" +
						"<p class=\"ui-li-aside\"> Bid Price: " + accounting.formatMoney(product.bidPrice) + "</p>" +
						"</a></li>");
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


$(document).on('pagebeforeshow', "#womenPants", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/products",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.products;
			var len = productList.length;
			var list = $("#CWPList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				superTag = product.tag1 + product.tag2 + product.tag3;
				if(superTag =="ClothingWomenPants"){///////////////////////////////////////////REMEMBER TO CHANGE !!!!!
					list.append("<li><a onclick=GetProduct(" + product.id + ")>" + 
						"<img src= " +  product.imgSrc + "/>" +
						"<p><i>" + product.brand + " " + product.name +  "</i></p>" +
						"<p> Model: " + product.model + "</p>" + 
						"<p> Dimensions: " + product.dimensions + "</p>" +
						"<p>" + product.description + "</p>" +
						"<p class=\"ui-li-aside\"> Instant Price: " + accounting.formatMoney(product.instPrice) + "</p>" +
						"<p class=\"ui-li-aside\">" + "_" + "</p>" +
						"<p class=\"ui-li-aside\"> Bid Price: " + accounting.formatMoney(product.bidPrice) + "</p>" +
						"</a></li>");
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


$(document).on('pagebeforeshow', "#womenDresses", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/products",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.products;
			var len = productList.length;
			var list = $("#CWDList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				superTag = product.tag1 + product.tag2 + product.tag3;
				if(superTag =="ClothingWomenDresses"){///////////////////////////////////////////REMEMBER TO CHANGE !!!!!
					list.append("<li><a onclick=GetProduct(" + product.id + ")>" + 
						"<img src= " +  product.imgSrc + "/>" +
						"<p><i>" + product.brand + " " + product.name +  "</i></p>" +
						"<p> Model: " + product.model + "</p>" + 
						"<p> Dimensions: " + product.dimensions + "</p>" +
						"<p>" + product.description + "</p>" +
						"<p class=\"ui-li-aside\"> Instant Price: " + accounting.formatMoney(product.instPrice) + "</p>" +
						"<p class=\"ui-li-aside\">" + "_" + "</p>" +
						"<p class=\"ui-li-aside\"> Bid Price: " + accounting.formatMoney(product.bidPrice) + "</p>" +
						"</a></li>");
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


///////////////////////************************ELECTRONICS**************************//////////////////////////////////////////////



$(document).on('pagebeforeshow', "#tv", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/products",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.products;
			var len = productList.length;
			var list = $("#ETList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				superTag = product.tag1 + product.tag2;
				if(superTag =="ElectronicsTV"){///////////////////////////////////////////REMEMBER TO CHANGE !!!!!
					list.append("<li><a onclick=GetProduct(" + product.id + ")>" + 
						"<img src= " +  product.imgSrc + "/>" +
						"<p><i>" + product.brand + " " + product.name +  "</i></p>" +
						"<p> Model: " + product.model + "</p>" + 
						"<p> Dimensions: " + product.dimensions + "</p>" +
						"<p>" + product.description + "</p>" +
						"<p class=\"ui-li-aside\"> Instant Price: " + accounting.formatMoney(product.instPrice) + "</p>" +
						"<p class=\"ui-li-aside\">" + "_" + "</p>" +
						"<p class=\"ui-li-aside\"> Bid Price: " + accounting.formatMoney(product.bidPrice) + "</p>" +
						"</a></li>");
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



$(document).on('pagebeforeshow', "#audio", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/products",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.products;
			var len = productList.length;
			var list = $("#EAList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				superTag = product.tag1 + product.tag2;
				if(superTag =="ElectronicsAudio"){///////////////////////////////////////////REMEMBER TO CHANGE !!!!!
					list.append("<li><a onclick=GetProduct(" + product.id + ")>" + 
						"<img src= " +  product.imgSrc + "/>" +
						"<p><i>" + product.brand + " " + product.name +  "</i></p>" +
						"<p> Model: " + product.model + "</p>" + 
						"<p> Dimensions: " + product.dimensions + "</p>" +
						"<p>" + product.description + "</p>" +
						"<p class=\"ui-li-aside\"> Instant Price: " + accounting.formatMoney(product.instPrice) + "</p>" +
						"<p class=\"ui-li-aside\">" + "_" + "</p>" +
						"<p class=\"ui-li-aside\"> Bid Price: " + accounting.formatMoney(product.bidPrice) + "</p>" +
						"</a></li>");
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

$(document).on('pagebeforeshow', "#phones", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/products",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.products;
			var len = productList.length;
			var list = $("#EPList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				superTag = product.tag1 + product.tag2;
				if(superTag =="ElectronicsPhones"){///////////////////////////////////////////REMEMBER TO CHANGE !!!!!
					list.append("<li><a onclick=GetProduct(" + product.id + ")>" + 
						"<img src= " +  product.imgSrc + "/>" +
						"<p><i>" + product.brand + " " + product.name +  "</i></p>" +
						"<p> Model: " + product.model + "</p>" + 
						"<p> Dimensions: " + product.dimensions + "</p>" +
						"<p>" + product.description + "</p>" +
						"<p class=\"ui-li-aside\"> Instant Price: " + accounting.formatMoney(product.instPrice) + "</p>" +
						"<p class=\"ui-li-aside\">" + "_" + "</p>" +
						"<p class=\"ui-li-aside\"> Bid Price: " + accounting.formatMoney(product.bidPrice) + "</p>" +
						"</a></li>");
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


$(document).on('pagebeforeshow', "#cameras", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/products",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.products;
			var len = productList.length;
			var list = $("#ECList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				superTag = product.tag1 + product.tag2;
				if(superTag =="ElectronicsCameras"){///////////////////////////////////////////REMEMBER TO CHANGE !!!!!
					list.append("<li><a onclick=GetProduct(" + product.id + ")>" + 
						"<img src= " +  product.imgSrc + "/>" +
						"<p><i>" + product.brand + " " + product.name +  "</i></p>" +
						"<p> Model: " + product.model + "</p>" + 
						"<p> Dimensions: " + product.dimensions + "</p>" +
						"<p>" + product.description + "</p>" +
						"<p class=\"ui-li-aside\"> Instant Price: " + accounting.formatMoney(product.instPrice) + "</p>" +
						"<p class=\"ui-li-aside\">" + "_" + "</p>" +
						"<p class=\"ui-li-aside\"> Bid Price: " + accounting.formatMoney(product.bidPrice) + "</p>" +
						"</a></li>");
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

$(document).on('pagebeforeshow', "#video", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/products",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.products;
			var len = productList.length;
			var list = $("#EVList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				superTag = product.tag1 + product.tag2;
				if(superTag =="ElectronicsVideo"){///////////////////////////////////////////REMEMBER TO CHANGE !!!!!
					list.append("<li><a onclick=GetProduct(" + product.id + ")>" + 
						"<img src= " +  product.imgSrc + "/>" +
						"<p><i>" + product.brand + " " + product.name +  "</i></p>" +
						"<p> Model: " + product.model + "</p>" + 
						"<p> Dimensions: " + product.dimensions + "</p>" +
						"<p>" + product.description + "</p>" +
						"<p class=\"ui-li-aside\"> Instant Price: " + accounting.formatMoney(product.instPrice) + "</p>" +
						"<p class=\"ui-li-aside\">" + "_" + "</p>" +
						"<p class=\"ui-li-aside\"> Bid Price: " + accounting.formatMoney(product.bidPrice) + "</p>" +
						"</a></li>");
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



///////////////////////************************SHOES**************************//////////////////////////////////////////////



$(document).on('pagebeforeshow', "#childrenS", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/products",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.products;
			var len = productList.length;
			var list = $("#SCList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				superTag = product.tag1 + product.tag2;
				if(superTag =="ShoesChildren"){///////////////////////////////////////////REMEMBER TO CHANGE !!!!!
					list.append("<li><a onclick=GetProduct(" + product.id + ")>" + 
						"<img src= " +  product.imgSrc + "/>" +
						"<p><i>" + product.brand + " " + product.name +  "</i></p>" +
						"<p> Model: " + product.model + "</p>" + 
						"<p> Dimensions: " + product.dimensions + "</p>" +
						"<p>" + product.description + "</p>" +
						"<p class=\"ui-li-aside\"> Instant Price: " + accounting.formatMoney(product.instPrice) + "</p>" +
						"<p class=\"ui-li-aside\">" + "_" + "</p>" +
						"<p class=\"ui-li-aside\"> Bid Price: " + accounting.formatMoney(product.bidPrice) + "</p>" +
						"</a></li>");
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



$(document).on('pagebeforeshow', "#womenS", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/products",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.products;
			var len = productList.length;
			var list = $("#SWList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				superTag = product.tag1 + product.tag2;
				if(superTag =="ShoesWomen"){///////////////////////////////////////////REMEMBER TO CHANGE !!!!!
					list.append("<li><a onclick=GetProduct(" + product.id + ")>" + 
						"<img src= " +  product.imgSrc + "/>" +
						"<p><i>" + product.brand + " " + product.name +  "</i></p>" +
						"<p> Model: " + product.model + "</p>" + 
						"<p> Dimensions: " + product.dimensions + "</p>" +
						"<p>" + product.description + "</p>" +
						"<p class=\"ui-li-aside\"> Instant Price: " + accounting.formatMoney(product.instPrice) + "</p>" +
						"<p class=\"ui-li-aside\">" + "_" + "</p>" +
						"<p class=\"ui-li-aside\"> Bid Price: " + accounting.formatMoney(product.bidPrice) + "</p>" +
						"</a></li>");
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

$(document).on('pagebeforeshow', "#menS", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/products",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.products;
			var len = productList.length;
			var list = $("#SMList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				superTag = product.tag1 + product.tag2;
				if(superTag =="ShoesMen"){///////////////////////////////////////////REMEMBER TO CHANGE !!!!!
					list.append("<li><a onclick=GetProduct(" + product.id + ")>" + 
						"<img src= " +  product.imgSrc + "/>" +
						"<p><i>" + product.brand + " " + product.name +  "</i></p>" +
						"<p> Model: " + product.model + "</p>" + 
						"<p> Dimensions: " + product.dimensions + "</p>" +
						"<p>" + product.description + "</p>" +
						"<p class=\"ui-li-aside\"> Instant Price: " + accounting.formatMoney(product.instPrice) + "</p>" +
						"<p class=\"ui-li-aside\">" + "_" + "</p>" +
						"<p class=\"ui-li-aside\"> Bid Price: " + accounting.formatMoney(product.bidPrice) + "</p>" +
						"</a></li>");
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



///////////////////////************************SPORTS**************************//////////////////////////////////////////////



$(document).on('pagebeforeshow', "#bicycleFrames", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/products",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.products;
			var len = productList.length;
			var list = $("#SBFList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				superTag = product.tag1 + product.tag2 + product.tag3;
				if(superTag =="SportsBicyclesFrames"){///////////////////////////////////////////REMEMBER TO CHANGE !!!!!
					list.append("<li><a onclick=GetProduct(" + product.id + ")>" + 
						"<img src= " +  product.imgSrc + "/>" +
						"<p><i>" + product.brand + " " + product.name +  "</i></p>" +
						"<p> Model: " + product.model + "</p>" + 
						"<p> Dimensions: " + product.dimensions + "</p>" +
						"<p>" + product.description + "</p>" +
						"<p class=\"ui-li-aside\"> Instant Price: " + accounting.formatMoney(product.instPrice) + "</p>" +
						"<p class=\"ui-li-aside\">" + "_" + "</p>" +
						"<p class=\"ui-li-aside\"> Bid Price: " + accounting.formatMoney(product.bidPrice) + "</p>" +
						"</a></li>");
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


$(document).on('pagebeforeshow', "#bicyclesWheels", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/products",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.products;
			var len = productList.length;
			var list = $("#SBWList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				superTag = product.tag1 + product.tag2 + product.tag3;
				if(superTag =="SportsBicyclesWheels"){///////////////////////////////////////////REMEMBER TO CHANGE !!!!!
					list.append("<li><a onclick=GetProduct(" + product.id + ")>" + 
						"<img src= " +  product.imgSrc + "/>" +
						"<p><i>" + product.brand + " " + product.name +  "</i></p>" +
						"<p> Model: " + product.model + "</p>" + 
						"<p> Dimensions: " + product.dimensions + "</p>" +
						"<p>" + product.description + "</p>" +
						"<p class=\"ui-li-aside\"> Instant Price: " + accounting.formatMoney(product.instPrice) + "</p>" +
						"<p class=\"ui-li-aside\">" + "_" + "</p>" +
						"<p class=\"ui-li-aside\"> Bid Price: " + accounting.formatMoney(product.bidPrice) + "</p>" +
						"</a></li>");
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


$(document).on('pagebeforeshow', "#bicyclesHelmets", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/products",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.products;
			var len = productList.length;
			var list = $("#SBHList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				superTag = product.tag1 + product.tag2 + product.tag3;
				if(superTag =="SportsBicyclesHelmets"){///////////////////////////////////////////REMEMBER TO CHANGE !!!!!
					list.append("<li><a onclick=GetProduct(" + product.id + ")>" + 
						"<img src= " +  product.imgSrc + "/>" +
						"<p><i>" + product.brand + " " + product.name +  "</i></p>" +
						"<p> Model: " + product.model + "</p>" + 
						"<p> Dimensions: " + product.dimensions + "</p>" +
						"<p>" + product.description + "</p>" +
						"<p class=\"ui-li-aside\"> Instant Price: " + accounting.formatMoney(product.instPrice) + "</p>" +
						"<p class=\"ui-li-aside\">" + "_" + "</p>" +
						"<p class=\"ui-li-aside\"> Bid Price: " + accounting.formatMoney(product.bidPrice) + "</p>" +
						"</a></li>");
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


$(document).on('pagebeforeshow', "#bicyclesParts", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/products",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.products;
			var len = productList.length;
			var list = $("#SBPList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				superTag = product.tag1 + product.tag2 + product.tag3;
				if(superTag =="SportsBicyclesParts"){///////////////////////////////////////////REMEMBER TO CHANGE !!!!!
					list.append("<li><a onclick=GetProduct(" + product.id + ")>" + 
						"<img src= " +  product.imgSrc + "/>" +
						"<p><i>" + product.brand + " " + product.name +  "</i></p>" +
						"<p> Model: " + product.model + "</p>" + 
						"<p> Dimensions: " + product.dimensions + "</p>" +
						"<p>" + product.description + "</p>" +
						"<p class=\"ui-li-aside\"> Instant Price: " + accounting.formatMoney(product.instPrice) + "</p>" +
						"<p class=\"ui-li-aside\">" + "_" + "</p>" +
						"<p class=\"ui-li-aside\"> Bid Price: " + accounting.formatMoney(product.bidPrice) + "</p>" +
						"</a></li>");
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

$(document).on('pagebeforeshow', "#fishing", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/products",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.products;
			var len = productList.length;
			var list = $("#SFList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				superTag = product.tag1 + product.tag2;
				if(superTag =="SportsFishing"){///////////////////////////////////////////REMEMBER TO CHANGE !!!!!
					list.append("<li><a onclick=GetProduct(" + product.id + ")>" + 
						"<img src= " +  product.imgSrc + "/>" +
						"<p><i>" + product.brand + " " + product.name +  "</i></p>" +
						"<p> Model: " + product.model + "</p>" + 
						"<p> Dimensions: " + product.dimensions + "</p>" +
						"<p>" + product.description + "</p>" +
						"<p class=\"ui-li-aside\"> Instant Price: " + accounting.formatMoney(product.instPrice) + "</p>" +
						"<p class=\"ui-li-aside\">" + "_" + "</p>" +
						"<p class=\"ui-li-aside\"> Bid Price: " + accounting.formatMoney(product.bidPrice) + "</p>" +
						"</a></li>");
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

$(document).on('pagebeforeshow', "#baseball", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/products",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.products;
			var len = productList.length;
			var list = $("#SBsBList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				superTag = product.tag1 + product.tag2;
				if(superTag =="SportsBaseball"){///////////////////////////////////////////REMEMBER TO CHANGE !!!!!
					list.append("<li><a onclick=GetProduct(" + product.id + ")>" + 
						"<img src= " +  product.imgSrc + "/>" +
						"<p><i>" + product.brand + " " + product.name +  "</i></p>" +
						"<p> Model: " + product.model + "</p>" + 
						"<p> Dimensions: " + product.dimensions + "</p>" +
						"<p>" + product.description + "</p>" +
						"<p class=\"ui-li-aside\"> Instant Price: " + accounting.formatMoney(product.instPrice) + "</p>" +
						"<p class=\"ui-li-aside\">" + "_" + "</p>" +
						"<p class=\"ui-li-aside\"> Bid Price: " + accounting.formatMoney(product.bidPrice) + "</p>" +
						"</a></li>");
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

$(document).on('pagebeforeshow', "#golf", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/products",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.products;
			var len = productList.length;
			var list = $("#SGList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				superTag = product.tag1 + product.tag2;
				if(superTag =="SportsGolf"){///////////////////////////////////////////REMEMBER TO CHANGE !!!!!
					list.append("<li><a onclick=GetProduct(" + product.id + ")>" + 
						"<img src= " +  product.imgSrc + "/>" +
						"<p><i>" + product.brand + " " + product.name +  "</i></p>" +
						"<p> Model: " + product.model + "</p>" + 
						"<p> Dimensions: " + product.dimensions + "</p>" +
						"<p>" + product.description + "</p>" +
						"<p class=\"ui-li-aside\"> Instant Price: " + accounting.formatMoney(product.instPrice) + "</p>" +
						"<p class=\"ui-li-aside\">" + "_" + "</p>" +
						"<p class=\"ui-li-aside\"> Bid Price: " + accounting.formatMoney(product.bidPrice) + "</p>" +
						"</a></li>");
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

$(document).on('pagebeforeshow', "#basketball", function( event, ui ) {//////////////REMEMBER TO CHANGE 
	$.ajax({
		url : "http://localhost:3412/DB-Project/products",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.products;
			var len = productList.length;
			var list = $("#SBkBList");///////////////////////////////////////////////////
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				superTag = product.tag1 + product.tag2;
				if(superTag =="SportsBasketball"){///////////////////////////////////////////REMEMBER TO CHANGE !!!!!
					list.append("<li><a onclick=GetProduct(" + product.id + ")>" + 
						"<img src= " +  product.imgSrc + "/>" +
						"<p><i>" + product.brand + " " + product.name +  "</i></p>" +
						"<p> Model: " + product.model + "</p>" + 
						"<p> Dimensions: " + product.dimensions + "</p>" +
						"<p>" + product.description + "</p>" +
						"<p class=\"ui-li-aside\"> Instant Price: " + accounting.formatMoney(product.instPrice) + "</p>" +
						"<p class=\"ui-li-aside\">" + "_" + "</p>" +
						"<p class=\"ui-li-aside\"> Bid Price: " + accounting.formatMoney(product.bidPrice) + "</p>" +
						"</a></li>");
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


//----------------------*******************************************************************************************************-->
//----------------------********************************SUBCATEGORIES END****************************************************-->
//----------------------*******************************************************************************************************-->


$(document).on('pagebeforeshow', "#products", function( event, ui ) {
	$.ajax({
		url : "http://localhost:3412/DB-Project/products",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.products;
			var len = productList.length;
			var list = $("#products-list");
			list.empty();
			var product;
			for (var i=0; i < len; ++i){
				product = productList[i];
				list.append("<li><a onclick=GetProduct(" + product.id + ")>" + 
					"<img src= " +  product.imgSrc + "/>" +
					"<p><i>" + product.productName +  "</i></p>" +
					"<p> Brand: " + product.brand  + "</p>" +
					"<p> Model: " + product.model + "</p>" + 
					"<p> Dimensions: " + product.dimensions + "</p>" +
					"<p>" + product.description + "</p>" +
					"<p class=\"ui-li-aside\"> Instant Price: " + accounting.formatMoney(product.instPrice) + "</p>" +
					"<p class=\"ui-li-aside\">" + "_" + "</p>" +
					"<p class=\"ui-li-aside\"> Bid Price: " + accounting.formatMoney(product.bidPrice) + "</p>" +
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


$(document).on('pagebeforeshow', "#product-view", function( event, ui ) {
	// currentProduct has been set at this point

	
	//document.getElementById("currPid").innerHTML = currentProduct.id;
	var brandName = currentProduct.brand + " " + currentProduct.name;
	var startPrice = "Starting Price: " + accounting.formatMoney(currentProduct.bidPrice);
	var instPrice = "Buy it Now: " + accounting.formatMoney(currentProduct.instPrice);
	var modelNo = "Model: " + currentProduct.model;
	var dims = "Dimensions: " + currentProduct.dimensions;
	var pid = "Product id: " + currentProduct.id;
	document.getElementById("currBrand-Name").innerHTML = brandName;
	document.getElementById("currImgSrc").src = currentProduct.imgSrc;
	document.getElementById("currBidPrice").innerHTML = startPrice;
	document.getElementById("currInstPrice").innerHTML = instPrice;
	document.getElementById("currDescription").innerHTML = currentProduct.description;
	document.getElementById("currModel").innerHTML = modelNo;
	document.getElementById("currDimensions").innerHTML = dims;
	document.getElementById("currId").innerHTML = pid;
	
	
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

function SaveProduct(){
	$.mobile.loading("show");
	var form = $("#product-form");
	var formData = form.serializeArray();
	console.log("form Data: " + formData);
	var newProduct = ConverToJSON(formData);
	console.log("New Product: " + JSON.stringify(newProduct));
	var newProductJSON = JSON.stringify(newProduct);
	$.ajax({
		url : "http://localhost:3412/DB-Project/products",
		method: 'post',
		data : newProductJSON,
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#products");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			alert("Data could not be added!");
		}
	});


}

var currentProduct = {};

function GetProduct(id){
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/DB-Project/products/" + id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentProduct = data.product;
			$.mobile.loading("hide");
			$.mobile.navigate("#product-view");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("Product not found.");
			}
			else {
				alter("Internal Server Error.");
			}
		}
	});
}

function UpdateProduct(){
	$.mobile.loading("show");
	var form = $("#product-view-form");
	var formData = form.serializeArray();
	console.log("form Data: " + formData);
	var updProduct = ConverToJSON(formData);
	updProduct.id = currentProduct.id;
	console.log("Updated Product: " + JSON.stringify(updProduct));
	var updProductJSON = JSON.stringify(updProduct);
	$.ajax({
		url : "http://localhost:3412/DB-Project/products/" + updProduct.id,
		method: 'put',
		data : updProductJSON,
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#products");
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

function DeleteProduct(){
	$.mobile.loading("show");
	var id = currentProduct.id;
	$.ajax({
		url : "http://localhost:3412/DB-Project/products/" + id,
		method: 'delete',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#products");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("product not found.");
			}
			else {
				alter("Internal Server Error.");
			}
		}
	});
}