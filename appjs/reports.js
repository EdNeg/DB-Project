/**
 * @author owner
 */

$(document).on('pagebeforeshow', "#reports", function( event, ui ) {
	$.ajax({
		url : "http://localhost:3412/DB-Project/salesDays/" ,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var daysList = data.salesDays;
			var len = daysList.length;
			//var list = $("#saleDayOption");
			var list2 = $("#saleDayProductOption");
			var list3 = $("#revenueDayProductOption"); 
			var tempStr; 
			var day;
			var monthNames = [ "", "January", "February", "March", "April", "May", "June",
    							"July", "August", "September", "October", "November", "December" ];
			//list.empty();
			list2.empty();
			list3.empty(); 
			for (var i=0; i < len; ++i){
				day = daysList[i];  
				if(i!=0){	
					tempStr = '<option value="' + day.paidDate + '">' + monthNames[day.month] + 
						" "+day.day + ", " + day.year + '</option> '; 
					//list.append(tempStr);
					list2.append(tempStr);
					list3.append(tempStr);  
				}	
				else{	
					tempStr = '<option value="' + day.paidDate + '" selected>' + monthNames[day.month] + 
						" "+day.day + ", " + day.year   + '</option> '; 
					//list.append(tempStr);
					list2.append(tempStr);
					list3.append(tempStr);  
				}
			}
			list.listview("refresh");
			 alert("encontre los dias "+len);
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.navigate("#home");
			alert("Days not found!");
			
		}
	});
	$.ajax({
		url : "http://localhost:3412/DB-Project/salesWeeks/" ,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var weeksList = data.salesWeeks;
			var len = weeksList.length;
			//var list10 = $("#saleWeekOption");
			var list11 = $("#saleWeekProductOption");
			var list12 = $("#revenueWeekProductOption"); 
			var tempStr; 
			var week;
			var monthNames = [ "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    							"Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
			//list10.empty();
			list11.empty();
			list12.empty(); 
			for (var i=0; i < len; ++i){
				week = weeksList[i];  
				if(i!=0){	
					tempStr = '<option value="' + week.paidDate + '">' + monthNames[week.sMonth] + 
						" "+week.sDay + ", " + week.sYear   +" - " + monthNames[week.eMonth] + 
						" "+week.eDay + ", " + week.eYear   + '</option> '; 
					//list10.append(tempStr);
					list11.append(tempStr);
					list12.append(tempStr);  
				}	
				else{	
					tempStr = '<option value="' + week.paidDate + '" selected>' + monthNames[week.sMonth] + 
						" "+week.sDay + ", " + week.sYear   +" - " + monthNames[week.eMonth] + 
						" "+week.eDay + ", " + week.eYear   +'</option> '; 
					//list10.append(tempStr);
					list11.append(tempStr);
					list12.append(tempStr);  
				}
			}
			list.listview("refresh"); 
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.navigate("#home");
			alert("Weeks not found!");
			
		}
	});
	$.ajax({
		url : "http://localhost:3412/DB-Project/salesMonths/" ,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var monthList = data.salesMonths;
			var len = monthList.length; 
			//var list4 = $("#saleMonthOption");
			var list5 = $("#saleMonthProductOption");
			var list6 = $("#revenueMonthProductOption"); 
			var tempStr; 
			var month;
			var monthNames = [ "","January", "February", "March", "April", "May", "June",
    							"July", "August", "September", "October", "November", "December" ]; 
			//list4.empty();
			list5.empty();
			list6.empty(); 
			for (var i=0; i < len; ++i){
				month = monthList[i];  
				if(i!=0){ 
					tempStr = '<option value="' + month.month+' ' + month.year+ '">' + monthNames[month.month] + 
						" " + month.year  + '</option> '; 
					//list4.append(tempStr);
					list5.append(tempStr);
					list6.append(tempStr); 
				}	
				else{	 
					tempStr = '<option value="' + month.month+' ' + month.year+'" selected>' + monthNames[month.month] + 
						" " + month.year  + '</option> '; 
					//list4.append(tempStr);
					list5.append(tempStr);
					list6.append(tempStr); 
				}
			}
			list.listview("refresh"); 
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.navigate("#home");
			alert("Months not found!");
			
		}
	});
	$.ajax({
		url : "http://localhost:3412/DB-Project/salesYears/" ,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var yearList = data.salesYears;
			var len = yearList.length; 
			//var list7 = $("#saleYearOption");
			var list8 = $("#saleYearProductOption");
			var list9 = $("#revenueYearProductOption");
			var tempStr; 
			var year; 
			//list7.empty();
			list8.empty();
			list9.empty(); 
			for (var i=0; i < len; ++i){
				year = yearList[i];  
				if(i!=0){ 
					tempStr = '<option value="' + year.year + '">' + year.year  + '</option> '; 
					//list7.append(tempStr);
					list8.append(tempStr);
					list9.append(tempStr);
				}	
				else{	 
					tempStr = '<option value="' + year.year + '" selected>' + year.year  + '</option> '; 
					//list7.append(tempStr);
					list8.append(tempStr);
					list9.append(tempStr);
				}
			}
			list.listview("refresh"); 
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			$.mobile.navigate("#home");
			alert("Years not found!");
			
		}
	});
});


