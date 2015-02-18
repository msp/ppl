/* jshint devel:true */
/* global Snap */
/* global TimelineLite */

(function () {
  'use strict';
  console.log('PPL starting..');

  var s = new Snap(1920,1080);
  var tl = new TimelineLite();
  var json;

  function amendSVGWhilstLoading(f) {
    f.selectAll('#outerLeft path').attr({visibility: 'hidden', opacity: 0});
    f.selectAll('#outerTop path').attr({visibility: 'hidden', opacity: 0});
    f.selectAll('#outerBottom path').attr({visibility: 'hidden', opacity: 0});
  }

  function attachSVGToDOM(f) {
    s.append(f);
  }

  function animateInnerPie() {
    tl.staggerFrom($('#innerTop, #innerBottom, #innerLeft'), 0.8, { autoAlpha: 0 }, 0.2)
      .staggerFrom($('.inner'), 0.5, { autoAlpha: 0 }, 0.1);
      // .from($('.inner'), 0.5, { autoAlpha: 0 });
    }

  function loadJsonMovies() {
    if (!json) {
      $.getJSON('/movies.json', function(data) {
        console.log('loaded JSON ->');
        console.log(data);
        json = data;

        $.each(['outerTop', 'outerBottom', 'outerLeft'], function(index, value) {
          $('#'+value+' path').each(function(index) {
            $(this).attr('class', value+index);
            $(this).attr('ppl:movie', json[value+index]);
          });
        });
      });
    }
  }

  function bindEventHandlers() {
    $('#innerLeft').click(function () {
      console.log('left clicked');
      tl.to($('#outerTop path'), 0.2, { autoAlpha: 0 })
        .to($('#outerBottom path'), 0.2, { autoAlpha: 0 })
        .staggerTo($('#outerLeft path'), 1, { autoAlpha: 1 }, 0.05);
    });

    $('#outerLeft path').click(function() {
      goPlaylist($(this));
    });

    $('#innerTop').click(function () {
      console.log('top clicked');
      tl.to($('#outerLeft path'), 0.2, { autoAlpha: 0 })
        .to($('#outerBottom path'), 0.2, { autoAlpha: 0 })
        .staggerTo($('#outerTop path'), 1, { autoAlpha: 1 }, 0.05);
    });

    $('#outerTop path').click(function() {
      goPlaylist($(this));
    });

    $('#innerBottom').click(function () {
      console.log('bottom clicked');
      tl.to($('#outerTop path'), 0.2, { autoAlpha: 0 })
        .to($('#outerLeft path'), 0.2, { autoAlpha: 0 })
        .staggerTo($('#outerBottom path'), 1, { autoAlpha: 1 }, 0.05);
    });

    $('#outerBottom path').click(function() {
      goPlaylist($(this));
    });

    $('#home').click(function() {
      goHome();
    });
  }

  function goPlaylist(el) {
    console.log('goPlayList -> ');
    console.log('segment clicked: '+el.attr('class')+', triggering movie: '+el.attr('ppl:movie'));

    tl.to($('svg'), 0.5, { autoAlpha: 0 })
      .to($('#playlist'), 0.5, { autoAlpha: 1, onComplete: playVideo, onCompleteParams:[el]});
  }

  function goHome() {
    console.log('goHome');
    tl.to($('#playlist'), 0.5, { autoAlpha: 0, onComplete: pauseVideo })
      .to($('svg'), 0.5, { autoAlpha: 1 });
  }

  function playVideo(el) {
    $('#playlist video source').attr('src', el.attr('ppl:movie'));
    $('#playlist video')[0].load();
    $('#playlist video')[0].play();
  }

  function pauseVideo() {
    $('#playlist video')[0].pause();
  }

  Snap.load('/ppl-pie-menu.svg', function (f) {
    amendSVGWhilstLoading(f);
    attachSVGToDOM(f);
    loadJsonMovies();
    animateInnerPie();
    bindEventHandlers();
  });

}());

