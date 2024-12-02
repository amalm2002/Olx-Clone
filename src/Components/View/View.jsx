import React, { useContext, useEffect, useState } from 'react';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { firbaseContext } from '../../store/firebaseContext';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

function View() {
  const [userDetails, setUserDetails] = useState();
  const { postDetails } = useContext(PostContext);
  const { firebase } = useContext(firbaseContext);
  const db = getFirestore(firebase);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (postDetails && postDetails.userId) {
        try {
          const userRef = doc(db, 'users', postDetails.userId); 
          const userSnap = await getDoc(userRef); 
          if (userSnap.exists()) {
            setUserDetails(userSnap.data());
          } else {
            console.log('No such user found!');
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    };

    fetchUserDetails();
  }, [postDetails, db]);

  if (!postDetails) {
    return <div>Loading product details...</div>;
  }

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.imageURL}
          alt={postDetails.name}
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price}</p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>
            {postDetails.createdAt
              ? new Date(postDetails.createdAt.seconds * 1000).toDateString()
              : 'No date available'}
          </span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails ? userDetails.name : 'Loading...'}</p>
          <p>{userDetails ? userDetails.phone : 'Loading...'}</p>
        </div>
      </div>
    </div>
  );
}

export default View;
