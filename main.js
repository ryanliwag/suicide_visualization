var data;

//var width = window.innerWidth;
//var height = window.innerHeight;

//
function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
};

function sort_data(data){
    var sorted = data.slice().sort(function(a,b)
        {
        return b.value.suicides- a.value.suicides;
        })
    return sorted
};



d3.csv("/data/suicide.csv").then(function(data) {

    var suicideByCountrynDate = d3.nest()
                                  .key(function(d){return d.year;})
                                  .key(function(d){return d.country;})
                                  .rollup(function(v) { return {
                                        count: v.length,
                                        suicides: d3.sum(v, function(d){ return d.suicides_no;}),
                                        suicidesper: d3.sum(v, function(d){return d["suicides/100k"]})
                                  };
                                })
                                .entries(data);

    suicideByCountrynDate = sortByKey(suicideByCountrynDate, 'key');                    

    //Ger bargraph Width and height
    var barchart = document.getElementById("barchart")
           
    //Select barchart ID, Set Margin parameters,
    var svg1 = d3.select("#bar-chart"),
    margin = {
        top: 20,
        right: 20,
        bottom: 50,
        left: 150
        },
    width_barchart = barchart.clientWidth - margin.left - margin.right,
    height_barchart = barchart.clientHeight - margin.top - margin.bottom,
    g = svg1.attr("width", barchart.clientWidth)
            .attr("height", barchart.clientHeight)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var y_bar = d3.scaleBand()
                  .range([height_barchart, 0])
                  .padding(0.5);
    
    var x_bar = d3.scaleLinear()
                  .range([0,width_barchart])


    var yAxis = d3.axisLeft(y_bar);
    var xAxis = d3.axisBottom(x_bar);
    
    g.append("g")
        .attr("class", "y axis")

    g.append("g")
        .attr("transform", "translate(0," + height_barchart + ")")
        .attr("class","x axis")

/*
    $('.play-btn').click(function() {
        return 
    });
*/

    var i = 0, dataset, mode;
    $("#year_id").html("<strong>" + suicideByCountrynDate[0].key + "</strong>");
    function update(){
        
        
        var selected = $('#data-dropdown option:selected');
        var json_length = Object.keys(suicideByCountrynDate).length - 1;

        if (selected.val() == "total"){
            dataset = suicideByCountrynDate[i].values.slice().sort(function(a,b){return b.value.suicides- a.value.suicides;}).slice(0,30).reverse()
            mode = "suicides"
        }
        else if (selected.val() == "perpop"){
            dataset = suicideByCountrynDate[i].values.slice().sort(function(a,b){return b.value.suicidesper - a.value.suicidesper;}).slice(0,30).reverse()
            
            mode = "suicidesper"
        }

        if (i == json_length-1){
            update_charts(dataset, 200, mode);
            i = 0;
        }else {
            update_charts(dataset, 1000, mode);
        }
        i += 1
        $("#year_id").html("<strong>" + suicideByCountrynDate[i].key + "</strong>");
    };

    // random number function
    function random(min, max){
      return Math.floor(Math.random() * (max - min + 1) + min);
    };

    d3.interval(update, 3000);

    function update_charts(data_, speed, mode){

        

        var color  = d3.scaleLinear().domain([1,d3.max(data_.map(function(d){return d.value[mode]}))])
                        .interpolate(d3.interpolateHcl)
                        .range([d3.rgb("#007AFF"), d3.rgb('#ff0505')]);


        x_bar.domain([0, d3.max(data_.map(function(d){return d.value[mode]}))]).nice()
        g.select(".x")
         .transition()
         .duration(speed)
         .call(xAxis);

        y_bar.domain(data_.map(function(d){return d.key}));

        g.select(".y")
         .transition()
         .duration(speed)
         .call(yAxis)
         .selectAll("text")	
         .style("text-anchor", "end")
         .attr("dx", "-.8em")
         .attr("dy", ".15em");

         var bar = g.selectAll(".bar")
                    .data(data_);

         bar.exit().remove()

         bar.enter().append("rect")
         .attr("class", "bar")
         .merge(bar)
         .attr("height", y_bar.bandwidth())
         .transition()
         .duration(speed)
         .delay(function(d, i) { return i * 50; })
         .attr("y",  d => { return y_bar(d.key); })
         .attr("width",  d => {return  x_bar(d.value[mode]); })
         .attr("fill",  d => {return color(d.value[mode])});

    }

});
