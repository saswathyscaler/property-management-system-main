import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const PropertyDetails = () => {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);

  console.log('Property ID:', propertyId); 

  useEffect(() => {
    console.log('Fetching property details...'); 
    // Fetch property details using API
    fetch(`http://localhost:7000/property/${propertyId}`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched property data:', data); 
        setProperty(data);
      })
      .catch(error => console.error('Error fetching property:', error));
  }, [propertyId]);

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link to="/property">Back to Property List</Link>
      <h2>{property.name}</h2>
      <img src={property.picture[0].url} alt={property.name} />
      <p>Price: ₹ {property.price}</p>
      <p>Location: {property.location}</p>
      <p>Description: {property.description}</p>
    </div>
  );
};

export default PropertyDetails;
