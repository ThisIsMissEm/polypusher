;(function(exports, po, undefined) {
  
  function geoJson() {
    this.layer = po.geoJson();
    this.features = [];
  }
  
  geoJson.prototype.redraw = function() {
    this.layer.features(this.features);
  };
  
  geoJson.prototype.add = function(feature) {
    console.log(JSON.stringify(feature));
    var index = this.features.push(feature);
    this.redraw();
    
    return index;
  };
  
  geoJson.prototype.remove = function(index) {
    if (index >= this.features.length) index = this.features.length || 0;
    
    var rest = this.features.slice(index + 1);
    this.features.length = index;
    this.features.push.apply(this.features, rest);
    this.redraw();
  };
  
  geoJson.prototype.coords = function(lat, lon) {
    if (lat.toString() === '[object Object]') {
      return [lat.lon, lat.lat];
    } else {
      return [lon, lat];
    }
  }
  
  geoJson.prototype.addPoint = function(a) {
    return geojson.add({"geometry": {
      "coordinates": a,
      "type": "Point"
    }});
  };
  
  geoJson.prototype.addLine = function(a, b) {
    return geojson.add({"geometry": {
      "coordinates": [a, b],
      "type": "LineString"
    }});
  };
  
  exports.geoJson = geoJson;
})(this, org.polymaps);