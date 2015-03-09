Meteor.methods({

  addPost: function (post) {
    check(Meteor.userId(), String);
    if (post.text === ""){
      throw new Meteor.Error("empty field");
    }
    check(post, {
      text: String
    });
    var postId = Posts.insert({
      title: post.title,
      text: post.text,
      image: post.image,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
    return {
      _id: postId
    };
  },

  deletePost: function (postId) {
    check(postId, String);
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

  updateProfile: function (newText) {
    Meteor.users.update(this.userId, {$set: {profile: newText} } );
  }

});
