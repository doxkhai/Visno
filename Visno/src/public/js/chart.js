
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawCharts);
function drawCharts() {
  
  // BEGIN BAR CHART
  /*
  // create zero data so the bars will 'grow'
  var barZeroData = google.visualization.arrayToDataTable([
    ['Day', 'Page Views', 'Unique Views'],
    ['Sun',  0,      0],
    ['Mon',  0,      0],
    ['Tue',  0,      0],
    ['Wed',  0,      0],
    ['Thu',  0,      0],
    ['Fri',  0,      0],
    ['Sat',  0,      0]
  ]);
	*/
  // actual bar chart data
  var barData = google.visualization.arrayToDataTable([
    ['Day', 'Tổng chi tiêu', 'Tổng nợ'],
    ['Tháng 1',  1050,      600],
    ['Tháng 2',  1370,      910],
    ['Tháng 3',  660,       400],
    ['Tháng 4',  1030,      540],
    ['Tháng 5',  1000,      480],
    ['Tháng 6',  1170,      960]
  ]);
  var barData1 = google.visualization.arrayToDataTable([
    ['Day', 'Tổng chi tiêu', 'Tổng nợ'],
    ['Tháng 7',  1000,      600],
    ['Tháng 8',  1370,      910],
    ['Tháng 9',  660,       400],
    ['Tháng 10',  1030,      540],
    ['Tháng 11',  1000,      480],
    ['Tháng 12',  1170,      960]
  ]);
  // set bar chart options
  var barOptions = {
    focusTarget: 'category',
    backgroundColor: 'transparent',
    colors: ['cornflowerblue', 'tomato'],
    fontName: 'Open Sans',
    chartArea: {
      left: 50,
      top: 10,
      width: '100%',
      height: '70%'
    },
    bar: {
      groupWidth: '80%'
    },
    hAxis: {
      textStyle: {
        fontSize: 11
      }
    },
    vAxis: {
      minValue: 0,
      maxValue: 1500,
      baselineColor: '#DDD',
      gridlines: {
        color: '#DDD',
        count: 4
      },
      textStyle: {
        fontSize: 11
      }
    },
    legend: {
      position: 'bottom',
      textStyle: {
        fontSize: 12
      }
    },
    animation: {
      duration: 1200,
      easing: 'out',
			startup: true
    }
  };
  // draw bar chart twice so it animates
  var barChart = new google.visualization.ColumnChart(document.getElementById('bar-chart'));
  //barChart.draw(barZeroData, barOptions);
  barChart.draw(barData, barOptions);

  var barChart1 = new google.visualization.ColumnChart(document.getElementById('bar-chart1'));
  //barChart.draw(barZeroData, barOptions);
  barChart1.draw(barData1, barOptions);
  
}