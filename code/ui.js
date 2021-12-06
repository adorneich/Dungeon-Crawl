import { k } from "./kaboom";
import { loader } from "./spriteLoader";
import { MODS, player, playerHandler } from "./player";

const hearts = [];
const enduranceBars = [];
const enduranceFrames = [];
const UI_POSITIONS = {
    HEARTS: [2, 2],
    ENDURANCE_BAR: [2, 16],
};
const UI_SCALE = 0.75;

export const uiHandler = {
    updateHearts: () => {
        let tempHP = player.hp();
        let modifier = player.modifier;
        for (let i = 0; i < hearts.length; i++) {
            let amt = Math.min(tempHP, 4);
            if (tempHP > 0 && tempHP <= 4) {
                hearts[i].play(MODS.name(modifier) + amt);
            } else {
                hearts[i].stop();
                hearts[i].frame = modifier * 9 + (8 - 2 * amt);
            }
            tempHP -= amt;
        }
    },

    updateEndurance: () => {
        let tempEndurance = player.endurance;
        for (let i = 0; i < enduranceBars.length; i++) {
            let amt = Math.min(tempEndurance, 4);
            enduranceBars[i].frame = 4 - amt;
            tempEndurance -= amt;
        }
    }
}

const createBarFrame = (num, x, y, frameArray) => {
    if (num === 1) {
        frame = k.add([
            sprite("bar_frame", { frame: 3 }),
            scale(UI_SCALE),
            layer("ui"),
            fixed(),
            z(2),
            pos(x, y),
        ]);
        frameArray.push(frame);
    } else {
        for (let i = 0; i < num; i++) {
            frame = k.add([
                sprite("bar_frame"),
                scale(UI_SCALE),
                layer("ui"),
                fixed(),
                z(2),
                pos(x + (16 * UI_SCALE) * i, y),
            ]);
            frame.frame = 2;
            frameArray.push(frame);
        }
        frameArray[0].frame = 0;
        frameArray[frameArray.length - 1].frame = 4;
    }
}

const createHearts = () => {
    for (let i = 0; i < playerHandler.type.hp / 4; i++) {
        let heart = k.add([
            sprite("heart"),
            scale(UI_SCALE),
            layer("ui"),
            fixed(),
            pos(UI_POSITIONS.HEARTS[0] + (16 * UI_SCALE) * i, UI_POSITIONS.HEARTS[1]),
        ]);
        heart.animSpeed = 0.2;
        hearts.push(heart);
    }
}

const createEndurance = () => {
    for (let i = 0; i < playerHandler.type.endurance / 4; i++) {
        let enduranceBar = k.add([
            sprite("yellow_bar"),
            scale(UI_SCALE),
            layer("ui"),
            fixed(),
            z(1),
            pos(UI_POSITIONS.ENDURANCE_BAR[0] + (16 * UI_SCALE) * i, UI_POSITIONS.ENDURANCE_BAR[1]),
        ]);
        enduranceBars.push(enduranceBar);
    }
    createBarFrame(playerHandler.type.endurance / 4, UI_POSITIONS.ENDURANCE_BAR[0], UI_POSITIONS.ENDURANCE_BAR[1], enduranceFrames);
}

export const createUI = () => {
    loader.loadUI();
    createHearts();
    createEndurance();
    uiHandler.updateHearts();
    uiHandler.updateEndurance();
}
