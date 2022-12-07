/* Error messages displayed when the input does not fall in the range of supported signed integers. */
const MAX_ERROR = `input should not exceed 2<sup>${15}</sup> &ndash; 1 = ${Math.pow(2, 15) - 1}<br>(largest ${16}-bit signed integer)`;

const MIN_ERROR = `input should not be less than &ndash;2<sup>${15}</sup> = &ndash;${Math.pow(2, 15)}<br>(smallest ${16}-bit signed integer)`;

const EXCEED_BITS = `Input should not exceed ${16} bits<br>(Your input currently has`;

/* Error messages displayed when the input is not a valid number. */
const INVALID_DEC = `Should be a decimal number`;
const INVALID_BIN = `Should be a binary number in two's complement`;

/*
 * Parts of the error message displayed when the input is a binary number of the form 10..0.

 * The only unambiguous binary number of the form 10...0 is 1 followed by (`NUM_BITS` - 1) zeroes, 
 * which represents the smallest signed integer representable using NUM_BITS bits (`NUM_BITS`
 * is the maximum number of bits supported by this calculator).
 */
const AMBIGUOUS_BIN_1 = `Only 16-bit two's complement!`;
const AMBIGUOUS_BIN_2 = `.....`;
const AMBIGUOUS_BIN_3 = ', .....';
