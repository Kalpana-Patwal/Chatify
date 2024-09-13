import React, { useState, useEffect, useContext } from 'react';
import './ProfileUpdate.css';
import Avatar from '../../assets/avatar_icon.png';
import Message from '../../assets/message.png';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import upload from '../../lib/upload';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from '../../context/AppContext';

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(false);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [uid, setUid] = useState(''); 
  const [prevImage, setPrevImage] = useState('');
  const {setUserData}=useContext(AppContext);

  const profileUpdate = async (event) => {
    event.preventDefault();
    try {
      if (!uid) {
        toast.error("User ID is missing");
        return; // Stop if UID is missing
      }

      if (!prevImage && !image) {
        toast.error("Upload Profile Picture");
        return;
      }

      const docRef = doc(db, 'users', uid); // Ensure uid is passed as a string

      if (image) {
        const imgUrl = await upload(image);
        setPrevImage(imgUrl);
        await updateDoc(docRef, {
          avatar: imgUrl,
          bio: bio,
          name: name,
        });
      } else {
        await updateDoc(docRef, {
          bio: bio,
          name: name,
        });
      }
      toast.success('Profile updated successfully!');
      const snap=await getDoc(docRef);
      setUserData(snap.data());
      navigate('/chat');
     
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error updating profile. Please try again.');
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid); // Ensure uid is correctly set
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.name) setName(data.name);
          if (data.bio) setBio(data.bio);
          if (data.avatar) setPrevImage(data.avatar);
        }
      } else {
        navigate('/');
      }
    });
  }, [navigate])

  return (
    <div className="profile">
      <div className="profile-container">
        <form onSubmit={profileUpdate}>
          <h3>Profile Details</h3>
          <label htmlFor="avatar">
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="avatar"
              accept=".png,.jpeg,.jpg"
              hidden
            />
            <img src={image ? URL.createObjectURL(image) : Avatar} alt="Upload Profile" />
            Upload Profile Image
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Your Name"
            required
          />
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            placeholder="About Profile"
            required
          />
          <button type="submit">Save</button>
        </form>
        <img className="profile-pic" src={image ? URL.createObjectURL(image) :prevImage?prevImage: Message} alt="Message" />
      </div>
    </div>
  );
};

export default ProfileUpdate;
