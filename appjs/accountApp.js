
$(document).on('pagebeforeshow', "#accounts", function( event, ui ) {
        console.log("Jose");
        $.ajax({
        	url : "http://localhost:3412/DB-Project/accounts/" + loginID.userID,
            method: 'get',
            contentType: "application/json",
            dataType:"json",
                success : function(data, textStatus, jqXHR){
                	    currentAccount = data.account;
                        var list = $("#accounts-list");
                        var list2 = $("#address1-list");
                        list.empty();
                        list2.empty();
                        list.append("<li>" +
                                "<h2>" + "Name: " + currentAccount.userName + "</h2>" +
                                "<h2>" + "Username: " + currentAccount.userNickname  + "</h2>" +
                                "<h2>" + "Password: " +  currentAccount.password + "</h2>" +
                                "<h2>" + "Email: " + currentAccount.userEmail + "</h2>"  + "</li>");
                 
                        list2.append("<li>" +
                                "<h2>" + "Address Line: " + currentAccount.addressLine + "</h2>" +
                                "<h2>" + "City: " + currentAccount.city + "</h2>" +
                                "<h2>" + "State: " + currentAccount.state + "</h2>" +
                                "<h2>" + "Country: " + currentAccount.country + "</h2>" +
                                "<h2>" + "Zipcode: " + currentAccount.zipcode + "</h2>"  + "</li>");
                        list2.listview("refresh");     
          
        },
                error: function(data, textStatus, jqXHR){
                        console.log("textStatus: " + textStatus);
                        alert("Account not found!");
                }
        });
});


$(document).on('pagebeforeshow', "#invoice", function( event, ui ) {
        console.log("Jose");
        $.ajax({
        	//url : "http://localhost:3412/DB-Project/accounts/" + loginID.userID,
            //method: 'get',
            contentType: "application/json",
            dataType:"json",
                success : function(data, textStatus, jqXHR){
                        var list = $("#invoice-list");
                        list.empty();
                        list.append("<li>" +
                                "<h2>" + "Your Order ID: " + currentOrder.orderID + "</h2>" +
                                "<h2>" + "Date Paid: " + currentAccount.paidDate  + "</h2>" +"</li>");
                        list.listview("refresh");                
        },
                error: function(data, textStatus, jqXHR){
                        console.log("textStatus: " + textStatus);
                        alert("Account not found!");
                }
        });
});

var currentCreditcard = {};

$(document).on('pagebeforeshow', "#creditcards", function( event, ui ) {
        console.log("Jose");
        $.ajax({
        	url : "http://localhost:3412/DB-Project/creditcards/" + loginID.userID,
            method: 'get',
            contentType: "application/json",
            dataType:"json",
                success : function(data, textStatus, jqXHR){
                	 currentCreditcard = data.creditcard;
                        var list = $("#creditcards-list");
                        var list2 = $("#address-list");
                        list.empty();
                        list2.empty();
                        list.append("<li>" +
                                "<h2>" + "CreditCard Number: " + currentCreditcard.creditCardNumber + "</h2>" +
                                "<h2>" + "Owner Name: " + currentCreditcard.creditCardOwner + "</h2>" +
                                "<h2>" + "Security Code: " + currentCreditcard.securityCode + "</h2>" +
                                "<h2>" + "Expiration Date: " + currentCreditcard.expDate + "</h2>" + "</li>");
                        
                        list2.append("<li>" +
                                "<h2>" + "Address Line: " + currentCreditcard.addressLine + "</h2>" +
                                "<h2>" + "City: " + currentCreditcard.city + "</h2>" +
                                "<h2>" + "State: " + currentCreditcard.state + "</h2>" +
                                "<h2>" + "Country: " + currentCreditcard.country + "</h2>" +
                                "<h2>" + "Zipcode: " + currentCreditcard.zipcode + "</h2>"  + "</li>");
                        list2.listview("refresh");                     
        },
                error: function(data, textStatus, jqXHR){
                        console.log("textStatus: " + textStatus);
                        alert("CreditCard not found!");
                }
        });
});



$(document).on('pagebeforeshow', "#productUser", function( event, ui ) {
	$.ajax({
		url : "http://localhost:3412/DB-Project/sells/" + loginID.userID,
        method: 'get',
        contentType: "application/json",
        dataType:"json",
		success : function(data, textStatus, jqXHR){
			var sellList = data.sell;		// ADD var bidProductList = data.bidProduct;
			var len = sellList.length;
			var list = $("#productUser-list");///////////////////////////////////////////////////
			list.empty();
			var products;
			for (var i=0; i < len; ++i){
				products = sellList[i];
					list.append("<li><a onclick=GetProductR(" + products.productID + ")>"  + 

					"<img src= " + products.productPhoto + "/>" +			// imgSrc ---- productPhoto

					"<p><i><b>" + products.productName +  "</b></i></p>" +
					"<p>_</p>" +
					"<p> Brand: " + products.brand  + "</p>" +
					"<p> Model: " + products.model + "</p>" + 
					"<p> Dimensions: " + products.dimensions + "</p>" +
					"<p> Description: " + products.productDesc + "</p>" +
					"<p class=\"ui-li-aside\"> Instant Price: " + accounting.formatMoney(products.productPrice) + "</p>" +		
					"<p class=\"ui-li-aside\">" + "_" + "</p>" +
					"<p class=\"ui-li-aside\"> Bid Price: " + accounting.formatMoney(products.bidStartingPrice) + "</p>" +		//CHECK BID PRODUCT TABLE
					"</a></li>");
				
			}
			
			list.listview("refresh");
							
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("You don't have any items at the moment");
		}
	});
});

