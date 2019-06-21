import Marionette from "backbone.marionette";
import Backbone from "backbone.marionette";
import dataTemplate from "../templates/dataItem.jst";

var DataModel = Backbone.Model.extend({});

export default Backbone.Collection.extend({
  model: DataModel,
  forCategory: function(category) {
    if (!category) {
      return this;
    }

    var filteredReading = this.filter(function(reading) {
      var reading_type = reading.get("reading_type");
      var found = reading_type === category;
      return found;
    });

    var x = new this(filteredReading);
    return x;
  }
});
