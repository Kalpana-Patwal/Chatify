import React from 'react'
import './RightSidebar.css'
import SendPicOne from '../../assets/pic2.png'
import green from '../../assets/green_dot.png'
import MediaPicOne from '../../assets/pic3.png'
import MediaPicTwo from '../../assets/pic4.png'
import MediaPicThree from '../../assets/pic1.png'
import MediaPicFour from '../../assets/profile_alison.png'
import MediaPicFive from '../../assets/profile_martin.png'
import { logout } from '../../config/firebase'
const RightSidebar = () => {
  return (
    <div className="rs">
      <div className="rs-profile">
        <img src={SendPicOne} alt="" />
        <h3>Kalpana Patwal<img src={green} className="dot" alt=""/></h3>
        <p>Hey I m using Chatify</p>
        
      </div>
      <hr/>
      <div className="rs-media">
        <p>Media</p>
        <div>
          <img src={MediaPicOne} alt=""/>
          <img src={MediaPicTwo} alt=""/>
          <img src={MediaPicThree} alt=""/>
          <img src={MediaPicFour}  alt=""/>
          <img src={MediaPicFive}  alt=""/>
        </div>
      </div>
   
    <button onClick={()=>logout()}>Logout</button>
      
    </div>
  )
}

export default RightSidebar
