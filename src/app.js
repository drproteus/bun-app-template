import _ from "lodash";
import $ from "jquery";
import Backbone from "backbone";

$(function() {
  const Model = Backbone.Model.extend({
    defaults: function() {
      return {
        "x": 1,
        "y": 0
      }
    },
    moveX: function(n) {
      this.set({x: this.get("x") + n});
    },
    moveY: function(n) {
      this.set({y: this.get("y") + n})
    },
    getInfo: function() {
      console.log(`I am at (${this.get("x")}, ${this.get("y")})`);
    }
  });

  $("h1").html("Hello, bun!");

  var m = new Model();
  m.getInfo();
  m.moveX(10);
  m.getInfo();
});
