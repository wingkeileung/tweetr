/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  function createTweetElement(tweet){

    const name = tweet.user.name;
    const avatars = tweet.user.avatars.small;
    const handle = tweet.user.handle;
    const $tweet =
  `<article class="tweet">
    <header>
      <section class="avatar"><img src="${ avatars }"/></section>
      <section class="tweetheader">${ name }</section>
      <section class="uname">${ handle }</section>
    </header>

    <section class="maintweet">${escape(tweet.content.text)}</section>

    <footer>
      <div class="stamp"> ${moment(tweet.created_at).fromNow()} </div>
      <section class="tools">
        <i class="fa fa-flag" aria-hidden="true"></i>
        <i class="fa fa-refresh" aria-hidden="true"></i>
        <i class="fa fa-heart" aria-hidden="true"></i>
      </section>
    </footer>
    </article>`;

    return $($tweet);
  }

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function loadTweets() {
    $.ajax({
      url: '/tweets',
      method: 'GET'
    })
      .then((tweets) => {
      //change according to what's passed/received in data
        $('#container-tweet').empty();
        //empty container so that db doesn't duplicate when form is submitted
        renderTweets(tweets);
      });
  }

  $('form').submit(function(events) {
    events.preventDefault();
    // This prevent leaving the page for submit
    var textChar = $(".tweetform").val().length;
    if (textChar === null || textChar === 0 || textChar > 140){
    // console.log(textChar);
      alert("Requirements not met!");
    } else {
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $(this).serialize()
      }).done(function (){
        $(".tweetform").val("");
        alert("Message Aceepted!");
        loadTweets();
      });
    }
  });

  function renderTweets(tweets){
    for (tweet in tweets){
      $('section.container-tweet').prepend(createTweetElement(tweets[tweet]));
    }
  }

  $(".compose").click(function(){
    $(".new-tweet").slideToggle();
  });

  var tweets = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "<script>alert('uh oh!');</script>"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];

  loadTweets();

});