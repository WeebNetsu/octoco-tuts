import { check } from "meteor/check";
import { TaskCollection } from "../db/TaskCollection";

Meteor.methods({
    'tasks.insert'(text){
        check(text, String);

        if(!this.userId){
            throw new Meteor.Error("Not Authorized");
        }

        TaskCollection.insert({
            text,
            createdAt: new Date,
            userId: this.userId
        })
    },
    "tasks.remove"(taskId){
        check(taskId, String);

        if(!this.userId){
            throw new Meteor.Error("Not Authorized");
        }

        TaskCollection.remove(taskId);
    },
    "tasks.setIsChecked"(taskId, isChecked){
        check(taskId, String);
        check(isChecked, Boolean);

        if(!this.userId){
            throw new Meteor.Error("Not Authorized");
        }

        TaskCollection.update(taskId, {
            $set: {
                isChecked
            }
        });
    }
})