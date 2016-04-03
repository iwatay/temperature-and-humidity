    var lineChartData = {
        labels : labels,
        datasets : [
            {
                label: "Temperature",
                fillColor : "rgba(92,220,92,0)",   // 線から下端までを塗りつぶす色
                strokeColor : "rgba(92,220,92,1)", // 折れ線の色
                pointColor : "rgba(92,220,92,1)",  // ドットの塗りつぶし色
                pointStrokeColor : "white",        // ドットの枠線色
                pointHighlightFill : "yellow",     // マウスが載った際のドットの塗りつぶし色
                pointHighlightStroke : "green",    // マウスが載った際のドットの枠線色
                data : temperatureData
            },
            {
                label: "Humidity",
                fillColor : "rgba(151,187,205,0)",
                strokeColor : "rgba(151,187,205,1)",
                pointColor : "rgba(151,187,205,1)",
                pointStrokeColor : "white",
                pointHighlightFill : "yellow",
                pointHighlightStroke : "blue",
                data : humidityData
            }
        ]

    }

    var option = {
        scaleOverride : true,
        scaleSteps : 16,
        scaleStepWidth : 5,
        scaleStartValue : 0,
        legendTemplate : "<% for (var i=0; i<datasets.length; i++){%><li><span style=\"color:<%=datasets[i].strokeColor%>\">■</span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%>"
    }

    window.onload = function(){
        var ctx = document.getElementById("graph_area").getContext("2d");
        var lineChart = new Chart(ctx).Line(lineChartData, option);
        document.getElementById("chart_legend").innerHTML = lineChart.generateLegend();
    }
