$(document).foundation();

jQuery(document).ready(function($) {
	var path = window.location.pathname;
	console.log(path);
	if (path == "/530-Medialab-Test/dist/filter-test.html"){
		$.ajax({
		    url:"assets/functions.php",
		    type:"POST",
		    dataType:"json",
		    success: function(data){
		    	console.log(data);
		    	var productList = "";
		    	var colorList = "";
		    	var categoryList = "";
		    	var colorOptions = [];
		    	var categoryOptions = [];
		    	for (var i = 0; i < data.length; i++) {
		    		productList += '<div class="column color-' + data[i].color + ' category-' + data[i].category + '"><img src="assets/img/' + data[i].image + '" /><h4>' + data[i].name + '</h4><p>$ ' + data[i].price + '</p></div>';
		    		colorOptions.push(data[i].color);
		    		categoryOptions.push(data[i].category);
		    	};
		    	var colors = $.unique(colorOptions);
		    	var categories = $.unique(categoryOptions);
		    	for (var i = 0; i < colors.length; i++) {
		    		colorList += '<option value=".color-' + colors[i] + '">' + colors[i] + '</option>';
		    	};
		    	for (var i = 0; i < categories.length; i++) {
		    		categoryList += '<option value=".category-' + categories[i] + '">' + categories[i] + '</option>';
		    	};
		    	$('#products-row').html(productList);
		    	$('#color').append(colorList);
		    	$('#category').append(categoryList);
		    }
		});

		$('.filter-option').change(function() {
			var selections = [];
			$('.filter-option').each(function(){
				selections.push($(this).val());
			});
			var className = selections.join('');
			console.log(className);
			if(className == ''){
        $('#products-row .column').fadeIn('fast');
      } else {
        var matching_prods = $('#products-row .column').filter(className);
        $('#products-row .column').fadeOut('fast');
      	$(matching_prods).fadeIn('fast', 'swing');
      }
		});

		$('#filter_reset').click(function(e){
      e.preventDefault();
      $('.filter-option').each(function() {
      	$(this).prop('selectedIndex',0);
      });
      $('#products-row .column').fadeIn('fast');
    });
	}
	
});
