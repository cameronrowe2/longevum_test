import Backbone from "backbone";
import DataItemView from "./DataItemView";

export default Backbone.Marionette.CollectionView.extend({
  tagName: "table",
  childView: DataItemView
});
