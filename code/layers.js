import { k } from "./kaboom"

export const addLayers = () => {
  k.layers([
    "bg",
    "floor",
    "game",
    "fx",
    "ui",
    "fade",
  ], "game");
  k.fixed(["bg", "ui", "fade"]);
};