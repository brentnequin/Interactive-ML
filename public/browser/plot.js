/*--- Exporting Functions ---*/
function getTraces() {
	let t = [];
	for (var i = 0; i < x.length; i++) t[i] = [x[i],y[i]];
	return t;
}

/*--- Tool Functions ---*/
function getPosition(element) {
	var rect = element.getBoundingClientRect();
	return { x: rect.left, y: rect.top };
}

function roundHalf(num) {
	return Math.round(num * 2) / 2;
}

/*--- Plot Update Functions ---*/
function attach() {
	var xaxis = gd._fullLayout.xaxis;
	var yaxis = gd._fullLayout.yaxis;
	var l = gd._fullLayout.margin.l;
	var t = gd._fullLayout.margin.t;

	gd.addEventListener("click", function (evt) {
		var xInDataCoord = roundHalf(xaxis.p2c(evt.x - l - pos.x + document.documentElement.scrollLeft));
		var yInDataCoord = roundHalf(yaxis.p2c(evt.y - t - pos.y + document.documentElement.scrollTop - 5));
		x.push(xInDataCoord);
		y.push(yInDataCoord);
		Plotly.extendTraces(gd, { x: [[xInDataCoord]], y: [[yInDataCoord]] }, [0]);
	});
}

function changeNamePlot(name) {
	alert(typeof name);
	Plotly.relayout(gd, {title: name});
}

function resetPlot() {
	for (var i = 0; i < numTraces; i++) {
		Plotly.deleteTraces(gd, 0);
	}
	numTraces = 1;
	Plotly.addTraces(gd, { x: x, y: y, mode: "markers", type: "scatter" });
}

function clearPlot() {
	x = []; y = [];
	for (var i = 0; i < numTraces; i++) {
		Plotly.deleteTraces(gd, 0);
	}
	numTraces = 1;
	Plotly.addTraces(gd, { x: x, y: y, mode: "markers", type: "scatter", });
}

function plotCenteroids(c, k) {
	// 2d array to 1d arrays
	let a; let b;
	for (var i = 0; i < k; i++) {
		a = c[i][0];
		b = c[i][1];
		Plotly.addTraces(gd,{ x: [a], y: [b], mode: "markers", type: "scatter", name:"Centeroid " + (i+1), marker:{color:'red', size:10}}, [i+1]);
		numTraces += 1;
	}
}

function plotDataToCenteroids(v, k) {
	// v: x[n][m], [m = 2] is the trace/centeroid that x belongs to
	Plotly.deleteTraces(gd, 0);
	numTraces -= 1;
	let x = [[],[]]; let y = [[],[]];
	for (var i = 0; i < v.length; i++) {
		x[v[i][2]].push(v[i][0]);
		y[v[i][2]].push(v[i][1]);
	}
	for (var i = 0; i < k; i++) {
		Plotly.addTraces(gd, { x: x[i], y: y[i], mode: "markers", type: "scatter", name:"Cluster " + (i+1)}, i+ +k);
		numTraces += 1;
	}
	Plotly.addTraces(gd, {x:[], y:[], mode: "markers", type: "scatter", 'marker.color':d3colors(0)}, [0]); // new data trace
	numTraces += 1;
}

/*--- Plot Setup ---*/
var d3 = Plotly.d3;
var d3colors = Plotly.d3.scale.category10();
var gd = document.getElementById("graph");
var pos = getPosition(gd);

var x = [1, 2, 2, 8, 8, 9];
var y = [2, 1, 2, 8, 9, 8];
var numTraces = 1;
var trace = { x: x, y: y, mode: "markers", type: "scatter" };
var data = [trace];
var layout = {
	title: "Select an Algorithm",
	hovermode: "closest",
	yaxis: {title: 'x', fixedrange: true, range: [0, 10], tickmode: "linear" },
	xaxis: {title: 'y', fixedrange: true, range: [0, 10], tickmode: "linear" },
	width: gd.offsetHeight,
	margin: {
		t:60,
		b:60,
		l:60,
		r:60
	},
	showlegend:false
};

/*--- Plot positioning ---*/
divEl = document.querySelector(".plotly");
elH = divEl.offsetHeight - 70;
elW = divEl.offsetWidth;
document.querySelector(".plotly").style.height = elH;

/*--- Plot plot ---*/
Plotly.newPlot(gd, data, layout).then(attach);