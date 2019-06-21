import Backbone from "backbone";
import Button from "./Button";

export default Backbone.Marionette.CollectionView.extend({
  tagName: "table",
  childView: Button
});
