import { k } from "./kaboom";
import { MODS, addPlayerOpts } from "./player";

const WALK_SPEED = 5;

const playerAnims = {
    "down_idle": {
        "from": 0,
        "to": 0,
    },
    "down_walk": {
        "from": 0,
        "to": 3,
        "speed": WALK_SPEED,
        "loop": true,
    },
    "left_idle": {
        "from": 4,
        "to": 4,
    },
    "left_walk": {
        "from": 4,
        "to": 7,
        "speed": WALK_SPEED,
        "loop": true,
    },
    "right_idle": {
        "from": 8,
        "to": 8,
    },
    "right_walk": {
        "from": 8,
        "to": 11,
        "speed": WALK_SPEED,
        "loop": true,
    },
    "up_idle": {
        "from": 12,
        "to": 12,
    },
    "up_walk": {
        "from": 12,
        "to": 15,
        "speed": WALK_SPEED,
        "loop": true,
    },
};

const spriteFromAtlas = (x, y, xSlice, ySlice) => {
    return {
        "x": 16 * x,
        "y": 16 * y,
        "width": 16 * (xSlice ?? 1),
        "height": 16 * (ySlice ?? 1),
        "sliceX": (xSlice ?? 1),
        "sliceY": (ySlice ?? 1),
    };
};

const floorSprites = () => {
    return {
        "floor_topleft": spriteFromAtlas(0, 3),
        "floor_top": spriteFromAtlas(1, 3),
        "floor_topright": spriteFromAtlas(2, 3),
        "floor_toprightleft": spriteFromAtlas(3, 3),
        "floor_toprightbotleft": spriteFromAtlas(5, 3),
        "floor_left": spriteFromAtlas(0, 4),
        "floor": spriteFromAtlas(1, 4),
        "floor_right": spriteFromAtlas(2, 4),
        "floor_rightleft": spriteFromAtlas(3, 4),
        "floor_topbotleft": spriteFromAtlas(4, 4),
        "floor_topbot": spriteFromAtlas(5, 4),
        "floor_toprightbot": spriteFromAtlas(6, 4),
        "floor_botleft": spriteFromAtlas(0, 5),
        "floor_bot": spriteFromAtlas(1, 5),
        "floor_rightbot": spriteFromAtlas(2, 5),
        "floor_rightbotleft": spriteFromAtlas(3, 5),
    };
};

const uiSprites = () => {
    return {
        "heart": {
            "x": 32,
            "y": 0,
            "width": 144,
            "height": 64,
            "sliceX": 9,
            "sliceY": 4,
            "anims": {
                "normal4": { "from": 0, "to": 1, "loop": true },
                "normal3": { "from": 2, "to": 3, "loop": true },
                "normal2": { "from": 4, "to": 5, "loop": true },
                "normal1": { "from": 6, "to": 7, "loop": true },
                "normal0": 8,
                "poisoned4": { "from": 9, "to": 10, "loop": true },
                "poisoned3": { "from": 11, "to": 12, "loop": true },
                "poisoned2": { "from": 13, "to": 14, "loop": true },
                "poisoned1": { "from": 15, "to": 16, "loop": true },
                "poisoned0": 17,
                "frozen4": { "from": 18, "to": 19, "loop": true },
                "frozen3": { "from": 20, "to": 21, "loop": true },
                "frozen2": { "from": 22, "to": 23, "loop": true },
                "frozen1": { "from": 24, "to": 25, "loop": true },
                "frozen0": 26,
                "withered4": { "from": 27, "to": 28, "loop": true },
                "withered3": { "from": 29, "to": 30, "loop": true },
                "withered2": { "from": 31, "to": 32, "loop": true },
                "withered1": { "from": 33, "to": 34, "loop": true },
                "withered0": 35,
            },
        },
        "yellow_bar": {
            "x": 304,
            "y": 0,
            "width": 16,
            "height": 80,
            "sliceX": 1,
            "sliceY": 5,
        },
        "bar_frame": {
            "x": 176,
            "y": 0,
            "width": 32,
            "height": 64,
            "sliceX": 2,
            "sliceY": 4,
            "anims": {
                "left": { "from": 0, "to": 1, "loop": true },
                "mid": { "from": 2, "to": 3, "loop": true },
                "right": { "from": 4, "to": 5, "loop": true },
                "small": { "from": 6, "to": 7, "loop": true },
            },
        },
    };
};

const wallSprites = () => {
    return {
        "wall_corner_topleft": spriteFromAtlas(0, 3),
        "wall_horiz": spriteFromAtlas(1, 3),
        "wall_corner_topright": spriteFromAtlas(2, 3),
        "wall": spriteFromAtlas(3, 3),
        "wall_junc_down": spriteFromAtlas(0, 3),
        "wall_vert": spriteFromAtlas(0, 4),
        "wall_pillar": spriteFromAtlas(1, 4),
        "wall_junc_right": spriteFromAtlas(3, 4),
        "wall_junc": spriteFromAtlas(4, 4),
        "wall_junc_left": spriteFromAtlas(5, 4),
        "wall_corner_botleft": spriteFromAtlas(0, 5),
        "wall_corner_botright": spriteFromAtlas(2, 5),
        "wall_junc_up": spriteFromAtlas(4, 5),
    };
};

const playerOptions = {
    "sliceX": 4,
    "sliceY": 4,
    "anims": playerAnims,
};

export const loader = {
    "loadPlayer": (name) => {
        k.loadSprite(name, `/sprites/Players/${name}.png`, playerOptions);
    },
    "addPlayer": (pos) => {
        return k.add(addPlayerOpts(pos));
    },
    "loadArchit": () => {
        k.loadSpriteAtlas("/sprites/Structure/Floor.png", floorSprites());
        k.loadSpriteAtlas("/sprites/Structure/Wall.png", wallSprites());
    },

    "loadUI": () => {
        k.loadSpriteAtlas("/sprites/UI.png", uiSprites());
    },
};


