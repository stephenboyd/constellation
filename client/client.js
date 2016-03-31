Meteor.subscribe("posts");
Meteor.subscribe("allUsers");

Template.layout.onCreated(function () {
  var template = this;
  template.autorun(function () {
    template.subscribe('posts');
  });
});

Template.layout.helpers({
  appReady: function () {
    return Template.instance().subscriptionsReady();
  }
});

Template.postsArea.helpers({
  posts: function () {
    return Posts.find({}, {sort: {createdAt: -1}});
  },
});

Template.body.events({
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

Template.newPostModal.events({
  "submit .new-post": function (event) {
    event.preventDefault();
    var post = { text: $(event.target).find('[name=text]').val() };
    Meteor.call("addPost", post, function(error, result){
      if (error) return alert(error.reason);
      $('#modal-new-post').modal('hide');
      event.target.text.value = "";
      //Router.go('postPage', {_id: result._id});
    return false;
    });
  },
});

Template.newPostModal.rendered = function () {
  $('#modal-new-post').on('shown.bs.modal', function () {
    $("#new-post-text").focus();
  });
};

Template.newCommentForm.events({
  "submit .new-comment": function (event) {
    event.preventDefault();
    var comment = {
      text: $(event.target).find('[name=text]').val(),
      postId: this._id
    };
    Meteor.call("addComment", comment, function(error, commentId){
      if (error) return alert(error.reason);
      event.target.text.value = "";
      return false;
    });
  },
});

Template.editPost.events({
  "submit .update-post": function (event) {
    event.preventDefault();
    var text = event.target.text.value;
    var thisPostId = Session.get("editPostId");
    Meteor.call("updatePost", thisPostId, text);
    event.target.text.value = "";
    $('.updateTextArea').val("");
    $('.modal-edit-modal-sm').modal('hide'); // whatever
    return false;
  },
});
  


Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});

Template.postHeader.events({
  "click .delete": function () {
    Meteor.call("deletePost", this._id);
    Router.go('/');
  },
  "click .edit": function () {
    Session.set("editPostId", this._id);
    $('.updateTextArea').val(this.text);
    $('.updateTextArea').focus();
  },
});

Template.postHeader.helpers({
  isOwner: function () {
    return this.owner === Meteor.userId();
  },
});

Template.body.onRendered( function () {
  console.log("body template rendered");
});


Template.post.onRendered( function () {
  $("li[data-reactive-block-grid-item-id]").addClass("col-lg-4 col-md-6 col-sm-6 col-xs-12 item-li");
});


Template.postPage.onCreated(function () {
  var self = this;
  var postId = Router.current().params._id;
  self.autorun(function() {
    console.log(postId);
  });
});


Template.postPage.helpers ({
  ready: function () {
    return Template.instance().subscriptionsReady();
  },
  postPageData: function () {
    if (Router.current().params._id === undefined) {
      return Posts.findOne({_id: this._id});
    } else {
      return Posts.findOne({_id: Router.current().params._id});
    }
  },
  isOwner: function () {
    return this.owner === Meteor.userId();
  },
  comments: function () {
    return Comments.find({postId: this._id}, {sort: {createdAt: -1}});
  },
  commentsCount: function () {
    return Comments.find({postId: this._id}).count();
  },
  subscribeToComments: function () {
    Meteor.subscribe("comments", this._id);
  }
});

Template.userPage.helpers ({
  ready: function () {
    console.log("userpage ready");
    return Template.instance().subscriptionsReady();
  },
  userPageData: function () {
    console.log("userpage data loaded");
    console.log("params: " + Router.current().params);
    console.log("username: " + Meteor.users.findOne({_id: Router.current().params.username}));
    var user = Meteor.users.findOne(
      { username: Router.current().params.username},
      { username: 1, _id: 1, following: 1 }
    );
    console.log(user);
    return user;
  },
  postsByUser: function () {
    console.log("posts by user...");
    return Posts.find({owner: this._id}, {sort: {createdAt: -1}});
  },
});

Template.following.helpers ({
  followedPosts: function () {
    var followedUsers = Meteor.user().following;
    var postsByFollowedUsers = Posts.find(
      {owner: { $in: followedUsers }},
      {sort: {createdAt: -1}}
    );
    return postsByFollowedUsers;
    }
});

Template.profileWidget.helpers ({
  following: function () {
    if (Meteor.user().following.indexOf(Template.parentData(0)._id) !== -1) {
      console.log(Meteor.user().following.indexOf(Template.parentData(0)._id));
      console.log("following");
      return true;
    } else {
      console.log(Meteor.user().following.indexOf(Template.parentData(0)._id));
      console.log("not following");
      return false;
    }
  }
});

Template.profileWidget.events ({
  "click .follow-button": function () {
    console.log("follow button clicked");
    console.log(this);
    console.log(this._id);
    Meteor.call('follow', this._id, function(error, result) {
      if (error) console.log(error);
    });
  },
  "click .unfollow-button": function () {
    console.log("unfollow button clicked");
    console.log(this);
    console.log(this._id);
    Meteor.call('unfollow', this._id, function(error, result) {
      if (error) console.log(error);
    });
  },
});

UI.registerHelper("prettifyDate", function(timestamp) {
  return moment(timestamp).fromNow();
});

UI.registerHelper("currentUserName", function () {
  return Meteor.user().username;
});

UI.registerHelper("uglifyDate", function(timestamp) {
  return moment(timestamp).unix();
});
