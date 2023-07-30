from app.models import db, Like, environment, SCHEMA
from sqlalchemy.sql import text

def seed_likes():
    like1 = Like(user_id=1, post_id=1)
    like2 = Like(user_id=2, post_id=1)
    like3 = Like(user_id=3, post_id=1)
    like4 = Like(user_id=1, post_id=3)
    like5 = Like(user_id=2, post_id=3)
    like6 = Like(user_id=1, post_id=4)
    like7 = Like(user_id=3, post_id=5)

    all_likes = [like1, like2, like3, like4, like5, like6, like7]
    add_likes = [db.session.add(like) for like in all_likes]
    db.session.commit()
    return all_likes


def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))

    db.session.commit()
