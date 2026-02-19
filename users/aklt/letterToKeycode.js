export const letterToKeycode = {
  // Letters (single lowercase)
  a: 'KC_A',
  b: 'KC_B',
  c: 'KC_C',
  d: 'KC_D',
  e: 'KC_E',
  f: 'KC_F',
  g: 'KC_G',
  h: 'KC_H',
  i: 'KC_I',
  j: 'KC_J',
  k: 'KC_K',
  l: 'KC_L',
  m: 'KC_M',
  n: 'KC_N',
  o: 'KC_O',
  p: 'KC_P',
  q: 'KC_Q',
  r: 'KC_R',
  s: 'KC_S',
  t: 'KC_T',
  u: 'KC_U',
  v: 'KC_V',
  w: 'KC_W',
  x: 'KC_X',
  y: 'KC_Y',
  z: 'KC_Z',

  // Numbers (single digit)
  1: 'KC_1',
  2: 'KC_2',
  3: 'KC_3',
  4: 'KC_4',
  5: 'KC_5',
  6: 'KC_6',
  7: 'KC_7',
  8: 'KC_8',
  9: 'KC_9',
  0: 'KC_0',

  // Common keys (short forms)
  ENT: 'KC_ENTER',
  ESC: 'KC_ESCAPE',
  BSPC: 'KC_BACKSPACE',
  TAB: 'KC_TAB',
  SPC: 'KC_SPACE',
  '-': 'KC_MINUS',
  '=': 'KC_EQUAL',
  '[': 'KC_LEFT_BRACKET',
  ']': 'KC_RIGHT_BRACKET',
  '\\': 'KC_BACKSLASH',
  '#': 'KC_NONUS_HASH',
  ';': 'KC_SCLN',
  "'": 'KC_QUOTE',
  '`': 'KC_GRAVE',
  ',': 'KC_COMMA',
  '.': 'KC_DOT',
  '/': 'KC_SLASH',
  CAPS: 'KC_CAPS_LOCK',
  LSFT: 'KC_LEFT_SHIFT',
  LCTL: 'KC_LCTL',
  LALT: 'KC_LEFT_ALT',
  LGUI: 'KC_LEFT_GUI',
  RSFT: 'KC_RIGHT_SHIFT',
  RCTL: 'KC_RCTL',
  RALT: 'KC_RIGHT_ALT',
  RGUI: 'KC_RIGHT_GUI',
  BSP: 'KC_BACKSPACE',
  BSLS: 'KC_BACKSLASH',
  GRV: 'KC_GRAVE',
  MINS: 'KC_MINUS',
  EQL: 'KC_EQUAL',
  LBRC: 'KC_LEFT_BRACKET',
  RBRC: 'KC_RIGHT_BRACKET',
  SCLN: 'KC_SCLN',
  QUOT: 'KC_QUOTE',
  COMM: 'KC_COMMA',
  DOT: 'KC_DOT',
  SLSH: 'KC_SLASH',
  NUM: 'KC_NUM_LOCK',

  // Function keys
  F1: 'KC_F1',
  F2: 'KC_F2',
  F3: 'KC_F3',
  F4: 'KC_F4',
  F5: 'KC_F5',
  F6: 'KC_F6',
  F7: 'KC_F7',
  F8: 'KC_F8',
  F9: 'KC_F9',
  F10: 'KC_F10',
  F11: 'KC_F11',
  F12: 'KC_F12',
  F13: 'KC_F13',
  F14: 'KC_F14',
  F15: 'KC_F15',
  F16: 'KC_F16',
  F17: 'KC_F17',
  F18: 'KC_F18',
  F19: 'KC_F19',
  F20: 'KC_F20',
  F21: 'KC_F21',
  F22: 'KC_F22',
  F23: 'KC_F23',
  F24: 'KC_F24',

  // Navigation
  PSCR: 'KC_PRINT_SCREEN',
  SCRL: 'KC_SCROLL_LOCK',
  PAUS: 'KC_PAUSE',
  INS: 'KC_INSERT',
  HOME: 'KC_HOME',
  PGUP: 'KC_PAGE_UP',
  DEL: 'KC_DELETE',
  END: 'KC_END',
  PGDN: 'KC_PAGE_DOWN',
  RGHT: 'KC_RIGHT',
  LEFT: 'KC_LEFT',
  DOWN: 'KC_DOWN',
  UP: 'KC_UP',

  // Numpad
  NLCK: 'KC_NUM_LOCK',
  P_SL: 'KC_KP_SLASH',
  P_AS: 'KC_KP_ASTERISK',
  P_MI: 'KC_KP_MINUS',
  P_PL: 'KC_KP_PLUS',
  P_EN: 'KC_KP_ENTER',
  P1: 'KC_KP_1',
  P2: 'KC_KP_2',
  P3: 'KC_KP_3',
  P4: 'KC_KP_4',
  P5: 'KC_KP_5',
  P6: 'KC_KP_6',
  P7: 'KC_KP_7',
  P8: 'KC_KP_8',
  P9: 'KC_KP_9',
  P0: 'KC_KP_0',
  P_DT: 'KC_KP_DOT',
  P_EQ: 'KC_KP_EQUAL',
  P_CM: 'KC_KP_COMMA',

  // Special
  NO: 'KC_NO',
  TRNS: 'KC_TRANSPARENT',
  NUBS: 'KC_NONUS_BACKSLASH',
  APP: 'KC_APP',
  PWR: 'KC_KB_POWER',
  EXEC: 'KC_EXECUTE',
  HELP: 'KC_HELP',
  MENU: 'KC_MENU',
  SLCT: 'KC_SELECT',
  STOP: 'KC_STOP',
  AGIN: 'KC_AGAIN',
  UNDO: 'KC_UNDO',
  CUT: 'KC_CUT',
  COPY: 'KC_COPY',
  PSTE: 'KC_PASTE',
  FIND: 'KC_FIND',
  MUTE: 'KC_KB_MUTE',
  VOLU: 'KC_KB_VOLUME_UP',
  VOLD: 'KC_KB_VOLUME_DOWN',

  // Locking
  LCAP: 'KC_LOCKING_CAPS_LOCK',
  LNUM: 'KC_LOCKING_NUM_LOCK',
  LSCR: 'KC_LOCKING_SCROLL_LOCK',

  // Aliases
  KP_EQ_AS400: 'KC_KP_EQUAL_AS400',

  // Shifted letters (uppercase)
  A: 'S(KC_A)',
  B: 'S(KC_B)',
  C: 'S(KC_C)',
  D: 'S(KC_D)',
  E: 'S(KC_E)',
  F: 'S(KC_F)',
  G: 'S(KC_G)',
  H: 'S(KC_H)',
  I: 'S(KC_I)',
  J: 'S(KC_J)',
  K: 'S(KC_K)',
  L: 'S(KC_L)',
  M: 'S(KC_M)',
  N: 'S(KC_N)',
  O: 'S(KC_O)',
  P: 'S(KC_P)',
  Q: 'S(KC_Q)',
  R: 'S(KC_R)',
  S: 'S(KC_S)',
  T: 'S(KC_T)',
  U: 'S(KC_U)',
  V: 'S(KC_V)',
  W: 'S(KC_W)',
  X: 'S(KC_X)',
  Y: 'S(KC_Y)',
  Z: 'S(KC_Z)',

  // Shifted number symbols
  '!': 'KC_EXLM',
  '@': 'KC_AT',
  '£': 'S(KC_3)',
  '$': 'KC_DLR',
  '%': 'KC_PERC',
  '^': 'KC_CIRC',
  '&': 'KC_AMPR',
  '*': 'KC_ASTR',
  '(': 'KC_LPRN',
  ')': 'KC_RPRN',

  // Shifted punctuation
  '_': 'KC_UNDS',
  '+': 'KC_PLUS',
  '{': 'KC_LCBR',
  '}': 'KC_RCBR',
  '|': 'KC_PIPE',
  ':': 'KC_COLN',
  '"': 'KC_DQUO',
  '~': 'KC_TILD',
  '<': 'KC_LT',
  '>': 'KC_GT',
  '?': 'KC_QUES',

  // Simple name aliases
  enter: 'KC_ENTER',
  esc: 'KC_ESCAPE',
  escape: 'KC_ESCAPE',
  backspace: 'KC_BACKSPACE',
  bksp: 'KC_BACKSPACE',
  tab: 'KC_TAB',
  space: 'KC_SPACE',
  caps: 'KC_CAPS_LOCK',
  capslock: 'KC_CAPS_LOCK',

  // Navigation aliases
  printscreen: 'KC_PRINT_SCREEN',
  prtsc: 'KC_PRINT_SCREEN',
  scrolllock: 'KC_SCROLL_LOCK',
  pause: 'KC_PAUSE',
  insert: 'KC_INSERT',
  ins: 'KC_INSERT',
  home: 'KC_HOME',
  pageup: 'KC_PAGE_UP',
  pgup: 'KC_PAGE_UP',
  delete: 'KC_DELETE',
  del: 'KC_DELETE',
  end: 'KC_END',
  pagedown: 'KC_PAGE_DOWN',
  pgdown: 'KC_PAGE_DOWN',
  pgdn: 'KC_PAGE_DOWN',
  right: 'KC_RIGHT',
  left: 'KC_LEFT',
  down: 'KC_DOWN',
  up: 'KC_UP',

  // Numpad aliases
  numlock: 'KC_NUM_LOCK',

  // Special aliases
  app: 'KC_APP',
  menu: 'KC_MENU',
  power: 'KC_KB_POWER',
  execute: 'KC_EXECUTE',
  help: 'KC_HELP',
  select: 'KC_SELECT',
  stop: 'KC_STOP',
  again: 'KC_AGAIN',
  undo: 'KC_UNDO',
  cut: 'KC_CUT',
  copy: 'KC_COPY',
  paste: 'KC_PASTE',
  find: 'KC_FIND',
  mute: 'KC_KB_MUTE',
  volup: 'KC_KB_VOLUME_UP',
  voldown: 'KC_KB_VOLUME_DOWN',

  // Named key aliases (from keyToQmkCodeOrDefine)
  PGDOWN: 'KC_PGDN',
  SLCK: 'KC_SCRL',
  EL: 'KC_MUTE',
  ER: 'KC_TAB',
  C_QUOT: 'KC_QUOT',
  SENT: 'KC_ENT',
  SPACE: 'KC_SPC',
  ' ': 'KC_SPC',

  // Layer taps
  L1: 'D_L1',
  L2: 'D_L2',
  L3: 'D_L3',
  L4: 'D_L4',
  L5: 'D_L5',
  GUI_DEL: 'GUI_DEL',
  RCTL_QUOT: 'RCTL_T(KC_QUOT)',
  SC_SENT: 'SC_SENT',

  // Default layer switches
  DF_QWER: 'DF_QWER',
  DF_COLE: 'DF_COLE',
  DF_GAME: 'DF_GAME',

  // Toggle layers
  TG_FN: 'CK_FKEY',
  TG_NKEY: 'CK_NKEY',
  TG_MOUS: 'CK_MOUS',

  // Custom keycodes
  CK_REST: 'CK_REST',
  CK_COLO: 'CK_COLO',
  CK_FLAS: 'CK_FLAS',
  CK_CONS: 'CK_CONS',
  CK_LINT: 'CK_LINT',
  CK_CAPS: 'CK_CAPS',
  SH_TOGG: 'SH_TOGG',

  // Numpad operators
  'P+': 'KC_PPLS',
  'P-': 'KC_PMNS',
  'P*': 'KC_PAST',
  'P/': 'KC_PSLS',
  'P.': 'KC_PDOT',
  'P,': 'KC_PCMM',
  'P=': 'KC_PEQL',
  PENT: 'KC_PENT',

  // Mouse keys
  BTN1: 'MS_BTN1',
  BTN2: 'MS_BTN2',
  MS_L: 'MS_LEFT',
  MS_R: 'MS_RGHT',
  MS_U: 'MS_UP',
  MS_D: 'MS_DOWN',
  WHLU: 'MS_WHLU',
  WHLD: 'MS_WHLD',
  ACL0: 'MS_ACL0',
  ACL2: 'MS_ACL2',

  // Ctrl + key combinations
  C_X: 'C(KC_X)',
  C_C: 'C(KC_C)',
  C_V: 'C(KC_V)',
  C_Z: 'C(KC_Z)',
  C_LEFT: 'C(KC_LEFT)',
  C_RIGHT: 'C(KC_RIGHT)',

  // RGB/Underglow controls
  RM_TOGG: 'RM_TOGG',
  RM_NEXT: 'RM_NEXT',
  RM_PREV: 'RM_PREV',
  RM_HUEU: 'RM_HUEU',
  RM_HUED: 'RM_HUED',
  RM_SATU: 'RM_SATU',
  RM_SATD: 'RM_SATD',
  RM_VALU: 'RM_VALU',
  RM_VALD: 'RM_VALD',
  UG_TOGG: 'UG_TOGG',
  UG_NEXT: 'UG_NEXT',
  UG_PREV: 'UG_PREV',
  UG_HUEU: 'UG_HUEU',
  UG_HUED: 'UG_HUED',

  // Backlight controls
  BL_TOGG: 'BL_TOGG',
  BL_STEP: 'BL_STEP',
  BL_UP: 'BL_UP',
  BL_DOWN: 'BL_DOWN',
  BL_BRTG: 'BL_BRTG',

  // Unicode
  AA: 'DA_AA',
  AE: 'DA_AE',
  OE: 'DA_OE',
  CAT: 'UM(CAT)',
  SMILE: 'UM(SMILE)',
  UPSIDE: 'UM(UPSIDE)',
  UC_PRV: 'UC_PREV',
  UC_NXT: 'UC_NEXT',
  UC_WIN: 'UC_WIN',

  // System/Debug
  DB_TOGG: 'DB_TOGG',
  QK_BOOT: 'QK_BOOT',
  EE_CLR: 'EE_CLR',

  LEFT: "KC_LEFT",
  RIGHT: "KC_RIGHT",
  C_LEFT: "C(KC_LEFT)",
  C_RIGHT: "C(KC_RIGHT)",

  // Layer operations
  'TG(0)': 'TG(0)',
  'TG(1)': 'TG(1)',
  'TG(2)': 'TG(2)',
  'TG(3)': 'TG(3)',
  'TG(4)': 'TG(4)',
  'TG(5)': 'TG(5)',
  'TO(0)': 'TO(0)',
  'DF(0)': 'DF(0)',

  // Kyria-specific placeholders
  WIR: 'KC_TRNS',
  OPR: 'KC_TRNS',
};

const keycodeToLetter = Object.fromEntries(
  Object.entries(letterToKeycode).map(([k, v]) => [v, k])
);

export function toKeycode(letter) {
    // Handle transparent and blocked keys
    if (letter === "___" || letter === "TRANS" || letter === "TRNS") {
        return "_______";
    }
    if (letter === "XXX" || letter === "NO") {
        return "XXXXXXX";
    }
  const code = letterToKeycode[letter];
  if (!code) {
    throw new Error(`Unknown letter: ${letter}`);
  }
  return code;
}

export function toLetter(keycode) {
  return keycodeToLetter[keycode];
}
