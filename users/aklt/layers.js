// Define layers for Sofle keyboard
// First column is the template key name, second is the key
// Following columns are overrides for a specific keyboard
//
// Key naming convention:
//   s## = sofle-specific (outer edge)
//   e## = edge keys
//   f## = finger keys (main typing area)
//   k## = extra keys
//
// Sofle Layout (58 keys + 2 encoders):
// Row 0:  s00 s01 s02 s03 s04 s05          s06 s07 s08 s09 s10 s11
// Row 1:  e12 f13 f14 f15 f16 f17          f18 f19 f20 f21 f22 e23
// Row 2:  e24 f25 f26 f27 f28 f29          f30 f31 f32 f33 f34 e35
// Row 3:  e36 f37 f38 f39 f40 f41 EL  ER   f42 f43 f44 f45 f46 e47
// Row 4:      t48 t49 t50 t51 t52          t53 t54 t55 t56 t57

const layers = {
    // Layer 0: BASE_SOFLE - Base layer with all modifiers and layer taps
    base_sofle: `
   s00  GRV
   s01  1
   s02  2
   s03  3
   s04  4
   s05  5
   s06  6
   s07  7
   s08  8
   s09  9
   s10  0
   s11  BSPC

   e12  TAB
   f13  Q
   f14  W
   f15  E
   f16  R
   f17  T
   f18  Y
   f19  U
   f20  I
   f21  O
   f22  P
   e23  BSLS

   e24  LSFT
   f25  A
   f26  S
   f27  D
   f28  F
   f29  G
   f30  H
   f31  J
   f32  K
   f33  L
   f34  ;
   e35  SC_SENT

   e36  LCTL
   f37  Z
   f38  X
   f39  C
   f40  V
   f41  B
   EL   MUTE
   ER   TAB
   f42  N
   f43  M
   f44  ,
   f45  .
   f46  /
   e47  RCTL_QUOT

   t48  LGUI
   t49  L3_DEL
   t50  L2_ESC
   t51  LALT
   t52  L1_ENT
   t53  L4_SPC
   t54  GUI_DEL
   t55  L5_TAB
   t56  APP
   t57  RGUI
`,

    // Layer 1: BASE_QWERTY - Transparent QWERTY overlay
    base_qwerty: `
   s00  ___
   s01  ___
   s02  ___
   s03  ___
   s04  ___
   s05  ___
   s06  ___
   s07  ___
   s08  ___
   s09  ___
   s10  ___
   s11  ___

   e12  ___
   f13  Q
   f14  W
   f15  E
   f16  R
   f17  T
   f18  Y
   f19  U
   f20  I
   f21  O
   f22  P
   e23  ___

   e24  ___
   f25  A
   f26  S
   f27  D
   f28  F
   f29  G
   f30  H
   f31  J
   f32  K
   f33  L
   f34  ;
   e35  ___

   e36  ___
   f37  Z
   f38  X
   f39  C
   f40  V
   f41  B
   EL   ___
   ER   ___
   f42  N
   f43  M
   f44  ,
   f45  .
   f46  /
   e47  ___

   t48  ___
   t49  ___
   t50  ___
   t51  ___
   t52  ___
   t53  ___
   t54  ___
   t55  ___
   t56  ___
   t57  ___
`,

    // Layer 2: BASE_COLEMAK_DH - Colemak-DH layout overlay
    base_colemak_dh: `
   s00  ___
   s01  ___
   s02  ___
   s03  ___
   s04  ___
   s05  ___
   s06  ___
   s07  ___
   s08  ___
   s09  ___
   s10  ___
   s11  ___

   e12  ___
   f13  Q
   f14  W
   f15  F
   f16  P
   f17  B
   f18  J
   f19  L
   f20  U
   f21  Y
   f22  ;
   e23  ___

   e24  ___
   f25  A
   f26  R
   f27  S
   f28  T
   f29  G
   f30  M
   f31  N
   f32  E
   f33  I
   f34  O
   e35  ___

   e36  ___
   f37  Z
   f38  X
   f39  C
   f40  D
   f41  V
   EL   ___
   ER   ___
   f42  K
   f43  H
   f44  ,
   f45  .
   f46  /
   e47  ___

   t48  ___
   t49  ___
   t50  ___
   t51  ___
   t52  ___
   t53  ___
   t54  ___
   t55  ___
   t56  ___
   t57  ___
`,

    // Layer 3: BASE_GAMING - Gaming layer (left hand optimized)
    base_gaming: `
   s00  ESC
   s01  1
   s02  2
   s03  3
   s04  4
   s05  E
   s06  XXX
   s07  XXX
   s08  XXX
   s09  XXX
   s10  XXX
   s11  XXX

   e12  TAB
   f13  Q
   f14  C
   f15  W
   f16  F
   f17  T
   f18  XXX
   f19  XXX
   f20  XXX
   f21  XXX
   f22  XXX
   e23  XXX

   e24  LSFT
   f25  R
   f26  A
   f27  S
   f28  D
   f29  G
   f30  XXX
   f31  XXX
   f32  XXX
   f33  XXX
   f34  XXX
   e35  XXX

   e36  LCTL
   f37  Y
   f38  Z
   f39  X
   f40  V
   f41  B
   EL   ___
   ER   ___
   f42  XXX
   f43  XXX
   f44  XXX
   f45  XXX
   f46  XXX
   e47  XXX

   t48  ___
   t49  ___
   t50  ___
   t51  TAB
   t52  SPC
   t53  ___
   t54  ___
   t55  ___
   t56  ___
   t57  ___
`,

    // Layer 4: OVERLAY_NUMPAD - Numpad overlay
    overlay_numpad: `
   s00  CK_COLO
   s01  ___
   s02  ___
   s03  ___
   s04  ___
   s05  ___
   s06  CK_COLO
   s07  P=
   s08  P/
   s09  P*
   s10  XXX
   s11  BSPC

   e12  ___
   f13  ___
   f14  ___
   f15  ___
   f16  ___
   f17  ___
   f18  XXX
   f19  P7
   f20  P8
   f21  P9
   f22  XXX
   e23  P-

   e24  ___
   f25  ___
   f26  ___
   f27  ___
   f28  ___
   f29  ___
   f30  XXX
   f31  P4
   f32  P5
   f33  P6
   f34  PENT
   e35  P+

   e36  ___
   f37  ___
   f38  ___
   f39  ___
   f40  ___
   f41  ___
   EL   ___
   ER   ___
   f42  XXX
   f43  P1
   f44  P2
   f45  P3
   f46  PENT
   e47  P,

   t48  ___
   t49  ___
   t50  ___
   t51  ___
   t52  ___
   t53  XXX
   t54  P0
   t55  P.
   t56  PENT
   t57  ___
`,

    // Layer 5: OVERLAY_NUM - Number row overlay
    overlay_num: `
   s00  ___
   s01  1
   s02  2
   s03  3
   s04  4
   s05  5
   s06  6
   s07  7
   s08  8
   s09  9
   s10  0
   s11  ___

   e12  ___
   f13  ___
   f14  ___
   f15  ___
   f16  ___
   f17  ___
   f18  ___
   f19  ___
   f20  ___
   f21  ___
   f22  ___
   e23  ___

   e24  ___
   f25  ___
   f26  ___
   f27  ___
   f28  ___
   f29  ___
   f30  ___
   f31  ___
   f32  ___
   f33  ___
   f34  ___
   e35  ___

   e36  ___
   f37  ___
   f38  ___
   f39  ___
   f40  ___
   f41  ___
   EL   ___
   ER   ___
   f42  ___
   f43  ___
   f44  ___
   f45  ___
   f46  ___
   e47  ___

   t48  ___
   t49  ___
   t50  ___
   t51  ___
   t52  ___
   t53  ___
   t54  ___
   t55  ___
   t56  ___
   t57  ___
`,

    // Layer 6: OVERLAY_FN - Function keys overlay
    overlay_fn: `
   s00  ___
   s01  F1
   s02  F2
   s03  F3
   s04  F4
   s05  F5
   s06  F6
   s07  F7
   s08  F8
   s09  F9
   s10  F10
   s11  ___

   e12  ___
   f13  ___
   f14  ___
   f15  ___
   f16  ___
   f17  F11
   f18  F12
   f19  ___
   f20  ___
   f21  ___
   f22  ___
   e23  ___

   e24  ___
   f25  ___
   f26  ___
   f27  ___
   f28  ___
   f29  ___
   f30  ___
   f31  ___
   f32  ___
   f33  ___
   f34  ___
   e35  ___

   e36  ___
   f37  ___
   f38  ___
   f39  ___
   f40  ___
   f41  ___
   EL   ___
   ER   ___
   f42  ___
   f43  ___
   f44  ___
   f45  ___
   f46  ___
   e47  ___

   t48  ___
   t49  ___
   t50  ___
   t51  ___
   t52  ___
   t53  ___
   t54  ___
   t55  ___
   t56  ___
   t57  ___
`,

    // Layer 7: OVERLAY_MOUSE - Mouse keys overlay
    overlay_mouse: `
   s00  ___
   s01  ___
   s02  ___
   s03  ___
   s04  ___
   s05  ___
   s06  ___
   s07  ___
   s08  ___
   s09  ___
   s10  ___
   s11  ___

   e12  ___
   f13  ___
   f14  ___
   f15  ___
   f16  ___
   f17  ___
   f18  BTN1
   f19  WHLD
   f20  WHLU
   f21  BTN2
   f22  ___
   e23  ___

   e24  ___
   f25  ___
   f26  ___
   f27  ___
   f28  ___
   f29  ___
   f30  MS_L
   f31  MS_D
   f32  MS_U
   f33  MS_R
   f34  ___
   e35  ___

   e36  ___
   f37  ___
   f38  C_X
   f39  C_C
   f40  C_V
   f41  ___
   EL   ___
   ER   ___
   f42  ___
   f43  ___
   f44  ___
   f45  ___
   f46  ___
   e47  ___

   t48  ___
   t49  ___
   t50  ___
   t51  ___
   t52  ACL0
   t53  ACL2
   t54  ___
   t55  ___
   t56  ___
   t57  ___
`,

    // Layer 8: TOGGLE - Layer toggle controls
    toggle: `
   s00  CK_REST
   s01  TG_FN
   s02  TG_NKEY
   s03  TG_MOUS
   s04  XXX
   s05  SH_TOGG
   s06  DF_COLE
   s07  DF_GAME
   s08  DF_QWER
   s09  XXX
   s10  XXX
   s11  CK_REST

   e12  XXX
   f13  DF_QWER
   f14  XXX
   f15  XXX
   f16  XXX
   f17  XXX
   f18  XXX
   f19  XXX
   f20  XXX
   f21  XXX
   f22  XXX
   e23  XXX

   e24  XXX
   f25  XXX
   f26  XXX
   f27  XXX
   f28  TG_FN
   f29  DF_GAME
   f30  XXX
   f31  XXX
   f32  XXX
   f33  XXX
   f34  XXX
   e35  XXX

   e36  XXX
   f37  XXX
   f38  DF_COLE
   f39  XXX
   f40  XXX
   f41  XXX
   EL   XXX
   ER   XXX
   f42  TG_NKEY
   f43  TG_MOUS
   f44  XXX
   f45  XXX
   f46  XXX
   e47  XXX

   t48  XXX
   t49  XXX
   t50  XXX
   t51  XXX
   t52  XXX
   t53  XXX
   t54  XXX
   t55  XXX
   t56  XXX
   t57  XXX
`,

    // Layer 9: L1_NAV - Navigation and symbols
    l1_nav: `
   s00  ESC
   s01  !
   s02  @
   s03  #
   s04  $
   s05  %
   s06  ^
   s07  &
   s08  *
   s09  _
   s10  -
   s11  =

   e12  INS
   f13  ___
   f14  ___
   f15  ___
   f16  ___
   f17  CAPS
   f18  HOME
   f19  END
   f20  (
   f21  )
   f22  [
   e23  ]

   e24  DEL
   f25  ___
   f26  ___
   f27  ___
   f28  ___
   f29  NUM
   f30  LEFT
   f31  DOWN
   f32  UP
   f33  RIGHT
   f34  {
   e35  }

   e36  ___
   f37  ___
   f38  ___
   f39  ___
   f40  ___
   f41  ___
   EL   ___
   ER   ___
   f42  C_LEFT
   f43  PGDN
   f44  PGUP
   f45  C_RIGHT
   f46  ?
   e47  "

   t48  ___
   t49  ___
   t50  ___
   t51  ___
   t52  ___
   t53  ___
   t54  ___
   t55  ___
   t56  ___
   t57  ___
`,

    // Layer 10: L2 - Function keys + numpad + unicode
    l2: `
   s00  F1
   s01  F2
   s02  F3
   s03  F4
   s04  F5
   s05  F6
   s06  ___
   s07  NUM
   s08  P*
   s09  LGUI
   s10  _
   s11  +

   e12  F7
   f13  F8
   f14  F9
   f15  F10
   f16  F11
   f17  F12
   f18  PGUP
   f19  P7
   f20  P8
   f21  P9
   f22  LCTL
   e23  AA

   e24  ___
   f25  ___
   f26  ___
   f27  ___
   f28  ___
   f29  ___
   f30  B
   f31  ___
   f32  ___
   f33  W
   f34  OE
   e35  AE

   e36  ___
   f37  C_Z
   f38  C_X
   f39  C_C
   f40  C_V
   f41  ___
   EL   ___
   ER   ___
   f42  CAT
   f43  P1
   f44  UC_PRV
   f45  UC_NXT
   f46  P=
   e47  ___

   t48  PENT
   t49  ___
   t50  ___
   t51  ___
   t52  ___
   t53  ___
   t54  ___
   t55  SMILE
   t56  UPSIDE
   t57  ___
`,

    // Layer 11: L3 - RGB and backlight controls
    l3: `
   s00  TG(0)
   s01  ___
   s02  ___
   s03  ___
   s04  ___
   s05  ___
   s06  BL_STEP
   s07  BL_UP
   s08  BL_DOWN
   s09  BL_BRTG
   s10  ___
   s11  BL_TOGG

   e12  ___
   f13  ___
   f14  ___
   f15  ___
   f16  ___
   f17  ___
   f18  ___
   f19  ___
   f20  ___
   f21  ___
   f22  ___
   e23  ___

   e24  ___
   f25  RM_TOGG
   f26  RM_HUEU
   f27  RM_SATU
   f28  RM_VALU
   f29  ___
   f30  UG_PREV
   f31  UG_HUEU
   f32  UG_HUED
   f33  UG_NEXT
   f34  ___
   e35  UG_TOGG

   e36  ___
   f37  RM_NEXT
   f38  RM_HUED
   f39  RM_SATD
   f40  RM_VALD
   f41  ___
   EL   ___
   ER   XXX
   f42  RM_PREV
   f43  RM_SATU
   f44  RM_SATD
   f45  RM_NEXT
   f46  ___
   e47  RM_TOGG

   t48  ___
   t49  ___
   t50  ___
   t51  ___
   t52  DF(0)
   t53  ___
   t54  LGUI
   t55  ___
   t56  ___
   t57  ___
`,

    // Layer 12: L4 - System and debug controls
    l4: `
   s00  TO(0)
   s01  TG(1)
   s02  TG(2)
   s03  TG(3)
   s04  TG(4)
   s05  TG(5)
   s06  ___
   s07  ___
   s08  ___
   s09  ___
   s10  DB_TOGG
   s11  QK_BOOT

   e12  ___
   f13  ___
   f14  UC_WIN
   f15  ___
   f16  ___
   f17  ___
   f18  ___
   f19  ___
   f20  ___
   f21  ___
   f22  EE_CLR
   e23  CK_FLAS

   e24  ___
   f25  ___
   f26  ___
   f27  ___
   f28  ___
   f29  ___
   f30  ___
   f31  ___
   f32  ___
   f33  ___
   f34  ___
   e35  CK_CONS

   e36  ___
   f37  ___
   f38  ___
   f39  ___
   f40  ___
   f41  ___
   EL   ___
   ER   ___
   f42  ___
   f43  ___
   f44  ___
   f45  ___
   f46  ___
   e47  CK_LINT

   t48  ___
   t49  ___
   t50  ___
   t51  ___
   t52  DF(0)
   t53  ___
   t54  ___
   t55  ___
   t56  ___
   t57  ___
`,

    // Layer 13: L5 - Full QWERTY (no mods)
    l5: `
   s00  ESC
   s01  1
   s02  2
   s03  3
   s04  4
   s05  5
   s06  6
   s07  7
   s08  8
   s09  9
   s10  0
   s11  BSPC

   e12  TAB
   f13  Q
   f14  W
   f15  E
   f16  R
   f17  T
   f18  Y
   f19  U
   f20  I
   f21  O
   f22  P
   e23  BSLS

   e24  LSFT
   f25  A
   f26  S
   f27  D
   f28  F
   f29  G
   f30  H
   f31  J
   f32  K
   f33  L
   f34  ;
   e35  SC_SENT

   e36  LCTL
   f37  Z
   f38  X
   f39  C
   f40  V
   f41  B
   EL   MUTE
   ER   XXX
   f42  N
   f43  M
   f44  ,
   f45  .
   f46  /
   e47  RCTL

   t48  ___
   t49  ___
   t50  ___
   t51  ___
   t52  ___
   t53  ___
   t54  ___
   t55  ___
   t56  ___
   t57  ___
`
};

