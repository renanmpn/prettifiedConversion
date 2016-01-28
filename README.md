# prettifiedConversion
Accepts a numeric type and returns a truncated, ”prettified” string version.  The prettified version should include one number after the decimal when the truncated number is not an integer. It should prettify numbers greater than 6 digits and support millions, billions and trillions. It use short scale numbers to output the prettified number.

Examples:

- input: 1000000 output: 1M
- input: 2500000.34 output: 2.5M
- input: 532 output: 532
- input: 1123456789 output: 1.1B


## Usage

Make sure you have node.js and npm installed. Then install dependencies with

    npm install

and run tests with

    npm test
