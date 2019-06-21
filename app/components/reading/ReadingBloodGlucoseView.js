import Backbone from "backbone";
import ReadingBloodGlucoseDataView from "./ReadingBloodGlucoseDataView";

export default Backbone.Marionette.CollectionView.extend({
  tagName: "table",
  childView: ReadingBloodGlucoseDataView
});
