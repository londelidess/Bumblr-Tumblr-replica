from .db import db
from sqlalchmy import relationship



class Follow(db.Model):
    __tablename__='follows'
    id = db.Column(db.Integer,nullable=False, primary_key=True)
    follower_id  = db.Column(db.Integer,db.ForeignKey("users.id"), nullable=False)
    followed_id = db.Column(db.Integer,db.ForeignKey("posts.id"), nullable=False)

#Relationship

user = relationship("User", back_populates="likes")
post = relationship("Post", back_populates="likes")

def to_dict(self):
    return {
        "id":self.id,
        "follower_id":self.follower_id,
        "followed_id":self.followed_id
    }