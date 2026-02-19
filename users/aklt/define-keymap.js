#!/usr/bin/env node
// Generate a QMK or ZMK keymap using a template and definitions for keys
//
// Usage:
//   node define-keymap.js <format> <keyboard>
//   node define-keymap.js qmk sofle
//   node define-keymap.js zmk ferris
//   node define-keymap.js help
//
// Keyboards:
//
// Sofle using qmk
// Kyria using qmk
// Ferris using zmk

// Keys
// sXX: Sofle only
// kXX: Kyria only
// eXX: Sofle + Kyria
// fXX: Sofle + Kyria + Sweep
import { toKeycode } from "./letterToKeycode.js";
import layers from "./layers.js";

const keymapTemplate = `
s00 s01 s02 s03 s04 s05 --- --- --- --- s06 s07 s08 s09 s10 s11
e12 f13 f14 f15 f16 f17 --- --- --- --- f18 f19 f20 f21 f22 e23
e24 f25 f26 f27 f28 f29 --- --- --- --- f30 f31 f32 f33 f34 e35
e36 f37 f38 f39 f40 f41 e42 k43 k44 e45 f46 f47 f48 f49 f50 e51
--- --- s52 e53 e54 f55 f56 k57 k58 f59 f60 e61 e62 s63 --- ---
`;

// Command line argument parsing
const args = process.argv.slice(2);

function printUsage() {
    console.log(`Usage: node define-keymap.js <format> <keyboard>

Formats:
  qmk       - Generate QMK keymap.c format
  zmk       - Generate ZMK configuration format

Keyboards:
  sofle     - Sofle keyboard
  kyria     - Kyria keyboard
  ferris    - Ferris Sweep keyboard

Commands:
  help      - Show this help message
  templates - Show keyboard layout templates

Examples:
  node define-keymap.js qmk sofle
  node define-keymap.js zmk ferris
  node define-keymap.js templates
  node define-keymap.js help
`);
}

function parseArgs(args) {
    const result = { format: null, keyboard: null };

    // Handle first argument - determines action/format
    const firstArg = args[0] || "";

    // Check for help
    if (/^(help|-h|--help)$/i.test(firstArg)) {
        return { action: "help" };
    }

    // Check for templates command
    if (/^templates$/i.test(firstArg)) {
        return { action: "templates" };
    }

    // Check for format (qmk or zmk)
    if (/^qmk$/i.test(firstArg)) {
        result.format = "qmk";
    } else if (/^zmk$/i.test(firstArg)) {
        result.format = "zmk";
    } else if (firstArg) {
        console.error(`Unknown format: ${firstArg}`);
        return { action: "help" };
    }

    // Handle second argument - keyboard selection
    const secondArg = args[1] || "";

    if (/^sofle$/i.test(secondArg)) {
        result.keyboard = "sofle";
    } else if (/^kyria$/i.test(secondArg)) {
        result.keyboard = "kyria";
    } else if (/^ferris$/i.test(secondArg)) {
        result.keyboard = "ferris";
    } else if (secondArg) {
        console.error(`Unknown keyboard: ${secondArg}`);
        return { action: "help" };
    }

    result.action = "generate";
    return result;
}

const keyDefines = {
    CAPS: "KC_CAPS_LOCK",
    L1: "MO(1)",
};

