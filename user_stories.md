# User Stories

## Users

### Sign Up

* As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.
  * When I'm on the `/signup` page:
    * I would like to be able to enter my email, username, and preferred password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the sign-up form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the sign-up form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
    * So that I can try again without needing to refill forms I entered valid data into.

### Log in

* As a registered and unauthorized user, I want to be able to log in to the website via a log-in form.
  * When I'm on the `/login` page:
    * I would like to be able to enter my email and password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the lob-up form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the log-up form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
      * So that I can try again without needing to refill forms I entered valid data into.

### Demo User

* As an unregistered and unauthorized user, I would like an easy to find and clear button on both the `/signup` and `/login` pages to allow me to visit the site as a guest without signing up or logging in.
  * When I'm on either the `/signup` or `/login` pages:
    * I can click on a Demo User button to log me in and allow me access as a normal user.
      * So that I can test the site's features and functionality without needing to stop and enter credentials.

### Log Out

* As a logged in user, I want to log out via an easy to find log out button on the navigation bar.
  * While on any page of the site:
    * I can log out of my account and be redirected to a page displaying recent FauxTweets.
      * So that I can easily log out to keep my information secure.

## User Stories

## Posts

* As a user, I want to view all available posts.
  - When I'm on the `/`:
    - I expect to receive a list of all posts in the system.

* As a logged in user, I want to be able to create a new post to share my content.
  - I can write and submit a post, when I'm on the `/new-post` page :
    - I expect my post to be saved and viewable by others.

* As a logged in user, I want to update my posts when I need to make changes or corrections.
  - When I'm on the `/`, `/post/:postId`, or `/users/:userId/post` pages:
    -  I can click "Edit" to make permanent changes to post that I have posted.
      - So that I can fix any errors I make in my post.

* As a logged in user, I want the ability to delete my posts if I no longer want them to be available.
  - When I'm on the `/`, `/post/:postId`, or `/users/:userId/post` pages:
    - I can click "Delete" to permanently delete a post I have posted.
      - So that when I realize I shouldn't have publicly said something, I can easily remove it.

---

## Comments

* As a user, I want to view all comments related to a specific post.
  - When I'm on the `/posts/:postId/comments` page:
    - I expect to see a list of all comments associated with that post.

* As a logged in user, I want to share my opinions by commenting on posts.
  - When I'm on the `/posts/:postId/comments` page:
    - I can write and submit my comment.
      - I expect my comment to be added under the relevant post.

* As a logged in user, I want the flexibility to modify my comments for clarity or to correct any mistakes.
  - When I'm on the `/posts/:postId/comments/:commentId` page:
    - I can click "Edit reply" to make permanent changes to a comment I have made.
      - So that I can ensure my comment accurately reflects my thoughts.

* As a logged in user, I want the option to remove my comments if I reconsider my words or find them unsuitable.
  - When I'm on the `/posts/:postId/comments/:commentId` page:
    - I can click "Delete reply" to permanently remove a comment I have made.
      - This allows me to retract any comment I regret or deem inappropriate.

## Likes

* As a user, I want to gauge the popularity of a post by viewing its likes.
  - When I'm on the `/posts/:postId/likes` page:
    - I expect to see a count or list of likes associated with that post.

* As a user, I want to express my appreciation for posts that resonate with me.
  - When I'm on the `/posts/:postId` page:
    - I can click "Likes" to show my interest in the post.
      - I expect the post's like count to increase by one and this action to be linked to my account.

* As a user, I want the freedom to reconsider and undo my likes.
  - When I'm on the `/posts/:postId` page where I've previously liked a post:
    - I can click "Likes" to retract my like.
      - I expect the post's like count to decrease by one.

---

## Follows

* As a logged in user, I want to oversee the accounts I've chosen to follow.
  - When I'm on the `/users/:userId/following` page:
    - I expect to see a list of all users I'm currently following.

* As a logged in user, I want to connect with other users by following them and viewing their content.
  - When I'm on the `/users/:userId` profile page, `/users/:userId/likes`, `/users/:userId/followers`, or `/` of posts header and in the likes list:
    - I can click "Follow" to start following that user.
      - I expect to be added to the user's list of followers.

* As a logged in user, I want the flexibility to disconnect from users whose content no longer aligns with my interests.
  - When I'm on the `/users/:userId` profile page, `/users/:userId/following` where I'm already following the user,:
    - I can click "Following" to cease following them.
      - I expect to be removed from the user's list of followers.

* As a logged in user, I want insight into my audience or to verify connections with friends.
  - When I'm on the `/users/:userId/followers` page:
    - I expect to see a list of all users who have chosen to follow me.
