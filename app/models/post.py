from .db import db, environment, SCHEMA
from .likes import likes


class Post(db.Model):
    __tablename__ = "posts"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    #relationship attributes
    user = db.relationship("User", back_populates="posts")
    comments = db.relationship("Comment", back_populates="posts")
    likes = db.relationship("Like", back_populates="posts")
    media = db.relationship("Media", back_populates="posts")

    # post_likes = db.relationship(
    #     "User",
    #     secondary=likes,
    #     back_populates="user_likes"
    # )

    def to_dict(self):
        return {
            "id": self.id,
            "content": self.content,
            "user": self.user.to_dict_no_post(),
        }

    def to_dict_no_user(self):
        return {
            "id": self.id,
            "content": self.content
        }