const define = {
    combos: {
        // Left hand - horizontal
        qw: "ESC",
        as: "TAB",       // Conflict resolved: keymap.c (was LSFT in define-keymap.js)
        zx: "DEL",
        we: "TAB",
        sd: "|",
        xc: "LCTL",
        er: "LALT",
        rt: "SPC",
        fg: "SPC",
        vb: "SPC",
        // Right hand - horizontal
        yu: "+",
        hj: "-",
        nm: "*",
        ui: "[",
        jk: "(",
        "m,": "{",
        io: "]",         // Conflict resolved: define-keymap.js (was DEL in keymap.c)
        kl: ")",
        ",.": "}",
        op: "BSP",
        "l;": "ENT",
        "./": "BSLS",    // Conflict resolved: keymap.c (was RSFT in define-keymap.js)
        "p\\": "BSPC",
        // Vertical combos
        ik: "PGUP",
        "k,": "PGDN",
        jm: "HOME",
        "l.": "END",
        uj: "INS",
        ol: "DEL",
    },
    // Additional combos from keymap.c that use non-alpha keys
    // These require special handling as they use number row or modifier keys
    specialCombos: {
        // Format: { keys: [key1, key2], result: "keycode", qmkOnly: true }
        ZERO_BACKSPACE: { keys: ["KC_0", "KC_BSPC"], result: "KC_PLUS" },
        CAPS_WORD: { keys: ["KC_LSFT", "KC_BSPC"], result: "CK_CAPS" },
        MINUS: { keys: ["KC_0", "KC_9"], result: "KC_MINUS" },
        TOGGLE_LAYER: { keys: ["D_L1", "D_L4"], result: "LT(TOGGLE, KC_NO)" },
    },
};

const keyDefinesUsed = {};

function formatDefinesCode(defines) {
    return Object.entries(defines)
        .filter(([key]) => keyDefinesUsed[key])
        .map(([key, value]) => `#define D_${key} ${value}`)
        .join("\n");
}

function createSofleTemplate() {
    return keymapTemplate.replace(/k\d{2}\s+/g, "");
}

function createKyriaTemplate() {
    return keymapTemplate.replace(/s\d{2}\s+/g, "");
}

function createFerrisTemplate() {
    return keymapTemplate.replace(/(s|k)\d{2}\s+/g, "");
}

function createTransTemplate(keyTemplate) {
    return keyTemplate.replace(/\w{3}/g, "___");
}

function readLayerDefinition(layer) {
    const lines = layer
        .trim()
        .split("\n")
        .filter((line) => line.trim() !== "");
    const entries = {};
    lines.forEach((line) => {
        const [key, ...defs] = line
            .trim()
            .split(/\s+/)
            .map((c) => c.trim());
        entries[key] = defs;
    });
    return entries;
}

function readLayerDefinitions(layers) {
    const layerDefs = {};
    Object.entries(layers).forEach(([layerName, layerDef]) => {
        layerDefs[layerName] = readLayerDefinition(layerDef);
    });
    return layerDefs;
}

function prefixWithString(str, prefix) {
    return str
        .split("\n")
        .map((line) => prefix + line)
        .join("\n");
}

function templateForKb(kb) {
    let matchKey = "s|k|e|f";
    if (kb === "sofle") {
        matchKey = "s|e|f";
    } else if (kb === "kyria") {
        matchKey = "k|e|f";
    } else if (kb === "ferris") {
        matchKey = "f";
    } else {
        throw new Error(
            `Unknown keyboard: ${kb}, need to be one of sofle, kyria, ferris`,
        );
    }
    const re = new RegExp(`^${matchKey}`);
    const lines = [];
    keymapTemplate.split(/\n/g).forEach((line) => {
        const newLine = [];
        line.trim()
            .split(/\s+/)
            .filter((k) => k.trim() !== "")
            .forEach((k) => {
                if (re.test(k)) {
                    newLine.push(k);
                } else {
                    newLine.push("        ");
                }
            });
        lines.push(newLine.join(" "));
    });
    return lines.join("\n");
}

// Template visualization (available via 'templates' command if needed)
function printTemplates() {
    console.log(`
/* Keyboards templates for ferris, kyria and sofle:
${templateForKb("ferris")}
${templateForKb("kyria")}
${templateForKb("sofle")}
*/
`);
}

const TRNS = "_______";