$(document).on('pagebeforeshow', "#weekSalesProduct", function( event, ui ) {
	$.ajax({
		url : "http://localhost:3412/DB-Project/saleWeekProduct/" + $('#saleWeekProductOption').val(),
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.products;		
			var len = productList.length;
			var product;  
			var list = $("#weeklyProductSales");
			$("#weeklyProductSalesTitle").empty();
			$("#weeklyProductSalesTitle").append("Total sales by week: "+$("#saleWeekProductOption option:selected").text()); 
			list.empty();
			list.append('<div class="ui-block-a" style="background-color: lightgray; border: 2px solid black;'+ 
						'height: 25px; font-weight: bold; text-align: center; padding: 2px;"><span>Product</span></div>'+
						'<div class="ui-block-b" style="background-color: lightgray; border: 2px solid black;' +
						'height: 25px; font-weight: bold; text-align: center; padding: 2px;"><span>Sales</span></div>' ); 
			for (var i=0; i < len; ++i){
				product = productList[i]; 
				list.append('<div class="ui-block-a" style="background-color: white;'+
				' border: 1px solid black; height: 22px; text-align: center;'+
				' font-weight: normal;"><span>'+product.name+' </span></div>' );
				list.append('<div class="ui-block-b" style="background-color: white;'+
				' border: 1px solid black; height: 22px; text-align: center;'+
				' font-weight: normal;"><span>'+accounting.formatMoney(product.amount)+' </span></div>' );
			}
			list.listview("refresh");
							
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Report not found!");
			$.mobile.navigate("#reports"); 
		}
	});
});

$(document).on('pagebeforeshow', "#daySalesProduct", function( event, ui ) {
	$.ajax({
		url : "http://localhost:3412/DB-Project/saleDayProduct/" + $('#saleDayProductOption').val(),
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.products;		
			var len = productList.length;
			var product;  
			var list = $("#daylyProductSales");
			$("#daylyProductSalesTitle").empty();
			$("#daylyProductSalesTitle").append("Total sales by week: "+$("#saleDayProductOption option:selected").text()); 
			list.empty();
			list.append('<div class="ui-block-a" style="background-color: lightgray; border: 2px solid black;'+ 
						'height: 25px; font-weight: bold; text-align: center; padding: 2px;"><span>Product</span></div>'+
						'<div class="ui-block-b" style="background-color: lightgray; border: 2px solid black;' +
						'height: 25px; font-weight: bold; text-align: center; padding: 2px;"><span>Sales</span></div>' ); 
			for (var i=0; i < len; ++i){
				product = productList[i]; 
				list.append('<div class="ui-block-a" style="background-color: white;'+
				' border: 1px solid black; height: 22px; text-align: center;'+
				' font-weight: normal;"><span>'+product.name+' </span></div>' );
				list.append('<div class="ui-block-b" style="background-color: white;'+
				' border: 1px solid black; height: 22px; text-align: center;'+
				' font-weight: normal;"><span>'+accounting.formatMoney(product.amount)+' </span></div>' );
			}
			list.listview("refresh");
							
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Report not found!");
			$.mobile.navigate("#reports"); 
		}
	});
});

