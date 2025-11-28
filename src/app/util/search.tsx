"use client"

import React, { useState, useEffect } from 'react';

import AutoComplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

type SearchBoxOptions = {
    data,
    onSelect: (value: any) => void,
    placeholder?: string,
    updateBox?: boolean,
    margin?: string,
};

/**
 * Displays a searchable autocomplete input for selecting items from a provided list.
 *
 * @param {SearchBoxOptions} props - Configuration for the search box component.
 * @returns {JSX.Element} Rendered autocomplete input.
 */
const SearchBox = ({ data, onSelect, placeholder, updateBox, margin }: SearchBoxOptions) => {


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

    /**
     * Handle search term updates from the autocomplete component.
     * @param {string} string - Current search string.
     * @param {any[]} results - Matching results for the term.
     */
    const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        // console.log(string, results)
    }

    /**
     * Handle hover events over individual autocomplete results.
     * @param {any} result - The currently hovered result item.
     */
    const handleOnHover = (result) => {
        // the item hovered
        // console.log(result)
    }

    /**
     * Handle selection of an autocomplete option.
     * @param {any} item - The chosen item from the list.
     */
    const handleOnSelect = (item) => {
        // the item selected
        // console.log(item)

    }

    /**
     * Handle focus events for the autocomplete input field.
     */
    const handleOnFocus = () => {
        // console.log('Focused')
    }

    /**
     * Provide a formatted element for rendering autocomplete options.
     * @param {{ id: number, name: string }} item - Item being rendered.
     * @returns {JSX.Element} Renderable display for the option.
     */
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
                ListboxProps={{ style: { maxHeight: 550 } }}
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