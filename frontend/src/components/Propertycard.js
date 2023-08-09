import React from 'react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property, onEdit, onDelete }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md w-60">
      
        <h3 className="text-lg font-bold mb-2">{property.name}</h3>
        <img src={property.picture[0].url} className="w-44 h-28" alt="" />
    
      <p className="mb-2">
        <span className="font-bold">Price:</span> ₹ {property.price}
      </p>
      <p className="mb-2">
        <span className="font-bold">Location:</span> {property.location}
      </p>
      <p className="mb-2">
        <span className="font-bold">Description:</span> {property.description}
      </p>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default PropertyCard;
