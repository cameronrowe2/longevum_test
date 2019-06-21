import Marionette from "backbone.marionette";
import readingBmiDataTemplate from "../../templates/readingBmiDataTemplate.jst";

export default Marionette.View.extend({
  tagName: "tr",
  template: readingBmiDataTemplate
});
