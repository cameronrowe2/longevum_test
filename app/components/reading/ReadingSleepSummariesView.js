import Backbone from "backbone";
import ReadingSleepSummariesDataView from "./ReadingSleepSummariesDataView";

export default Backbone.Marionette.CollectionView.extend({
  tagName: "table",
  childView: ReadingSleepSummariesDataView
});
