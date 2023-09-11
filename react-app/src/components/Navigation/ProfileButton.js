import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './Navigation.css'
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import CreatePostForm from "../CreatePost/CreatePostForm";
import CreateMediaForm from "../CreatePost/PostMedia";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <div className="profile-container">

      {!user ? (
        <button className="Cred" onClick={openMenu}>
          Log In
        </button>
      ) : (
        <div className="logo-login" onClick={openMenu}>
          <i className="fas fa-user fa-lg" />
        </div>
      )}


      {/* Need to add create component */}
      {user && (
        <OpenModalButton
          modalComponent={<CreateMediaForm />}
          onItemClick={closeMenu}
          i className="fas fa-pencil-alt fa-lg"
        >
        </OpenModalButton>
      )}

      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div className="user-options">
            <div>Hi {user.username}</div>
            {/* <div>{user.email}</div> */}
            {/* Need the likes component */}
            <div className="user-like">
              <Link to="/likes">Likes</Link>
            </div>
            <div className="user-like">
              <Link to="/current">Posts</Link>
            </div>
            {/* Need the follow component */}
            <div className="user-follow">
              <Link to="/following">Following</Link>
            </div>

            <div className="user-logout" onClick={handleLogout}>
              Log Out
            </div>

          </div>
        ) : (
          <>
            <div className="login-modal">
              <OpenModalButton
                className="Login-modal-button"
                buttonText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </div>
            <div className="sign-up-modal">
              <OpenModalButton
                className="signup-modal-button"
                buttonText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </div>
          </>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;
