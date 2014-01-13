$(document).on('pagebeforeshow', "#myCart", function( event, ui ) {
	$.ajax({
		url : "http://localhost:3412/DB-Project/products",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.products;		// ADD var bidProductList = data.bidProduct;
			
			var len = productList.length;
			var list = $("#products-list");
			list.empty();
			var product;
			
			for (var i=0; i < len; ++i){
				product = productList[i];
				
				list.append("<li><a onclick=GetProduct(" + product.productID + ")>" + 
					"<img src= " +  product.productPhoto + "/>" +			// imgSrc ---- productPhoto
					"<p><i><b>" + product.productName +  "</b></i></p>" +
					"<p>_</p>" +
					"<p> Brand: " + product.brand  + "</p>" +
					"<p> Model: " + product.model + "</p>" + 
					"<p> Dimensions: " + product.dimensions + "</p>" +
					"<p> Description: " + product.productDesc + "</p>" +
					"<p class=\"ui-li-aside\"> Instant Price: " + accounting.formatMoney(product.productPrice) + "</p>" +		
					"<p class=\"ui-li-aside\">" + "_" + "</p>" +
					"<p class=\"ui-li-aside\"> Bid Price: " + accounting.formatMoney(product.bidStartingPrice) + "</p>" +		//CHECK BID PRODUCT TABLE
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
$(document).on('pagebeforeshow', "#MyCart", function( event, ui ) {
        console.log("Jose");
        $.ajax({
                url : "http://localhost:3412/DB-Project/carts",
                method: 'get',
                contentType: "application/json",
                dataType:"json",
                success : function(data, textStatus, jqXHR){
                	Popup("seses");
                	var cartList = data.carts;
        			var len = cartList.length;
                        var list = $("#carts-list");
                        list.empty();
            			var cart;
            			for (var i=0; i < len; ++i){
            				cart = cartList[i];
            				//if(cart.userID == currentUserID){
            				GetCartInfo(cart.userID);
                                list.append("<li>" +
                                "<h2>" + "Product: " + currentCart.productName + "</h2>" +
                                "<h2>" + "Product Price: " + currentCart.productPrice  + "</h2>" +
                                "<h2>" + "Seller: " +  currentSeller.userNickname + "</h2>" + "</li>");
            				//}
            			}
            			list.listview("refresh");	
            		},
                	else{
                		Popup("You are not signed in");
                		$.mobile.navigate("#home");
                	}
        },
                error: function(data, textStatus, jqXHR){
                        console.log("textStatus: " + textStatus);
                        Popup("Data not found!");
                }
        });
});



$(document).on('pagebeforeshow', "#account-view", function( event, ui ) {
        // currentCar has been set at this point
        $("#upd-userName").val(currentAccount.userName);
        $("#upd-userNickname").val(currentAccount.userNickname);
        $("#upd-password").val(currentAccount.password);
        $("#upd-userEmail").val(currentAccount.userEmail);      
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

var currentCart = {};

function GetCartInfo(id){
        $.mobile.loading("show");
        $.ajax({
                url : "http://localhost:3412/DB-Project/carts/" + id,
                method: 'get',
                contentType: "application/json",
                dataType:"json",
                success : function(data, textStatus, jqXHR){
                	Popup("APUUPUU");
                        currentCart = convert(data.cart);
                        GetProductInfo(currentCart.productID);
                        GetProductSeller(currentCart.productID);
                        $.mobile.loading("hide");
                        $.mobile.navigate("#carts");
                },
                error: function(data, textStatus, jqXHR){
                        console.log("textStatus: " + textStatus);
                        $.mobile.loading("hide");
                        if (data.status == 404){
                                Popup("Cart not found.");
                        }
                        else {
                                Popup("Internal Server Error.");
                        }
                }
        });
}


var currentSeller = {};

function GetProductSeller(id){
        $.mobile.loading("show");
        $.ajax({
                url : "http://localhost:3412/DB-Project/sells/" + id,
                method: 'get',
                contentType: "application/json",
                dataType:"json",
                success : function(data, textStatus, jqXHR){
                        currentSeller = data.sell;
                        $.mobile.loading("hide");
                        $.mobile.navigate("#carts");
                },
                error: function(data, textStatus, jqXHR){
                        console.log("textStatus: " + textStatus);
                        $.mobile.loading("hide");
                        if (data.status == 404){
                                Popup("Seller not found.");
                        }
                        else {
                                Popup("Internal Server Error.");
                        }
                }
        });
}


