import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { firbaseContext, AuthContext } from '../../store/firebaseContext'; 
import { getFirestore, collection, addDoc } from 'firebase/firestore'; 
import { useNavigate } from 'react-router-dom';

const Create = () => {

  const { firebase } = useContext(firbaseContext); 
  const { user } = useContext(AuthContext); 
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    setLoading(true);
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'first_upload_cloudinary'); 
    data.append('cloud_name', 'duhfekfy2');

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/duhfekfy2/image/upload', {
        method: 'post',
        body: data,
      });
      const uploadedImage = await res.json();
      setImageURL(uploadedImage.url); 
      console.log('Image uploaded:', uploadedImage.url);
    } catch (err) {
      console.error('Error uploading image:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!name || !category || !price || !imageURL) {
      alert('Please fill in all fields and upload an image.');
      return;
    }

    try {
      const db = getFirestore(firebase); 
      const docRef = await addDoc(collection(db, 'products'), {
        name,
        category,
        price: parseFloat(price),
        imageURL,
        userId: user.uid, 
        userName: user.displayName || 'Anonymous',
        createdAt: new Date(),
      });
      console.log('Document written with ID:', docRef.id);
      alert('Product added successfully!');
      navigate('/')
    } catch (err) {
      console.error('Error adding document:', err);
      alert('Failed to add product. Please try again.');
    }
  };
  return (
    <Fragment>
      <Header />
      <div className="centerDiv">
        <label htmlFor="name">Name</label>
        <br />
        <input
          className="input"
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label htmlFor="category">Category</label>
        <br />
        <input
          className="input"
          type="text"
          id="category"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <br />
        <label htmlFor="price">Price</label>
        <br />
        <input
          className="input"
          type="number"
          id="price"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />
        <br />
        {loading ? (
          'Uploading...'
        ) : (
          <img alt="Preview" width="200px" height="200px" src={imageURL} />
        )}
        <br />
        <input type="file" onChange={handleFileUpload} />
        <br />
        <button type="button" onClick={handleSubmit} className="uploadBtn">
          Upload and Submit
        </button>
      </div>
    </Fragment>
  );
};

export default Create;

