import Decimal from 'break_infinity.js';
import mathHelper from './math';

var helper = {
    roundTwoDecimal: function (number) {
        return Math.round((number + Number.EPSILON) * 100) / 100;
    },
    sleep: async function (seconds) {
        return new Promise(r => setTimeout(r, seconds * 1000));
    },
    numberWithCommas: function (x) {
        return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    roundThreeDecimal: function (number) {
        return Math.round((number + Number.EPSILON) * 1000) / 1000;
    },
    roundFiveDecimal: function (number) {
        return Math.round((number + Number.EPSILON) * 100000) / 100000;
    },
    roundInt: function (num) {
        return Math.round((num + Number.EPSILON) * 1) / 1;
    },
    calculateLogarithm: function (base, x) {
        var a = Math.log(x);
        var b = Math.log(base);
        return a / b;
    },
    calcPOW: function (val) {
        return val.mantissa * Math.pow(10, val.exponent);
    },
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
    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
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