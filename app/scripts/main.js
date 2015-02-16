/* jshint devel:true */
console.log("PPL starting..");

var s = Snap(2000,2000);
var tl = new TimelineLite();

Snap.load("/ppl-pie-menu.svg", function (f) {
  // amend whilst loading..
  var innerLeft   = f.select("#innerLeft");
  var innerTop    = f.select("#innerTop");
  var innerBottom = f.select("#innerBottom");

  var outerLeft   = f.selectAll("#outerLeft path").attr({visibility: "hidden"});
  var outerTop    = f.selectAll("#outerTop path").attr({visibility: "hidden"});
  var outerBottom = f.selectAll("#outerBottom path").attr({visibility: "hidden"});

  // attach to DOM
  s.append(f);

  // playtime
  tl.staggerFrom($("#innerLeft, #innerTop, #innerBottom"), 1, { autoAlpha: 0 }, 0.2)


  // events
  innerLeft.node.onclick = function () {
    // tl.staggerFrom(".outerLeft", 1, { autoAlpha: 0 }, 0.05);
    tl.staggerFrom($("#outerLeft path"), 1, { autoAlpha: 0 }, 0.05);
  };

  $("#outerLeft path").click(function(index) {
    goPlaylist($(this));
  });

  innerTop.node.onclick = function () {
    tl.staggerFrom($("#outerTop path"), 1, { autoAlpha: 0 }, 0.05);
  };

  $("#outerTop path").click(function(index) {
    goPlaylist($(this));
  });

  innerBottom.node.onclick = function () {
    tl.staggerFrom($("#outerBottom path"), 1, { autoAlpha: 0 }, 0.05);
  };

  $("#outerBottom path").click(function(index) {
    goPlaylist($(this));
  });

  $("#home").click(function(index) {
    goHome();
  });
  // innerLeft.text(190, 80, "Top Left foo "+tr.node);
});


function goPlaylist(el) {
  console.log("goPlayList -> ");
  console.log(el);

  tl.to($("svg"), 0.5, { autoAlpha: 0 })
    .to($("#playlist"), 0.5, { autoAlpha: 1, onComplete: playVideo})


}

function goHome() {
  console.log("goHome");
  tl.to($("#playlist"), 0.5, { autoAlpha: 0, onComplete: pauseVideo })
    .to($("svg"), 0.5, { autoAlpha: 1 })
}

function playVideo() {
  $("#playlist video")[0].play();
}
function pauseVideo() {
  $("#playlist video")[0].pause();
}
