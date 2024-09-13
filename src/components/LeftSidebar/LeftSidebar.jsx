import React, { useContext, useState } from 'react'
import './LeftSidebar.css'
import logo from '../../assets/logo.png';
import menu_icon from '../../assets/menu_icon.png';
import search_icon from '../../assets/search_icon.png';
import profile from'../../assets/profile_alison.png'
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { AppContext } from '../../context/AppContext';


const LeftSidebar = () => {
  const navigate=useNavigate();
  const {userData}=useContext(AppContext);
  const [user,setUser]=useState(null);
  const[showSearch,setShowSearch]=useState(false);
  const inputHandler=async(e)=>{
    try {
      const input = e.target.value;
      if (input) {
        setShowSearch(true);
  
        // Ensure 'db' is initialized properly
        const userRef = collection(db, 'users');
        const q = query(userRef, where('username', '==', input.toLowerCase()));
        
        // Fetch the matching documents
        const querySnap = await getDocs(q);
        
        if (!querySnap.empty) {
          const matchedUser = querySnap.docs[0].data();
          if (matchedUser.id !== userData.id) {
            // Set the found user
            setUser(matchedUser);
          } else {
            setUser(null);
          }
        } else {
          setUser(null); // No user found
        }
      } else {
        setShowSearch(false); // Hide search results if input is empty
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
  
  return (
    <div className="ls">
      <div className="ls-top">
        <div className="ls-nav">
            <img src={logo} className='logo' alt="Loading"/>
            <div className="menu">
                <img src={menu_icon} alt="" />
                <div className="sub-menu">
                  <p onClick={()=>navigate('/profile')}>Edit Pofile</p>
                  <hr/>
                  <p>Logout</p>
                </div>
            </div>

        </div>
        <div className="ls-search">
            <img src={search_icon} alt=''/>
            <input  onChange={inputHandler}type="text" placeholder="Search Here..." />
        </div>
      </div>
      <div className='ls-list'>
        {
          showSearch && user?
          <div className="friends add-user">
            <img src={user.avatar} alt=""/>
            <p>{user.name}</p>
            </div>:Array(12).fill("").map((item,index)=>(  <div key={index}className="friends">
            <img src={profile} alt="" />
            <div>
                <p>Kalpana Patwal</p>
                <span>Hello,How are you</span>
            </div>
        </div>))
        }
    
      </div>
    </div>
  )
}

export default LeftSidebar
