import Marionette from "backbone.marionette";
import readingBodyFatDataTemplate from "../../templates/readingBodyFatDataTemplate.jst";

export default Marionette.View.extend({
  tagName: "tr",
  template: readingBodyFatDataTemplate
});
