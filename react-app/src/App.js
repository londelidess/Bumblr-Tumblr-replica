import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import PostIndex from "./components/PostIndex"
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import FollowsList from "./components/Follows/Index"
import UserLikes from "./components/PostIndex/UserLikes"
import UserCurrent from "./components/PostIndex/UserCurrent"

import CreateMediaForm from "./components/CreatePost/PostMedia"
import Search from "./components/PostIndex/Search";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" component={PostIndex} />
          <Route exact path="/likes" component={UserLikes} />
          <Route exact path="/following" component={FollowsList} />
          <Route exact path="/current" component={UserCurrent} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/NewMedia" component={CreateMediaForm} />
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
