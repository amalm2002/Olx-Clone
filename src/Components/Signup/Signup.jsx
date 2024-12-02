import React, { useState, useContext, useEffect } from 'react';

import Logo from '../../olx-logo.png';

import './Signup.css';
import Context, {firbaseContext, AuthContext} from '../../store/firebaseContext';
import { getAuth,createUserWithEmailAndPassword,updateProfile } from 'firebase/auth';
import {getFirestore,doc,setDoc} from 'firebase/firestore'
import { useNavigate,Link } from 'react-router-dom';


export default function Signup() {

  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userPhoneNo, setUserPhoneNo] = useState('')
  const [error,setError]=useState({})
  const navigate=useNavigate()

  const { firebase } = useContext(firbaseContext)

 const {user,setUser}=useContext(AuthContext)

 const newErrors={}

 const validateForm=()=>{
  if (!userName) {
    newErrors.userName='UserName is required'
  }
  if (!userPassword) {
    newErrors.userPassword='UserPassword is required'
  }
  if (!userEmail) {
    newErrors.userEmail='UserEmail is required'
  }
  if (!userPhoneNo) {
    newErrors.userPhone='UserPhone-No is required'
  }

  setError(newErrors)
  return Object.keys(newErrors).length===0
 }

  const handleSubmit =async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      const auth = getAuth(firebase)
      const db= getFirestore(firebase)

      const userCredential =await createUserWithEmailAndPassword(auth,userEmail,userPassword)

      await updateProfile(userCredential.user,{displayName:userName})

      const userData={
        uid:userCredential.user.uid,
        name:userName,
        email:userEmail,
        phone:userPhoneNo
      }

      await setDoc(doc(db,'users',userCredential.user.uid),userData)

      console.log('User data saved successfully.............', userData);

      setUser(userData)

      // navigate('/login')
      navigate('/')
      
    } catch (error) {
      console.error('Error during signup:', error.message);
    }
    console.log(firebase);
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            name="name"
          />
          {/* {error.userName && <span className='error' style={{color:'red'}}>{error.userName}</span>} */}
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          {/* {error.userEmail && <span className='error' style={{color:'red'}}>{error.userEmail}</span>} */}
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            value={userPhoneNo}
            onChange={(e) => setUserPhoneNo(e.target.value)}
          />
          {/* {error.userPhone && <span className='error' style={{color:'red'}}>{error.userPhone}</span>} */}
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
          {/* {error.userPassword && <span className='error' style={{color:'red'}}>{error.userPassword}</span>} */}
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to='/login'>Login</Link>
      </div>
    </div>
  );
}
