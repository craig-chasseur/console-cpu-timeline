google.charts.load('current', {'packages':['timeline']});
google.charts.setOnLoadCallback(render);

const chartOptions = {
  timeline: {
    rowLabelStyle: { fontSize: 16 },
    barLabelStyle: { fontSize: 16 }
  },
  tooltip: { isHtml: true }
};

function nonRareConsoles(consoles) {
  let nonRare = [];
  for (const consoleInfo of consoles) {
    if ("rare" in consoleInfo && consoleInfo["rare"]) continue;
    nonRare.push(consoleInfo);
  }
  return nonRare;
}

class TimelineData {
  constructor(consoles, arches) {
    this.consoles = consoles;

    this.containerHeight = TimelineData.calculateHeight(consoles);

    this.dataTable = new google.visualization.DataTable();
    this.dataTable.addColumn({ type: 'string', id: 'Manufacturer' });
    this.dataTable.addColumn({ type: 'string', id: 'Console' });
    this.dataTable.addColumn(
        { type: 'string', role: 'tooltip', p: { html: true} });
    this.dataTable.addColumn({ type: 'string', role: 'style' });
    this.dataTable.addColumn({ type: 'date', id: 'Start' });
    this.dataTable.addColumn({ type: 'date', id: 'End' });
  
    this.dataTable.addRows(
        TimelineData.generateDataRows(consoles, arches, globalEndDate));
  }

  static calculateHeight(consoles) {
    let manufacturers = new Set();
    for (const thisConsole of consoles) {
      manufacturers.add(thisConsole.manufacturer);
    }

    return (manufacturers.size * 54 + 58) + "px";
  }

  static generateTooltip(consoleInfo) {
    return "<div class=\"tooltip\">" +
           "<p>" +
             "<div class=\"consolename\">" + consoleInfo.name + "</div>" +
             "<span class=\"cpu\">CPU: " + consoleInfo.cpu + "</span>" +
             "<br>Cores: " + consoleInfo.cores +
             "<br>Clock speed: " + consoleInfo.clock +
             ("coprocessors" in consoleInfo ?
                 "<br>Coprocessors: " + consoleInfo.coprocessors : "") +
           "</p>" +
           "<p>" + consoleInfo.description + "</p>" +
           "</div>";
  }

  static generateDataRows(consoles, arches, globalEndDate) {
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
                     TimelineData.generateTooltip(thisConsole), style,
                     new Date(Date.parse(thisConsole.release_date)), endDate]);
    }
    return dataRows;
  }
}

class Timeline {
  constructor(consoles, arches, domContainer) {
    this.data = new TimelineData(nonRareConsoles(consoles), arches);
    this.dataWithRare = new TimelineData(consoles, arches);
    this.domContainer = domContainer;
    this.visible = false;
    this.showRare = false;
    this.hoverIdx = null;
  }

  getData() {
    return this.showRare ? this.dataWithRare : this.data;
  }

  draw() {
    this.domContainer.style.height = this.getData().containerHeight;
    this.chart = new google.visualization.Timeline(this.domContainer);
    this.chart.draw(this.getData().dataTable, chartOptions);
    this.visible = true;

    let self = this;
    google.visualization.events.addListener(
        this.chart, "select", function() { self.selectBar(); });
    google.visualization.events.addListener(
        this.chart, "onmouseover", function(evt) { self.hover(evt); });
    google.visualization.events.addListener(
        this.chart, "onmouseout", function(evt) { self.unHover(evt); });
  }

  redraw() {
    if (!this.visible) return;
    this.chart.clearChart();
    this.chart.draw(this.getData().dataTable, chartOptions);
  }

  selectBar() {
    const selection = this.chart.getSelection();
    for (const item of selection) {
      if (this.hoverIdx == item.row) {
        window.open(this.getData().consoles[item.row].link);
      }
    }
  }

  hover(evt) {
    this.hoverIdx = evt.row;
  }

  unHover(evt) {
    this.hoverIdx = null;
  }

