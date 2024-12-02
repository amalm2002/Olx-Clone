import React, { useContext, useEffect, useState } from 'react';
import Heart from '../../assets/Heart';
import './Post.css';
import { firbaseContext } from '../../store/firebaseContext';
import { getFirestore, collection, getDocs, orderBy } from 'firebase/firestore';
import {PostContext } from '../../store/PostContext';
import { useNavigate } from 'react-router-dom';


function Posts() {

  const { firebase } = useContext(firbaseContext)
  const [products, setProducts] = useState([])
  const db = getFirestore(firebase)
  const {setPostDetails}=useContext(PostContext)
  const navigate=useNavigate()

  useEffect(() => {

    const getProducts = async () => {
      try {

        const data=await getDocs(collection(db,'products'))
        
        console.log(data,'data is here');
     
        setProducts(data.docs.map((doc)=>({
          ...doc.data(),
          id:doc.id
        })))

      } catch (error) {
        console.error('Error fetching products:', error);
        alert('error for fetching the products on firebase')
      }
    }

    getProducts()  

  }, [db])

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">

          { products.map ((product,index)=>(
      
            <div className="card"
             key={product.id}
             onClick={() => {
              console.log('Setting Post Details:', product);
              setPostDetails(product); 
              navigate('/view');
            }}
            >
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                 <img src={product.imageURL} alt={product.name} />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name"> {product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt
                    ? new Date(product.createdAt.seconds * 1000).toDateString()
                    : 'No date available'}</span>
              </div>
            </div>

            ))}

        </div>
      </div>
    </div>
  );
}

export default Posts;
