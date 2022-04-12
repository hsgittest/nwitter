import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { ref, uploadString } from "@firebase/storage";
import React, { useEffect, useState } from "react";
import Nweet from "../components/Nweet";
import { dbService, storageService } from "../fbase";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL } from "firebase/storage";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attach, setAttach] = useState("");
  /*const getNweets = async () => {
    // const dbNweets = await dbService.collection("nweets").get();
    const dbNweets = await getDocs(collection(dbService, "nweets"));
    dbNweets.forEach((document) => {
      const nweetObject = {
        ...document.data(),
        id: document.id,
        creatorId: userObj.uid,
      };
      setNweets((prev) => [document.data(), ...prev]);
    });
    // console.log(dbNweets);
    // const q = query(collection(dbService, "nweets"));
    // const querySnapshot = await getDocs(q);
    // console.log(querySnapshot);
    // querySnapshot.forEach((doc) => {
    //   const nweetObj = { ...doc.data, id: doc.id };
    //   setNweets((prev) => [nweetObj, ...prev]);
    // });
  };*/
  useEffect(() => {
    // getNweets();
    onSnapshot(
      query(collection(dbService, "nweets"), orderBy("createdAt", "desc")),
      (snapshot) => {
        const nweetArr = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNweets(nweetArr);
      }
    );
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    // const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
    // const response = await fileRef.putString(attach, "data_url");
    let attachURL = "";
    if (attach !== "") {
      const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(fileRef, attach, "data_url");
      //console.log(response);
      attachURL = await getDownloadURL(fileRef);
      console.log(attachURL);
    }
    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachURL,
    };
    // await dbService.collection("nweets").add({
    //   nweet,
    //   createdAt: Date.now(),
    // });
    // setNweet("");

    try {
      const docRef = await addDoc(collection(dbService, "nweets"), nweetObj);
    } catch (error) {
      console.log("Err", error);
    }
    setNweet("");
    setAttach("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      console.log(finishedEvent);
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttach(result);
    };
    reader.readAsDataURL(theFile);
  };

  const clearAttach = () => setAttach("");

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          required
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Nweet" />
        {attach && (
          <div>
            <img src={attach} width="50px" height="50px" />
            <button onClick={clearAttach}>Clear</button>
          </div>
        )}
      </form>
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
    </div>
  );
};
export default Home;
