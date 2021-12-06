import { k } from "./kaboom";
import { addLayers } from "./layers";
import { loader } from "./spriteLoader";
import { uiHandler } from "./ui";

export const PLAYER_SPEED = 60;
export const PLAYER_RUN_MULT = 1.5;
export const MODS = {
    NORMAL: 0,
    POISONED: 1,
    FROZEN: 2,
    WITHERED: 3,
    name: (mod) => {
        if (mod === MODS.NORMAL) {
            return "normal";
        } else if (mod === MODS.POISONED) {
            return "poisoned";
        } else if (mod === MODS.FROZEN) {
            return "frozen";
        } else if (mod === MODS.WITHERED) {
            return "withered";
        }
    },
};

export var player = null;

export const types = {
    "Engineer": {
        "name": "Engineer",
        "hp": 20,
        "speed": 80,
        "animSpeed": 80 / 60,
        "endurance": 12,
    },
    "Mage": {
        "name": "Mage",
        "hp": 16,
        "speed": 80,
        "animSpeed": 80 / 60,
        "endurance": 12,
    },
    "Paladin": {
        "name": "Paladin",
        "hp": 20,
        "speed": 60,
        "animSpeed": 60 / 60,
        "endurance": 12,
    },
    "Rogue": {
        "name": "Rogue",
        "hp": 12,
        "speed": 85,
        "animSpeed": 85 / 60,
        "endurance": 16,
    },
    "Warrior": {
        "name": "Warrior",
        "hp": 24,
        "speed": 55,
        "animSpeed": 55 / 60,
        "endurance": 8,
    },
};

export const playerHandler = {
    type: null,
    endUseEndurance: null,
    endRegenEndurance: null,

    anim: (key, walk) => {
        return key[0] + "_" + (walk ? "walk" : "idle");
    },

    setAnim: (anim) => {
        if (player.curAnim() !== anim) {
            player.play(anim);
        }
    },

    updateAnim: (last) => {
        if (keys.currentHoriz === null) {
            if (keys.currentVert === null) {
                playerHandler.setAnim(playerHandler.anim(last, false));
            } else {
                playerHandler.setAnim(playerHandler.anim(keys.currentVert, true));
            }
        } else {
            playerHandler.setAnim(playerHandler.anim(keys.currentHoriz, true));
        }
    },
};

export const createPlayer = (type, pos) => {
    playerHandler.type = type;
    loader.loadPlayer(type.name);
    if (player !== null) k.destroy(player);
    player = loader.addPlayer(pos);
};

const keys = {
    RIGHT: ["right", "d"],
    LEFT: ["left", "a"],
    UP: ["up", "w"],
    DOWN: ["down", "s"],
    currentHoriz: null,
    currentVert: null,
    speedMult: 1,

    isKeyDown: (key) => {
        return k.isKeyDown(key[0]) || k.isKeyDown(key[1]);
    },

    areBothDown: (key) => {
        return k.isKeyDown(key[0]) && k.isKeyDown(key[1]);
    },
};

export const addPlayerOpts = (pos) => [
    k.sprite(playerHandler.type.name, { animSpeed: playerHandler.type.animSpeed }),
    k.origin("center"),
    k.layer("game"),
    k.pos(pos),
    k.area(),
    k.solid(),
    k.z(2),
    k.health(playerHandler.type.hp),
    "player",
    "killable",
    {
        modifier: MODS.NORMAL,
        endurance: playerHandler.type.endurance,
    },
];

