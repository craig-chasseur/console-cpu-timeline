google.charts.load('current', {'packages':['timeline']});
google.charts.setOnLoadCallback(drawChart);

function generateTooltip(consoleInfo) {
  return "<div class=\"tooltip\">" +
          "<p>" +
            "<span class=\"cpu\">CPU: " + consoleInfo.cpu +
                "</span>" +
            "<br>Cores: " + consoleInfo.cores +
            "<br>Clock speed: " + consoleInfo.clock +
            (consoleInfo.coprocessors === null ?
                "" : "<br>Coprocessors: " + consoleInfo.coprocessors) +
          "</p>" +
          "<p>" + consoleInfo.description + "</p>" +
          "</div>";
}

function drawChart() {
  var globalEndDate = new Date(2023, 0, 1);

  var dataRows = [];
  for (var i = 0; i < consoles.length; i++) {
    var thisConsole = consoles[i];

    var endDate = globalEndDate;
    if (i < consoles.length - 1 &&
        thisConsole.manufacturer == consoles[i+1].manufacturer) {
      endDate = new Date(Date.parse(consoles[i+1].release_date));
      endDate.setMonth(endDate.getMonth() - 2);
    }

    var style = "color: " + arch_info[thisConsole.arch].color + ";"

    dataRows.push([thisConsole.manufacturer, thisConsole.name,
                   generateTooltip(thisConsole), style,
                   new Date(Date.parse(thisConsole.release_date)), endDate]);
  }

  var container = document.getElementById('timeline');
  var chart = new google.visualization.Timeline(container);
  var dataTable = new google.visualization.DataTable();

  dataTable.addColumn({ type: 'string', id: 'Manufacturer' });
  dataTable.addColumn({ type: 'string', id: 'Console' });
  dataTable.addColumn({ type: 'string', role: 'tooltip', p: { html: true} });
  dataTable.addColumn({ type: 'string', role: 'style' });
  dataTable.addColumn({ type: 'date', id: 'Start' });
  dataTable.addColumn({ type: 'date', id: 'End' });

  dataTable.addRows(dataRows);
  var options = {
    timeline: {
      rowLabelStyle: { fontSize: 16 },
      barLabelStyle: { fontSize: 16 }
    },
    tooltip: { isHtml: true }
  };
  chart.draw(dataTable, options);
}
