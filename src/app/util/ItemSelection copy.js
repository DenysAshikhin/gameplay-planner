import React from 'react';
import './ItemSelection.css';
import { petNameArray, petNames, SORT_PET_EXPEDITION, SORT_PET_PORTAL, SORT_PET_SPECIAL, SORT_PET_WORLD } from './itemMapping';
import PetItem from '../expeditions/PetItem';

const ItemSelection = ({ selectedItems, onItemSelected, data, weightMap, defaultRank, showLocked, manualEnabledPets, originalPets }) => {
    const isSelected = (petId) => {
        return selectedItems.includes(petId);
    };

    const handleItemClick = (petId) => {
        if (isSelected(petId)) {
            onItemSelected(selectedItems.filter((id) => id !== petId));
        } else {
            onItemSelected([...selectedItems, petId]);
        }
    };

    let newPetArray = [...petNameArray];
    newPetArray.splice(newPetArray.length - 1);
    let lastID = newPetArray[newPetArray.length - 1].petId;

    for (let i = lastID - 1; i < data.PetsCollection.length; i++) {
        if (data.PetsCollection[i].ID > lastID) {
            let temp = {
                ...petNames[9999],
                petId: data.PetsCollection[i].ID
            }
            newPetArray.push(temp)
        }
    }

    if (!showLocked) {
        newPetArray = newPetArray.filter((e) => ((selectedItems.includes(e.petId) && manualEnabledPets[e.petId] !== 0) || manualEnabledPets[e.petId] === 1))
    }

    newPetArray = newPetArray.sort((a_inner, b_inner) => {

        let a = a_inner.location;
        let b = b_inner.location;
        
        if(a_inner.sort != b_inner.sort) {
            return a_inner.sort - b_inner.sort;
        }
        else if(a_inner.sort == SORT_PET_EXPEDITION) {
            let num_a = a.length === 3 ? Number(a[1]) : Number(a[1] + a[2]);
            let num_b = b.length === 3 ? Number(b[1]) : Number(b[1] + b[2]);

            if (num_a === num_b) {
                return a[2].localeCompare(b[2])
            }
            else {
                return num_a - num_b;
            }
        }
        else if (a_inner.sort == SORT_PET_WORLD) {
            let num_a = Number((a[0]) * 10 + a[2]);
            let num_b = Number((b[0]) * 10 + b[2]);
            return num_a - num_b;
        }
        else {
            return a.localeCompare(b)
        }

        // if (a.includes('eag') && b.includes('eag')) {
        //     return a.localeCompare(b);
        // }
        // else if (a.includes('eag') && b.includes('Any')) {
        //     return -1;
        // }
        // else if (b.includes('eag') && a.includes('Any')) {
        //     return 1;
        // }
        // else if (a.includes('eag') && b.includes('E')) {
        //     return -1;
        // }
        // else if (b.includes('eag') && a.includes('E')) {
        //     return 1;
        // }
        // else if (a.includes('eag') || b.includes('eag')) {
        //     return 1;
        // }



        // if (a.includes('E')) {
        //     if (b.includes('E')) {

        //         let num_a = a.length === 3 ? Number(a[1]) : Number(a[1] + a[2]);
        //         let num_b = b.length === 3 ? Number(b[1]) : Number(b[1] + b[2]);

        //         if (num_a === num_b) {
        //             return a[2].localeCompare(b[2])
        //         }
        //         else {
        //             return num_a - num_b;
        //         }
        //     }
        //     else {
        //         return 1;
        //     }
        // }
        // else if (b.includes('E')) {
        //     if (a.includes('E')) {
        //         let num_a = a[1];
        //         let num_b = b[1];

        //         if (num_a === num_b) {
        //             throw new Error(`uncaught case for sorting`)
        //         }
        //         else {
        //             return num_a - num_b;
        //         }
        //     }
        //     else {
        //         return -1;
        //     }
        // }
        // else if (a.includes('Any') || b.includes('Any')) {
        //     if (a.includes('Any') && b.includes('Any')) {
        //         return a.localeCompare(b);
        //     }
        //     else if (a.includes('eag') && b.includes('Any')) {
        //         return -1;
        //     }
        //     else if (b.includes('eag') && a.includes('Any')) {
        //         return 1;
        //     }
        //     else if (a.includes('Any') && b.includes('E')) {
        //         return -1;
        //     }
        //     else if (b.includes('Any') && a.includes('E')) {
        //         return 1;
        //     }
        //     else if (a.includes("Any")) {
        //         return 1;
        //     }
        //     return -1;
        // }
        // else {
        //     let num_a = Number(a[0] * 10 + a[2]);
        //     let num_b = Number(b[0] * 10 + b[2]);
        //     return num_a - num_b;
        // }
    })



    return (
        <div style={{
            overflowY: 'auto',
            height: 'calc(100% - 56px)',
            backgroundColor: 'rgba(255,255,255,0.05)',
            display: 'flex',
            flexWrap: 'wrap',
            alignContent: 'flex-start',
            flex: '1',
        }}>
            {newPetArray.map(
                (petData) => {
                    const { petId } = petData;
                    const isItemSelected = isSelected(petId);

                    //Used to control the yellow border indicating a manual forcing to be on or off
                    let manualForce = false;
                    let origPet = originalPets.find((a) => a.ID === petId);
                    if (manualEnabledPets[petId] === 1 && !origPet) {
                        manualForce = true;
                    }
                    else if (!!origPet && manualEnabledPets[petId] === 0) {
                        manualForce = true;
                    }

                    return (
                        <div
                            key={petId}
                            style={{ display: "flex", alignItems: 'center', justifyContent: 'center', margin: '12px auto 0 auto', maxHeight: '84px' }}
                        >
                            <div style={{ margin: '0 3px' }}>

                                <PetItem
                                    petData={petData}
                                    data={data}
                                    isSelected={isItemSelected}
                                    onClick={() => handleItemClick(petId)}
                                    weightMap={weightMap}
                                    defaultRank={defaultRank}
                                    circleBorder={true}
                                    manualForce={manualForce}
                                />
                            </div>
                        </div>
                    );

                }

            )}
        </div>
    );
};

export default ItemSelection;
