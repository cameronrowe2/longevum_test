import Marionette from "backbone.marionette";
import Backbone from "backbone";
import ItemView from "./ItemView";
import DataItemView from "./DataItemView";
import DataCollection from "./DataCollection";
import { View, CollectionView } from "backbone.marionette";
import axios from "axios";
import $ from "jquery";
import dataTemplate from "../templates/dataItem.jst";
import buttonTemplate from "../templates/buttonTemplate.jst";

export default Marionette.Application.extend({
  region: "#app",

  onStart() {
    this.showView(new ItemView());

    this.test();
  },

  test() {
    $.ajax({
      url: "https://test.gevityapp.com/feature/gevity/gevitydetailreading/api",
      dataType: "json",
      type: "get",
      contentType: "application/json",
      headers: {
        Authorization:
          "Basic Y2FtZXJvbnJvd2VhdUBnbWFpbC5jb206U3JyZ0xhWUxxMnZrSDdlZw=="
      },
      crossDomain: true,
      success: function(data, textStatus, jQxhr) {
        console.log(data);

        // Buttons
        var temp = {};
        data.forEach(d => {
          if (temp[d.reading_type] === undefined) {
            temp[d.reading_type] = { reading_type: d.reading_type };
          }
        });
        console.log(temp);
        console.log(Object.values(temp));

        // create view with buttons
        let buttonValues = Object.values(temp);

        for (var i = 0; i < buttonValues.length; i++) {
          buttonValues[i].reading_type = buttonValues[i].reading_type.substr(8);
          buttonValues[i].reading_type = buttonValues[i].reading_type.replace(
            "_",
            " "
          );
        }
        const button = View.extend({
          tagName: "div",
          template: buttonTemplate,

          events: {
            click: "showValues"
          },

          showValues(event) {
            console.log("execute");
          }
        });

        var ButtonModel = Backbone.Model.extend({});

        var ButtonCollection = Backbone.Collection.extend({
          model: ButtonModel
        });

        var ButtonCollectionView = Backbone.Marionette.CollectionView.extend({
          tagName: "table",
          childView: button
        });

        var buttonData = new ButtonCollection(buttonValues);

        var buttonView = new ButtonCollectionView({
          collection: buttonData
        });

        buttonView.render();
        $(document.body).append(buttonView.el);

        ///////////////////////////////////////
        // end
        ///////////////////////////////////////

        var DataCollectionView = Backbone.Marionette.CollectionView.extend({
          tagName: "table",
          childView: DataItemView
        });

        var myData = new DataCollection(data);

        // reading_activities
        var readingActivitiesData = myData.forCategory("reading_activities");
        var readingActivitiesDataView = new DataCollectionView({
          collection: readingActivitiesData
        });
        readingActivitiesDataView.render();
        $(document.body).append(readingActivitiesDataView.el);

        // reading_activities_summaries
        var readingActivitiesSummariesData = myData.forCategory(
          "reading_activities_summaries"
        );
        var readingActivitiesSummariesDataView = new DataCollectionView({
          collection: readingActivitiesSummariesData
        });
        readingActivitiesSummariesDataView.render();
        $(document.body).append(readingActivitiesSummariesDataView.el);

        // reading_blood_glucose
        var readingBloodGlucoseData = myData.forCategory(
          "reading_blood_glucose"
        );
        var readingBloodGlucoseDataView = new DataCollectionView({
          collection: readingBloodGlucoseData
        });
        readingBloodGlucoseDataView.render();
        $(document.body).append(readingBloodGlucoseDataView.el);

        // reading_blood_pressure
        var readingBloodPressureData = myData.forCategory(
          "reading_blood_pressure"
        );
        var readingBloodPressureDataView = new DataCollectionView({
          collection: readingBloodPressureData
        });
        readingBloodPressureDataView.render();
        $(document.body).append(readingBloodPressureDataView.el);

        // reading_bmi
        var readingBmiData = myData.forCategory("reading_bmi");
        var readingBmiDataView = new DataCollectionView({
          collection: readingBmiData
        });
        readingBmiDataView.render();
        $(document.body).append(readingBmiDataView.el);

        // reading_body_fat
        var readingBodyFatData = myData.forCategory("reading_body_fat");
        var readingBodyFatDataView = new DataCollectionView({
          collection: readingBodyFatData
        });
        readingBodyFatDataView.render();
        $(document.body).append(readingBodyFatDataView.el);

        // reading_meals
        var readingMealsData = myData.forCategory("reading_meals");
        var readingMealsDataView = new DataCollectionView({
          collection: readingMealsData
        });
        readingMealsDataView.render();
        $(document.body).append(readingMealsDataView.el);

        // reading_sleep_summaries
        var readingSleepSummariesData = myData.forCategory(
          "reading_sleep_summaries"
        );
        var readingSleepSummariesDataView = new DataCollectionView({
          collection: readingSleepSummariesData
        });
        readingSleepSummariesDataView.render();
        $(document.body).append(readingSleepSummariesDataView.el);

        // reading_waist
        var readingWaistData = myData.forCategory("reading_waist");
        var readingWaistDataView = new DataCollectionView({
          collection: readingWaistData
        });
        readingWaistDataView.render();
        $(document.body).append(readingWaistDataView.el);

        // reading_water
        var readingWaterData = myData.forCategory("reading_water");
        var readingWaterDataView = new DataCollectionView({
          collection: readingWaterData
        });
        readingWaterDataView.render();
        $(document.body).append(readingWaterDataView.el);

        // reading_weight
        var readingWeightData = myData.forCategory("reading_weight");
        var readingWeightDataView = new DataCollectionView({
          collection: readingWeightData
        });
        readingWeightDataView.render();
        $(document.body).append(readingWeightDataView.el);
      },
      error: function(jqXhr, textStatus, errorThrown) {
        console.log(errorThrown);
      }
    });
  }
});