// Combos definition
const combos = {
    QW_ESC: { keys: ['Q', 'W'], result: 'ESC' },
    AS_TAB: { keys: ['A', 'S'], result: 'TAB' },
    OP_BACKSPACE: { keys: ['O', 'P'], result: 'BSPC' },
    IO_DEL: { keys: ['I', 'O'], result: 'DEL' },
    LSEMI_ENTER: { keys: ['L', ';'], result: 'ENT' },
    DOTSLASH_BACKSLASH: { keys: ['.', '/'], result: 'BSLS' },
    ZERO_BACKSPACE: { keys: ['0', 'BSPC'], result: '+' },
    CAPS_WORD: { keys: ['LSFT', 'BSPC'], result: 'CK_CAPS' },
    MINUS: { keys: ['0', '9'], result: '-' },
    TOGGLE_LAYER: { keys: ['L1_ENT', 'L4_SPC'], result: 'LT_TOGGLE' }
};

// Encoder mappings (same for all layers)
const encoders = {
    left: { ccw: 'VOLD', cw: 'VOLU' },
    right: { ccw: 'PGUP', cw: 'PGDN' }
};

// Layer order matching enum in macros.h
const layerOrder = [
    'base_sofle',      // 0: BASE_SOFLE
    'base_qwerty',     // 1: BASE_QWERTY
    'base_colemak_dh', // 2: BASE_COLEMAK_DH
    'base_gaming',     // 3: BASE_GAMING
    'overlay_numpad',  // 4: OVERLAY_NUMPAD
    'overlay_num',     // 5: OVERLAY_NUM
    'overlay_fn',      // 6: OVERLAY_FN
    'overlay_mouse',   // 7: OVERLAY_MOUSE
    'toggle',          // 8: TOGGLE
    'l1_nav',          // 9: L1_NAV
    'l2',              // 10: L2
    'l3',              // 11: L3
    'l4',              // 12: L4
    'l5'               // 13: L5
];

export { layers, combos, encoders, layerOrder };
export default layers;
