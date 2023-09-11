import { useHistory } from "react-router-dom";
import PostIndexItem from "./PostIndexItem";
import { useState, useEffect, CSSProperties } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllPosts,
  fetchFollowingPosts,
  fetchSearchPosts,
  getSearchPosts,
} from "../../store/post";
import { fetchUserLikes } from "../../store/like";
import About from "../Footer";
import "./PostIndex.css";
import CreateBar from "../CreateBar";
import { fetchLoggedInUserFollowing } from "../../store/follow";
import RingLoader from "react-spinners/RingLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};


const Search = () => {
  const getCurrentUser = (state) => state.session.user;
  const currentUser = useSelector(getCurrentUser);
  const history = useHistory();
  const path = window.location.pathname;
  const allPosts = useSelector(getSearchPosts);
  const dispatch = useDispatch();
  const [displayOption, setDisplayOption] = useState("show_following");
  const [isLoading, setIsLoading] = useState(true);

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
      try {
        await dispatch(fetchAllPosts());
        if (currentUser) {
          await dispatch(fetchLoggedInUserFollowing());
          await dispatch(fetchFollowingPosts());
          await dispatch(fetchUserLikes(currentUser.id));
        }
        setIsLoading(false);
      } catch (e) {
        console.error("Error fetching data:", e);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch, currentUser]);

  return (
    <div className="home-wrapper">
    {isLoading ? (
        <div style={{ marginTop: "50px" }}>
          <RingLoader
            color="#ffffff"
            loading={isLoading}
            css={override}
            size={150}
          />
        </div>
      ) : (
        <>
          <div className="posts_option_tab">
            {currentUser && (
              <div>
                <CreateBar />
              </div>
            )}
          </div>

          {currentUser && (
            <div className="post-index-all">
              {allPosts?.length === 0 && (
                <h3 className="no_search_result">
                  No result found! Please try something else...
                </h3>
              )}
              {allPosts.map((post, index) => (
                <PostIndexItem post={post} key={index} />
              ))}
            </div>
          )}
          <About />
        </>
      )}
    </div>
  );
};

export default Search;
