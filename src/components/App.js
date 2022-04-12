import { useEffect, useState } from "react";
import AppRouter from "components/Router";
// import { authService } from "fbase";
import { authService } from "fbase";
import { updateProfile } from "firebase/auth";

function App() {
  //console.log("A", authService.currentUser);
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        // setUserObj(user);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => updateProfile(user, args),
        });
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  });
  const refreshUser = () => {
    // setUserObj(Object.assign({}, authService.currentUser));
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => updateProfile(user, args),
    });
  };
  return (
    <>
      {init ? (
        <AppRouter
          isLoggedIn={isLoggedIn}
          userObj={userObj}
          refreshUser={refreshUser}
        />
      ) : (
        "Initializing..."
      )}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