$(document).on('pagebeforeshow', "#monthSalesProduct", function( event, ui ) {
	$.ajax({
		url : "http://localhost:3412/DB-Project/saleMonthProduct/" + $('#saleMonthProductOption').val(),
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.products;		
			var len = productList.length;
			var product;  
			var list = $("#monthlyProductSales");
			$("#monthlyProductSalesTitle").empty();
			$("#monthlyProductSalesTitle").append("Total sales by month: "+$("#saleMonthProductOption option:selected").text()); 
			list.empty();
			list.append('<div class="ui-block-a" style="background-color: lightgray; border: 2px solid black;'+ 
						'height: 25px; font-weight: bold; text-align: center; padding: 2px;"><span>Product</span></div>'+
						'<div class="ui-block-b" style="background-color: lightgray; border: 2px solid black;' +
						'height: 25px; font-weight: bold; text-align: center; padding: 2px;"><span>Sales</span></div>' ); 
			for (var i=0; i < len; ++i){
				product = productList[i]; 
				list.append('<div class="ui-block-a" style="background-color: white;'+
				' border: 1px solid black; height: 22px; text-align: center;'+
				' font-weight: normal;"><span>'+product.name+' </span></div>' );
				list.append('<div class="ui-block-b" style="background-color: white;'+
				' border: 1px solid black; height: 22px; text-align: center;'+
				' font-weight: normal;"><span>'+accounting.formatMoney(product.amount)+' </span></div>' );
			}
			list.listview("refresh");
							
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Report not found!");
			$.mobile.navigate("#reports"); 
		}
	});
});

$(document).on('pagebeforeshow', "#yearSalesProduct", function( event, ui ) {
	$.ajax({
		url : "http://localhost:3412/DB-Project/saleYearProduct/" + $('#saleYearProductOption').val(),
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.products;		
			var len = productList.length;
			var product;  
			var list = $("#yearlyProductSales");
			$("#yearlyProductSalesTitle").empty();
			$("#yearlyProductSalesTitle").append("Total sales by year: "+$("#saleYearProductOption option:selected").text()); 
			list.empty();
			list.append('<div class="ui-block-a" style="background-color: lightgray; border: 2px solid black;'+ 
						'height: 25px; font-weight: bold; text-align: center; padding: 2px;"><span>Product</span></div>'+
						'<div class="ui-block-b" style="background-color: lightgray; border: 2px solid black;' +
						'height: 25px; font-weight: bold; text-align: center; padding: 2px;"><span>Sales</span></div>' ); 
			for (var i=0; i < len; ++i){
				product = productList[i]; 
				list.append('<div class="ui-block-a" style="background-color: white;'+
				' border: 1px solid black; height: 22px; text-align: center;'+
				' font-weight: normal;"><span>'+product.name+' </span></div>' );
				list.append('<div class="ui-block-b" style="background-color: white;'+
				' border: 1px solid black; height: 22px; text-align: center;'+
				' font-weight: normal;"><span>'+accounting.formatMoney(product.amount)+' </span></div>' );
			}
			list.listview("refresh");
							
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Report not found!");
			$.mobile.navigate("#reports"); 
		}
	});
});

