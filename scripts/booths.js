/**
 * Javascript file containing the function for booth's algorithm multiplication
 */

/**
 * Row where the product is displayed (final steps of pencil-and-paper demonstration/simulation).
 */
const boothsProductRow = `<tr>
        <th id = "booths-product-carry-over" ></th>
        <td id = "booths-product" ></td>
    </tr>`;

/**
 * Two adjacent bits recoding table.
 */
const boothsRecodeMap = new Map();


function boothsInit() {
	$('#algo-name').hide();
	$('#algo-steps').html(`<br>`);
}




/**
 * Populates the two adjacent bits recoding table.
 */
function boothsInitRecodeMap() {
	boothsRecodeMap.set('00', '0');
	boothsRecodeMap.set('01', '+1');
	boothsRecodeMap.set('10', '-1');
	boothsRecodeMap.set('11', '0');
}


function boothsTotalSteps(multiplicandBin, multiplierBin) {
	const numBits = Math.max(multiplicandBin.length, multiplierBin.length);

	
	const numDigitsRecoding = numBits;

	/* Should be one more than the conditional in the method boothsSteps() */
	$('#total-steps').text(8 + 2 * numDigitsRecoding + 2 * numBits);
}

/
function boothsDisplayEqualizedBits(
	multiplicandBin,
	multiplierBin,
	multiplicand,
	multiplier
) {
	const bitDifference = Math.abs(multiplicandBin.length - multiplierBin.length);

	let multiplicandFormatted = multiplicand;
	let multiplierFormatted = multiplier;

	/* Store formatted values in hidden spans for export use. */
	$('#multiplicand-equalized').text(multiplicandFormatted);
	$('#multiplier-equalized').text(multiplierFormatted);

	/* If the multiplier has more bits, highlight the sign extension of the multiplicand, and vice versa. */
	if (multiplicandBin.length < multiplierBin.length) {
		multiplicandFormatted = `<b class = "emphasized">${multiplicand.substring(
			0,
			bitDifference
		)}</b>${multiplicand.substring(bitDifference)}`;

		/* Change value in hidden span accordingly. */
		$('#multiplicand-equalized').text(`${multiplicand.substring(0,bitDifference)}${multiplicand.substring(bitDifference)}`);
	} else {
		multiplierFormatted = `<b class = "emphasized">${multiplier.substring(
			0,
			bitDifference
		)}</b>${multiplier.substring(bitDifference)}`;

		/* Change value in hidden span accordingly. */
		$('#multiplier-equalized').text(`${multiplier.substring(0,bitDifference)}${multiplier.substring(bitDifference)}`);
	}

	const template = `<div class = "indented-2 demo-box">
            <table class = "demo-box-table">
                <tr>
                    <th>Multiplicand</th>
                    <td>${multiplicandFormatted}</td>
                </tr>
                <tr>
                    <th>Multiplier</th>
                    <td>${multiplierFormatted}</td>
                </tr>
            </table>
        </div><br>`;

	/* Append the template. */
	const contents = $('#algo-steps').html();
	$('#algo-steps').html(`${contents}${template}`);

	incrementstep();
}


function boothsDisplayStepC01() {
	appendTemplate(``);
	incrementstep();
}


function boothsAppendZero(multiplierZeroAppended) {
	/* Highlight the appended zero. */
	const multiplierFormatted = `${multiplierZeroAppended.substring(
		0,
		multiplierZeroAppended.length - 1
	)}<b class = "emphasized">0</b>`;

	const template = `<div class = "indented-3 demo-box">
            <table class = "demo-box-table">
                <tr>
                    <th class = "no-bold"><span id="scroll-booths-recoding-table">${multiplierFormatted}</span></th>
                </tr>
            </table>
        </div><br>`;

	appendTemplate(template);
	incrementstep();
}

/**
 * Displays the second substep of step C.
 */
function boothsDisplayStepC2() {
	appendTemplate(
		``
	);
	incrementstep();
}


