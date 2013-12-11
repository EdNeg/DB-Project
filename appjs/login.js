$(function(){
  $("input[type='checkbox']").change(function(){
  var item=$(this);    
  if(item.is(":checked"))
  {
    window.location.href= item.data("target");
  }    
 });
});

//LOGIN USER NAME & PASSWORD
function pasuser(form) {
	if (form.id.value=="JavaScript") { 
		if (form.pass.value=="Kit") {              
			location.href="Regular_User.html";
		} else {
			alert("Invalid Password");
		}
	} else {  alert("Invalid UserID");
	}
}


//ANOTHER LOGIN USER NAME & PASSWORD
function validate() {
	var un = document.usrpass.username.value;
	var pw = document.usrpass.pass.value;
	var valid = false;
	
	var unArray = ["Philip", "George", "Sarah", "Michael"];  // as many as you like - no comma after final entry
	var pwArray = ["Password1", "Password2", "Password3", "Password4"];  // the corresponding passwords;
	
	for (var i=0; i <unArray.length; i++) {
		if ((un == unArray[i]) && (pw == pwArray[i])) {
			valid = true;
			break;
		}
	}
	
	if (valid) {
		alert ("Login was successful");
		window.location = "http://www.google.com";
		return false;
	}
	else{
		alert("Invalid User Name or Password");
	}
}