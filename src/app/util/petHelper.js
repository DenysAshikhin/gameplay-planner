

import general_helper from './helper.js';
import { mainTeamSuggestions, reincTeamSuggestions, gearTeamSuggestions, statTeamSuggestions } from '../pets/teamSuggestions.js';
import { getPet, BonusMap } from "./itemMapping.js";

var helper = {
    EXP_DMG_MOD: .1,
    EXP_TIME_MOD: .05,
    SYNERGY_MOD_STEP: .25,
    EXP_TOKEN_MOD: 0.05,
    SOUL_CLOVER_STEP: 0.25,

    getPetIdsInExpeditionFromSaveFile: function (data) {
        const teams = data.ExpeditionTeam;
        const inUse = teams.filter((team) => team.InExpedition || team.AutoRestart);
        const ids = {};
        inUse.forEach((inner_val) => {
            inner_val.ExpeditionTeamID.forEach((inner_id) => {
                if (inner_id > 0) {
                    ids[inner_id] = inner_id;
                }
            })
        })
        // return inUse.flatMap((team) => team.ExpeditionTeamID.filter((id) => id != 0));
        return ids;
    },

    calculatePetBaseDamage: function (pet, defaultRank) {
        const rankCount = defaultRank ? defaultRank : pet?.Rank;
        const result = pet?.BaseDungeonDamage * (1.0 + rankCount * 0.05);
        return Number(result);
    },
    calculateBestHours: function (group, hours, tokenModifiers, combo) {

        let clover;
        let residueToken = tokenModifiers?.residueToken ? tokenModifiers.residueToken : 0;
        //contains clover and other                 contains active (special) bonuses
        let pd_token_bonus = tokenModifiers.data.ExpeditionTokenBonuses * tokenModifiers.data.ExpeditionResourceBonuses;
        if (!tokenModifiers.finalTokenBonus) {
            throw new Error(`out dated calc best hours call! Missing finalTokenBonus`)
        }

        const finalTokenBonus = tokenModifiers.finalTokenBonus;

        if (!hours) {
            hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        }
        if (!clover) {
            clover = tokenModifiers?.clover ? tokenModifiers.clover : 0;
        }
        if (!combo) {
            combo = 1.0
        }
        const overall = this.calculateGroupScore(group);

        //includes pet token gain 
        // const tokenHR = overall.tokenMult * pd_token_bonus * combo;
        const tokenHR = overall.tokenMult * finalTokenBonus;
        let best = { hours: -1, totalTokens: -1, floored: -1, effeciency: -1 };
        let bestArr = [];

        for (let i = 0; i < hours.length; i++) {
            let h = hours[i];
            let totalTokens = tokenHR + (1 / 3600) * tokenHR;//assuming 1hr runs
            let floored = Math.floor(totalTokens);
            let effeciency = floored / totalTokens;
            let wasted = totalTokens - floored;
            let wastedHR = wasted / h;
            let temp = { wastedHR: wastedHR, tokenHR: tokenHR + (1 / 3600) * tokenHR, wasted: wasted, hours: h, totalTokens: totalTokens, floored: floored, effeciency: effeciency };
            bestArr.push(temp);

            // if (effeciency > best.effeciency) {
            //     bestArr = [];
            //     best = { hours: h, totalTokens: totalTokens, floored: floored, effeciency: effeciency };
            //     bestArr.push(best);
            // }
            // else if (effeciency === best.effeciency) {
            //     best = { hours: h, totalTokens: totalTokens, floored: floored, effeciency: effeciency };
            //     bestArr.push(best);
            // }
        }

        // bestArr.sort((a, b) => { return a.wasted - b.wasted })

        // bestArr.sort((a, b) => {
        //     let a_waste = general_helper.roundThreeDecimal(a.wastedHR)
        //     let b_waste = general_helper.roundThreeDecimal(b.wastedHR)
        //     if (a_waste === b_waste) {
        //         return a.hours - b.hours;
        //     }
        //     return a_waste - b_waste;
        // })

        return bestArr;
    },
    calculateGroupScore: function (group, defaultRank) {
        let groupScore = 0;
        let dmgCount = 0;
        let timeCount = 0;
        let synergyBonus = 0;
        let baseGroupScore = 0;
        let cardPowerCount = 0;
        let expRewardCount = 0;
        let rpRewardCount = 0;
        let cardXpCount = 0;
        let tokenRewardCount = 0;
        let tokenMult = 0;
        let tokenModif = 0;
        const typeCounts = {};

        let groupScoreMax = 0;

        group.forEach((pet) => {
            groupScore += this.calculatePetBaseDamage(pet, defaultRank);
            groupScoreMax += this.calculatePetBaseDamage(pet, 0);
            if (pet.BonusList.some((bonus) => bonus.ID === 1013)) {
                dmgCount++;
            }
            if (pet.BonusList.some((bonus) => bonus.ID === 1010)) {
                cardPowerCount++;
            }
            if (pet.BonusList.some((bonus) => bonus.ID === 1011)) {
                expRewardCount++;
            }
            if (pet.BonusList.some((bonus) => bonus.ID === 1014)) {
                cardXpCount++;
            }
            if (pet.BonusList.some((bonus) => bonus.ID === 1012)) {
                timeCount++;
            }
            if (pet.BonusList.some((bonus) => bonus.ID === 1015)) {
                rpRewardCount++;
            }
            if (pet.BonusList.some((bonus) => bonus.ID === 1016)) {
                tokenRewardCount++;
            }

            // Count pet types
            if (typeCounts[pet.Type]) {
                typeCounts[pet.Type]++;
            } else {
                typeCounts[pet.Type] = 1;
            }
            if (pet.ID) synergyBonus += this.SYNERGY_MOD_STEP;
        });
        baseGroupScore = groupScore;
        const [earthType, airType] = Object.values(typeCounts);
        if (earthType > 0 && airType > 0) synergyBonus += this.SYNERGY_MOD_STEP;
        if (earthType > 1 && airType > 1) synergyBonus += this.SYNERGY_MOD_STEP;

        groupScore *= (1 + dmgCount * this.EXP_DMG_MOD);
        groupScoreMax *= (1 + dmgCount * this.EXP_DMG_MOD);
        groupScore *= (1 + timeCount * this.EXP_TIME_MOD);
        groupScoreMax *= (1 + timeCount * this.EXP_TIME_MOD);
        groupScore *= synergyBonus;
        groupScoreMax *= synergyBonus;

        tokenModif = tokenRewardCount * this.EXP_TOKEN_MOD;
        tokenMult = synergyBonus + synergyBonus * tokenModif;
        return {
            groupScore,
            baseGroupScore,
            groupScoreMax,
            dmgCount,
            timeCount,
            synergyBonus,
            cardPowerCount,
            expRewardCount,
            cardXpCount,
            rpRewardCount,
            tokenRewardCount,
            tokenModif,
            tokenMult
        };
    },

    compareGroupScore: function (target, compare) {
        if (target.groupScore != compare.groupScore) {
            return target.groupScore - compare.groupScore;
        }
        if (target.tokenRewardCount != compare.tokenRewardCount) {
            return target.tokenRewardCount - compare.tokenRewardCount;
        }
        if (target.dmgCount != compare.dmgCount) {
            return target.dmgCount - compare.dmgCount;
        }
        if (target.timeCount != compare.timeCount) {
            return target.timeCount - compare.timeCount;
        }
        if (target.cardPowerCount != compare.cardPowerCount) {
            return target.cardPowerCount - compare.cardPowerCount;
        }
        if (target.cardPowerCount != compare.cardPowerCount) {
            return target.cardPowerCount - compare.cardPowerCount;
        }
        if (target.expRewardCount != compare.expRewardCount) {
            return target.expRewardCount - compare.expRewardCount;
        }
        return 0;
    },

    getBestDamagePets: function (petsCollection, defaultRank, other) {
        let finalCollection = {};
        let bestDamagePets = JSON.parse(JSON.stringify(petsCollection));

        //As required + miscellenaous pets are added, keep track of top 4 strongest -> to prevent adding non-special weak pets
        //This really initially only stores required, exp dmg, exp time bonus pets
        let strongestGnd = [];
        let strongestAir = [];

        const updateStrongest = (pet) => {
            //Ground
            if (pet.Type === 1) {
                //No pets yet, just add it
                if (strongestGnd.length === 0) {
                    strongestGnd.push(pet);
                }
                //If there is 1, check if new is stronger than initial (if yes, make #1 -> #2, then add new to #1), else add it #2
                else if (strongestGnd.length === 1) {
                    if (this.calculatePetBaseDamage(strongestGnd[0], defaultRank) < this.calculatePetBaseDamage(pet, defaultRank)) {
                        strongestGnd[1] = strongestGnd[0];
                        strongestGnd[0] = pet;
                    }
                    else {
                        strongestGnd[1] = pet;
                    }
                }
                //Check if it is stronger than strongest
                else if (this.calculatePetBaseDamage(strongestGnd[0], defaultRank) < this.calculatePetBaseDamage(pet, defaultRank)) {
                    strongestGnd[1] = strongestGnd[0];
                    strongestGnd[0] = pet;
                }
                //Check if it is stronger than weakest
                else if (this.calculatePetBaseDamage(strongestGnd[1], defaultRank) < this.calculatePetBaseDamage(pet, defaultRank)) {
                    strongestGnd[1] = pet;
                }
            }
            //Air
            else if (pet.Type === 2) {
                //No pets yet, just add it
                if (strongestAir.length === 0) {
                    strongestAir.push(pet);
                }
                //If there is 1, check if new is stronger than initial (if yes, make #1 -> #2, then add new to #1), else add it #2
                else if (strongestAir.length === 1) {
                    if (this.calculatePetBaseDamage(strongestAir[0], defaultRank) < this.calculatePetBaseDamage(pet, defaultRank)) {
                        strongestAir[1] = strongestAir[0];
                        strongestAir[0] = pet;
                    }
                    else {
                        strongestAir[1] = pet;
                    }
                }
                //Check if it is stronger than strongest
                else if (this.calculatePetBaseDamage(strongestAir[0], defaultRank) < this.calculatePetBaseDamage(pet, defaultRank)) {
                    strongestAir[1] = strongestAir[0];
                    strongestAir[0] = pet;
                }
                //Check if it is stronger than weakest
                else if (this.calculatePetBaseDamage(strongestAir[1], defaultRank) < this.calculatePetBaseDamage(pet, defaultRank)) {
                    strongestAir[1] = pet;
                }
            }
        }

        let dmgOnlyPets = [];
        let requiredPets = {};
        let airDmgOnlyCount = 0;
        let gndDmgOnlyCount = 0;
        if (other)
            if (other.requiredPets) {
                for (let i = 0; i < other.requiredPets.length; i++) {
                    requiredPets[other.requiredPets[i].ID] = other.requiredPets[i];
                }
            }
        for (let i = 0; i < bestDamagePets.length; i++) {

            let cur = bestDamagePets[i];
            let added = false;
            for (let j = 0; j < cur.BonusList.length; j++) {
                let bonus = cur.BonusList[j];

                //Add any required pets to the list
                if (cur.ID in requiredPets) {
                    finalCollection[cur.ID] = cur;
                    added = true;
                }
                //Dng dmg bonus
                else if (bonus.ID === 1013) {
                    if (!finalCollection[cur.ID]) {
                        finalCollection[cur.ID] = cur;
                        added = true;
                    }
                }
                //Dng time bonus
                if (bonus.ID === 1012) {
                    if (!finalCollection[cur.ID]) {
                        finalCollection[cur.ID] = cur;
                        added = true;
                    }
                }
            }
            if (!added) {
                dmgOnlyPets.push(cur);
                if (cur.Type === 1) {
                    gndDmgOnlyCount++;
                }
                else {
                    airDmgOnlyCount++;
                }
            }
            //Since it was added, update strongest list
            else {
                updateStrongest(cur);
            }
        }

        const specialAir = strongestAir.length;
        const specialGnd = strongestGnd.length;
        let specialPets = strongestAir.concat(strongestGnd);

        //Add all the special pets to the required list
        for (let i = 0; i < specialPets; i++) {
            finalCollection[pet.ID] = specialPets[i];
        }

        //How many more pets of each type I need to find still (i.e. if I have a total of 1 air pets, then i need 3 ground)
        let extraGnd = 2;
        let extraAir = 2;

        if ((specialGnd + gndDmgOnlyCount) < 2) {
            extraAir += 2 - (specialGnd + gndDmgOnlyCount)
        }
        if ((specialAir + airDmgOnlyCount) < 2) {
            extraGnd += 2 - (specialAir + airDmgOnlyCount)
        }


        let sortGnd = false;
        let sortAir = false;

        //Go over remaining pure dmg pets, and find the top 4 (preferable 2gnd and 2air to put in to consider together with special pets)
        for (let i = 0; i < dmgOnlyPets.length; i++) {
            let pet = dmgOnlyPets[i];
            let dmg = this.calculatePetBaseDamage(pet, defaultRank);

            if (pet.Type === 1) {//Ground pet
                if (strongestGnd.length < extraGnd) {
                    strongestGnd.push(pet);
                    sortGnd = true;
                }
                else {
                    for (let j = 0; j < strongestGnd.length; j++) {
                        let innerPet = strongestGnd[j];
                        let innerDmg = this.calculatePetBaseDamage(innerPet, defaultRank);
                        if (dmg > innerDmg) {
                            strongestGnd[j] = pet;
                            sortGnd = true;
                            break;
                        }
                    }
                }
            }
            else {//Air pet
                if (strongestAir.length < extraAir) {
                    strongestAir.push(pet);
                    sortAir = true;
                }
                else {
                    for (let j = 0; j < strongestAir.length; j++) {
                        let innerPet = strongestAir[j];
                        let innerDmg = this.calculatePetBaseDamage(innerPet, defaultRank);
                        if (dmg > innerDmg) {
                            strongestAir[j] = pet;
                            sortAir = true;
                            break;
                        }
                    }
                }
            }


            //Make sure to sort in reverse order!! because i replace the first pet I beat (which needs to be the weakest one)
            if (sortGnd) {
                sortGnd = false;
                strongestGnd.sort((a, b) => this.calculatePetBaseDamage(a, defaultRank) - this.calculatePetBaseDamage(b, defaultRank));
            }
            if (sortAir) {
                sortAir = false;
                strongestAir.sort((a, b) => this.calculatePetBaseDamage(a, defaultRank) - this.calculatePetBaseDamage(b, defaultRank));
            }
        }

        //Make the updated list and add it all in, duplicates will just overwrite themselves so its fine
        specialPets = strongestAir.concat(strongestGnd);

        //Add all the special pets to the required list
        for (let i = 0; i < specialPets.length; i++) {
            finalCollection[specialPets[i].ID] = specialPets[i];
        }

        let finalPetsCollection = Object.values(finalCollection);
        finalPetsCollection.sort((a, b) => b.ID - a.ID);
        return finalPetsCollection;


        // //Sort remaining
        // dmgOnlyPets.sort((a, b) => this.calculatePetBaseDamage(b, defaultRank) - this.calculatePetBaseDamage(a, defaultRank));


        // let airTotal = 0;
        // let groundTotal = 0;
        // dmgOnlyPets.map((curr) => {
        //     if (curr.Type === 1) groundTotal++;
        //     if (curr.Type === 2) airTotal++;
        // })



        // let ground = 0;//type 1
        // let air = 0; //type 2
        // let counter = 0;

        // if (groundTotal < 2) {
        //     let ground = [];
        //     groundTotal = 0;
        //     dmgOnlyPets.map((cur) => {
        //         if (cur.Type === 1) {
        //             ground.push(cur);
        //             finalCollection[cur.ID] = cur;
        //             dmgOnlyPets = dmgOnlyPets.filter((current) => {
        //                 return current.ID !== cur.ID
        //             })
        //         }
        //     });
        // }
        // if (airTotal < 2) {
        //     let air = [];
        //     airTotal = 0;
        //     dmgOnlyPets.map((cur) => {
        //         if (cur.Type === 2) {
        //             air.push(cur);
        //             finalCollection[cur.ID] = cur;
        //             dmgOnlyPets = dmgOnlyPets.filter((current) => {
        //                 return current.ID !== cur.ID
        //             })
        //         }
        //     });
        // }


        // for (let i = 0; i < dmgOnlyPets.length; i++) {
        //     let cur = dmgOnlyPets[i];

        //     if (ground < 2 && cur.Type === 1 || airTotal <= 0) {


        //         //Check if we need to add current pet, or the strongestGnd are strong enough
        //         if (strongestGnd.length > 0) {
        //             let j = 0;
        //             while (strongestGnd.length > 0 && j <= strongestGnd.length) {
        //                 let stng = strongestGnd[j];
        //                 if (stng) {

        //                     if (this.calculatePetBaseDamage(stng, defaultRank) >= this.calculatePetBaseDamage(cur, defaultRank)) {
        //                         strongestGnd.splice(j, 1);
        //                         finalCollection[cur.ID] = cur;
        //                         ground++;
        //                         counter++;
        //                         j--;
        //                     }
        //                 }
        //                 j++;
        //             }
        //         }

        //         //Potentially 2 strongest are better than current, so don't add it if we added the other 2, or if there are no air and counter less than 3
        //         if (ground < 2 || (counter < 4 && airTotal <= 0)) {

        //             finalCollection[cur.ID] = cur;
        //             ground++;
        //             counter++;
        //             groundTotal--;
        //         }
        //     }

        //     else if (air < 2 && cur.Type === 2 || groundTotal <= 0) {

        //         //Check if we need to add current pet, or the strongestGnd are strong enough
        //         if (strongestAir.length > 0) {
        //             let j = 0;
        //             while (strongestAir.length > 0 && j <= strongestAir.length) {
        //                 let stng = strongestAir[j];
        //                 if (stng) {

        //                     if (this.calculatePetBaseDamage(stng, defaultRank) >= this.calculatePetBaseDamage(cur, defaultRank)) {
        //                         strongestAir.splice(j, 1);
        //                         finalCollection[cur.ID] = cur;
        //                         air++;
        //                         counter++;
        //                         j--;
        //                     }
        //                 }
        //                 j++;
        //             }
        //         }

        //         //Potentially 2 strongest are better than current, so don't add it if we added the other 2, or if there are no air and counter less than 3
        //         if (air < 2 || (counter < 4 && groundTotal <= 0)) {

        //             finalCollection[cur.ID] = cur;
        //             air++;
        //             counter++
        //             airTotal--;
        //         }
        //     }
        //     if (counter > 3) break;
        // }

        // let finalPetsCollection = Object.values(finalCollection);
        // finalPetsCollection.sort((a, b) => b.ID - a.ID);
        // return finalPetsCollection;
    },
    calcBestDamageGroup: function (PETSCOLLECTION, defaultRank, numGroups, other) {
        const k = 4; // Size of each group
        numGroups = numGroups ? numGroups : 7;
        numGroups = Number(numGroups);
        const memo = {};
        let failedFiltersObj = {};
        let petsMap = {};

        other = JSON.parse(JSON.stringify(other));

        for (let i = 0; i < PETSCOLLECTION.length; i++) {
            petsMap[PETSCOLLECTION[i].ID] = JSON.parse(JSON.stringify(PETSCOLLECTION[i]))
        }

        let activeBonuses = other?.activeBonuses;
        if (!activeBonuses) activeBonuses = [];

        const memoizedGroupScore = (group) => {
            const key = group.ID;
            if (!memo[key] || memo[key]) {
                let res = this.calculateGroupScore(group.team, defaultRank);
                let sum = res.tokenMult;
                memo[key] = { token: sum, damage: res.groupScore, other: res };
            }
            return memo[key];
        };

        let blackList = {};
        let whitelist = {};
        let whitelistRel = {};

        let lockedPets = {};
        let autoPets = {};
        let psuedoGroups = [];
        for (let i = 0; i < numGroups; i++) {
            psuedoGroups.push([]);
        }

        if (other?.petWhiteList) {
            for (let i = 0; i < other.petWhiteList.length; i++) {
                let cur = other.petWhiteList[i];
                if (cur.placement === 'blacklist') {
                    blackList[cur.id] = cur;
                }
                else if (cur.placement === 'team') {
                    if (psuedoGroups[cur.parameters.team]) {
                        whitelist[cur.id] = cur;
                        lockedPets[cur.id] = cur;
                        psuedoGroups[cur.parameters.team].push(cur);
                    }

                }
                else if (cur.placement === 'rel') {
                    whitelistRel[cur.id] = cur;
                }
            }

            //Go over any `auto placements and slot them in in a pseudo manner
            for (let i = 0; i < other.petWhiteList.length; i++) {
                let cur = other.petWhiteList[i];

                if (cur.placement === 'auto') {

                    for (let j = numGroups - 1; j >= 0; j--) {

                        let numGnd = 0;
                        let numAir = 0;

                        psuedoGroups[j].forEach((inner_pet) => {
                            if (inner_pet.pet.Type === 1) {
                                numGnd++;
                            }
                            if (inner_pet.pet.Type === 2) {
                                numAir++;
                            }
                        })

                        if (cur.pet.Type === 1 && numGnd > 1) {
                            continue;
                        }
                        if (cur.pet.Type === 2 && numAir > 1) {
                            continue;
                        }

                        if (psuedoGroups[j].length < k) {
                            cur.auto = true;
                            cur.parameters.team = j;
                            cur.placement = 'team';
                            whitelist[cur.id] = cur;
                            psuedoGroups[j].push(cur);
                            autoPets[cur.id] = cur;
                            break;
                        }
                    }
                }
            }
        }


        const getCombinationsInner = (array, k, bonusList) => {

            // let temp = [];
            let best = -1;

            //confirm there is enough gnd/air for perfect synergy
            let airTemp = 0;
            let groundTemp = 0;

            array.forEach((item) => {
                if (item.Type === 1) groundTemp++;
                else airTemp++;
            });

            let bad_synergy_allowed = true;
            if (airTemp > 1 && groundTemp > 1) {
                bad_synergy_allowed = false;
            }


            //Number of air/gnd pets that are manually placed -> default allow bad synergy
            let requiredAir = {};
            let requiredGnd = {};

            //Check num air and num ground relative pets from bonus
            let relAirTotalMap = {};
            let relGndTotalMap = {};


            for (let i = 0; i < bonusList.length; i++) {
                let bonus = bonusList[i];
                if (bonus.placement === 'team') {

                    if (!bonus.parameters.fake) {

                        if (bonus.pet.Type === 1 && !requiredGnd[bonus.pet.ID]) {
                            requiredGnd[bonus.pet.ID] = true;
                        }
                        else if (!requiredGnd[bonus.pet.ID]) {
                            requiredAir[bonus.pet.ID] = true;
                        }
                    }
                    else {
                        if (bonus.pet.Type === 2 && !relAirTotalMap[bonus.pet.ID]) {
                            relAirTotalMap[bonus.pet.ID] = true;
                        }
                        else if (!relGndTotalMap[bonus.pet.ID]) {
                            relGndTotalMap[bonus.pet.ID] = true;
                        }
                    }

                }
            }


            const f = (start, prevCombination) => {

                if (prevCombination.length > 0) {

                    let validTeam = true;
                    let fakeRel = 0;
                    let exact = 0;
                    const maxPets = 4;

                    //Check how many pets of each type are the correct rel ones
                    let currAir = 0;
                    let currGnd = 0;

                    //absolute number of each type of pet
                    let totalGnd = 0;
                    let totalAir = 0;


                    for (let j = 0; j < prevCombination.length; j++) {
                        let tempy = prevCombination[j];
                        if (tempy.Type === 1) {
                            totalGnd++;
                        }
                        else {
                            totalAir++;
                        }
                        if (tempy.Type === 1 && relGndTotalMap[tempy.ID]) {
                            currGnd++
                        }
                        else if (relAirTotalMap[tempy.ID]) {
                            currAir++
                        }
                    }


                    let reqAir = Object.entries(requiredAir).length;
                    let reqGnd = Object.entries(requiredGnd).length;
                    let relAirTotal = Object.entries(relAirTotalMap).length;
                    let relGndTotal = Object.entries(relGndTotalMap).length;

                    //Determine how many more `rel` of gnd/fly type are allowed based on how many hard (placement=group) there are
                    let airLimit = 2 > reqAir ? 2 - reqAir : 0;
                    let gndLimit = 2 > reqGnd ? 2 - reqGnd : 0;

                    let maxRel = 0;


                    //I can have a max of 2 air or 2 ground
                    // if i have any required air, number of relative air allowed is 2 - required
                    // if num relative air > 0 I need to make sure i have a an air, but less then the number above

                    //If there are any relative air pets required
                    if (relAirTotal > 0) {
                        let checkNum = relAirTotal < airLimit ? relAirTotal : airLimit;

                        if (currAir > airLimit) {
                            validTeam = false;
                        }
                        else if (currAir !== checkNum) {
                            validTeam = false;
                        }
                        else {
                            maxRel += checkNum;
                        }
                    }
                    if (relGndTotal > 0) {
                        let checkNum = relGndTotal < gndLimit ? relGndTotal : gndLimit;

                        if (currGnd > gndLimit) {
                            validTeam = false;
                        }
                        else if (currGnd !== checkNum) {
                            validTeam = false;
                        }
                        else {
                            maxRel += checkNum;
                        }
                    }

                    let airMaxIncrease = reqAir > 2 ? reqAir - 2 : 0;
                    let gndMaxIncrease = reqGnd > 2 ? reqGnd - 2 : 0;

                    if ((totalAir > (2 + airMaxIncrease) || totalGnd > (2 + gndMaxIncrease)) && !bad_synergy_allowed) {
                        validTeam = false;
                    }


                    if (validTeam) {

                        //First confirm the the combination satisfies all bonuses
                        for (let i = 0; i < bonusList.length; i++) {
                            let bonus = bonusList[i];
                            let pass = false;

                            //Pet being forcefull included, needs to be here
                            if (bonus.placement === 'team') {
                                let currCount = 0;
                                for (let j = 0; j < prevCombination.length; j++) {
                                    let pet = prevCombination[j];


                                    if (pet.ID === bonus.pet.ID) {

                                        //Fake means its a rel pet
                                        if (bonus.parameters.fake) {
                                            //Check if we have too many air/gnd pets before adding this one in

                                            // if (pet.Type === 1 && currGnd > gndLimit) {
                                            //     continue;
                                            // }
                                            // else if (currAir > airLimit) {
                                            //     continue;
                                            // }

                                            fakeRel++;
                                        }
                                        else {
                                            exact++;

                                            if (pet.Type === 1) {
                                                reqGnd++;
                                            }
                                            else {
                                                reqAir++;
                                            }
                                        }
                                        currCount++;
                                    }
                                }

                                if (currCount > 0) {
                                    // console.log(`we good`);
                                    pass = true;
                                }
                                else if (!bonus.parameters.fake) {
                                    // console.log(`we not good`);
                                    validTeam = false;
                                    pass = false;
                                    break;
                                }
                            }
                            //Meaning there are required pets that have to be in the comp
                            else if (bonus.requiredNumber > 0) {
                                let currCount = 0;

                                for (let j = 0; j < prevCombination.length; j++) {
                                    let pet = prevCombination[j];

                                    if (pet.BonusList.find((a) => a.ID === bonus.bonus.id)) {
                                        currCount++;
                                        exact++;
                                    }
                                }

                                if (currCount >= bonus.requiredNumber) {
                                    // console.log(`we good`);
                                    pass = true;
                                }
                                else {
                                    // console.log(`we not good`);
                                    validTeam = false;
                                    pass = false;
                                    break;
                                }
                            }
                            else if (bonus.exactNumber > -1) {
                                let currCount = 0;

                                for (let j = 0; j < prevCombination.length; j++) {
                                    let pet = prevCombination[j];

                                    if (pet.BonusList.find((a) => a.ID === bonus.bonus.id)) {
                                        currCount++;
                                        exact++;
                                    }
                                }

                                if (currCount === bonus.exactNumber) {
                                    // console.log(`we good`);
                                    pass = true;
                                }
                                else {
                                    // console.log(`we not good`);
                                    validTeam = false;
                                    pass = false;
                                    break;
                                }
                            }
                            //Meaning there is a `rel` filter active
                            else if (bonus.bonus.placement === 'rel') {
                                let currCount = 0;
                                let maxCounter = 0;

                                for (let j = 0; j < prevCombination.length; j++) {
                                    let pet = prevCombination[j];
                                    if (pet.BonusList.find((a) => a.ID === bonus.bonus.id)) {
                                        maxCounter++;
                                        fakeRel++;
                                    }
                                    // if (bonus.tempRequired > 0)
                                    //     if (bonus.tempRequiredPets.find((a) => a.ID === pet.ID)) {
                                    //         currCount++;
                                    //     }
                                }

                                if (maxCounter <= bonus.bonus.amount) {
                                    //Check that we have some of the required pets, but not exceeding the max amount
                                    if (bonus.tempRequired > 0) {
                                        if (

                                            (bonus.bonus.amount < bonus.tempRequired && maxCounter === bonus.bonus.amount) ||//max is < required (i.e. we could fit 4 but max is set to 2) -> ensure # pets === max
                                            (maxCounter >= bonus.tempRequired) //Max is >= required, ensure #pet >= required
                                        ) {
                                            // console.log(`we good`);
                                            pass = true;
                                        }
                                        else {
                                            // console.log(`we not good`);
                                            validTeam = false;
                                            pass = false;
                                            break;
                                        }
                                    }
                                    else {
                                        pass = true;
                                    }
                                }
                                //otherwise, ensure we don't exceed the maximum
                                else {
                                    validTeam = false;
                                    pass = false;
                                    break;
                                }
                            }
                            else if (bonus.placement === `relative`) {

                            }
                            //`eq` or `min` isn't active, but needs to reserve certain pets
                            if (bonus.tempMax || (bonus.tempMax === 0 && !bonus.disabled && bonus.disabled !== undefined)) {
                                let currCount = 0;

                                for (let j = 0; j < prevCombination.length; j++) {
                                    let pet = prevCombination[j];

                                    if (bonus.pets.find((a) => a.ID === pet.ID)) {
                                        currCount++;
                                    }

                                }

                                if (currCount <= bonus.tempMax) {
                                    // console.log(`we good`);
                                    pass = true;
                                }
                                else {
                                    // console.log(`we not good`);
                                    validTeam = false;
                                    pass = false;
                                    break;
                                }
                            }

                            if (pass) {
                                bonus.passed++;
                            }
                        }

                        //Check if we have all the req pets, and enough rel pets
                        if (maxRel > 0 && validTeam) {

                            //There are more recommended than we can fit, so just make sure he have enough
                            if (maxRel + exact > maxPets) {
                                maxRel = maxPets - exact;
                            }

                            if (fakeRel < maxRel) {
                                validTeam = false;
                            }
                            else {
                                validTeam = true;
                            }


                        }

                        if (validTeam) {
                            let id = '';
                            for (let i = 0; i < prevCombination.length; i++) {
                                id = id + prevCombination[i].ID;
                                if (i + 1 !== prevCombination.length) {
                                    id = id + ','
                                }
                            }
                            let x = { ID: id, team: prevCombination };
                            // temp.push(x);
                            if (best === -1) {
                                best = { ID: id, team: prevCombination, score: memoizedGroupScore(x) };
                            }
                            else {
                                let cur = memoizedGroupScore(x);
                                if (this.compareGroupScore(cur.other, best.score.other) > 0) {
                                    best = { ID: id, team: prevCombination, score: cur };
                                }
                            }
                        }
                    }
                }

                if (prevCombination.length === k) {
                    return;
                }
                for (let i = start; i < array.length; i++) {
                    f(i + 1, [...prevCombination, array[i]]);
                }
            };
            f(0, []);

            if (best.team)
                best.team.sort((a, b) => {
                    if (a.Type === b.Type) {
                        return a.ID - b.ID;
                    }
                    return a.Type - b.Type;
                })
            return best;
        }

        let time1 = new Date();
        let time2 = new Date();
        let time3 = new Date();
        let time4 = new Date();

        let bestGroups = [];

        let petsCollection = PETSCOLLECTION.filter((inner_pet) => {
            if (inner_pet.ID in whitelist) {
                whitelist[inner_pet.ID].pet = inner_pet;
            }
            return !(inner_pet.ID in blackList) && !(inner_pet.ID in whitelist)
        });


        for (let g = 0; g < numGroups; g++) {

            let remainingGroups = numGroups - g;
            let requiredPetsOverall = [];
            let requiredBonuses = {};

            let requiredPetBonusMap = {};
            let requiredPetsByBonus = [];

            let whiteListReqPets = [];

            for (const [key, value] of Object.entries(whitelist)) {
                if (value.parameters.team === g) {

                    if (!petsMap[value.pet.ID]) {
                        continue;
                    }

                    whiteListReqPets.push(value);
                    petsCollection.push(value.pet);
                    requiredPetsOverall.push(value.pet);
                }
            }

            if (activeBonuses.length > 0) {
                //NOTE later need to add logic to determine if a bonus met its criteria or not before adding!! (in the case of early termination like theres only enough for 2 teams, and its fully used)
                for (let j = 0; j < activeBonuses.length; j++) {
                    requiredBonuses[activeBonuses[j].id] = activeBonuses[j];
                    requiredPetBonusMap[activeBonuses[j].id] = { bonus: activeBonuses[j], pets: [], active: true };
                }



                petsCollection.forEach((currPet) => {
                    if (currPet.ID in blackList) return;
                    currPet.BonusList.forEach((currBonus) => {
                        if (currBonus.ID in requiredBonuses) {
                            if (requiredBonuses[currBonus.ID].placement === 'top') {
                                requiredPetsOverall.push(currPet);
                            }
                            requiredPetBonusMap[currBonus.ID].pets.push(currPet);
                        }
                    })
                });


                //Check the bonuses placement, and if it needs to be added (top is always active)
                for (let j = 0; j < activeBonuses.length; j++) {
                    let currBonus = requiredPetBonusMap[activeBonuses[j].id];

                    if (currBonus.bonus.placement === 'bottom') {
                        //Need to check that it is time to place these or not
                        let numPets = currBonus.pets.length;
                        let requiredGroups = 0;
                        let remainder;
                        let disabled = false;
                        let max = 0; // in case of min 1/team,  3 pets total among 3 groups, max is 1 - can not be 0 (is disabled)
                        switch (currBonus.bonus.equation) {
                            case 'min':
                                //If there are not enough pets to meet the min, then set the min to # of pets

                                //Not enough pets at all, do not reserve current pets
                                if (numPets < currBonus.bonus.amount) {
                                    remainder = 0;
                                    disabled = true;
                                }
                                else {
                                    //While the min is possible, we need to check whether we should silently enforce a max, to populate future groups
                                    // if (remainingGroups <= requiredGroups) {
                                    let maxTemp = remainingGroups * currBonus.bonus.amount;
                                    if (numPets <= maxTemp) {
                                        max = currBonus.bonus.amount;
                                    }
                                    // }

                                    remainder = numPets % currBonus.bonus.amount;
                                    numPets -= remainder;
                                    requiredGroups = numPets >= 0 ? Math.ceil(numPets / currBonus.bonus.amount) : 0;
                                }


                                break;
                            case 'max':

                                break;
                            case 'eq':
                                //Not enough pets at all, do not reserve current pets
                                if (numPets < currBonus.bonus.amount) {
                                    remainder = 0;
                                    disabled = true;
                                }
                                else {
                                    let maxTemp = remainingGroups * currBonus.bonus.amount;
                                    if (numPets <= maxTemp) {
                                        max = currBonus.bonus.amount;
                                    }
                                    remainder = numPets % currBonus.bonus.amount;
                                    numPets -= remainder;
                                    requiredGroups = currBonus.pets.length >= currBonus.bonus.amount ? Math.ceil(numPets / currBonus.bonus.amount) : 0;
                                }

                                break;
                            default:
                                break;
                        }

                        //Time to slot in the pets
                        if (remainingGroups <= requiredGroups) {
                            requiredPetBonusMap[currBonus.bonus.id].tempMax = max;
                            currBonus.pets.forEach((bonusPet) => {
                                requiredPetsOverall.push(bonusPet);
                            });
                        }
                        //If it's not time yet, check to see if we need to put a limit on a certain subset of pets from being slotted in
                        else {
                            let finalBonusPets = [];
                            //Need to ensure we don't reserve pets that are whitelisted to go into a certain team, if that team is now
                            for (let x = 0; x < requiredPetBonusMap[currBonus.bonus.id].pets.length; x++) {
                                let temp_curr = requiredPetBonusMap[currBonus.bonus.id].pets[x];
                                if (temp_curr.ID in whitelist) {
                                    if (whitelist[temp_curr.ID].placement === `team`) {
                                        if (whitelist[temp_curr.ID].parameters.team === g) {
                                            continue;
                                        }
                                    }
                                }
                                finalBonusPets.push(temp_curr);
                            }
                            requiredPetBonusMap[currBonus.bonus.id].pets = finalBonusPets;


                            requiredPetBonusMap[currBonus.bonus.id].active = false;//Only prevents enforcing the required pets pet team
                            requiredPetBonusMap[currBonus.bonus.id].tempMax = remainder;
                            requiredPetBonusMap[currBonus.bonus.id].disabled = disabled;
                        }
                    }

                    else if (currBonus.bonus.placement === 'top') {
                        let numPets = currBonus.pets.length;
                        let requiredGroups = 0;
                        let remainder;
                        let disabled = false;
                        let max = 0; // in case of min 1/team,  3 pets total among 3 groups, max is 1 - can not be 0 (is disabled)

                        let maxTemp = remainingGroups * currBonus.bonus.amount;
                        if (numPets <= maxTemp) {
                            max = currBonus.bonus.amount;
                        }
                        requiredPetBonusMap[currBonus.bonus.id].tempMax = max;
                    }
                }



                //Calculate how many pets are actually supposed to go into this team NOTE LATER also if they should even be added in the first place
                for (let j = 0; j < activeBonuses.length; j++) {
                    let temp = requiredPetBonusMap[activeBonuses[j].id];
                    if (!temp.active) continue;
                    let requiredNumber = 0;
                    let exactNumber = -1;
                    temp.hardFail = false;
                    switch (temp.bonus.equation) {
                        case 'min':
                            //If there are not enough pets to meet the min, then set the min to # of pets
                            // requiredNumber = temp.pets.length > temp.bonus.amount ? temp.bonus.amount : temp.pets.length
                            if (temp.bonus.amount > temp.pets.length) {
                                // FAILED filter
                                requiredNumber = 0;
                                temp.hardFail = true;
                            }
                            else
                                requiredNumber = temp.bonus.amount;

                            break;
                        case 'max':

                            break;
                        case 'eq':
                            // exactNumber = temp.pets.length > temp.bonus.amount ? temp.bonus.amount : temp.pets.length
                            if (temp.bonus.amount > temp.pets.length) {
                                // FAILED filter
                                exactNumber = -1;
                                temp.hardFail = true;
                            }
                            else
                                exactNumber = temp.bonus.amount;
                            break;
                        default:
                            break;
                    }

                    temp.requiredNumber = requiredNumber;
                    temp.exactNumber = exactNumber;
                }
            }

            //Get a subset of pets: the required based on bonuses, any that have dmgBonus or timeBonus, up to 4 more for max raw dungeonDamage
            let finalPetsCollection = this.getBestDamagePets(petsCollection, defaultRank, { requiredPets: requiredPetsOverall });

            //Mark every requiredBonus as failed (to check what passed at least once)
            for (const [key, value] of Object.entries(requiredPetBonusMap)) {
                value.passed = 0;
            }


            time1 = new Date();
            let ignoreCustomBonuses = false;//In the case whitelist is possible, but only with customs ignored
            let skipChecks = false;//If it fails no matter what, don't bother adding bonuses in for subsequent best team generation
            let bonusList = Object.values(requiredPetBonusMap);
            for (let j = 0; j < whiteListReqPets.length; j++) {
                bonusList.push(whiteListReqPets[j]);
            }
            let combinations = getCombinationsInner(finalPetsCollection, Math.min(k, finalPetsCollection.length), bonusList);
            time2 = new Date();
            console.log(`time to get combinations ${combinations.length}: ${(time2 - time1) / 1000} seconds`);

            //Check if we can create valid teams with only whitelist pets
            if (combinations === -1 && whiteListReqPets.length > 0) {

                bonusList = [];
                for (let j = 0; j < whiteListReqPets.length; j++) {
                    bonusList.push(whiteListReqPets[j]);
                }
                combinations = getCombinationsInner(finalPetsCollection, Math.min(k, finalPetsCollection.length), bonusList);
                if (combinations === -1) {
                    skipChecks = true;
                }
                else {
                    ignoreCustomBonuses = true;
                }
            }
            if (combinations === -1) {
                skipChecks = true;
            }


            let allPassed = true;
            //Check if any of the filters failed, and explain which + why
            for (const [key, value] of Object.entries(requiredPetBonusMap)) {
                if (!(key in failedFiltersObj)) {
                    if (!value.passed || value.hardFail) {
                        let tempMsg = `Filter failed on group ${g + 1}:\n`;

                        switch (value.bonus.equation) {
                            case `min`:
                                tempMsg += `not enough pets, min ${value.bonus.amount} but ${value.pets.length} remain`;
                                break;
                            case `max`:

                                break;
                            case `eq`:
                                tempMsg += `not enough pets, req. ${value.bonus.amount} but ${value.pets.length} remain`;
                                break;
                            default:
                                throw new Error(`impossible case`);
                        }
                        failedFiltersObj[key] = tempMsg
                        allPassed = false;
                    }
                }
            }

            //Meaning there are just no possible combinations
            if (skipChecks) {
                if (Object.values(requiredPetBonusMap).length > 0) {
                    if (!(`generic` in failedFiltersObj)) {
                        failedFiltersObj[`generic`] = `Individual filters all succeeded, but the combination of all is impossible starting group ${g + 1}`;
                    }
                }
                break;
            }
            //Only try rel, if it's possible (meaning don't skip custom bonuses)
            else if (!ignoreCustomBonuses) {

                let bestCurrTeamScore = this.calculateGroupScore(combinations.team, defaultRank);
                let score = bestCurrTeamScore.groupScore;

                let individualRel = Object.values(whitelistRel);

                if (activeBonuses.length > 0 || individualRel.length > 0) {
                    let added = false;

                    for (let j = 0; j < individualRel.length; j++) {
                        let curBonus = individualRel[j];
                        let mult = curBonus.parameters.damageBias / 100;
                        let cutOff = score * mult;

                        let tmLength = combinations.team.length;
                        let amountToAdd = 0;
                        let bonusPet = petsMap[curBonus.id];
                        let dmg = this.calculatePetBaseDamage(bonusPet, defaultRank);

                        if (!bonusPet) continue;

                        bonusPet.BonusList.forEach((e) => {
                            let modifiedAddition = 0;
                            //Dng dmg
                            if (e.ID === 1013) {
                                dmg *= (1 + this.EXP_DMG_MOD);
                                if (tmLength > 1) {
                                    //Get avg base group score, then remove 1, apply mult (iplier), apply modifier, add it
                                    modifiedAddition += ((bestCurrTeamScore.baseGroupScore / tmLength) * (tmLength - 1) * mult * (this.EXP_DMG_MOD));
                                    // modifiedAddition += (this.calculatePetBaseDamage(bonusPet, defaultRank) * 3 * mult * (this.EXP_DMG_MOD));
                                }
                                else {
                                    modifiedAddition = bestCurrTeamScore.baseGroupScore * mult * (this.EXP_DMG_MOD);
                                }
                                amountToAdd += modifiedAddition;
                            }
                            else if (e.ID === 1012) {
                                dmg *= (1 + this.EXP_TIME_MOD);
                                if (tmLength > 1) {
                                    //Get avg base group score, then remove 1, apply mult (iplier), apply modifier, add it
                                    modifiedAddition += (this.calculatePetBaseDamage(bonusPet, defaultRank) * 3 * mult * (this.EXP_TIME_MOD));
                                }
                                else {
                                    modifiedAddition = bestCurrTeamScore.baseGroupScore * mult * (this.EXP_TIME_MOD);
                                }
                                amountToAdd += modifiedAddition;
                            }
                        })

                        dmg += amountToAdd;

                        if (dmg > cutOff) {
                            added = true;

                            let newBonus = JSON.parse(JSON.stringify(curBonus));
                            // newBonus.placement = 'relative';
                            newBonus.placement = 'team';
                            newBonus.parameters.team = g;
                            newBonus.pet = bonusPet;
                            newBonus.parameters.fake = true;
                            //Since it is a single pet, and it *has* to be inserted now, we can hitchike off of the built in `whilteListReqPets` system
                            whiteListReqPets.push(newBonus)
                            //Add pet into list of pets to combine, if it's not already there
                            let exists = finalPetsCollection.find((a) => a.ID === bonusPet.ID);

                            if (!exists) {
                                finalPetsCollection.push(bonusPet);
                            }
                        }

                    }

                    for (let j = 0; j < activeBonuses.length; j++) {
                        let curBonus = activeBonuses[j];
                        let mult = curBonus.relThresh / 100;
                        let cutOff = score * mult;

                        let counterBonus = 0;
                        let innerAdded = false;
                        let temp = requiredPetBonusMap[curBonus.id];

                        if (curBonus.placement === 'rel') {


                            let bonusPets = temp.pets;

                            bonusPets.forEach((bonusPet) => {
                                let dmg = this.calculatePetBaseDamage(bonusPet, defaultRank);
                                let tmLength = combinations.team.length;
                                let amountToAdd = 0;
                                bonusPet.BonusList.forEach((e) => {
                                    let modifiedAddition = 0;
                                    //Dng dmg
                                    if (e.ID === 1013) {
                                        dmg *= (1 + this.EXP_DMG_MOD);
                                        if (tmLength > 1) {
                                            //Get avg base group score, then remove 1, apply mult (iplier), apply modifier, add it
                                            modifiedAddition += ((bestCurrTeamScore.baseGroupScore / tmLength) * (tmLength - 1) * mult * (this.EXP_DMG_MOD));
                                            // modifiedAddition += (this.calculatePetBaseDamage(bonusPet, defaultRank) * 3 * mult * (this.EXP_DMG_MOD));
                                        }
                                        else {
                                            modifiedAddition = bestCurrTeamScore.baseGroupScore * mult * (this.EXP_DMG_MOD);
                                        }
                                        amountToAdd += modifiedAddition;
                                    }
                                    else if (e.ID === 1012) {
                                        dmg *= (1 + this.EXP_TIME_MOD);
                                        if (tmLength > 1) {
                                            //Get avg base group score, then remove 1, apply mult (iplier), apply modifier, add it
                                            modifiedAddition += ((bestCurrTeamScore.baseGroupScore / tmLength) * (tmLength - 1) * mult * (this.EXP_TIME_MOD));
                                        }
                                        else {
                                            modifiedAddition = bestCurrTeamScore.baseGroupScore * mult * (this.EXP_TIME_MOD);
                                        }
                                        amountToAdd += modifiedAddition;
                                    }
                                })

                                dmg += amountToAdd;

                                if (dmg > cutOff) {
                                    added = true;
                                    innerAdded = true;
                                    temp.active = true;
                                    temp.tempMin = true;
                                    temp.tempRequired = temp.tempRequired !== 0 && temp.tempRequired ? temp.tempRequired + 1 : 1;

                                    if (!temp.tempRequiredPets) {
                                        temp.tempRequiredPets = [];
                                    }

                                    temp.tempRequiredPets.push(bonusPet);
                                    let exists = finalPetsCollection.find((a) => a.ID === bonusPet.ID);

                                    if (!exists) {
                                        finalPetsCollection.push(bonusPet);
                                        // exists = requiredPetsOverall.find((a) => a.ID === bonusPet.ID);
                                        // if (!exists) {
                                        //     requiredPetsOverall.push(bonusPet);
                                        // }
                                    }
                                }
                            })
                            if (!innerAdded) {
                                temp.tempMin = null;
                                temp.tempRequired = 0;

                                temp.tempRequiredPets = [];
                                temp.active = false;
                            }
                        }
                    }

                    //At least 1 rel pet was added, recalc teams with it
                    if (added) {
                        // finalPetsCollection = this.getBestDamagePets(petsCollection, defaultRank, { requiredPets: requiredPetsOverall });
                        time1 = new Date();
                        let bonusList = Object.values(requiredPetBonusMap);
                        for (let j = 0; j < whiteListReqPets.length; j++) {
                            // if (whiteListReqPets[j].placement === `relative`) {
                            //     // finalPetsCollection.push(whiteListReqPets[j].pet)
                            // }
                            // else {
                            bonusList.push(whiteListReqPets[j]);
                            // }
                        }
                        let combinations_rel = getCombinationsInner(finalPetsCollection, Math.min(k, finalPetsCollection.length), bonusList);
                        console.log(`got new combinations after the rel calcs`)

                        if (combinations_rel !== -1) {
                            //Only filter out the fake `rel` whitelisted pets, if they WERE selected by the combo
                            whiteListReqPets = whiteListReqPets.filter((e) => {
                                let temp = combinations_rel;
                                if (!e.parameters.fake) {
                                    return true;
                                }
                                else {
                                    let found = combinations_rel.team.find((inner_pet) => inner_pet.ID === e.id)
                                    return !found;
                                }

                            });
                        }

                        //Only hard crash in case of no backup team that is possible
                        if (combinations_rel === -1 && whiteListReqPets.length === 0) {

                            if (!(`generic` in failedFiltersObj)) {
                                failedFiltersObj[`generic`] = `Individual filters all succeeded, but the combination of all is impossible starting group ${g + 1} (too many relative pets in one team)`;
                            }
                            break;
                        }
                        else if (combinations_rel !== -1) {

                            combinations = combinations_rel;

                            //Also need to delete all the rel whitelists from future teams, only if they exist
                            for (let x = 0; x < bonusList.length; x++) {

                                if (bonusList[x].id in whitelistRel && combinations_rel.team.find((inner_pet) => inner_pet.ID === bonusList[x].id)) {
                                    delete whitelistRel[bonusList[x].id]
                                }
                            }
                        }
                    }
                }

                bestGroups.push(combinations.team);

                //remove whitelisted relative 
                for (let i = 0; i < combinations.team.length; i++) {
                    if (combinations.team[i].ID in whitelistRel) {
                        delete whitelistRel[combinations.team[i].ID]
                    }
                }

                petsCollection = petsCollection.filter((pet) => {

                    let res = true;
                    for (let i = 0; i < combinations.team.length; i++) {
                        if (combinations.team[i].ID === pet.ID) {
                            res = false;
                            break;
                        }
                    }

                    return res;
                }
                );
            }
            //Just use the best combination above
            else {

                bestGroups.push(combinations.team);

                //remove whitelisted relative 
                for (let i = 0; i < combinations.team.length; i++) {
                    if (combinations.team[i].ID in whitelistRel) {
                        delete whitelistRel[combinations.team[i].ID]
                    }
                }


                //Remove the pets
                petsCollection = petsCollection.filter((pet) => {

                    let res = true;
                    for (let i = 0; i < combinations.team.length; i++) {
                        if (combinations.team[i].ID === pet.ID) {
                            res = false;
                            break;
                        }
                    }

                    return res;
                }
                );
            }
        }
        time4 = new Date();
        console.log(`time to get best combo: ${(time4 - time3) / 1000} seconds`)
        if (other?.setFailedFilters) {
            other.setFailedFilters(failedFiltersObj);
        }

        // // Reset any auto placements back to proper auto for visual purposes
        // for (const [key, value] of Object.entries(autoPets)) {
        //     autoPets[key].placement = 'auto';
        // }


        let swapHappened = true;
        let numSwaps = -1;
        while (swapHappened) {
            numSwaps++;
            swapHappened = false;
            let copyGroups = JSON.parse(JSON.stringify(bestGroups));
            const maxSwaps = 2;

            // Go over each pet and bubble sort if possible
            for (let group_index = 0; group_index < copyGroups.length; group_index++) {
                let team = copyGroups[group_index];
                for (let pet_index = 0; pet_index < team.length; pet_index++) {
                    let pet = team[pet_index];
                    let swapPet = null;

                    let group = team;
                    let tooHigh = false;
                    let tooLow = false;

                    // This pet was placed by `group` by user, do not shift!
                    if (lockedPets[pet.ID]) {
                        continue
                    }


                    //Might not need this since things start low and go up
                    //First check if the pet should be on a lower team
                    //Do this by seeing if a swap gives a higher damage on current team
                    if (group_index < (bestGroups.length - 1)) {

                        let subsequentGroup = copyGroups[group_index + 1];
                        let triedPets = {};
                        let currentGroupScore = this.calculateGroupScore(group, defaultRank);

                        for (let i = 0; i < maxSwaps; i++) {
                            for (let j = 0; j < subsequentGroup.length; j++) {
                                let newPet = subsequentGroup[j];
                                if (newPet.Type === pet.Type && !triedPets[newPet.ID]) {
                                    triedPets[newPet.ID] = newPet;

                                    let newGroup = JSON.parse(JSON.stringify(team));
                                    newGroup[pet_index] = newPet;

                                    let newScore = this.calculateGroupScore(newGroup, defaultRank);

                                    // There is a better pet from lower team to grab!
                                    if (this.compareGroupScore(newScore, currentGroupScore) > 0) {
                                        tooHigh = true;
                                        // swapHappened = true;
                                    }
                                    break;
                                }
                            }
                        }
                    }



                    //Second check if the pet should be on a higher team
                    //Do this by seeing if a swap gives a higher damage on to the previous team
                    if (!tooHigh && group_index > 0) {

                        let currentCounter = group_index - 1;

                        while (currentCounter >= 0) {
                            let previousGroup = copyGroups[currentCounter];
                            let triedPets = {};
                            let currentGroupScore = this.calculateGroupScore(previousGroup, defaultRank);

                            for (let i = 0; i < maxSwaps; i++) {

                                for (let j = 0; j < previousGroup.length; j++) {
                                    let newPet = previousGroup[j];
                                    if (lockedPets[newPet.ID]) {
                                        continue;
                                    }
                                    if (newPet.Type === pet.Type && !triedPets[newPet.ID]) {
                                        // if (!triedPets[newPet.ID]) {
                                        triedPets[newPet.ID] = newPet;

                                        let newGroup = JSON.parse(JSON.stringify(previousGroup));
                                        newGroup[j] = pet;

                                        let newScore = this.calculateGroupScore(newGroup, defaultRank);

                                        // There is a better pet from lower team to grab!
                                        if (this.compareGroupScore(newScore, currentGroupScore) > 0) {
                                            tooLow = true;
                                            swapHappened = true;
                                            bestGroups[group_index][pet_index] = JSON.parse(JSON.stringify(newPet));
                                            bestGroups[currentCounter][j] = JSON.parse(JSON.stringify(pet));
                                        }
                                        break;
                                    }
                                    if (swapHappened) {
                                        break;
                                    }
                                }
                                if (swapHappened) {
                                    break;
                                }
                            }
                            if (swapHappened) {
                                break;
                            }
                            currentCounter--;
                        }

                    }
                    if (swapHappened) {
                        break;
                    }

                }
                if (swapHappened) {
                    break;
                }
            }
        }
        console.log(`num swaps: ${numSwaps}`);

        bestGroups.forEach((inner_group) => {
            inner_group.sort((a, b) => a.ID - b.ID);
            inner_group.sort((a, b) => a.Type - b.Type);
        })


        return bestGroups;
    },
    calcBestTokenGroup: function (petsCollection, defaultRank, numGroups, other) {
        const k = 4; // Size of each group

        numGroups = numGroups ? numGroups : 7;
        let damageMode = 1;//1 = max damage, 2 = min

        const memo = {};

        const memoizedGroupScore = (innerGroup) => {
            const key = innerGroup.ID;

            if (!memo[key] || memo[key]) {
                let res = this.calculateGroupScore(innerGroup.team, defaultRank);
                let sum = res.tokenMult;
                memo[key] = { token: sum, damage: res.groupScore, other: res };
            }
            return memo[key];
        };
        const getCombinationsInner = (array, k, requiredPetsObj) => {

            // let temp = [];
            let best = -1;


            const f = (start, prevCombination) => {

                let required = 0;
                let ignored = 0;
                let requiredPets = [];
                let ignoredPets = [];

                if (requiredPetsObj) {
                    required = requiredPetsObj.min ? requiredPetsObj.min : 0;
                    requiredPets = requiredPetsObj.pets ? requiredPetsObj.pets : [];
                    ignoredPets = requiredPetsObj.ignoredPets ? requiredPetsObj.ignoredPets : [];
                }

                let requiredFound = 0;
                if (prevCombination.length > 0) {
                    let id = '';
                    for (let i = 0; i < prevCombination.length; i++) {
                        id = id + prevCombination[i].ID;
                        if (i + 1 !== prevCombination.length) {
                            id = id + ','
                        }

                        if (required > 0) {
                            for (let x = 0; x < requiredPets.length; x++) {
                                if (prevCombination[i].ID == requiredPets[x].ID) requiredFound++;
                            }
                        }
                        if (ignoredPets.length > 0) {
                            for (let x = 0; x < ignoredPets.length; x++) {
                                if (prevCombination[i].ID == ignoredPets[x].ID) {
                                    ignored++;
                                }
                            }
                        }
                    }
                    if (requiredFound === required && ignored === 0) {
                        let x = { ID: id, team: prevCombination };
                        // temp.push(x);
                        if (best === -1) {
                            best = { ID: id, team: prevCombination, score: memoizedGroupScore(x) };
                        }
                        else {
                            let cur = memoizedGroupScore(x);

                            //Max damage
                            if (damageMode === 1) {
                                if (cur.damage > best.score.damage) {
                                    best = { ID: id, team: prevCombination, score: cur };
                                }
                            }
                            else {
                                if (cur.token === best.score.token) {
                                    // if (cur.other.tokenRewardCount === 4) {
                                    if (cur.other.tokenRewardCount > 0) {
                                        if (cur.damage < best.score.damage) {
                                            best = { ID: id, team: prevCombination, score: cur };
                                        }
                                    }
                                    else {
                                        if (cur.damage > best.score.damage) {
                                            best = { ID: id, team: prevCombination, score: cur };
                                        }
                                    }

                                }
                                else if (cur.token > best.score.token) {
                                    best = { ID: id, team: prevCombination, score: cur };
                                }
                            }
                        }
                    }
                    else {
                        let temper = 3;
                    }
                }

                if (prevCombination.length === k) {
                    return;
                }
                for (let i = start; i < array.length; i++) {
                    f(i + 1, [...prevCombination, array[i]]);
                }
            };
            f(0, []);

            if (best.team)
                best.team.sort((a, b) => {
                    if (a.Type === b.Type) {
                        return a.ID - b.ID;
                    }
                    return a.Type - b.Type;
                })

            return best;
        }

        let time3 = new Date();
        let time4 = new Date();

        let bestGroups = [];
        for (let g = 0; g < numGroups; g++) {
            let combinations = -1;

            let newPetsCollection = JSON.parse(JSON.stringify(petsCollection));
            let numTokens = 0;
            let avgTokenPetDmg = 0;
            let tokenPets = [];
            let maxDmgPet;
            let avgdMaxDmg = 0;
            let tknAir = 0;
            let tknGnd = 0;

            newPetsCollection.forEach((pet) => {
                pet.BonusList.forEach((bonus) => {
                    //token bonus
                    if (bonus.ID === 1016) {
                        tokenPets.push(pet);
                        avgTokenPetDmg += this.calculatePetBaseDamage(pet, defaultRank);
                        numTokens++;
                        if (pet.Type === 1) {
                            tknGnd++;
                        }
                        else if (pet.Type === 2) {
                            tknAir++;
                        }
                    }
                })
            });
            avgTokenPetDmg /= numTokens;

            newPetsCollection = this.getBestDamagePets(newPetsCollection, defaultRank, { requiredPets: tokenPets });

            newPetsCollection = newPetsCollection.sort((a, b) => this.calculatePetBaseDamage(b, defaultRank) - this.calculatePetBaseDamage(a, defaultRank));
            for (let i = 0; i < 2; i++) {
                avgdMaxDmg += this.calculatePetBaseDamage(newPetsCollection[i], defaultRank);
            }
            avgdMaxDmg /= 2;


            let bestDamageTeam = this.calcBestDamageGroup(newPetsCollection, defaultRank, 1)[0];

            avgdMaxDmg = bestDamageTeam ? this.calculateGroupScore(bestDamageTeam, defaultRank) : [];





            //Create a trash team first
            if (numTokens >= 4 && tknAir >= 2 && tknGnd >= 2) {
                //Only force 4 if there are enough for a full synergy
                damageMode = 2;//Set damage mode to min
                combinations = getCombinationsInner(newPetsCollection, Math.min(k, newPetsCollection.length), { pets: tokenPets, min: 4 });
                damageMode = 1;//Set damage back to max

            }
            //Only 1 token pet left,
            else if (numTokens === 1) {
                //If it's the last team, slot it in forcefully
                if (g === numGroups - 1) {
                    combinations = getCombinationsInner(newPetsCollection, Math.min(k, newPetsCollection.length),
                        { pets: tokenPets, min: tokenPets.length });
                }
                //
                else {
                    combinations = getCombinationsInner(newPetsCollection, Math.min(k, newPetsCollection.length));
                }
            }
            else if (numTokens > 1) {

                let percent = (100 - other.tokenDamageBias) / 100;
                let cutOff = percent * avgdMaxDmg.groupScore; //% of highest available pet's base damage          

                cutOff /= 5.75; // used for comparing with full team score


                let minPets = 2;
                if ((tknAir > 1 && tknGnd > 0) || (tknGnd > 1 && tknAir > 0)) {
                    minPets = 3;
                }
                let numTokenGroups = Math.ceil(numTokens / minPets);

                //Maximise this team, this turn
                if (numTokenGroups >= (numGroups - g)) {
                    //There are not enough groups for all token pets
                    if ((numTokenGroups - (numGroups - g)) >= 0) {
                        damageMode = 1;
                    }
                    else
                        damageMode = 2;

                    combinations = getCombinationsInner(
                        newPetsCollection,
                        Math.min(k, newPetsCollection.length),
                        { pets: tokenPets, min: minPets });
                    damageMode = 1;
                }
                else if (avgTokenPetDmg > cutOff) {

                    let remainingGroups = numGroups - g;
                    //There are not enough groups for all token pets
                    if ((remainingGroups - numTokenGroups) >= 0) {
                        damageMode = 1;
                    }
                    else
                        damageMode = 2;

                    //Maximise this team
                    combinations = getCombinationsInner(newPetsCollection, Math.min(
                        k,
                        newPetsCollection.length),
                        { pets: tokenPets, min: minPets });
                    damageMode = 1;
                }
                //Minimise this team, at the end
                else {
                    combinations = getCombinationsInner(
                        newPetsCollection,
                        Math.min(k, newPetsCollection.length),
                        {
                            pets: [],
                            min: 0,
                            ignoredPets: tokenPets
                        });
                }
            }
            //no token pets
            else {
                combinations = getCombinationsInner(newPetsCollection, Math.min(k, newPetsCollection.length));
            }


            if (combinations === -1) {
                break;
            }
            else {
                let temp = memoizedGroupScore(combinations);
                bestGroups.push(combinations.team);
                petsCollection = petsCollection.filter(
                    (pet) => {

                        let res = true;
                        for (let i = 0; i < combinations.team.length; i++) {
                            if (combinations.team[i].ID === pet.ID) {
                                res = false;
                                break;
                            }
                        }
                        return res;
                    }
                );
            }
        }
        time4 = new Date();
        console.log(`time to get best combo: ${(time4 - time3) / 1000} seconds`)
        // bestGroups.sort()
        return bestGroups;
    },
    findBestGroups: function (petsCollection, defaultRank, groupRankCritera, numGroups, other) {

        switch (groupRankCritera) {
            case 1: //damage focus
                return this.calcBestDamageGroup(petsCollection, defaultRank, numGroups, other);
            case 2: // token focus
                return this.calcBestTokenGroup(petsCollection, defaultRank, numGroups, other);
            case 3:
                return this.calcBestDamageGroup(petsCollection, defaultRank, numGroups, other);
        }
    },
    calcEquipBonus: function (pet, bonusInner) {

        let bonus = 1;
        let curr = pet;
        if (bonusInner.ID === 23) {

            if (curr.Level < 1) return 0;

            let x1 = general_helper.calculateLogarithm(1.1, curr.Level);
            let x2 = Math.max(0, x1 - 45);
            let x3 = Math.pow(1.15, x2);

            let x4 = general_helper.calculateLogarithm(1.1, curr.Rank);
            let x5 = Math.max(0, x4 - 45);
            let x6 = Math.pow(1.15, x5);

            let tot3 = ((1 + (24 + x3) * 0.01) * (1 + x6 * 0.01) - 1);
            bonus = tot3;
        }
        else if (bonusInner.ID === 28) {


            if (curr.Level < 1) return 0;

            let x1 = general_helper.calculateLogarithm(1.1, curr.Level);
            let x2 = Math.max(0, x1 - 45);
            let x3 = Math.pow(1.15, x2);

            let x4 = general_helper.calculateLogarithm(1.1, curr.Rank);
            let x5 = Math.max(0, x4 - 45);
            let x6 = Math.pow(1.15, x5);

            let tot3 = ((1 + (24 + x3) * 0.001) * (1 + x6 * 0.01) - 1);
            bonus = tot3;
        }
        else if (bonusInner.ID === 29) {

            if (curr.Level < 1) return 0;

            let x1 = general_helper.calculateLogarithm(1.1, curr.Level);
            let x2 = Math.max(0, x1 - 45);
            let x3 = Math.pow(1.15, x2);

            let x4 = general_helper.calculateLogarithm(1.1, curr.Rank);
            let x5 = Math.max(0, x4 - 45);
            let x6 = Math.pow(1.15, x5);

            let tot3 = ((1 + (24 + x3) * 0.0025) * (1 + x6 * 0.01) - 1);
            bonus = tot3;
        }
        else if (bonusInner.ID === 34) {

            if (curr.Level < 1) return 0;

            let x1 = general_helper.calculateLogarithm(1.1, curr.Level);
            let x2 = Math.max(0, x1 - 45);
            let x3 = Math.pow(1.125, x2);

            let x4 = general_helper.calculateLogarithm(1.1, curr.Rank);
            let x5 = Math.max(0, x4 - 45);
            let x6 = Math.pow(1.15, x5);

            let tot3 = ((1 + (9 + x3) * 0.00025) * (1 + x6 * 0.001) - 1);
            bonus = tot3;
        }
        else if (bonusInner.ID === 35) {

            if (curr.Level < 1) return 0;

            let x1 = general_helper.calculateLogarithm(1.1, curr.Level);
            let x2 = Math.max(0, x1 - 45);
            let x3 = Math.pow(1.125, x2);

            let x4 = general_helper.calculateLogarithm(1.1, curr.Rank);
            let x5 = Math.max(0, x4 - 45);
            let x6 = Math.pow(1.15, x5);

            let tot3 = ((1 + (9 + x3) * 5E-05) * (1 + x6 * 0.001) - 1);
            bonus = tot3;
        }
        else {//s
            let x1 = Math.pow(1.0 + bonusInner.Gain, curr.Level) - 1.0;
            let x2 = 1 + curr.Rank * 0.02;
            bonus = x1 * x2;
        }

        return bonus * 100;
    },
    populatePets: function (data, parameters) {
        let petList = {};
        let petBonusMap = {};

        let groundAllowed = parameters.ground;
        let airAllowed = parameters.air;
        let bannedPets = parameters.banned;
        let manualEnabledPets = parameters.manualEnabledPets ? parameters.manualEnabledPets : {};

        for (let i = 0; i < data.PetsCollection.length; i++) {
            let pet = data.PetsCollection[i];
            if (pet.ID === 0) continue;

            pet.name = getPet(pet.ID).name;

            if ((pet.Locked === 0 && manualEnabledPets[pet.ID] !== 1) || manualEnabledPets[pet.ID] === 0) {
                continue;
            }
            else if (!groundAllowed && pet.Type === 1) {
                continue;
            }
            else if (!airAllowed && pet.Type === 2) {
                continue;
            }
            else if (bannedPets[pet.ID]) {
                continue;
            }

            petList[pet.ID] = pet;
            pet.BonusList.forEach((e) => {
                if (!petBonusMap[e.ID]) {
                    petBonusMap[e.ID] = {};
                }
                petBonusMap[e.ID][pet.ID] = pet;
            })
        }
        return { petList, petBonusMap };
    },
    calcCurrentBonuses: function (groundPets, airPets) {
        let currentBonuses = {};
        for (let i = 0; i < groundPets.length; i++) {
            let pet = groundPets[i];
            pet.BonusList.forEach((e) => {
                if (!currentBonuses[e.ID]) {
                    currentBonuses[e.ID] = { ...e, count: 0, sum: 0 };
                }
                currentBonuses[e.ID].count++;
                currentBonuses[e.ID].sum += this.calcEquipBonus(pet, e);

            })
        }
        for (let i = 0; i < airPets.length; i++) {
            let pet = airPets[i];
            pet.BonusList.forEach((e) => {
                if (!currentBonuses[e.ID]) {
                    currentBonuses[e.ID] = { ...e, count: 0, sum: 0 };
                }
                currentBonuses[e.ID].count++;
                currentBonuses[e.ID].sum += this.calcEquipBonus(pet, e);
            })
        }
        return currentBonuses;
    },
    findBestTeam: function (data, parameters) {

        let res;
        let petList = {};
        let petBonusMap = {};
        let currentBonuses = {};
        let bannedPets = {};

        let groundPets = [];
        const groundLimit = data.SlotGround;
        let airPets = [];
        const airLimit = data.SlotAir;

        let priorities = parameters.priorityList ? parameters.priorityList : [];
        let priorityMap = parameters.priorityMap ? parameters.priorityMap : [];
        let petWhiteList = parameters.petWhiteList ? parameters.petWhiteList : {};
        const statMode = parameters.statMode ? parameters.statMode : false;
        const statModePets = parameters.statModePets ? parameters.statModePets : {};

        let tempArr = [];//
        for (let i = 0; i < priorities.length; i++) {
            let curr = priorities[i];
            tempArr.push({ ...priorityMap[curr], selectedPets: [] });
        }
        priorities = tempArr;

        // NOTE need to add counter for bonuses as well!!!
        for (const [key, value] of Object.entries(petWhiteList)) {
            if (value.mode === 'include') {


                //Meaning we don't have this pet unlocked 
                if (!value.BonusList) {
                    continue;
                }

                if (value.Type === 1 && groundPets.length < groundLimit) {
                    groundPets.push(value);
                }
                else if (value.Type === 2 && airPets.length < airLimit) {
                    airPets.push(value)
                }

                for (let j = 0; j < value.BonusList.length; j++) {
                    let found = priorities.find((cur_pri) => cur_pri.id === value.BonusList[j].ID);
                    if (found) {
                        found.current++;
                    }
                }

            }
            bannedPets[value.ID] = value;
        }


        res = this.populatePets(data, { manualEnabledPets: parameters.manualEnabledPets, ground: groundPets.length < groundLimit, air: airPets.length < airLimit, banned: bannedPets });
        petList = res.petList;
        petBonusMap = res.petBonusMap;
        currentBonuses = this.calcCurrentBonuses(groundPets, airPets);//s

        let selectedPetMap = {};
        for (let i = 0; i < priorities.length; i++) {
            selectedPetMap[priorities[i].id] = [];
        }


        while ((groundPets.length < groundLimit || airPets.length < airLimit) && Object.values(petList).length > 0) {

            // let currentPriority = priorities.shift();sssssssss

            let pets = [];
            let scoreTick = 1 / priorities.length;

            let scoreMode = 'unique';//unique || priorities
            let ignoreStat = {};
            let searchingForStat = false;

            for (let j = 0; j < priorities.length; j++) {



                if (priorities[j].count === 0 || (priorities[j].count === priorities[j].current)) {
                    ignoreStat[priorities[j].id] = priorities[j];
                }
                else if (priorities[j].count > 0 && (priorities[j].count !== priorities[j].current) && statMode) {
                    searchingForStat = true;
                }
                else if ((priorities[j].count > priorities[j].current) || (priorities[j].count === -1)) {
                    scoreMode = 'priorities';
                }
            }

            for (const [ID, value] of Object.entries(petList)) {
                let pet = { ...value, score: 0, bonuses: [], sharedBonuses: [] };
                if (bannedPets[ID]) {
                    continue;
                }
                // if (pet.name.toLowerCase() === 'fujin' || pet.name.toLowerCase() === 'abby') {
                if (pet.name.toLowerCase() === 'zack' || pet.name.toLowerCase() === 'garuda') {
                    let bigsad = -1;
                }
                pet.BonusList.forEach((e) => {

                    if ((ignoreStat[e.ID] && !statMode) || (e.ID >= 1000)) {
                        return;
                    }

                    if (scoreMode === 'priorities') {
                        let found = false;

                        for (let j = 0; j < priorities.length; j++) {

                            //If we are in stat mode, only get points for any -1 if you are in one of the main/gear/reinc teams
                            if (searchingForStat === true && statMode === true && priorities[j].count === -1) {
                                if (pet.ID in statModePets) {
                                    let bigsad = -1;
                                }
                                else {
                                    continue;
                                }
                            }

                            if (priorities[j].id === e.ID && (priorities[j].count > priorities[j].current || priorities[j].count === -1)) {

                                found = true;
                                pet.bonuses.push(priorities[j]);

                                pet.score += scoreTick * (priorities.length - j);
                                break;
                            }
                        }


                        if (statMode && !found) {
                            //give marginal bonus based on how far down the stat is
                            let index_temp = priorities.findIndex((stat_to_find) => {
                                return stat_to_find.id === e.ID;
                            });
                            if (index_temp === -1) {
                                return;
                            }
                            pet.score += 0.001 * ((priorities.length - index_temp) / priorities.length);
                        }
                        else if (!found) {
                            if (currentBonuses[e.ID]) {
                                pet.score += (scoreTick / (10 * (currentBonuses[e.ID].count + 1)));
                            }
                            else {
                                pet.score += (scoreTick / 10);
                            }
                        }
                    }
                    //Search for uniques!
                    else {
                        if (ignoreStat[e.ID] || e.ID >= 1000) {

                        }
                        else if (currentBonuses[e.ID]) {
                            pet.score += ((0.01) / (currentBonuses[e.ID].count + 1));
                            pet.sharedBonuses.push(BonusMap[e.ID]);
                        }
                        else {
                            pet.score += 1;
                            pet.bonuses.push(BonusMap[e.ID]);
                        }
                    }
                });
                pet.score = general_helper.roundFiveDecimal(pet.score);
                pets.push(pet);
            }


            pets.sort((a, b) => {
                let diff = b.score - a.score;
                if (diff === 0) {
                    if (b.Rank !== a.Rank) {
                        return b.Rank - a.Rank;
                    }
                    if (diff === 0) {
                        diff = b.Level - a.Level;
                    }
                }
                return diff
            });
            let bestPet = pets[0];


            //Add pet counters to each priority bonus:
            for (let j = 0; j < bestPet.BonusList.length; j++) {
                let found = priorities.find((cur_pri) => cur_pri.id === bestPet.BonusList[j].ID);
                if (found) {
                    found.current++;
                }
            }

            if (bestPet.Type === 1) {
                groundPets.push(bestPet);
            }
            else {
                airPets.push(bestPet);
            }
            bannedPets[bestPet.ID] = bestPet;

            res = this.populatePets(data, { manualEnabledPets: parameters.manualEnabledPets, ground: groundPets.length < groundLimit, air: airPets.length < airLimit, banned: bannedPets });
            petList = res.petList;
            petBonusMap = res.petBonusMap;
            currentBonuses = this.calcCurrentBonuses(groundPets, airPets);
        }



        let numBonuses = 0;
        for (const [key, value] of Object.entries(currentBonuses)) {
            numBonuses++;
            value.label = BonusMap[key].label;
        }

        return [airPets, groundPets, currentBonuses, selectedPetMap];
    }
}



export default helper;