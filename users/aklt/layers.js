// Define layers
// First column is the template key name, second is the key
// Following columns are overrides for a specific keyboard
//
// keyname  key  Ferris  Kyria  Sofle
const layers = {
    base: `
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
   s11  BSP

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
   e23  BSLS  k:BSP

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
   e35  SENT

   e36  LCTL
   f37  z
   f38  x
   f39  c
   f40  v
   f41  b
   e42  ENCL
   k43  RGUI
   k44  RALT
   e45  ENCR
   f46  n
   f47  m
   f48  ,
   f49  .
   f50  /
   e51  C_QUOT

   s52  LGUI
   e53  L3_D
   e54  L2_ESC
   f55  LALT
   f56  L1_LEAD
   k57  WIR
   k58  OPR
   f57  L4_S
   f58  GUI_DEL
   e59  L5_F
   e60  APP
   s61  RGUI
`,
    qwerty: `
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

   f37  z
   f38  x
   f39  c
   f40  v
   f41  b
   f46  n
   f47  m
   f48  ,
   f49  .
   f50  /
`,
    colemak: `
   f13  q
   f14  w
   f15  f
   f16  p
   f17  g
   f18  j
   f19  l
   f20  u
   f21  y
   f22  ;

   f25  a
   f26  r
   f27  s
   f28  t
   f29  d
   f30  h
   f31  n
   f32  e
   f33  i
   f34  o

   f37  z
   f38  x
   f39  c
   f40  v
   f41  b
   f46  k
   f47  m
   f48  ,
   f49  .
   f50  /
`,
l1nav: `
   s00 ESC
   s01 !
   s02 @
   s03 #
   s04 $
   s05 %
   s06 ^
   s07 &
   s08 *
   s09 _
   s10 -
   s11 =

   e12 INS
   // ...
   f17 CAPS
   f18 HOME
   f19 END
   f20 (
   f21 )
   f22 [
   e23 ]

   e24 DEL
    // ...
   f29 NUM
   f30 LEFT
   f31 DOWN
   f32 UP
   f33 RIGHT
   f34 {
   e35 }

   f46 C_LEFT
   f47 PGDOWN
   f48 PGUP
   f49 C_RIGHT
   f50 ?
   e51 "
`
};

export default layers;
