$(document).ready(function() {

  $(function() {

    var maxLength = 140;

    var $counter = $('#counter');

    $('textarea').keyup(function() {

      var wordCount = maxLength - $(this).val().length;
      var color     = wordCount <= 0 ? 'red' : 'green';

      $counter.text(wordCount);

      if (wordCount <= 0) {
        $(this).closest('.new-tweet').addClass('error');
      } else {
        $(this).closest('.new-tweet').removeClass('error');
      }

    });

  });

// tweets.forEach(function (tweet) {
//       $('section.container-tweet').append(createTweetElement(tweet));

// });
});