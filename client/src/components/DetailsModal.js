import React from 'react';

// Importing Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Importing styles.css
import '../styles.css'

// Component defined to make sure that whenever the card is clicked, this components pops up displaying all the information 
// that the card will hold 
// Made use of a useState named [selectedData, setSelectedData] in App.js which makes sure that when the card is clicked,
// selectedData will be populated by the details of that card and then if the selectedData is not null, this component is called 
function DetailsModal({ data, onClose }) {
    return (
        <div className="modal" style={{ display: 'block'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{data.Title}</h5>
                <button
                  type="button"
                  className="close-button"
                  onClick={onClose}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
              {Object.keys(data).map((key) => (
                <p key={key}>
                    <strong>{key}: </strong> {data[key]}
                </p>
            ))}
              </div>
            </div>
          </div>
        </div>
    );
}

export default DetailsModal;