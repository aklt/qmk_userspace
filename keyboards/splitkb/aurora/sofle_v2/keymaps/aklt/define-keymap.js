// TODO letterToKeycode and vice versa
// TODO define combos

// Generate a QMK keymap using a template and definitions for keys

// Keys
// SXX: Sofle only
// KXX: Kyria only
// aXX: Sofle + Kyria
// bXX: Sofle + Kyria + Sweep
import { toKeycode } from './letterToKeycode.js';

const keymapTemplate = `
S00 S01 S02 S03 S04 S05                 S06 S07 S08 S09 S10 S11
a12 b13 b14 b15 b16 b17                 b18 b19 b20 b21 b22 a23
a24 b25 b26 b27 b28 b29                 b30 b31 b32 b33 b34 a35
a36 b37 b38 b39 b40 b41 a42 K43 K44 a45 b46 b47 b48 b49 b50 a51
        a52 a53 a54 b55 b56         b57 b58 a59 a60 a61
`;

const transTemplate = `
___ ___ ___ ___ ___ ___                 ___ ___ ___ ___ ___ ___
___ ___ ___ ___ ___ ___                 ___ ___ ___ ___ ___ ___
___ ___ ___ ___ ___ ___                 ___ ___ ___ ___ ___ ___
___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___
        ___ ___ ___ ___ ___         ___ ___ ___ ___ ___
`;

const define = {
    layers: {
      qwerty: {
        left: `
q w e r t
a s d f g
z x c v b
`,
        right: `
y u i o p
h j k l ;
n m , . /
`
    },
      fKeys: {
          row: `F1 F2 F3 F4 F5 F6 F7 F8 F9 F10`,
          combos: {
              F11: ['F4', 'F5'],
              F12: ['F6', 'F7'],
          }
      },
      numbers: '1 2 3 4 5 6 7 8 9 0'
    },
    combos: {
        // Left
        qw: 'KC_ESC',
        as: 'KC_SHIFT',
        zx: 'KC_DEL',
        we: 'KC_TAB',
        sd: '|',
        xc: 'KC_LCTL',
        er: 'KC_LALT',
        rt: 'KC_SPC',
        fg: 'KC_SPC',
        vb: 'KC_SPC',
        // Right
        yu: '+',
        hj: '-',
        nm: '*',
        ui: '[',
        jk: '(',
        'm,': '{',
        io: ']',
        kl: ')',
        ',.': '}',
        op: 'KC_BSPC',
        'l;': 'KC_ENT',
        './': 'KC_RSFT',
        // vertical
        ik: 'pgup',
        'k,': 'pgdn',
        jm: 'home',
        'l.': 'end',
        uj: 'ins',
        ol: 'del',
    }
};

function defineCombos(comboDefinitions) {
    const enumDef = [];
    const comboDefs = [];
    const combos = [];
    Object.entries(comboDefinitions).forEach(([comboKeys, resultKey], i) => {
        const enumName = `COMBO_${i}_${comboKeys.toUpperCase().replace(/\W/g, '_')}`;
        const ksKeys = comboKeys.split('').map(k => toKeycode(k)).join(', ');
        const definition = `const uint16_t PROGMEM def${enumName}[] = { ${ksKeys}, COMBO_END };`;
        const comboDef = `  [${enumName}] = COMBO(def${enumName}, ${toKeycode(resultKey)})`;
        enumDef.push(enumName);
        comboDefs.push(definition);
        combos.push(comboDef);
    });
    return `enum combos {
    ${enumDef.join(',\n    ')}
};
${comboDefs.join('\n')}
combo_t key_combos[] = {
    ${combos.join(',\n    ')}
};
`;
}

console.log(defineCombos(define.combos));

const colemakDHKeymap = `
q w f p g           j l u y ;
a r s t d           h n e i o
z x c v b           k m , . /
`;

const numbers = '1 2 3 4 5 6 7 8 9 0';
const symbols = `- = [ ] \\ ; ' , . / \``


const keysTemplate = `
esc  1   2    3    4   5             6   7   8    9    0    bsp
tab  q   w    e    r   t             y   u   i    o    p    \\
shl  a   s    d    f   g             h   j   k    l    ;    entr
ctl  z   x    c    v   b             n   m   ,    .    /    ctr
         opl  wil  l1  l2  spc rgui  r2  r1  wir  opr
`;

const horizontalCombosTemplate = `
k00-k01 k01-k02 k02-k03 k03-k04         k05-k06 k06-k07 k07-k08 k08-k09
k10-k11 k11-k12 k12-k13 k13-k14         k15-k16 k16-k17 k17-k18 k18-k19
k20-k21 k21-k22 k22-k23 k23-k24         k25-k26 k26-k27 k27-k28 k28-k29
                        k30-k31 k31-k32 k32-k33
`

const combos = {
    'k00-k01': 'KC_ESC',
};

