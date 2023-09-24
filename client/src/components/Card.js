import React from 'react';

// Importing Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Importing styles.css
import '../styles.css'

// Component for the creation of card for each row that is existant 
// This component is called from the App.js
// Intially, for all the rows, this component will be called to get all the rows and the cards 
// Upon searching anything, only the cards containing the searched value will be shown 
function Card({ data, onClick }) {

    // data being passed will contain an _id and __v which are created by MongoDB so that each row can be uniquely identified
    // But those details need not be shown on the front end 
    // So, removing those 2 key-value pairs from the data 
    
    delete data._id;
    delete data.__v;

    return (
        <div className='card' onClick={onClick}>
            {/* Traverse the whole data and display all the information in the card */}
            {Object.keys(data).map((key) => (
                <p key={key}>
                    <strong>{key}: </strong> {data[key]}
                </p>
            ))}
        </div>
    );
}

export default Card;