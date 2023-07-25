
# **Database Schema**
## `users`---this would be change cuz we will get real features from appAcademy

---------------------------------------------------------------------------|
| column name   | data type    | details                                   |
---------------------------------------------------------------------------|
| id            | integer      | not null, primary key                     |
| username      | string       | not null, unique                          |
| password      | string       | not null (hashed)                         |
| email         | string       | not null, indexed, unique                 |
| posts         | relationship | one-to-many with Post                     |
| comments      | relationship | one-to-many with Comment                  |
| likes         | relationship | one-to-many with Like                     |
| followers     | relationship | many-to-many with User (self-referential) |
| following     | relationship | many-to-many with User (self-referential) |
| created_at    | datetime     | not null                                  |
| updated_at    | datetime     | not null                                  |
---------------------------------------------------------------------------|

## `posts`
----------------------------------------------------------------------------------|
| column name   | data type    | details                                          |
----------------------------------------------------------------------------------|
| id            | integer      | not null, primary key                            |
| content       | text         | not null                                         |
| user_id       | integer      | not null, indexed, foreign key (references User) |
| comments      | relationship | one-to-many with Comment                         |
| likes         | relationship | one-to-many with Like                            |
| created_at    | datetime     | not null                                         |
| updated_at    | datetime     | not null                                         |
----------------------------------------------------------------------------------|
* `user_id ` references `users ` table

## `comments`
----------------------------------------------------------------------------------|
| column name   | data type    | details                                          |
----------------------------------------------------------------------------------|
| id            | integer      | not null, primary key                            |
| content       | text         | not null                                         |
| user_id       | integer      | not null, indexed, foreign key (references User) |
| post_id       | integer      | not null, indexed, foreign key (references Post) |
| created_at    | datetime     | not null                                         |
| updated_at    | datetime     | not null                                         |
----------------------------------------------------------------------------------|
* `user_id ` references `users ` table
* `post_id  ` references `posts  ` table

## `likes`
----------------------------------------------------------------------------------|
| column name   | data type    | details                                          |
----------------------------------------------------------------------------------|
| id            | integer      | not null, primary key                            |
| user_id       | integer      | not null, indexed, foreign key (references User) |
| post_id       | integer      | not null, indexed, foreign key (references Post) |
----------------------------------------------------------------------------------|
* `user_id ` references `users ` table
* `post_id  ` references `posts  ` table


## `follows`
----------------------------------------------------------------------------------|
| column name   | data type    | details                                          |
----------------------------------------------------------------------------------|
| id            | integer      | not null, primary key                            |
| follower_id   | integer      | not null, indexed, foreign key (references User) |
| followed_id   | integer      | not null, indexed, foreign key (references User) |
----------------------------------------------------------------------------------|
* `follower_id ` references `users ` table
* `followed_id ` references `users ` table


## `medias`

--------------------------------------------------------------------------------------|
| column name | data type | details                                                   |
--------------------------------------------------------------------------------------|
| id          | integer   | not null, primary key                                     |
| post_id     | integer   | not null, indexed, foreign key (references posts)         |
| media_type  | string    | not null (e.g., 'image', 'video')                         |
| media_url   | string    | not null (URL to where the media is stored)               |
| created_at  | datetime  | not null                                                  |
| updated_at  | datetime  | not null                                                  |
--------------------------------------------------------------------------------------|

* `post_id  ` references `posts  ` table
