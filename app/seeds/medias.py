from app.models import db, Media, Post, environment, SCHEMA
from sqlalchemy.sql import text


def seed_posts():
    media1 = Media(post_id=1, media_type='image', media_url='https://a0.muscache.com/im/pictures/miso/Hosting-876366816069493464/original/a14921fb-2b11-4aa0-ad32-528556218296.jpeg')
    media2 = Media(post_id=2, media_type='image', media_url='https://a0.muscache.com/im/pictures/0d58f4c9-6ae2-430b-a1a3-9ab2b7b9f6e3.jpg')
    media3 = Media(post_id=3, media_type='image', media_url='https://a0.muscache.com/im/pictures/1bb7152f-a33d-4259-bbab-876a1a95e7e2.jpg')
    media4 = Media(post_id=4, media_type='image', media_url='https://a0.muscache.com/im/pictures/miso/Hosting-696199818482026210/original/6bd407ac-4bf3-48e0-b8fc-2110283dbe51.jpeg')
    media5 = Media(post_id=5, media_type='image', media_url='https://a0.muscache.com/im/pictures/prohost-api/Hosting-29389469/original/5ed29802-44b4-42cb-b452-870a2892df73.jpeg')
    media6 = Media(post_id=1, media_type='image', media_url='https://a0.muscache.com/im/pictures/miso/Hosting-733318328438448084/original/ce2c9ee5-0dc7-4032-8e17-2d17a7a0ba7e.jpeg')

    db.session.add(media1)
    db.session.add(media2)
    db.session.add(media3)
    db.session.add(media4)
    db.session.add(media5)
    db.session.add(media6)
    db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.medias RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM medias"))
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
