import Decimal from 'break_infinity.js';
var helper = {
    createDecimal: function (number) {
        let deci = number.mantissa || number.mantissa === 0 ? new Decimal(`${number.mantissa}e${number.exponent}`) : new Decimal(number);

        return deci;
    },
    createDecimalString: function(number_string){
        let deci =  new Decimal(number_string);
        return deci;
    },
    multiplyDecimal: function (a, b) {
        a = a.mantissa || a.mantissa === 0 ? a : this.createDecimal(a);
        return a.times(b);
    },
    divideDecimal: function (a, b) {
        a = a.mantissa || a.mantissa === 0 ? a : this.createDecimal(a);
        return a.dividedBy(b);
    },
    addDecimal: function (a, b) {
        a = a.mantissa || a.mantissa === 0 ? a : this.createDecimal(a);
        return a.plus(b);
    },
    subtractDecimal: function (a, b) {
        a = a.mantissa || a.mantissa === 0 ? a : this.createDecimal(a);
        return a.minus(b);
    },
    logDecimal: function (number, base) {
        number = number.mantissa || number.mantissa === 0 ? number : this.createDecimal(number);
        return this.createDecimal(number.log(base));
    },
    pow: function (number, exp) {
        number = number.mantissa || number.mantissa === 0 ? number : this.createDecimal(number);
        return number.pow(exp);
    },
    min: function (number1, number2) {
        number1 = number1.mantissa || number1.mantissa === 0 ? number1 : this.createDecimal(number1);
        number2 = number2.mantissa || number2.mantissa === 0 ? number2 : this.createDecimal(number2);

        if (number1.greaterThan(number2)) {
            return number2;
        }
        return number1;
    },
    max: function (number1, number2) {
        number1 = number1.mantissa || number1.mantissa === 0 ? number1 : this.createDecimal(number1);
        number2 = number2.mantissa || number2.mantissa === 0 ? number2 : this.createDecimal(number2);

        if (number1.greaterThan(number2)) {
            return number1;
        }
        return number2;
    },
    round: function(number1){
        number1 = number1.mantissa || number1.mantissa === 0 ? number1 : this.createDecimal(number1);
        return Decimal.round(number1);
    }
}


export default helper;