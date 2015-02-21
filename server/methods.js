Meteor.methods({

  addPost: function (text) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    if (text === ""){
      throw new Meteor.Error("empty field");
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

  updatePost: function (postId, newText) {
    var post = Posts.findOne(postId);
    if (newText === ""){
      throw new Meteor.Error("empty field");
    }
    if (post.owner !== Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    } else {
    Posts.update(postId, {$set: {"text": newText} });
    }
  },

});
