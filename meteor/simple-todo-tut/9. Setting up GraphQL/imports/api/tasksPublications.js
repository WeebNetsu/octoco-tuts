import { Meteor } from "meteor/meteor";
import { TaskCollection } from "/imports/db/TaskCollection";

Meteor.publish("tasks", function publishTasks(){
    return TaskCollection.find({ userId: this.userId })
})