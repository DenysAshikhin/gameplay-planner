import React from 'react';
import './ItemSelection.css';
import { petNameArray, petNames, SORT_PET_EXPEDITION, SORT_PET_PORTAL, SORT_PET_SPECIAL, SORT_PET_WORLD } from './itemMapping';
import PetItem from '../expeditions/PetItem';

const ItemSelection = ({ selectedItems, onItemSelected, data, weightMap, defaultRank, showLocked, }) => {
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

    const renderPet = (petData) => {

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

        newPetArray = newPetArray.filter((e) => selectedItems.includes(e.petId))
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
            let num_a = Number((a[0] as any) * 10 + a[2]);
            let num_b = Number((b[0] as any) * 10 + b[2]);
            return num_a - num_b;
        }
        else {
            return a.localeCompare(b)
        }

        // if (a.startsWith('E')) {
        //     if (b.startsWith('E')) {

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
        // else if (b.startsWith('E')) {
        //     if (a.startsWith('E')) {
        //         let num_a = a[1] as any;
        //         let num_b = b[1] as any;

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
        // else {
        //     let num_a = Number((a[0] as any) * 10 + a[2]);
        //     let num_b = Number((b[0] as any) * 10 + b[2]);
        //     return num_a - num_b;
        // }
    })


    return (
        <div className="item-selection" style={{ overflowY: 'auto', maxHeight: 'calc(100% - 66px)', }}>
            {newPetArray.map(
                (petData) => {
                    const { petId } = petData;
                    const isItemSelected = isSelected(petId);

                    return (
                        <div
                            key={petId}
                            style={{ display: "flex", alignItems: 'center', justifyContent: 'center', margin: '0 3px' }}
                        >
                            <PetItem
                                petData={petData}
                                data={data}
                                isSelected={isItemSelected}
                                onClick={() => handleItemClick(petId)}
                                weightMap={weightMap}
                                defaultRank={defaultRank}
                                circleBorder={true}
                            />
                        </div>
                    );

                }

            )}
        </div>
    );
};

export default ItemSelection;
