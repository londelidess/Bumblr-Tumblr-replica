from .db import db, environment, SCHEMA




class Like(db.Model):
    __tablename__='likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer,nullable=False, primary_key=True)
    user_id  = db.Column(db.Integer,db.ForeignKey("users.id"), nullable=False)
    post_id = db.Column(db.Integer,db.ForeignKey("posts.id"), nullable=False)

#Relationship

    users = db.relationship("User", back_populates="likes")
    posts = db.relationship("Post", back_populates="likes")

    def to_dict(self):
        return {
            "id":self.id,
            "user_id":self.user_id,
            "post_id":self.post_id
        }
