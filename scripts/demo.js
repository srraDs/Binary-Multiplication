const algs = [`Pencil and Paper`, `Booth's`, `Extended Booth's`];

$(function () {
	initOps();
});

function initStepNumber(number) {
	$('#step-number-value').text(number);
	$('#step-number').val(number);
}

function incrementstep() {
	$('#step-number-value').text(parseInt($('#step-number-value').text()) + 1);
	$('#step-number').val($('#step-number-value').text());
}

function decrementstep() {
	$('#step-number-value').text(parseInt($('#step-number-value').text()) - 2);
	$('#step-number').val($('#step-number-value').text());
}

function checkMulMethod(mulMethod) {
	return $('#algo-value').text() == mulMethod;
}


function emphasizeProduct(multiplicandBin, multiplierDec, product) {
	let formattedProduct = product;
	let numBits = multiplicandBin.length;

	switch (multiplierDec) {
		case 0:
		case -1:
		case 1:
			formattedProduct = `<span class = "blurred">${product.substring(
				0,
				product.length - numBits
			)}</span><b class = "emphasized no-underline">${product.substring(
				product.length - numBits
			)}</b>`;
			break;
		case -2:
		case 2:
			formattedProduct = `<span class = "blurred">${product.substring(
				0,
				product.length - numBits - 1
			)}</span><b class = "emphasized no-underline">${product.substring(
				product.length - numBits - 1
			)}</b>`;
			break;
		default:
			break;
	}

	return formattedProduct;
}


function hideCarryOver() {
	$('.carry-over b').css('display', 'none');
	$('.carry-over span').css('display', 'none');
}


function formatProductDisplay(product) {
	let productDisplay = []; 
	let productArray = []; 

	/* Isolate the first element (corresponding to the least significant bit of the product). */
	productDisplay.push(`<b class = "emphasized no-underline">${product[product.length - 1]}</b>`);
	productArray.push(product[product.length - 1]);

	for (let i = 1; i < product.length; i++) {
		productDisplay.push(
			`<b class = "emphasized no-underline">${product[product.length - i - 1]}</b>${
				productArray[i - 1]
			}`
		);
		productArray.push(`${product[product.length - i - 1]}${productArray[i - 1]}`);
	}

	return productDisplay;
}


function appendTemplate(template) {
	const contents = $('#algo-steps').html();
	$('#algo-steps').html(`${contents}${template}`);
}


function appendRow(table, addlRow) {
	const contents = $('#' + table).html();
	$('#' + table).html(`${contents}${addlRow}`);
}


function noPreviousStep() {
	$('#prev-step').css('visibility', 'hidden');
	$('#step').hide();
	$('#description').show();
}


function noPreviousNextStep() {
	$('#prev-step').css('visibility', 'hidden');
	$('#next-step').css('visibility', 'hidden');
	$('#step').hide();
	$('#description').show();
}


function withPreviousAndNextStep() {
	$('#prev-step').css('visibility', 'visible');
	$('#next-step').css('visibility', 'visible');
	$('#step').show();
	$('#description').hide();
}


function unbindClickCallback() {
	$('#next-step').prop('onclick', null).off('click');
	$('#prev-step').prop('onclick', null).off('click');
}


function demoUtil() {
	
	unbindClickCallback();

	/* Clear the results area. */
	$('#algo-name').hide();
	$('#algo-steps').html('');

	initStepNumber(1);
	withPreviousAndNextStep();

	const multiplicandBin = $('#multiplicand-bin').val();
	const multiplierBin = $('#multiplier-bin').val();
	const multiplicandDec = $('#multiplicand-dec').val();
	const multiplierDec = $('#multiplier-dec').val();

	/* Store the values in hidden span elements to retain them even if the input fields are modified. */
	$('#multiplicand-bin-value').text(multiplicandBin);
	$('#multiplier-bin-value').text(multiplierBin);
	$('#multiplicand-dec-value').text(multiplicandDec);
	$('#multiplier-dec-value').text(multiplierDec);

	switch ($('#algo-value').text()) {
		case algs[0] /* PnP method */:
			pencilDemo(
				$('#multiplicand-bin-value').text(),
				$('#multiplier-bin-value').text(),
				parseInt($('#multiplicand-dec-value').text()),
				parseInt($('#multiplier-dec-value').text())
			);
			break;
		case algs[1] /* Booth's */:
			boothsDemo(
				$('#multiplicand-bin-value').text(),
				$('#multiplier-bin-value').text(),
				parseInt($('#multiplicand-dec-value').text()),
				parseInt($('#multiplier-dec-value').text())
			);
			break;
		case algs[2] /* Extended Booth's */:
			extendedBoothsDemo(
				$('#multiplicand-bin-value').text(),
				$('#multiplier-bin-value').text(),
				parseInt($('#multiplicand-dec-value').text()),
				parseInt($('#multiplier-dec-value').text())
			);
			break;
		default:
			break;
	}
}


function handleAmbiguousCases() {
	if (isAmbiguousCase($('#multiplicand-bin').val())) {
		const val = $('#multiplicand-bin').val().trim();
		const numZeroes = val.length - 1;
		const powerOfTwo = Math.pow(2, numZeroes);
		const errorMessage = `${AMBIGUOUS_BIN_1}<br>
			• ${AMBIGUOUS_BIN_2} &ndash;${powerOfTwo}${AMBIGUOUS_BIN_3} 1${val}. <br>
			• ${AMBIGUOUS_BIN_2} ${powerOfTwo}${AMBIGUOUS_BIN_3} 0${val}.`;

		$('#multiplicand-error > p').html(errorMessage);
	}

	if (isAmbiguousCase($('#multiplier-bin').val())) {
		const val = $('#multiplier-bin').val().trim();
		const numZeroes = val.length - 1;
		const powerOfTwo = Math.pow(2, numZeroes);
		const errorMessage = `${AMBIGUOUS_BIN_1}<br>
			• ${AMBIGUOUS_BIN_2} &ndash;${powerOfTwo}${AMBIGUOUS_BIN_3} 1${val}. <br>
			• ${AMBIGUOUS_BIN_2} ${powerOfTwo}${AMBIGUOUS_BIN_3} 0${val}.`;

		$('#multiplier-error > p').html(errorMessage);
	}

	
}


function showAllSteps() {
	const mcand = $('#multiplicand-bin').val();
	const mplier = $('#multiplier-bin').val();

	switch ($('#algo-value').text()) {
		case algs[0]:
			pencilGoTo(500, mcand, mplier);
			break;
		case algs[1]:
			boothsGoTo(500, mcand, mplier);
			break;
		case algs[2]:
			extendedBoothsGoTo(500, mcand, mplier);
			break;
	}
}


function initOps() {
	$('#multiply').on('click', function () {
		if (!isAmbiguousCase($('#multiplicand-bin').val()) && !isAmbiguousCase($('#multiplier-bin').val())) {
			$('#prev-step').show();
			$('#next-step').show();
			demoUtil();

			if ($('#display-mode-text').text().trim() == 'Show All Steps') {
				showAllSteps();
				window.scrollTo(0, 0);
				$('#playback-control').css('visibility', 'hidden');
				$('#prev-step').css('visibility', 'hidden');
			}

			/* Enable saving to text file. */
			$('#save-text').css('cursor', 'pointer');
			$('#save-logo').css('cursor', 'pointer');
		} else {
			handleAmbiguousCases();
		}
	});
}