function formatLayerDefinitionPretty(
    layerDef,
    kbTemplate,
    opt = { space: 8, code: false },
) {
    const space = opt.space || 8;
    let template = kbTemplate
        .split("\n")
        .filter((line) => line.trim() !== "")
        .join("\n");
    const keys = kbTemplate.split(/\s+/).filter((k) => k.trim() !== "");
    keys.forEach((key) => {
        if (!layerDef[key]) {
            template = template.replace(key, TRNS.padEnd(space, " "));
            return;
        }
        const k = layerDef[key] ? layerDef[key][0] : undefined;
        template = template.replace(
            key,
            typeof k === "undefined"
                ? " ".repeat(space)
                : k === "---"
                  ? " ".repeat(space)
                  : (opt.code ? toKeycode(k) : k).padEnd(space, " "),
        );
    });
    if (opt.code) {
        template = template.split('\n')
            .filter(line => typeof line === 'string' && line.length > 0)
            .map(line => line.replace(/(\S)(\s+)/g, (all, $1, $2) => `${$1},${$2 || ''}`))
            .map(line => line.replace(/\s*,?\s+$/, '').replace(/$/, ","))
            .join('\n').replace(/\s*,\s*$/, '');
    }
    return prefixWithString(template, "   ");
}

function formatLayerDefinitionCode(name, layerDef, forKb = "sofle") {
    const kbTemplate = templateForKb(forKb);
    const code = formatLayerDefinitionPretty(layerDef, kbTemplate, {
        code: true,
    });
    const comment = formatLayerDefinitionPretty(layerDef, kbTemplate);
    return `[${name}] = LAYOUT_MACRO(
${comment.replace(/^../, "/*").replace(/..$/, "*/")}\n\n${code}
)`;
}

// Map layer names from layers.js to macros.h enum names
const layerNameMap = {
    base_sofle: "BASE_SOFLE",
    base_qwerty: "BASE_QWERTY",
    base_colemak_dh: "BASE_COLEMAK_DH",
    base_gaming: "BASE_GAMING",
    overlay_numpad: "OVERLAY_NUMPAD",
    overlay_num: "OVERLAY_NUM",
    overlay_fn: "OVERLAY_FN",
    overlay_mouse: "OVERLAY_MOUSE",
    toggle: "TOGGLE",
    l1_nav: "L1_NAV",
    l2: "L2",
    l3: "L3",
    l4: "L4",
    l5: "L5",
};

function formatDefinitionCodeForLayers(forKb = "sofle") {
    return `
const uint16_t PROGMEM keymaps[][MATRIX_ROWS][MATRIX_COLS] = {
${Object.entries(layerDefinitions)
        .map(([name, layerDef]) => {
            const qmkLayerName = layerNameMap[name] || `LAYER_${name.toUpperCase()}`;
            return prefixWithString(formatLayerDefinitionCode(qmkLayerName, layerDef, forKb), "    ");
        })
        .join(",\n\n")}
};`;
}

// Generate encoder map for all layers
function formatEncoderMap() {
    const layerNames = Object.keys(layerDefinitions).map(name => layerNameMap[name] || `LAYER_${name.toUpperCase()}`);
    const encoderLines = layerNames.map(name =>
        `    [${name}] = {ENCODER_CCW_CW(KC_VOLD, KC_VOLU), ENCODER_CCW_CW(KC_PGUP, KC_PGDN)}`
    ).join(",\n");
    return `
#if defined(ENCODER_ENABLE) && defined(ENCODER_MAP_ENABLE)
const uint16_t PROGMEM encoder_map[][NUM_ENCODERS][NUM_DIRECTIONS] = {
${encoderLines}
};
#endif // defined(ENCODER_ENABLE) && defined(ENCODER_MAP_ENABLE)`;
}

