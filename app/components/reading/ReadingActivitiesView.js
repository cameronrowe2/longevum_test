import Backbone from "backbone";
import ReadingActivitiesDataView from "./ReadingActivitiesDataView";

export default Backbone.Marionette.CollectionView.extend({
  tagName: "table",
  childView: ReadingActivitiesDataView
});
