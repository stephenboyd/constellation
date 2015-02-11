Meteor.methods({

  addPost: function (text) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    Posts.insert({
      text: text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },

  deletePost: function (postId) {
    Posts.remove(postId);
  },

});