// ZMK keycode mapping
function keyToZmkCode(key, unknownKey = "&trans") {
    if (key === "SPACE") {
        key = " ";
    }
    const zmkMap = {
        // Letters (lowercase)
        a: "&kp A", b: "&kp B", c: "&kp C", d: "&kp D", e: "&kp E",
        f: "&kp F", g: "&kp G", h: "&kp H", i: "&kp I", j: "&kp J",
        k: "&kp K", l: "&kp L", m: "&kp M", n: "&kp N", o: "&kp O",
        p: "&kp P", q: "&kp Q", r: "&kp R", s: "&kp S", t: "&kp T",
        u: "&kp U", v: "&kp V", w: "&kp W", x: "&kp X", y: "&kp Y",
        z: "&kp Z",
        // Numbers
        0: "&kp N0", 1: "&kp N1", 2: "&kp N2", 3: "&kp N3", 4: "&kp N4",
        5: "&kp N5", 6: "&kp N6", 7: "&kp N7", 8: "&kp N8", 9: "&kp N9",
        // Special characters (unshifted)
        ";": "&kp SEMI", ",": "&kp COMMA", ".": "&kp DOT", "/": "&kp FSLH",
        "'": "&kp SQT", "[": "&kp LBKT", "]": "&kp RBKT", "\\": "&kp BSLH",
        "-": "&kp MINUS", "=": "&kp EQUAL", "`": "&kp GRAVE",
        // Shifted symbols
        "!": "&kp EXCL", "@": "&kp AT", "#": "&kp HASH", "$": "&kp DLLR",
        "%": "&kp PRCNT", "^": "&kp CARET", "&": "&kp AMPS", "*": "&kp ASTRK",
        "(": "&kp LPAR", ")": "&kp RPAR", "_": "&kp UNDER", "+": "&kp PLUS",
        "{": "&kp LBRC", "}": "&kp RBRC", "|": "&kp PIPE", ":": "&kp COLON",
        '"': "&kp DQT", "<": "&kp LT", ">": "&kp GT", "?": "&kp QMARK",
        "~": "&kp TILDE",
        // Named keys - Basic
        TAB: "&kp TAB", ENT: "&kp RET", ESC: "&kp ESC", SPC: "&kp SPACE",
        BSP: "&kp BSPC", DEL: "&kp DEL", INS: "&kp INS",
        BSPC: "&kp BSPC", BSLS: "&kp BSLH", GRV: "&kp GRAVE",
        // Named keys - Modifiers
        LSFT: "&kp LSHFT", RSFT: "&kp RSHFT",
        LCTL: "&kp LCTRL", RCTL: "&kp RCTRL",
        LALT: "&kp LALT", RALT: "&kp RALT",
        LGUI: "&kp LGUI", RGUI: "&kp RGUI",
        // Named keys - Navigation
        HOME: "&kp HOME", END: "&kp END",
        PGUP: "&kp PG_UP", PGDN: "&kp PG_DN", PGDOWN: "&kp PG_DN",
        UP: "&kp UP", DOWN: "&kp DOWN", LEFT: "&kp LEFT", RIGHT: "&kp RIGHT",
        // Named keys - Function/Special
        CAPS: "&kp CAPS", NUM: "&kp KP_NUM", APP: "&kp K_APP",
        PSCR: "&kp PSCRN", SLCK: "&kp SLCK", PAUS: "&kp PAUSE_BREAK",
        // Named keys - Encoders (mapped to ctrl for rotation fallback)
        ENCL: "&kp LCTRL", ENCR: "&kp RCTRL",
        // Named keys - Aliases
        C_QUOT: "&kp SQT", SENT: "&kp RET",
        // Space
        " ": "&kp SPACE",
        // Layer keys (ZMK layer tap and momentary)
        L1: "&mo 1",
        D_L2: "&lt 2 ESC",
        D_L3: "&lt 3 D",
        D_L4: "&lt 4 SPACE",
        D_L5: "&lt 5 F",
        GUI_DEL: "&mt LGUI DEL",
        // Kyria-specific (placeholders)
        WIR: "&trans",
        OPR: "&trans",
        // Ctrl + key combinations
        C_LEFT: "&kp LC(LEFT)",
        C_RIGHT: "&kp LC(RIGHT)",
    };
    return zmkMap[key] || unknownKey;
}

