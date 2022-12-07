/**
 * File containing the functions for the paper & pencil multiplication
 */
const pencilProductRow = `<tr>
        <th id = "pencil-product-carry-over" class = "no-bold right-align carry-over blurred"></th>
        <td id = "pencil-product" class = "right-align"></td>
    </tr>`;


function pencilInit() {
	$('#algo-name').hide();
	$('#algo-steps').html(` <br> `);
	incrementstep();
}

function pencilDescription() {
	$('#algo-name').text(algs[0]);
	$('#algo-name').show();
	$('#algo-value').text(algs[0]);
}

function pencilTotalSteps(multiplicandBin, multiplierBin) {
	const numBits = Math.max(multiplicandBin.length, multiplierBin.length);

	if (multiplierBin[0] == '0') {
		$('#total-steps').text(5 + numBits + 2 * numBits);

	/* Another step is added if the multiplier is negative
	 */
	} else {
		$('#total-steps').text(6 + numBits + 2 * numBits);
	}
}


function pencilDisplayEqualizedBits(
	multiplicandBin,
	multiplierBin,
	multiplicand,
	multiplier
) {
	const bitDifference = Math.abs(multiplicandBin.length - multiplierBin.length);

	let multiplicandFormatted = multiplicand;
	let multiplierFormatted = multiplier;

	// formatted/equalized values for exporting
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


 function pencilPencil(
	displayNumber,
	multiplicand,
	multiplicandDec,
	multiplierDec,
	multiplierFull,
	carry
) {
	let summands = []; 
	let summandsFormatted = []; 
	let multiplierDisplay = []; 
	let currentCarry = carry;	

	/* Multiplier (without format) */
	const multiplierArray = multiplierFull.trim().split('').reverse();

	for (let i = 0; i < multiplierArray.length; i++) {
		const multiplier = parseInt(multiplierArray[i]);

		/* Multiply the multiplicand by the digit in the recoding, starting at the rightmost digit. */
		summands.push(multiply(multiplicandDec, multiplier, 2 * multiplicand.length - i));
		summandsFormatted.push(emphasizeProduct(multiplicand, multiplier, summands[i]));

		/* Highlight the digit in the recoding by which the multiplicand is multiplied. */
		multiplierDisplay.push(multiplierFull.trim().split('').reverse());
		multiplierDisplay[i][
			i
		] = `<b class = "emphasized no-underline">${multiplierArray[i]}</b>`;
		multiplierDisplay[i] = multiplierDisplay[i].reverse().join(' ');
	}

	/* If the multiplier is negative, add the two's complement of the multiplicand as an intermediate product. */
	if (multiplierFull[0] == '1') {
		summands.push(multiply(multiplicandDec, -1, multiplicand.length));
		summandsFormatted.push(emphasizeProduct(multiplicand, -1, summands[multiplierArray.length]));

		multiplierDisplay.push(multiplierFull.trim().split('').reverse());
		multiplierDisplay[multiplicand.length] = multiplierDisplay[multiplicand.length].reverse().join(' ');
	}

	const template = `<div class = "indented-2 demo-box">
            <table id = "pencil-pencil-table" class = "demo-box-table pencil-table">
                <tr>
                    <th></th>
                    <td id = "step-c-pencil-multiplicand" class = "right-align">${multiplicand}</td>
                    <td class = "carry-over">
                        <b>Carry-over:</b>
                    </td>
                </tr>
                <tr class = "bottom-border">
                    <th class = "no-bold right-align">&times;</th>
                    <td id = "step-c-pencil-display" class = "right-align">${multiplierFull}</td>
                    <td class = "carry-over">
                        <span id = "pencil-carry-over"></span>
                    </td>
                </tr>
            </table>
        </div><br>`;

	/* Row for each intermediate summand. */
	let addlRow = `<tr>
            <th class = "no-bold"></th>
            <td id = "pencil-summands-${displayNumber - 1}">${
		summandsFormatted[displayNumber - 1]
	}</td>
        </tr>`;

	const numBitsProduct = 2 * multiplicand.length;

	let numSummands = multiplierArray.length;
	let offset = 0;

	
	if (multiplierFull[0] == '1') {
		numSummands = numSummands + 1;
		offset = 1;
	}

	const product = multiply(multiplicandDec, multiplierDec, numBitsProduct); /* Without format */
	const productDisplay = formatProductDisplay(product); /* With format */

	
	if (displayNumber == 0) {
		appendTemplate(template);
	} else if (displayNumber <= numSummands) {
		
		if (displayNumber == numSummands) {
			addlRow = `<tr class = "summands bottom-border">
                    <th class = "no-bold right-align">+</th>
                    <td id = "pencil-summands-${displayNumber - 1}">${
				summandsFormatted[displayNumber - 1]
			}</td>
                </tr>`;
		}

		appendRow('pencil-pencil-table', `${addlRow}`);

		/* Display the formatted multiplicand, multiplier, and summand. */
		$('#step-c-pencil-multiplicand').html(
			`<b class = "emphasized no-underline">${multiplicand}</b>`
		);
		$('#step-c-pencil-display').html(`<span id="pencil-display-spacing-span" style="letter-spacing: 1px;">${multiplierDisplay[displayNumber - 1]}</span>`);

		/* Remove the highlight of the previous summand (thus, subtract 2 from the step number). */
		$(`#pencil-summands-${displayNumber - 2}`).html(`${summands[displayNumber - 2]}`);
	} else if (displayNumber <= multiplierArray.length + numBitsProduct + offset) {
		
		const index = numBitsProduct - (displayNumber - multiplierArray.length - offset);
		let total = currentCarry;
		for (let i = 0; i < numSummands; i++) {
			let summand = $(`#pencil-summands-${i}`).text();
			
			if (summand[index] != undefined) {
				total = total + parseInt(summand[index]);
			}
		}
		
		/* Compute for the carry based on the sum of the bit column. */
		currentCarry = Math.floor(total / 2);

		
		if (displayNumber == multiplierArray.length + 1 + offset) {
			$('#step-c-pencil-multiplicand').html(`${multiplicand}`);
			$('#step-c-pencil-display').html(`${multiplierFull}`);

			/* Remove the highlight of the last summand (thus, subtract 2 from the step number). */
			$(`#pencil-summands-${displayNumber - 2}`).html(`${summands[displayNumber - 2]}`);
			$('.carry-over b').css('display', 'block');

			appendRow('pencil-pencil-table', `${pencilProductRow}`);
		} else if (displayNumber == multiplierArray.length + numBitsProduct + offset) {
			
			if (currentCarry >= 1) {
				$('#pencil-product-carry-over').text(toBinaryRaw(currentCarry));
			}
		}

		/* Update the carry-over after summation of each bit column. */
		$('#pencil-carry-over').text(toBinaryRaw(currentCarry));

		
		for (let i = 0; i < numSummands; i++) {
			const summand = $(`#pencil-summands-${i}`).text();
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

			$(`#pencil-summands-${i}`).html(summandFormatted);
		}

		/* Highlight the bit in the product that corresponds to the sum of the bit column. */
		$('#pencil-product').html(
			`${productDisplay[displayNumber - multiplierArray.length - 1 - offset]}`
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

	incrementstep();

	$('#tracking-product').text(product);

	/* Return the binary product and the carry. */
	return [product, currentCarry];
}


function pencilVerify(multiplicandDec, multiplierDec, product, numSummands) {
	const productDec = multiplicandDec * multiplierDec;
	const doubleCheck = `${multiplicandDec}<sub>10</sub><span class = "tab-9"></span>&times;<span class = "tab-9"></span>${multiplierDec}<sub>10</sub><span class = "tab-10"></span>=<span class = "tab-10"></span>${productDec}<sub>10</sub><span class = "tab-10"></span>=<span class = "tab-10"></span><span class = "final-answer">${product}<sub>2</sub></span><br>`;

	appendTemplate(`<span class = "tab-13"></span>${doubleCheck}`);

	/* If the multiplier is negative, the number of summands is increased by 1. */
	if (parseInt(multiplierDec) < 0) {
		numSummands = numSummands + 1;
	}

	/* Hide the carry-over and remove the highlights from the previous step. */
	hideCarryOver();
	for (let i = 0; i < numSummands; i++) {
		$(`#pencil-summands-${i} b`).addClass('remove-emphasis');
	}

	$('#pencil-product b').addClass('remove-emphasis');

	incrementstep();
}

mber} multiplierDec Decimal multiplier.
 */
 function pencilSteps(multiplicandBin, multiplierBin, multiplicandDec, multiplierDec) {
	/* Equalize the number of bits of the operands. */
	const [multiplicand, multiplier] = equalizeBits(multiplicandBin, multiplierBin);

	/* Store formatted values in hidden spans for export use. */
	$('#multiplicand-equalized').text(multiplicand);
	$('#multiplier-equalized').text(multiplier);

	/* This will be set by the method calls. */
	let product = '';

	/* The carry initially has a value of 0. */
	let carry = 0;

	$('#next-step').on('click', function () {
		withPreviousAndNextStep();

		
		let offset = 0;
		if (multiplierBin[0] == '1') {
			offset = 1;
		}

		/* Check if the selected multiplication method is the pencil-and-paper method. */
		if (checkMulMethod(algs[0])) {
			const stepNumber = parseInt($('#step-number-value').text());
			if (stepNumber == 0) {
				pencilInit();
				initStepNumber(1);
			} else if (stepNumber == 1) {
				pencilDisplayEqualizedBits(
					multiplicandBin,
					multiplierBin,
					multiplicand,
					multiplier
				);
			} else if (stepNumber == 2) {
				incrementstep();
		    } else if (stepNumber <= offset + 3 + multiplier.length + 2 * multiplier.length) {
				
				[product, carry] = pencilPencil(
					stepNumber - 3,
					multiplicand,
					multiplicandDec,
					multiplierDec,
					multiplier,
					carry
				);

			} else if (stepNumber == offset + 4 + multiplier.length + 2 * multiplier.length) {
				pencilVerify(multiplicandDec, multiplierDec, product, multiplier.length);

				/* Hide the next step button. */
				$('#next-step').css('visibility', 'hidden');
			}

			/* Scroll to the bottom of the page at every step. */
			window.scrollTo(0, document.body.scrollHeight);
		}
	});

	pencilPencil(
					2,
					multiplicand,
					multiplicandDec,
					multiplierDec,
					multiplier,
					carry
				);

	decrementstep();

	
}


function pencilRewind(multiplicandBin, multiplierBin) {
	$('#prev-step').on('click', function () {
		withPreviousAndNextStep();

		
		if ($('#step-number-value').text() == 1) {
			pencilGoToStep0();
		} else {
			pencilGoTo(
				parseInt($('#step-number-value').text()) - 2,
				multiplicandBin,
				multiplierBin
			);
		}
	});
}


function pencilGoToStep(multiplicandBin, multiplierBin) {
	/* Trigger the change when the enter key is pressed. */
	$('#step-number').on('keyup', function (e) {
		if (e.code == 'Enter') {
			withPreviousAndNextStep();

			
			if ($('#step-number').val() == 0) {
				pencilGoToStep0();
			} else {
				pencilGoTo(
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


function pencilGoToStep0() {
	initStepNumber(0);
	pencilDescription();

	noPreviousStep();

	/* Scroll back to the top. */
	window.scrollTo(0, 0);
}


function pencilGoTo(stepNumber, multiplicandBin, multiplierBin) {
	/* Return to the first step, and repeatedly trigger the click (next step) event to change the displayed step. */
	pencilInit();
	initStepNumber(1);
	pencilTotalSteps(multiplicandBin, multiplierBin);

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


function pencilDemo(multiplicandBin, multiplierBin, multiplicandDec, multiplierDec) {
	pencilInit();
	pencilTotalSteps(multiplicandBin, multiplierBin);
	pencilSteps(multiplicandBin, multiplierBin, multiplicandDec, multiplierDec);
	pencilRewind(multiplicandBin, multiplierBin);
	pencilGoToStep(multiplicandBin, multiplierBin);
}
