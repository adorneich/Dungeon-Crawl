import { k } from "./kaboom";
import { addLayers } from "./layers";
import { loader } from "./spriteLoader";

export const PLAYER_SPEED = 60;

export default player = null;

export const createPlayer = (name, pos) => {
    loader.loadPlayer(name);
    if (player !== null) k.destroy(player);
    player = loader.addPlayer(name, pos);
};

const keys = {
    RIGHT: ["right", "d"],
    LEFT: ["left", "a"],
    UP: ["up", "w"],
    DOWN: ["down", "s"],
    currentHoriz: null,
    currentVert: null,

    isKeyDown: (key) => {
        return k.isKeyDown(key[0]) || k.isKeyDown(key[1]);
    },
};

const playerAnimHandler = {
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
                playerAnimHandler.setAnim(playerAnimHandler.anim(last, false));
            } else {
                playerAnimHandler.setAnim(playerAnimHandler.anim(keys.currentVert, true));
            }
        } else {
            playerAnimHandler.setAnim(playerAnimHandler.anim(keys.currentHoriz, true));
        }
    },
};

export const setListeners = (gameMap) => {
    player.onUpdate(() => {
        k.camPos(player.pos);
    });

    k.onKeyPress(keys.RIGHT, () => {
        keys.currentHoriz = keys.RIGHT;
        playerAnimHandler.updateAnim(keys.RIGHT);
    });

    k.onKeyDown(keys.RIGHT, () => {
        if (keys.currentHoriz === keys.RIGHT) {
            if (keys.currentVert !== null) {
                player.move(PLAYER_SPEED / Math.sqrt(2), 0);
            } else {
                player.move(PLAYER_SPEED, 0);
            }
        }
    });

    k.onKeyRelease(keys.RIGHT, () => {
        if (keys.isKeyDown(keys.LEFT)) {
            keys.currentHoriz = keys.LEFT;
        } else {
            keys.currentHoriz = null;
        }
        playerAnimHandler.updateAnim(keys.RIGHT);
    });

    k.onKeyPress(keys.LEFT, () => {
        keys.currentHoriz = keys.LEFT;
        playerAnimHandler.updateAnim(keys.LEFT);
    });

    k.onKeyDown(keys.LEFT, () => {
        if (keys.currentHoriz === keys.LEFT) {
            if (keys.currentVert !== null) {
                player.move(-PLAYER_SPEED / Math.sqrt(2), 0);
            } else {
                player.move(-PLAYER_SPEED, 0);
            }
        }
    });

    k.onKeyRelease(keys.LEFT, () => {
        if (keys.isKeyDown(keys.RIGHT)) {
            keys.currentHoriz = keys.RIGHT;
        } else {
            keys.currentHoriz = null;
        }
        playerAnimHandler.updateAnim(keys.LEFT);
    });

    k.onKeyPress(keys.UP, () => {
        keys.currentVert = keys.UP;
        playerAnimHandler.updateAnim(keys.UP);
    });

    k.onKeyDown(keys.UP, () => {
        if (keys.currentVert === keys.UP) {
            if (keys.currentHoriz !== null) {
                player.move(0, -PLAYER_SPEED / Math.sqrt(2));
            } else {
                player.move(0, -PLAYER_SPEED);
            }
        }
    });

    k.onKeyRelease(keys.UP, () => {
        if (keys.isKeyDown(keys.DOWN)) {
            keys.currentVert = keys.DOWN;
        } else {
            keys.currentVert = null;
        }
        playerAnimHandler.updateAnim(keys.UP);
    });

    k.onKeyPress(keys.DOWN, () => {
        keys.currentVert = keys.DOWN;
        playerAnimHandler.updateAnim(keys.DOWN);
    });

    k.onKeyDown(keys.DOWN, () => {
        if (keys.currentVert === keys.DOWN) {
            if (keys.currentHoriz !== null) {
                player.move(0, PLAYER_SPEED / Math.sqrt(2));
            } else {
                player.move(0, PLAYER_SPEED);
            }
        }
    });

    k.onKeyRelease(keys.DOWN, () => {
        if (keys.isKeyDown(keys.UP)) {
            keys.currentVert = keys.UP;
        } else {
            keys.currentVert = null;
        }
        playerAnimHandler.updateAnim(keys.DOWN);
    });
}

export const initializePlayer = (name, gameMap) => {
    createPlayer(name, gameMap.spawnPosition);
    setListeners(gameMap);
}
