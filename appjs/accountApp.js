$(document).on('pagebeforeshow', "#accounts", function( event, ui ) {
        console.log("Jose");
        $.ajax({
                url : "http://localhost:3412/DB-Project/accounts",
                contentType: "application/json",
                success : function(data, textStatus, jqXHR){
                        var list = $("#accounts-list");
                        list.empty();
                        var account;
                                list.append("<li>" +
                                "<h2>" + "Name: " + currentAccount.userName + "</h2>" +
                                "<h2>" + "Username: " + currentAccount.userNickname  + "</h2>" +
                                "<h2>" + "Password: " +  currentAccount.password + "</h2>" +
                                "<h2>" + "Email: " + currentAccount.userEmail + "</h2>"  + "</li>");
                        
                list.listview("refresh");               
        },
                error: function(data, textStatus, jqXHR){
                        console.log("textStatus: " + textStatus);
                        alert("Data not found!");
                }
        });
});

$(document).on('pagebeforeshow', "#accounts", function( event, ui ) {
        console.log("Jose");
        $.ajax({
                //url : "http://localhost:3412/DB-Project/accounts",
                contentType: "application/json",
                success : function(data, textStatus, jqXHR){
                        var list = $("#address-list");
                        list.empty();
                        var account;
                                list.append("<li>" +
                                        "<h2>" + "Address Line: " + currentAddress.addressLine + "</h2>" +
                                        "<h2>" + "City: " + currentAddress.city + "</h2>" +
                                        "<h2>" + "State: " + currentAddress.state + "</h2>" +
                                        "<h2>" + "Country: " + currentAddress.country + "</h2>" +
                                        "<h2>" + "Zipcode: " + currentAddress.zipcode + "</h2>"  + "</li>");
                        
                list.listview("refresh");               
        },
                error: function(data, textStatus, jqXHR){
                        console.log("textStatus: " + textStatus);
                        alert("Data not found!");
                }
        });
});


$(document).on('pagebeforeshow', "#creditcards", function( event, ui ) {
        console.log("Jose");
        $.ajax({
                //url : "http://localhost:3412/DB-Project/creditcards",
                contentType: "application/json",
                success : function(data, textStatus, jqXHR){
                        var list = $("#creditcards-list");
                        list.empty();
                                list.append("<li>" +
                                "<h2>" + "CreditCard Number: " + currentCreditcard.creditCardNumber + "</h2>" +
                                "<h2>" + "Owner Name: " + currentCreditcard.creditCardOwner + "</h2>" +
                                "<h2>" + "Security Code: " + currentCreditcard.securityCode + "</h2>" +
                                "<h2>" + "Expiration Date: " + currentCreditcard.expDate + "</h2>" + "</li>");
                                
                        
                list.listview("refresh");                
        },
                error: function(data, textStatus, jqXHR){
                        console.log("textStatus: " + textStatus);
                        alert("Data not creds found!");
                }
        });
});

$(document).on('pagebeforeshow', "#creditcards", function( event, ui ) {
        console.log("Jose");
        $.ajax({
                //url : "http://localhost:3412/DB-Project/creditcards",
                contentType: "application/json",
                success : function(data, textStatus, jqXHR){
                        var list = $("#address-list");
                        list.empty();
                        list.append("<li>" +
                                        "<h2>" + "Address Line: " + currentCreditcard.addressLine + "</h2>" +
                                        "<h2>" + "City: " + currentCreditcard.city + "</h2>" +
                                        "<h2>" + "State: " + currentCreditcard.state + "</h2>" +
                                        "<h2>" + "Country: " + currentCreditcard.country + "</h2>" +
                                        "<h2>" + "Zipcode: " + currentCreditcard.zipcode + "</h2>"  + "</li>");
                                
                        
                list.listview("refresh");                
        },
                error: function(data, textStatus, jqXHR){
                        console.log("textStatus: " + textStatus);
                        alert("Data not creds found!");
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

 
 
function VerifyUser(){
        $.mobile.loading("show");
        var form = $("#verify-form");
        var formData = form.serializeArray();
        console.log("form Data: " + formData);
        var updAccount = ConverToJSON(formData);
        console.log("Updated Account: " + JSON.stringify(updAccount));
        var updAccountJSON = JSON.stringify(updAccount);
        $.ajax({
                url : "http://localhost:3412/DB-Project/accounts/",
                method: 'get',
                contentType: "application/json",
                dataType:"json",
                success : function(data, textStatus, jqXHR){
                        var verifyList = data.accounts;
                        var len = verifyList.length;
                        var verify;
                        var notFound=0;
                        for (var i=0; i < len; ++i){
                                verify = verifyList[i];
                                if(verify.userNickname == updAccount.userNickname && verify.password == updAccount.password){
                                        currentAccount = verify;
                                        GetCreditcardbyUser(currentAccount.creditCardID);
                                        //GetAddressUser(currentAccount.addressID);
                                        $.mobile.loading("hide");
                                        $.mobile.navigate("../DB-Project/Regular_User.html");
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
        console.log("New Account: " + JSON.stringify(newAccount));
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
                        alert("You have created an account!");
                },
                error: function(data, textStatus, jqXHR){
                        console.log("textStatus: " + textStatus);
                        $.mobile.loading("hide");
                        alert("Data could not be added!");
                }
        });


}

var currentAccount = {};

function GetAccount(id){
        $.mobile.loading("show");
        $.ajax({
                url : "http://localhost:3412/DB-Project/accounts/" + id,
                method: 'get',
                contentType: "application/json",
                dataType:"json",
                success : function(data, textStatus, jqXHR){
                        currentAccount = convert(data.account);
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

function UpdateAccount(){
        $.mobile.loading("show");
        var form = $("#account-view-form");
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
                        $.mobile.navigate("#accounts");
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
var currentCreditcard = {};

function GetCreditcardbyUser(id){
        $.mobile.loading("show");
        $.ajax({
                url : "http://localhost:3412/DB-Project/creditcards/" + id,
                method: 'get',
                contentType: "application/json",
                dataType:"json",
                success : function(data, textStatus, jqXHR){
                        currentCreditcard = data.creditcard;
                        $.mobile.loading("hide");
                        $.mobile.navigate("#creditcards");
                },
                error: function(data, textStatus, jqXHR){
                        console.log("textStatus: " + textStatus);
                        $.mobile.loading("hide");
                        if (data.status == 404){
                                alert("Creditcard not sesese found.");
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
                                alert("Creditcard not sesese found.");
                        }
                        else {
                                alter("Internal Server Error.");
                        }
                }
        });
}
