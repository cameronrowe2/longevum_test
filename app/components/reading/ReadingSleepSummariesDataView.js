import Marionette from "backbone.marionette";
import readingSleepSummariesDataTemplate from "../../templates/readingSleepSummariesDataTemplate.jst";

export default Marionette.View.extend({
  tagName: "tr",
  template: readingSleepSummariesDataTemplate
});
