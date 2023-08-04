# `Bumblr <social-network-service>`

## INTRODUCTION
![homepage][def]
![homepage2][def2]

## Link to website `https://group-social-network-service.onrender.com`

Bumblr Overview
Bumblr is a social platform, inspired by Tumblr, which allows users to create posts, comment on them, like posts, and follow other users.

Key Features:
User Authentication:

Register, log in, log out, and demo/guest login.
Editable user profiles.
Posts:

Users can create, update, and delete their posts.
Posts can contain text and/or images.
Each post displays its author, content, timestamp, and like count.
Comments:

Users can comment on posts and manage (edit/delete) their own comments.
Likes:

Users can show appreciation for posts by liking them and have the ability to undo their likes.
Follow System:

Users can follow/unfollow other users, affecting the content that appears on their main feed.
Potential Stretch Goals:
Media Integration: Allow for image and video uploads in posts.
Tags & Search: Users can add tags to posts and search for posts via these tags.
Notifications: Inform users when their content receives interactions like likes or comments.
Direct Messaging: Users can privately message each other.


## Database Schema Design
![db][def3]
## API Documentation

### Authentication

* Users can check if they're authenticated.
  - `GET api/auth`

* Users can log in.
  - `POST api/auth/login`

* Users can log out.
  - `POST api/auth/login`

* Users can sign up.
  - `POST api/auth/signup`

* An unauthorized endpoint to handle authentication failures.
  - `POST api/auth/unauthorized`

---

### Session

* Users can view all users.
  - `GET api/posts`

* Users can retrieve a specific user by their ID.
  - `GET api/users/<id>`

---

### Posts

* Users can view all posts.
  - `GET api/posts/all`

* Users can retrieve all posts created by the current logged-in user.

  - `GET api/posts/current`

* Users can retrieve a specific post by its ID.

  - `GET api/posts/<post_id>`

* Users can create a post.
  - `POST api/posts`

* Users can update a specific post by its ID.
  - `PUT api/posts/<post_id>`

* Users can delete a specific post by its ID.
  - `DELETE api/posts/<post_id>`

* Users can add media to a specific post by its ID.
  - `POST api/posts/<post_id>/medias`

* Users can delete a specific media by its ID.
  - `DELETE api/medias/<id>`

---

### Comments

* Users can retrieve all comments for a specific post.
  - `GET api/comments/<post_id>`

* Users can add a comment to a specific post.
  - `POST api/comments/<post_id>/new`

* Users can update a specific comment on a post.
  - `PUT api/comments/<comment_id>`

* Users can delete a specific comment from a post.
  - `DELETE api/comments/<comment_id>`

---

### Likes

* Users can view likes on a specific post.
  - `GET api/likes/<post_id>`

* Users can retrieve all likes given by a specific user.
  - `GET api/likes/users/<user_id>`

* Users can retrieve all likes given by the currently logged-in user.
  - `GET api/likes/users/current`

* Users can like a specific post.
  - `POST api/likes/<post_id>/likes`

* Users can unlike a specific post.
  - `DELETE api/likes/<like_id>`

---

### Follows

* Logged-in users can retrieve a list of users they are following.
  - `GET api/follows/following`

* Users can retrieve a list of users that another specific user is following.
  - `GET api/follows/<user_id>/following`

* Logged-in users can follow another user.
  - `POST api/follows/<user_id>`

* Logged-in users can unfollow another user.
  - `DELETE api/follows/<user_id>`

## USER AUTHENTICATION/AUTHORIZATION


[def]: ./images/Bumblr-login.png
[def2]:./images/Bumblr-main.png
[def3]:./images/Bumblr-schema.png
