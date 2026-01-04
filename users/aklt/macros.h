#ifndef LAYOUT_MACRO_H
#define LAYOUT_MACRO_H

#include QMK_KEYBOARD_H

/*
[BASE_SOFLE] = LAYOUT(
    _______, _______, _______, _______, _______, _______,                   _______, _______, _______, _______, _______, _______,
    _______, _______, _______, _______, _______, _______,                   _______, _______, _______, _______, _______, _______,
    _______, _______, _______, _______, _______, _______,                   _______, _______, _______, _______, _______, _______,
    _______, _______, _______, _______, _______, _______, _______, _______, _______, _______, _______, _______, _______, _______,
                      _______, _______, _______, _______, _______, _______, _______, _______, _______, _______
),
*/

// Expand nested macros before passing to LAYOUT
// Idea: https://github.com/drashna/qmk_userspace/blob/master/users/drashna/keyrecords/wrappers.h
#define LAYOUT_MACRO(...) LAYOUT_MACRO_EXPAND(__VA_ARGS__)
#define LAYOUT_MACRO_EXPAND(...) LAYOUT(__VA_ARGS__)

// Default layers
#define DF_GAME DF(BASE_GAMING)
#define DF_QWER DF(BASE_QWERTY)
#define DF_COLE DF(BASE_COLEMAK_DH)

// Toggle layers
#define CK_MOUS TG(OVERLAY_MOUSE)
#define CK_NKEY TG(OVERLAY_NUMPAD)
#define CK_FKEY TG(OVERLAY_FN)

#define L1_LEAD LT(L1_NAV, KC_ENT)
#define L2_ESC  LT(L2, KC_ESC)
#define L3_D    LT(L3, KC_DEL)
#define L4_S    LT(L4, KC_SPC)
#define L5_F    LT(L5)

#define GUI_DEL    MT(MOD_LGUI, KC_DEL)

#define LC_Z LCTL(KC_Z)
#define LC_X LCTL(KC_X)
#define LC_C LCTL(KC_C)
#define LC_V LCTL(KC_V)

#define DA_AE UP(DK_AE, DK_AE_UPPER)
#define DA_OE UP(DK_OE, DK_OE_UPPER)
#define DA_AA UP(DK_AA, DK_AA_UPPER)

#define CC_UP C(KC_UP)
#define CC_DOWN C(KC_DOWN)
#define CC_LEFT C(KC_LEFT)
#define CC_RIGH C(KC_RIGHT)

// Number rows
#define ____QWERTY_NUM_LEFT________________________ KC_1,   KC_2,  KC_3,    KC_4,    KC_5
#define ____QWERTY_NUM_RIGHT_______________________ KC_6,   KC_7,  KC_8,    KC_9,    KC_0

// QWERTY layout
#define ____QWERTY_LEFT_1__________________________ KC_Q,   KC_W,  KC_E,    KC_R,    KC_T
#define ____QWERTY_LEFT_2__________________________ KC_A,   KC_S,  KC_D,    KC_F,    KC_G
#define ____QWERTY_LEFT_3__________________________ KC_Z,   KC_X,  KC_C,    KC_V,    KC_B

#define ____QWERTY_RIGHT_1_________________________ KC_Y,   KC_U,  KC_I,    KC_O,    KC_P
#define ____QWERTY_RIGHT_2_________________________ KC_H,   KC_J,  KC_K,    KC_L,    KC_SCLN
#define ____QWERTY_RIGHT_3_________________________ KC_N,   KC_M,  KC_COMM, KC_DOT,  KC_SLSH

// Colemak-DH layout
#define ____COLEMAK_LEFT_1_________________________ KC_Q,   KC_W,  KC_F,    KC_P,    KC_B
#define ____COLEMAK_LEFT_2_________________________ KC_A,   KC_R,  KC_S,    KC_T,    KC_G
#define ____COLEMAK_LEFT_3_________________________ KC_Z,   KC_X,  KC_C,    KC_D,    KC_V

#define ____COLEMAK_RIGHT_1________________________ KC_J,   KC_L,  KC_U,    KC_Y,    KC_SCLN
#define ____COLEMAK_RIGHT_2________________________ KC_M,   KC_N,  KC_E,    KC_I,    KC_O
#define ____COLEMAK_RIGHT_3________________________ KC_K,   KC_H,  KC_COMM, KC_DOT,  KC_SLSH

// Function keys
#define ____FUNC_LEFT_5____________________________ KC_F1,  KC_F2, KC_F3,   KC_F4,   KC_F5
#define ____FUNC_RIGHT_5___________________________ KC_F6,  KC_F7, KC_F8,   KC_F9,   KC_F10

// Transparent rows
#define ____TRANS_5________________________________ \
        _______, _______, _______, _______, _______
#define ____TRANS_6_________________________________________ \
        _______, _______, _______, _______, _______, _______
#define ____TRANS_10____________________________________________________________________________ \
        _______, _______, _______, _______, _______, _______, _______, _______, _______, _______

// Blocked rows
#define ____XXXXX_5________________________________ \
        XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX
#define ____XXXXX_6_________________________________________ \
        XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX

#endif // LAYOUT_MACRO_H
