$(function(){
  $("input[type='checkbox']").change(function(){
  var item=$(this);    
  if(item.is(":checked"))
  {
    window.location.href= item.data("target");
  }    
 });
});
