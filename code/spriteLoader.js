import { k } from "./kaboom";

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

const spriteFromAtlas = (x, y) => {
    return {
        "x": 16 * x,
        "y": 16 * y,
        "width": 16,
        "height": 16,
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
    "addPlayer": (name, pos) => {
        return k.add([
            k.sprite(name),
            k.origin("center"),
            k.layer("game"),
            k.pos(pos),
            k.area(),
            k.solid(),
            k.z(2),
            "player",
            "killable",
        ]);
    },
    "loadArchit": () => {
        k.loadSpriteAtlas("/sprites/Objects/Floor.png", floorSprites());
        k.loadSpriteAtlas("/sprites/Objects/Wall.png", wallSprites());
    },

    "loadGUI": () => {
        //
    },
};


