import { View } from "backbone.marionette";
import buttonTemplate from "../templates/buttonTemplate.jst";
import GlobalData from "./GlobalData";
import Backbone from "backbone";

import DataItemView from "./DataItemView";

import RootView from "./RootView";

export default View.extend({
  tagName: "div",
  template: buttonTemplate,

  events: {
    click: "showValues"
  },

  showValues(event) {
    GlobalData.getRootView().test(event.target.id);
  }
});
