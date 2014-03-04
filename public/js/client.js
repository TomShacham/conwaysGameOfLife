(function() {

}());

$(document).ready(function(){

  var speed = 100;
  var plotLength = 20;

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
    return count;
  };

  var populateTimeSeries = function(timeSeries, value){
    if ( timeSeries.length >= plotLength ){
      timeSeries.shift();
      timeSeries.push(value);
    } else {
      timeSeries.push(value);
    }
  };

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
        populateTimeSeries(timeSeries, totalAlive());

        var chtXScale = d3.scale.ordinal()
                      .domain(d3.range(plotLength))
                      .rangeRoundBands([padding, w], 0.05);

        var chtYScale = d3.scale.linear()
                          .domain([0, d3.max(timeSeries)])
                          .range([0 , h - padding*2]);

        var chtColor = d3.scale.linear()
                                .domain([0, d3.max(timeSeries)])
                                .range([0, 255]);

        if ( timeSeries.length < plotLength ){
          graph.selectAll('rect')
              .data( timeSeries )
              .enter()
              .append('rect')
              .attr('x', function(d,i){
                      return chtXScale(i);
                    })
              .attr('width', chtXScale.rangeBand())
              .attr('y', function(d,i){
                return (h - chtYScale(d) - padding);
              })
              .attr('height', function(d,i){
                return chtYScale(d);
              })
              .attr("fill", function(d) {
                return d3.rgb(chtColor(d), 30, chtColor(d)/3);
              });

        xAxis.call(d3.svg.axis()
                      .orient('bottom')
                      .scale(chtXScale) );

        yAxis
        .attr('transform','rotate(' + (180) +  ',' + padding/2 + ',' + (padding*6) + ')')
        .call(d3.svg.axis()
                      .orient('left')
                      .scale(chtYScale) )
        .selectAll("text")
          .attr('transform', 'rotate(180)');



        } else {
          var chtXScale = d3.scale.ordinal()
                .domain(d3.range(plotLength))
                .rangeRoundBands([padding, w], 0.05);

          var chtYScale = d3.scale.linear()
                            .domain([0, d3.max(timeSeries)])
                            .range([0 , h - padding*2]);

          var chtColor = d3.scale.linear()
                                  .domain([0, d3.max(timeSeries)])
                                  .range([0, 255]);

          graph.selectAll('rect')
              .data( timeSeries )
              .attr('x', function(d,i){
                      return chtXScale(i);
                    })
              .attr('width', chtXScale.rangeBand())
              .attr('y', function(d,i){
                return (h - chtYScale(d) - padding);
              })
              .attr('height', function(d,i){
                return chtYScale(d);
              })
              .attr("fill", function(d) {
                return d3.rgb(chtColor(d), 30, chtColor(d)/3);
              });

          xAxis.attr('class','xAxis')
             .attr('transform','translate(0,' + (h - padding) + ')')
              .call(d3.svg.axis()
                  .orient('bottom')
                  .scale(chtXScale) );

          yAxis.attr('class','yAxis')
              .attr('transform','rotate(' + (180) +  ',' + padding/2 + ',' + (padding*6) + ')')
              .call(d3.svg.axis()
                  .orient('left')
                  .scale(chtYScale) )
              .selectAll("text")
                  .attr('transform', 'rotate(180)');


        }

      }, speed);
    };
    start();
  })

  //plot graph
  d3.select('body')
    .append('h3')
    .attr('class','title')
    .text('Evolution');


  var w = 530;
  var h = 530;
  padding = 40;

  var timeSeries = [];

  var graph = d3.select('body')
    .append('svg')
    .attr('width', w)
    .attr('height', h)
    .style('background-color', '#fee');

  var xAxis = graph.append('g')
     .attr('class','xAxis')
     .attr('transform','translate(0,' + (h - padding) + ')');

  var yAxis = graph.append('g')
      .attr('class','yAxis')
      .attr('transform','translate(' + (padding) + ',0)');

})




