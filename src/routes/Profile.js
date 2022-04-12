import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService, dbService } from "../fbase";
import Nweet from "components/Nweet";

export default ({ refreshUser, userObj }) => {
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [nweets, setNweets] = useState([]);
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };
  const getMyNweets = async () => {
    // const nweets = await collection(dbService, "nweets");
    // const ww = where("creatorId", "==", userObj.uid);
    const q = query(
      collection(dbService, "nweets"),
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      //console.log(snapshot.docs.map((doc) => doc.data()));
      const nweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArr);
    });
  };
  useEffect(() => {
    getMyNweets();
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(userObj, { displayName: newDisplayName });
      //await userObj.updateProfile({ displayName: newDisplayName });
      refreshUser();
    }
  };
  const onChange = (event) => {
    setNewDisplayName(event.target.value);
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Display Name"
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
          //   <div key={nweet.id}>
          //     <h4>{nweet.text}</h4>
          //   </div>
        ))}
      </div>
    </>
  );
};
