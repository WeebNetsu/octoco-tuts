export default { // create resulver
    Query: {
        //   resolver takes in 4 arguments
        // args -> if argument passed in, eg: loggedUser(id: String): User
        async loggedUser(root, args, context, info) {
            if (!context.userId) { // check if user ID exists in context
                return null;
            }
            //   returns user
            return Meteor.users.findOne(context.userId);
        },
    },
}