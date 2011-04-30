;(function(exports, Pusher, po, geoJson){
  var pusher = exports.pusher = new Pusher('7a4e019781c19190d92b'),
      geojson = exports.geojson = new geoJson(),
      map = exports.map = po.map(),
      channel = pusher.subscribe('map');
  map
    .container(document.body.appendChild(po.svg("svg")))
    .center({lon: -0.1275, lat: 51.507222})
    .zoom(12);
  
  map
    .add(
      po.image().url(
        po.url("http://{S}tile.cloudmade.com"
          // http://cloudmade.com/register
          + "/1a1b06b230af4efdbb989ea99e9841af"
          + "/998/256/{Z}/{X}/{Y}.png").hosts(["a.", "b.", "c.", ""])
      )
    );
    
  map
    .add(geojson.layer)
    .add(po.interact())
    .add(po.compass());
    
  //var el = map.container();
  //
  // el.addEventListener('click', function(e) {
  //   var coords = map.pointLocation(map.mouse(e));
  //   
  //   geojson.add({"geometry": {
  //     "coordinates": [coords.lon, coords.lat],
  //     "type": "Point"
  //   }});
  //   
  //   channel.trigger('add', coords);
  // });
  // 
  
  channel.bind('add-point', function(coords) {
    geojson.addPoint(geojson.coords(coords));
  });
  
  channel.bind('add-line', function(coords) {
    if (!coords.a || !coords.b) return;
    
    geojson.addLine(geojson.coords(coords.a), geojson.coords(coords.b));
  });
})(this, Pusher, org.polymaps, geoJson);