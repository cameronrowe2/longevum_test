import Marionette from "backbone.marionette";
import { View } from "backbone.marionette";
import HeaderView from "./HeaderView";
import NavView from "./NavView";
import BodyView from "./BodyView";

import Backbone from "backbone";
import Button from "./Button";
import GlobalData from "./GlobalData";
import ReadingBloodGlucoseView from "./reading/ReadingBloodGlucoseView";
import ReadingBmiView from "./reading/ReadingBmiView";
import ReadingBodyFatView from "./reading/ReadingBodyFatView";
import ReadingSleepSummariesView from "./reading/ReadingSleepSummariesView";
import ReadingMealsView from "./reading/ReadingMealsView";
import ReadingActivitiesView from "./reading/ReadingActivitiesView";

export default View.extend({
  template: _.template(
    "<div id='header'></div><nav id='nav'></nav><div id='body'></div>"
  ),

  regions: {
    header: "#header",
    nav: "#nav",
    body: "#body"
  },

  test(reading_type) {
    console.log("test");

    var DataModel = Backbone.Model.extend({});

    var DataCollection = Backbone.Collection.extend({
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

        var x = new DataCollection(filteredReading);
        return x;
      }
    });

    var myData = new DataCollection(GlobalData.get());

    var readingData = myData.forCategory(reading_type);
    var readingDataView;

    if (reading_type === "reading_blood_glucose") {
      readingDataView = new ReadingBloodGlucoseView({
        collection: readingData
      });
    } else if (reading_type === "reading_bmi") {
      readingDataView = new ReadingBmiView({
        collection: readingData
      });
    } else if (reading_type === "reading_body_fat") {
      readingDataView = new ReadingBodyFatView({
        collection: readingData
      });
    } else if (reading_type === "reading_sleep_summaries") {
      readingDataView = new ReadingSleepSummariesView({
        collection: readingData
      });
    } else if (reading_type === "reading_meals") {
      readingDataView = new ReadingMealsView({
        collection: readingData
      });
    } else if (reading_type === "reading_activities") {
      readingDataView = new ReadingActivitiesView({
        collection: readingData
      });
    } else {
      readingDataView = new BodyView({
        collection: readingData
      });
    }

    console.log(readingData);

    this.showChildView("body", readingDataView);
  },

  setupButtonData(data) {
    var temp = {};
    data.forEach(d => {
      if (temp[d.reading_type] === undefined) {
        temp[d.reading_type] = { reading_type: d.reading_type };
      }
    });

    // create view with buttons
    let buttonValues = Object.values(temp);

    for (var i = 0; i < buttonValues.length; i++) {
      buttonValues[i].readable_type = buttonValues[i].reading_type.substr(8);
      buttonValues[i].readable_type = buttonValues[i].readable_type.replace(
        "_",
        " "
      );
    }

    return buttonValues;
  },

  onRender() {
    this.showChildView("header", new HeaderView());

    var thisObj = this;

    $.ajax({
      url: "https://test.gevityapp.com/feature/gevity/gevitydetailreading/api",
      dataType: "json",
      type: "get",
      contentType: "application/json",
      // headers: {
      //   Authorization:
      //     "Basic Y2FtZXJvbnJvd2VhdUBnbWFpbC5jb206U3JyZ0xhWUxxMnZrSDdlZw=="
      // },
      beforeSend: function(xhr) {
        xhr.setRequestHeader(
          "Authorization",
          "Basic " + btoa("cameronroweau@gmail.com" + ":" + "SrrgLaYLq2vkH7eg")
        );
      },
      crossDomain: true,
      success: function(data, textStatus, jQxhr) {
        console.log(data);

        GlobalData.set(data);

        var buttonData = thisObj.setupButtonData(data);

        var ButtonModel = Backbone.Model.extend({});

        var ButtonCollection = Backbone.Collection.extend({
          model: ButtonModel
        });

        var buttonData = new ButtonCollection(buttonData);

        var buttonView = new NavView({
          collection: buttonData
        });

        thisObj.showChildView("nav", buttonView);
      },
      error: function(jqXhr, textStatus, errorThrown) {
        console.log(errorThrown);
      }
    });
  }
});
