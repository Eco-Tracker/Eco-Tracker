# Eco-Tracker

Challenges Table:

id (unique identifier for each challenge)
name (name/title of the challenge)
description (description of the challenge)
deadline (deadline for completing the challenge)
points (points awarded for completing the challenge)
isCompleted (boolean indicating whether the challenge has been completed)



Users Table:

id (unique identifier for each user)
name (user's name)


UserChallenges Table:

id (unique identifier for each user challenge entry)
userId (foreign key referencing the Users table)
challengeId (foreign key referencing the Challenges table)
completedDate (date when the challenge was completed)
With this structure, you can establish a many-to-many relationship between users and challenges. The Challenges table will store information about each challenge, including its name, description, deadline, points, and completion status. The Users table will store user-specific information, such as the user's name. The UserChallenges table will track the completion of challenges by users, storing the relationship between a user and a specific challenge, along with the completion date.

For the front-end, you can create React Native components:

ChallengesComponent: Displays a list of available challenges to the user, showing their names, descriptions, deadlines, and completion status.


ProgressComponent: Shows the user's progress, including completed challenges and earned points.


For the back-end, you'll need API endpoints to handle operations related to challenges and user-challenge interactions:

GET /challenges: Retrieve all available challenges.
POST /user-challenges: Create a user challenge entry when a user selects and starts a challenge.
GET /user-challenges: Retrieve user-specific challenge information, including completion status.
PUT /user-challenges/:id: Update the completion status and completion date of a user challenge.

