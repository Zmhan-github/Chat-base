//Add jquery

$('#search').keyup(function(){
  var searchField = $('#search').val();
  console.log(searchField);
	var myExp = new RegExp(searchField, "i");

	$.getJSON('users.json', function(data){
    var output = '';

	  $.each(data, function(key, val){

	  if (val.name.search(myExp) !== -1) {
	    output += '<li class="side-nav__item">';
	    output += '<a href="#" class="side-nav__link">';
	    output += '<img src="img/' + val.images + '" alt="User photo" class="side-nav__user-photo">';
      output += '<span>' + val.name + '</span>';
      output += '</a>';
	    output += '</li>';
	    }
	  });
	  $('.side-nav').html(output);
  });// get JSON
});