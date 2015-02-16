/* jshint devel:true */
console.log("PPL starting..");

var s = Snap(1024, 768);

Snap.load("/ppl-pie-menu.svg", function (f) {
  // amend whilst loading..
  var outerleft   = f.selectAll("#outerleft path").attr({ display: "none" });
  var outertop    = f.selectAll("#outertop path").attr({ display: "none" });
  var outerbottom = f.selectAll("#outerbottom path").attr({ display: "none" });

  // attach to DOM
  s.append(f);

  var innerleft   = s.select("#innerleft");
  var innertop    = s.select("#innertop");
  var innerbottom = s.select("#innerbottom");

  // events
  innerleft.node.onmouseover = function () {
    console.log("MSP onmouseover left");
    outerleft.attr(({ display: "block" }));
    // innerleft.transform("t100,100r45t-100,0")
  };

  innerleft.node.onmouseout = function () {
    console.log("MSP onmouseout left");
    outerleft.attr(({ display: "none" }));
  };

  innertop.node.onmouseover = function () {
    console.log("MSP onmouseover top");
    outertop.attr(({ display: "block" }));
    // innerleft.transform("t100,100r45t-100,0")
  };

  innertop.node.onmouseout = function () {
    console.log("MSP onmouseout top");
    outertop.attr(({ display: "none" }));
  };

  innerbottom.node.onmouseover = function () {
    console.log("MSP onmouseover bottom");
    outerbottom.attr(({ display: "block" }));
    // innerleft.transform("t100,100r45t-100,0")
  };

  innerbottom.node.onmouseout = function () {
    console.log("MSP onmouseout bottom");
    outerbottom.attr(({ display: "none" }));
  };

  // innerleft.animate({r: 150}, 1000);
  // innerleft.text(190, 80, "Top Left foo "+tr.node);
});
