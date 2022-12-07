function noInput() {
	return $('#multiplicand-bin-value').text().trim().length == 0;
}

function clickMulMethodUtil(elems, clickedElem) {
	const index = elems.indexOf(clickedElem);
	
	$('#algo-name').text(algs[index]);
	$('#algo-name').show();
	$('#algo-value').text(algs[index]);
	
	/* Scroll back to the top. */
	window.scrollTo(0, 0);

	/*
	 * Failure to unbind will result in the repeated triggering of the click event (even with only
	 * a single click) when the user selects the same method again without refreshing the page.
	 */
	unbindClickCallback();

	if (noInput()) {
		noPreviousNextStep();
	} else {
		demoUtilStartAtDesc();
	}
}

/**
 * Starts the demonstration (simulation) at step 0 (that is, the description of the algorithm).
 */
function demoUtilStartAtDesc() {
	switch ($('#algo-value').text()) {
		case algs[0] /* Pencil-and-Paper Method */:
			pencilDemo(
				$('#multiplicand-bin-value').text(),
				$('#multiplier-bin-value').text(),
				parseInt($('#multiplicand-dec-value').text()),
				parseInt($('#multiplier-dec-value').text())
			);

			/* Start at step 0 (description). */
			initStepNumber(0);
			pencilDescription();
			withPreviousAndNextStep();
			noPreviousStep();

			break;

		case algs[1] /* Booth's Algorithm */:
			boothsDemo(
				$('#multiplicand-bin-value').text(),
				$('#multiplier-bin-value').text(),
				parseInt($('#multiplicand-dec-value').text()),
				parseInt($('#multiplier-dec-value').text())
			);

			/* Start at step 0 (description). */
			initStepNumber(0);
			withPreviousAndNextStep();
			noPreviousStep();

			break;

		case algs[2] /* Extended Booth's Algorithm */:
			extendedBoothsDemo(
				$('#multiplicand-bin-value').text(),
				$('#multiplier-bin-value').text(),
				parseInt($('#multiplicand-dec-value').text()),
				parseInt($('#multiplier-dec-value').text())
			);

			/* Start at step 0 (description). */
			initStepNumber(0);
			extendedBoothsDescription();
			withPreviousAndNextStep();
			noPreviousStep();

			break;
		default:
			/* Should not cascade here */
			break;
	}

	if ($('#display-mode-text').text().trim() == 'Show All Steps') {
		showAllSteps();
		window.scrollTo(0, 0);
		$('#playback-control').css('visibility', 'hidden');
		$('#prev-step').css('visibility', 'hidden');
	}
}

/**
 * Changes the display depending on the selected multiplication method when either the name
 * or the icon of the said method is clicked.
 *
 * @param {string} elems List of multiplication methods.
 * @param {string} clickedElem Selected multiplication method.
 */
function clickMulMethod(elems, clickedElem) {
	$('#' + clickedElem + '-text').on('click', function () {
		clickMulMethodUtil(elems, clickedElem);
	});

	$('#' + clickedElem + '-logo').on('click', function () {
		clickMulMethodUtil(elems, clickedElem);
	});
}
