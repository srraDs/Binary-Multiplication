/*
 *  The javascript file here contains the functions for the operations involving binary numbers.
 *  These functions mainly deal with the math part of the webapp. (i.e. conversions, truncation, sign extension to name a few)
 *  On other parts of the operations, they are handled by other files in the scripts folder.
 */

/*
 * The function below would convert a number to a 2's complement of 32 bits. Positive integers don't have leading 0's (i.e. 4 would return 100), 
 * while negative integers will have leading 1's to fill 32 bits (i.e. -4 returns 11111111111111111111111111111100).
 *
 *  The value passed is to be converted to a 2's complement of 32 bits.
 *  The return value in turn gives back the converted value. 
 */
function toBinaryRaw(number) {
	/* Perform an arithmetic shift first to force two's complement. */
	return (number >>> 0).toString(2);
}

/*
 * This function below would convert a number to a 2's complement in the least bit amount.
 * Unlike the prior function, this returns the 2's complement in the least number of bits.
 * For positive integers, it would place a leading zero, while a special case exists of the smallest n-bit signed number.
 *
 * The value passed is to be converted to a 2's complement of least bit amount.
 * The return value in turn gives back the converted value.
 */
function toBinary(number) {
	// The existing special case(-2^n-1)
	if (number == -1 * Math.pow(2, 15)) {
		let minBinary = '1';
		for (let i = 0; i < 15; i++) {
			minBinary = `${minBinary}0`;
		}

		return minBinary;
	}

	const binary = toBinaryRaw(number);

	// Applying a leading zero (positive integer case)
	if (number > 0) {
		return `0${binary}`;
	}

	// Negative numbers on the other hand does not have a leading zero(least bits)
	const invBinary = toBinaryRaw(-1 * number);

	// As a result, we deduct by 1 here
	return binary.substring(binary.length - invBinary.length - 1);
}

/*
 * Binary number to signed decimal number converter
 * The function below would convert a binary number, with a condition that it has 16 bits or less.
 *
 * The value passed is a binary number
 * The returned value is a signed decimal number.
 */
function toDecimalRaw(number) {
	const [decimal] = new Int16Array([`0b${number}`]);
	return decimal;
}

/*
 * Binary number to signed decimal number converter(special case)
 * The function below would convert a binary number or return nothing a blank string if the number is 1, with a condition that it has 16 bits or less.
 *
 * The value passed is a binary number
 * The value returned is a signed decimal number (or nothing/blank string if number is 1)
 */
function toDecimal(number) {
	if (isAmbiguousCase(number)) {
		return '';
	}

	return toDecimalRaw(signExtend(number, 16));
}

/*
 * Binary number form checker(10..0)
 * An exception exists though if the number is 1 and the succeeding numbers are bits amount - 1 zeroes
 *
 *  The value passed is a binary number to check for 10..0
 *  The returned answers are boolean (true for the pattern, false if not OR exceeds the bit amount supported by the app)
 */
function isAmbiguousCase(number) {
	let negativeBias = '1';
	for (let i = 0; i < 15; i++) {
		negativeBias = `${negativeBias}0`;
	}

	/* Regex for 1 followed by zero or more 0s */
	const pattern = /^10*$/;
	return pattern.test(number) && number != negativeBias;
}

/*
 * The function below would do sign extension to binary numbers. (except if the number has more than specified bits)
 *
 * The values passed are the number itself and the bits post-extension
 * The value returned is the number following sign extension
 */
function signExtend(number, numBits) {
	const numRemainingBits = numBits - number.length;

	let signExtended = number;
	let msb = number[0];

	for (let i = 0; i < numRemainingBits; i++) {
		signExtended = `${msb}${signExtended}`;
	}

	return signExtended;
}

/*
 * The function below would do a truncation to binary numbers to a specified bit amount(most significant side bits removed, unless number is less than specified bit amount))
 *
 * The values passed are the number itself and the bits post-truncation
 * The value returned is the number following sign extension
 */
function truncate(number, numBits) {
	return number.substring(number.length - numBits);
}

/*
 * The function below would do either of the 2 above functions based on bit amount
 *
 * The values passed are the number itself and the bits post-extension or post-truncation
 * The value returned is the number following a set bit amount
 */
function expressInNumBits(number, numBits) {
	if (number.length > numBits) {
		return truncate(number, numBits);
	}

	return signExtend(number, numBits);
}

/*
 * The function below equalizes 2 numbers in binary with the use of sign extension
 *
 * The values passed are 2 binary numbers
 * The value returned is an array with the 2 said numbers (following sign extension on number with lower bit amount)
 */
function equalizeBits(number1, number2) {
	const numBitsNumber1 = number1.length;
	const numBitsNumber2 = number2.length;

	const numBits = Math.max(numBitsNumber1, numBitsNumber2);

	return [signExtend(number1, numBits), signExtend(number2, numBits)];
}

/*
 * The function below does the main multiplication of 2 numbers (decimal) and gives a binary product with set bit amount
 *
 * The values passed are the 2 decimal numbers and product bit amount
 * The value returned is the binary product
 */
function multiply(multiplicandDec, multiplierDec, numBits) {
	return expressInNumBits(toBinary(multiplicandDec * multiplierDec), numBits);
}
