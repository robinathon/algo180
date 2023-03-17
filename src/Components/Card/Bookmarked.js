import { React } from "react";
import DisplayHeading from "../../Components/Card/DisplayHeading";
import Display from "../../Components/Card/Display";
import styled from "styled-components";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import EmptyBookmarked from "./EmptyBookmarked";
import { db } from "../../Firebase/FirebaseAuth";
import { doc, updateDoc } from "firebase/firestore";
import { setInitialBookmark } from "../../store/bookmarkSlice";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";
function Bookmarked() {

  const auth = getAuth();
  const user = auth.currentUser;
  const userRef = doc(db, "users", user.uid);
  let dispatch = useDispatch();
  const bookmarkedquestionlist = useSelector((state) => state.bookmark);
  const emptyBookmarkList = () => {
    dispatch(setInitialBookmark([]));
  };
  const emptyBookmarkListDB = async () => {
    updateDoc(userRef, {
      bookmarkList: [],
    })
      .then(() => {
        console.log("book mark list updated successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const updateBookmarkList = async () => {
    updateDoc(userRef, {
      bookmarkList: bookmarkedquestionlist,
    })
      .then(() => {
        console.log("book mark list updated successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    updateBookmarkList();
  }, [bookmarkedquestionlist]);

  return (
    <Container>
      {bookmarkedquestionlist.length === 0 ? (
        <>
          <EmptyBookmarked />
        </>
      ) : (
        <>
          <Button
            style={{
              backgroundColor: "#db3545",
              color: "#ffffff",
              marginTop: "2rem",
            }}
            variant="outlined"
            onClick={() => {
                emptyBookmarkList();
                emptyBookmarkListDB();
              <EmptyBookmarked />;
            }}
          >
            Clear All
          </Button>
          <Scrollbars
            autoHide
            style={{
              width: "90%",
              height: "70.5vh",
              margin: "2rem 0 2.5rem 0",
            }}
          >
            <DisplayHeading />
            {bookmarkedquestionlist.map((questionList, index) => {
              return (
                <Display
                  key={index}
                  id={questionList.Q_id}
                  siNo={index}
                  questionName={questionList.Q_name}
                  Qlink={questionList.Q_link}
                  solution={questionList.Q_solution}
                  topic={questionList.Q_topic}
                />
              );
            })}
          </Scrollbars>
        </>
      )}
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  width: 100%;
  height: 84.6vh;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(to bottom right, #8c3a3a, #3b3f72);
`;


export default Bookmarked;