function formatLayerDefinitionZmk(layerDef, kbTemplate) {
    let template = kbTemplate
        .split("\n")
        .filter((line) => line.trim() !== "")
        .join("\n");
    const keys = kbTemplate.split(/\s+/).filter((k) => k.trim() !== "");
    const space = 12;
    keys.forEach((key) => {
        if (!layerDef[key]) {
            template = template.replace(key, "&trans".padEnd(space, " "));
            return;
        }
        const k = layerDef[key] ? layerDef[key][0] : undefined;
        template = template.replace(
            key,
            typeof k === "undefined"
                ? "&trans".padEnd(space, " ")
                : k === "---"
                  ? "&trans".padEnd(space, " ")
                  : keyToZmkCode(k).padEnd(space, " "),
        );
    });
    return prefixWithString(template, "    ");
}

function formatZmkLayerCode(name, layerDef, forKb = "ferris") {
    const kbTemplate = templateForKb(forKb);
    const code = formatLayerDefinitionZmk(layerDef, kbTemplate);
    return `${name}_layer {
    bindings = <
${code}
    >;
};`;
}

function formatZmkDefinitionCodeForLayers(forKb = "ferris") {
    return `/ {
    keymap {
        compatible = "zmk,keymap";

${Object.entries(layerDefinitions)
        .map(([name, layerDef]) =>
            prefixWithString(formatZmkLayerCode(name, layerDef, forKb), "        "),
        )
        .join("\n\n")}
    };
};`;
}

// ZMK combo support
// Key position mappings for different keyboards
//
// Ferris/Sweep (34 keys): 3x5 + 2 thumbs per side
//  0  1  2  3  4        5  6  7  8  9
// 10 11 12 13 14       15 16 17 18 19
// 20 21 22 23 24       25 26 27 28 29
//          30 31       32 33
//
// Kyria (46 keys): 3x6 + 5 thumbs per side
//     0  1  2  3  4  5       6  7  8  9 10 11
//    12 13 14 15 16 17      18 19 20 21 22 23
//    24 25 26 27 28 29      30 31 32 33 34 35
//          36 37 38 39 40   41 42 43 44 45
//
// Sofle (58 keys + 2 encoders): 4x6 + 5 thumbs + 1 encoder per side
//  0  1  2  3  4  5          6  7  8  9 10 11
// 12 13 14 15 16 17         18 19 20 21 22 23
// 24 25 26 27 28 29         30 31 32 33 34 35
// 36 37 38 39 40 41 [E]  [E] 42 43 44 45 46 47
//       48 49 50 51 52      53 54 55 56 57

function getLetterToPosition(keyboard) {
    if (keyboard === "ferris") {
        // Ferris: 34 keys, no outer columns, 5 cols per side
        return {
            // Top row (0-9)
            q: 0, w: 1, e: 2, r: 3, t: 4, y: 5, u: 6, i: 7, o: 8, p: 9,
            // Home row (10-19)
            a: 10, s: 11, d: 12, f: 13, g: 14, h: 15, j: 16, k: 17, l: 18, ";": 19,
            // Bottom row (20-29)
            z: 20, x: 21, c: 22, v: 23, b: 24, n: 25, m: 26, ",": 27, ".": 28, "/": 29,
        };
    } else if (keyboard === "kyria") {
        // Kyria: 46 keys (3x6 + 5 thumbs per side), has outer columns
        return {
            // Top row - outer at 0,11, alpha at 1-5 and 6-10
            q: 1, w: 2, e: 3, r: 4, t: 5, y: 6, u: 7, i: 8, o: 9, p: 10,
            // Home row - outer at 12,23, alpha at 13-17 and 18-22
            a: 13, s: 14, d: 15, f: 16, g: 17, h: 18, j: 19, k: 20, l: 21, ";": 22,
            // Bottom row - outer at 24,35, alpha at 25-29 and 30-34
            z: 25, x: 26, c: 27, v: 28, b: 29, n: 30, m: 31, ",": 32, ".": 33, "/": 34,
        };
    } else if (keyboard === "sofle") {
        // Sofle: 58 keys (4x6 + 5 thumbs per side), has number row + outer columns
        return {
            // Row 1 (after number row) - outer at 12,23, alpha at 13-17 and 18-22
            q: 13, w: 14, e: 15, r: 16, t: 17, y: 18, u: 19, i: 20, o: 21, p: 22,
            // Row 2 (home) - outer at 24,35, alpha at 25-29 and 30-34
            a: 25, s: 26, d: 27, f: 28, g: 29, h: 30, j: 31, k: 32, l: 33, ";": 34,
            // Row 3 (bottom) - outer at 36,47, alpha at 37-41 and 42-46
            z: 37, x: 38, c: 39, v: 40, b: 41, n: 42, m: 43, ",": 44, ".": 45, "/": 46,
        };
    } else {
        throw new Error(`Unknown keyboard for combo positions: ${keyboard}`);
    }
}

