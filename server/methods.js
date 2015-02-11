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
    var post = Posts.findOne(postId);
    if (post.owner !== Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    } else {
      Posts.remove(postId);
    }
  },

});
