/* jshint devel:true */
console.log("PPL starting..");

var s = Snap(1024, 768);

Snap.load("/ppl-pie-menu.svg", function (f) {
  // amend whilst loading..
  var innerleft   = f.select("#innerleft");
  var innertop    = f.select("#innertop");
  var innerbottom = f.select("#innerbottom");

  var outerleft   = f.selectAll("#outerleft path").attr({visibility: "hidden"});
  var outertop    = f.selectAll("#outertop path").attr({visibility: "hidden"});
  var outerbottom = f.selectAll("#outerbottom path").attr({visibility: "hidden"});

  // attach to DOM
  s.append(f);

  // playtime
  var tl = new TimelineLite();
  tl.staggerFrom(".innerPie", 1, { autoAlpha: 0 }, 0.2)


  // events
  innerleft.node.onclick = function () {
    tl.staggerFrom(".outerleft", 1, { autoAlpha: 0 }, 0.05);
  };

  innertop.node.onclick = function () {
    tl.staggerFrom(".outertop", 1, { autoAlpha: 0 }, 0.05);
  };

  innerbottom.node.onclick = function () {
    tl.staggerFrom(".outerbottom", 1, { autoAlpha: 0 }, 0.05);
  };

  // innerleft.text(190, 80, "Top Left foo "+tr.node);
});
