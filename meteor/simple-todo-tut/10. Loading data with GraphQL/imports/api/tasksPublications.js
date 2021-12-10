import { Meteor } from "meteor/meteor";
import { TaskCollection } from "/imports/db/TaskCollection";

Meteor.publish("tasks", function publishTasks() {
    return TaskCollection.find( // here we specify the specific item we want
        { userId: this.userId },
        { fields: { _id: 1, isChecked: 1, userId: 1 } }
    );
})