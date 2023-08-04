from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


formatted_date = datetime.now()
datetime_formatted = formatted_date.strftime("%Y-%m-%d %H:%M:%S")


def seed_posts():
    post1 = Post(
        content="My dream houses...", user_id=1, post_date = datetime_formatted,)
    post2 = Post(
        content="Mindfulness Meditation: Cultivating Peace Amidst Chaos", user_id=1, post_date = datetime_formatted)
    post3 = Post(
        content="Unraveling the Mystique of Machu Picchu: A Journey Through Time", user_id=2, post_date = datetime_formatted)
    post4 = Post(
        content= "Savoring the Flavors of Thailand: A Culinary Adventure", user_id=2, post_date = datetime_formatted)
    post5 = Post(
        content= "The Future of AI: Impact on Everyday Life", user_id=3, post_date = datetime_formatted)

    posts = [post1, post2, post3, post4, post5]
    add_posts = [db.session.add(post) for post in posts]


    db.session.commit()
    return posts


def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
