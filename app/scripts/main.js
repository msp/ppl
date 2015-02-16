/* jshint devel:true */
console.log("PPL starting..");

var s = Snap(2000,2000);

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
  var tl = new TimelineLite();
  tl.staggerFrom($("#innerLeft, #innerTop, #innerBottom"), 1, { autoAlpha: 0 }, 0.2)


  // events
  innerLeft.node.onclick = function () {
    // tl.staggerFrom(".outerLeft", 1, { autoAlpha: 0 }, 0.05);
    tl.staggerFrom($("#outerLeft path"), 1, { autoAlpha: 0 }, 0.05);
  };

  innerTop.node.onclick = function () {
    tl.staggerFrom($("#outerTop path"), 1, { autoAlpha: 0 }, 0.05);
  };

  innerBottom.node.onclick = function () {
    tl.staggerFrom($("#outerBottom path"), 1, { autoAlpha: 0 }, 0.05);
  };

  // innerLeft.text(190, 80, "Top Left foo "+tr.node);
});
