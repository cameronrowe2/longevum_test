import Marionette from "backbone.marionette";
import readingActivitiesDataTemplate from "../../templates/readingActivitiesDataTemplate.jst";

export default Marionette.View.extend({
  tagName: "tr",
  template: readingActivitiesDataTemplate
});
