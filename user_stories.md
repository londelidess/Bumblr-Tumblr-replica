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
  - When I send a `GET` request to `/posts`:
    - I expect to receive a list of all posts in the system.

* As a user, I want to create a new post to share my content.
  - When I send a `POST` request to `/posts` with my post content:
    - I expect my post to be saved and viewable by others.

* As a user, I want to update my posts when I need to make changes or corrections.
  - When I send a `PUT` request to `/posts/<post_id>` with updated content:
    - I expect the specified post to be updated with the new content.

* As a user, I want the ability to delete my posts if I no longer want them to be available.
  - When I send a `DELETE` request to `/posts/<post_id>`:
    - I expect the specified post to be removed from the system.

---

## Comments

* As a user, I want to view all comments on a post to see what others have said.
  - When I send a `GET` request to `/posts/<post_id>/comments`:
    - I expect to receive a list of all comments related to that post.

* As a user, I want to comment on posts to share my thoughts and reactions.
  - When I send a `POST` request to `/posts/<post_id>/comments` with my comment:
    - I expect my comment to be saved under the specified post.

* As a user, I want to update my comments if I need to clarify or correct something.
  - When I send a `PUT` request to `/posts/<post_id>/comments/<comment_id>` with updated content:
    - I expect the specified comment to be updated.

* As a user, I want to delete my comments if I change my mind or realize I said something inappropriate.
  - When I send a `DELETE` request to `/posts/<post_id>/comments/<comment_id>`:
    - I expect the specified comment to be removed from the post.

---

## Likes

* As a user, I want to see how many likes a post has received to gauge its popularity.
  - When I send a `GET` request to `/posts/<post_id>/likes`:
    - I expect to see a count or list of likes for that post.

* As a user, I want to like posts that I find interesting or enjoyable.
  - When I send a `POST` request to `/posts/<post_id>/likes`:
    - I expect the post to have one more like and this action to be associated with my user account.

* As a user, I want the ability to retract my like if I change my mind.
  - When I send a `DELETE` request to `/posts/<post_id>/likes`:
    - I expect the like I gave to that post to be removed.

---

## Follows

* As a user, I want to see who I'm following to keep track of the accounts I'm interested in.
  - When I send a `GET` request to `/users/<user_id>/following`:
    - I expect to receive a list of all users I am currently following.

* As a user, I want to see who is following me to understand my audience or see if my friends are connected.
  - When I send a `GET` request to `/users/<user_id>/followers`:
    - I expect to receive a list of all users who are following me.

* As a user, I want to follow other users to see their content in my feed.
  - When I send a `POST` request to `/users/<user_id>/follow`:
    - I expect to start following the specified user.

* As a user, I want the option to unfollow users if I'm no longer interested in their content.
  - When I send a `DELETE` request to `/users/<user_id>/unfollow`:
    - I expect to stop following the specified user.