$(document).on('pagebeforeshow', "#cartUser", function( event, ui ) {
	$.ajax({
		url : "http://localhost:3412/DB-Project/carts/" + loginID.userID,
        method: 'get',
        contentType: "application/json",
        dataType:"json",
		success : function(data, textStatus, jqXHR){
			var cartList = data.cart;		// ADD var bidProductList = data.bidProduct;
			var len = cartList.length;
			var list = $("#cartUser-list");///////////////////////////////////////////////////
			list.empty();
			var products;
			for (var i=0; i < len; ++i){
				products = cartList[i];
					list.append("<li><a onclick=GetProductR(" + products.productID + ")>" + 

					"<img src= "  + products.productPhoto  +"/>" +			// imgSrc ---- productPhoto

					"<p><i><b>" + products.productName +  "</b></i></p>" +
					"<p>_</p>" +
					"<p> Brand: " + products.brand  + "</p>" +
					"<p> Model: " + products.model + "</p>" + 
					"<p> Dimensions: " + products.dimensions + "</p>" +
					"<p> Description: " + products.productDesc + "</p>" +
					"<p class=\"ui-li-aside\"> Instant Price: " + accounting.formatMoney(products.productPrice) + "</p>" +		
					"<p class=\"ui-li-aside\">" + "_" + "</p>" +
					"<p class=\"ui-li-aside\"> Bid Price: " + accounting.formatMoney(products.bidStartingPrice) + "</p>" +		//CHECK BID PRODUCT TABLE
					"</a></li>");
				
			}
			
			list.listview("refresh");
							
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);

			alert("You don't have any items in the Cart at the moment");

		}
	});
});

var cartList;
function findProduct(){
	var lenu = notuserCart.length;
	for(var i = 0; i<lenu; i++){
		$.ajax({
			url : "http://localhost:3412/DB-Project/notuserCarts/" + notuserCart[i],
	        method: 'get',
	        contentType: "application/json",
	        dataType:"json",
			success : function(data, textStatus, jqXHR){
				 cartList[i] = data.cart;
			},
			error: function(data, textStatus, jqXHR){
				console.log("textStatus: " + textStatus);

				alert("You don't have any items in the Cart at the moment");

			}
		});
		}
	}

$(document).on('pagebeforeshow', "#cartHome", function( event, ui ) {
	$.ajax({
		//url : "http://localhost:3412/DB-Project/notuserCarts/" + notuserCart[i],
        //method: 'get',
        contentType: "application/json",
        dataType:"json",
		success : function(data, textStatus, jqXHR){		// ADD var bidProductList = data.bidProduct;
			var len = cartList.length;
			var list = $("#cartHome-list");///////////////////////////////////////////////////
			list.empty();
			var products;
			for(i=0; i<cartList.length; i++){
			//alert(cartList[i]);
				products = cartList[i];
					list.append("<li><a onclick=GetProductR(" + products.productID + ")>" + 

					"<img src= " +   products.productPhoto +"/>" +			// imgSrc ---- productPhoto

					"<p><i><b>" + products.productName +  "</b></i></p>" +
					"<p>_</p>" +
					"<p> Brand: " + product.brand  + "</p>" +
					"<p> Model: " + products.model + "</p>" + 
					"<p> Dimensions: " + products.dimensions + "</p>" +
					"<p> Description: " + products.productDesc + "</p>" +
					"<p class=\"ui-li-aside\"> Instant Price: " + accounting.formatMoney(products.productPrice) + "</p>" +		
					"<p class=\"ui-li-aside\">" + "_" + "</p>" +
					"<p class=\"ui-li-aside\"> Bid Price: " + accounting.formatMoney(products.bidStartingPrice) + "</p>" +		//CHECK BID PRODUCT TABLE
					"</a></li>");
				
			
			}
			list.listview("refresh");
							
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);

			alert("You don't have any items in the Cart at the moment");

		}
	});
});


