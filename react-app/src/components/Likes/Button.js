import React, { useState, useEffect } from "react";
import './Like.css'

const LikeButton = ({ isLiked, onLike }) => {
    const [liked, setLiked] = useState(isLiked);
    const [iconColor, setIconColor] = useState(isLiked ? "red" : "black");

    // Update the "liked" state and icon color whenever the "isLiked" prop changes
    useEffect(() => {
        setLiked(isLiked);
        setIconColor(isLiked ? "red" : "black");
    }, [isLiked]);

    const handleClick = () => {
        setLiked((prevLiked) => !prevLiked); // Toggle the liked state
        setIconColor((prevColor) => (prevColor === "red" ? "black" : "red")); // Toggle the icon color

        onLike(); // Call the onLike function to handle the like/unlike logic in the parent component
    };

    return (
        <div className="like-button" onClick={handleClick}>
            <i className="fa fa-heart" style={{ color: iconColor }} />
        </div>
    );
};

export default LikeButton;