$(document).on('pagebeforeshow', "#weekRevenuesProduct", function( event, ui ) {
	$.ajax({
		url : "http://localhost:3412/DB-Project/revenueWeekProduct/" + $('#revenueWeekProductOption').val(),
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.products;		
			var len = productList.length;
			var product;  
			var list = $("#weeklyProductRevenues");
			$("#weeklyProductRevenuesTitle").empty();
			$("#weeklyProductRevenuesTitle").append("Total Revenues by week: "+$("#revenueWeekProductOption option:selected").text()); 
			list.empty();
			list.append('<div class="ui-block-a" style="background-color: lightgray; border: 2px solid black;'+ 
						'height: 25px; font-weight: bold; text-align: center; padding: 2px;"><span>Product</span></div>'+
						'<div class="ui-block-b" style="background-color: lightgray; border: 2px solid black;' +
						'height: 25px; font-weight: bold; text-align: center; padding: 2px;"><span>Revenues</span></div>' ); 
			for (var i=0; i < len; ++i){
				product = productList[i]; 
				list.append('<div class="ui-block-a" style="background-color: white;'+
				' border: 1px solid black; height: 22px; text-align: center;'+
				' font-weight: normal;"><span>'+product.name+' </span></div>' );
				list.append('<div class="ui-block-b" style="background-color: white;'+
				' border: 1px solid black; height: 22px; text-align: center;'+
				' font-weight: normal;"><span>'+accounting.formatMoney(product.amount)+' </span></div>' );
			}
			list.listview("refresh");
							
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Report not found!");
			$.mobile.navigate("#reports"); 
		}
	});
});

$(document).on('pagebeforeshow', "#dayRevenuesProduct", function( event, ui ) {
	$.ajax({
		url : "http://localhost:3412/DB-Project/revenueDayProduct/" + $('#revenueDayProductOption').val(),
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.products;		
			var len = productList.length;
			var product;  
			var list = $("#daylyProductRevenues");
			$("#daylyProductRevenuesTitle").empty();
			$("#daylyProductRevenuesTitle").append("Total Revenues by week: "+$("#revenueDayProductOption option:selected").text()); 
			list.empty();
			list.append('<div class="ui-block-a" style="background-color: lightgray; border: 2px solid black;'+ 
						'height: 25px; font-weight: bold; text-align: center; padding: 2px;"><span>Product</span></div>'+
						'<div class="ui-block-b" style="background-color: lightgray; border: 2px solid black;' +
						'height: 25px; font-weight: bold; text-align: center; padding: 2px;"><span>Revenues</span></div>' ); 
			for (var i=0; i < len; ++i){
				product = productList[i]; 
				list.append('<div class="ui-block-a" style="background-color: white;'+
				' border: 1px solid black; height: 22px; text-align: center;'+
				' font-weight: normal;"><span>'+product.name+' </span></div>' );
				list.append('<div class="ui-block-b" style="background-color: white;'+
				' border: 1px solid black; height: 22px; text-align: center;'+
				' font-weight: normal;"><span>'+accounting.formatMoney(product.amount)+' </span></div>' );
			}
			list.listview("refresh");
							
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Report not found!");
			$.mobile.navigate("#reports"); 
		}
	});
});

$(document).on('pagebeforeshow', "#monthRevenuesProduct", function( event, ui ) {
	$.ajax({
		url : "http://localhost:3412/DB-Project/revenueMonthProduct/" + $('#revenueMonthProductOption').val(),
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.products;		
			var len = productList.length;
			var product;  
			var list = $("#monthlyProductRevenues");
			$("#monthlyProductRevenuesTitle").empty();
			$("#monthlyProductRevenuesTitle").append("Total Revenues by month: "+$("#revenueMonthProductOption option:selected").text()); 
			list.empty();
			list.append('<div class="ui-block-a" style="background-color: lightgray; border: 2px solid black;'+ 
						'height: 25px; font-weight: bold; text-align: center; padding: 2px;"><span>Product</span></div>'+
						'<div class="ui-block-b" style="background-color: lightgray; border: 2px solid black;' +
						'height: 25px; font-weight: bold; text-align: center; padding: 2px;"><span>Revenues</span></div>' ); 
			for (var i=0; i < len; ++i){
				product = productList[i]; 
				list.append('<div class="ui-block-a" style="background-color: white;'+
				' border: 1px solid black; height: 22px; text-align: center;'+
				' font-weight: normal;"><span>'+product.name+' </span></div>' );
				list.append('<div class="ui-block-b" style="background-color: white;'+
				' border: 1px solid black; height: 22px; text-align: center;'+
				' font-weight: normal;"><span>'+accounting.formatMoney(product.amount)+' </span></div>' );
			}
			list.listview("refresh");
							
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Report not found!");
			$.mobile.navigate("#reports"); 
		}
	});
});

