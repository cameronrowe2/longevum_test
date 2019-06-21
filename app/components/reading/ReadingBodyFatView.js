import Backbone from "backbone";
import ReadingBodyFatDataView from "./ReadingBodyFatDataView";

export default Backbone.Marionette.CollectionView.extend({
  tagName: "table",
  childView: ReadingBodyFatDataView
});
