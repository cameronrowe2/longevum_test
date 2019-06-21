import Marionette from "backbone.marionette";
import readingBloodGlucoseDataTemplate from "../../templates/readingBloodGlucoseDataTemplate.jst";

export default Marionette.View.extend({
  tagName: "tr",
  template: readingBloodGlucoseDataTemplate
});
