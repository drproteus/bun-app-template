import $ from "jquery";
import { Sprite, SpriteView } from "./sprite"

$(() => {
  $("h1").html("Hello, bun!").fadeToggle();
  const cat = new SpriteView({
    model: new Sprite({
      image: "./images/cat.png",
    })
  });
  $("#main").append(cat.render().$el)
  $(document).on("keydown", cat.keyAction.bind(cat));
});
