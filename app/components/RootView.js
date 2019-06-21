import Marionette from "backbone.marionette";
import { View } from "backbone.marionette";
import HeaderView from "./HeaderView";
import NavView from "./NavView";
import BodyView from "./BodyView";

import Backbone from "backbone";
import Button from "./Button";
import GlobalData from "./GlobalData";

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
    var readingDataView = new BodyView({
      collection: readingData
    });

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
      headers: {
        Authorization:
          "Basic Y2FtZXJvbnJvd2VhdUBnbWFpbC5jb206U3JyZ0xhWUxxMnZrSDdlZw=="
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
