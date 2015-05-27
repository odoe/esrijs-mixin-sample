var pathRX = new RegExp(/\/[^\/]+$/);
var locationPath = location.pathname.replace(pathRX, '');

require({
  isDebug: true,
  packages: [{
    name: 'widgets',
    location: locationPath + 'js/widgets'
  }]
});

require([
  'esri/config',
  'esri/map',
  'esri/layers/ArcGISDynamicMapServiceLayer',
  'widgets/basemapswitcher/Widget',
  'dojo/domReady!'
], function(
  esriConfig,
  Map, ArcGISDynamicMapServiceLayer,
  BasemapWidget
) {

  esriConfig.defaults.io.proxyUrl = '/proxy/proxy.php';

  var url = 'http://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer';

  var map = new Map('map', {
    center: [-118, 34.5],
    zoom: 8,
    basemap: 'topo'
  });

  var layer = new ArcGISDynamicMapServiceLayer(url, {
    id: 'census'
  });
  layer.title = 'Census';
  layer.setVisibleLayers([0,1,2,3]);

  var basemapParams = {
    "iconClass": "fa fa-sitemap",
    "showArcGISBasemaps": true,
    "map": map
  };

  map.on('layers-add-result', function() {
    var basemapWidget = new BasemapWidget(basemapParams, 'widget-basemap-node');
  });

  map.addLayers([layer]);
});
