import React from 'react';
import './ItemSelection.css';
import { petNameArray } from './itemMapping';
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
    let lastID = newPetArray[newPetArray.length - 1].petId;

    for (let i = lastID - 1; i < data.PetsCollection.length; i++) {
        if (data.PetsCollection[i].ID > lastID) {
            let temp = {
                img: '/images/pets/missing.png',
                location: '??-??',
                name: 'Unknown',
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

        if (a.includes('E')) {
            if (b.includes('E')) {

                let num_a = a.length === 3 ? Number(a[1]) : Number(a[1] + a[2]);
                let num_b = b.length === 3 ? Number(b[1]) : Number(b[1] + b[2]);

                if (num_a === num_b) {
                    return a[2].localeCompare(b[2])
                }
                else {
                    return num_a - num_b;
                }
            }
            else {
                return 1;
            }
        }
        else if (b.includes('E')) {
            if (a.includes('E')) {
                let num_a = a[1];
                let num_b = b[1];

                if (num_a === num_b) {
                    throw new Error(`uncaught case for sorting`)
                }
                else {
                    return num_a - num_b;
                }
            }
            else {
                return -1;
            }
        }
        else {
            let num_a = Number(a[0] * 10 + a[2]);
            let num_b = Number(b[0] * 10 + b[2]);
            return num_a - num_b;
        }
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
