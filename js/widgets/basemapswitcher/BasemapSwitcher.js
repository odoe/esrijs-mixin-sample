define([
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/dom',
  'dojo/dom-construct',

  'esri/domUtils',
  'esri/dijit/BasemapGallery',

  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',

  './_RecenterMixin',

  'dojo/text!./templates/BasemapSwitcher.html'
], function(
  declare, lang, dom, domConstruct,
  esriDomUtils, BasemapGallery,
  _WidgetBase, _TemplatedMixin,
  _RecenterMixin,
  template
) {
  return declare([_WidgetBase, _TemplatedMixin, _RecenterMixin], {
    templateString: template,

    postCreate: function() {
      var node = dom.byId('map_root');
      esriDomUtils.hide(this.domNode);
      domConstruct.place(this.domNode, node);
      var map = this.get('map');
      this.gallery = new BasemapGallery({
        map: map,
        showArcGISBasemaps: true
      }, this.bmNode);
      this.gallery.startup();
      this.gallery.on('selection-change', lang.hitch(this, function() {
        this.recenter();
      }));
    },

    hide: function() {
      esriDomUtils.hide(this.domNode);
    },

    show: function() {
      esriDomUtils.show(this.domNode);
    }
  });
});
