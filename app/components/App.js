import Marionette from "backbone.marionette";
import { View } from "backbone.marionette";
import HeaderView from "./HeaderView";
import NavView from "./NavView";
import BodyView from "./BodyView";

import Backbone from "backbone";
import Button from "./Button";
import GlobalData from "./GlobalData";

import RootView from "./RootView";

export default Marionette.Application.extend({
  region: "#app",

  onStart() {
    let rootView = new RootView();
    GlobalData.setRootView(rootView);
    this.showView(rootView);
  }
});

/*
export default Marionette.Application.extend({
  region: "#app",

  thisObj: undefined,

  onStart() {
    this.test(this);

    this.showView(new ItemView());
  },

  test(thisObj) {
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

        //////////////////////////////////
        // Setup data
        //////////////////////////////////

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

        var myData = new DataCollection(data);

        //////////////////////////////////
        // end
        //////////////////////////////////

        // trigger event
        // new ItemView().triggerMethod("something:happened", "foo");

        // Buttons
        var temp = {};
        data.forEach(d => {
          if (temp[d.reading_type] === undefined) {
            temp[d.reading_type] = { reading_type: d.reading_type };
          }
        });

        // create view with buttons
        let buttonValues = Object.values(temp);

        for (var i = 0; i < buttonValues.length; i++) {
          buttonValues[i].readable_type = buttonValues[i].reading_type.substr(
            8
          );
          buttonValues[i].readable_type = buttonValues[i].readable_type.replace(
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
            // console.log("execute");
            console.log(event.target.id);
            var reading_type = event.target.id;

            var readingActivitiesData = myData.forCategory(reading_type);
            var readingActivitiesDataView = new DataCollectionView({
              collection: readingActivitiesData
            });
            readingActivitiesDataView.render();
            $("#app").append(readingActivitiesDataView.el);
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
      },
      error: function(jqXhr, textStatus, errorThrown) {
        console.log(errorThrown);
      }
    });
  }
});
*/
