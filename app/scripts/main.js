/* jshint devel:true */
/* global Snap */
/* global TimelineLite */
/* global clickSound */

(function () {
  'use strict';
  console.log('PPL starting..');

  var s = new Snap(1024,768);
  var tl = new TimelineLite();
  var json;

  function amendSVGWhilstLoading(f) {
    f.selectAll('#outerTop path').attr({visibility: 'hidden', opacity: 0});
    f.selectAll('#outerBottom path').attr({visibility: 'hidden', opacity: 0});
  }

  function attachSVGToDOM(f) {
    s.append(f);
  }

  function animatePie() {
    tl.staggerFrom($('#innerTop, #innerBottom, #innerLeft'), 0.8, { autoAlpha: 0 }, 0.2)
      .staggerFrom($('.inner'), 0.3, { autoAlpha: 0 }, 0.1)
      .staggerFrom($('#outerLeft path'), 0.3, { autoAlpha: 0 }, 0.1);
      // .from($('.inner'), 0.5, { autoAlpha: 0 });
    }

  function loadJsonMovies() {
    console.log('loadJsonMovies..');
    $.getJSON('/movies.json', function(data) {
      console.log('loaded JSON ->');
      console.log(data);
      json = data;

      $.each(['outerBottom'], function(index, value) {
        $('#'+value+' path').each(function(index) {
          $(this).attr('class', value+index);
          $(this).attr('ppl:movie', json[value+index]);
          console.log('segment: '+$(this).attr('class')+' movie: '+$(this).attr('ppl:movie'));
        });
      });
    });
  }

  function bindEventHandlers() {
    $('#outerLeft path, #outerTop path, #outerBottom path')
      .mouseenter(function(){
        $(this).css('opacity', 0.8);
    });

    $('#outerLeft path, #outerTop path, #outerBottom path')
      .mouseout(function(){
        $(this).css('opacity', 1);
    });

    $('#outerLeft path').click(function() {
      clickSound.playClip();
      tl.to($('#outerLeft path'), 0.2, { autoAlpha: 0 })
        .staggerTo($('#outerTop path'), 1, { autoAlpha: 1 }, 0.05)
        .to($('#innerLeft'), 0.2, { opacity: 0.8 });
    });

    $('#outerTop path').click(function() {
      clickSound.playClip();
      tl.to($('#outerTop path'), 0.2, { autoAlpha: 0 })
        .staggerTo($('#outerBottom path'), 1, { autoAlpha: 1 }, 0.05)
        .to($('#innerTop'), 0.2, { opacity: 0.8 });

    });

    $('#outerBottom path').click(function() {
      clickSound.playClip();
      goPlaylist($(this));
    });

    $('#home').click(function() {
      clickSound.playClip();
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
    if ($('svg').length > 1) {
      $('svg')[1].remove();
    }

    tl.to($('#playlist'), 0.5, { autoAlpha: 0, onComplete: pauseVideo })
      .to($('svg'), 0.5, { autoAlpha: 1, onComplete: main });
  }

  function playVideo(el) {
    $('#playlist video source').attr('src', el.attr('ppl:movie'));
    $('#playlist video')[0].load();
    $('#playlist video')[0].play();
  }

  function pauseVideo() {
    $('#playlist video')[0].pause();
  }

  function main() {
    tl.clear();
    Snap.load('/ppl-pie-menu.svg', function (f) {
      amendSVGWhilstLoading(f);
      attachSVGToDOM(f);
      loadJsonMovies();
      animatePie();
      bindEventHandlers();
    });
  }

  main();

}());

