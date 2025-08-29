import _ from "lodash";
import $ from "jquery";
import Backbone from "backbone";

export class Sprite extends Backbone.Model {
  defaults() {
    return {
      "x": 0,
      "y": 0,
      "speed": 10,
    }
  }

  moveX(n) {
    this.set("x", this.get("x") + (this.get("speed") * n));
  }

  moveY(n) {
    this.set("y", this.get("y") + (this.get("speed") * n));
  }
};

export class SpriteView extends Backbone.View {
  template() {
    return _.template($("#sprite-template").html());
  }

  initialize() {
    this.model.on("change:image change:x change:y", this.render.bind(this))
  }

  render() {
    let message = `I am at (${this.model.get("x")}, ${this.model.get("y")}).`;
    this.$el.html(this.template()({ image: this.model.get("image"), message: message }));
    this.$el.css({
      left: this.model.get("x"),
      top: this.model.get("y"),
      position: "relative"
    })
    return this;
  }

  keyAction(e) {
    const keyCode = e.which;
    if (keyCode == 38) {
      // move up
      this.model.moveY(-1);
    } else if (keyCode == 40) {
      // move down
      this.model.moveY(1)
    } else if (keyCode == 37) {
      // move left
      this.model.moveX(-1);
    } else if (keyCode == 39) {
      // move right
      this.model.moveX(1);
    } else if (keyCode == 32) {
      // reset position
      this.model.set({ x: 0, y: 0 });
    }
  }
}
