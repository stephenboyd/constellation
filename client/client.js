Meteor.subscribe("posts");
Meteor.subscribe("allUsers");

Template.body.helpers({
  posts: function () {
    return Posts.find({}, {sort: {createdAt: -1}});
  },
});

Template.editProfile.helpers({
  postsByUser: function () {
    id = Meteor.userId();
    return Posts.find({owner: id}, {sort: {createdAt: -1}});
  },
});

Template.postsArea.helpers({
  posts: function () {
    return Posts.find({}, {sort: {createdAt: -1}});
  },
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
  },
  "click #user-options-button": function () {
    $('.profile-field').val(Meteor.user().profile);
  },
  "submit .edit-profile": function (event) {
    var text = event.target.text.value;
    Meteor.call("updateProfile", text);
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
  },
  "click .username-link": function () {
    var userProfile = Meteor.users.findOne(this.owner);
    var profileText = "";
    if (userProfile.profile === undefined){
      profileText = "";
    } else {
      profileText = userProfile.profile;
    }
    $('#profile-title').text(userProfile.username);
    $('#profile-text').text(profileText);
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

UI.registerHelper("currentUserName", function () {
  return Meteor.user().username;
});

