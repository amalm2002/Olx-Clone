import { useContext, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home';
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Create from './Pages/Create'
import View from './Pages/ViewPost'
import { AuthContext, firbaseContext } from './store/firebaseContext';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Post from './store/PostContext';

function App() {

  const { user, setUser } = useContext(AuthContext)
  const { firebase } = useContext(firbaseContext)
  const auth = getAuth(firebase)
  useEffect(() => {
    const unsbscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
      } else {
        setUser(null)
      }
    })
    return () => unsbscribe()
  }, [auth, setUser])

  return (
    <div>
      <Post>
        <Router>
          <Routes>
            <Route path='/' element={user ? <Home /> : <Login />} />
            <Route path='/signup' element={user ? <Home /> : <Signup />} />
            <Route path='/login' element={user ? <Home /> : <Login />} />
            <Route path='/create' element={<Create />} />
            <Route path='/view' element={<View />} />
          </Routes>
        </Router>
      </Post>
    </div>
  );
}

export default App
