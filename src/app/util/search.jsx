"use client"

import React, { useState, useEffect } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

import AutoComplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';



const SearchBox = ({ data, onSelect, placeholder, updateBox, margin }) => {


    const [value, setValue] = useState(null);


    // note: the id field is mandatory
    const items = [
        {
            id: 0,
            name: 'Cobol'
        },
        {
            id: 1,
            name: 'JavaScript'
        },
        {
            id: 2,
            name: 'Basic'
        },
        {
            id: 3,
            name: 'PHP'
        },
        {
            id: 4,
            name: 'Java'
        }
    ]

    const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        // console.log(string, results)
    }

    const handleOnHover = (result) => {
        // the item hovered
        // console.log(result)
    }

    const handleOnSelect = (item) => {
        // the item selected
        // console.log(item)

    }

    const handleOnFocus = () => {
        // console.log('Focused')
    }

    const formatResult = (item) => {
        return (
            <>
                {/* <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span> */}
                <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
            </>
        )
    }

    return (
        <div style={{ width: data?.width ? data.width : '288px', minHeight: '0px', height: '36px', margin: margin ? margin : '' }}>
            <AutoComplete
                // sx={{ height: '22px', padding: '1px' }}
                options={data.list}
                renderInput={(params) => {
                    let tempKey = params['key'];
                    delete params['key'];
                    return <TextField {...params} key={tempKey} placeholder={value?.label && updateBox ? value.label : placeholder ? placeholder : "Enter a pet"}
                    //  sx={{ height: '12px', padding: '0' }} 
                    />

                }}
                ListboxProps={{ style: { maxHeight: 150 } }}
                value={value}
                clearOnBlur={true}
                isOptionEqualToValue={(option, value) => {
                    if (value.id === -1) return false;
                    else {
                        return option.label === value.label;
                    }

                }
                }
                // inputValue='hi'
                onChange={(e, value) => {
                    if (!value) return;
                    onSelect(value);
                    if (!updateBox) {
                        // setValue({ label: '', id: -1 });
                    }
                    else {
                        setValue(value);

                    }
                }}
            />
        </div>
    )
}

export default SearchBox;