function boothsRecode(recodeNumber, multiplierForRecoding) {
	let booths = ``; /* Booth's equivalent of the multiplier */

	/* Array with each element corresponding to the multiplier with a pair of bits highlighted */
	let splitMultipliers = [];

	for (let i = multiplierForRecoding.length - 1; i > 0; i -= 1) {
		/* Get two bits at a time. */
		const recode = boothsRecodeMap.get(`${multiplierForRecoding.substring(i - 1, i + 1)}`);
		booths = `${recode} ${booths}`;

		/* Highlight the pair that has been recoded. */
		const substr1 = `${multiplierForRecoding.substring(0, i - 1)}`;
		const substr2 = `${multiplierForRecoding.substring(i - 1, i + 1)}`;
		const substr3 = `${multiplierForRecoding.substring(i + 1)}`;
		splitMultipliers.push(
			`<span class = "blurred">${substr1}</span><b class = "emphasized">${substr2}</b>${substr3}`
		);
	}

	/* Reverse the Booth's equivalent since the procedure starts at the least significant bit. */
	let boothsArray = booths
		.trim()
		.split(' ')
		.reverse();
	let boothsDisplay = booths
		.trim()
		.split(' ')
		.reverse(); 

	// Isolated first element
	boothsDisplay[0] = `<b class = "emphasized">${boothsArray[0]}</b>`;
	for (let i = 1; i < boothsArray.length; i++) {
		boothsDisplay[i] = `<b class = "emphasized">${boothsArray[i]}</b> ${
			boothsArray[i - 1]
		}`;
		boothsArray[i] = `${boothsArray[i]} ${boothsArray[i - 1]}`;
	}

	const templateNoDiv = `<table class = "demo-box-table">
            <tr>
                <th>Modified Multiplier</th>
                <td id = "modified-multiplier">${splitMultipliers[recodeNumber]}</td>
            </tr>
            <tr id = "scroll-booths-operations">
                <th>Booth's</th>
                <td id = "booths-display">${boothsDisplay[recodeNumber]}</td>
            </tr>
        </table>`;

	const template = `<div id = "booths-demo-box-recoding" class = "indented-3 demo-box">
            ${templateNoDiv}
        </div><br>`;

	
	if (recodeNumber == 0) {
		appendTemplate(template);
	} else {
		$('#booths-demo-box-recoding').html(templateNoDiv);
	}

	incrementstep();

	// Booth's multiplier
	return boothsArray[boothsArray.length - 1];
}


function showBoothsRecoding() {
	if ($('#booths-step-c-table-provision').html() == '') {
		$('#booths-step-c-table-provision').html(``);
		$('#show-hide-booths-recoding').text('hide');
	} else {
		$('#booths-step-c-table-provision').html('');
		$('#show-hide-booths-recoding').text('show');
	}
}


function boothsDisplayStepD(multiplierForRecoding, boothsRecoding) {
	appendTemplate(
		``
	);

	/* Remove the highlights from the previous step. */
	$('#modified-multiplier').text(multiplierForRecoding);
	$('#booths-display').text(boothsRecoding);

	incrementstep();
}


