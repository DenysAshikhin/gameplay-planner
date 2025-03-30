import mathHelper from './math';

// number.Round(
//     (5.0 + currLevel * 5.0) *
//     mathHelper.pow(
//         mathHelper.min(1.0025, 1.00005 + mathHelper.max(0.0, currLevel / 500000.0)),
//         mathHelper.min(currLevel, 3000.0)
//     )
//     * mathHelper.pow(1.001, mathHelper.max(currLevel - 3000, 0.0))
//     * (1.0 + mathHelper.max(0.0, mathHelper.min(1.0, (currLevel - 1500) / 1000)))
//     * mathHelper.max(0.01, mathHelper.pow(0.95, mathHelper.max(mathHelper.logDecimal(data.TotalResidueBD + 1, 1.18) - 27.82, 0) * data.CowShopReincExpReduc))
//     * mathHelper.max(0.01, mathHelper.pow(0.975, mathHelper.max(mathHelper.logDecimal(data.TotalExpeditionHours + 100.0, 1.41) - 13.5, 0.0) * data.ExpeShopReincExpReducLevel))
// );

// Number.Round(
//     (5.0 + GM.PD.ReincarnationLevel * 5.0)
//     * Number.Pow(Number.Min(1.0025, 1.00005 + Number.Max(0.0, GM.PD.ReincarnationLevel / 500000.0)), Number.Min(GM.PD.ReincarnationLevel, 3000.0))
//     * Number.Pow(1.001, Number.Max(GM.PD.ReincarnationLevel - 3000, 0.0)) 
//     * (1.0 + Number.Max(0.0, Number.Min(1.0, (GM.PD.ReincarnationLevel - 1500) / 1000)))
//     * Number.Max(0.01, Number.Pow(0.95, Number.Max(Number.Log(GM.PD.TotalResidueBD + 1, 1.18) - 27.82, 0) * GM.PD.CowShopReincExpReduc))
//     * Number.Max(
//         0.01,
//         Number.Pow(
//             0.975,
//             Number.Max(Number.Log(GM.PD.TotalExpeditionHours + 100.0, 1.41) - 13.5, 0.0) * GM.PD.ExpeShopReincExpReducLevel)
//     )
// );dsadsddasds

let reincResidueMap = {
    totalResidueBD: mathHelper.createDecimal(-1),
    expAndCowStep: mathHelper.createDecimal(-1)
}
let reincEXP = {}

const helper = {

    calcRequiredReincExp: function (data) {
        let tempResidue = mathHelper.createDecimal(data.TotalResidueBD);
        if (tempResidue.notEquals(reincResidueMap.totalResidueBD)) {
            console.log(`regening reinc cache`)
            reincResidueMap.totalResidueBD = tempResidue;
            reincEXP = {};



            let residueAdd = mathHelper.addDecimal(mathHelper.createDecimal(data.TotalResidueBD), 1);
            let residueMax = mathHelper.max(
                mathHelper.subtractDecimal(mathHelper.logDecimal(residueAdd, 1.18), 27.82),
                0,
            );

            let cowStep = mathHelper.max(0.01,
                mathHelper.pow(
                    0.95,
                    mathHelper.multiplyDecimal(
                        residueMax,
                        data.CowShopReincExpReduc,
                    ),
                ),
            );

            let expAdd = data.TotalExpeditionHours + 100.0;
            let expLog = mathHelper.logDecimal(expAdd, 1.41);

            let expTokenStep = mathHelper.max(
                0.01, mathHelper.pow(0.975,
                    mathHelper.multiplyDecimal(
                        mathHelper.max(
                            mathHelper.subtractDecimal(expLog, 13.5), 0.0)
                        , data.ExpeShopReincExpReducLevel),
                ),
            );

            reincResidueMap.expAndCowStep = mathHelper.multiplyDecimal(cowStep, expTokenStep);

            // let portaLReductionLevel = 0.01 * data.portalShopLevels[18];


            // reincResidueMap.expAndCowStep =  mathHelper.pow(combinedCowTokenStep, 1.0 - portaLReductionLevel / 100);
        }
        // else{
        //     console.log(`skipping part of reinc calc`)
        // }



        let expAndCowStep = reincResidueMap.expAndCowStep;

        return (currLevel) => {

            if(reincEXP[currLevel]){
                return reincEXP[currLevel];
            }

            let step1 = 5 + currLevel * 5;
            let temp1 = mathHelper.max(0.0, currLevel / 500000.0);
            let step2 = mathHelper.min(1.0025, mathHelper.addDecimal(1.00005, temp1));
            let step3 = mathHelper.min(currLevel, 3000.0);

            let finalStep1 = mathHelper.multiplyDecimal(step1, mathHelper.pow(step2, step3));

            let step4Cont = mathHelper.pow(1.001, mathHelper.max(currLevel - 3000, 0.0));
            let step5 = mathHelper.addDecimal(1, mathHelper.max(0.0, mathHelper.min(1.0, (currLevel - 1500) / 1000)));

            let inner1 = mathHelper.multiplyDecimal(finalStep1, step4Cont);
            let finalStep2 = mathHelper.multiplyDecimal(inner1, step5);

            // let finalStep3 = mathHelper.multiplyDecimal(finalStep2, cowStep);
            // let finalStep4 = mathHelper.multiplyDecimal(finalStep3, expTokenStep);
            let combinedCowTokenStep = mathHelper.multiplyDecimal(finalStep2, expAndCowStep);

            //portal reduction simulation
            let portaLReductionLevel = 0.01 * data.portalShopLevels[18];
            // let finalStep5 = mathHelper.pow(finalStep4, 1.0 - portaLReductionLevel/100);
            let finalStep5 = mathHelper.pow(combinedCowTokenStep, 1.0 - portaLReductionLevel / 100);

            let finalRounded = mathHelper.round(finalStep5);

            reincEXP[currLevel] = finalRounded;

            return finalRounded;


            // return Round(
            // Pow(
            // (5.0 + level * 5.0) -> step1
            // * Pow(Min(1.0025, 1.00005 + Max(0.0, level / 500000.0)), Min(level, 3000)) -> step2
            //--- finalstep1
            // * Pow(1.001, Max(level - 3000, 0)) -> step4Cont
            // * (1 + Max(0, Min(1, (level - 1500) / 1000)))  -> step5
            // * Max(0.01, Pow(0.95, Max(Log(GM.PD.TotalResidueBD + 1, 1.18) - 27.82, 0) * GM.PD.CowShopReincExpReduc)) 
            // * Max(0.01, Pow(0.975, Max(Log(GM.PD.TotalExpeditionHours + 100.0, 1.41) - 13.5, 0.0) * GM.PD.ExpeShopReincExpReducLevel)), 
            // GM.POSH.boniList[6]
            // )
            // );
        }
    },
};

export default helper;