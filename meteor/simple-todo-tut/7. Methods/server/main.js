import { Meteor } from 'meteor/meteor';
import { TaskCollection } from '/imports/db/TaskCollection';
import { Accounts } from "meteor/accounts-base";
import "/imports/api/tasksMethods";

function insertTask(taskText, user) {
  return TaskCollection.insert({ 
    text: taskText,
    userId: user._id,
    createdAt: new Date()
  })
}

const SEED_USERNAME = "user";
const SEED_PASSWORD = "password";

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD
    })
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME);

  if (TaskCollection.find().count() === 0) {
    [
      "Clean House",
      "Eat Pizza",
      "Meet Friends",
      "Play Games",
      "Learn Code",
      "Another task"
    ].forEach(taskText => insertTask(taskText, user))
  }
})