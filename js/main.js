google.charts.load('current', {'packages':['timeline']});
google.charts.setOnLoadCallback(render);

function patchArchColors() {
  let colorIdx = 0;
  for (let archInfo of Object.values(arches)) {
    archInfo.color = colors[colorIdx++];
  }
}

function scaleTimeline() {
  let manufacturers = new Set();
  for (const thisConsole of consoles) {
    manufacturers.add(thisConsole.manufacturer);
  }

  let timeline = document.getElementById('timeline');
  timeline.style.height = (manufacturers.size * 54 + 58) + "px";
}

function generateTooltip(consoleInfo) {
  return "<div class=\"tooltip\">" +
          "<p>" +
            "<span class=\"cpu\">CPU: " + consoleInfo.cpu + "</span>" +
            "<br>Cores: " + consoleInfo.cores +
            "<br>Clock speed: " + consoleInfo.clock +
            ("coprocessors" in consoleInfo ?
                "<br>Coprocessors: " + consoleInfo.coprocessors : "") +
          "</p>" +
          "<p>" + consoleInfo.description + "</p>" +
          "</div>";
}

function generateDataRows() {
  let dataRows = [];
  for (let i = 0; i < consoles.length; i++) {
    let thisConsole = consoles[i];

    let endDate = globalEndDate;
    if ("eol" in thisConsole) {
      endDate = new Date(Date.parse(thisConsole.eol));
    } else if (i < consoles.length - 1 &&
               thisConsole.manufacturer == consoles[i+1].manufacturer) {
      endDate = new Date(Date.parse(consoles[i+1].release_date));
      endDate.setMonth(endDate.getMonth() - 2);
    }

    let style = "color: " + arches[thisConsole.arch].color + ";"

    dataRows.push([thisConsole.manufacturer, thisConsole.name,
                   generateTooltip(thisConsole), style,
                   new Date(Date.parse(thisConsole.release_date)), endDate]);
  }
  return dataRows;
}

// `chart` at global namespace because it is shared by selectBar and drawChart.
let chart;

function selectBar(evt) {
  const selection = chart.getSelection();
  for (const item of selection) {
    window.open(consoles[item.row].link);
  }
}

function drawChart() {
  let container = document.getElementById('timeline');
  chart = new google.visualization.Timeline(container);
  let dataTable = new google.visualization.DataTable();

  dataTable.addColumn({ type: 'string', id: 'Manufacturer' });
  dataTable.addColumn({ type: 'string', id: 'Console' });
  dataTable.addColumn({ type: 'string', role: 'tooltip', p: { html: true} });
  dataTable.addColumn({ type: 'string', role: 'style' });
  dataTable.addColumn({ type: 'date', id: 'Start' });
  dataTable.addColumn({ type: 'date', id: 'End' });

  dataTable.addRows(generateDataRows());
  let options = {
    timeline: {
      rowLabelStyle: { fontSize: 16 },
      barLabelStyle: { fontSize: 16 }
    },
    tooltip: { isHtml: true }
  };
  chart.draw(dataTable, options);

  google.visualization.events.addListener(chart, "select", selectBar);
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
  let row = document.createElement("tr");

  let nameCell = document.createElement("td");
  nameCell.style.backgroundColor = archInfo.color;

  let link = document.createElement("a");
  link.href = archInfo.link;
  link.target = "_blank";
  link.style.color = contrastTextColor(archInfo.color);

  let nameText = document.createTextNode(archInfo.name);

  link.appendChild(nameText);
  nameCell.appendChild(link);
  row.appendChild(nameCell);

  return row;
}

function fillArchTable() {
  let archTable = document.getElementById("legend_body");
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
