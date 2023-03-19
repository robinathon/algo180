import React, { useEffect } from "react";
import GoogleButton from "react-google-button";
import styled from "styled-components";
import { signInWithGoogle, signInAsGuest } from "../../Firebase/FirebaseAuth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../../store/authSlice";
import { useLottie , Lottie} from "lottie-react";
import logimg from "../../Lottie/logimg.json";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/FirebaseAuth";
import { useAuthState } from "react-firebase-hooks/auth";
import { FcGoogle } from 'react-icons/fc'; 
import { createGlobalStyle } from 'styled-components';

function Login() {
  let dispatch = useDispatch();
  const auth = getAuth();
  const addNewUser = async (uid) => {
    const userRef = doc(db, "users", uid);
    const data = {
      solvedQuestionList: [],
      notesList: [],
      bookmarkList: [],
    };
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      console.log("Document already exist");
    } else {
      console.log("No such document!");
      setDoc(userRef, data)
        .then(() => {
          console.log("Document has been added successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(addUser([user.displayName, user.uid]));
        addNewUser(user.uid);
        console.log("galat");
      } else {
        console.log("sahi");
        dispatch(removeUser([]));
      }
    });
  }, []);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    height: "20rem",
    animationData: logimg,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
 
  const { View } = useLottie(defaultOptions);
  return (
    
    <Wrapper>
      <AnimationContainer>
      {View}
    </AnimationContainer>
      <StyledButton onClick={signInWithGoogle}>
        <GoogleIcon size={30}/>
        <span>Sign in with Google</span>
      </StyledButton>
    </Wrapper>
    
  );
}

const GoogleIcon = styled(FcGoogle)`
  margin-right: 0.5rem;
  vertical-align: middle;
`;

const Wrapper = styled.div`
  width: 100%;
  max-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  
  
`;
const AnimationContainer = styled.div`
  width: 25vw;
  height: 40vh;
  z-index: -1;

  @media only screen and (max-width: 768px) {
    width: 70vw;
    height: 20vh;
  }
`;

const StyledButton = styled.button`
  margin-top: 2rem;
  padding: 1rem 3rem;
  font-size: 1.5rem;
  background-color: #b3e9ea;
  color: #222222;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
  transition: all 0.3s ease-in-out;

  @media only screen and (max-width: 768px) {
    font-size: 1rem;
    padding: 0.5rem 1.5rem;
    margin-top: 30vh;
   
  }

  &:hover {
    background-color: #222222;
    color: #ffffff;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }
`;

export default Login;
