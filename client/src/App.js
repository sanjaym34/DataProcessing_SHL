import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Importing Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

import SearchBar from './components/SearchBar';
import Card from './components/Card';
import DetailsModal from './components/DetailsModal';

// Importing styles.css
import './styles.css';

function App() {
  // Using this useState to get the data that is present on the screen whenever it is rendered
  const [data, setData] = useState([]);
  
  // Using this useState to check if the card is clicked or not. If clicked, the data of the card will be loaded into this useState
  // and loaded into the Modal that pops up on clicking the card 
  const [selectedData, setSelectedData] = useState(null);

  // Using this useState to see if anything is searched in the search bar that is implemented 
  const [searchQuery, setSearchQuery] = useState('');

  // Rendering the page only once at the beginning using useEffect which will load all the data from the database when the page is loaded 
  useEffect( () => {
    axios.get('/api/data').then((response) => {
      setData(response.data);
    })
  }, []);

  console.log(data);

  // Filtering the data so that the first row is ignored as the first row is just the headings in the excel file 
  const filteredData = data.filter( (item) => 
  item.Title !== "Project.Title" );

  // Out of the filteredData, we need to make sure that when anything is search, all the data with the searched field should show up
  const searchFilteredData = filteredData.filter( (item) => {
    // All the fields that need to be searched 
    const fieldsToSearch = ['Title', 'Technologies', 'Frontend', 'Backend', 'Database', 'Infrastructure'];

    // Check if the query sent from the search box matches 
    return fieldsToSearch.some( (field) =>
    item[field] && item[field].toLowerCase().includes(searchQuery.toLowerCase()) 
    );
  });

  return (
    <div className='container'>
      {/* Within the container, there will 2 main components i.e. searchBar and all the cards */}
      <SearchBar onSearch={setSearchQuery} />

      {/* After the searchBar, display the cards in rows where each row contains some cards based on the width, padding of each card
      and the gap between cards. */}

      <div className='row'>
        {/* Traversed through the searchFilteredData and for each datapoint, created a card with the required styling */}
        {searchFilteredData.map((item) => (
          <div className='col-md-4' key={item._id}>
            <Card 
              data={item}
              onClick={() => setSelectedData(item)}
            />
          </div>
        ))}

        {/* If the card is clicked, selectedData is populated which will be checked and DetailsModal will be called */}
        {selectedData && (
          <DetailsModal
          data={selectedData}
          onClose={() => setSelectedData(null)}
        />
        )}
      </div>

    </div>
  );
}

export default App;
