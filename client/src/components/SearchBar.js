import React from 'react';

// Importing Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Importing styles.css
import '../styles.css'


// Component for the implementation of the search bar
// This component will create a input tag and check if there is any input being given 
// If there is any change in the input field, it will run the function defined in the App.js which will return all the cards
// containing the searched query
function SearchBar({ onSearch }) {

    const handleChange = (searchedValue) => {
        onSearch(searchedValue.target.value)
    };

    return (
        <div className='mb-3'>
            <input
                type='text'
                className='form-control search'
                placeholder='Search....'
                onChange={handleChange}
            />
        </div>
    )

}

export default SearchBar;