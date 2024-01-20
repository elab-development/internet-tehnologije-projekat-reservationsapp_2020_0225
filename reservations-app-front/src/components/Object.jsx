import React, { useState, useEffect } from 'react';
import '../CSS/Object.css';


function Object({ objectId, name, manager, text, city, image, loggedInUser, updateobject, deleteobject }) {
  
  //promenljiva za komentare niz i ono sto se unese kao komentar
  const [reviews, setReviews] = useState([]);
  const [reviewInput, setReviewInput] = useState('');

  // Dobijanje reviewa iz local storage-a prilikom mount-ovanja komponente
  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem(`objectreviews-${objectId}`));
    setReviews(storedReviews || []);
  }, [objectId]);

  //za obradu reviewa
  const handleReview = () => {
    if (reviewInput.trim() !== '') {
      const newReview = `${loggedInUser}: ${reviewInput}`;
      setReviews([...reviews, newReview]);
      setReviewInput('');
      localStorage.setItem(`objectreviews-${objectId}`, JSON.stringify([...reviews, newReview]));
    }
  };

  //za brisanje i update objecta
  const [updatedText, setUpdatedText] = useState(text);

  const handleUpdate = () => {
    updateobject(objectId, { manager, text: updatedText, city });
  };

  const handleDelete = () => {
    deleteobject(objectId);
  };

  return (
    <div className="object">
      <div className="object-header">
      <p> {name}</p>
      </div>
      <p>Menadzer objekta za rezervaciju: {manager}</p>
      <p>Lokacija: {city}</p>
      <p className="object-text">{text}</p>
      {image && <img src={image} alt="Object" className="object-image" />}
      <div className="object-actions">
      </div>
      <input
        type="text"
        value={reviewInput}
        onChange={(e) => setReviewInput(e.target.value)}
        placeholder="Add a review..."
        className="review-input"
      />
      <button onClick={handleReview}>Review</button>
      <div className="object-reviews">
        {reviews.map((review, index) => (
          <p key={index}>{review}</p>
        ))}
      </div>
      {/* Dugmad za ažuriranje i brisanje */}
      {updateobject && deleteobject && (  // Uslovni prikaz dugmadi
        <div className="update-object-section">
        <h3 className="update-object-title">UPDATE OBJECT:</h3>
        <input
          type="text"
          className="update-object-input"
          value={updatedText}
          onChange={(e) => setUpdatedText(e.target.value)}
          placeholder="Enter text for object..."
        />
        <div className="update-object-buttons">
          <button className="update-button" onClick={handleUpdate}>
            UPDATE
          </button>
          <button className="delete-button" onClick={handleDelete}>
            DELETE
          </button>
        </div>
      </div>
      )}
    </div>
  );
}

export default Object;