import { useHistory } from "react-router-dom";
import PostIndexItem from "./PostIndexItem";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllPosts,
  fetchFollowingPosts,
  getFollowingPosts,
} from "../../store/post";
import { fetchUserLikes } from "../../store/like";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import RingLoader from "react-spinners/RingLoader";

import { useEffect } from "react";
import "./PostIndex.css";
import {
  fetchLoggedInUserFollowing,
  thunkAddFollow,
  thunkRemoveFollow,
} from "../../store/follow";
import CreateBar from "../CreateBar";
import About from "../Footer/index";

const getPost = (state) => Object.values(state.posts.allPosts);

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const PostIndex = () => {
  const getCurrentUser = (state) => state.session.user;
  const currentUser = useSelector(getCurrentUser);
  const history = useHistory();
  const path = window.location.pathname;
  const allPosts = useSelector(getPost);
  const followingPosts = useSelector(getFollowingPosts);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [displayOption, setDisplayOption] = useState("show_following");
  followingPosts.sort((post1, post2) => {
    const a = new Date(post1.postDate);
    const b = new Date(post2.postDate);
    return b - a;
  });
  allPosts.sort((post1, post2) => {
    const a = new Date(post1.postDate);
    const b = new Date(post2.postDate);
    return b - a;
  });

  const showForYouTab = () => {
    setDisplayOption("show_foryou");
  };

  const showFollowingTab = () => {
    setDisplayOption("show_following");
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await dispatch(fetchAllPosts());
      if (currentUser) {
        try {
          await dispatch(fetchLoggedInUserFollowing());
          await dispatch(fetchFollowingPosts());
          await dispatch(fetchUserLikes(currentUser.id));
        } catch (e) {
          console.error("Error fetching data:", e);
        }
      }
      setIsLoading(false);
    };

    fetchData();
  }, [dispatch, currentUser]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <RingLoader color="#ffffff" size={150} css={override} />
      </div>
    );
  }

  return (
    <div className="home-wrapper">
      <div className="posts_option_tab">
        {currentUser && (
          <div>
            <div className="foryou_following_tabs">
              <div className="following_tab" onClick={showFollowingTab}>
                Following
              </div>
              <div className="foryou_tab" onClick={showForYouTab}>
                For you
              </div>
            </div>
            <CreateBar />
          </div>
        )}
      </div>

      {currentUser && displayOption === "show_foryou" && (
        <div className="post-index-all">
          {allPosts.map((post, index) => (
            <PostIndexItem post={post} key={index} />
          ))}
        </div>
      )}

      {currentUser && displayOption === "show_following" && (
        <div className="post-index-all">
          {followingPosts.map((post, index) => (
            <PostIndexItem post={post} key={index} />
          ))}
        </div>
      )}

      {!currentUser && (
        <div className="landing-page-div">
          <div className="tumblr-title">
            <h1>Bumblr</h1>
          </div>
          <div className="tumblr-description">
            <p>
              Express yourself through visuals, words, and multimedia on Tumblr.
              Join a diverse community where your passions come to life.
            </p>
          </div>
          <div className="login-and-signup">
            <OpenModalButton
              className="home-button"
              buttonText="Log In"
              // onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalButton
              className="get-started"
              buttonText="Sign Up"
              // onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </div>
        </div>
      )}
      <div className="about-foot">
        <About />
      </div>
    </div>
  );
};

export default PostIndex;
