import { TaskCollection } from "/imports/db/TaskCollection";

export default {
    Query: {
        async tasks(root, args, { userId }) {
            if (!userId) {
                return null;
            }
            return TaskCollection.find({ userId }, { sort: { createdAt: -1 } });
        },
    },
    Mutation: {
        addTask(root, { text }, { userId }) {
            if (!userId) {
                return null;
            }
            // will use the save method implemented in TaskCollection
            return TaskCollection.save({ text, userId });
        },
        updateTask(root, { taskId, isChecked }, { userId }) {
            if (!userId) {
                return null;
            }
            // will use the save method implemented in TaskCollection
            return TaskCollection.setChecked({ taskId, isChecked });
        },
        deleteTask(root, { taskId }, { userId }) {
            if (!userId) {
                return null;
            }
            // will use the save method implemented in TaskCollection
            return TaskCollection.delete({ taskId });
        },
    },
    Task: {
        user({ userId }) {
            return Meteor.users.findOne(userId);
        }
    }
};