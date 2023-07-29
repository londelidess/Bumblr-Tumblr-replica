from random import randint
from datetime import date
from flask import Blueprint, redirect, url_for, request
from ..forms.post_form import PostForm
from ..models import Post, User, db
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
# from .AWS_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3


post_routes = Blueprint("posts", __name__)


# get all posts
@post_routes.route("/all")
def all_posts():
  all_posts = Post.query.all()
  response_posts = [post.to_dict() for post in all_posts]
  print(response_posts)
  return {"posts": response_posts }

# get all posts of current user
@post_routes.route("/current")
@login_required
def current_posts():
  all_posts = Post.query.filter_by(user_id=current_user.id).all()
  response_posts = [post.to_dict() for post in all_posts]
  print(response_posts)
  return {"posts": response_posts }

# get one post by id
@post_routes.route("/<int:id>")
def get_post_by_id(id):
    one_post = Post.query.get(id)
    return {"post": one_post.to_dict()}

# create a new post
@post_routes.route("", methods=["POST"])
def add_post():
  form = PostForm() 
  form.user_id.choices = [ (user.id, user.username) for user in User.query.all()]
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    selected_user = User.query.get(form.data["user_id"])
    print(selected_user)

    # image = form.data["image"]
    # image.filename = get_unique_filename(image.filename)
    # print(image)
    # upload = upload_file_to_s3(image)
    # print(upload)

    # if "url" not in upload:
    # return render_template("post_form.html", form=form, errors=[upload])

    new_post = Post(
      content = form.data["content"],
      users = selected_user,
    # post_date = date.today(),
    )

    print(new_post)
    db.session.add(new_post)
    db.session.commit()
    # return redirect(url_for("posts.all_posts"))
    return {"resPost": new_post.to_dict()}

  return {'errors': validation_errors_to_error_messages(form.errors)}, 401



# @post_routes.route("/update/<int:id>", methods=["GET", "POST"])
# def update_post(id):
#   form = PostForm()

#   form.user_id.choices = [ (user.id, user.username) for user in User.query.all()]
#   print(form.user_id.choices)

#   if form.validate_on_submit():
#     post_to_update = Post.query.get(id)

#     selected_user = User.query.get(form.data["user_id"])
#     post_to_update.user = selected_user
#     post_to_update.caption = form.data["caption"]
#     post_to_update.image = form.data["image"]
#     post_to_update.post_date = date.today()
#     db.session.commit()
#     return redirect("/posts/all")


#   elif form.errors:
#     return render_template("post_form.html", form=form, errors=form.errors, type="update", id=id)


#   else:
#     current_data = Post.query.get(id)
#     form.process(obj=current_data)
#     return render_template("post_form.html", form=form, errors=None, type="update", id=id)


# @post_routes.route("/delete/<int:id>")
# def delete_post(id):
#   post_to_delete = Post.query.get(id)

#   file_delete = remove_file_from_s3(post_to_delete.image)

#   if file_delete is True:
#     db.session.delete(post_to_delete)
#     db.session.commit()
#     return redirect("/posts/all")

#   else:
#     return "<h1>File delete errors</h1>"