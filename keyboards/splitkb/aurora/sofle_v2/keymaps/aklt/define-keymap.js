
// Generate a QMK keymap using a template and definitions for keys

// Keys on the Sweep and Sofle keyboards: kXX
// Keys only on the Sofle v2 keyboard: sXX

const keymapTemplate = `
s00, s01, s02, s03, s04, s05,           s06, s07, s08, s09, s10, s11,
s12, k00, k01, k02, k03, k04,           k05, k06, k07, k08, k09, s13,
s14, k10, k11, k12, k13, k14,           k15, k16, k17, k18, k19, s15,
s16, k20, k21, k22, k23, k24, s17, s18, k25, k26, k27, k28, k29, s19,
          s20, s21, s22, k30, k31, k32, k33, s23, s24, s25
`;

const transTemplate = `
___, ___, ___, ___, ___, ___,           ___, ___, ___, ___, ___, ___,
___, ___, ___, ___, ___, ___,           ___, ___, ___, ___, ___, ___,
___, ___, ___, ___, ___, ___,           ___, ___, ___, ___, ___, ___,
___, ___, ___, ___, ___, ___, ___, ___, ___, ___, ___, ___, ___, ___,
          ___, ___, ___, ___, ___, ___, ___, ___, ___, ___
`;

const qwertyKeymap = `
q w e r t           y u i o p
a s d f g           h j k l ;
z x c v b           n m , . /
`;

const colemakDHKeymap = `
q w f p g           j l u y ;
a r s t d           h n e i o
z x c v b           k m , . /
`;

const fullKeyboard = `
esc       f1   f2   f3   f4     f5   f6   f7   f8     f9   f10  f11  f12       pscr slck pause

\`     1    2    3    4    5    6    7    8    9    0    -    =    bspc        ins  home pgup      nlck /    *    -
tab   q    w    e    r    t    y    u    i    o    p    [    ]    \\           del  end  pgdn      7    8    9    +
caps  a    s    d    f    g    h    j    k    l    ;    '    entr                                 4    5    6
lsft  z    x    c    v    b    n    m    ,    .    /    rsft                        up            1    2    3    entr
lctl  lgui lalt           spc                 ralt rgui menu rctl                left down rght   0         .
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
