import React, { useContext } from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButons';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, firbaseContext } from '../../store/firebaseContext';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

function Header() {

  const { user, setUser } = useContext(AuthContext)
  const { firebase } = useContext(firbaseContext)
  const navigate = useNavigate()

  const auth = getAuth(firebase)

  const handleLogout = async () => {
    signOut(auth)
    setUser(null)
    navigate('/login')
  }

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span>{user ? user.displayName : <Link to='/login'>Login</Link>}</span>
          <hr />
        </div>

        {user && <span onClick={handleLogout}>Logout</span>}

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span ><Link to='/create'>SELL</Link></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
