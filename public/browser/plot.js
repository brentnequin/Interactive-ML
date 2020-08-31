function getPosition(element) {
	var rect = element.getBoundingClientRect();
	return { x: rect.left, y: rect.top };
}

function roundHalf(num) {
	return Math.round(num * 2) / 2;
}

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

function resetPlot() {
	x = [];
	y = [];
	data = [trace];
	trace = { x: x, y: y, mode: "markers", type: "scatter" };
	var layout = {
		hovermode: "closest",
		yaxis: { fixedrange: true, range: [0, 10], tickmode: "linear" },
		xaxis: { fixedrange: true, range: [0, 10], tickmode: "linear" },
		width: gd.offsetHeight
	};
	Plotly.newPlot(gd, data, layout);
}

var d3 = Plotly.d3;
var gd = document.getElementById("graph");
var pos = getPosition(gd);

var x = [1, 2, 2, 8, 8, 9];
var y = [2, 1, 2, 8, 9, 8];
trace = { x: x, y: y, mode: "markers", type: "scatter" };
data = [trace];
var layout = {
	hovermode: "closest",
	yaxis: { fixedrange: true, range: [0, 10], tickmode: "linear" },
	xaxis: { fixedrange: true, range: [0, 10], tickmode: "linear" },
	width: gd.offsetHeight,
	margin: {
		t:50,
		b:50,
		l:50,
		r:50
	}
};

/*--- Plot positioning ---*/
divEl = document.querySelector(".plotly");
elH = divEl.offsetHeight - 70;
elW = divEl.offsetWidth;
document.querySelector(".plotly").style.height = elH;

/*--- Plot plott ---*/
Plotly.newPlot(gd, data, layout).then(attach);
