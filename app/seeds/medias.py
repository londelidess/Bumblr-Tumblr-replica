from app.models import db, Media, Post, environment, SCHEMA
from sqlalchemy.sql import text


def seed_medias():
    media1 = Media(post_id=1, media_type='image', media_url='https://a0.muscache.com/im/pictures/prohost-api/Hosting-909399031194511254/original/5a311792-559c-45de-8352-f14b4fff9f78.jpeg?im_w=1200')
    media2 = Media(post_id=2, media_type='image', media_url='https://images-ext-2.discordapp.net/external/x1fwKg75qUWD3gq8-hForasipeJ2Un8byqkyLYO-Htc/https/www.thinkrightme.com/wp-content/uploads/2022/02/shutterstock_1064525450.jpg?width=720&height=429')
    media3 = Media(post_id=3, media_type='image', media_url='https://1.bp.blogspot.com/-RuyIFjxvzug/XpyWTDH1-LI/AAAAAAABgYY/1IuSnJ_Y-lcPLSav2SGo-86mDWEw-yKBACPcBGAsYHg/s1200-rw/photos_of_machu_picchu_peru_4.jpg')
    media4 = Media(post_id=4, media_type='image', media_url='https://images-ext-1.discordapp.net/external/Uun0K68F2pAJD41fP9UgeY_ItHSVdP8u-_Z6qAQ1IbY/https/nerdnomads.com/wp-content/uploads/2021/02/Street-food-Yaowarat-Street-Chinatown-Bangkok.jpg?width=720&height=480')
    media5 = Media(post_id=5, media_type='image', media_url='https://cdn.pixabay.com/photo/2023/05/30/22/20/ai-generated-8030115_1280.png')
    media6 = Media(post_id=1, media_type='image', media_url='https://a0.muscache.com/im/pictures/prohost-api/Hosting-909399031194511254/original/3752f812-e337-4474-80e7-3641ddffe9ad.jpeg?im_w=1440')
    media7 = Media(post_id=6, media_type='image', media_url='https://scx2.b-cdn.net/gfx/news/2016/stellarghost.jpg')
    media8 = Media(post_id=7, media_type='image', media_url='https://images.adsttc.com/media/images/6290/ac61/3e4b/31f4/d600/0001/medium_jpg/155108.jpg?1653648474')
    media9 = Media(post_id=8, media_type='image', media_url='https://i.pinimg.com/564x/00/bc/fa/00bcfa572b8245a8791dd3fc350fa89a.jpg')
    media10 = Media(post_id=9, media_type='image', media_url='https://publish.purewow.net/wp-content/uploads/sites/2/2021/04/national-parks-in-california-yosemite.jpg?fit=728%2C921')
    media11 = Media(post_id=10, media_type='image', media_url='https://www.udiscovermusic.com/wp-content/uploads/2020/12/Jazz-New-Thing-Featured-Art.jpg')
    media12 = Media(post_id=11, media_type='image', media_url='https://assets.st-note.com/img/1654584322718-eCGyAs8Q9o.jpg?width=2000height=2000fit=boundsquality=85')
    media13 = Media(post_id=12, media_type='image', media_url='https://i.etsystatic.com/6630676/r/il/8f86db/2219511397/il_fullxfull.2219511397_c2a7.jpg')
    media14 = Media(post_id=13, media_type='image', media_url='https://luxurycolumnist.com/wp-content/uploads/2022/02/Oscar-Niemeyer-International-Cultural-Centre-Asturias-Most-Famous-Architects.jpg')
    media15 = Media(post_id=14, media_type='image', media_url='https://i.pinimg.com/564x/9e/90/e7/9e90e750e9225d652c259f06b63ecb01.jpg')
    media16 = Media(post_id=15, media_type='image', media_url='https://image.cnbcfm.com/api/v1/image/106964911-1635070875003-Xpeng_Flying_Car_.png?v=1635071509&w=1600&h=900')


    db.session.add(media1)
    db.session.add(media2)
    db.session.add(media3)
    db.session.add(media4)
    db.session.add(media5)
    db.session.add(media6)
    db.session.add(media7)
    db.session.add(media8)
    db.session.add(media9)
    db.session.add(media10)
    db.session.add(media11)
    db.session.add(media12)
    db.session.add(media13)
    db.session.add(media14)
    db.session.add(media15)
    db.session.add(media16)

    db.session.commit()

def undo_medias():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.medias RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM medias"))
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
