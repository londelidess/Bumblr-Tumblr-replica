from .db import db, environment, SCHEMA
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

class Media(db.Model):
    __tablename__ = 'medias'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    media_type = db.Column(db.String, nullable=False)
    media_url = db.Column(db.String, nullable=False)

    post = db.relationship('Post', back_populates='medias')
