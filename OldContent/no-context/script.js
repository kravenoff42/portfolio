var pQuote;
var pAuth;
var currentQuote;

$(document).ready(function(){
  
  $("#button").click(function(){
  Tabletop.init( { key: 'https://docs.google.com/spreadsheets/d/1M-jY0VpUFAd7wHvhmSwAqWvgc9iWdtcHwqkg0awjsWg/pubhtml',
                   callback: function(data, tabletop) {
                     let quotes = data.quotes.elements;
                     let len = quotes.length-1;
                     let quoteIndex = Math.floor(Math.random()*len);
                     let quote = quotes[quoteIndex];
                     let text = quote.text;
                     let textArr = text.split(" ");
                     
                     let arrLen = textArr.length;
                     let startRange1 = arrLen*0.2;
                     let startRange2 = arrLen*0.4;
                     let endRange1 = arrLen*0.6;
                     let endRange2 = arrLen*0.8;
                     
                     let startIndex = Math.round(startRange1+Math.random()*startRange2);
                     let endIndex = Math.round(endRange1+Math.random()*endRange2);
                     
                     let snip = "..." + textArr.slice(startIndex,endIndex).join(" ") + "...";
                     let auth = "-"+quote.author+" (sort of)";
                    // console.log(snip);
                    // console.log(auth);
                    $("#pQuote").text(snip);
                    $("#pAuth").text(auth);
                    currentQuote = snip + " " + auth;
                    console.log(currentQuote);
                   },
                  }
                );
  });


  $("#link").click(function(){
    console.log(currentQuote);
      if (currentQuote){
        $(this).attr("href", "http://twitter.com/home?status="+ currentQuote);
      }else if (!currentQuote){
        $(this).attr("href", "http://twitter.com/home?status=Check out -No Context- a cool new quote generator!");
      }
      //$(this).click();
  });
});
