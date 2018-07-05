//Add jquery
$(document).ready(function() {
	$.getJSON('users.json', function(data){
    var output = '';

	  $.each(data, function(key, val){
	    output += '<li class="side-nav__item" data-id="' + val._id + '" >';
	    output += '<a href="#" class="side-nav__link"   data-id="' + val._id + '"    >';
			output += '<img src="img/' + val.images + '" alt="User photo" class="side-nav__user-photo" data-id="' + val._id + '" >';
			output += '<div class="side-nav__wrapper" data-id="' + val._id + '" >';
			output += '<span data-id="' + val._id + '" >' + val.name + '</span>';
			output += '<p class="status" data-id="' + val._id + '">'+ val.status +'</p>';	
			output += '</div>';		
	    output += '</li>';
	  });
	  $('.side-nav').html(output);
	});// get JSON	
});


// $('#search').keyup(function(){
//   var searchField = $('#search').val();
//   console.log(searchField);
// 	var myExp = new RegExp(searchField, "i");

// 	$.getJSON('users.json', function(data){
//     var output = '';

// 	  $.each(data, function(key, val){

// 	  if (val.name.search(myExp) !== -1) {
// 	    output += '<li class="side-nav__item">';
// 	    output += '<a href="#" data-id="' + val._id + '" class="side-nav__link">';
// 	    output += '<img src="img/' + val.images + '" alt="User photo" class="side-nav__user-photo">';
//       output += '<span>' + val.name + '</span>';
//       output += '</a>';
// 	    output += '</li>';
// 	    }
// 	  });
// 	  $('.side-nav').html(output);
//   });// get JSON
// });