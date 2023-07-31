from flask import Blueprint, jsonify, request
from app.models import User, db
from .auth_routes import authenticate
from flask_login import login_required,current_user

follow_routes = Blueprint('follows', __name__)

@follow_routes.route('/following',methods=['GET'])
@login_required
def get_logged_in_user_following():
    '''
    get all following user of logged in user
    '''
    following = current_user.following.all()
    response_user_following=[user.to_dict() for user in following]
    return jsonify(response_user_following)


@follow_routes.route('/<int:user_id>/following', methods=['GET'])
def get_user_following(user_id):
    '''
    get all following user of a user
    '''
    user = User.query.get(user_id)
    if not user:
        return {"error": ["User not found"]},404
    following = user.following.all()
    response_user_following=[user.to_dict() for user in following]
    return jsonify(response_user_following)


@follow_routes.route('/<int:user_id>', methods=['POST'])
@login_required
def add_following(user_id):
    '''
    follow user
    '''
    user = User.query.get(user_id)

    if user == current_user:
        return "You cannot follow yourself"
    if user in current_user.following.all():
        return "You cannot follow someone you already follow"

    current_user.following.append(user)
    db.session.commit()

    return {'res':f"You are now following {user.username}"}


@follow_routes.route('/<int:user_id>', methods=['DELETE'])
@login_required
def unfollowing(user_id):
    '''
    unfollow user
    '''
    user = User.query.get(user_id)

    if not user:
        return {"error": ["User not found"]},404
    if user == current_user:
        return "You cannot unfollow yourself"

    current_user.following.remove(user)
    #   current_user.session.delete(user)
    db.session.commit()

    return {'res':f"You are now unfollowed {user.username}"}
