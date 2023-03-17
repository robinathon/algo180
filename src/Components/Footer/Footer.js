import React from "react";
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import themeColor from "../../Data/themeColor.json";
import BookmarksIcon from "@mui/icons-material/Bookmarks";

function Footer() {
  const currTheme = useSelector((state) => state.theme);
  const bookmarked = useSelector((state) => state.bookmark);
  const loading = useSelector((state) => state.loading);
  
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    let newGreeting = '';

    if (hour >= 5 && hour < 12) {
      newGreeting = 'Good morning';
    } else if (hour >= 12 && hour < 18) {
      newGreeting = 'Good afternoon';
    } else {
      newGreeting = 'Good evening';
    }

    setGreeting(newGreeting);
  }, []);

  return (
    <Cont>
      <Grid
        container
      >
        <Grid item lg={9.5} md={6} sm={12} xs={12}>
          <Wrapper Padding="3rem" Margin="0.7rem">
            <Name color={themeColor[currTheme][0].text}>
              <span>{greeting}, thanks for visiting!</span>
            </Name>
          </Wrapper>
        </Grid>
        <Grid item lg={2.5} md={6} sm={12} xs={12}>
          <Wrapper Padding="3rem">
            
            <BookmarkCont color={themeColor[currTheme][0].text}>
              <BookmarksIcon
                style={{
                  color: themeColor[currTheme][0].text,
                  cursor: "pointer",
                }}
                onClick={() => navigate("/bookmarks")}
              />
              <span>
                {bookmarked.length > 0
                  ? loading
                    ? "*"
                    : bookmarked.length
                  : ""}
              </span>
            </BookmarkCont>
          </Wrapper>
        </Grid>
      </Grid>
    </Cont>
  );
}
const Cont = styled.div`
  display: flex;
  width: 100%;
  background-color: #001e3c;
`;
const Title = styled.h1`
  font-size: 0.8rem;
  text-align: center;
  font-weight: bold;
  color: ${(props) => props.color || "white"};
  margin-left: 0.5rem;
  border: ${(props) => props.border};

  border-radius: 0.8rem;
  padding: 0.4rem;
  cursor: pointer;
  text-decoration: none;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: ${(props) => props.Padding || "0rem"};
  padding-right: ${(props) => props.Padding || "0rem"};
  justify-content: ${(props) => props.justifyContent || "flex-start"};
  margin-left: ${(props) => props.Margin};
  align-items: center;
  height: 5vh;
  gap: 1.5rem;
  margin-top: 0.5rem;
  a {
    text-decoration: none;
  }
`;
const Name = styled.h1`
  font-size: 1rem;
  color: ${(props) => props.color || "white"};
  gap: 1rem;
  span {
    color: #c3393e;
  }
`;
const BookmarkCont = styled.div`
  position: relative;
  color: ${(props) => props.color || "white"};
  span {
    position: absolute;
    top: -8px;
    right: -8px;
  }
`;

export default Footer;