// Convert a result key to ZMK binding format
function resultKeyToZmkBinding(key) {
    const zmkBindings = {
        // Modifiers
        LSFT: "&kp LSHFT", RSFT: "&kp RSHFT",
        LCTL: "&kp LCTRL", RCTL: "&kp RCTRL",
        LALT: "&kp LALT", RALT: "&kp RALT",
        LGUI: "&kp LGUI", RGUI: "&kp RGUI",
        // Common keys
        ESC: "&kp ESC", TAB: "&kp TAB", ENT: "&kp RET", SPC: "&kp SPACE",
        BSP: "&kp BSPC", DEL: "&kp DEL", INS: "&kp INS",
        // Navigation
        HOME: "&kp HOME", END: "&kp END", PGUP: "&kp PG_UP", PGDN: "&kp PG_DN",
        UP: "&kp UP", DOWN: "&kp DOWN", LEFT: "&kp LEFT", RIGHT: "&kp RIGHT",
        // Symbols
        "+": "&kp PLUS", "-": "&kp MINUS", "*": "&kp ASTRK",
        "[": "&kp LBKT", "]": "&kp RBKT",
        "{": "&kp LBRC", "}": "&kp RBRC",
        "(": "&kp LPAR", ")": "&kp RPAR",
        "|": "&kp PIPE",
        // Letters
        a: "&kp A", b: "&kp B", c: "&kp C", d: "&kp D", e: "&kp E",
        f: "&kp F", g: "&kp G", h: "&kp H", i: "&kp I", j: "&kp J",
        k: "&kp K", l: "&kp L", m: "&kp M", n: "&kp N", o: "&kp O",
        p: "&kp P", q: "&kp Q", r: "&kp R", s: "&kp S", t: "&kp T",
        u: "&kp U", v: "&kp V", w: "&kp W", x: "&kp X", y: "&kp Y",
        z: "&kp Z",
    };
    return zmkBindings[key] || `&kp ${key.toUpperCase()}`;
}

function defineZmkCombos(comboDefinitions, keyboard, timeoutMs = 50) {
    const combos = [];
    const letterToPosition = getLetterToPosition(keyboard);

    Object.entries(comboDefinitions).forEach(([comboKeys, resultKey], i) => {
        // Split combo keys into individual characters
        const keys = comboKeys.split("");

        // Map each key to its position
        const positions = keys.map((k) => {
            const pos = letterToPosition[k];
            if (pos === undefined) {
                console.error(`Warning: Unknown key '${k}' in combo '${comboKeys}'`);
                return -1;
            }
            return pos;
        }).filter((p) => p >= 0);

        if (positions.length < 2) {
            console.error(`Warning: Combo '${comboKeys}' needs at least 2 valid keys`);
            return;
        }

        // Generate combo name (sanitize for ZMK)
        const comboName = `combo_${i}_${comboKeys.replace(/[^a-zA-Z0-9]/g, "_")}`;

        // Get the ZMK binding for the result
        const binding = resultKeyToZmkBinding(resultKey);

        combos.push(`        ${comboName} {
            timeout-ms = <${timeoutMs}>;
            key-positions = <${positions.join(" ")}>;
            bindings = <${binding}>;
        };`);
    });

    return `    combos {
        compatible = "zmk,combos";

${combos.join("\n\n")}
    };`;
}


