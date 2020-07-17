google.charts.load('current', {'packages':['timeline']});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
  var dataRows = [];
  var colors = [];

  var globalEndDate = new Date(2023, 0, 1);
  for (var i = 0; i < consoles.length; i++) {
    var thisConsole = consoles[i];

    var endDate = globalEndDate;
    if (i < consoles.length - 1 &&
        thisConsole.manufacturer == consoles[i+1].manufacturer) {
      endDate = new Date(Date.parse(consoles[i+1].release_date));
    }

    var tooltip = "<b>CPU: " + thisConsole.cpu + "</b>" +
                  "<br><p>" + thisConsole.description + "</p>";

    dataRows.push([thisConsole.manufacturer, thisConsole.name, tooltip,
                   new Date(Date.parse(thisConsole.release_date)), endDate]);
    colors.push(arch_info[thisConsole.arch].color);
  }

  var container = document.getElementById('timeline');
  var chart = new google.visualization.Timeline(container);
  var dataTable = new google.visualization.DataTable();

  dataTable.addColumn({ type: 'string', id: 'Manufacturer' });
  dataTable.addColumn({ type: 'string', id: 'Console' });
  dataTable.addColumn({ type: 'string', role: 'tooltip' });
  dataTable.addColumn({ type: 'date', id: 'Start' });
  dataTable.addColumn({ type: 'date', id: 'End' });

  dataTable.addRows(dataRows);
  var options = {
    colors: colors,
    timeline: {
      rowLabelStyle: { fontSize: 16 },
      barLabelStyle: { fontSize: 16 }
    }
  };
  chart.draw(dataTable, options);
}
