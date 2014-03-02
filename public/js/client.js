(function() {

}());

$(document).ready(function(){

  var speed = 100;

  function Board(){
    this.width = 14;
    this.height = this.width;
    this.numberOfCells = this.width * this.height;
  }

  var board = new Board();

  var neighbours = function(el){
    pos = $(el).data('id');
    return [pos - 1,
        pos,
        pos + 1,
        pos + board.width - 1,
        pos + board.width,
        pos + board.width + 1,
        pos - board.width - 1,
        pos - board.width,
        pos - board.width + 1].map(function(x){
          return x > board.numberOfCells ? x - board.numberOfCells : x
        }).map(function(x){
          return x < 0 ? x + board.numberOfCells : x
        });
  }

  var nLiveNeighbours = function(el){
    var n = 0;
    $.each(neighbours(el), function(i, nei){
      if ($('.cell[data-id=' + nei + ']').attr('data-toggle') === 'true'){
        n += 1
      };
    });
    return n;
  }

  var toggleColor = function(el){
    if($(el).css('background-color') === "rgb(255, 0, 0)"){
      $(el).css('background-color', 'white');
    } else {
      $(el).css('background-color','red');
    };
  };

  var colorByDataToggle = function(el){
    if ( $(el).attr('data-toggle') === 'false' ) {
      $(el).css('background-color', 'white' );
    } else {
      $(el).css('background-color','red');
    };
  };

  var isAlive = function(el){
    return el.attr('data-toggle') === 'true';
  };

  var toggleLife = function(el){
    if ( $(el).attr('data-toggle') === 'false' ){
      $(el).attr('data-toggle', 'true');
    } else {
      $(el).attr('data-toggle', 'false');
    };
  };

  var totalAlive = function(){
    var count = 0;
    $('.cell').each(function(i,cell){
      if ( $(cell).attr('data-toggle') === 'true' ) {
        count += 1;
      }
    })
    $('#alive').text(count);
  }

  $('.cell').on("click", function(){
    toggleColor($(this));
    toggleLife($(this));
    totalAlive();
  });

  $('button#start').on("click", function(){
    var iter = 0;
    function start(){
      iter += 1;
      $('#iteration').text(iter);
      $('.cell').each(function(i, cell){
        if ( !(isAlive($(cell))) ) {
          if ( nLiveNeighbours($(cell)) === 3) {
            toggleLife($(cell));
          }
        } else {
          if ( nLiveNeighbours($(cell)) < 2 ) {
            toggleLife($(cell));
          } else if ( nLiveNeighbours($(cell)) > 3 ) {
            toggleLife($(cell));
          }
        }
      })
      $('.cell').each(function(i, cell){
        if ( isAlive($(cell)) ) {
          $(cell).css('background-color','red');
        } else {
          $(cell).css('background-color','white');
        }
      });
    setTimeout(function(){
        start();
        totalAlive();
      }, speed);
    };
    start();
  })
})
