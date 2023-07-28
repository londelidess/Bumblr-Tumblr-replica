from .db import db
from sqlalchmy import relationship



class Like(db.Model):
    __tablename__='likes'
    id = db.Column(db.Integer,nullable=False, primary_key=True)
    user_id  = db.Column(db.Integer,db.ForeignKey("users.id"), nullable=False)
    post_id = db.Column(db.Integer,db.ForeignKey("posts.id"), nullable=False)

#Relationship

user = relationship("User", back_populates="likes")
post = relationship("Post", back_populates="likes")

def to_dict(self):
    return {
        "id":self.id,
        "user_id":self.user_id,
        "post_id":self.post_id
    }