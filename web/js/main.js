google.charts.load('current', {'packages':['timeline']});
google.charts.setOnLoadCallback(drawChart);

function generateTooltip(consoleInfo) {
  return "<div class=\"tooltip\">" +
          "<p>" +
            "<span class=\"cpu\">CPU: " + consoleInfo.cpu + "</span>" +
            "<br>Cores: " + consoleInfo.cores +
            "<br>Clock speed: " + consoleInfo.clock +
            (consoleInfo.coprocessors === null ?
                "" : "<br>Coprocessors: " + consoleInfo.coprocessors) +
          "</p>" +
          "<p>" + consoleInfo.description + "</p>" +
          "</div>";
}

function generateDataRows() {
  var dataRows = [];
  for (var i = 0; i < consoles.length; i++) {
    var thisConsole = consoles[i];

    var endDate = globalEndDate;
    if (i < consoles.length - 1 &&
        thisConsole.manufacturer == consoles[i+1].manufacturer) {
      endDate = new Date(Date.parse(consoles[i+1].release_date));
      endDate.setMonth(endDate.getMonth() - 2);
    }

    var style = "color: " + archInfo[thisConsole.arch].color + ";"

    dataRows.push([thisConsole.manufacturer, thisConsole.name,
                   generateTooltip(thisConsole), style,
                   new Date(Date.parse(thisConsole.release_date)), endDate]);
  }
  return dataRows;
}

function drawChart() {
  var container = document.getElementById('timeline');
  var chart = new google.visualization.Timeline(container);
  var dataTable = new google.visualization.DataTable();

  dataTable.addColumn({ type: 'string', id: 'Manufacturer' });
  dataTable.addColumn({ type: 'string', id: 'Console' });
  dataTable.addColumn({ type: 'string', role: 'tooltip', p: { html: true} });
  dataTable.addColumn({ type: 'string', role: 'style' });
  dataTable.addColumn({ type: 'date', id: 'Start' });
  dataTable.addColumn({ type: 'date', id: 'End' });

  dataTable.addRows(generateDataRows());
  var options = {
    timeline: {
      rowLabelStyle: { fontSize: 16 },
      barLabelStyle: { fontSize: 16 }
    },
    tooltip: { isHtml: true }
  };
  chart.draw(dataTable, options);

  fillArchTable();
}

function makeArchRow(archInfo) {
  var row = document.createElement("tr");

  var nameCell = document.createElement("td");
  nameCell.style.backgroundColor = archInfo.color;
  var nameText = document.createTextNode(archInfo.name);
  nameCell.appendChild(nameText);
  row.appendChild(nameCell);

  return row;
}

function fillArchTable() {
  var archTable = document.getElementById("legend_body");
  for (arch of archList) {
    archTable.appendChild(makeArchRow(archInfo[arch]));
  }
}
