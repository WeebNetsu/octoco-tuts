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
    Task: {
        user({ userId }) {
            return Meteor.users.findOne(userId);
        }
    }
};