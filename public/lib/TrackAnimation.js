var BMapGLLib = window.BMapGLLib = BMapGLLib || {};
(function () {
  var g = 1;
  var f = 55;
  var e = 0;
  var a = 10000;
  var i = 0;
  var c = true;
  var d = 1;
  var j = 2;
  var k = 3;
  var b = 0;
  var h = BMapGLLib.TrackAnimation = function (n, l, m) {
    this._map = n;
    this._polyline = l;
    this._totalPath = l.getPath();
    this._overallView = n.getViewport(l.getPath());
    this._status = j;
    this._opts = {
      zoom: this._getZoom(),
      tilt: f,
      heading: e,
      duration: a,
      delay: i,
      overallView: c
    };
    this._initOpts(m);
    this._expandPath = this._addPath(l.getPath());
    this._pauseTime = 0;
    this._last2Points = []
  };
//   h.prototype._getZoom = function () {
//     return Math.min(this._overallView.zoom + g, this._map.getMaxZoom())
//   };
  h.prototype._updateAniParams = function () {
    this._updatePathAni();
    this._updateViewAni();
    this._polyline.setPath(this._expandPath.slice(0, 1))
  };
  h.prototype._updatePathAni = function () {
    this._expandPath = this._addPath(this._totalPath)
  };
  h.prototype._updateViewAni = function () {
    this._overallView = this._map.getViewport(this._totalPath);
    var q = this._totalPath.length;
    var p = [];
    var r = this._opts.overallView ? this._opts.duration + 2000 : this._opts.duration;
    for (var l = 0; l < q; l++) {
      var o = this._totalPath[l];
      var n = this._pathPercents[l] * (this._opts.duration / r);
      p.push({
        center: new BMapGL.Point(o.lng, o.lat),
        zoom: this._opts.zoom,
        tilt: l === 0 ? 0 : this._opts.tilt,
        heading: l === 0 ? 0 : this._opts.heading,
        percentage: n
      })
    }
    if (this._opts.overallView) {
      p.push({
        center: new BMapGL.Point(this._overallView.center.lng, this._overallView.center.lat),
        zoom: this._overallView.zoom - g,
        tilt: 0,
        heading: 0,
        percentage: 1
      })
    }
    var m = {
      duration: r,
      delay: 0,
      interation: 1
    };
    this._viewAni = new BMapGL.ViewAnimation(p, m)
  };
  h.prototype._addPath = function (u) {
    var o = this._opts.duration / 10;
    var m = u.length;
    var s = 0;
    var t = [];
    var p = [];
    for (var q = 1; q < m; q++) {
      var l = this._map.getDistance(u[q - 1], u[q]);
      t.push(l);
      s += l
    }
    var n = [0];
    for (var q = 1; q < m; q++) {
      var r = (t[q - 1] / s).toFixed(2);
      n[q] = n[q - 1] + parseFloat(r, 10);
      p = p.concat(this._getPath(u[q - 1], u[q], r * o))
    }
    this._pathPercents = n;
    return p
  };
  h.prototype._getPath = function (q, n, o) {
    var m = [];
    if (o === 0) {
      return m
    }
    for (var p = 0; p <= o; p++) {
      var l = new BMapGL.Point((n.lng - q.lng) / o * p + q.lng, (n.lat - q.lat) / o * p + q.lat);
      m.push(l)
    }
    return m
  };
  h.prototype._initOpts = function (l) {
    for (var m in l) {
      if (l.hasOwnProperty(m)) {
        this._opts[m] = l[m]
      }
    }
  };
  h.prototype.start = function () {
    var l = this;
    setTimeout(function () {
      l._updateAniParams();
      l._map.removeOverlay(l._polyline);
      l._map.addOverlay(l._polyline);
      l._status = d;
      l._step(performance.now());
      l._map.startViewAnimation(l._viewAni)
    }, this._opts.delay)
  };
  h.prototype.cancel = function () {
    this._clearRAF();
    this._status = j;
    b = 0;
    this._pauseTime = 0;
    this._map.cancelViewAnimation(this._viewAni);
    this._map.removeOverlay(this._polyline)
  };
  h.prototype.pause = function () {
    if (this._status === d) {
      this._clearRAF();
      this._map.pauseViewAnimation(this._viewAni);
      this._status = k;
      this._isPausing = performance.now()
    }
  };
  h.prototype.continue = function () {
    if (this._status === k) {
      this._pauseTime += performance.now() - this._isPausing;
      this._isPausing = undefined;
      this._status = d;
      this._step(performance.now());
      this._map.continueViewAnimation(this._viewAni)
    }
  };
  h.prototype._step = function (o) {
    if (this._status === j) {
      b = 0;
      return
    }
    if (!b) {
      b = o
    }
    o = o - this._pauseTime;
    var n = (o - b) / this._opts.duration;
    var l = Math.round(this._expandPath.length * n);
    var m = this._expandPath.slice(0, l);
    this._last2Points = m.slice(-4);
    this._polyline.setPath(m);
    if (o < b + this._opts.duration) {
      this._timer = window.requestAnimationFrame(this._step.bind(this))
    } else {
      b = 0;
      this._status = j;
      this._pauseTime = 0
    }
  };
  h.prototype._clearRAF = function () {
    if (this._timer) {
      window.cancelAnimationFrame(this._timer)
    }
  };
  h.prototype.setZoom = function (l) {
    this._opts.zoom = l
  };
  h.prototype.getZoom = function (l) {
    return this._opts.zoom
  };
  h.prototype.setTilt = function (l) {
    this._opts.tilt = l
  };
  h.prototype.getTilt = function (l) {
    return this._opts.tilt
  };
  h.prototype.setDelay = function (l) {
    this._opts.delay = l
  };
  h.prototype.getDelay = function (l) {
    return this._opts.delay
  };
  h.prototype.setDuration = function (l) {
    this._opts.duration = l
  };
  h.prototype.getDuration = function (l) {
    return this._opts.duration
  };
  h.prototype.enableOverallView = function () {
    this._opts.overallView = true
  };
  h.prototype.disableOverallView = function () {
    this._opts.overallView = false
  };
  h.prototype.setPolyline = function (l) {
    this._polyline = l;
    this._totalPath = l.getPath()
  };
  h.prototype.getPolyline = function () {
    return this._polyline
  };
  h.prototype.getLastPoint = function () {
    return [this._last2Points[0], this._last2Points[3]]
  }
})();
