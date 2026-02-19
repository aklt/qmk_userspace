// Generated keymap.c
// Built: 2026-02-19T18:40:58.605Z
// Keyboard: kyria
// Generator: define-keymap.js

#include "aklt.h"

// {{{1 Keymap Layers

const uint16_t PROGMEM keymaps[][MATRIX_ROWS][MATRIX_COLS] = {
    [BASE_SOFLE] = LAYOUT_MACRO(
    /* TAB      q        w        e        r        t                                            y        u        i        o        p        BSLS    
       LSFT     a        s        d        f        g                                            h        j        k        l        ;        SC_SENT 
       LCTL     z        x        c        v        b        MUTE     _______  _______  TAB      n        m        ,        .        /        RCTL_QUOT
                                  L3       L2       LALT     L1       _______  _______  L4       GUI_DEL  L5       APP                              */
    
       KC_TAB,   KC_Q,     KC_W,     KC_E,     KC_R,     KC_T,                                         KC_Y,     KC_U,     KC_I,     KC_O,     KC_P,     KC_BACKSLASH,
       KC_LEFT_SHIFT, KC_A,     KC_S,     KC_D,     KC_F,     KC_G,                                         KC_H,     KC_J,     KC_K,     KC_L,     KC_SCLN,  SC_SENT,
       KC_LCTL,  KC_Z,     KC_X,     KC_C,     KC_V,     KC_B,     KC_KB_MUTE, _______,  _______,  KC_TAB,   KC_N,     KC_M,     KC_COMMA, KC_DOT,   KC_SLASH, RCTL_T(KC_QUOT),
                                  D_L3,     D_L2,     KC_LEFT_ALT, D_L1,     _______,  _______,  D_L4,     GUI_DEL,  D_L5,     KC_APP
    ),

    [BASE_QWERTY] = LAYOUT_MACRO(
    /* ___      q        w        e        r        t                                            y        u        i        o        p        ___     
       ___      a        s        d        f        g                                            h        j        k        l        ;        ___     
       ___      z        x        c        v        b        ___      _______  _______  ___      n        m        ,        .        /        ___     
                                  _______  _______  _______  _______  _______  _______  _______  _______  _______  _______                          */
    
       _______,  KC_Q,     KC_W,     KC_E,     KC_R,     KC_T,                                         KC_Y,     KC_U,     KC_I,     KC_O,     KC_P,     _______,
       _______,  KC_A,     KC_S,     KC_D,     KC_F,     KC_G,                                         KC_H,     KC_J,     KC_K,     KC_L,     KC_SCLN,  _______,
       _______,  KC_Z,     KC_X,     KC_C,     KC_V,     KC_B,     _______,  _______,  _______,  _______,  KC_N,     KC_M,     KC_COMMA, KC_DOT,   KC_SLASH, _______,
                                  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______
    ),

    [BASE_COLEMAK_DH] = LAYOUT_MACRO(
    /* ___      q        w        f        p        b                                            j        l        u        y        ;        ___     
       ___      a        r        s        t        g                                            m        n        e        i        o        ___     
       ___      z        x        c        d        v        ___      _______  _______  ___      k        h        ,        .        /        ___     
                                  _______  _______  _______  _______  _______  _______  _______  _______  _______  _______                          */
    
       _______,  KC_Q,     KC_W,     KC_F,     KC_P,     KC_B,                                         KC_J,     KC_L,     KC_U,     KC_Y,     KC_SCLN,  _______,
       _______,  KC_A,     KC_R,     KC_S,     KC_T,     KC_G,                                         KC_M,     KC_N,     KC_E,     KC_I,     KC_O,     _______,
       _______,  KC_Z,     KC_X,     KC_C,     KC_D,     KC_V,     _______,  _______,  _______,  _______,  KC_K,     KC_H,     KC_COMMA, KC_DOT,   KC_SLASH, _______,
                                  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______
    ),

    [BASE_GAMING] = LAYOUT_MACRO(
    /* TAB      q        c        w        f        t                                            XXX      XXX      XXX      XXX      XXX      XXX     
       LSFT     r        a        s        d        g                                            XXX      XXX      XXX      XXX      XXX      XXX     
       LCTL     y        z        x        v        b        ___      _______  _______  ___      XXX      XXX      XXX      XXX      XXX      XXX     
                                  _______  _______  TAB      SPC      _______  _______  _______  _______  _______  _______                          */
    
       KC_TAB,   KC_Q,     KC_C,     KC_W,     KC_F,     KC_T,                                         XXXXXXX,  XXXXXXX,  XXXXXXX,  XXXXXXX,  XXXXXXX,  XXXXXXX,
       KC_LEFT_SHIFT, KC_R,     KC_A,     KC_S,     KC_D,     KC_G,                                         XXXXXXX,  XXXXXXX,  XXXXXXX,  XXXXXXX,  XXXXXXX,  XXXXXXX,
       KC_LCTL,  KC_Y,     KC_Z,     KC_X,     KC_V,     KC_B,     _______,  _______,  _______,  _______,  XXXXXXX,  XXXXXXX,  XXXXXXX,  XXXXXXX,  XXXXXXX,  XXXXXXX,
                                  _______,  _______,  KC_TAB,   KC_SPACE, _______,  _______,  _______,  _______,  _______,  _______
    ),

    [OVERLAY_NUMPAD] = LAYOUT_MACRO(
    /* ___      ___      ___      ___      ___      ___                                          XXX      P7       P8       P9       XXX      P-      
       ___      ___      ___      ___      ___      ___                                          XXX      P4       P5       P6       PENT     P+      
       ___      ___      ___      ___      ___      ___      ___      _______  _______  ___      XXX      P1       P2       P3       PENT     P,      
                                  _______  _______  _______  _______  XXX      P0       _______  _______  _______  _______                          */
    
       _______,  _______,  _______,  _______,  _______,  _______,                                      XXXXXXX,  KC_KP_7,  KC_KP_8,  KC_KP_9,  XXXXXXX,  KC_PMNS,
       _______,  _______,  _______,  _______,  _______,  _______,                                      XXXXXXX,  KC_KP_4,  KC_KP_5,  KC_KP_6,  KC_PENT,  KC_PPLS,
       _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  XXXXXXX,  KC_KP_1,  KC_KP_2,  KC_KP_3,  KC_PENT,  KC_PCMM,
                                  _______,  _______,  _______,  _______,  XXXXXXX,  KC_KP_0,  _______,  _______,  _______,  _______
    ),

    [OVERLAY_NUM] = LAYOUT_MACRO(
    /* _______  _______  _______  _______  _______  _______                                      _______  _______  _______  _______  _______  _______ 
       _______  _______  _______  _______  _______  _______                                      _______  _______  _______  _______  _______  _______ 
       _______  _______  _______  _______  _______  _______  _______  _______  _______  _______  _______  _______  _______  _______  _______  _______ 
                                  _______  _______  _______  _______  _______  _______  _______  _______  _______  _______                          */
    
       _______,  _______,  _______,  _______,  _______,  _______,                                      _______,  _______,  _______,  _______,  _______,  _______,
       _______,  _______,  _______,  _______,  _______,  _______,                                      _______,  _______,  _______,  _______,  _______,  _______,
       _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,
                                  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______
    ),

    [OVERLAY_FN] = LAYOUT_MACRO(
    /* _______  _______  _______  _______  _______  F11                                          F12      _______  _______  _______  _______  _______ 
       _______  _______  _______  _______  _______  _______                                      _______  _______  _______  _______  _______  _______ 
       _______  _______  _______  _______  _______  _______  _______  _______  _______  _______  _______  _______  _______  _______  _______  _______ 
                                  _______  _______  _______  _______  _______  _______  _______  _______  _______  _______                          */
    
       _______,  _______,  _______,  _______,  _______,  KC_F11,                                       KC_F12,   _______,  _______,  _______,  _______,  _______,
       _______,  _______,  _______,  _______,  _______,  _______,                                      _______,  _______,  _______,  _______,  _______,  _______,
       _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,
                                  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______
    ),

    [OVERLAY_MOUSE] = LAYOUT_MACRO(
    /* _______  _______  _______  _______  _______  _______                                      BTN1     WHLD     WHLU     BTN2     _______  _______ 
       _______  _______  _______  _______  _______  _______                                      MS_L     MS_D     MS_U     MS_R     _______  _______ 
       _______  _______  C_X      C_C      C_V      _______  _______  _______  _______  _______  _______  _______  _______  _______  _______  _______ 
                                  _______  _______  _______  ACL0     ACL2     _______  _______  _______  _______  _______                          */
    
       _______,  _______,  _______,  _______,  _______,  _______,                                      MS_BTN1,  MS_WHLD,  MS_WHLU,  MS_BTN2,  _______,  _______,
       _______,  _______,  _______,  _______,  _______,  _______,                                      MS_LEFT,  MS_DOWN,  MS_UP,    MS_RGHT,  _______,  _______,
       _______,  _______,  C(KC_X),  C(KC_C),  C(KC_V),  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,
                                  _______,  _______,  _______,  MS_ACL0,  MS_ACL2,  _______,  _______,  _______,  _______,  _______
    ),

    [TOGGLE] = LAYOUT_MACRO(
    /* XXX      DF_QWER  XXX      XXX      XXX      XXX                                          XXX      XXX      XXX      XXX      XXX      XXX     
       XXX      XXX      XXX      XXX      TG_FN    DF_GAME                                      XXX      XXX      XXX      XXX      XXX      XXX     
       XXX      XXX      DF_COLE  XXX      XXX      XXX      XXX      _______  _______  XXX      TG_NKEY  TG_MOUS  XXX      XXX      XXX      XXX     
                                  XXX      XXX      XXX      XXX      _______  _______  XXX      XXX      XXX      XXX                              */
    
       XXXXXXX,  DF_QWER,  XXXXXXX,  XXXXXXX,  XXXXXXX,  XXXXXXX,                                      XXXXXXX,  XXXXXXX,  XXXXXXX,  XXXXXXX,  XXXXXXX,  XXXXXXX,
       XXXXXXX,  XXXXXXX,  XXXXXXX,  XXXXXXX,  CK_FKEY,  DF_GAME,                                      XXXXXXX,  XXXXXXX,  XXXXXXX,  XXXXXXX,  XXXXXXX,  XXXXXXX,
       XXXXXXX,  XXXXXXX,  DF_COLE,  XXXXXXX,  XXXXXXX,  XXXXXXX,  XXXXXXX,  _______,  _______,  XXXXXXX,  CK_NKEY,  CK_MOUS,  XXXXXXX,  XXXXXXX,  XXXXXXX,  XXXXXXX,
                                  XXXXXXX,  XXXXXXX,  XXXXXXX,  XXXXXXX,  _______,  _______,  XXXXXXX,  XXXXXXX,  XXXXXXX,  XXXXXXX
    ),

    [L1_NAV] = LAYOUT_MACRO(
    /* INS      ___      ___      ___      ___      CAPS                                         HOME     END      (        )        [        ]       
       DEL      ___      ___      ___      ___      NUM                                          LEFT     DOWN     UP       RIGHT    {        }       
       ___      ___      ___      ___      ___      ___      ___      _______  _______  ___      C_LEFT   PGDN     PGUP     C_RIGHT  ?        "       
                                  _______  _______  _______  _______  _______  _______  _______  _______  _______  _______                          */
    
       KC_INSERT, _______,  _______,  _______,  _______,  KC_CAPS_LOCK,                                     KC_HOME,  KC_END,   KC_LPRN,  KC_RPRN,  KC_LEFT_BRACKET, KC_RIGHT_BRACKET,
       KC_DELETE, _______,  _______,  _______,  _______,  KC_NUM_LOCK,                                     KC_LEFT,  KC_DOWN,  KC_UP,    KC_RIGHT, KC_LCBR,  KC_RCBR,
       _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  C(KC_LEFT), KC_PAGE_DOWN, KC_PAGE_UP, C(KC_RIGHT), KC_QUES,  KC_DQUO,
                                  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______
    ),

    [L2] = LAYOUT_MACRO(
    /* F7       F8       F9       F10      F11      F12                                          PGUP     P7       P8       P9       LCTL     AA      
       ___      ___      ___      ___      ___      ___                                          b        ___      ___      w        OE       AE      
       ___      C_Z      C_X      C_C      C_V      ___      ___      _______  _______  ___      CAT      P1       UC_PRV   UC_NXT   P=       ___     
                                  ___      ___      ___      ___      _______  _______  ___      ___      SMILE    UPSIDE                           */
    
       KC_F7,    KC_F8,    KC_F9,    KC_F10,   KC_F11,   KC_F12,                                       KC_PAGE_UP, KC_KP_7,  KC_KP_8,  KC_KP_9,  KC_LCTL,  DA_AA,
       _______,  _______,  _______,  _______,  _______,  _______,                                      KC_B,     _______,  _______,  KC_W,     DA_OE,    DA_AE,
       _______,  C(KC_Z),  C(KC_X),  C(KC_C),  C(KC_V),  _______,  _______,  _______,  _______,  _______,  UM(CAT),  KC_KP_1,  UC_PREV,  UC_NEXT,  KC_PEQL,  _______,
                                  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  UM(SMILE), UM(UPSIDE)
    ),

    [L3] = LAYOUT_MACRO(
    /* ___      ___      ___      ___      ___      ___                                          ___      ___      ___      ___      ___      ___     
       ___      RM_TOGG  RM_HUEU  RM_SATU  RM_VALU  ___                                          UG_PREV  UG_HUEU  UG_HUED  UG_NEXT  ___      UG_TOGG 
       ___      RM_NEXT  RM_HUED  RM_SATD  RM_VALD  ___      ___      _______  _______  XXX      RM_PREV  RM_SATU  RM_SATD  RM_NEXT  ___      RM_TOGG 
                                  ___      ___      ___      DF(0)    _______  _______  ___      LGUI     ___      ___                              */
    
       _______,  _______,  _______,  _______,  _______,  _______,                                      _______,  _______,  _______,  _______,  _______,  _______,
       _______,  RM_TOGG,  RM_HUEU,  RM_SATU,  RM_VALU,  _______,                                      UG_PREV,  UG_HUEU,  UG_HUED,  UG_NEXT,  _______,  UG_TOGG,
       _______,  RM_NEXT,  RM_HUED,  RM_SATD,  RM_VALD,  _______,  _______,  _______,  _______,  XXXXXXX,  RM_PREV,  RM_SATU,  RM_SATD,  RM_NEXT,  _______,  RM_TOGG,
                                  _______,  _______,  _______,  DF(0),    _______,  _______,  _______,  KC_LEFT_GUI, _______,  _______
    ),

    [L4] = LAYOUT_MACRO(
    /* ___      ___      UC_WIN   ___      ___      ___                                          ___      ___      ___      ___      EE_CLR   CK_FLAS 
       _______  _______  _______  _______  _______  _______                                      _______  _______  _______  _______  _______  CK_CONS 
       _______  _______  _______  _______  _______  _______  _______  _______  _______  _______  _______  _______  _______  _______  _______  CK_LINT 
                                  _______  _______  _______  DF(0)    _______  _______  _______  _______  _______  _______                          */
    
       _______,  _______,  UC_WIN,   _______,  _______,  _______,                                      _______,  _______,  _______,  _______,  EE_CLR,   CK_FLAS,
       _______,  _______,  _______,  _______,  _______,  _______,                                      _______,  _______,  _______,  _______,  _______,  CK_CONS,
       _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  CK_LINT,
                                  _______,  _______,  _______,  DF(0),    _______,  _______,  _______,  _______,  _______,  _______
    ),

    [L5] = LAYOUT_MACRO(
    /* TAB      q        w        e        r        t                                            y        u        i        o        p        BSLS    
       LSFT     a        s        d        f        g                                            h        j        k        l        ;        SC_SENT 
       LCTL     z        x        c        v        b        MUTE     _______  _______  XXX      n        m        ,        .        /        RCTL    
                                  _______  _______  _______  _______  _______  _______  _______  _______  _______  _______                          */
    
       KC_TAB,   KC_Q,     KC_W,     KC_E,     KC_R,     KC_T,                                         KC_Y,     KC_U,     KC_I,     KC_O,     KC_P,     KC_BACKSLASH,
       KC_LEFT_SHIFT, KC_A,     KC_S,     KC_D,     KC_F,     KC_G,                                         KC_H,     KC_J,     KC_K,     KC_L,     KC_SCLN,  SC_SENT,
       KC_LCTL,  KC_Z,     KC_X,     KC_C,     KC_V,     KC_B,     KC_KB_MUTE, _______,  _______,  XXXXXXX,  KC_N,     KC_M,     KC_COMMA, KC_DOT,   KC_SLASH, KC_RCTL,
                                  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______
    )
};

