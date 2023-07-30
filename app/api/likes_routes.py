from flask import Blueprint, jsonify, request
from app.models import Like, db
from auth_routes import authenticate
from flask_login import login_required,current_user
like_routes = Blueprint('likes', __name__)

@like_routes.route('/<int:post_id>',methods=['GET'])
def get_post_likes(post_id):
    post_likes = Like.query.filter_by(post_id=post_id).all()
    response_post_likes=[like.to_dict() for like in post_likes]
    return {"likes":response_post_likes}


@like_routes.route('/<int:user_id>',methods=['GET'])
def get_user_likes():
    user_likes = Like.query.filter_by(user_id=current_user.id).all()
    response_user_likes=[like.to_dict() for like in user_likes]
    return {"likes":response_user_likes}

@like_routes.route('/<int:postid>/likes',methods=['POST'])
@login_required
def add_like(post_id):
    auth = authenticate()
    if 'errors' in auth:
        return auth
    
    data = request.json
    
    already_liked = Like.query.filter_by(post_id=post_id, user_id=auth['id'])
    if already_liked:
        return {'error':'You already liked this post'}
    
    user_id = data.get('user_id')
    post_id = data.get('post_id')
    new_like = Like(user_id=user_id, post_id=post_id)
    db.session.add(new_like)
    db.session.commit()
    return new_like.to_dict()

@like_routes.route('/likes/<int:likeid>',methods=['DELETE'])
@login_required
def remove_like(likeid):
    like_delete = Like.query.get(likeid)
    if like_delete is None:
        return jsonify({'error': 'Like not found'}), 404
    
    db.session.delete(like_delete)
    db.session.commit()
    return {"message": "Like Successfully deleted"}
