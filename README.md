# `Bumblr <social-network-service>`

## INTRODUCTION
Bumblr, a Tumblr replica, is a platform where users can share posts, engage in discussions through comments, express their appreciation via likes, and connect by following each other. This is a group project at aA Academy created by Brandon Vang, Jimmy Xu, Richard Lee, and Makoto Doi. 

![homepage][def]
![homepage2][def2]

## Link to website 
https://bv-group-project.onrender.com

## Feature List
## 1. New account creation, log in, log out, and guest/demo log in

* Users can sign up, log in, and log out.
* Users can use a demo login to try the site.
* Users can't use certain features without logging in (like posting, commenting, liking, and following).
* Logged-in users are directed to their profile page which displays their posts and details.
* Logged-out users are directed to a landing page showcasing trending or recent posts.

## 2. Posts

* Users can create, update, and delete posts.
* Posts can contain text or images.
* Each post displays its author, content, timestamp, and associated likes.
* Users can navigate to a detailed view of a post which includes its comments.
* The main feed displays posts from all users or just from those a user follows, by changing the tab.
* User can see Notes counts as the combination of Likes and Comments for each post.

## 3. Comments

* Users can comment on any post.
* Users can update or delete their own comments.
* Each comment displays its author and content.
* Comments are displayed beneath the post they are associated with.

## 4. Likes

* Users can like and unlike posts.
* Each post displays a count of its likes.
* Users can view a list of who has liked a particular post.

## 5. Follows

* Users can follow and unfollow other users.
* Users have a follower and following count on their profile.
* The main feed can be filtered to show posts only from followed users.
 

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

##  React Components
./CreateBar/   ./DeleteConfirmModal/  ./Footer/          ./Likes/           ./LoginFormPage/  ./OpenModalButton/  ./SignupFormModal/  ./auth/
./CreatePost/  ./Follows/             ./IconCollection/  ./LoginFormModal/  ./Navigation/     ./PostIndex/        ./SignupFormPage/

##  Redux Store Shape
```
store = {
  session: {},
  posts: {
     allPosts: {},
     currentPost:{},
     singlePost: {},
  },
  comments: {
    post: {
     postData
    },
    user: {
     userData
    },
  },
  likes: {
     postLikes: [],
    userLikes: [],
   },
  follows: { 
    loggedInUserFollowing: [],
    userFollowing: []
  },
};
```

## Front-end Routes Documentation

1. **Post Index**
   - **Path**: /
   - **Component**: PostIndex
   - **Directory**: ./PostIndex/
   - **Description**: Displays the main post index or landing page.

2. **User Likes**
   - **Path**: /likes
   - **Component**: UserLikes
   - **Directory**: ./Likes/
   - **Description**: Displays all the likes by the logged-in user.

3. **Follows List**
   - **Path**: /following
   - **Component**: FollowsList
   - **Directory**: ./Follows/
   - **Description**: Displays a list of users that the current user is following.

4. **User Current**
   - **Path**: /current
   - **Component**: UserCurrent
   - **Directory**: Not Provided
   - **Description**: Shows posts or other related content specific to the currently logged-in user.

5. **Create Media Form**
   - **Path**: /NewMedia
   - **Component**: CreateMediaForm
   - **Directory**: ./CreatePost/ or ./CreateBar/
   - **Description**: Provides a form for users to create and upload new media.

6. **Login Form**
   - **Path**: /login
   - **Component**: LoginFormPage
   - **Directory**: ./LoginFormPage/ or ./LoginFormModal/
   - **Description**: Displays the login form for users.

7. **Signup Form**
   - **Path**: /signup
   - **Component**: SignupFormPage
   - **Directory**: ./SignupFormPage/ or ./SignupFormModal/
   - **Description**: Presents the signup form for new users.

## Additional Components/Directories:

- **Delete Confirm Modal**: ./DeleteConfirmModal/
- **Footer**: ./Footer/
- **Icon Collection**: ./IconCollection/
- **Navigation**: ./Navigation/
- **Open Modal Button**: ./OpenModalButton/
- **Auth**: ./auth/


## Technology we used 
Flask/ React/ Redux/ sqlAlchemy/ postgreSQL/ AWS S3

## Development Challenges:

- **Media Upload and Post Creation**: 
  - **Redux**: Maintaining the state of the media being uploaded, especially when dealing with multiple file uploads, and reflecting that in the global state was a challenge.
  - **Flask Integration**: Making sure that the uploaded files are processed and stored correctly on the Flask backend.
  - **Error Handling**: Providing clear error messages to the user in cases of failed uploads or unsupported file formats.

## Profiles
BrandonVang;
LinkedIn: 'https://www.linkedin.com/in/brandon-vang-a80518171/',
GitHub: 'https://github.com/BrandonVang',
email: 'vang.brandon94@gmail.com',
        
Jimmy Xu;
LinkedIn: 'https://www.linkedin.com/in/ccnuxuji/',
GitHub: 'https://github.com/ccnuxuji',
email: 'ccnuxuji@gmail.com',
    
Richard Lee;
LinkedIn: 'https://www.linkedin.com/in/richard-lee-335389236/',
GitHub: 'https://github.com/RichyLee95',
email: 'richylee95@gmail.com',


Makoto Doi;
LinkedIn: 'https://www.linkedin.com/in/makoto-doi/',
GitHub: 'https://github.com/londelidess',
email: 'd.makoto0701@yahoo.com',
   

[def]: ./images/Bumblr-login.png
[def2]:./images/Bumblr-main.png
[def3]:./images/Bumblr-schema.png

