import React, { useState } from "react";
import stock from '../../images/stock.png'
import OpenModalButton from "../OpenModalButton";
import CreatePostForm from "../CreatePost/CreatePostForm";
import CreateMediaForm from "../CreatePost/PostMedia";
import "./createbar.css"

const CreateBar = () => {
    const [showMenu, setShowMenu] = useState(false);

    const handleReserveClick = () => {
        alert('Feature coming soon');
    };

    const closeMenu = () => setShowMenu(false);

    return (
        <div className="create-bar-container">

            <img src={stock} alt="Avatar" className="create-tiny-image" />
            <ul className="create-bar">

                <li>
                    <div className="create-bar-post">
                        <OpenModalButton
                            modalComponent={<CreatePostForm />}
                            onItemClick={closeMenu}
                            i className="fa fa-font"
                        >
                        </OpenModalButton>
                        <p className="create-bar-modal">Text</p>
                    </div>
                </li>
                <li>
                    <div className="create-bar-camera">

                        <OpenModalButton
                            modalComponent={<CreateMediaForm />}
                            onItemClick={closeMenu}
                            i className="fa fa-camera"
                        >
                        </OpenModalButton>
                        <p className="create-bar-modal">Photo</p>
                    </div>
                </li>
                <li>
                    <button className="create-bar-button" onClick={handleReserveClick}>
                        <i className="fas fa-quote-left fa-lg"></i>
                    </button>
                    <p className="create-bar-text">Quote</p>
                </li>
                <li>
                    <button className="create-bar-button" onClick={handleReserveClick}>
                        <i className="fas fa-link fa-lg"></i>
                    </button>
                    <p className="create-bar-text">Link</p>
                </li>
                <li>
                    <button className="create-bar-button" onClick={handleReserveClick}>
                        <i className="fas fa-comment"></i>
                    </button>
                    <p className="create-bar-text">Chat</p>
                </li>
                <li>
                    <button className="create-bar-button" onClick={handleReserveClick}>
                        <i className="fas fa-headphones"></i>
                    </button>
                    <p className="create-bar-text">Audio</p>
                </li>
                <li>
                    <div className="create-bar-video">
                        <OpenModalButton
                            modalComponent={<CreateMediaForm />}
                            onItemClick={closeMenu}
                            i className="fas fa-video"
                        >
                        </OpenModalButton>
                        <p className="create-bar-modal">Video</p>
                    </div>
                </li>
            </ul>
        </div>
    )
}


export default CreateBar
