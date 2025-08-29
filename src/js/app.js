import $ from "jquery";
import { Sprite, SpriteView } from "./sprite"

$(function () {
  $("h1").html("Hello, bun!");
  $("h1").fadeToggle();
  const cat = new SpriteView({
    model: new Sprite({
      x: 0,
      y: 0,
      speed: 10,
      image: "./images/cat.png",
    })
  });
  $("body").append(cat.render().$el)
  $(document).on("keydown", cat.keyAction.bind(cat));
});
