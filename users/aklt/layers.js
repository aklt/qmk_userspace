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
// Row 4:      s52 e53 e54 f55 f56          k57 k58 f57 t56 t57

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
   f13  q
   f14  w
   f15  e
   f16  r
   f17  t
   f18  y
   f19  u
   f20  i
   f21  o
   f22  p
   e23  BSLS

   e24  LSFT
   f25  a
   f26  s
   f27  d
   f28  f
   f29  g
   f30  h
   f31  j
   f32  k
   f33  l
   f34  ;
   e35  SC_SENT

   e36  LCTL
   f37  z
   f38  x
   f39  c
   f40  v
   f41  b
   e42  MUTE
   e45  TAB
   f46  n
   f47  m
   f48  ,
   f49  .
   f50  /
   e51  RCTL_QUOT

   s52  LGUI
   e53  L3
   e54  L2
   f55  LALT
   f56  L1
   f59  L4
   f60  GUI_DEL
   e61  L5
   e62  APP
   s63  RGUI
`,

    // Layer 1: BASE_QWERTY - Transparent QWERTY overlay
    base_qwerty: `

   e12  ___
   f13  q
   f14  w
   f15  e
   f16  r
   f17  t
   f18  y
   f19  u
   f20  i
   f21  o
   f22  p
   e23  ___

   e24  ___
   f25  a
   f26  s
   f27  d
   f28  f
   f29  g
   f30  h
   f31  j
   f32  k
   f33  l
   f34  ;
   e35  ___

   e36  ___
   f37  z
   f38  x
   f39  c
   f40  v
   f41  b
   e42  ___
   e45  ___
   f46  n
   f47  m
   f48  ,
   f49  .
   f50  /
   e51  ___
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
   f13  q
   f14  w
   f15  f
   f16  p
   f17  b
   f18  j
   f19  l
   f20  u
   f21  y
   f22  ;
   e23  ___

   e24  ___
   f25  a
   f26  r
   f27  s
   f28  t
   f29  g
   f30  m
   f31  n
   f32  e
   f33  i
   f34  o
   e35  ___

   e36  ___
   f37  z
   f38  x
   f39  c
   f40  d
   f41  v
   e42  ___
   e45  ___
   f46  k
   f47  h
   f48  ,
   f49  .
   f50  /
   e51  ___
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
   f13  q
   f14  c
   f15  w
   f16  f
   f17  t
   f18  XXX
   f19  XXX
   f20  XXX
   f21  XXX
   f22  XXX
   e23  XXX

   e24  LSFT
   f25  r
   f26  a
   f27  s
   f28  d
   f29  g
   f30  XXX
   f31  XXX
   f32  XXX
   f33  XXX
   f34  XXX
   e35  XXX

   e36  LCTL
   f37  y
   f38  z
   f39  x
   f40  v
   f41  b
   e42  ___
   e45  ___
   f46  XXX
   f47  XXX
   f48  XXX
   f49  XXX
   f50  XXX
   e51  XXX

   f55  TAB
   f56  SPC
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
   e42  ___
   e45  ___
   f46  XXX
   f47  P1
   f48  P2
   f49  P3
   f50  PENT
   e51  P,

   k57  XXX
   k58  P0
   f57  P.
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

   f17  F11
   f18  F12
`,

    // Layer 7: OVERLAY_MOUSE - Mouse keys overlay
    overlay_mouse: `
   f18  BTN1
   f19  WHLD
   f20  WHLU
   f21  BTN2

   f30  MS_L
   f31  MS_D
   f32  MS_U
   f33  MS_R

   f38  C_X
   f39  C_C
   f40  C_V

   f56  ACL0
   k57  ACL2
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
   e42  XXX
   e45  XXX
   f46  TG_NKEY
   f47  TG_MOUS
   f48  XXX
   f49  XXX
   f50  XXX
   e51  XXX

   s52  XXX
   e53  XXX
   e54  XXX
   f55  XXX
   f56  XXX
   f59  XXX
   f60  XXX
   e61  XXX
   e62  XXX
   s63  XXX
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
   e42  ___
   e45  ___
   f46  C_LEFT
   f47  PGDN
   f48  PGUP
   f49  C_RIGHT
   f50  ?
   e51  "

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
   e42  ___
   e45  ___
   f46  CAT
   f47  P1
   f48  UC_PRV
   f49  UC_NXT
   f50  P=
   e51  ___


   s52  PENT
   e53  ___
   e54  ___
   f55  ___
   f56  ___
   f59  ___
   f60  ___
   e61  SMILE
   e62  UPSIDE
   s63  ___
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
   e42  ___
   e45  XXX
   f46  RM_PREV
   f47  RM_SATU
   f48  RM_SATD
   f49  RM_NEXT
   f50  ___
   e51  RM_TOGG

   s52  ___
   e53  ___
   e54  ___
   f55  ___
   f56  DF(0)
   f59  ___
   f60  LGUI
   e61  ___
   e62  ___
   s63  ___
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

   e35  CK_CONS

   e51  CK_LINT

   f56  DF(0)
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
   e42  MUTE
   e45  XXX
   f46  N
   f47  M
   f48  ,
   f49  .
   f50  /
   e51  RCTL
`
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
    'l1',              // 9: L1_NAV
    'l2',              // 10: L2
    'l3',              // 11: L3
    'l4',              // 12: L4
    'l5'               // 13: L5
];

export { layers, encoders, layerOrder };
export default layers;
