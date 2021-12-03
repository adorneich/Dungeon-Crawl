import { k } from "./../kaboom";
import { loader } from "./../spriteLoader";
import { createPlayer } from "./../player";
import { GameMap } from "./index";

export const legend = (gameMap) => {
    return {
        width: 16,
        height: 16,
        "─": (ctx) => [
            k.sprite("wall_horiz"),
            k.area({width: 44, height: 10, offset: k.vec2(-14, 0)}),
            k.solid(),
            k.z(1),
        ],
        "│": (ctx) => [
            k.sprite("wall_vert"),
            k.area({width: 12, height: 42, offset: k.vec2(2, -16)}),
            k.solid(),
            k.z(1),
        ],
        "┌": (ctx) => [
            k.sprite("wall_corner_topleft"),
            k.z(1),
        ],
        "┐": (ctx) => [
            k.sprite("wall_corner_topright"),
            k.z(1),
        ],
        "└": (ctx) => [
            k.sprite("wall_corner_botleft"),
            k.z(1),
        ],
        "┘": (ctx) => [
            k.sprite("wall_corner_botright"),
            k.z(1),
        ],
        "┤": (ctx) => [
            k.sprite("wall_junc_left"),
            k.z(1),
        ],
        "├": (ctx) => [
            k.sprite("wall_junc_right"),
            k.z(1),
        ],
        "*": (ctx) => [
            k.sprite("floor"),
            k.layer("floor"),
        ],
        "@": (ctx) => [
            k.sprite("floor"),
            k.layer("floor"),
        ],
    }
};
