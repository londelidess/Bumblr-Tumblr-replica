from app.models import db, follow, User, environment, SCHEMA
from sqlalchemy.sql import text

def seed_follows():

    user1_id = "Demo"
    user2_id = "marnie"
    user3_id = "bobbie"
    user4_id = "alice"
    user5_id = "charlie"
    user6_id = "david"
    user7_id = "evelyn"
    user8_id = "frank"
    user9_id = "grace"
    user10_id = "hannah"
    user11_id = "TheZuck"



    user1 = User.query.filter_by(username=user1_id).first()
    user2 = User.query.filter_by(username=user2_id).first()
    user3 = User.query.filter_by(username=user3_id).first()
    user4 = User.query.filter_by(username=user4_id).first()
    user5 = User.query.filter_by(username=user5_id).first()
    user6 = User.query.filter_by(username=user6_id).first()
    user7 = User.query.filter_by(username=user7_id).first()
    user8 = User.query.filter_by(username=user8_id).first()
    user9 = User.query.filter_by(username=user9_id).first()
    user10 = User.query.filter_by(username=user10_id).first()
    user11 = User.query.filter_by(username=user11_id).first()


    user1.following.append(user2)
    user1.following.append(user3)
    user2.following.append(user1)
    user2.following.append(user3)
    user3.following.append(user1)
    user3.following.append(user2)
    user4.following.append(user5)
    user4.following.append(user6)
    user5.following.append(user7)
    user5.following.append(user8)
    user6.following.append(user9)
    user6.following.append(user10)
    user7.following.append(user8)
    user7.following.append(user9)
    user8.following.append(user10)
    user9.following.append(user4)
    user10.following.append(user5)
    user11.following.append(user1)

    db.session.commit()

def undo_follows():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.follows RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM follows"))

    db.session.commit()
