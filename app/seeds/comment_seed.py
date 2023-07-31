from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text
# from faker import Faker
# fake = Faker()
from datetime import date


def seed_comments():

    post1 = Comment(
        user_id= 1,
        post_id= 1,
        content= "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?",
        post_date = date.today(),
    )

    post2 = Comment(
        user_id= 1,
        post_id= 2,
        content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?",
        post_date = date.today(),
    )

    post3 = Comment(
        user_id= 2,
        post_id= 1,
        content="Test test test test",
        post_date = date.today(),
    )

    post4 = Comment(
        user_id=2,
        post_id=2,
        content="test testes jlkasjdaslkjdlkqjwlekjqwklejqwklejqwklejqlkwj",
        post_date = date.today(),
    )

    post5 = Comment(
        user_id= 3,
        post_id= 1,
        content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?",
        post_date = date.today(),
    )

    post6 = Comment(
        user_id= 3,
        post_id= 2,
        content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?",
        post_date = date.today(),
    )

    post7= Comment(
        user_id= 1,
        post_id= 3,
        content= "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?",
        post_date = date.today(),
    )

    post8 = Comment(
        user_id= 1,
        post_id= 4,
        content= "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?",
        post_date = date.today(),
    )

    post9 = Comment(
        user_id= 1,
        post_id= 5,
        content= "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?",
        post_date = date.today(),
    )

    post10 = Comment(
        user_id= 2,
        post_id= 3,
        content= "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?",
        post_date = date.today(),
    )

    post11 = Comment(
        user_id= 2,
        post_id= 4,
        content= "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?",
        post_date = date.today(),
    )

    post12 = Comment(
        user_id= 2,
        post_id= 5,
        content= "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?",
        post_date = date.today(),
    )

    post13 = Comment(
        user_id= 3,
        post_id= 3,
        content= "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?",
        post_date = date.today(),
    )

    post14 = Comment(
        user_id= 3,
        post_id= 4,
        content= "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?",
        post_date = date.today(),
    )

    post15 = Comment(
        user_id= 3,
        post_id= 5,
        content= "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?",
        post_date = date.today(),
    )


    all_comments = [post1, post2, post3, post4, post5, post6, post7, post8, post9, post10, post11, post12, post13, post14, post15]
    add_comments = [db.session.add(comment) for comment in all_comments]

    db.session.commit()
    return all_comments


def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
