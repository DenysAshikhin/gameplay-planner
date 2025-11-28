import Decimal from 'break_infinity.js';
import mathHelper from './math';

var helper = {
    /**
     * Round a numeric value to two decimal places with epsilon adjustment to avoid floating point errors.
     * @param {number} number Value to round.
     * @returns {number} Rounded value with two decimal precision.
     */
    roundTwoDecimal: function (number) {
        return Math.round((number + Number.EPSILON) * 100) / 100;
    },
    /**
     * Pause execution for the provided duration.
     * @param {number} seconds Number of seconds to wait.
     * @returns {Promise<void>} Promise resolved after the delay.
     */
    sleep: async function (seconds) {
        return new Promise(r => setTimeout(r, seconds * 1000));
    },
    /**
     * Format a numeric string with comma separators for thousands.
     * @param {string} x Numeric string to format.
     * @returns {string} Comma-delimited representation.
     */
    numberWithCommas: function (x) {
        return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    /**
     * Round a numeric value to three decimal places.
     * @param {number} number Value to round.
     * @returns {number} Rounded value with three decimal precision.
     */
    roundThreeDecimal: function (number) {
        return Math.round((number + Number.EPSILON) * 1000) / 1000;
    },
    /**
     * Round a numeric value to five decimal places.
     * @param {number} number Value to round.
     * @returns {number} Rounded value with five decimal precision.
     */
    roundFiveDecimal: function (number) {
        return Math.round((number + Number.EPSILON) * 100000) / 100000;
    },
    /**
     * Round a numeric value to the nearest integer.
     * @param {number} num Value to round.
     * @returns {number} Rounded integer.
     */
    roundInt: function (num) {
        return Math.round((num + Number.EPSILON) * 1) / 1;
    },
    /**
     * Calculate a logarithm for a given base and value.
     * @param {number} base Base of the logarithm.
     * @param {number} x Value to evaluate.
     * @returns {number} Computed logarithm.
     */
    calculateLogarithm: function (base, x) {
        var a = Math.log(x);
        var b = Math.log(base);
        return a / b;
    },
    /**
     * Convert a {@link Decimal} value into its numeric equivalent.
     * @param {Decimal} val Decimal-like object with mantissa and exponent.
     * @returns {number} Converted numeric value.
     */
    calcPOW: function (val) {
        return val.mantissa * Math.pow(10, val.exponent);
    },
    /**
     * Convert seconds into a formatted duration string that includes units.
     * @param {number} seconds Total seconds to format.
     * @returns {string} Human-friendly duration with unit suffixes.
     */
    secondsToStringWithS: function (seconds) {
        let string = ``;

        let numDays = 0;

        let numHours = 0;
        let numMinutes = 0;
        let numSeconds = 0;

        numDays = Math.floor(seconds / (3600 * 24));
        numHours = Math.floor((seconds % (3600 * 24)) / 3600);
        numMinutes = Math.floor((seconds % 3600) / 60);
        numSeconds = this.roundInt((seconds % (3600 * 24)) % 60);

        if (numDays == Number.POSITIVE_INFINITY || numDays == Number.NEGATIVE_INFINITY) {
            return `` + numDays;
        }

        if (numSeconds === 60) {
            numSeconds = 0;
            numMinutes++;
        }
        if (numMinutes === 60) {
            numMinutes = 0;
            numHours++;
        }
        if (numHours === 24) {
            numHours = 0;
            numDays++;
        }

        if (numDays > 0) {
            string = string + `${numDays < 10 ? `0` + numDays : numDays}d:`
        }
        if (numHours > 0) {
            string = string + `${numHours < 10 ? `0` + numHours : numHours}h:`
        }
        if (numMinutes > 0) {
            string = string + `${numMinutes < 10 ? `0` + numMinutes : numMinutes}m:`
        }
        if (numSeconds > 0) {
            string = string + `${numSeconds < 10 ? `0` + numSeconds : numSeconds}s`
        }
        else {
            string = string + '0s';
        }

        return string;
    },
    /**
     * Convert seconds into a compact duration string omitting the trailing seconds suffix when days are present.
     * @param {number} seconds Total seconds to format.
     * @returns {string} Human-friendly duration without unit characters for shorter segments.
     */
    secondsToString: function (seconds) {
        let string = ``;
        let numDays = 0;
        let numHours = 0;
        let numMinutes = 0;

        numDays = Math.floor(seconds / (3600 * 24));
        numHours = Math.floor((seconds % (3600 * 24)) / 3600);
        numMinutes = this.roundInt((seconds % 3600) / 60);

        if (numMinutes === 60) {
            numMinutes = 0;
            numHours++;
        }
        if (numHours === 24) {
            numHours = 0;
            numDays++;
        }

        if (numDays == Number.POSITIVE_INFINITY || numDays == Number.NEGATIVE_INFINITY) {
            return `` + numDays;
        }

        if (numDays > 0) {
            string = string + `${numDays < 10 ? `0` + numDays : numDays}d:`;
            if (numHours === 0) {
                string = string + `00h`
            }
        }
        if (numHours > 0 || (numHours === 0 && numDays === 0)) {
            string = string + `${numHours < 10 ? `0` + numHours : numHours}h`;
        }
        if (numDays === 0) {

            string = string + `:`;

            if (numMinutes > 0) {
                string = string + `${numMinutes < 10 ? `0` + numMinutes : numMinutes}m`;
            }
            else {
                string = string + `0s`;
            }
        }

        return string;
    },
    /**
     * Break a duration in seconds into discrete day, hour, minute, and second components.
     * @param {number} seconds Total seconds to convert.
     * @returns {{days: number, hours: number, minutes: number, seconds: number}} Duration parts.
     */
    secondsToDuration(seconds) {
        const numDays = Math.floor(seconds / (3600 * 24));
        const numHours = Math.floor((seconds % (3600 * 24)) / 3600);
        const numMinutes = Math.floor((seconds % 3600) / 60);
        const numSeconds = this.roundInt((seconds % (3600 * 24)) % 60);
        return { days: numDays, hours: numHours, minutes: numMinutes, seconds: numSeconds }
    },
    bonusColorMap: {
        // 1001: { color: 'maroon' },
        // 1002: { color: 'orange' },
        // 1003: { color: 'purple' },
        1009: { color: 'cyan' },
        1010: { color: 'maroon' },
        1011: { color: 'purple' },
        1012: { color: 'yellow' },
        1013: { color: 'red' },
        1014: { color: 'blue' },
        1015: { color: 'gray' },
        1016: { color: 'green' }
    },
    /**
     * Calculate the average resource cost for each deal type in the provided data set.
     * @param {{ DealQueue: Array<{ CostResourceID: number, CostResourceIDSub?: number, CostValue: number }> }} data Deal queue containing cost information.
     * @returns {{ purchase_cost_map: Record<string, { id: number, subtype?: number, cost: Decimal, counter: number }>, average_cost_map: Array<{ id: number, subtype?: number, cost: Decimal, counter: number }> }} Aggregated cost totals and averages.
     */
    getAverageTradeCosts: function(data){
        let purchase_cost_map = {};
        data.DealQueue.forEach((inner_deal) => {
            const big_id = inner_deal.CostResourceIDSub ? `tier-` + inner_deal.CostResourceIDSub : inner_deal.CostResourceID;
    
            if (!purchase_cost_map[big_id]) {
                purchase_cost_map[big_id] = { id: inner_deal.CostResourceID, cost: mathHelper.createDecimal(0), counter: 0 };
                if (inner_deal.CostResourceIDSub) {
                    purchase_cost_map[big_id].subtype = inner_deal.CostResourceIDSub;
                }
            }
            purchase_cost_map[big_id].counter++;
            purchase_cost_map[big_id].cost = mathHelper.addDecimal(purchase_cost_map[big_id].cost, mathHelper.createDecimal(inner_deal.CostValue));
        });
    
        let average_cost_map = [];
        for (const [key, value] of Object.entries(purchase_cost_map)) {
            let temp = { ...(value as any) };
            temp.cost = mathHelper.divideDecimal(temp.cost, temp.counter);
            average_cost_map.push(temp);
        }
        return {purchase_cost_map, average_cost_map};
    },
    // @ts-ignore
    /**
     * Format a number with comma separators.
     * @param {string | number} x Value to format.
     * @returns {string} Comma-delimited string representation.
     */
    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    /**
     * Format a number or Decimal instance using exponential notation when large.
     * @param {number | Decimal} input Value to format.
     * @param {number} [precision=2] Decimal places or significant digits to retain.
     * @returns {string} Human-readable numeric string.
     */
    formatNumberString(input: number | Decimal, precision:number = 2)  {
        if (input == undefined || input == 0) {
            return Number(0).toFixed(precision);
        }
        if (typeof input == "number") {
            return input >= 100000 ? input.toExponential(precision) : helper.roundTwoDecimal(input).toFixed(precision);
        } else { //Decimal
            return input.exponent > 4 ? input.toExponential(precision) : helper.roundTwoDecimal(input.toNumber()).toFixed(precision);
        }
    }
}


export default helper;