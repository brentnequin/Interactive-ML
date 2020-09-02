function shuffle(array) {
  let shuffled = [];
	let tmp = array.slice(0);
	while (tmp.length != 0) {
		var ind = Math.floor(Math.random() * tmp.length);
		shuffled.push(tmp[ind]);
		tmp.splice(ind, 1);
	}
	return shuffled; 
}

function toNearestThousandth(a) {
	return Math.round(a/1000)*1000;
}

function nearestCenteroid(x, c) {
	let a = [];
	for (var i = 0; i < c.length; i++) a[i] = Math.sqrt(Math.pow(x[0] - c[i][0], 2) + Math.pow(x[1] - c[i][1], 2));
	return a.indexOf(Math.min(...a));
}

function arrayAdd(a, b) {
	let sum = [];
	for (var i = 0; i < a.length; i++) sum[i] = a[i] + b[i];
	return sum;
}

function arrayDivide(a, div) {
	let q = [];
	for (var i = 0; i < a.length; i++) q[i] = a[i]/div;
	return q;
}

function arrayIsEqual(a, b) {
	let tol = 0.00001;
	if (a.length != b.length) return false;
	for (var i = 0; i < a.length; i++) {
		for (var j = 0; j < a[i].length; j++) {
			if (Math.abs(a[i][j] - b[i][j]) > tol) return false;
		}
  }
	return true;
}

function assignDataToCenteroids(x, c) {
	let v = x.slice(0);
	for (var i = 0; i < x.length; i++) {
		v[i][2] = nearestCenteroid(x[i], c);
	}
	return v;
}

function kmeans(array, k) {
	// input  => array: unsorted array of vertices, k: integer number of clusters
	// output => c: array of vertices of cluster centers, p: array of original vertices with cluster center appended
	var x = shuffle(array);
	var c = [];
	for (var i = 0; i < k; i++) c[i] = x[i];
	
	var sums = [];
	var c_new = [];
	var num = [];
	var step = 1;
	while (true) {
		for (var i = 0; i < k; i ++) {
			sums[i] = [0,0];
			c_new[i] = [0,0];
			num[i] = 0;
		}
		var ind;
		for (var i = 0; i < x.length; i++) {
			ind = nearestCenteroid(x[i], c);
			sums[ind] = arrayAdd(sums[ind], x[i]);
			num[ind] += 1;
		}
	  for (var i = 0; i < k; i++) c_new[i] = arrayDivide(sums[i], num[i]);
		if (arrayIsEqual(c_new, c)) break;
		c = c_new.splice(0);
		step += 1;
	}
	return c;
}

module.exports = kmeans;
