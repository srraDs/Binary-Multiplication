/**
 * File containing the strings (literal constants) used in the website.
 *
 * For horizontal spacing, use the .tab-n (where n is a natural number) classes found in style.css,
 * as seen in the strings related to the extended Booth's algorithm. Avoid using consecutive &nbsp;
 * since these clutter the text included when the user performs a selection.
 */

/* --- ALGORITHM NAMES --- */
const algoNames = [`Pencil-and-Paper Method`, `Booth's Algorithm`, `Extended Booth's Algorithm`];


/* --- PENCIL-AND-PAPER ALGORITHM --- */


const pencilStepStrings = [
	
];

const pencilStepA = ``;

const pencilStepB = ``;

const pencilStepC = ``;


/* --- BOOTH'S ALGORITHM --- */
const boothsIntro = ``;

const boothsStepStrings = [
	
];

const boothsStepA = ``;

const boothsStepB = ``;

const boothsStepC0 = ``;

const boothsStepC1 = ``;

const boothsStepC2 = ``;

const boothsStepC = `${boothsStepC0}
    ${boothsStepC1}
    ${boothsStepC2}`;

const boothsStepCShowTable = ``;

const boothsStepCTableProvision = ``;

const boothsStepCTable = `<table class = "indented-2 procedure">
        <tr>
            <th>b<sub>i</sub> b<sub>i-1</sub></th>  
            <th>Conversion<sub></sub></th>
        </tr>
        <tr>
            <td><b>00</b></td>
            <td><b>0</b></td>
        </tr>
        <tr>
            <td><b>01</b></td>
            <td><b>+1</b></td>
        </tr>
        <tr>
            <td><b>10</b></td>
            <td><b>-1</b></td>
        </tr>
        <tr>
            <td><b>11</b></td>
            <td><b>0</b></td>
        </tr>
    </table>`;

const boothsStepD = ``;

const boothsStepDShowTable = `<div class = "indented-0 small-top-space">
    </div>`;

const boothsStepDTableProvision = `<span id = "booths-step-d-table-provision"></span>`;

const boothsStepDTable = ``;

const boothsAlgo = `${boothsIntro}
    ${boothsStepA}
    ${boothsStepB}
    ${boothsStepC}
    ${boothsStepCTable}
    ${boothsStepD}
    ${boothsStepDTable}`;

/* --- EXTENDED BOOTH'S ALGORITHM --- */
const extendedBoothsIntro = ``;

const extendedBoothsStepStrings = [
	
];

const extendedBoothsStepA = ``;

const extendedBoothsStepB = ``;

const extendedBoothsStepC0 = ``;

const extendedBoothsStepC1 = ``;

const extendedBoothsStepC2 = ``;

const extendedBoothsStepC3 = ``;

const extendedBoothsStepC = `${extendedBoothsStepC0}
    ${extendedBoothsStepC1}
    ${extendedBoothsStepC2}
    ${extendedBoothsStepC3}`;

const extendedBoothsStepCShowTable = ``;

const extendedBoothsStepCTableProvision = `<span id = "extended-booths-step-c-table-provision"></span>`;

const extendedBoothsStepCTable = `<table class = "indented-2 procedure merged">
        <tr>
            <th rowspan = "2">b<sub>i+1</sub> b<sub>i</sub> b<sub>i-1</sub></th>  
            <th rowspan = "2">Recoding<sub></sub></th>
            <th colspan = "3">Mnemonic<sub></sub></th>
        </tr>
        <tr>
            <td>Booth's of b<sub>i+1</sub> b<sub>i</sub></td>
            <td>Booth's of b<sub>i</sub> b<sub>i-1</sub></td>
            <td>Derivation<sub></sub></td>
        </tr>
        <tr>
            <td><b>000</b></td>
            <td><b>0</b></td>
            <td>0</td>
            <td>0</td>
            <td>0 &times; 2 + 0 </td>
        </tr>
        <tr>
            <td><b>001</b></td>
            <td><b>+1</b></td>
            <td>0</td>
            <td>+1</td>
            <td>0 &times; 2 + 1 </td>
        </tr>
        <tr>
            <td><b>010</b></td>
            <td><b>+1</b></td>
            <td>+1</td>
            <td>-1</td>
            <td>+1 &times; 2 - 1 </td>
        </tr>
        <tr>
            <td><b>011</b></td>
            <td><b>+2</b></td>
            <td>+1</td>
            <td>0</td>
            <td>+1 &times; 2 + 0 </td>
        </tr>
        <tr>
            <td><b>100</b></td>
            <td><b>-2</b></td>
            <td>-1</td>
            <td>0</td>
            <td>-1 &times; 2 + 0 </td>
        </tr>
        <tr>
            <td><b>101</b></td>
            <td><b>-1</b></td>
            <td>-1</td>
            <td>+1</td>
            <td>-1 &times; 2 + 1 </td>
        </tr>
        <tr>
            <td><b>110</b></td>
            <td><b>-1</b></td>
            <td>0</td>
            <td>-1</td>
            <td>0 &times; 2 - 1 </td>
        </tr>
        <tr>
            <td><b>111</b></td>
            <td><b>0</b></td>
            <td>0</td>
            <td>0</td>
            <td>0 &times; 2 + 0 </td>
        </tr>
    </table>`;

const extendedBoothsStepD = `<div class = "hanging-indent">
        <b><span class="tab-12"></span>
    </div>`;

const extendedBoothsStepDShowTable = `<div class = "indented-0 small-top-space">       
    </div>`;

const extendedBoothsStepDTableProvision = ``;

const extendedBoothsStepDTable = ``;

const extendedBoothsPicture = ``;

const extendedBoothsAlgo = `${extendedBoothsIntro}
    ${extendedBoothsStepA}
    ${extendedBoothsStepB}
    ${extendedBoothsStepC}
    ${extendedBoothsStepCTable}
    ${extendedBoothsStepD}
    ${extendedBoothsStepDTable}
    ${extendedBoothsPicture}`;



/* Verification step at the end of every multiplication algorithm demonstration (simulation) */
const verify = ``;