function templateReplaceKeys(template, newKeys = {}, defaultKey = 'KC_TRNS') {
    const lines = template.trim().split('\n')
    const keys = lines.map(line => line.trim().split(/\b/));
    const replacedKeys = keys.map(row =>
        row.map(key => {
            const trimmedKey = key.trim();
            if (trimmedKey === '') {
                return key;
            }
            return newKeys[trimmedKey] || defaultKey;
        })
    );
    return replacedKeys.map(row => row.join('')).join('\n');
}

// console.log(templateReplaceKeys(keymapTemplate))

// console.log(keymapTemplate);

const fullKeyboard = `
esc   f1   f2   f3   f4     f5   f6   f7   f8     f9   f10  f11  f12          pscr slck pause

\`    1    2    3    4    5    6    7    8    9    0    -    =    bspc        ins  home pgup      nlck  k/   k*  k-
tab   q    w    e    r    t    y    u    i    o    p    [    ]    \\          del  end  pgdn      k7    k8   k9  k+
caps  a    s    d    f    g    h    j    k    l    ;    '    entr                                 k4    k5   k6
lsft  z    x    c    v    b    n    m    ,    .    /    rsft                        up            k1    k2   k3  kentr
lctl  lgui lalt           spc                 ralt rgui menu rctl             left down rght      k0         k.
`;

// Additional key mappings for fullKeyboard that aren't basic alphanumeric/punctuation
const othersToQmkCode = {
  // Function keys
  'f1': 'KC_F1', 'f2': 'KC_F2', 'f3': 'KC_F3', 'f4': 'KC_F4',
  'f5': 'KC_F5', 'f6': 'KC_F6', 'f7': 'KC_F7', 'f8': 'KC_F8',
  'f9': 'KC_F9', 'f10': 'KC_F10', 'f11': 'KC_F11', 'f12': 'KC_F12',
  // Modifiers
  'lctl': 'KC_LCTL', 'lsft': 'KC_LSFT', 'lalt': 'KC_LALT', 'lgui': 'KC_LGUI',
  'rctl': 'KC_RCTL', 'rsft': 'KC_RSFT', 'ralt': 'KC_RALT', 'rgui': 'KC_RGUI',
  // Navigation and editing
  'esc': 'KC_ESC', 'tab': 'KC_TAB', 'caps': 'KC_CAPS', 'entr': 'KC_ENT',
  'bspc': 'KC_BSPC', 'spc': 'KC_SPC', 'menu': 'KC_APP',
  'ins': 'KC_INS', 'del': 'KC_DEL', 'home': 'KC_HOME', 'end': 'KC_END',
  'pgup': 'KC_PGUP', 'pgdn': 'KC_PGDN',
  // Arrow keys
  'up': 'KC_UP', 'down': 'KC_DOWN', 'left': 'KC_LEFT', 'rght': 'KC_RGHT',
  // Special function keys
  'pscr': 'KC_PSCR', 'slck': 'KC_SCRL', 'pause': 'KC_PAUS',
  'nlck': 'KC_NUM',
  // Numpad operators
  '*': 'KC_PAST', '+': 'KC_PPLS'
};

// Map key names to QMK keycodes
function keyToQmkCode(key, unknownKey = 'KC_TRNS') {
  if (key === 'SPACE') {
      key = ' ';
  }
  const keyMap = {
    // Letters
    'a': 'KC_A', 'b': 'KC_B', 'c': 'KC_C', 'd': 'KC_D', 'e': 'KC_E',
    'f': 'KC_F', 'g': 'KC_G', 'h': 'KC_H', 'i': 'KC_I', 'j': 'KC_J',
    'k': 'KC_K', 'l': 'KC_L', 'm': 'KC_M', 'n': 'KC_N', 'o': 'KC_O',
    'p': 'KC_P', 'q': 'KC_Q', 'r': 'KC_R', 's': 'KC_S', 't': 'KC_T',
    'u': 'KC_U', 'v': 'KC_V', 'w': 'KC_W', 'x': 'KC_X', 'y': 'KC_Y',
    'z': 'KC_Z',
    // Numbers
    '0': 'KC_0', '1': 'KC_1', '2': 'KC_2', '3': 'KC_3', '4': 'KC_4',
    '5': 'KC_5', '6': 'KC_6', '7': 'KC_7', '8': 'KC_8', '9': 'KC_9',
    // Special characters
    ';': 'KC_SCLN', ',': 'KC_COMM', '.': 'KC_DOT', '/': 'KC_SLSH',
    "'": 'KC_QUOT', '[': 'KC_LBRC', ']': 'KC_RBRC', '\\': 'KC_BSLS',
    '-': 'KC_MINS', '=': 'KC_EQL', '`': 'KC_GRV',
    // Space
    ' ': 'KC_SPC'
  };

  return keyMap[key] || unknownKey;
}
