import { k } from "./kaboom";
import { addLayers } from "./layers";
import { testmap } from "./maps/testmap";
import { GameMap } from "./maps/index";
import { initializePlayer } from "./player";
import { loader } from "./spriteLoader";

addLayers();

loader.loadArchit();

const map = new GameMap(testmap);

initializePlayer("Engineer", map);