$(document).on('pagebeforeshow', "#bidUser", function( event, ui ) {
	$.ajax({
		url : "http://localhost:3412/DB-Project/wbids/" + loginID.userID,
        method: 'get',
        contentType: "application/json",
        dataType:"json",
		success : function(data, textStatus, jqXHR){
			var bidList = data.bid;		// ADD var bidProductList = data.bidProduct;
			var len = bidList.length;
			var list = $("#bidUser-list");///////////////////////////////////////////////////
			list.empty();
			var products;
			for (var i=0; i < len; ++i){
				products = bidList[i];
				list.append("<li><a onclick=GetProductR(" + products.productID + ")>" +  
					"<img src= " +  products.productPhoto + "/>" +			// imgSrc ---- productPhoto
					"<p><i><b>" + products.productName +  "</b></i></p>" +
					"<p>_</p>" +
					"<p> Brand: " + products.brand  + "</p>" +
					"<p> Model: " + products.model + "</p>" + 
					"<p> Dimensions: " + products.dimensions + "</p>" +
					"<p> Description: " + products.productDesc + "</p>" +
					"<p class=\"ui-li-aside\"> Instant Price: " + accounting.formatMoney(products.productPrice) + "</p>" +		
					"<p class=\"ui-li-aside\">" + "_" + "</p>" +
					"<p class=\"ui-li-aside\"> Bid Price: " + accounting.formatMoney(products.bidStartingPrice) + "</p>" +		//CHECK BID PRODUCT TABLE
					"</a></li>");
				
				
			}
			
			list.listview("refresh");
							
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("You have no bids this far");
		}
	});
});
//No quiere precionar el SoldUSer
$(document).on('pagebeforeshow', "#soldUser", function( event, ui ) {
	$.ajax({
		url : "http://localhost:3412/DB-Project/orders/" + loginID.userID,
        method: 'get',
        contentType: "application/json",
        dataType:"json",
		success : function(data, textStatus, jqXHR){
			var orderList = data.order;		// ADD var bidProductList = data.bidProduct;
			var len = orderList.length;
			var list = $("#soldUser-list");///////////////////////////////////////////////////
			list.empty();
			var products;
			for (var i=0; i < len; ++i){
				products = orderList[i];
					list.append("<li><a onclick=GetProductR(" + products.productID + ")>" + 

					"<img src= " +  products.productPhoto  +"/>" +			// imgSrc ---- productPhoto

					"<p><i><b>" + products.productName +  "</b></i></p>" +
					"<p>_</p>" + 
					"<p> Brand: " + products.brand  + "</p>" +
					"<p> Model: " + products.model + "</p>" + 
					"<p> User sold to: " + products.userNickname + "</p>" +
					"<p> Date Purchased: " + products.paidDate + "</p>" +
					"<p class=\"ui-li-aside\">" + "_" + "</p>" +
					"<p class=\"ui-li-aside\"><font color = 'red'> Sold: </font>" + accounting.formatMoney(products.productPrice) + "</p>" +	
					"</a></li>");	

			}
			
			list.listview("refresh");
							
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("You have not sold any items");
		}
	});
});


$(document).on('pagebeforeshow', "#BidforProduct", function( event, ui ) {
	$.ajax({
		url : "http://localhost:3412/DB-Project/abids/" + loginID.userID,
        method: 'get',
        contentType: "application/json",
        dataType:"json",
		success : function(data, textStatus, jqXHR){
			var productBidList = data.bidproduct;		// ADD var bidProductList = data.bidProduct;
			var len = productBidList.length;
			var list = $("#BidforProduct-list");///////////////////////////////////////////////////
			list.empty();
			var products;
			for (var i=0; i < len; ++i){
				products = productBidList[i];
				list.append("<li><a onclick=GetProductR(" + products.productID + ")>" + 
					"<img src= " +  products.productPhoto + "/>" +			// imgSrc ---- productPhoto
					"<p><i><b>" + products.productName +  "</b></i></p>" +
					"<p>_</p>" +
					"<p> Brand: " + products.brand  + "</p>" +
					"<p> Model: " + products.model + "</p>" + 
					"<p> Description: " + products.productDesc + "</p>" +
					"<p> Bidding User: " + products.userNickname + "</p>" +
					"<p class=\"ui-li-aside\"> Bid Amount: " + accounting.formatMoney(products.bidAmount) + "</p>" +
					"<p class=\"ui-li-aside\">" + "_" + "</p>" +	
					"<p class=\"ui-li-aside\"> Bid Date: " + products.bidDate + "</p>" +
					"</li>");	

			}
			
			list.listview("refresh");
							
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("You have no bids this far");
		}
	});
});





$(document).on('pagebeforeshow', "#regular", function( event, ui ) {
// currentUser has been set at this point
document.getElementById("regularUser").innerHTML = loginID.userNickname; 
});

$(document).on('pagebeforeshow', "#adminProfile", function( event, ui ) {
        // currentUser has been set at this point
        var adminName = "Welcome " + currentAccount.adminUserName + "!";
        document.getElementById("currAdmin").innerHTML = adminName; 
});

