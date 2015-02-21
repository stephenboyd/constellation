Meteor.subscribe("posts");
Meteor.subscribe("userData");

Template.body.helpers({
  posts: function () {
    return Posts.find({}, {sort: {createdAt: -1}});
  }
});

Template.body.events({
  "submit .new-post": function (event) {
    var text = event.target.text.value;
    Meteor.call("addPost", text);
    event.target.text.value = "";
    $('.modal').modal('hide');
    return false;
  },
  "submit .update-post": function (event) {
    var text = event.target.text.value;
    Meteor.call("updatePost", thisPostId, text);
    event.target.text.value = "";
    $('.updateTextArea').val("");
    $('.modal').modal('hide');
    return false;
  }

});

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});

Template.post.events({
  "click .close": function () {
    $('.modal').modal('hide');
  },
  "click .delete": function () {
    Meteor.call("deletePost", this._id);
  },
  "click .edit": function () {
    var postText = this.text;
    thisPostId = this._id;
    $('.updateTextArea').val(postText);
  }
});

Template.post.helpers({
  isOwner: function () {
    return this.owner === Meteor.userId();
  }
});

UI.registerHelper("prettifyDate", function(timestamp) {
  return moment(timestamp).fromNow();
});

