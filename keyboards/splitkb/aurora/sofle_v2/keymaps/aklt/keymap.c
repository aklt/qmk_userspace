
#include "aklt.h"

// {{{1 Mapping

const uint16_t PROGMEM keymaps[][MATRIX_ROWS][MATRIX_COLS] = {
    [BASE_SOFLE] = LAYOUT_MACRO(
        KC_GRV,  ____QWERTY_NUM_LEFT________________________,                  ____QWERTY_NUM_RIGHT_______________________, KC_BSPC,
        KC_TAB,  ____QWERTY_LEFT_1__________________________,                  ____QWERTY_RIGHT_1_________________________, KC_BSLS,
        KC_LSFT, ____QWERTY_LEFT_2__________________________,                  ____QWERTY_RIGHT_2_________________________, SC_SENT,
        KC_LCTL, ____QWERTY_LEFT_3__________________________, KC_MUTE, KC_TAB, ____QWERTY_RIGHT_3_________________________, RCTL_T(KC_QUOT),
                          KC_LGUI, D_L3,  D_L2,    KC_LALT, D_L1, D_L4,   GUI_DEL, L5_F,    KC_APP,  KC_RGUI
    ),
    [BASE_QWERTY] = LAYOUT_MACRO(
        ____TRANS_6_________________________________________,                   ____TRANS_6_________________________________________,
        _______, ____QWERTY_LEFT_1__________________________,                   ____QWERTY_RIGHT_1_________________________, _______,
        _______, ____QWERTY_LEFT_2__________________________,                   ____QWERTY_RIGHT_2_________________________, _______,
        _______, ____QWERTY_LEFT_3__________________________, _______, _______, ____QWERTY_RIGHT_3_________________________, _______,
                          ____TRANS_10____________________________________________________________________________
    ),
    [BASE_COLEMAK_DH] = LAYOUT_MACRO(
        ____TRANS_6_________________________________________,                   ____TRANS_6_________________________________________,
        _______, ____COLEMAK_LEFT_1_________________________,                   ____COLEMAK_RIGHT_1________________________, _______,
        _______, ____COLEMAK_LEFT_2_________________________,                   ____COLEMAK_RIGHT_2________________________, _______,
        _______, ____COLEMAK_LEFT_3_________________________, _______, _______, ____COLEMAK_RIGHT_3________________________, _______,
                          ____TRANS_10____________________________________________________________________________
    ),
    [BASE_GAMING] = LAYOUT_MACRO(
        KC_ESC,  KC_1,    KC_2,    KC_3,    KC_4,    KC_E,                      ____XXXXX_6_________________________________________,
        KC_TAB,  KC_Q,    KC_C,    KC_W,    KC_F,    KC_T,                      ____XXXXX_6_________________________________________,
        KC_LSFT, KC_R,    KC_A,    KC_S,    KC_D,    KC_G,                      ____XXXXX_6_________________________________________,
        KC_LCTL, KC_Y,    KC_Z,    KC_X,    KC_V,    KC_B,    _______, _______, ____XXXXX_6_________________________________________,
                          _______, _______, _______, KC_TAB,  KC_SPC,  ____TRANS_5________________________________
    ),
    [OVERLAY_NUMPAD] = LAYOUT_MACRO(
        CK_COLO, ____TRANS_5________________________________,                   CK_COLO, KC_PEQL, KC_PSLS, KC_PAST, XXXXXXX, KC_BSPC,
        ____TRANS_6_________________________________________,                   XXXXXXX, KC_P7,   KC_P8,   KC_P9,   XXXXXXX, KC_PMNS,
        ____TRANS_6_________________________________________,                   XXXXXXX, KC_P4,   KC_P5,   KC_P6,   KC_PENT, KC_PPLS,
        ____TRANS_6_________________________________________, _______, _______, XXXXXXX, KC_P1,   KC_P2,   KC_P3,   KC_PENT, KC_PCMM,
                          ____TRANS_6_________________________________________, XXXXXXX, KC_P0,   KC_PDOT, KC_PENT
    ),
    [OVERLAY_NUM] = LAYOUT_MACRO(
        _______, ____QWERTY_NUM_LEFT________________________,                   ____QWERTY_NUM_RIGHT_______________________, _______,
        ____TRANS_6_________________________________________,                   ____TRANS_6_________________________________________,
        ____TRANS_6_________________________________________,                   ____TRANS_6_________________________________________,
        ____TRANS_6_________________________________________, _______, _______, ____TRANS_6_________________________________________,
                          ____TRANS_10____________________________________________________________________________
    ),
    [OVERLAY_FN] = LAYOUT_MACRO(
        _______, ____FUNC_LEFT_5____________________________,                   ____FUNC_RIGHT_5___________________________, _______,
        _______, _______, _______, _______, _______, KC_F11,                    KC_F12,  _______, _______, _______, _______, _______,
        ____TRANS_6_________________________________________,                   ____TRANS_6_________________________________________,
        ____TRANS_6_________________________________________, _______, _______, ____TRANS_6_________________________________________,
                          ____TRANS_10____________________________________________________________________________
    ),
    [OVERLAY_MOUSE] = LAYOUT_MACRO(
        ____TRANS_6_________________________________________,                   ____TRANS_6_________________________________________,
        ____TRANS_6_________________________________________,                   MS_BTN1, MS_WHLD, MS_WHLU, MS_BTN2, _______, _______,
        ____TRANS_6_________________________________________,                   MS_LEFT, MS_DOWN, MS_UP,   MS_RGHT, _______, _______,
        _______, _______, C(KC_X), C(KC_C), C(KC_V), _______, _______, _______, ____TRANS_6_________________________________________,
                          _______, _______, _______, _______, MS_ACL0, MS_ACL2, _______, _______, _______, _______
    ),
    [TOGGLE] = LAYOUT_MACRO(
        CK_REST, CK_FKEY, CK_NKEY, CK_MOUS, XXXXXXX, SH_TOGG,                   DF_COLE, DF_GAME, DF_QWER, XXXXXXX, XXXXXXX, CK_REST,
        XXXXXXX, DF_QWER, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX,                   ____XXXXX_6_________________________________________,
        XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, CK_FKEY, DF_GAME,                   ____XXXXX_6_________________________________________,
        XXXXXXX, XXXXXXX, DF_COLE, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, CK_NKEY, CK_MOUS, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX,
                          XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX
    ),
    [L1_NAV] = LAYOUT_MACRO(
        KC_ESC,  KC_EXLM, KC_AT,   KC_HASH, KC_DLR,  KC_PERC,                   KC_CIRC, KC_AMPR, KC_ASTR, KC_UNDS, KC_MINS, KC_EQL,
        KC_INS,  _______, _______, _______, _______, KC_CAPS,                   KC_HOME, KC_END,  S(KC_9), S(KC_0), KC_LBRC, KC_RBRC,
        KC_DEL,  _______, _______, _______, _______, KC_NUM,                    KC_LEFT, KC_DOWN, KC_UP,   KC_RGHT, KC_LCBR, KC_RCBR,
        ____TRANS_6_________________________________________, _______, _______, CC_LEFT, KC_PGDN, KC_PGUP, CC_RIGH, LSFT(KC_SLSH), LSFT(KC_QUOT),
                          ____TRANS_10____________________________________________________________________________
    ),
    [L2] = LAYOUT_MACRO(
        ____FUNC_LEFT_5____________________________, KC_F6,                     _______, KC_NUM,  KC_PAST, KC_LGUI, KC_UNDS, KC_PLUS,
        KC_F7,   KC_F8,   KC_F9,   KC_F10,  KC_F11,  KC_F12,                    KC_PGUP, KC_P7,   KC_P8,   KC_P9,   KC_LCTL, DA_AA,
        ____TRANS_6_________________________________________,                   KC_B,    _______, _______, KC_W,    DA_OE,   DA_AE,
        _______, LC_Z,    LC_X,    LC_C,    LC_V ,   _______, _______, _______, UM(CAT), KC_P1,   UC_PREV, UC_NEXT, KC_PEQL, _______,
                          KC_PENT, _______, _______, _______, _______, _______, _______, UM(SMILE), UM(UPSIDE), _______
    ),
    [L3] = LAYOUT_MACRO(
        TG(0),   ____TRANS_5________________________________,                   BL_STEP, BL_UP,   BL_DOWN, BL_BRTG, _______, BL_TOGG,
        ____TRANS_6_________________________________________,                   ____TRANS_6_________________________________________,
        _______, RM_TOGG, RM_HUEU, RM_SATU, RM_VALU, _______,                   UG_PREV, UG_HUEU, UG_HUED, UG_NEXT, _______, UG_TOGG,
        _______, RM_NEXT, RM_HUED, RM_SATD, RM_VALD, _______, _______, KC_NO,   RM_PREV, RM_SATU, RM_SATD, RM_NEXT, _______, RM_TOGG,
                          _______, _______, _______, _______, DF(0),   _______, KC_LGUI, _______, _______, _______
    ),
    [L4] = LAYOUT_MACRO(
        TO(0),   TG(1),   TG(2),   TG(3),   TG(4),   TG(5),                     _______, _______, _______, _______, DB_TOGG, QK_BOOT,
        _______, _______, UC_WIN,  _______, _______, _______,                   _______, _______, _______, _______, EE_CLR,  CK_FLAS,
        ____TRANS_6_________________________________________,                   _______, _______, _______, _______, _______, CK_CONS,
        ____TRANS_6_________________________________________, _______, _______, _______, _______, _______, _______, _______, CK_LINT,
                          _______, _______, _______, _______, DF(0),   _______, _______, _______, _______, _______
    ),
    [L5] = LAYOUT_MACRO(
        KC_ESC,  ____QWERTY_NUM_LEFT________________________,                   ____QWERTY_NUM_RIGHT_______________________, KC_BSPC,
        KC_TAB,  ____QWERTY_LEFT_1__________________________,                   ____QWERTY_RIGHT_1_________________________, KC_BSLS,
        KC_LSFT, ____QWERTY_LEFT_2__________________________,                   ____QWERTY_RIGHT_2_________________________, SC_SENT,
        KC_LCTL, ____QWERTY_LEFT_3__________________________, KC_MUTE, KC_NO,   ____QWERTY_RIGHT_3_________________________, KC_RCTL,
                          ____TRANS_10____________________________________________________________________________
    )
};

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
    QW_ESC,
    AS_TAB,
    OP_BACKSPACE,
    IO_DEL,
    LSEMI_ENTER,
    DOTSLASH_BACKSLASH,
    ZERO_BACKSPACE,
    CAPS_WORD,
    MINUS,
    TOGGLE_LAYER
};

