import { Meteor } from 'meteor/meteor';
import { TaskCollection } from '/imports/api/TaskCollection';

function insertTask(taskText) {
  return TaskCollection.insert({ text: taskText })
}

Meteor.startup(() => {
  if (TaskCollection.find().count() === 0) {
    [
      "Clean House",
      "Eat Pizza",
      "Meet Friends",
      "Play Games",
      "Learn Code",
      "Another task"
    ].forEach(insertTask)
  }
})