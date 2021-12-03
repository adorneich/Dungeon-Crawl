import { k } from "./../kaboom";
import { legend } from "./legend";

export class GameMap {
    #mapArray;
    #map;

    constructor(mapArray) {
        this.#mapArray = mapArray;
        this.#map = k.addLevel(this.#mapArray, legend(this));
    }

    zVal(ctx) {
        if (ctx.y === 0) {
            return 1;
        } else if (this.#mapArray[ctx.y - 1][ctx.x] === "*") {
            return 3;
        } else {
            return 1;
        }
    }

    get spawnPosition() {
        for (let y = 0; y < this.#mapArray.length; y++) {
            for (let x = 0; x < this.#mapArray.length; x++) {
                if (this.#mapArray[y][x] !== "@") continue;
                return this.#map.getPos(x, y);
            }
        }
    }

    getWorldPos(...args) {
        return this.#map.getPos(...args);
    }

    getMapPos(...args) {
        const p = k.vec2(...args);
        const offset = this.#map.offset();
        return k.vec2((p.x - offset.x) / this.#map.gridWidth(), (p.y - offset.y) / this.#map.gridHeight());
    }
};
