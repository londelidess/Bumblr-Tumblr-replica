from app.models import db, follow, User, environment, SCHEMA
from sqlalchemy.sql import text

def seed_follows():
    # Replace this with your actual user IDs
    user1_id = 1
    user2_id = 2
    user3_id = 3

    # Get the user objects based on their IDs
    user1 = User.query.get(user1_id)
    user2 = User.query.get(user2_id)
    user3 = User.query.get(user3_id)

    # Add follow relationships
    user1.followed_id.append(user2)
    user1.followed_id.append(user3)
    user2.followed_id.append(user1)
    user2.followed_id.append(user3)
    user3.followed_id.append(user1)
    user3.followed_id.append(user2)
    # Commit the changes to the database
    db.session.commit()

def undo_follows():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.follows RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM follows"))

    db.session.commit()    