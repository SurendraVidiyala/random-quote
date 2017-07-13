(function ($, jQuery, _) {
  'use strict';

  $(document).ready(function () {
    var quotes;
    // initialize
    tweetButtonInit();
    quotes = new Quotes(loadQuotes());
    displayRandomQuote(quotes);
    
    // new quote on click
    $('#new-quote').click(function () {
      displayRandomQuote(quotes);
    });

    // new quote on space
    $(window).keypress(function (e) {
      if (e.keyCode === 0 || e.keyCode === 32) {
        e.preventDefault(); // don't scroll down
        displayRandomQuote(quotes);
      }
    });
  });

  /**
   * Displays a random quote from a quotes object on the page
   * @param {Array} quotes - array of quote objects
   */
  function displayRandomQuote(quotes) {
    var quote = quotes.random();
    displayQuote(quote, quotes);
  }

  /**
   * Displays a given quote on the page
   * @param {Object} quote - a quote object
   */
  function displayQuote(quote) {
    var $quote  = $('#quote'),
        $author = $('#author');

    $quote.text(quote.quote);
    $author.text(quote.author);
    refreshTweetButton(quote);
  }
  
  /**
   * Resets the tweet button with new content by removing iframe 
   *   and reinitializing widget
   * @param {Object} quote - new quote to load into tweet body
   */
  function refreshTweetButton(quote) {
    var $tweetButton = $('.twitter-hashtag-button'),
        $tweetIframe = $('iframe.twitter-hashtag-button'),
        tweetAnchor  = '<a class="twitter-hashtag-button">Tweet this quote!</a>';
    
    if($tweetIframe.length) {
      // replace existing iframe with link
      $tweetIframe.replaceWith(tweetAnchor);
      $tweetButton = $('.twitter-hashtag-button');
      // load attributes and new text
      $tweetButton
        .addClass('pull-right')
        .attr('href', tweetUrl(stringifyQuote(quote)));
      // reload link into new iframe
      twttr.widgets.load();
    }
  }

  /**
   * Returns a twitter share url containing the specified tweet message
   * @param {String}  tweet - contents of tweet
   * @return {String} tweetUrl
   */
  function tweetUrl(tweet) {
    return "https://twitter.com/intent/tweet?text=" + encodeURIComponent(tweet);
  }

  /**
   * Returns stringified, formatted quote
   * @param  {Object} quote
   * @return {String} stringifiedQuote
   */
  function stringifyQuote(quote) {
    return '"' + quote.quote + '" –' + quote.author;
  }

  /** Tweet button initialization, courtesy of Twitter */
  function tweetButtonInit() {
    ! function (d, s, id) {
      var js, fjs = $(s)[0],
          p = /^http:/.test(d.location) ? 'http' : 'https';
      if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id;
        js.src = p + '://platform.twitter.com/widgets.js';
        fjs.parentNode.insertBefore(js, fjs);
      }
    }(document, 'script', 'twitter-wjs');
  }

  /**
   * Represents a collection of quotations
   * @return {Quotes} quotes - a quotes object
   */
  var Quotes = (function () {
    /** 
     * @constructor
     * @param  {Array}  quotesArr - array of quotes
     */
    function Quotes(quotesArr) {
      this.all = quotesArr;
      this.length = this.all.length;
    }

    /** Returns quote corresponding with inputted index */
    Quotes.prototype.find = function (n) {
      return this.all[n];
    };

    /** Returns a random quote from collection */
    Quotes.prototype.random = function () {
      return _.sample(this.all);
    };

    return Quotes;
  })();

  /**
   * Returns an array of quote objects.
   *   (Note: currently serves as a wrapper around hard-coded data)
   *   source: https://quotes.stormconsultancy.co.uk/quotes/
   */
  function loadQuotes() {
    return [{
        "id": 42,
        "quote": "In software, we rarely have meaningful requirements. Even if we do, the only measure of success that matters is whether our solution solves the customer’s shifting idea of what their problem is.",
        "author": "Jeff Atwood",
      }, {
        "id": 41,
        "quote": "If Java had true garbage collection, most programs would delete themselves upon execution.",
        "author": "Robert Sewell",
      },
     {
        "id": 40,
        "quote":"C++ : Where friends have access to your private members.",
        "author":"Gavin Russell Baker",
      },
      {
        "id": 39,
        "quote": "In C++ it’s harder to shoot yourself in the foot, but when you do, you blow off your whole leg.",
        "author": "Bjarne Stroustrup",
      },
     {
        "id": 38,
        "quote":"Most software today is very much like an Egyptian pyramid with millions of bricks piled on top of each other, with no structural integrity, but just done by brute force and thousands of slaves.",
        "author":"Alan Kay",
      },
      {
        "id": 37,
        "quote": "I’ve noticed lately that the paranoid fear of computers becoming intelligent and taking over the world has almost entirely disappeared from the common culture. Near as I can tell, this coincides with the release of MS-DOS.",
        "author": "Larry DeLuca",
      }, {
        "id": 36,
        "quote": "No matter how slick the demo is in rehearsal, when you do it in front of a live audience, the probability of a flawless presentation is inversely proportional to the number of people watching, raised to the power of the amount of money involved.",
        "author": "Mark Gibbs",
      }, {
        "id": 35,
        "quote": "The most amazing achievement of the computer software industry is its continuing cancellation of the steady and staggering gains made by the computer hardware industry.",
        "author": "Henry Petroski",
      }, {
        "id": 34,
        "quote": "There are two major products that come out of Berkeley: LSD and UNIX. We don’t believe this to be a coincidence.",
        "author": "Jeremy S. Anderson",
      }, {
        "id": 33,
        "quote": "Computers are like bikinis. They save people a lot of guesswork.",
        "author": "Sam Ewing",
      }, {
        "id": 32,
        "quote": "Linux is only free if your time has no value.",
        "author": "Jamie Zawinski",
      },
     {
        "id": 31,
        "quote":"Documentation is like sex; when it's good, it's very, very good, and when it's bad, it's better than nothing.",
        "author":"Dick Brandon",
      },
      {
        "id": 30,
        "quote": "The difference between theory and practice is that in theory, there is no difference between theory and practice.",
        "author": "Richard Moore",
      },
      /*{
        "id": 29,
        "quote":"Programming is like sex: one mistake and you’re providing support for a lifetime.",
        "author":"Michael Sinz",
      },*/
      {
        "id": 28,
        "quote": "There are only two kinds of programming languages: those people always bitch about and those nobody uses.",
        "author": "Bjarne Stroustrup",
      }, {
        "id": 27,
        "quote": "Beware of bugs in the above code; I have only proved it correct, not tried it.",
        "author": "Donald Knuth",
      },
     {
        "id": 26,
        "quote":"We know about as much about software quality problems as they knew about the Black Plague in the 1600s. We’ve seen the victims’ agonies and helped burn the corpses. We don’t know what causes it; we don’t really know if there is only one disease. We just suffer — and keep pouring our sewage into our water supply.",
        "author":"Tom Van Vleck",
      },
      {
        "id": 25,
        "quote": "Writing the first 90 percent of a computer program takes 90 percent of the time. The remaining ten percent also takes 90 percent of the time and the final touches also take 90 percent of the time.",
        "author": "N.J. Rubenking",
      }, {
        "id": 24,
        "quote": "There are two ways of constructing a software design; one way is to make it so simple that there are obviously no deficiencies, and the other way is to make it so complicated that there are no obvious deficiencies. The first method is far more difficult.",
        "author": "C. A. R. Hoare",
      }, {
        "id": 23,
        "quote": "You should name a variable using the same care with which you name a first-born child.",
        "author": "James O. Coplien",
      }, {
        "id": 22,
        "quote": "Einstein argued that there must be simplified explanations of nature, because God is not capricious or arbitrary. No such faith comforts the software engineer.",
        "author": "Fred Brooks",
      }, {
        "id": 21,
        "quote": "XML is like violence – if it doesn’t solve your problems, you are not using enough of it.",
        "author": "Unknown",
      },
    {
        "id": 20,
        "quote":"Saying that Java is good because it works on all platforms is like saying anal sex is good because it works on all genders.",
        "author":"Unknown",
      },
      {
        "id": 19,
        "quote": "I love deadlines. I like the whooshing sound they make as they fly by.",
        "author": "Douglas Adams",
      }, {
        "id": 18,
        "quote": "Perl – The only language that looks the same before and after RSA encryption.",
        "author": "Keith Bostic",
      }, {
        "id": 17,
        "quote": "Two things are infinite: the universe and human stupidity; and I’m not sure about the universe.",
        "author": "Albert Einstein",
      }, {
        "id": 16,
        "quote": "In theory, theory and practice are the same. In practice, they’re not.",
        "author": "Yogi Berra",
      },
      /*{
        "id": 15,
        "quote":"It is practically impossible to teach good programming style to students that have had prior exposure to BASIC. As potential programmers, they are mentally mutilated beyond hope of regeneration.",
        "author":"E. W. Dijkstra",
      },*/
      {
        "id": 14,
        "quote": "If debugging is the process of removing software bugs, then programming must be the process of putting them in.",
        "author": "E. W. Dijkstra",
      }, {
        "id": 13,
        "quote": "A computer lets you make more mistakes faster than any other invention in human history, with the possible exceptions of handguns and tequila.",
        "author": "Mitch Ratcliffe",
      }, {
        "id": 12,
        "quote": "I have always wished for my computer to be as easy to use as my telephone; my wish has come true because I can no longer figure out how to use my telephone.",
        "author": "Bjarne Stroustrup",
      }, {
        "id": 11,
        "quote": "I don’t care if it works on your machine! We are not shipping your machine!",
        "author": "Ovidiu Platon",
      }, {
        "id": 10,
        "quote": "Programming today is a race between software engineers striving to build bigger and better idiot-proof programs, and the Universe trying to produce bigger and better idiots. So far, the Universe is winning.",
        "author": "Rich Cook",
      }, {
        "id": 9,
        "quote": "Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.",
        "author": "Rick Osborne",
      }, {
        "id": 8,
        "quote": "On two occasions I have been asked, ‘Pray, Mr. Babbage, if you put into the machine wrong figures, will the right answers come out?’ I am not able rightly to apprehend the kind of confusion of ideas that could provoke such a question.",
        "author": "Charles Babbage",
      }, {
        "id": 7,
        "quote": "PHP is a minor evil perpetrated and created by incompetent amateurs, whereas Perl is a great and insidious evil, perpetrated by skilled but perverted professionals.",
        "author": "Jon Ribbens",
      }, {
        "id": 6,
        "quote": "Measuring programming progress by lines of code is like measuring aircraft building progress by weight.",
        "author": "Bill Gates",
      }, {
        "id": 5,
        "quote": "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
        "author": "Brian Kernighan",
      }, {
        "id": 4,
        "quote": "Some people, when confronted with a problem, think “I know, I’ll use regular expressions.” Now they have two problems.",
        "author": "Jamie Zawinski",
      }, {
        "id": 3,
        "quote": "It always takes longer than you expect, even when you take into account Hofstadter’s Law.",
        "author": "Hofstadter’s Law",
      }, {
        "id": 2,
        "quote": "Walking on water and developing software from a specification are easy if both are frozen.",
        "author": "Edward V Berard",
      }, {
        "id": 1,
        "quote": "We should forget about small efficiencies, say about 97% of the time: premature optimization is the root of all evil.",
        "author": "C. A. R. Hoare",
      },
    ];
  }
}($, jQuery, _));