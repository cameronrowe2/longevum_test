import Marionette from "backbone.marionette";
import dataTemplate from "../templates/dataItem.jst";

export default Marionette.View.extend({
  tagName: "tr",
  template: dataTemplate
});
