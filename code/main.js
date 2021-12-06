import { k } from "./kaboom";
import { addLayers } from "./layers";
import { testmap } from "./maps/testmap";
import { GameMap } from "./maps/index";
import { initializePlayer, player, types } from "./player";
import { loader } from "./spriteLoader";
import { createUI, uiHandler } from "./ui";

addLayers();

loader.loadArchit();

const map = new GameMap(testmap);

initializePlayer(types.Mage, map);
createUI();

k.onKeyPress("q", () => {
    player.hurt();
});

k.onKeyPress("e", () => {
    player.heal();
});

k.onKeyPress("r", () => {
    player.modifier = ((player.modifier + 1) % 4);
    uiHandler.updateHearts();
});
