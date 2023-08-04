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
    like8 = Like(user_id=4, post_id=2)
    like9 = Like(user_id=5, post_id=2)
    like10 = Like(user_id=6, post_id=2)
    like11 = Like(user_id=4, post_id=3)
    like12 = Like(user_id=5, post_id=4)
    like13 = Like(user_id=6, post_id=5)
    like14 = Like(user_id=7, post_id=6)
    like15 = Like(user_id=8, post_id=6)
    like16 = Like(user_id=4, post_id=7)
    like17 = Like(user_id=5, post_id=8)
    like18 = Like(user_id=6, post_id=9)
    like19 = Like(user_id=7, post_id=10)
    like20 = Like(user_id=8, post_id=10)
    like21 = Like(user_id=4, post_id=11)
    like22 = Like(user_id=5, post_id=12)
    like23 = Like(user_id=6, post_id=13)
    like24 = Like(user_id=7, post_id=14)
    like25 = Like(user_id=8, post_id=15)

    all_likes = [like1, like2, like3, like4, like5, like6, like7, like8, like9, like10, like11, like12, like13, like14, like15, like16, like17, like18, like19, like20, like21, like22, like23, like24, like25]
    add_likes = [db.session.add(like) for like in all_likes]
    db.session.commit()
    return all_likes


def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))

    db.session.commit()
