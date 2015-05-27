define([
  'dojo/_base/declare'
], function(declare) {

  return declare(null, {
    // this mixin works under the assumption
    // that you have a map assigned to your widget.
    // it also assumes the map was initialized with
    // a center and zoom
    recenter: function() {
      var map = this.get('map');
      var params = map._mapParams;
      if (params.center) {
        map.centerAt(params.center);
      }
    }
  });

});