$(document).on('pagebeforeshow', "#account-view", function( event, ui ) {

        $("#upd-userName").val(loginID.userName);        
        $("#upd-UserNickname").val(loginID.userNickname);
        $("#upd-Password").val(loginID.password);
        $("#upd-userEmail").val(loginID.userEmail); 
        $("#upd-addressLine").val(loginID.addressLine); 
        $("#upd-city").val(loginID.city);
        $("#upd-state").val(loginID.state);
        $("#upd-country").val(loginID.country);
        $("#upd-zipcode").val(loginID.zipcode);
        $("#upd-creditCardNumber").val(loginID.creditCardNumber);
        $("#upd-creditCardOwner").val(loginID.creditCardOwner);
        $("#upd-securityCode").val(loginID.securityCode);
        var myDate = loginID.expDate;
		var newDate=myDate.substring(0, 10); ;
        $("#upd-expDate").val(newDate);
        $("#upd-caddressLine").val(loginID.addressLine);
        $("#upd-ccity").val(loginID.city);
        $("#upd-cstate").val(loginID.state);
        $("#upd-ccountry").val(loginID.country);
        $("#upd-czipcode").val(loginID.zipcode);
});

var currentAccount = {};

/*
$(document).on('pagebeforeshow', "#product-view", function( event, ui ) {
	// currentProduct has been set at this point

	
	//document.getElementById("currPid").innerHTML = currentProduct.id;
	//var brandName = currentProduct.brand + " " + currentProduct.name;
	var productName = currentProduct.productName;
	var startPrice = "Starting Price: " + accounting.formatMoney(currentProduct.bidStartingPrice);		//START PRICE HAS TO BE FROM BID PRODUCT TABLE
	var instPrice = "Buy it Now: " + accounting.formatMoney(currentProduct.productPrice);
	var modelNo = "Model: " + currentProduct.model;
	var dims = "Dimensions: " + currentProduct.dimensions;
	var pid = "Product id: " + currentProduct.productID;
	var brand = "Brand: " + currentProduct.brand;
	//document.getElementById("currBrand-Name").innerHTML = brandName;
	document.getElementById("currName").innerHTML = productName;
	//document.getElementById("currImgSrc").src = currentProduct.imgSrc;
	document.getElementById("currImgSrc").src = currentProduct.productPhoto; 
	document.getElementById("currBidPrice").innerHTML = startPrice;
	document.getElementById("currInstPrice").innerHTML = instPrice;
	document.getElementById("currDescription").innerHTML = currentProduct.productDesc;
	document.getElementById("currModel").innerHTML = modelNo;
	document.getElementById("currDimensions").innerHTML = dims;
	document.getElementById("currId").innerHTML = pid;
	document.getElementById("currBrand").innerHTML = brand;
	//document.getElementById("currTagID").innerHTML = currentProduct.tagID;
	
	

});*/


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


var loginID = 0;
function LogIn(){
	
	document.getElementById("cartHome").id = 'cartUser';
	 $.mobile.loading("show");
     $.ajax({
             
    	 	url : "http://localhost:3412/DB-Project/accounts/" + $('#upd-userNickname').val() +"/"+ $('#upd-password').val(),
             method: 'get',
             contentType: "application/json",
             dataType:"json",
             success : function(data, textStatus, jqXHR){
            	 alert("work?");
                     loginID = data.accountLogin;
                                     $.mobile.loading("hide");
                                     $.mobile.navigate("#regular");          
                     
             },
             error: function(data, textStatus, jqXHR){
            	 alert("work1?");
                     console.log("textStatus: " + textStatus);
                     $.mobile.loading("hide");
                     if (data.status == 404){
                             alert("Invalid username and password!");
                             $.mobile.navigate("#home");  
                     }
                     else {
                             alert("Internal Error.");               
                     }
             }
     });
     
}

function VerifyUserCart(){
	if(loginID != 0){
		$.mobile.loading("hide");
        $.mobile.navigate("#cartUser");
	}
	else{
		alert("Please Log In or Register");
	}

}

function VerifyProfile(){
	if(loginID != 0){
		$.mobile.loading("hide");
        $.mobile.navigate("#Account");
	}
	else{
		alert("Please Log In or Register");
		 $.mobile.navigate("#signin");
	}

}

 


