import React from 'react';

const PhoneFilter = ({searchValue, onChange}) => {
    return (
        <div className="search-section">
            <strong>Search for a contact</strong>
            <input type="text" value={searchValue} onChange={onChange} />
        </div>
    );
}
 
export default PhoneFilter;