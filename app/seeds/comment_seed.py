from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text


from datetime import datetime

formatted_date = datetime.now()
datetime_formatted = formatted_date.strftime("%Y-%m-%d %H:%M:%S")

def seed_comments():

    comment1 = Comment(
        user_id=2,
        post_id=1,
        content="I've always dreamt of a house by the beach. What's your ideal location?",
        post_date=datetime_formatted,
    )

    comment2 = Comment(
        user_id=3,
        post_id=1,
        content="A cozy cabin in the woods is my dream!",
        post_date=datetime_formatted,
    )

    comment3 = Comment(
        user_id=4,
        post_id=2,
        content="Meditation has been a game changer for me. Helps me find peace in the busiest days.",
        post_date=datetime_formatted,
    )

    comment4 = Comment(
        user_id=5,
        post_id=2,
        content="Any recommendations for beginners?",
        post_date=datetime_formatted,
    )

    comment5 = Comment(
        user_id=1,
        post_id=3,
        content="Machu Picchu is on my bucket list! Hope to visit soon.",
        post_date=datetime_formatted,
    )

    comment6 = Comment(
        user_id=6,
        post_id=3,
        content="The history and mystery of this place is so intriguing.",
        post_date=datetime_formatted,
    )

    comment7 = Comment(
        user_id=7,
        post_id=4,
        content="Thai food is my absolute favorite! The blend of flavors is just amazing.",
        post_date=datetime_formatted,
    )

    comment8 = Comment(
        user_id=8,
        post_id=4,
        content="I'd love to go on a culinary tour of Thailand someday.",
        post_date=datetime_formatted,
    )

    comment9 = Comment(
        user_id=2,
        post_id=5,
        content="AI is fascinating. It's incredible to think about how much it's already integrated into our lives.",
        post_date=datetime_formatted,
    )
    comment10 = Comment(
        user_id=3,
        post_id=5,
        content="It's both exciting and a bit scary to think about the future of AI.",
        post_date=datetime_formatted,
    )

    comment11 = Comment(
        user_id=4,
        post_id=6,
        content="The night sky has always fascinated me. So much to explore!",
        post_date=datetime_formatted,
    )

    comment12 = Comment(
        user_id=5,
        post_id=6,
        content="I love stargazing. It's so calming and puts things into perspective.",
        post_date=datetime_formatted,
    )

    comment13 = Comment(
        user_id=6,
        post_id=7,
        content="Minimalism has changed my life. It's more than just decluttering; it's a mindset.",
        post_date=datetime_formatted,
    )

    comment14 = Comment(
        user_id=7,
        post_id=7,
        content="I've been trying to adopt a minimalist lifestyle. Any tips?",
        post_date=datetime_formatted,
    )

    comment15 = Comment(
        user_id=8,
        post_id=8,
        content="There's something magical about old books. The smell, the feel, the history.",
        post_date=datetime_formatted,
    )

    comment16 = Comment(
        user_id=1,
        post_id=8,
        content="I love finding notes and annotations in old books. It's like connecting with someone from the past.",
        post_date=datetime_formatted,
    )

    comment17 = Comment(
        user_id=2,
        post_id=9,
        content="National Parks are a treasure. Everyone should make an effort to visit and preserve them.",
        post_date=datetime_formatted,
    )

    comment18 = Comment(
        user_id=3,
        post_id=9,
        content="Nature is so healing. I always feel rejuvenated after a visit to a national park.",
        post_date=datetime_formatted,
    )

    comment19 = Comment(
        user_id=4,
        post_id=10,
        content="Jazz has such a rich history. Love the improvisation and soul in it.",
        post_date=datetime_formatted,
    )

    comment20 = Comment(
        user_id=5,
        post_id=10,
        content="Any jazz club recommendations?",
        post_date=datetime_formatted,
    )

    comment21 = Comment(
        user_id=6,
        post_id=11,
        content="Origami is such a delicate and intricate art. I admire those who have the patience for it.",
        post_date=datetime_formatted,
    )

    comment22 = Comment(
        user_id=7,
        post_id=11,
        content="I've tried origami a few times. It's so therapeutic!",
        post_date=datetime_formatted,
    )

    comment23 = Comment(
        user_id=8,
        post_id=12,
        content="Coffee is life! I love learning about its journey from bean to cup.",
        post_date=datetime_formatted,
    )

    comment24 = Comment(
        user_id=1,
        post_id=12,
        content="I'm a coffee snob and proud of it! The process makes all the difference.",
        post_date=datetime_formatted,
    )

    comment25 = Comment(
        user_id=2,
        post_id=13,
        content="Modern architecture is so diverse. It's amazing to see how designs have evolved over the years.",
        post_date=datetime_formatted,
    )

    comment26 = Comment(
        user_id=3,
        post_id=13,
        content="Some of these buildings are true masterpieces. Art in the form of structures.",
        post_date=datetime_formatted,
    )

    comment27 = Comment(
        user_id=4,
        post_id=14,
        content="Painting is such a beautiful form of expression. I wish I was better at it!",
        post_date=datetime_formatted,
    )

    comment28 = Comment(
        user_id=5,
        post_id=14,
        content="Colors can convey so much emotion. It's amazing.",
        post_date=datetime_formatted,
    )

    comment29 = Comment(
        user_id=6,
        post_id=15,
        content="The pace of technological advancement is astounding. I wonder where we'll be in another decade.",
        post_date=datetime_formatted,
    )

    comment30 = Comment(
        user_id=7,
        post_id=15,
        content="It's important to ensure that technology benefits everyone and doesn't widen the gap between different groups.",
        post_date=datetime_formatted,
    )
    comment31 = Comment(
        user_id=8,
        post_id=16,
        content="Haha, classic programmer joke! 😂",
        post_date=datetime_formatted,
    )

    comment32 = Comment(
        user_id=1,
        post_id=16,
        content="Ah, classic programmer humor!",
        post_date=datetime_formatted,
    )

    comment33 = Comment(
        user_id=2,
        post_id=17,
        content="The deep sea remains one of the last unexplored frontiers on Earth. It's fascinating.",
        post_date=datetime_formatted,
    )

    comment34 = Comment(
        user_id=3,
        post_id=17,
        content="I've always wanted to go on a deep-sea dive to see some of those mysterious creatures.",
        post_date=datetime_formatted,
    )

    comment35 = Comment(
        user_id=4,
        post_id=18,
        content="Haha! That's a good one. Keep them coming!",
        post_date=datetime_formatted,
    )

    comment36 = Comment(
        user_id=5,
        post_id=18,
        content="I can't get enough of these puns.",
        post_date=datetime_formatted,
    )

    comment37 = Comment(
        user_id=6,
        post_id=19,
        content="Dance is such a powerful medium. It's like poetry in motion.",
        post_date=datetime_formatted,
    )

    comment38 = Comment(
        user_id=7,
        post_id=19,
        content="I've been a fan of classical dance, but contemporary dance has grown on me lately.",
        post_date=datetime_formatted,
    )

    comment39 = Comment(
        user_id=8,
        post_id=20,
        content="I'm definitely using this joke at the next party!",
        post_date=datetime_formatted,
    )

    comment40 = Comment(
        user_id=1,
        post_id=20,
        content="You've got a galaxy of puns up your sleeve!",
        post_date=datetime_formatted,
    )

    comment41 = Comment(
        user_id=2,
        post_id=21,
        content="There's something timeless about vintage cars. Their design, their history...",
        post_date=datetime_formatted,
    )

    comment42 = Comment(
        user_id=3,
        post_id=21,
        content="I recently attended a vintage car show. The level of craftsmanship is amazing.",
        post_date=datetime_formatted,
    )

    comment43 = Comment(
        user_id=4,
        post_id=22,
        content="Haha, that made me smile. More bike puns, please!",
        post_date=datetime_formatted,
    )

    comment44 = Comment(
        user_id=5,
        post_id=22,
        content="That's wheely funny!",
        post_date=datetime_formatted,
    )

    comment45 = Comment(
        user_id=6,
        post_id=23,
        content="Animations have evolved so much over the years. It's an amazing art form.",
        post_date=datetime_formatted,
    )

    comment46 = Comment(
        user_id=7,
        post_id=23,
        content="From hand-drawn to digital, the journey of animation is truly magical.",
        post_date=datetime_formatted,
    )

    comment47 = Comment(
        user_id=8,
        post_id=24,
        content="Sleep is so essential yet so underrated. I'm intrigued by lucid dreaming.",
        post_date=datetime_formatted,
    )

    comment48 = Comment(
        user_id=1,
        post_id=24,
        content="I've always been curious about the science behind dreams. This post is enlightening.",
        post_date=datetime_formatted,
    )

    comment49 = Comment(
        user_id=2,
        post_id=25,
        content="That's a saucy joke! Made my day.",
        post_date=datetime_formatted,
    )

    comment50 = Comment(
        user_id=3,
        post_id=25,
        content="Now that's a fresh joke!",
        post_date=datetime_formatted,
    )

    comment51 = Comment(
        user_id=4,
        post_id=26,
        content="Ancient civilizations have left us with so many wonders. It's a testament to their genius.",
        post_date=datetime_formatted,
    )

    comment52 = Comment(
        user_id=5,
        post_id=26,
        content="The pyramids, the temples, the art... I'm always in awe of their achievements.",
        post_date=datetime_formatted,
    )

    comment53 = Comment(
        user_id=6,
        post_id=27,
        content="Haha, this one is atomic! Good one.",
        post_date=datetime_formatted,
    )

    comment54 = Comment(
        user_id=7,
        post_id=27,
        content="That's elementary! Great joke.",
        post_date=datetime_formatted,
    )

    comment55 = Comment(
        user_id=8,
        post_id=28,
        content="Photography is such a beautiful way to freeze moments. It's a blend of art and science.",
        post_date=datetime_formatted,
    )

    comment56 = Comment(
        user_id=1,
        post_id=28,
        content="I've recently taken up photography. It's amazing how much there is to learn and explore.",
        post_date=datetime_formatted,
    )

    comment57 = Comment(
        user_id=2,
        post_id=29,
        content="Hahaha, that's a hole-some joke!",
        post_date=datetime_formatted,
    )

    comment58 = Comment(
        user_id=3,
        post_id=29,
        content="This one is par for the course! Love it.",
        post_date=datetime_formatted,
    )

    comment59 = Comment(
        user_id=4,
        post_id=30,
        content="Ballet is so mesmerizing to watch. The grace and strength of the dancers is incredible.",
        post_date=datetime_formatted,
    )

    comment60 = Comment(
        user_id=5,
        post_id=30,
        content="I attended a ballet performance last year. It was an unforgettable experience.",
        post_date=datetime_formatted,
    )

    comment61 = Comment(
        user_id=6,
        post_id=31,
        content="Wait, what? You and Musky Musk in a big fight? Count me in as a spectator!",
        post_date=datetime_formatted,
    )

    comment62 = Comment(
        user_id=7,
        post_id=31,
        content="This is going to be legendary. Can't wait!",
        post_date=datetime_formatted,
    )


    all_comments = [comment1, comment2, comment3, comment4, comment5, comment6, comment7, comment8, comment9, comment10, comment11, comment12, comment13, comment14, comment15, comment16, comment17, comment18, comment19, comment20, comment21, comment22, comment23, comment24, comment25, comment26, comment27, comment28, comment29, comment30, comment31, comment32, comment33, comment34, comment35, comment36, comment37, comment38, comment39, comment40, comment41, comment42, comment43, comment44, comment45, comment46, comment47, comment48, comment49, comment50, comment51, comment52, comment53, comment54, comment55, comment56, comment57, comment58, comment59, comment60, comment61, comment62]
    add_comments = [db.session.add(comment) for comment in all_comments]

    db.session.commit()
    return all_comments


def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
