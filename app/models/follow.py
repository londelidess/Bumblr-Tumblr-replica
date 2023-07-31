from .db import db, environment, SCHEMA, add_prefix_for_prod



follow =db.Table(
    'follows',
    db.Model.metadata,
    db.Column('follower_id',db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('followed_id',db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)
)

if environment == "production":
    follow.schema = SCHEMA
