/**
 * File containing the function calls for the behaviors in the header.
 */
function setup(){
	$('.hidden').css('visibility', 'visible');
	$('#step-number-value').hide();
	$('#description').show();
	$('#step').hide();
	$('#next-step').hide();
	$('#prev-step').hide();
	$('#pencil-text').trigger('click');
	$('#save-text').css('cursor', 'not-allowed');
	$('#save-logo').css('cursor', 'not-allowed');
	$('#display-mode-option').trigger('click');
	$('#display-mode-option').trigger('click');
}

$(function () {
	setTimeout(setup, 1000)
	const mulMethods = ['pencil', 'booths', 'extended-booths'];
	for (const mulMethod of mulMethods) {
		clickMulMethod(mulMethods, mulMethod);
	}
	controlDropdown('display-mode');
});
