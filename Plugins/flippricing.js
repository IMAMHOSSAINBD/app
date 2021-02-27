jQuery(document).ready(function($){
	initPricingControls();
	  //hide the subtle gradient layer (.pricing-list > li::after) when pricing table has been scrolled to the end (mobile version only)
	  checkScrolling($('.pricing-body'));
	  $(window).on('resize', function(){
		  window.requestAnimationFrame(function(){checkScrolling($('.pricing-body'))});
	  });
	  $('.pricing-body').on('scroll', function(){ 
		  var selected = $(this);
		  window.requestAnimationFrame(function(){checkScrolling(selected)});
	  });
  
	  function checkScrolling(tables){
		  tables.each(function(){
			  var table= $(this),
				  totalTableWidth = parseInt(table.children('.pricing-features').width()),
				   tableViewport = parseInt(table.width());
			  if( table.scrollLeft() >= totalTableWidth - tableViewport -1 ) {
				  table.parent('li').addClass('is-ended');
			  } else {
				  table.parent('li').removeClass('is-ended');
			  }
		  });
	  }
  
	  //switch from monthly to annual pricing tables
	  bouncy_filter($('.pricing-container'));
  
	  function bouncy_filter(container) {
		  container.each(function(){
			  var pricing_table = $(this);
			  var filter_list_container = pricing_table.children('.pricing-switcher'),
				  filter_radios = filter_list_container.find('input[type="radio"]'),
				  pricing_table_wrapper = pricing_table.find('.pricing-wrapper');
  
			  //store pricing table items
			  var table_elements = {};
			  filter_radios.each(function(){
				  var filter_type = $(this).val();
				  table_elements[filter_type] = pricing_table_wrapper.find('li[data-type="'+filter_type+'"]');
			  });
  
			  //detect input change event
			  filter_radios.on('change', function(event){
				  event.preventDefault();
				  //detect which radio input item was checked
				  var selected_filter = $(event.target).val();
  
				  //give higher z-index to the pricing table items selected by the radio input
				  show_selected_items(table_elements[selected_filter]);
  
				  //rotate each pricing-wrapper 
				  //at the end of the animation hide the not-selected pricing tables and rotate back the .pricing-wrapper
				  
				  if( !Modernizr.cssanimations ) {
					  hide_not_selected_items(table_elements, selected_filter);
					  pricing_table_wrapper.removeClass('is-switched');
				  } else {
					  pricing_table_wrapper.addClass('is-switched').eq(0).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {		
						  hide_not_selected_items(table_elements, selected_filter);
						  pricing_table_wrapper.removeClass('is-switched');
						  //change rotation direction if .pricing-list has the .bounce-invert class
						  if(pricing_table.find('.pricing-list').hasClass('bounce-invert')) pricing_table_wrapper.toggleClass('reverse-animation');
					  });
				  }
			  });
		  });
	  }
	  function show_selected_items(selected_elements) {
		  selected_elements.addClass('is-selected');
	  }
  
	  function hide_not_selected_items(table_containers, filter) {
		  $.each(table_containers, function(key, value){
				if ( key != filter ) {	
				  $(this).removeClass('is-visible is-selected').addClass('is-hidden');
  
			  } else {
				  $(this).addClass('is-visible').removeClass('is-hidden is-selected');
			  }
		  });
	  }
	
	function initPricingControls() {
	  
	  $('.pricing-control').click(controlPricing);
	}
	
	function controlPricing() {
	  
	  var $el = $(this);
	  var plan = $el.parents('.plan-primary').length ?
		'primary' :
		'superior';
	  
	  var pricingValueQty = $el.hasClass('students') ?
		  50 : 1;
	  
	  var pricingValue = $el.siblings('.pricing-value')[0];
	  
	  if ($el.hasClass('plus')) {
		pricingValue.innerHTML = parseInt(pricingValue.innerHTML) + pricingValueQty;
	  } else {
		pricingValue.innerHTML = parseInt(pricingValue.innerHTML) - pricingValueQty;
	  }
	  
	  setTotalPriceValue(plan);
  
	  if ($el.hasClass('plus')) {
		switchMinusControlVisibility($el, parseInt(pricingValue.innerHTML), pricingValueQty);
	  }
	}
	
	function switchMinusControlVisibility($el, qty, min) {
	  var minus = $el.siblings('.minus')[0];    
	  var visibility = qty > min ? 'visible' : 'hidden';
  console.log(qty, min, visibility);
	  $(minus).css('visibility', visibility);
	}
	
	function setTotalPriceValue(plan) {
	  var base = 15;
	  if (plan === 'superior') {
		base = 20;
	  }
	  
	  var $plan = $('.plan-' + plan);
	  
	  // Get number of schools & students.
	  var students = $plan.find('.pricing-value.students').html();
	  
	  var schools = $plan.find('.pricing-value.schools').html();
	  
	  var units = ( parseInt(students) / 50 ) + (parseInt(schools) - 1);
	  
	  var total = units * base;
	  
	  $plan.find('.price .value').html( total );
	}
  });