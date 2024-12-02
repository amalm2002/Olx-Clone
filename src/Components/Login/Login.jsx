import React, { useContext, useEffect, useState } from 'react';
import Context, { AuthContext, firbaseContext } from '../../store/firebaseContext';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import Logo from '../../olx-logo.png';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';


function Login() {


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const { firebase } = useContext(firbaseContext)
  const auth = getAuth(firebase)

  const { user, setUser } = useContext(AuthContext)



  const handleLogin = async (e) => {
    e.preventDefault()


    try {
      const res = await signInWithEmailAndPassword(auth, email, password)
      console.log('login successfully.............');
      setUser(res)
      navigate('/')
    } catch (error) {
      console.log('login page error', error.message)
    }

  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to='/signup'>Signup</Link>
      </div>
    </div>
  );
}

export default Login;
