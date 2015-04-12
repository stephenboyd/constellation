Posts.find().observeChanges({
  changed: function () {
   // $('#post-area').isotope();
    console.log("post collection updated, post changed");
  },
  removed: function () {
    //$('#post-area').isotope();
    console.log("post collection updated, post removed");
  },
  added: function () {
    //$('#post-area').isotope({itemSelector: '.item'});
    console.log("post collection updated, post added");
  }
});
