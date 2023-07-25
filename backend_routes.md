## Posts

* Users can view all posts.
  - `GET /posts`

* Users can create a post.
  - `POST /posts`

* Users can update a specific post by its ID.
  - `PUT /posts/<post_id>`

* Users can delete a specific post by its ID.
  - `DELETE /posts/<post_id>`

---

## Comments

* Users can view all comments on a specific post.
  - `GET /posts/<post_id>/comments`

* Users can add a comment to a specific post.
  - `POST /posts/<post_id>/comments`

* Users can update a specific comment on a post.
  - `PUT /posts/<post_id>/comments/<comment_id>`

* Users can delete a specific comment from a post.
  - `DELETE /posts/<post_id>/comments/<comment_id>`

---

## Likes

* Users can view likes on a specific post.
  - `GET /posts/<post_id>/likes`

* Users can like a specific post.
  - `POST /posts/<post_id>/likes`

* Users can unlike a specific post.
  - `DELETE /posts/<post_id>/likes`

---

## Follows

* Users can view all users they follow.
  - `GET /users/<user_id>/following`

* Users can view all users that follow them.
  - `GET /users/<user_id>/followers`

* Users can follow another user.
  - `POST /users/<user_id>/follow`

* Users can unfollow another user.
  - `DELETE /users/<user_id>/unfollow`