function boothsPencil(
	displayNumber,
	multiplicand,
	multiplicandDec,
	multiplierDec,
	boothsRecoding,
	carry
) {
	let summands = []; 
	let summandsFormatted = []; 
	let boothsDisplay = []; 
	let currentCarry = carry;	

	/* Booth's equivalent (without format) */
	const boothsArray = boothsRecoding.trim().split(' ').reverse();

	for (let i = 0; i < boothsArray.length; i++) {
		const multiplier = parseInt(boothsArray[i]);

		/* Multiply the multiplicand by the digit in the recoding, starting at the rightmost digit. */
		summands.push(multiply(multiplicandDec, multiplier, 2 * multiplicand.length - i));
		summandsFormatted.push(emphasizeProduct(multiplicand, multiplier, summands[i]));

		/* Highlight the digit in the recoding by which the multiplicand is multiplied. */
		boothsDisplay.push(boothsRecoding.trim().split(' ').reverse());
		boothsDisplay[i][
			i
		] = `<b class = "emphasized no-underline">${boothsArray[i]}</b>`;
		boothsDisplay[i] = boothsDisplay[i].reverse().join(' ');
	}

	const template = `<div class = "indented-2 demo-box">
            <table id = "booths-pencil-table" class = "demo-box-table pencil-table">
                <tr>
                    <th></th>
                    <td id = "step-d-booths-multiplicand" class = "right-align">${multiplicand}</td>
                    <td class = "carry-over">
                        <b>Carry-over:</b>
                    </td>
                </tr>
                <tr class = "bottom-border">
                    <th class = "no-bold right-align">&times;</th>
                    <td id = "step-d-booths-display" class = "right-align"><span id="booths-display-spacing-span" style="letter-spacing: 0.5px;">${boothsRecoding}&nbsp;</span></td>
                    <td class = "carry-over">
                        <span id = "booths-carry-over"></span>
                    </td>
                </tr>
            </table>
        </div><br>`;

	/* Row for each intermediate summand. */
	let addlRow = `<tr>
            <th class = "no-bold"></th>
            <td id = "booths-summands-${displayNumber - 1}">${
		summandsFormatted[displayNumber - 1]
	}</td>
        </tr>`;

	const numBitsProduct = 2 * multiplicand.length;
	const numSummands = boothsArray.length;

	const product = multiply(multiplicandDec, multiplierDec, numBitsProduct); /* Without format */
	const productDisplay = formatProductDisplay(product); /* With format */

	
	if (displayNumber == 0) {
		appendTemplate(template);
	} else if (displayNumber <= numSummands) {
		
		if (displayNumber == numSummands) {
			addlRow = `<tr class = "summands bottom-border">
                    <th class = "no-bold right-align">+</th>
                    <td id = "booths-summands-${displayNumber - 1}">${
				summandsFormatted[displayNumber - 1]
			}</td>
                </tr>`;
		}

		appendRow('booths-pencil-table', `${addlRow}`);

		/* Display the formatted multiplicand, Booth's equivalent of the multiplier, and summand. */
		$('#step-d-booths-multiplicand').html(
			`<b class = "emphasized no-underline">${multiplicand}</b>`
		);
		$('#step-d-booths-display').html(`<span id="booths-display-spacing-span" style="letter-spacing: 0.5px;">${boothsDisplay[displayNumber - 1]}&nbsp;</span>`);

		/* Remove the highlight of the previous summand (thus, subtract 2 from the step number). */
		$(`#booths-summands-${displayNumber - 2}`).html(`${summands[displayNumber - 2]}`);
	} else if (displayNumber <= boothsArray.length + numBitsProduct) {
		
		const index = numBitsProduct - (displayNumber - boothsArray.length);
		let total = currentCarry;
		for (let i = 0; i < numSummands; i++) {
			let summand = $(`#booths-summands-${i}`).text();
			
			if (summand[index] != undefined) {
				total = total + parseInt(summand[index]);
			}
		}
		
		/* Compute for the carry based on the sum of the bit column. */
		currentCarry = Math.floor(total / 2);

		
		if (displayNumber == boothsArray.length + 1) {
			$('#step-d-booths-multiplicand').html(`${multiplicand}`);
			$('#step-d-booths-display').html(`<span id="booths-display-spacing-span" style="letter-spacing: 0.5px;">${boothsRecoding}&nbsp;</span>`);

			/* Remove the highlight of the last summand (thus, subtract 2 from the step number). */
			$(`#booths-summands-${displayNumber - 2}`).html(
				`${summands[displayNumber - 2]}`
			);
			$('.carry-over b').css('display', 'block');

			appendRow('booths-pencil-table', `${boothsProductRow}`);
		} else if (displayNumber == boothsArray.length + numBitsProduct) {
			
			if (currentCarry >= 1) {
				$('#booths-product-carry-over').text(toBinaryRaw(currentCarry));
			}
		}

		/* Update the carry-over after summation of each bit column. */
		$('#booths-carry-over').text(toBinaryRaw(currentCarry));

		
		for (let i = 0; i < numSummands; i++) {
			const summand = $(`#booths-summands-${i}`).text();
			let summandFormatted = '';

			/* Prevent negative indexes. */
			if (index < summand.length) {
				summandFormatted = `<span class = "blurred">${summand.substring(
					0,
					index
				)}</span><b class = "emphasized no-underline">${
					summand[index]
				}</b>${summand.substring(index + 1)}`;
			} else {
				summandFormatted = `<span class = "blurred">${summand}</span>`;
			}

			$(`#booths-summands-${i}`).html(summandFormatted);
		}

		/* Highlight the bit in the product that corresponds to the sum of the bit column. */
		$('#booths-product').html(
			`${productDisplay[displayNumber - boothsArray.length - 1]}`
		);
	}

	let tempSummands = "";
	for(let i = 0; i < summands.length; i++){

		if(i == summands.length - 1){
				tempSummands = tempSummands.concat(summands[i]);
		}else{
			tempSummands = tempSummands.concat(summands[i] + ",");
		}
	}

	$('#summands').text(tempSummands);
	$('#tracking-product').text(product);

	incrementstep();

	/* Return the binary product. */
	return [product, currentCarry];
}


