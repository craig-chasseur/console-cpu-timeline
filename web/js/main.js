google.charts.load('current', {'packages':['timeline']});
google.charts.setOnLoadCallback(render);

function patchArchColors() {
  var colorIdx = 0;
  for (var archInfo of Object.values(arches)) {
    archInfo.color = colors[colorIdx++];
  }
}

function scaleTimeline() {
  var manufacturers = new Set();
  for (const thisConsole of consoles) {
    manufacturers.add(thisConsole.manufacturer);
  }

  var timeline = document.getElementById('timeline');
  timeline.style.height = (manufacturers.size * 54 + 58) + "px";
}

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
    if ("eol" in thisConsole) {
      endDate = new Date(Date.parse(thisConsole.eol));
    } else if (i < consoles.length - 1 &&
               thisConsole.manufacturer == consoles[i+1].manufacturer) {
      endDate = new Date(Date.parse(consoles[i+1].release_date));
      endDate.setMonth(endDate.getMonth() - 2);
    }

    var style = "color: " + arches[thisConsole.arch].color + ";"

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
}

// This doesn't exactly match how google.charts automatically colors bar labels
// but it looks OK.
function contrastTextColor(backgroundColor) {
  const rgbStrs =
      /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(backgroundColor);
  const red = parseInt(rgbStrs[1], 16);
  const green = parseInt(rgbStrs[2], 16);
  const blue = parseInt(rgbStrs[3], 16);

  // Using W3C accessibility formula:
  // https://www.w3.org/WAI/ER/WD-AERT/#color-contrast
  const brightness = ((red * 299) + (green * 587) + (blue * 114)) / 1000;
  return brightness >= 128 ? "#000000" : "#ffffff";
}

function makeArchRow(archInfo) {
  var row = document.createElement("tr");

  var nameCell = document.createElement("td");
  nameCell.style.backgroundColor = archInfo.color;
  nameCell.style.color = contrastTextColor(archInfo.color);
  var nameText = document.createTextNode(archInfo.name);
  nameCell.appendChild(nameText);
  row.appendChild(nameCell);

  return row;
}

function fillArchTable() {
  var archTable = document.getElementById("legend_body");
  console.log(arches);
  for (const archInfo of Object.values(arches)) {
    archTable.appendChild(makeArchRow(archInfo));
  }
}

function render() {
  patchArchColors();
  scaleTimeline();
  drawChart();
  fillArchTable();
}
