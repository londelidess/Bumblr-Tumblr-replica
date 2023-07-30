from .db import db, environment, SCHEMA
# from .likes import likes


class Post(db.Model):
    __tablename__ = "posts"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    # post_date = db.Column(db.Date, nullable=False)

    #relationship attributes
    users = db.relationship("User", back_populates="posts")
    comments = db.relationship("Comment", back_populates="posts")
    likes = db.relationship("Like", back_populates="posts")
    medias = db.relationship("Media", back_populates="posts")

    # post_likes = db.relationship(
    #     "User",
    #     secondary=likes,
    #     back_populates="user_likes"
    # )

    def to_dict(self):
        return {
            "id": self.id,
            "content": self.content,
            # "postDate": self.post_date,
            "user": self.users.to_dict(),
            "medias": [media.to_dict() for media in self.medias],
            "comments": [comment.to_dict() for comment in self.comments]
        }

    def to_dict_no_user(self):
        return {
            "id": self.id,
            "content": self.content,
            # "postDate": self.post_date,
            "medias": self.medias.to_dict(),
            "comments": [comment.to_dict() for comment in self.comments]
        }
