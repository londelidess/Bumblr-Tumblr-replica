from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_posts():
    post1 = Post(
        content="The Future of AI: Impact on Everyday Life", user_id=1)
    post2 = Post(
        content="Mindfulness Meditation: Cultivating Peace Amidst Chaos", user_id=1)
    post3 = Post(
        content="Unraveling the Mystique of Machu Picchu: A Journey Through Time", user_id=2)
    post4 = Post(
        content= "Savoring the Flavors of Thailand: A Culinary Adventure", user_id=2)
    post5 = Post(
        content= "Embracing Change: Navigating Life's Transformative Crossroads", user_id=3)

    posts = [post1, post2, post3, post4, post5]
    add_posts = [db.session.add(post) for post in posts]


    db.session.commit()
    return posts


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
