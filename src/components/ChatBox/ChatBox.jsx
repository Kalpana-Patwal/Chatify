import React from 'react'
import './ChatBox.css'
import profileImage from '../../assets/pic2.png'
import green from '../../assets/green_dot.png'
import Help from '../../assets/help_icon.png'
import Gallery from '../../assets/gallery_icon.png'
import Send from '../../assets/send_button.png'
import SendPic from '../../assets/pic1.png'
import SendPicOne from '../../assets/pic2.png'
const ChatBox = () => {
  return (
    <div className="chat-box">
      <div className="chat-user">
        <img src={profileImage} alt=""/>
        <p>Kalpana Patwal<img className='dot' src={green} alt=""/></p>
        <img src={Help} alt=""/>
      </div>
      <div className="chat-msg">
        <div className="s-msg">
          <p className="msg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit eveniet nostrum totam! Commodi, ducimus? Ad veniam tempora, cupiditate totam, nulla labore ea sit esse beatae veritatis natus ipsam ratione et!</p>
          <div>
            
            <img src={SendPic} alt=""/>
            <p>2:45 PM</p>
          
          </div>
        </div>

        <div className="s-msg">
          <img className="msg-img"src={SendPic} alt="" />
          <div>
            
            <img src={SendPicOne} alt=""/>
            <p>2:45 PM</p>
          
          </div>
        </div>
        <div className="r-msg">
          <p className="msg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit eveniet nostrum totam! Commodi, ducimus? Ad veniam tempora, cupiditate totam, nulla labore ea sit esse beatae veritatis natus ipsam ratione et!</p>
          <div>
            <img src={SendPic} alt=""/>
            <p>2:45 PM</p>
          
          </div>
        </div>
      </div>
      <div className="chat-input">
        <input type="text" placeholder="send a message" />
        <input type="file" id='image' accept='image/png,image/jpeg' hidden/>
        <label htmlFor="image">
        <img src={Gallery} alt=""/>
        </label>
        <img src={Send} alt=""/>
      </div>
      
    </div>
  )
}

export default ChatBox