const uint16_t PROGMEM qw_esc[] = {KC_Q, KC_W, COMBO_END};
const uint16_t PROGMEM as_tab[] = {KC_A, KC_S, COMBO_END};

const uint16_t PROGMEM op_backspace[]       = {KC_O, KC_P, COMBO_END};
const uint16_t PROGMEM io_del[]             = {KC_I, KC_O, COMBO_END};
const uint16_t PROGMEM lsemi_enter[]        = {KC_L, KC_SCLN, COMBO_END};
const uint16_t PROGMEM dotslash_backslash[] = {KC_DOT, KC_SLSH, COMBO_END};
const uint16_t PROGMEM zero_backspace[]     = {KC_0, KC_BSPC, COMBO_END};
const uint16_t PROGMEM caps_word[]          = {KC_LSFT, KC_BSPC, COMBO_END};
const uint16_t PROGMEM zero_nine[]          = {KC_0, KC_9, COMBO_END};

const uint16_t PROGMEM toggle_layer[] = {D_L1, D_L4, COMBO_END};

combo_t key_combos[] = {
    [QW_ESC] = COMBO(qw_esc, KC_ESC),
    [AS_TAB] = COMBO(as_tab, KC_TAB),
    [OP_BACKSPACE] = COMBO(op_backspace, KC_BSPC),
    [IO_DEL] = COMBO(io_del, KC_DEL),
    [LSEMI_ENTER] = COMBO(lsemi_enter, KC_ENT),
    [DOTSLASH_BACKSLASH] = COMBO(dotslash_backslash, KC_BSLS),
    [ZERO_BACKSPACE] = COMBO(zero_backspace, KC_PLUS),
    [CAPS_WORD] = COMBO(caps_word, CK_CAPS),
    [MINUS] = COMBO(zero_nine, KC_MINUS),
    [TOGGLE_LAYER] = COMBO(toggle_layer, LT(TOGGLE, KC_NO))
};

#endif // COMBO_ENABLE
