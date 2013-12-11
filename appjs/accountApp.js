
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


$(document).on('pagebeforeshow', "#creditcards", function( event, ui ) {
        console.log("Jose");
        $.ajax({
        	url : "http://localhost:3412/DB-Project/creditcards/" + loginID.userID,
            method: 'get',
            contentType: "application/json",
            dataType:"json",
                success : function(data, textStatus, jqXHR){
                	var currentCreditcard = data.creditcard;
                        var list = $("#creditcards-list");
                        var list2 = $("#address-list");
                        list.empty();
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
					list.append("<li><a onclick=sold(" + products.productID + ")>"  + 
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
					list.append("<li>" + 
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
			alert("Data not found!");
		}
	});
});

$(document).on('pagebeforeshow', "#bidUser", function( event, ui ) {
	$.ajax({
		url : "http://localhost:3412/DB-Project/bids/" + loginID.userID,
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
					list.append("<li>" + 
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
					list.append("<li>" + 
					"<img src= " +  products.productPhoto + "/>" +			// imgSrc ---- productPhoto
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

$(document).on('pagebeforeshow', "#account-view-form", function( event, ui ) {
        $("#upd-userName").val(currentAccount.userName);
        $("#upd-userNickname").val(currentAccount.userNickname);
        $("#upd-password").val(currentAccount.password);
        $("#upd-userEmail").val(currentAccount.userEmail); 
        $("#upd-addressLine").val(currentAddress.addressLine); 
        $("#upd-city").val(currentAddress.city);
        $("#upd-state").val(currentAddress.state);
        $("#upd-country").val(currentAddress.country);
        $("#upd-zipcode").val(currentAddress.zipcode);
        $("#upd-creditCardNumber").val(currentCreditCard.creditCardNumber);
        $("#upd-creditCardOwner").val(currentCreditCard.creditCardOwner);
        $("#upd-securityCode").val(currentCreditCard.securityCode);
        $("#upd-expDate").val(currentCreditCard.expDate);
        $("#upd-caddressLine").val(currentCreditCard.addressLine);
        $("#upd-ccity").val(currentCreditCard.city);
        $("#upd-cstate").val(currentCreditCard.state);
        $("#upd-ccountry").val(currentCreditCard.country);
        $("#upd-czipcode").val(currentCreditCard.zipcode);

});

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


var loginID = 0;
function LogIn(){
	 $.mobile.loading("show");
     $.ajax({
             url : "http://localhost:3412/DB-Project/accounts/" + $('#upd-userNickname').val() +"/"+ $('#upd-password').val(),
             method: 'get',
             contentType: "application/json",
             dataType:"json",
             success : function(data, textStatus, jqXHR){
                     loginID = data.account;
                                     $.mobile.loading("hide");
                                     $.mobile.navigate("../DB-Project/Regular_User.html");          
                     
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

function VerifyUserCart(){
	if(loginID != 0){
		$.mobile.loading("hide");
        $.mobile.navigate("../DB-Project/View_Cart.html");
	}
	else{
		alert("Please Log In or Register");
	}

}

 


function VerifyAdmin(){
        $.mobile.loading("show");
        var form = $("#verify-form");
        var formData = form.serializeArray();
        console.log("form Data: " + formData);
        var updAccount = ConverToJSON(formData);
        console.log("Updated Account: " + JSON.stringify(updAccount));
        var updAccountJSON = JSON.stringify(updAccount);
        $.ajax({
                url : "http://localhost:3412/DB-Project/accountas/",
                method: 'get',
                contentType: "application/json",
                dataType:"json",
                success : function(data, textStatus, jqXHR){
                        var verifyList = data.accountas;
                        var len = verifyList.length;
                        var verify;
                        var notFound=0;
                        for (var i=0; i < len; ++i){
                                verify = verifyList[i];
                                if(verify.adminUserName == updAccount.userNickname && verify.adminPassword == updAccount.password){
                                        currentAccount = verify;
                                        //currentUserID = currentAccount.userID;
                                        $.mobile.loading("hide");
                                        $.mobile.navigate("#adminProfile");
                                        notFound=1;
                                        break;
                                }
                                 
                                
                        }
                        if(notFound != 1){                       
                       alert("Username and Password Invalid");
                               $.mobile.navigate("#home");
                            }  
                        
                        
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


		
function SaveAccount(){
	$.mobile.loading("show");
	var form = $("#account-form");
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
			$.mobile.navigate("#accounts");
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.loading("hide");
			alert("Data could not be added!");
		}
	});


}


function UpdateAccount(){
	alert("You have edited your account!");
	$.mobile.navigate("../DB-Project/Account.html");
        //$.mobile.loading("show");
        //var form = $("#account-view-form");
        //var formData = form.serializeArray();
        //console.log("form Data: " + formData);
        //var updAccount = ConverToJSON(formData);
        //updAccount.id = currentAccount.id;
        //console.log("Updated Account: " + JSON.stringify(updAccount));
        //var updAccountJSON = JSON.stringify(updAccount);
        //$.ajax({
         //       url : "http://localhost:3412/DB-Project/accounts/" + updAccount.id,
           //     method: 'put',
             //   data : updAccountJSON,
               // contentType: "application/json",
                //dataType:"json",
                //success : function(data, textStatus, jqXHR){
                  //      currentAccount = data.account;
                    //    $.mobile.loading("hide");
                      //  $.mobile.navigate("#accounts");
                //},
                //error: function(data, textStatus, jqXHR){
                  //      console.log("textStatus: " + textStatus);
                    //    $.mobile.loading("hide");
                      //  if (data.status == 404){
                        //        alert("Data could not be updated!");
                       // }
                       // else {
                         //       alert("Internal Error.");               
                        //}
                //}
        //});
}

function UpdateAccount(){
	alert("You have edited your account!");
	$.mobile.navigate("../DB-Project/Account.html");
        //$.mobile.loading("show");
        //var form = $("#account-view-form");
        //var formData = form.serializeArray();
        //console.log("form Data: " + formData);
        //var updAccount = ConverToJSON(formData);
        //updAccount.id = currentAccount.id;
        //console.log("Updated Account: " + JSON.stringify(updAccount));
        //var updAccountJSON = JSON.stringify(updAccount);
        //$.ajax({
         //       url : "http://localhost:3412/DB-Project/accounts/" + updAccount.id,
           //     method: 'put',
             //   data : updAccountJSON,
               // contentType: "application/json",
                //dataType:"json",
                //success : function(data, textStatus, jqXHR){
                  //      currentAccount = data.account;
                    //    $.mobile.loading("hide");
                      //  $.mobile.navigate("#accounts");
                //},
                //error: function(data, textStatus, jqXHR){
                  //      console.log("textStatus: " + textStatus);
                    //    $.mobile.loading("hide");
                      //  if (data.status == 404){
                        //        alert("Data could not be updated!");
                       // }
                       // else {
                         //       alert("Internal Error.");               
                        //}
                //}
        //});
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
		url : "http://localhost:3412/DB-Project/accounts",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var userList = data.accounts;		
			
			var len = userList.length;
			var list = $("#users-list");
			list.empty();
			var user;
			
			for (var i=0; i < len; ++i){
				user = userList[i];
				
				list.append("<li><a>" + 
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
			alert("Data not found!");
		}
	});
});


$(document).on('pagebeforeshow', "#viewAdmins", function( event, ui ) {
	$.ajax({
		url : "http://localhost:3412/DB-Project/accountas",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var adminList = data.accountas;		
			
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
			alert("Data not found!");
		}
	});
});