function VerifyAdmin(){
        $.mobile.loading("show");
        $.ajax({
             
    	 	url : "http://localhost:3412/DB-Project/accountAdmin/" + $('#upd-userNickname').val() +"/"+ $('#upd-password').val(),
             method: 'get',
             contentType: "application/json",
             dataType:"json",
             success : function(data, textStatus, jqXHR){
             	currentAccount = data.accountAdmin;
                     $.mobile.loading("hide");
                     $.mobile.navigate("#adminProfile");   
                            
                     
             },
             error: function(data, textStatus, jqXHR){
                     console.log("textStatus: " + textStatus);
                     $.mobile.loading("hide");
                     if (data.status == 404){
                             alert("Invalid username and password!");
                             $.mobile.navigate("#home");  
                     }
                     else {
                             alert("Internal Error.");               
                     }
             }
     });
        
}


		
function SaveAccount(){
	$.mobile.loading("show");
	var form = $("#account-form");
	var formData = form.serializeArray();
	console.log("form Data: " + formData);
	var newAccount = ConverToJSON(formData);
	console.log("New Account form: " + JSON.stringify(newAccount));
	var newAccountJSON = JSON.stringify(newAccount);
	
	var form2 = $("#account-form2");
	var formData2 = form2.serializeArray();
	console.log("form Data: " + formData2);
	var newAccount2 = ConverToJSON(formData2);
	console.log("New Account form: " + JSON.stringify(newAccount2));
	var newAccountJSON2 = JSON.stringify(newAccount2);

	
	$.ajax({
		url : "http://localhost:3412/DB-Project/accounts",
		method: 'post',
		data : newAccountJSON, newAccountJSON2,
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#accounts");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			alert("Data could not be added!");
		}
	});


}


function SaveProductUser(){
	$.mobile.loading("show");
	var form = $("#product-form");
	var formData = form.serializeArray();
	console.log("form Data: " + formData);
	var newProduct = ConverToJSON(formData);
	console.log("New Product: " + JSON.stringify(newProduct));
	var newProductJSON = JSON.stringify(newProduct);
	$.ajax({
		url : "http://localhost:3412/DB-Project/products/" + loginID.userID + "/" + selection,
		method: 'post',
		data : newProductJSON,
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			$.mobile.navigate("#productUser");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			alert("Data could not be added!");
		}
	});


}

function validateBid()
{
var x=document.forms["placeBid-form"]["bidAmount"].value;
if (x==null || x=="")
  {
  alert("Bid Amount must be filled out");
  return false;
  }
}

function PlaceBid(){
	if(loginID == 0){
		alert("You must be logged In!");
		$.mobile.navigate("#home");
	}
	else{
	$.mobile.loading("show");
	var form = $("#placeBid-form");
	var formData = form.serializeArray();
	console.log("form Data: " + formData);
	var newPlaceBid = ConverToJSON(formData);
	console.log("New Place Bid: " + JSON.stringify(newPlaceBid));
	var newPlaceBidJSON = JSON.stringify(newPlaceBid);
	$.ajax({
		url : "http://localhost:3412/DB-Project/placebids/" + loginID.userID + "/" + bidProductID + "/" + bidstartingPrice + "/" + startdate + "/" + enddate,
		method: 'post',
		dataType: "jsonp",
        jsonpCallback: "_testbid",
        cache: false,
        timeout: 5000,
		data : newPlaceBidJSON,
		contentType: "application/json",
		//Cambie esto -->dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			if(data!=0 || data != null){
			$("#placeBid").append(data);
			$.mobile.navigate("#placeBid");
			}
			else{
			alert("You have succesfully placed a bid!");
			$.mobile.navigate("#categories");
			}
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			alert("Bid not found");
		}
	});
	}


}

var currentOrder = {};
function PlaceOrder(){
	if(loginID == 0){
		alert("You must be logged In!");
		$.mobile.navigate("#home");
	}
	else{
	$.mobile.loading("show");
	var lenu = notuserCart.length;
	for(var i = 0; i<lenu; i++){
	$.ajax({
		url : "http://localhost:3412/DB-Project/insertProducts/" + loginID.userID + "/" + notuserCart[i],
		method: 'post',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			alert("Product could not be added");
		}
	});
	}
	$.ajax({
		url : "http://localhost:3412/DB-Project/placeOrder/" + loginID.userID + "/" + currentCreditcard.creditCardID + "/" + currentCreditcard.bankAccountID,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			currentOrder = data.order;
			$.mobile.navigate("#invoice");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			alert("Product could not be added");
		}
	});
	}
	


}


var notuserCart = [];
var b = 0;
function AddToCart(){
	notuserCart[b++]= bidProductID;
	alert("You have succesfully added a product!");
	$.mobile.navigate("#categories");
}



