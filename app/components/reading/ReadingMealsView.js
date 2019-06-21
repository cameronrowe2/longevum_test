import Backbone from "backbone";
import ReadingMealsDataView from "./ReadingMealsDataView";

export default Backbone.Marionette.CollectionView.extend({
  tagName: "table",
  childView: ReadingMealsDataView
});
