import Backbone from "backbone";
import ReadingBmiDataView from "./ReadingBmiDataView";

export default Backbone.Marionette.CollectionView.extend({
  tagName: "table",
  childView: ReadingBmiDataView
});