$(document).on('pagebeforeshow', "#yearRevenuesProduct", function( event, ui ) {
	$.ajax({
		url : "http://localhost:3412/DB-Project/revenueYearProduct/" + $('#revenueYearProductOption').val(),
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.products;		
			var len = productList.length;
			var product;  
			var list = $("#yearlyProductRevenues");
			$("#yearlyProductRevenuesTitle").empty();
			$("#yearlyProductRevenuesTitle").append("Total Revenues by year: "+$("#revenueYearProductOption option:selected").text()); 
			list.empty();
			list.append('<div class="ui-block-a" style="background-color: lightgray; border: 2px solid black;'+ 
						'height: 25px; font-weight: bold; text-align: center; padding: 2px;"><span>Product</span></div>'+
						'<div class="ui-block-b" style="background-color: lightgray; border: 2px solid black;' +
						'height: 25px; font-weight: bold; text-align: center; padding: 2px;"><span>Revenues</span></div>' ); 
			for (var i=0; i < len; ++i){
				product = productList[i]; 
				list.append('<div class="ui-block-a" style="background-color: white;'+
				' border: 1px solid black; height: 22px; text-align: center;'+
				' font-weight: normal;"><span>'+product.name+' </span></div>' );
				list.append('<div class="ui-block-b" style="background-color: white;'+
				' border: 1px solid black; height: 22px; text-align: center;'+
				' font-weight: normal;"><span>'+accounting.formatMoney(product.amount)+' </span></div>' );
			}
			list.listview("refresh");
							
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Report not found!");
			$.mobile.navigate("#reports"); 
		}
	});
});


$(document).on('pagebeforeshow', "#weekSales", function( event, ui ) {
	$.ajax({
		url : "http://localhost:3412/DB-Project/saleWeek/" ,
		method: 'get',
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.products;		
			var len = productList.length;
			var product;  
			var list = $("#weeklySales"); 
			list.empty();
			list.append('<div class="ui-block-a" style="background-color: lightgray; border: 2px solid black;'+ 
						'height: 25px; font-weight: bold; text-align: center; padding: 2px;"><span>Week</span></div>'+
						'<div class="ui-block-b" style="background-color: lightgray; border: 2px solid black;' +
						'height: 25px; font-weight: bold; text-align: center; padding: 2px;"><span>Sales</span></div>' ); 
			for (var i=0; i < len; ++i){
				product = productList[i]; 
				list.append('<div class="ui-block-a" style="background-color: white;'+
				' border: 1px solid black; height: 22px; text-align: center;'+
				' font-weight: normal;"><span>'+product.name+' </span></div>' );
				list.append('<div class="ui-block-b" style="background-color: white;'+
				' border: 1px solid black; height: 22px; text-align: center;'+
				' font-weight: normal;"><span>'+accounting.formatMoney(product.amount)+' </span></div>' );
			}
			list.listview("refresh");
							
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Report not found!");
			$.mobile.navigate("#reports"); 
		}
	});
});