const layerDefinitions = readLayerDefinitions(layers);

// Main CLI logic
function main() {
    const parsedArgs = parseArgs(args);

    switch (parsedArgs.action) {
        case "help":
            printUsage();
            process.exit(0);
            break;

        case "templates":
            printTemplates();
            process.exit(0);
            break;

        case "generate":
            if (!parsedArgs.format || !parsedArgs.keyboard) {
                console.error("Error: Both format and keyboard must be specified.\n");
                printUsage();
                process.exit(1);
            }

            const keyboard = parsedArgs.keyboard;
            const format = parsedArgs.format;

            if (format === "qmk") {
                const layerCode = formatDefinitionCodeForLayers(keyboard);
                const encoderCode = formatEncoderMap();
                const combosCode = defineCombos(define.combos, define.specialCombos);
                console.log(`// Generated keymap.c
// Built: ${new Date().toISOString()}
// Keyboard: ${keyboard}
// Generator: define-keymap.js

#include "aklt.h"

// {{{1 Keymap Layers
${layerCode}

// {{{1 Encoder Map
${encoderCode}

// {{{1 Combos
#ifdef COMBO_ENABLE
${combosCode}
#endif // COMBO_ENABLE
`);
            } else if (format === "zmk") {
                const zmkCode = formatZmkDefinitionCodeForLayers(keyboard);
                const zmkCombosCode = defineZmkCombos(define.combos, keyboard);
                console.log(`// Built ${new Date()}
// Keyboard: ${keyboard}
// Format: ZMK configuration

/ {
${zmkCombosCode}
};

${zmkCode}
`);
            }
            break;

        default:
            printUsage();
            process.exit(1);
    }
}

main();

function createLayers(layerDef, template) {
    const layerMap = {};
}

const sofleTemplate = createSofleTemplate();
const sofleTransTemplate = createTransTemplate(sofleTemplate);
const kyriaTemplate = createKyriaTemplate();
const kyriaTransTemplate = createTransTemplate(kyriaTemplate);
const ferrisTemplate = createFerrisTemplate();
const ferrisTransTemplate = createTransTemplate(ferrisTemplate);

function defineCombos(comboDefinitions, specialComboDefinitions = {}) {
    const enumDef = [];
    const comboDefs = [];
    const combos = [];

    // Process letter-based combos
    Object.entries(comboDefinitions).forEach(([comboKeys, resultKey], i) => {
        const enumName = `COMBO_${i}_${comboKeys.toUpperCase().replace(/\W/g, "_")}`;
        const ksKeys = comboKeys
            .split("")
            .map((k) => toKeycode(k))
            .join(", ");
        const definition = `const uint16_t PROGMEM def${enumName}[] = { ${ksKeys}, COMBO_END };`;
        const comboDef = `  [${enumName}] = COMBO(def${enumName}, ${toKeycode(resultKey)})`;
        enumDef.push(enumName);
        comboDefs.push(definition);
        combos.push(comboDef);
    });

    // Process special combos (already have QMK keycodes)
    Object.entries(specialComboDefinitions).forEach(([name, combo]) => {
        const enumName = name;
        const ksKeys = combo.keys.join(", ");
        const definition = `const uint16_t PROGMEM def${enumName}[] = { ${ksKeys}, COMBO_END };`;
        const comboDef = `  [${enumName}] = COMBO(def${enumName}, ${combo.result})`;
        enumDef.push(enumName);
        comboDefs.push(definition);
        combos.push(comboDef);
    });

    return `enum combos {
    ${enumDef.join(",\n    ")}
};
${comboDefs.join("\n")}
combo_t key_combos[] = {
    ${combos.join(",\n    ")}
};
`;
}

