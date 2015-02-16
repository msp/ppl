/* jshint devel:true */
/*global Snap */
/*global TimelineLite */

(function () {
  'use strict';
  console.log('PPL starting..');

  var s = new Snap(2000,2000);
  var tl = new TimelineLite();

  function goPlaylist(el) {
    console.log('goPlayList -> ');
    console.log(el);

    tl.to($('svg'), 0.5, { autoAlpha: 0 })
      .to($('#playlist'), 0.5, { autoAlpha: 1, onComplete: playVideo});
  }

  function goHome() {
    console.log('goHome');
    tl.to($('#playlist'), 0.5, { autoAlpha: 0, onComplete: pauseVideo })
      .to($('svg'), 0.5, { autoAlpha: 1 });
  }

  function playVideo() {
    $('#playlist video')[0].play();
  }
  function pauseVideo() {
    $('#playlist video')[0].pause();
  }

  Snap.load('/ppl-pie-menu.svg', function (f) {
    // amend whilst loading..
    var innerLeft   = f.select('#innerLeft');
    var innerTop    = f.select('#innerTop');
    var innerBottom = f.select('#innerBottom');

    f.selectAll('#outerLeft path').attr({visibility: 'hidden', opacity: 0});
    f.selectAll('#outerTop path').attr({visibility: 'hidden', opacity: 0});
    f.selectAll('#outerBottom path').attr({visibility: 'hidden', opacity: 0});

    // attach to DOM
    s.append(f);

    // playtime
    tl.staggerFrom($('#innerTop, #innerBottom, #innerLeft'), 1, { autoAlpha: 0 }, 0.2);


    // events
    innerLeft.node.onclick = function () {
      console.log('left clicked');
      tl.to($('#outerTop path'), 0.2, { autoAlpha: 0 })
        .to($('#outerBottom path'), 0.2, { autoAlpha: 0 })
        .staggerTo($('#outerLeft path'), 1, { autoAlpha: 1 }, 0.05);
    };

    $('#outerLeft path').click(function() {
      goPlaylist($(this));
    });

    innerTop.node.onclick = function () {
      console.log('top clicked');
      tl.to($('#outerLeft path'), 0.2, { autoAlpha: 0 })
        .to($('#outerBottom path'), 0.2, { autoAlpha: 0 })
        .staggerTo($('#outerTop path'), 1, { autoAlpha: 1 }, 0.05);
    };

    $('#outerTop path').click(function() {
      goPlaylist($(this));
    });

    innerBottom.node.onclick = function () {
      console.log('bottom clicked');
      tl.to($('#outerTop path'), 0.2, { autoAlpha: 0 })
        .to($('#outerLeft path'), 0.2, { autoAlpha: 0 })
        .staggerTo($('#outerBottom path'), 1, { autoAlpha: 1 }, 0.05);
    };

    $('#outerBottom path').click(function() {
      goPlaylist($(this));
    });

    $('#home').click(function() {
      goHome();
    });
    // innerLeft.text(190, 80, 'Top Left foo '+tr.node);
  });

}());