$(document).on('pagebeforeshow', "#daySales", function( event, ui ) {
	$.ajax({
		url : "http://localhost:3412/DB-Project/saleDay/" ,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.products;		
			var len = productList.length;
			var product;  
			var list = $("#daylySales"); 
			list.empty();
			list.append('<div class="ui-block-a" style="background-color: lightgray; border: 2px solid black;'+ 
						'height: 25px; font-weight: bold; text-align: center; padding: 2px;"><span>Day</span></div>'+
						'<div class="ui-block-b" style="background-color: lightgray; border: 2px solid black;' +
						'height: 25px; font-weight: bold; text-align: center; padding: 2px;"><span>Sales</span></div>' ); 
			for (var i=0; i < len; ++i){
				product = productList[i]; 
				list.append('<div class="ui-block-a" style="background-color: white;'+
				' border: 1px solid black; height: 22px; text-align: center;'+
				' font-weight: normal;"><span>'+product.name+' </span></div>' );
				list.append('<div class="ui-block-b" style="background-color: white;'+
				' border: 1px solid black; height: 22px; text-align: center;'+
				' font-weight: normal;"><span>'+accounting.formatMoney(product.amount)+' </span></div>' );
			}
			list.listview("refresh");
							
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Report not found!");
			$.mobile.navigate("#reports"); 
		}
	});
});

$(document).on('pagebeforeshow', "#monthSales", function( event, ui ) {
	$.ajax({
		url : "http://localhost:3412/DB-Project/saleMonth/"  ,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.products;		
			var len = productList.length;
			var product; 
			var monthNames = [ "", "January", "February", "March", "April", "May", "June",
    							"July", "August", "September", "October", "November", "December" ]; 
			var list = $("#monthlySales"); 
			list.empty();
			list.append('<div class="ui-block-a" style="background-color: lightgray; border: 2px solid black;'+ 
						'height: 25px; font-weight: bold; text-align: center; padding: 2px;"><span>Month</span></div>'+
						'<div class="ui-block-b" style="background-color: lightgray; border: 2px solid black;' +
						'height: 25px; font-weight: bold; text-align: center; padding: 2px;"><span>Sales</span></div>' ); 
			for (var i=0; i < len; ++i){
				product = productList[i]; 
				list.append('<div class="ui-block-a" style="background-color: white;'+
				' border: 1px solid black; height: 22px; text-align: center;'+
				' font-weight: normal;"><span>'+monthNames[product.name]+' </span></div>' );
				list.append('<div class="ui-block-b" style="background-color: white;'+
				' border: 1px solid black; height: 22px; text-align: center;'+
				' font-weight: normal;"><span>'+accounting.formatMoney(product.amount)+' </span></div>' );
			}
			list.listview("refresh");
							
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Report not found!");
			$.mobile.navigate("#reports"); 
		}
	});
});

$(document).on('pagebeforeshow', "#yearSales", function( event, ui ) {
	$.ajax({
		url : "http://localhost:3412/DB-Project/saleYear/" ,
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var productList = data.products;		
			var len = productList.length;
			var product;  
			var list = $("#yearlySales"); 
			list.empty();
			list.append('<div class="ui-block-a" style="background-color: lightgray; border: 2px solid black;'+ 
						'height: 25px; font-weight: bold; text-align: center; padding: 2px;"><span>Year</span></div>'+
						'<div class="ui-block-b" style="background-color: lightgray; border: 2px solid black;' +
						'height: 25px; font-weight: bold; text-align: center; padding: 2px;"><span>Sales</span></div>' ); 
			for (var i=0; i < len; ++i){
				product = productList[i]; 
				list.append('<div class="ui-block-a" style="background-color: white;'+
				' border: 1px solid black; height: 22px; text-align: center;'+
				' font-weight: normal;"><span>'+product.name+' </span></div>' );
				list.append('<div class="ui-block-b" style="background-color: white;'+
				' border: 1px solid black; height: 22px; text-align: center;'+
				' font-weight: normal;"><span>'+accounting.formatMoney(product.amount)+' </span></div>' );
			}
			list.listview("refresh");
							
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Report not found!");
			$.mobile.navigate("#reports"); 
		}
	});
});