function UpdateAccount(){
        $.mobile.loading("show");
        var form = $("#account-view-form");
        var formData = form.serializeArray();
        console.log("form Data: " + formData);
        var updAccount = ConverToJSON(formData);
        console.log("Updated Account: " + JSON.stringify(updAccount));
        var updAccountJSON = JSON.stringify(updAccount);
        $.ajax({
                url : "http://localhost:3412/DB-Project/accountsUpdate/" +  loginID.userID + "/" + loginID.creditCardID + "/" + loginID.addressID,
                method: 'put',
                data : updAccountJSON,
                contentType: "application/json",
                dataType:"json",
                success : function(data, textStatus, jqXHR){
                        $.mobile.loading("hide");
                        $.mobile.navigate("#regular");
                        alert("You have successfully edited your Account");
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


function UpdateUserAccountByAdmin(){
        $.mobile.loading("show");
        var form = $("#account-view-form-admin");
        var formData = form.serializeArray();
        console.log("form Data: " + formData);
        var updAccount = ConverToJSON(formData);
        console.log("Updated Account: " + JSON.stringify(updAccount));
        var updAccountJSON = JSON.stringify(updAccount);
        $.ajax({
                url : "http://localhost:3412/DB-Project/accountsUpdate/" +  currentUser.userID + "/" + currentUser.creditCardID + "/" + currentUser.addressID,
                method: 'put',
                data : updAccountJSON,
                contentType: "application/json",
                dataType:"json",
                success : function(data, textStatus, jqXHR){
                        $.mobile.loading("hide");
                        $.mobile.navigate("#AccountByAdmin");
                        alert("You have successfully edited your Account");
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


function UpdateAccountAdmin(){
	//alert("You have edited your account!");
	$.mobile.navigate("#adminProfile");
        $.mobile.loading("show");
        var form = $("#account-view-form2");
        var formData = form.serializeArray();
        console.log("form Data: " + formData);
        var updAccount = ConverToJSON(formData);
        updAccount.id = currentAccount.id;
        console.log("Updated Account: " + JSON.stringify(updAccount));
        var updAccountJSON = JSON.stringify(updAccount);
        $.ajax({
               url : "http://localhost:3412/DB-Project/accounts/" + updAccount.id,
               method: 'put',
               data : updAccountJSON,
               contentType: "application/json",
                dataType:"json",
                success : function(data, textStatus, jqXHR){
                       currentAccount = data.account;
                       $.mobile.loading("hide");
                       $.mobile.navigate("#adminProfile");
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


function DeleteAccount(){
        $.mobile.loading("show");
        var id = currentAccount.id;
        $.ajax({
                url : "http://localhost:3412/DB-Project/accounts/" + id,
                method: 'delete',
                contentType: "application/json",
                dataType:"json",
                success : function(data, textStatus, jqXHR){
                        $.mobile.loading("hide");
                        $.mobile.navigate("#accounts");
                },
                error: function(data, textStatus, jqXHR){
                        console.log("textStatus: " + textStatus);
                        $.mobile.loading("hide");
                        if (data.status == 404){
                                alert("Account not found.");
                        }
                        else {
                                alter("Internal Server Error.");
                        }
                }
        });
}



var currentAddress = {};

function GetAddressUser(id){
        $.mobile.loading("show");
        $.ajax({
                url : "http://localhost:3412/DB-Project/addressinfos/" + id,
                method: 'get',
                contentType: "application/json",
                dataType:"json",
                success : function(data, textStatus, jqXHR){
                        currentAddress = data.addressinfo;
                        $.mobile.loading("hide");
                        $.mobile.navigate("#accounts");
                },
                error: function(data, textStatus, jqXHR){
                        console.log("textStatus: " + textStatus);
                        $.mobile.loading("hide");
                        if (data.status == 404){
                                alert("Creditcard not found.");
                        }
                        else {
                                alter("Internal Server Error.");
                        }
                }
        });
}

var currentSell = {};

function GetSellbyUser(id){
        $.mobile.loading("show");
        $.ajax({
                url : "http://localhost:3412/DB-Project/sells/" + id,
                method: 'get',
                contentType: "application/json",
                dataType:"json",
                success : function(data, textStatus, jqXHR){
                        currentSell = data.sell;
                        	alert(currentSell.productName);
                          $.mobile.loading("hide");
                        $.mobile.navigate("#productUser");
                     
                },
                error: function(data, textStatus, jqXHR){
                        console.log("textStatus: " + textStatus);
                        $.mobile.loading("hide");
                        if (data.status == 404){
                                alert("Sell not found.");
                        }
                        else {
                                alter("Internal Server Error.");
                        }
                }
        });
}


$(document).on('pagebeforeshow', "#viewUsers", function( event, ui ) {
	$.ajax({
		url : "http://localhost:3412/DB-Project/users/" + $('#searchUser').val(),
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var userList = data.accountByName;		
			var len = userList.length;
			var list = $("#users-list");
			list.empty();
			var user;
			for (var i=0; i < len; ++i){
				user = userList[i];
				
				list.append("<li><a onclick=GetUser(" + user.userID + ")>" + 
					"<p><i><b> Name: </b></i>" + user.userName +  "</p>" +
					"<p>_</p>" +
					"<p><i><b> Nickname: </b></i>" + user.userNickname + "</p>" +
					"<p class=\"ui-li-aside\"><i><b> Email: </b></i>" + user.userEmail + "</p>" +		
					"</a></li>");
			}
			list.listview("refresh");
							
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("User not found!");
			$.mobile.navigate("#searchUserPage");
			
		}
	});
});

$(document).on('pagebeforeshow', "#viewUsers2", function( event, ui ) {
	$.ajax({
		url : "http://localhost:3412/DB-Project/users/" + $('#searchUser2').val(),
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var userList = data.accountByName;		
			var len = userList.length;
			var list = $("#users-list2");
			list.empty();
			var user;
			for (var i=0; i < len; ++i){
				user = userList[i];
				
				list.append('<li><a href="#account-view-admin">' + 
					"<p><i><b> Name: </b></i>" + user.userName +  "</p>" +
					"<p>_</p>" +
					"<p><i><b> Nickname: </b></i>" + user.userNickname + "</p>" +
					"<p class=\"ui-li-aside\"><i><b> Email: </b></i>" + user.userEmail + "</p>" +		
					"</a></li>");
			}
			list.listview("refresh");
							
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("User not found!");
			$.mobile.navigate("#searchUserPage2");
			
		}
	});
});

$(document).on('pagebeforeshow', "#viewAdmins", function( event, ui ) {
	$.ajax({
		url : "http://localhost:3412/DB-Project/accountAdmin",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var adminList = data.accountAdminAll;		
			
			var len = adminList.length;
			var list = $("#admins-list");
			list.empty();
			var admin;
			
			for (var i=0; i < len; ++i){
				admin = adminList[i];
				
				list.append("<li><a>" + 
					"<p><i><b> Name: </b></i>" + admin.adminUserName +  "</p>" +
					"<p>_</p>" +
					"<p><i><b> Id: </b></i>" + admin.adminID + "</p>" +
					"<p class=\"ui-li-aside\"><i><b> Password: </b></i>" + admin.adminPassword + "</p>" +		
					"</a></li>");
			}
			list.listview("refresh");
							
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data notu found!");
		}
	});
});

var currentUser = {};

function GetUser(id){
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/DB-Project/accounts/" + id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			//alert("herher");
			 currentUser = data.account;
			 currentCreditcard = data.creditcard;
			
			$.mobile.loading("hide");
			$.mobile.navigate("#AccountByAdmin");
			
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("User not found.");
			}
			else {
				alter("Internal Server Error.");
			}
		}
	});
}

$(document).on('pagebeforeshow', "#AccountByAdmin", function( event, ui ) {
	// currentUser has been set at this point

	var userAccName = "Account of " + currentUser.userName;
	document.getElementById("currAccName").innerHTML = userAccName;
});

$(document).on('pagebeforeshow', "#account-view-admin", function( event, ui ) {

        $("#adm-userName").val(currentUser.userName);        
        $("#adm-UserNickname").val(currentUser.userNickname);
        $("#adm-Password").val(currentUser.password);
        $("#adm-userEmail").val(currentUser.userEmail); 
        $("#adm-addressLine").val(currentUser.addressLine); 
        $("#adm-city").val(currentUser.city);
        $("#adm-state").val(currentUser.state);
        $("#adm-country").val(currentUser.country);
        $("#adm-zipcode").val(currentUser.zipcode);
        $("#adm-creditCardNumber").val(currentUser.creditCardNumber);
        $("#adm-creditCardOwner").val(currentUser.creditCardOwner);
        $("#adm-securityCode").val(currentUser.securityCode);
        var myDate = currentUser.expDate;
		var newDate=myDate.substring(0, 10); ;
        $("#adm-expDate").val(newDate);
        $("#adm-caddressLine").val(currentUser.addressLine);
        $("#adm-ccity").val(currentUser.city);
        $("#adm-cstate").val(currentUser.state);
        $("#adm-ccountry").val(currentUser.country);
        $("#adm-czipcode").val(currentUser.zipcode);
});

$(document).on('pagebeforeshow', "#accounts2", function( event, ui ) {
        console.log("Jose");
        $.ajax({
        	url : "http://localhost:3412/DB-Project/accounts/" + currentUser.userID,
            method: 'get',
            contentType: "application/json",
            dataType:"json",
                success : function(data, textStatus, jqXHR){
                	    currentUser = data.account;
                        var list = $("#userInfo");
                        var list2 = $("#shippingAddress");
                   
                        list.empty();
                        list2.empty();
  
                        list.append("<li>" +
                                "<h2>" + "Name: " + currentUser.userName + "</h2>" +
                                "<h2>" + "Username: " + currentUser.userNickname  + "</h2>" +
                                "<h2>" + "Password: " +  currentUser.password + "</h2>" +
                                "<h2>" + "Email: " + currentUser.userEmail + "</h2>"  + "</li>");
                 
                        list2.append("<li>" +
                                "<h2>" + "Address Line: " + currentUser.addressLine + "</h2>" +
                                "<h2>" + "City: " + currentUser.city + "</h2>" +
                                "<h2>" + "State: " + currentUser.state + "</h2>" +
                                "<h2>" + "Country: " + currentUser.country + "</h2>" +
                                "<h2>" + "Zipcode: " + currentUser.zipcode + "</h2>"  + "</li>");
                        list2.listview("refresh");
        },
                error: function(data, textStatus, jqXHR){
                        console.log("textStatus: " + textStatus);
                        alert("Account not found!");
                }
        });
});

$(document).on('pagebeforeshow', "#accounts2", function( event, ui ) {
        console.log("Jose");
        $.ajax({
        	url : "http://localhost:3412/DB-Project/creditcards/" + currentUser.userID,
            method: 'get',
            contentType: "application/json",
            dataType:"json",
                success : function(data, textStatus, jqXHR){
                	 currentCreditcard = data.creditcard;
                        var list = $("#creditCardInfo");
                        var list2 = $("#billingAddress");
                        list.empty();
                        list2.empty();
                        list.append("<li>" +
                                "<h2>" + "CreditCard Number: " + currentCreditcard.creditCardNumber + "</h2>" +
                                "<h2>" + "Owner Name: " + currentCreditcard.creditCardOwner + "</h2>" +
                                "<h2>" + "Security Code: " + currentCreditcard.securityCode + "</h2>" +
                                "<h2>" + "Expiration Date: " + currentCreditcard.expDate + "</h2>" + "</li>");
                        
                        list2.append("<li>" +
                                "<h2>" + "Address Line: " + currentCreditcard.addressLine + "</h2>" +
                                "<h2>" + "City: " + currentCreditcard.city + "</h2>" +
                                "<h2>" + "State: " + currentCreditcard.state + "</h2>" +
                                "<h2>" + "Country: " + currentCreditcard.country + "</h2>" +
                                "<h2>" + "Zipcode: " + currentCreditcard.zipcode + "</h2>"  + "</li>");
                        list2.listview("refresh");                     
        },
                error: function(data, textStatus, jqXHR){
                        console.log("textStatus: " + textStatus);
                        alert("CreditCard not found!");
                }
        });
});

function SaveAccountByAdmin(){
	$.mobile.loading("show");
	var form = $("#account-form-admin");
	var formData = form.serializeArray();
	console.log("form Data: " + formData);
	var newAccount = ConverToJSON(formData);

	console.log("New Account form: " + JSON.stringify(newAccount));

	var newAccountJSON = JSON.stringify(newAccount);
	$.ajax({
		url : "http://localhost:3412/DB-Project/accounts",
		method: 'post',
		data : newAccountJSON,
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			alert("You have succesfully added a user!");
			$.mobile.navigate("#adminProfile");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			alert("Data could not be added!");
		}
	});


}

$(document).on('pagebeforeshow', "#viewUsersToDelete", function( event, ui ) {
	$.ajax({
		url : "http://localhost:3412/DB-Project/users/" + $('#searchUserToDelete').val(),
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var userList = data.accountByName;		
			var len = userList.length;
			var list = $("#users-list-delete");
			list.empty();
			var user;
			for (var i=0; i < len; ++i){
				user = userList[i];
				
				list.append("<li><a onclick=GetUserToDelete(" + user.userID + ")>" + 
					"<p><i><b> Name: </b></i>" + user.userName +  "</p>" +
					"<p>_</p>" +
					"<p><i><b> Nickname: </b></i>" + user.userNickname + "</p>" +
					"<p class=\"ui-li-aside\"><i><b> Email: </b></i>" + user.userEmail + "</p>" +		
					"</a></li>");
			}
			list.listview("refresh");
							
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("User not found!");
			$.mobile.navigate("#searchUserPageToDelete");
			
		}
	});
});

var delUserID;
function GetUserToDelete(id){
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/DB-Project/accounts/" + id,
		method: 'get',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			//alert("herher");
			 currentUser = data.account;
			 currentCreditcard = data.creditcard;
			 delUserID=id;
			
			$.mobile.loading("hide");
			$.mobile.navigate("#UserToDelete");
			
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			if (data.status == 404){
				alert("User not found.");
			}
			else {
				alter("Internal Server Error.");
			}
		}
	});
}

$(document).on('pagebeforeshow', "#UserToDelete", function( event, ui ) {
// currentUser has been set at this point
var temp = "Are you sure you want to delete account of: " + currentUser.userName + "?";
document.getElementById("userDel").innerHTML = temp;
});


function DeleteUser(){
	$.mobile.loading("show");
	$.ajax({
		url : "http://localhost:3412/DB-Project/accountsDel/" + delUserID,
		method: 'delete',
		contentType: "application/json",
		dataType:"json",
		success : function(data, textStatus, jqXHR){
			$.mobile.loading("hide");
			alert("You have succesfully removed a user!");
			$.mobile.navigate("#adminProfile");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			alert("User could not be removed!");
		}
	});


}