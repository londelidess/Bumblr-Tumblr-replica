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
    post6 = Post(
        content="Starry Nights: A Deep Dive into the Cosmos", user_id=3, post_date = datetime_formatted)
    post7 = Post(
        content="The Art of Minimalism: Living with Less", user_id=4, post_date = datetime_formatted)
    post8 = Post(
        content="The Magic of Old Books: A Journey into Literature's Past", user_id=4, post_date = datetime_formatted)
    post9 = Post(
        content="Rediscovering Nature: The Beauty of National Parks", user_id=5, post_date = datetime_formatted)
    post10 = Post(
        content="The Rhythms of Jazz: A Musical Exploration", user_id=5, post_date = datetime_formatted)
    post11 = Post(
        content="The Intricacies of Origami: The Art of Paper Folding", user_id=6, post_date = datetime_formatted)
    post12 = Post(
        content="The World of Coffee: From Bean to Brew", user_id=6, post_date = datetime_formatted)
    post13 = Post(
        content="The Marvels of Modern Architecture: Iconic Buildings of the 21st Century", user_id=7, post_date = datetime_formatted)
    post14 = Post(
        content="The Joy of Painting: Expressing Emotions through Colors", user_id=7, post_date = datetime_formatted)
    post15 = Post(
        content="The Digital Revolution: How Technology is Shaping Our Future", user_id=8, post_date = datetime_formatted)
    post16 = Post(
        content="Why did the programmer quit his job? He didn't get arrays.", user_id=9, post_date=datetime_formatted)
    post17 = Post(
        content="The Wonders of the Deep Sea: Exploring the Unknown", user_id=9, post_date=datetime_formatted)
    post18 = Post(
        content="Why did the scarecrow win an award? Because he was outstanding in his field!", user_id=10, post_date=datetime_formatted)
    post19 = Post(
        content="The Evolution of Dance: From Classical to Contemporary", user_id=10, post_date=datetime_formatted)
    post20 = Post(
        content="How do you organize a space party? You planet!", user_id=11, post_date=datetime_formatted)
    post21 = Post(
        content="The Allure of Vintage Cars: A Drive Down Memory Lane", user_id=11, post_date=datetime_formatted)
    post22 = Post(
        content="Why did the bicycle fall over? It was two-tired!", user_id=2, post_date=datetime_formatted)
    post23 = Post(
        content="The Magic of Animation: Bringing Stories to Life", user_id=2, post_date=datetime_formatted)
    post24 = Post(
        content="The Science of Sleep: Unlocking the Secrets of Dreams", user_id=3, post_date=datetime_formatted)
    post25 = Post(
        content="Why did the tomato turn red? Because it saw the salad dressing!", user_id=3, post_date=datetime_formatted)
    post26 = Post(
        content="The Legacy of Ancient Civilizations: From Pyramids to Temples", user_id=1, post_date=datetime_formatted)
    post27 = Post(
        content="Why don't scientists trust atoms? Because they make up everything!", user_id=4, post_date=datetime_formatted)
    post28 = Post(
        content="The Power of Photography: Capturing Moments in Time", user_id=5, post_date=datetime_formatted)
    post29 = Post(
        content="Why did the golfer bring two pairs of pants? In case he got a hole in one!", user_id=5, post_date=datetime_formatted)
    post30 = Post(
        content="The Beauty of Ballet: Grace in Motion", user_id=6, post_date=datetime_formatted)
    post31 = Post(
        content="Getting ready for my big fight with Musky Musk!", user_id=7, post_date = datetime_formatted,)

    posts = [post1, post2, post3, post4, post5, post6, post7, post8, post9, post10, post11, post12, post13, post14, post15, post16, post17, post18, post19, post20, post21, post22, post23, post24, post25, post26, post27, post28, post29, post30, post31]
    add_posts = [db.session.add(post) for post in posts]


    db.session.commit()
    return posts


def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