function showBoothsOperations() {
	if ($('#booths-step-d-table-provision').html() == '') {
		$('#booths-step-d-table-provision').html(``);
		$('#show-hide-booths-operations').text('hide');
	} else {
		$('#booths-step-d-table-provision').html('');
		$('#show-hide-booths-operations').text('show');
	}
}


function boothsVerify(multiplicandDec, multiplierDec, product, numSummands) {
	const productDec = multiplicandDec * multiplierDec;
	const doubleCheck = `${multiplicandDec}<sub>10</sub><span class = "tab-9"></span>&times;<span class = "tab-9"></span>${multiplierDec}<sub>10</sub><span class = "tab-10"></span>=<span class = "tab-10"></span>${productDec}<sub>10</sub><span class = "tab-10"></span>=<span class = "tab-10"></span><span class = "final-answer">${product}<sub>2</sub></span><br>`;

	appendTemplate(`<span class = "tab-13"></span>${doubleCheck}`);

	/* Hide the carry-over and remove the highlights from the previous step. */
	hideCarryOver();
	for (let i = 0; i < numSummands; i++) {
		$(`#booths-summands-${i} b`).addClass('remove-emphasis');
	}

	$('#booths-product b').addClass('remove-emphasis');

	incrementstep();
}


function boothsSteps(multiplicandBin, multiplierBin, multiplicandDec, multiplierDec) {
	/* Equalize the number of bits of the operands. */
	const [multiplicand, multiplier] = equalizeBits(multiplicandBin, multiplierBin);

	/* Store formatted values in hidden spans for export use. */
	$('#multiplicand-equalized').text(multiplicand);
	$('#multiplier-equalized').text(multiplier);

	/* Append zero to the least significant bit of the multiplier. */
	const multiplierZeroAppended = `${multiplier}0`;

	/* Perform sign extension if the number of bits prior to appending zero is odd. */
	let multiplierForRecoding = multiplierZeroAppended;

	/* Booth's results in the number of intermediate summands equal to the number of digits of the original binary number. */
	const numDigitsRecoding = multiplierForRecoding.length - 1;

	/* This will be set by the method calls. */
	let boothsRecoding = '';
	let product = '';

	/* The carry initially has a value of 0. */
	let carry = 0;

	$('#next-step').on('click', function () {
		withPreviousAndNextStep();

		/* Check if the selected multiplication method is the Booth's algorithm. */
		if (checkMulMethod(algs[1])) {
			const stepNumber = parseInt($('#step-number-value').text());
			if (stepNumber == 0) {
				boothsInit();
				initStepNumber(1);
			} else if (stepNumber == 1) {
				boothsDisplayEqualizedBits(
					multiplicandBin,
					multiplierBin,
					multiplicand,
					multiplier
				);
			} else if (stepNumber == 2) {
				boothsDisplayStepC01();
			} else if (stepNumber == 3) {
				boothsAppendZero(multiplierZeroAppended);
			} else if (stepNumber == 4) {
				boothsDisplayStepC2();
			} 
			else if (stepNumber <= 4 + numDigitsRecoding) {
				
				boothsRecoding = boothsRecode(
					stepNumber - 5,
					multiplierForRecoding
				);
			} else if (stepNumber == 5 + numDigitsRecoding) {
				boothsDisplayStepD(multiplierForRecoding, boothsRecoding);
			} else if (stepNumber <= 6 + 2 * numDigitsRecoding + 2 * multiplicand.length) {
				
				[product, carry] = boothsPencil(
					stepNumber - 6 - numDigitsRecoding,
					multiplicand,
					multiplicandDec,
					multiplierDec,
					boothsRecoding,
					carry
				);
			} else if (stepNumber == 7 + 2 * numDigitsRecoding + 2 * multiplicand.length) {
				boothsVerify(multiplicandDec, multiplierDec, product, numDigitsRecoding);

				/* Hide the next step button. */
				$('#next-step').css('visibility', 'hidden');
			}

			/* Scroll to the bottom of the page at every step. */
			window.scrollTo(0, document.body.scrollHeight);
		}
	});

	boothsRecoding = boothsRecode(
								2,
								multiplierForRecoding
							);

	boothsPencil(
					2,
					multiplicand,
					multiplicandDec,
					multiplierDec,
					boothsRecoding,
					carry
				);

	decrementstep();

	$('#multiplier-zero-appended').text(multiplierZeroAppended);
	$('#multiplier-for-recoding').text(multiplierForRecoding);
	$('#booths-recoding').text(boothsRecoding);
}


