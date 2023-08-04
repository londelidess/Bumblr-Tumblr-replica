from app.models import db, follow, User, environment, SCHEMA
from sqlalchemy.sql import text

def seed_follows():

    user1_id = "Demo"
    user2_id = "marnie"
    user3_id = "bobbie"


    user1 = User.query.filter_by(username = user1_id).first()
    user2 = User.query.filter_by(username = user2_id).first()
    user3 = User.query.filter_by(username = user3_id).first()


    user1.following.append(user2)
    user1.following.append(user3)
    user2.following.append(user1)
    user2.following.append(user3)
    user3.following.append(user1)
    user3.following.append(user2)

    db.session.commit()

def undo_follows():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.follows RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM follows"))

    db.session.commit()
