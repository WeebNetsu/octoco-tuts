import { Mongo } from "meteor/mongo";

// cate function here, so we can use it everywhere
const tasksCollection = Object.assign(new Mongo.Collection('tasks'), {
    save({ text, userId }) {
        // another benefit is that you can use "this" instead
        // of TaskCollection when working with db
        const newTaskId = this.insert({
            text,
            userId,
            createdAt: new Date()
        });
        return this.findOne(newTaskId);
    },
    setChecked({ taskId, isChecked }) {
        this.update(taskId, {
            $set: {
                isChecked: !isChecked
            }
        });
    },
    delete({ taskId }) {
        this.remove(taskId);
    },
})

export { tasksCollection as TaskCollection }

// export const TaskCollection = new Mongo.Collection("tasks");