function boothsRewind(multiplicandBin, multiplierBin) {
	$('#prev-step').on('click', function () {
		withPreviousAndNextStep();

		
		if ($('#step-number-value').text() == 1) {
			boothsGoToStep0();
		} else {
			boothsGoTo(
				parseInt($('#step-number-value').text()) - 2,
				multiplicandBin,
				multiplierBin
			);
		}
	});
}


function boothsGoToStep(multiplicandBin, multiplierBin) {
	$('#step-number').on('keyup', function (e) {
		if (e.code == 'Enter') {
			withPreviousAndNextStep();

			
			if ($('#step-number').val() == 0) {
				boothsGoToStep0();
			} else {
				boothsGoTo(
					parseInt($('#step-number').val() - 1),
					multiplicandBin,
					multiplierBin
				);

				if ($('#step-number').val() == $('#total-steps').text()) {
					/* Hide the next step button. */
					$('#next-step').css('visibility', 'hidden');
				}
			}
		}
	});
}


function boothsGoToStep0() {
	initStepNumber(0);


	noPreviousStep();

	/* Scroll back to the top. */
	window.scrollTo(0, 0);
}


function boothsGoTo(stepNumber, multiplicandBin, multiplierBin) {
	/* Return to the first step, and repeatedly trigger the click (next step) event to change the displayed step. */
	boothsInit();
	initStepNumber(1);
	boothsTotalSteps(multiplicandBin, multiplierBin);

	for (let i = 0; i < stepNumber; i++) {
		$('#next-step').trigger('click');
	}

	/* Hide the next button if going to the last step (for example, when 'Show All Steps' is selected). */
	if (parseInt(stepNumber) >= parseInt($('#total-steps').text())) {
		$('#next-step').css('visibility', 'hidden');
	} else {
		$('#next-step').css('visibility', 'visible');
	}
}


function scrollToBoothsRecoding() {
	$('html, body').animate({
		scrollTop: $('#scroll-booths-recoding-table').offset().top
	});
}


function scrollToBoothsOperations() {
	$('html, body').animate({
		scrollTop: $('#scroll-booths-operations').offset().top
	});
}


function boothsDemo(multiplicandBin, multiplierBin, multiplicandDec, multiplierDec) {
	boothsInit();
	boothsInitRecodeMap();
	boothsTotalSteps(multiplicandBin, multiplierBin);
	boothsSteps(multiplicandBin, multiplierBin, multiplicandDec, multiplierDec);
	boothsRewind(multiplicandBin, multiplierBin);
	boothsGoToStep(multiplicandBin, multiplierBin);
}
