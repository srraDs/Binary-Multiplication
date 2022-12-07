$(function () {
	exportText();
});

function pencilText(mcandbin, mplierbin, mcanddec, mplierdec, pdec) {
	let res =
		'PENCIL-AND-PAPER METHOD\n\n' + 
		'Multiplicand\n\tDecimal\t' +
		mcanddec +
		'\n\tBinary\t' +
		mcandbin +
		'\n\nMultiplier\n\tDecimal\t' +
		mplierdec +
		'\n\tBinary\t' +
		mplierbin +
		'\n\n----------------------------------------------------------------\n\n';

	let mpliereq = $('#multiplier-equalized').text();
	let mcandeq = $('#multiplicand-equalized').text();
	let pbin = $('#tracking-product').text();
	let sums = $('#summands').text().split(',');

	res = res.concat('\tMultiplicand:\t', mcandeq);
	res = res.concat('\n\t  Multiplier:\t', mpliereq);

	if (mcandbin.length == mplierbin.length) {
		res = res.concat('\t');
	}
	res = res.concat('\n\n\t', mcandeq);
	res = res.concat('\n x\t', mpliereq);
	res = res.concat('\n----------------------------------------\n');

	for (let j = 0; j < sums.length; j++) {
		if (j == sums.length - 1) {
			res = res.concat(' +\t', sums[j] + '\n');
		} else {
			res = res.concat('\t', sums[j] + '\n');
		}
	}

	res = res.concat('----------------------------------------\n');
	res = res.concat('\t', pbin + '\n');

	let equation =
		mcanddec +
		'  x  ' +
		mplierdec +
		'  =  ' +
		pdec +
		'  =  0b' +
		pbin;

	res = res.concat('\n', equation);
		
	return res;
}

function boothsText(mcandbin, mplierbin, mcanddec, mplierdec, pdec) {
	let res =
		"BOOTH'S ALGORITHM\n\n" + 
		'Multiplicand\n\tDecimal\t' +
		mcanddec +
		'\n\tBinary\t' +
		mcandbin +
		'\n\nMultiplier\n\tDecimal\t' +
		mplierdec +
		'\n\tBinary\t' +
		mplierbin +
		'\n\n----------------------------------------------------------------\n\n';

	let mpliereq = $('#multiplier-equalized').text();
	let mcandeq = $('#multiplicand-equalized').text();
	let mza = $('#multiplier-zero-appended').text();
	let br = $('#booths-recoding').text();
	let pbin = $('#tracking-product').text();
	let sums = $('#summands').text().split(',');

	res = res.concat('\tMultiplicand:\t', mcandeq);
	res = res.concat('\n\t  Multiplier:\t', mpliereq);
	if (mcandbin.length == mplierbin.length) {
		res = res.concat('\t');
	}
	res = res.concat('\n\t\t', mza);
	res = res.concat('\n\t\t', br);
	res = res.concat('\t', mcandeq);
	res = res.concat('\n x\t', br);
	res = res.concat('\n----------------------------------------\n');
	for (let j = 0; j < sums.length; j++) {
		if (j == sums.length - 1) {
			res = res.concat(' +\t', sums[j] + '\n');
		} else {
			res = res.concat('\t', sums[j] + '\n');
		}
	}
	res = res.concat('----------------------------------------\n');
	res = res.concat('\t', pbin + '\n');
	let equation =
		mcanddec +
		'  x  ' +
		mplierdec +
		'  =  ' +
		pdec +
		'  =  0b' +
		pbin;
	res = res.concat('\n', equation);
	return res;
}

