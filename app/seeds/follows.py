from app.models import db, follow, User, environment, SCHEMA
from sqlalchemy.sql import text

def seed_follows():
    # Replace this with your actual user IDs
    user1_id = "Demo"
    user2_id = "marnie"
    user3_id = "bobbie"

    # Get the user objects based on their IDs
    user1 = User.query.filter_by(username = user1_id).first()
    user2 = User.query.filter_by(username = user2_id).first()
    user3 = User.query.filter_by(username = user3_id).first()

    # Add follow relationships
    user1.following.append(user2)
    user1.following.append(user3)
    user2.following.append(user1)
    user2.following.append(user3)
    user3.following.append(user1)
    user3.following.append(user2)
    # Commit the changes to the database
    db.session.commit()

def undo_follows():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.follows RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM follows"))

    db.session.commit()