export const setListeners = (gameMap) => {
    player.onUpdate(() => {
        k.camPos(player.pos);
        if (playerHandler.endRegenEndurance !== null && player.endurance === playerHandler.type.endurance) {
            playerHandler.endRegenEndurance();
            playerHandler.endRegenEndurance = null;
        }
    });

    k.onKeyPress(keys.RIGHT, () => {
        keys.currentHoriz = keys.RIGHT;
        playerHandler.updateAnim(keys.RIGHT);
    });

    k.onKeyDown(keys.RIGHT, () => {
        if (keys.currentHoriz === keys.RIGHT) {
            if (keys.currentVert !== null) {
                player.move(playerHandler.type.speed * keys.speedMult / Math.sqrt(2) * (keys.areBothDown(keys.RIGHT) ? 0.5 : 1), 0);
            } else {
                player.move(playerHandler.type.speed * keys.speedMult * (keys.areBothDown(keys.RIGHT) ? 0.5 : 1), 0);
            }
        }
    });

    k.onKeyRelease(keys.RIGHT, () => {
        if (keys.isKeyDown(keys.LEFT)) {
            keys.currentHoriz = keys.LEFT;
        } else {
            keys.currentHoriz = null;
        }
        playerHandler.updateAnim(keys.RIGHT);
    });

    k.onKeyPress(keys.LEFT, () => {
        keys.currentHoriz = keys.LEFT;
        playerHandler.updateAnim(keys.LEFT);
    });

    k.onKeyDown(keys.LEFT, () => {
        if (keys.currentHoriz === keys.LEFT) {
            if (keys.currentVert !== null) {
                player.move(-playerHandler.type.speed * keys.speedMult / Math.sqrt(2) * (keys.areBothDown(keys.LEFT) ? 0.5 : 1), 0);
            } else {
                player.move(-playerHandler.type.speed * keys.speedMult * (keys.areBothDown(keys.LEFT) ? 0.5 : 1), 0);
            }
        }
    });

    k.onKeyRelease(keys.LEFT, () => {
        if (keys.isKeyDown(keys.RIGHT)) {
            keys.currentHoriz = keys.RIGHT;
        } else {
            keys.currentHoriz = null;
        }
        playerHandler.updateAnim(keys.LEFT);
    });

    k.onKeyPress(keys.UP, () => {
        keys.currentVert = keys.UP;
        playerHandler.updateAnim(keys.UP);
    });

    k.onKeyDown(keys.UP, () => {
        if (keys.currentVert === keys.UP) {
            if (keys.currentHoriz !== null) {
                player.move(0, -playerHandler.type.speed * keys.speedMult / Math.sqrt(2) * (keys.areBothDown(keys.UP) ? 0.5 : 1));
            } else {
                player.move(0, -playerHandler.type.speed * keys.speedMult * (keys.areBothDown(keys.UP) ? 0.5 : 1));
            }
        }
    });

    k.onKeyRelease(keys.UP, () => {
        if (keys.isKeyDown(keys.DOWN)) {
            keys.currentVert = keys.DOWN;
        } else {
            keys.currentVert = null;
        }
        playerHandler.updateAnim(keys.UP);
    });

    k.onKeyPress(keys.DOWN, () => {
        keys.currentVert = keys.DOWN;
        playerHandler.updateAnim(keys.DOWN);
    });

    k.onKeyDown(keys.DOWN, () => {
        if (keys.currentVert === keys.DOWN) {
            if (keys.currentHoriz !== null) {
                player.move(0, playerHandler.type.speed * keys.speedMult / Math.sqrt(2) * (keys.areBothDown(keys.DOWN) ? 0.5 : 1));
            } else {
                player.move(0, playerHandler.type.speed * keys.speedMult * (keys.areBothDown(keys.DOWN) ? 0.5 : 1));
            }
        }
    });

    k.onKeyRelease(keys.DOWN, () => {
        if (keys.isKeyDown(keys.UP)) {
            keys.currentVert = keys.UP;
        } else {
            keys.currentVert = null;
        }
        playerHandler.updateAnim(keys.DOWN);
    });

    k.onKeyPress("shift", () => {
        if (playerHandler.endRegenEndurance !== null) {
            playerHandler.endRegenEndurance();
            playerHandler.endRegenEndurance = null;
        }
        if (!(player.endurance === 0)) {
            playerHandler.endUseEndurance = k.loop(0.125, () => {
                if (keys.currentHoriz !== null || keys.currentVert !== null) {
                    player.endurance = Math.max(player.endurance - 1, 0);
                    uiHandler.updateEndurance();
                }
            });
            keys.speedMult = PLAYER_RUN_MULT;
            player.animSpeed = PLAYER_RUN_MULT * playerHandler.type.animSpeed;
        }
    });

    k.onKeyDown("shift", () => {
        if (player.endurance === 0 && playerHandler.endUseEndurance !== null) {
            playerHandler.endUseEndurance();
            playerHandler.endUseEndurance = null;
            keys.speedMult = 1;
            player.animSpeed = playerHandler.type.animSpeed;
        }
    });

    k.onKeyRelease("shift", () => {
        if (playerHandler.endUseEndurance !== null) {
            playerHandler.endUseEndurance();
            playerHandler.endUseEndurance = null;
        }
        playerHandler.endRegenEndurance = k.loop(0.5, () => {
            player.endurance = Math.min(player.endurance + 1, playerHandler.type.endurance);
            uiHandler.updateEndurance();
        })
        keys.speedMult = 1;
        player.animSpeed = playerHandler.type.animSpeed;
    });

    player.onHeal(() => {
        if (player.hp() > playerHandler.type.hp) {
            player.setHP(playerHandler.type.hp);
        }
        uiHandler.updateHearts();
    });

    player.onHurt(() => {
        uiHandler.updateHearts();
    });
}

export const initializePlayer = (type, gameMap) => {
    createPlayer(type, gameMap.spawnPosition);
    setListeners(gameMap);
}