// {{{1 Encoder Map

#if defined(ENCODER_ENABLE) && defined(ENCODER_MAP_ENABLE)
const uint16_t PROGMEM encoder_map[][NUM_ENCODERS][NUM_DIRECTIONS] = {
    [BASE_SOFLE] = {ENCODER_CCW_CW(KC_VOLD, KC_VOLU), ENCODER_CCW_CW(KC_PGUP, KC_PGDN)},
    [BASE_QWERTY] = {ENCODER_CCW_CW(KC_VOLD, KC_VOLU), ENCODER_CCW_CW(KC_PGUP, KC_PGDN)},
    [BASE_COLEMAK_DH] = {ENCODER_CCW_CW(KC_VOLD, KC_VOLU), ENCODER_CCW_CW(KC_PGUP, KC_PGDN)},
    [BASE_GAMING] = {ENCODER_CCW_CW(KC_VOLD, KC_VOLU), ENCODER_CCW_CW(KC_PGUP, KC_PGDN)},
    [OVERLAY_NUMPAD] = {ENCODER_CCW_CW(KC_VOLD, KC_VOLU), ENCODER_CCW_CW(KC_PGUP, KC_PGDN)},
    [OVERLAY_NUM] = {ENCODER_CCW_CW(KC_VOLD, KC_VOLU), ENCODER_CCW_CW(KC_PGUP, KC_PGDN)},
    [OVERLAY_FN] = {ENCODER_CCW_CW(KC_VOLD, KC_VOLU), ENCODER_CCW_CW(KC_PGUP, KC_PGDN)},
    [OVERLAY_MOUSE] = {ENCODER_CCW_CW(KC_VOLD, KC_VOLU), ENCODER_CCW_CW(KC_PGUP, KC_PGDN)},
    [TOGGLE] = {ENCODER_CCW_CW(KC_VOLD, KC_VOLU), ENCODER_CCW_CW(KC_PGUP, KC_PGDN)},
    [L1_NAV] = {ENCODER_CCW_CW(KC_VOLD, KC_VOLU), ENCODER_CCW_CW(KC_PGUP, KC_PGDN)},
    [L2] = {ENCODER_CCW_CW(KC_VOLD, KC_VOLU), ENCODER_CCW_CW(KC_PGUP, KC_PGDN)},
    [L3] = {ENCODER_CCW_CW(KC_VOLD, KC_VOLU), ENCODER_CCW_CW(KC_PGUP, KC_PGDN)},
    [L4] = {ENCODER_CCW_CW(KC_VOLD, KC_VOLU), ENCODER_CCW_CW(KC_PGUP, KC_PGDN)},
    [L5] = {ENCODER_CCW_CW(KC_VOLD, KC_VOLU), ENCODER_CCW_CW(KC_PGUP, KC_PGDN)}
};
#endif // defined(ENCODER_ENABLE) && defined(ENCODER_MAP_ENABLE)

