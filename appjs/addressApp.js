$(document).on('pagebeforeshow', "#creditcards", function( event, ui ) {
        console.log("Jose");
        $.ajax({
                url : "http://localhost:3412/DB-Project/addressinfos",
                contentType: "application/json",
                success : function(data, textStatus, jqXHR){
                        var addressList = data.addressinfos;
                        var len = addressList.length;
                        var list = $("#address-list");
                        list.empty();
                        var address;
                        for (var i=0; i < len; ++i){
                                address = addressList[i];
                                if(address.isBilling == "0"){
                                        list.append("<li>" +
                                                        "<h2>" + "Address Line 1: " + address.addressLine1 + "</h2>" +
                                                        "<h2>" + "Last Name: " + address.addressLine2 + "</h2>" +
                                                        "<h2>" + "City: " + address.city + "</h2>" +
                                                        "<h2>" + "State: " + address.state + "</h2>" +
                                                        "<h2>" + "Country: " + address.country + "</h2>" +
                                                        "<h2>" + "Zipcode: " + address.zipcode + "</h2>"  + "</li>");
                                                }
                                else{
                                        aler("There is no mailing address");
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



$(document).on('pagebeforeshow', "#account-view", function( event, ui ) {
        // currentCar has been set at this point
        $("#upd-addressLine1").val(currentAddress.addressLine1);
        $("#upd-addressLine2").val(currentAddress.addressLine2);
        $("#upd-city").val(currentAddress.city);
        $("#upd-state").val(currentAddress.state);
        $("#upd-country").val(currentAddress.country);
        $("#upd-zipcode").val(currentAddress.zipcode);        
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

function VerifyAddress(){
        $.ajax({
                url : "http://localhost:3412/DB-Project/addressinfos/",
                method: 'get',
                contentType: "application/json",
                dataType:"json",
                success : function(data, textStatus, jqXHR){
                        var verifyList = data.addressinfos;
                        var len = verifyList.length;
                        var verify;
                        for (var i=0; i < len; ++i){
                                verify = verifyList[i];
                                if(verify.isBilling == "0"){
                                        currentAddress = verify;
                                        $.mobile.loading("hide");
                                        $.mobile.navigate("#accounts");
                                }
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


function SaveAddress(){
        $.mobile.loading("show");
        var form = $("#address-form");
        var formData = form.serializeArray();
        console.log("form Data: " + formData);
        var newAddress = ConverToJSON(formData);
        console.log("New Address: " + JSON.stringify(newAddress));
        var newAddressJSON = JSON.stringify(newAddress);
        $.ajax({
                url : "http://localhost:3412/DB-Project/addressinfos",
                method: 'post',
                data : newAddressJSON,
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

var currentAddress = {};

function GetAddress(id){
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
                                alert("Address not found.");
                        }
                        else {
                                alter("Internal Server Error.");
                        }
                }
        });
}

function UpdateAddress(){
        $.mobile.loading("show");
        var form = $("#address-view-form");
        var formData = form.serializeArray();
        console.log("form Data: " + formData);
        var updAddress = ConverToJSON(formData);
        updAddress.id = currentAddress.id;
        updAddress.isBilling = currentAddress.isBilling;
        console.log("Updated Address: " + JSON.stringify(updAddress));
        var updAddressJSON = JSON.stringify(updAddress);
        $.ajax({
                url : "http://localhost:3412/DB-Project/addressinfos/" + updAddress.id,
                method: 'put',
                data : updAddressJSON,
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
                                alert("Data could not be updated!");
                        }
                        else {
                                alert("Internal Error Address.");                
                        }
                }
        });
}

function DeleteAddresss(){
        $.mobile.loading("show");
        var id = currentAddress.id;
        $.ajax({
                url : "http://localhost:3412/DB-Project/addressinfos/" + id,
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