  hide() {
    this.domContainer.style.display = "none";
    this.visible = false;
  }

  show() {
    this.domContainer.style.display = "block";
    this.visible = true;
    this.redraw();
  }

  toggleRare(evt) {
    this.showRare = evt.target.checked;
    this.domContainer.style.height = this.getData().containerHeight;
    this.redraw();
  }
}

class TimelineSelector {
  constructor(timelineMap, tableHeaderRow) {
    this.timelineMap = timelineMap;
    this.selectorMap = this.buildSelectorMap(tableHeaderRow);
    this.select(Object.keys(timelineMap)[0]);
  }

  select(selectedName) {
    let selectedTimeline = null;
    for (const name in this.timelineMap) {
      if (selectedName == name) {
        this.selectorMap[name].classList.add("selected");
        selectedTimeline = this.timelineMap[name];
      } else {
        this.selectorMap[name].classList.remove("selected");
        this.timelineMap[name].hide();
      }
    }
    selectedTimeline.show();
  }

  buildSelectorMap(tableHeaderRow) {
    let selectorMap = {}
    for (const name of Object.keys(this.timelineMap)) {
      const text = document.createTextNode(name);

      let link = document.createElement("a");
      link.href = "javascript:void(0)";
      link.appendChild(text);

      let cell = document.createElement("th");
      cell.appendChild(link);
      let self = this;
      cell.addEventListener("click", function() {self.select(name); });

      tableHeaderRow.appendChild(cell);
      selectorMap[name] = cell;
    }
    return selectorMap;
  }
}

class ArchTable {
  static fill(arches, tableBody) {
    for (const archInfo of Object.values(arches)) {
      tableBody.appendChild(ArchTable.makeArchRow(archInfo));
    }
  }

  static makeArchRow(archInfo) {
    const nameText = document.createTextNode(archInfo.name);

    let nameElement = null;
    if ("link" in archInfo) {
      nameElement = document.createElement("a");
      nameElement.href = archInfo.link;
      nameElement.target = "_blank";
    } else {
      nameElement = document.createElement("span");
    }
    nameElement.style.color = ArchTable.contrastTextColor(archInfo.color);
    nameElement.appendChild(nameText);

    let nameCell = document.createElement("td");
    nameCell.style.backgroundColor = archInfo.color;
    nameCell.appendChild(nameElement);

    let row = document.createElement("tr");
    row.appendChild(nameCell);

    return row;
  }

  // This doesn't exactly match how google.charts automatically colors bar
  // labels but it looks OK.
  static contrastTextColor(backgroundColor) {
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
}

function patchArchColors(arches) {
  let colorIdx = 0;
  for (let archInfo of Object.values(arches)) {
    if ("color" in archInfo) continue;
    archInfo.color = colors[colorIdx++];
  }
  return arches;
}

function render() {
  const patchedArches = patchArchColors(arches);

  let rareToggler = document.getElementById("toggle_rare");

  let consoleTimeline = new Timeline(
      consoles, patchedArches, document.getElementById("console_timeline"));
  consoleTimeline.draw();
  window.addEventListener("resize", function() { consoleTimeline.redraw(); });
  rareToggler.addEventListener(
      "click", function(evt) { consoleTimeline.toggleRare(evt); });

  let handheldTimeline = new Timeline(
      handhelds, patchedArches, document.getElementById("handheld_timeline"));
  handheldTimeline.draw();
  window.addEventListener("resize", function() { handheldTimeline.redraw(); });
  rareToggler.addEventListener(
      "click", function(evt) { handheldTimeline.toggleRare(evt); });

  ArchTable.fill(patchedArches, document.getElementById("legend_body"));

  // Build this last so that when timelines are redrawn they have the right
  // widths accounting for a scrollbar.
  let selector = new TimelineSelector(
      {"Home Consoles": consoleTimeline, "Handhelds": handheldTimeline},
      document.getElementById("selector"));
  document.getElementById("toggle_rare_cell").setAttribute("colspan", "2");
}
