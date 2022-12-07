/**
 * File containing the function for animating the logo and title at website startup.
 */

/**
 * Animates the logo and title. In particular, this method changes the color of the logo and the title,
 * as well as sets the title to random (hardcoded) binary strings.
 */
function animateTitle() {
	const timer = 100;



	
	setTimeout(function () {
		
		$('#title-text').html('BINARY<span style = "margin-left: 11px;"></span>MULTIPLICATION');
		$('.hidden').css('visibility', 'visible');

		$('#step-number-value').hide();
		$('#description').show();
		$('#step').hide();
		$('#next-step').hide();
		$('#prev-step').hide();

		/* Start at pencil-and-paper method by default. */
		$('#pencil-text').trigger('click');

		/* Disable saving to text file when multiply button is not yet clicked. */
		$('#save-text').css('cursor', 'not-allowed');
		$('#save-logo').css('cursor', 'not-allowed');

		/*
		 * Trigger click of the display mode to fix footer elements.
		 * The click is triggered twice since the default is step-by-step demonstration.
		 */
		$('#display-mode-option').trigger('click');
		$('#display-mode-option').trigger('click');
	}, 9 * timer);
}
