$(document).ready(function() {

   var promoBtn = $('#promo-btn');
   var promoVid = $('.promo-video');
   var promoBtn = $('#promo-btn');
   var promoBtnChildren = promoBtn.children();
   var promoVidGet = promoVid.get(0);
   var iconPath = 'resources/icons/';
   var promoSection = $('#promo-section');
   var soundControls = $('.sound-controls');


   // pause/play background video function.
   function promoBtnChange() {
      if (promoVidGet.paused === true) {
         promoVidGet.play();
         promoBtnChildren[1].innerHTML = "PAUSE THE PROMO";
         promoBtnChildren[0].src = iconPath + 'pause-icon.svg';
         promoSection.addClass('afterOverlay');
         soundControls.css("opacity", "1");
      } else {
         promoVidGet.pause();
         promoBtnChildren[1].innerHTML = "PLAY THE PROMO";
         promoBtnChildren[0].src = iconPath + 'play-icon.svg';
         promoSection.removeClass('afterOverlay');
         soundControls.css("opacity", "0");
      };
   };

   // invoke 'promoBtnChange' on click.
   promoBtn.click(promoBtnChange);

   // replaces the poster image if video is over.
   promoVidGet.addEventListener('ended', function() {
      promoVidGet.load();
      promoBtnChildren[1].innerHTML = "REPLAY THE PROMO";
      promoBtnChildren[0].src = iconPath + 'replay-icon.svg';
      soundControls.css("opacity", "0");
   }, false);

   window.addEventListener('scroll', function() {
      var videoOffset = $('#promo-section').get(0).offsetTop;
      var videoOffsetPlus = videoOffset + (videoOffset / 4);
      var videoOffsetMinus = videoOffset - (videoOffset / 4);
      var windowY = window.pageYOffset;
      if (windowY >= videoOffsetPlus || windowY < videoOffsetMinus) {
         promoVidGet.pause();
         promoBtnChildren[1].innerHTML = "PLAY THE PROMO";
         promoBtnChildren[0].src = iconPath + 'play-icon.svg';
         promoSection.removeClass('afterOverlay');
         soundControls.css("opacity", "0");
      };
   });

   var videoVolRange = $('#videoVolRange');
   var progressSoundFill = $('#progress-sound-fill');
   promoVidGet.volume = videoVolRange.get(0).value;

   videoVolRange.on('input', function() {
      promoVidGet.volume = videoVolRange.get(0).value;
      progressSoundFill.css("width", promoVidGet.volume * 200 + 'px');
      progressSoundFill.css("margin-left", (progressSoundFill.width() / 2 - 60) + 'px');
   });

   // If offset is higher than xxx then stop video.
   // on play decreasse black overlay.
   // on play hide/translate titel to the left a little.
   // anime.js lib.

});