function extendedBoothsText(
	mcandbin,
	mplierbin,
	mcanddec,
	mplierdec,
	pdec
) {
	let res =
		"EXTENDED BOOTH'S ALGORITHM\n\n" + 
		'Multiplicand\n\tDecimal\t' +
		mcanddec +
		'\n\tBinary\t' +
		mcandbin +
		'\n\nMultiplier\n\tDecimal\t' +
		mplierdec +
		'\n\tBinary\t' +
		mplierbin +
		'\n\n----------------------------------------------------------------\n\n';

	let mpliereq = $('#multiplier-equalized').text();
	let mcandeq = $('#multiplicand-equalized').text();
	let mza = $('#multiplier-zero-appended').text();
	let mfr = $('#multiplier-for-recoding').text();
	let ebr = $('#extended-booths-recoding').text();
	let pbin = $('#tracking-product').text();
	let sums = $('#summands').text().split(',');

	res = res.concat('\tMultiplicand:\t', mcandeq);
	res = res.concat('\n\t  Multiplier:\t', mpliereq);
	res = res.concat('\n\t\t', mza);
	res = res.concat('\n\t\t', mfr);	
	if (mpliereq.length % 2 == 0) {
		res = res.concat('\t(no need for sign extension)');
	}
	res = res.concat('\n\t\t', ebr);
	res = res.concat('\t', mcandeq);
	res = res.concat('\n x\t', ebr);
	res = res.concat('\n----------------------------------------\n');
	for (let j = 0; j < sums.length; j++) {
		if (j == sums.length - 1) {
			res = res.concat(' +\t', sums[j] + '\n');
		} else {
			res = res.concat('\t', sums[j] + '\n');
		}
	}
	res = res.concat('----------------------------------------\n');
	res = res.concat('\t', pbin + '\n');
	let equation =
		mcanddec +
		'  x  ' +
		mplierdec +
		'  =  ' +
		pdec +
		'  =  0b' +
		pbin;

	res = res.concat('\n', equation);
	return res;
}

function generateContent(algorithm) {
	let finalString = '';

	let mcandbin = $('#multiplicand-bin-value').text();
	let mplierbin = $('#multiplier-bin-value').text();
	let mcanddec = $('#multiplicand-dec-value').text();
	let mplierdec = $('#multiplier-dec-value').text();

	let pdec = parseInt(mplierdec) * parseInt(mcanddec);

	if (algorithm == algs[0]) {
		finalString = pencilText(
			mcandbin,
			mplierbin,
			mcanddec,
			mplierdec,
			pdec
		);
	} else if (algorithm == algs[1]) {
		finalString = boothsText(
			mcandbin,
			mplierbin,
			mcanddec,
			mplierdec,
			pdec
		);
	} else {
		finalString = extendedBoothsText(
			mcandbin,
			mplierbin,
			mcanddec,
			mplierdec,
			pdec
		);
	}

	console.log(finalString)
	return finalString;
}

function download(algorithm) {
	let content = generateContent(algorithm);
	let filename = 'binaryMultiplication.txt';

	let uriContent = URL.createObjectURL(new Blob([content], { type: 'text/plain' }));
	let link = document.createElement('a');

	link.setAttribute('href', uriContent);
	link.setAttribute('download', filename);

	let event = new MouseEvent('click');
	link.dispatchEvent(event);
}

function exportTextUtil() {
	if (!isAmbiguousCase($('#multiplicand-bin').val()) && !isAmbiguousCase($('#multiplier-bin').val())) {
		switch ($('#algo-value').text()) {
			case algs[0]:
				download(algs[0]);
				break;
			case algs[1]:
				download(algs[1]);
				break;
			case algs[2]:
				download(algs[2]);
				break;
			default:
				/* Should not cascade here */
				break;
		}
	} else {
		handleAmbiguousCases();
	}
}

/**
 * Exports the steps of the algorithm to a text file.
 */
function exportText() {
	$('#save-text').on('click', function () {
		const saveCursor = $('#save-text').css('cursor');

		/* Disable saving to text file when multiply button is not yet clicked. */
		if (saveCursor != 'not-allowed') {
			exportTextUtil();
		}
	});

	$('#save-logo').on('click', function () {
		const saveCursor = $('#save-text').css('cursor');

		/* Disable saving to text file when multiply button is not yet clicked. */
		if (saveCursor != 'not-allowed') {
			exportTextUtil();
		}
	});
}
