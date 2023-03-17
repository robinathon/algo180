import React, { useEffect } from "react";
import QuestionPage from "./screen/QuestionPage/QuestionPage";
import Navbar from "./Components/NavBar/Navbar";
import Footer from "./Components/Footer/Footer";
import HomePage from "./screen/HomePage/HomePage";
import Bookmarked from "./Components/Card/Bookmarked";
import Login from "./screen/Login/Login";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setInitialCart } from "./store/cartSlice";
import { setInitialBookmark } from "./store/bookmarkSlice";
import { setInitialNote } from "./store/noteSlice";
import { setLoading } from "./store/loadingSlice";
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from './Firebase/FirebaseAuth';
import { db } from "./Firebase/FirebaseAuth";
function App() {
  const user = useSelector((state) => state.auth);
  let dispatch = useDispatch();
  
  const getData = async () => {
    dispatch(setLoading(true));
    const userRef = doc(db, "users", user[0][1]);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      dispatch(setLoading(false));
      dispatch(setInitialCart(docSnap.data().solvedQuestionList));
      dispatch(setInitialBookmark(docSnap.data().bookmarkList));
      dispatch(setInitialNote(docSnap.data().notesList));

      console.log("initial states updated");
    } else {
      console.log("User does not exist");
    }
  };

  useEffect(() => {
    getData();
  }, [user]);

  return (
    <>
    <div className="main_body">
      <BrowserRouter>
      {user.length===0 ? (
            <Routes>
              {" "}
              <Route path="/" element={<Login />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          ) : (<Routes>
            {" "}
                    <Route
                      path="/"
                      element={
                        <>
                          <Navbar />
                          <HomePage />
                          <Footer/>
                        </>
                      }
                    />
                    <Route
                      path="/topic/:type"
                      element={
                        <>
                          <Navbar />
                          <QuestionPage />
                          <Footer/>
                        </>
                      }
                    />
                    <Route
                      path="/bookmarks"
                      element={
                        <>
                          <Navbar />
                          <Bookmarked />
                          <Footer />
                        </>
                      }
                    />
            </Routes>
            )}
      
      </BrowserRouter>
    </div>
    </>
  );
}

export default App;
