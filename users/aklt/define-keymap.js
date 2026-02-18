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

const keymapTemplate = `
s00 s01 s02 s03 s04 s05 --- --- --- --- s06 s07 s08 s09 s10 s11
e12 f13 f14 f15 f16 f17 --- --- --- --- f18 f19 f20 f21 f22 e23
e24 f25 f26 f27 f28 f29 --- --- --- --- f30 f31 f32 f33 f34 e35
e36 f37 f38 f39 f40 f41 e42 k43 k44 e45 f46 f47 f48 f49 f50 e51
--- --- s52 e53 e54 f55 f56 k57 k58 f57 f58 e59 e60 s61 --- ---
`;

const keyDefines = {
    CAPS: "KC_CAPS_LOCK",
    L1: "MO(1)",
};

const define = {
    combos: {
        // Left
        qw: "ESC",
        as: "LSFT",
        zx: "DEL",
        we: "TAB",
        sd: "|",
        xc: "LCTL",
        er: "LALT",
        rt: "SPC",
        fg: "SPC",
        vb: "SPC",
        // Right
        yu: "+",
        hj: "-",
        nm: "*",
        ui: "[",
        jk: "(",
        "m,": "{",
        io: "]",
        kl: ")",
        ",.": "}",
        op: "BSP",
        "l;": "ENT",
        "./": "RSFT",
        // vertical
        ik: "PGUP",
        "k,": "PGDN",
        jm: "HOME",
        "l.": "END",
        uj: "INS",
        ol: "DEL",
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
            template = template.replace(key, "_".repeat(space));
            return;
        }
        const k = layerDef[key] ? layerDef[key][0] : undefined;
        template = template.replace(
            key,
            typeof k === "undefined"
                ? " ".repeat(space)
                : k === "---"
                  ? " ".repeat(space)
                  : (opt.code ? keyToQmkCodeOrDefine(k) : k).padEnd(space, " "),
        );
    });
    if (opt.code) {
        template = template.replace(/\b /g, ",").replace(/\b$/gm, ",");
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

function formatDefinitionCodeForLayers(forKb = "sofle") {
    return `
const uint16_t PROGMEM keymaps[][MATRIX_ROWS][MATRIX_COLS] = {
${Object.entries(layerDefinitions)
        .map(([name, layerDef]) =>
            prefixWithString(formatLayerDefinitionCode(`LAYER_${name.toUpperCase()}`, layerDef, forKb), "    "),
        )
        .join(",\n\n")}
};`;
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
        L2_ESC: "&lt 2 ESC",
        L3_D: "&lt 3 D",
        L4_S: "&lt 4 SPACE",
        L5_F: "&lt 5 F",
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
                const definesCode = formatDefinesCode(keyDefines);
                const combosCode = defineCombos(define.combos);
                console.log(`// Built ${new Date()}
// Keyboard: ${keyboard}
// Format: QMK keymap.c

${definesCode}

${layerCode}

${combosCode}
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

function defineCombos(comboDefinitions) {
    const enumDef = [];
    const comboDefs = [];
    const combos = [];
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
    return `enum combos {
    ${enumDef.join(",\n    ")}
};
${comboDefs.join("\n")}
combo_t key_combos[] = {
    ${combos.join(",\n    ")}
};
`;
}


// const colemakDHKeymap = `
// q w f p g           j l u y ;
// a r s t d           h n e i o
// z x c v b           k m , . /
// `;
//
// const numbers = "1 2 3 4 5 6 7 8 9 0";
// const symbols = `- = [ ] \\ ; ' , . / \``;
//
// const keysTemplate = `
// esc  1   2    3    4   5             6   7   8    9    0    bsp
// tab  q   w    e    r   t             y   u   i    o    p    \\
// shl  a   s    d    f   g             h   j   k    l    ;    entr
// ctl  z   x    c    v   b             n   m   ,    .    /    ctr
//          opl  wil  l1  l2  spc rgui  r2  r1  wir  opr
// `;
//
// const horizontalCombosTemplate = `
// k00-k01 k01-k02 k02-k03 k03-k04         k05-k06 k06-k07 k07-k08 k08-k09
// k10-k11 k11-k12 k12-k13 k13-k14         k15-k16 k16-k17 k17-k18 k18-k19
// k20-k21 k21-k22 k22-k23 k23-k24         k25-k26 k26-k27 k27-k28 k28-k29
//                         k30-k31 k31-k32 k32-k33
// `;
//
// const combos = {
//     "k00-k01": "KC_ESC",
// };
//
// // console.log(templateReplaceKeys(keymapTemplate))
//
// // console.log(keymapTemplate);
//
// const fullKeyboard = `
// esc   f1   f2   f3   f4     f5   f6   f7   f8     f9   f10  f11  f12          pscr slck pause
//
// \`    1    2    3    4    5    6    7    8    9    0    -    =    bspc        ins  home pgup      nlck  k/   k*  k-
// tab   q    w    e    r    t    y    u    i    o    p    [    ]    \\          del  end  pgdn      k7    k8   k9  k+
// caps  a    s    d    f    g    h    j    k    l    ;    '    entr                                 k4    k5   k6
// lsft  z    x    c    v    b    n    m    ,    .    /    rsft                        up            k1    k2   k3  kentr
// lctl  lgui lalt           spc                 ralt rgui menu rctl             left down rght      k0         k.
// `;
//
// // Additional key mappings for fullKeyboard that aren't basic alphanumeric/punctuation
// const othersToQmkCode = {
//     // Function keys
//     f1: "KC_F1",
//     f2: "KC_F2",
//     f3: "KC_F3",
//     f4: "KC_F4",
//     f5: "KC_F5",
//     f6: "KC_F6",
//     f7: "KC_F7",
//     f8: "KC_F8",
//     f9: "KC_F9",
//     f10: "KC_F10",
//     f11: "KC_F11",
//     f12: "KC_F12",
//     // Modifiers
//     lctl: "KC_LCTL",
//     lsft: "KC_LSFT",
//     lalt: "KC_LALT",
//     lgui: "KC_LGUI",
//     rctl: "KC_RCTL",
//     rsft: "KC_RSFT",
//     ralt: "KC_RALT",
//     rgui: "KC_RGUI",
//     // Navigation and editing
//     esc: "KC_ESC",
//     tab: "KC_TAB",
//     caps: "KC_CAPS",
//     entr: "KC_ENT",
//     bspc: "KC_BSPC",
//     spc: "KC_SPC",
//     menu: "KC_APP",
//     ins: "KC_INS",
//     del: "KC_DEL",
//     home: "KC_HOME",
//     end: "KC_END",
//     pgup: "KC_PGUP",
//     pgdn: "KC_PGDN",
//     // Arrow keys
//     up: "KC_UP",
//     down: "KC_DOWN",
//     left: "KC_LEFT",
//     rght: "KC_RGHT",
//     // Special function keys
//     pscr: "KC_PSCR",
//     slck: "KC_SCRL",
//     pause: "KC_PAUS",
//     nlck: "KC_NUM",
//     // Numpad operators
//     "*": "KC_PAST",
//     "+": "KC_PPLS",
// };

// Map key names to QMK keycodes
function keyToQmkCodeOrDefine(key, unknownKey = "_______") {
    if (key === "SPACE") {
        key = " ";
    }
    const keyMap = {
        // Letters (lowercase)
        a: "KC_A", b: "KC_B", c: "KC_C", d: "KC_D", e: "KC_E",
        f: "KC_F", g: "KC_G", h: "KC_H", i: "KC_I", j: "KC_J",
        k: "KC_K", l: "KC_L", m: "KC_M", n: "KC_N", o: "KC_O",
        p: "KC_P", q: "KC_Q", r: "KC_R", s: "KC_S", t: "KC_T",
        u: "KC_U", v: "KC_V", w: "KC_W", x: "KC_X", y: "KC_Y",
        z: "KC_Z",
        // Numbers
        0: "KC_0", 1: "KC_1", 2: "KC_2", 3: "KC_3", 4: "KC_4",
        5: "KC_5", 6: "KC_6", 7: "KC_7", 8: "KC_8", 9: "KC_9",
        // Special characters (unshifted)
        ";": "KC_SCLN", ",": "KC_COMM", ".": "KC_DOT", "/": "KC_SLSH",
        "'": "KC_QUOT", "[": "KC_LBRC", "]": "KC_RBRC", "\\": "KC_BSLS",
        "-": "KC_MINS", "=": "KC_EQL", "`": "KC_GRV",
        // Shifted symbols
        "!": "S(KC_1)", "@": "S(KC_2)", "#": "S(KC_3)", "$": "S(KC_4)",
        "%": "S(KC_5)", "^": "S(KC_6)", "&": "S(KC_7)", "*": "S(KC_8)",
        "(": "S(KC_9)", ")": "S(KC_0)", "_": "S(KC_MINS)", "+": "S(KC_EQL)",
        "{": "S(KC_LBRC)", "}": "S(KC_RBRC)", "|": "S(KC_BSLS)", ":": "S(KC_SCLN)",
        '"': "S(KC_QUOT)", "<": "S(KC_COMM)", ">": "S(KC_DOT)", "?": "S(KC_SLSH)",
        "~": "S(KC_GRV)",
        // Named keys - Basic
        TAB: "KC_TAB", ENT: "KC_ENT", ESC: "KC_ESC", SPC: "KC_SPC",
        BSP: "KC_BSPC", BSPC: "KC_BSPC", DEL: "KC_DEL", INS: "KC_INS",
        BSLS: "KC_BSLS", GRV: "KC_GRV",
        // Named keys - Modifiers
        LSFT: "KC_LSFT", RSFT: "KC_RSFT",
        LCTL: "KC_LCTL", RCTL: "KC_RCTL",
        LALT: "KC_LALT", RALT: "KC_RALT",
        LGUI: "KC_LGUI", RGUI: "KC_RGUI",
        // Named keys - Navigation
        HOME: "KC_HOME", END: "KC_END",
        PGUP: "KC_PGUP", PGDN: "KC_PGDN", PGDOWN: "KC_PGDN",
        UP: "KC_UP", DOWN: "KC_DOWN", LEFT: "KC_LEFT", RIGHT: "KC_RIGHT",
        // Named keys - Function/Special
        CAPS: "KC_CAPS", NUM: "KC_NUM", APP: "KC_APP",
        PSCR: "KC_PSCR", SLCK: "KC_SCRL", PAUS: "KC_PAUS",
        // Named keys - Encoders (mapped to ctrl for rotation fallback)
        ENCL: "KC_LCTL", ENCR: "KC_RCTL",
        // Named keys - Aliases
        C_QUOT: "KC_QUOT", SENT: "KC_ENT",
        // Space
        " ": "KC_SPC",
        // Layer keys (QMK layer tap and momentary)
        L1: "MO(1)",
        L2_ESC: "LT(2, KC_ESC)",
        L3_D: "LT(3, KC_D)",
        L4_S: "LT(4, KC_SPC)",
        L5_F: "LT(5, KC_F)",
        GUI_DEL: "LGUI_T(KC_DEL)",
        // Kyria-specific (placeholders)
        WIR: "KC_TRNS",
        OPR: "KC_TRNS",
        // Ctrl + key combinations
        C_LEFT: "C(KC_LEFT)",
        C_RIGHT: "C(KC_RIGHT)",
    };
    if (keyDefines[key]) {
        keyDefinesUsed[key] = true;
        return `D_${key}`;
    }

    return keyMap[key] || unknownKey;
}