// {{{1 Combos
#ifdef COMBO_ENABLE
enum combos {
    COMBO_0_QW,
    COMBO_1_AS,
    COMBO_2_ZX,
    COMBO_3_WE,
    COMBO_4_SD,
    COMBO_5_XC,
    COMBO_6_ER,
    COMBO_7_RT,
    COMBO_8_FG,
    COMBO_9_VB,
    COMBO_10_YU,
    COMBO_11_HJ,
    COMBO_12_NM,
    COMBO_13_UI,
    COMBO_14_JK,
    COMBO_15_M_,
    COMBO_16_IO,
    COMBO_17_KL,
    COMBO_18___,
    COMBO_19_OP,
    COMBO_20_L_,
    COMBO_21___,
    COMBO_22_IK,
    COMBO_23_K_,
    COMBO_24_JM,
    COMBO_25_L_,
    COMBO_26_UJ,
    COMBO_27_OL,
    ZERO_BACKSPACE,
    CAPS_WORD,
    MINUS,
    TOGGLE_LAYER
};
const uint16_t PROGMEM defCOMBO_0_QW[] = { KC_Q, KC_W, COMBO_END };
const uint16_t PROGMEM defCOMBO_1_AS[] = { KC_A, KC_S, COMBO_END };
const uint16_t PROGMEM defCOMBO_2_ZX[] = { KC_Z, KC_X, COMBO_END };
const uint16_t PROGMEM defCOMBO_3_WE[] = { KC_W, KC_E, COMBO_END };
const uint16_t PROGMEM defCOMBO_4_SD[] = { KC_S, KC_D, COMBO_END };
const uint16_t PROGMEM defCOMBO_5_XC[] = { KC_X, KC_C, COMBO_END };
const uint16_t PROGMEM defCOMBO_6_ER[] = { KC_E, KC_R, COMBO_END };
const uint16_t PROGMEM defCOMBO_7_RT[] = { KC_R, KC_T, COMBO_END };
const uint16_t PROGMEM defCOMBO_8_FG[] = { KC_F, KC_G, COMBO_END };
const uint16_t PROGMEM defCOMBO_9_VB[] = { KC_V, KC_B, COMBO_END };
const uint16_t PROGMEM defCOMBO_10_YU[] = { KC_Y, KC_U, COMBO_END };
const uint16_t PROGMEM defCOMBO_11_HJ[] = { KC_H, KC_J, COMBO_END };
const uint16_t PROGMEM defCOMBO_12_NM[] = { KC_N, KC_M, COMBO_END };
const uint16_t PROGMEM defCOMBO_13_UI[] = { KC_U, KC_I, COMBO_END };
const uint16_t PROGMEM defCOMBO_14_JK[] = { KC_J, KC_K, COMBO_END };
const uint16_t PROGMEM defCOMBO_15_M_[] = { KC_M, KC_COMMA, COMBO_END };
const uint16_t PROGMEM defCOMBO_16_IO[] = { KC_I, KC_O, COMBO_END };
const uint16_t PROGMEM defCOMBO_17_KL[] = { KC_K, KC_L, COMBO_END };
const uint16_t PROGMEM defCOMBO_18___[] = { KC_COMMA, KC_DOT, COMBO_END };
const uint16_t PROGMEM defCOMBO_19_OP[] = { KC_O, KC_P, COMBO_END };
const uint16_t PROGMEM defCOMBO_20_L_[] = { KC_L, KC_SCLN, COMBO_END };
const uint16_t PROGMEM defCOMBO_21___[] = { KC_DOT, KC_SLASH, COMBO_END };
const uint16_t PROGMEM defCOMBO_22_IK[] = { KC_I, KC_K, COMBO_END };
const uint16_t PROGMEM defCOMBO_23_K_[] = { KC_K, KC_COMMA, COMBO_END };
const uint16_t PROGMEM defCOMBO_24_JM[] = { KC_J, KC_M, COMBO_END };
const uint16_t PROGMEM defCOMBO_25_L_[] = { KC_L, KC_DOT, COMBO_END };
const uint16_t PROGMEM defCOMBO_26_UJ[] = { KC_U, KC_J, COMBO_END };
const uint16_t PROGMEM defCOMBO_27_OL[] = { KC_O, KC_L, COMBO_END };
const uint16_t PROGMEM defZERO_BACKSPACE[] = { KC_0, KC_BSPC, COMBO_END };
const uint16_t PROGMEM defCAPS_WORD[] = { KC_LSFT, KC_BSPC, COMBO_END };
const uint16_t PROGMEM defMINUS[] = { KC_0, KC_9, COMBO_END };
const uint16_t PROGMEM defTOGGLE_LAYER[] = { D_L1, D_L4, COMBO_END };
combo_t key_combos[] = {
      [COMBO_0_QW] = COMBO(defCOMBO_0_QW, KC_ESCAPE),
      [COMBO_1_AS] = COMBO(defCOMBO_1_AS, KC_TAB),
      [COMBO_2_ZX] = COMBO(defCOMBO_2_ZX, KC_DELETE),
      [COMBO_3_WE] = COMBO(defCOMBO_3_WE, KC_TAB),
      [COMBO_4_SD] = COMBO(defCOMBO_4_SD, KC_PIPE),
      [COMBO_5_XC] = COMBO(defCOMBO_5_XC, KC_LCTL),
      [COMBO_6_ER] = COMBO(defCOMBO_6_ER, KC_LEFT_ALT),
      [COMBO_7_RT] = COMBO(defCOMBO_7_RT, KC_SPACE),
      [COMBO_8_FG] = COMBO(defCOMBO_8_FG, KC_SPACE),
      [COMBO_9_VB] = COMBO(defCOMBO_9_VB, KC_SPACE),
      [COMBO_10_YU] = COMBO(defCOMBO_10_YU, KC_PLUS),
      [COMBO_11_HJ] = COMBO(defCOMBO_11_HJ, KC_MINUS),
      [COMBO_12_NM] = COMBO(defCOMBO_12_NM, KC_ASTR),
      [COMBO_13_UI] = COMBO(defCOMBO_13_UI, KC_LEFT_BRACKET),
      [COMBO_14_JK] = COMBO(defCOMBO_14_JK, KC_LPRN),
      [COMBO_15_M_] = COMBO(defCOMBO_15_M_, KC_LCBR),
      [COMBO_16_IO] = COMBO(defCOMBO_16_IO, KC_RIGHT_BRACKET),
      [COMBO_17_KL] = COMBO(defCOMBO_17_KL, KC_RPRN),
      [COMBO_18___] = COMBO(defCOMBO_18___, KC_RCBR),
      [COMBO_19_OP] = COMBO(defCOMBO_19_OP, KC_BACKSPACE),
      [COMBO_20_L_] = COMBO(defCOMBO_20_L_, KC_ENTER),
      [COMBO_21___] = COMBO(defCOMBO_21___, KC_BACKSLASH),
      [COMBO_22_IK] = COMBO(defCOMBO_22_IK, KC_PAGE_UP),
      [COMBO_23_K_] = COMBO(defCOMBO_23_K_, KC_PAGE_DOWN),
      [COMBO_24_JM] = COMBO(defCOMBO_24_JM, KC_HOME),
      [COMBO_25_L_] = COMBO(defCOMBO_25_L_, KC_END),
      [COMBO_26_UJ] = COMBO(defCOMBO_26_UJ, KC_INSERT),
      [COMBO_27_OL] = COMBO(defCOMBO_27_OL, KC_DELETE),
      [ZERO_BACKSPACE] = COMBO(defZERO_BACKSPACE, KC_PLUS),
      [CAPS_WORD] = COMBO(defCAPS_WORD, CK_CAPS),
      [MINUS] = COMBO(defMINUS, KC_MINUS),
      [TOGGLE_LAYER] = COMBO(defTOGGLE_LAYER, LT(TOGGLE, KC_NO))
};

#endif // COMBO_ENABLE

