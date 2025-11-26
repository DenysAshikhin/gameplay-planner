import Decimal, {DecimalSource} from 'break_infinity.js';
import {SimpleDecimal} from "@app/SimpleDecimal";


const isDecimalType = (number: SimpleDecimal | number | string): number is SimpleDecimal | Decimal => {
    return (number as any).mantissa || (number as any).mantissa === 0;
}

let e308;
const helper = {
    /**
     * Create a Decimal instance from a primitive number, string, or SimpleDecimal structure.
     * @param {SimpleDecimal | DecimalSource} number Input to convert.
     * @returns {Decimal} Decimal representation of the input.
     */
    createDecimal: function (number: SimpleDecimal | DecimalSource): Decimal {
        let deci = isDecimalType(number) ? new Decimal(`${number.mantissa}e${number.exponent}`) : new Decimal(number);

        return deci;
    },
    /**
     * Ensure the provided value is a Decimal, converting if necessary.
     * @param {SimpleDecimal | DecimalSource} number Value to normalize.
     * @returns {Decimal} Decimal instance for the value.
     */
    ensureDecimal: function (number: SimpleDecimal | DecimalSource): Decimal {
        if (number instanceof Decimal) {
            return number;
        }
        return this.createDecimal(number);
    },
    /**
     * Create a Decimal instance directly from a numeric string.
     * @param {string} number_string Numeric string to parse.
     * @returns {Decimal} Parsed Decimal instance.
     */
    createDecimalString: function (number_string: string): Decimal {
        let deci = new Decimal(number_string);
        return deci;
    },
    /**
     * Multiply two numbers while preserving Decimal precision.
     * @param {DecimalSource} a Multiplicand.
     * @param {DecimalSource} b Multiplier.
     * @returns {Decimal} Product as a Decimal.
     */
    multiplyDecimal: function (a: DecimalSource, b: DecimalSource): Decimal {
        return this.ensureDecimal(a).times(b);
    },
    /**
     * Divide two numbers while preserving Decimal precision.
     * @param {DecimalSource} a Dividend.
     * @param {DecimalSource} b Divisor.
     * @returns {Decimal} Quotient as a Decimal.
     */
    divideDecimal: function (a: DecimalSource, b: DecimalSource): Decimal {
        return this.ensureDecimal(a).dividedBy(b);
    },
    /**
     * Add two numbers while preserving Decimal precision.
     * @param {DecimalSource} a First addend.
     * @param {DecimalSource} b Second addend.
     * @returns {Decimal} Sum as a Decimal.
     */
    addDecimal: function (a: DecimalSource, b: DecimalSource): Decimal {
        return this.ensureDecimal(a).plus(b);
    },
    /**
     * Subtract one number from another while preserving Decimal precision.
     * @param {DecimalSource} a Minuend.
     * @param {DecimalSource} b Subtrahend.
     * @returns {Decimal} Difference as a Decimal.
     */
    subtractDecimal: function (a: DecimalSource, b: DecimalSource): Decimal {
        return this.ensureDecimal(a).minus(b);
    },
    /**
     * Compute the logarithm for a Decimal-compatible value.
     * @param {DecimalSource} number Value to evaluate.
     * @param {number} base Logarithm base.
     * @returns {Decimal} Logarithm result as a Decimal.
     */
    logDecimal: function (number: DecimalSource, base: number): Decimal {
        return this.createDecimal(this.ensureDecimal(number).log(base));
    },
    /**
     * Raise a Decimal-compatible value to a power.
     * @param {DecimalSource} number Base value.
     * @param {number | Decimal} exp Exponent.
     * @returns {Decimal} Result of exponentiation.
     */
    pow: function (number: DecimalSource, exp: number | Decimal): Decimal {
        return this.ensureDecimal(number).pow(exp);
    },
    /**
     * Return the lesser of two Decimal-compatible values.
     * @param {DecimalSource} number1 First value to compare.
     * @param {DecimalSource} number2 Second value to compare.
     * @returns {Decimal} Smallest value as a Decimal.
     */
    min: function (number1: DecimalSource, number2: DecimalSource): Decimal {
        const number1Decimal = this.ensureDecimal(number1);

        if (number1Decimal.greaterThan(number2)) {
            return this.ensureDecimal(number2);
        }

        return number1Decimal;
    },
    /**
     * Return the greater of two Decimal-compatible values.
     * @param {DecimalSource} number1 First value to compare.
     * @param {DecimalSource} number2 Second value to compare.
     * @returns {Decimal} Largest value as a Decimal.
     */
    max: function (number1: DecimalSource, number2: DecimalSource): Decimal {
        const number1Decimal = this.ensureDecimal(number1);
        const number2Decimal = this.ensureDecimal(number2);

        if (number1Decimal.greaterThan(number2)) {
            return number1Decimal;
        }

        return number2Decimal;
    },
    /**
     * Round a Decimal-compatible value to the nearest integer.
     * @param {DecimalSource} number1 Value to round.
     * @returns {Decimal} Rounded Decimal.
     */
    round: function (number1: DecimalSource): Decimal {
        return Decimal.round(number1);
    },
    /**
     * Convert the game's Oni time value to a Unix epoch timestamp in seconds.
     * @param {number} val Oni time value.
     * @returns {number} Corresponding epoch time.
     */
    oniTimeToEpoch: function (val: number): number {
        // Approximately number of seconds between 01-01-0001 and 01-01-1970
        return val - 62135596763;
    },
    /**
     * Convert an Oni time value to a JavaScript Date.
     * @param {number} oni_time Oni time value.
     * @returns {Date} Date object representing the timestamp.
     */
    oniTimeToDate: function (oni_time: number): Date {
        return new Date(this.oniTimeToEpoch(oni_time));
    }
};
e308 = helper.createDecimal('1e308');

export default helper;