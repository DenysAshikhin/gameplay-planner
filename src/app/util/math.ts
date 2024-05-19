import Decimal, {DecimalSource} from 'break_infinity.js';
import {SimpleDecimal} from "@app/SimpleDecimal";

const isDecimalType = (number: SimpleDecimal | number | string): number is SimpleDecimal | Decimal => {
    return (number as any).mantissa || (number as any).mantissa === 0;
}

const helper = {
    createDecimal: function (number: SimpleDecimal | DecimalSource): Decimal {
        let deci = isDecimalType(number) ? new Decimal(`${number.mantissa}e${number.exponent}`) : new Decimal(number);

        return deci;
    },
    ensureDecimal: function (number: SimpleDecimal | DecimalSource): Decimal {
        if (number instanceof Decimal) {
            return number;
        }

        return this.createDecimal(number);
    },
    createDecimalString: function (number_string: string): Decimal {
        let deci = new Decimal(number_string);
        return deci;
    },
    multiplyDecimal: function (a: DecimalSource, b: DecimalSource): Decimal {
        return this.ensureDecimal(a).times(b);
    },
    divideDecimal: function (a: DecimalSource, b: DecimalSource): Decimal {
        return this.ensureDecimal(a).dividedBy(b);
    },
    addDecimal: function (a: DecimalSource, b: DecimalSource): Decimal {
        return this.ensureDecimal(a).plus(b);
    },
    subtractDecimal: function (a: DecimalSource, b: DecimalSource): Decimal {
        return this.ensureDecimal(a).minus(b);
    },
    logDecimal: function (number: DecimalSource, base: number): Decimal {
        return this.createDecimal(this.ensureDecimal(number).log(base));
    },
    pow: function (number: DecimalSource, exp: number | Decimal): Decimal {
        return this.ensureDecimal(number).pow(exp);
    },
    min: function (number1: DecimalSource, number2: DecimalSource): Decimal {
        const number1Decimal = this.ensureDecimal(number1);

        if (number1Decimal.greaterThan(number2)) {
            return this.ensureDecimal(number2);
        }

        return number1Decimal;
    },
    max: function (number1: DecimalSource, number2: DecimalSource): Decimal {
        const number1Decimal = this.ensureDecimal(number1);
        const number2Decimal = this.ensureDecimal(number2);

        if (number1Decimal.greaterThan(number2)) {
            return number1Decimal;
        }

        return number2Decimal;
    },
    round: function (number1: DecimalSource): Decimal {
        return Decimal.round(number1);
    },
    oniTimeToEpoch: function (val: number): number {
        // Approximately number of seconds between 01-01-0001 and 01-01-1970
        return val - 62135596763;
    },
    oniTimeToDate: function (oni_time: number): Date {
        return new Date(this.oniTimeToEpoch(oni_time));
    }
};


export default helper;