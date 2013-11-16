$(document).on('pagebeforeshow', "#carts", function( event, ui ) {
        console.log("Jose");
        $.ajax({
                url : "http://localhost:3412/DB-Project/carts",
                method: 'get',
                contentType: "application/json",
                dataType:"json",
                success : function(data, textStatus, jqXHR){
                	alert("seses");
                	var cartList = data.carts;
        			var len = cartList.length;
                        var list = $("#carts-list");
                        list.empty();
            			var cart;
            			for (var i=0; i < len; ++i){
            				cart = cartList[i];
            				if(cart.userID == currentUserID){
            				GetCartInfo(cart.userID);
                                list.append("<li>" +
                                "<h2>" + "Product: " + currentProduct.productName + "</h2>" +
                                "<h2>" + "Product Price: " + currentProduct.productPrice  + "</h2>" +
                                "<h2>" + "Seller: " +  currentSeller.userNickname + "</h2>" + "</li>");
            				}
            			}
            			list.listview("refresh");	
            		},
                	else{
                		alert("You are not signed in");
                		$.mobile.navigate("../DB-Project/MainJqueryM.html);
                	}
        },
                error: function(data, textStatus, jqXHR){
                        console.log("textStatus: " + textStatus);
                        alert("Data not found!");
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
                                alert("Cart not found.");
                        }
                        else {
                                alter("Internal Server Error.");
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
                                alert("Seller not found.");
                        }
                        else {
                                alter("Internal Server Error.");
                        }
                }
        });
}


