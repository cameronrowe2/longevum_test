import Marionette from "backbone.marionette";
import readingMealsDataTemplate from "../../templates/readingMealsDataTemplate.jst";

export default Marionette.View.extend({
  tagName: "tr",
  template: readingMealsDataTemplate
});
