from app.models import db, Media, Post, environment, SCHEMA
from sqlalchemy.sql import text


def seed_medias():
    media1 = Media(post_id=1, media_type='image', media_url='https://a0.muscache.com/im/pictures/prohost-api/Hosting-909399031194511254/original/5a311792-559c-45de-8352-f14b4fff9f78.jpeg?im_w=1200')
    media2 = Media(post_id=2, media_type='image', media_url='https://images-ext-2.discordapp.net/external/x1fwKg75qUWD3gq8-hForasipeJ2Un8byqkyLYO-Htc/https/www.thinkrightme.com/wp-content/uploads/2022/02/shutterstock_1064525450.jpg?width=720&height=429')
    media3 = Media(post_id=3, media_type='image', media_url='https://1.bp.blogspot.com/-RuyIFjxvzug/XpyWTDH1-LI/AAAAAAABgYY/1IuSnJ_Y-lcPLSav2SGo-86mDWEw-yKBACPcBGAsYHg/s1200-rw/photos_of_machu_picchu_peru_4.jpg')
    media4 = Media(post_id=4, media_type='image', media_url='https://images-ext-1.discordapp.net/external/Uun0K68F2pAJD41fP9UgeY_ItHSVdP8u-_Z6qAQ1IbY/https/nerdnomads.com/wp-content/uploads/2021/02/Street-food-Yaowarat-Street-Chinatown-Bangkok.jpg?width=720&height=480')
    media5 = Media(post_id=5, media_type='image', media_url='https://cdn.pixabay.com/photo/2023/05/30/22/20/ai-generated-8030115_1280.png')
    media6 = Media(post_id=1, media_type='image', media_url='https://a0.muscache.com/im/pictures/prohost-api/Hosting-909399031194511254/original/3752f812-e337-4474-80e7-3641ddffe9ad.jpeg?im_w=1440')

    db.session.add(media1)
    db.session.add(media2)
    db.session.add(media3)
    db.session.add(media4)
    db.session.add(media5)
    db.session.add(media6)
    db.session.commit()

def undo_medias():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.medias RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM medias"))
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
