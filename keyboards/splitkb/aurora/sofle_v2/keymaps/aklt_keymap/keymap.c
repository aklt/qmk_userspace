#include QMK_KEYBOARD_H
#if __has_include("keymap.h")
#    include "keymap.h"
#endif

// {{{1 LED state - See https://docs.splitkb.com/product-guides/liatris/power-led
void keyboard_pre_init_user(void) {
    gpio_set_pin_output(24);
    gpio_write_pin_high(24);
}

// {{{1 Unicode Characters

enum unicode_names {
    BANG,
    IRONY,
    SNEK,
    ROLL,
    CAT,
    SMILE,
    UPSIDE,
    WINK,
    LOVE,
    DK_AE,
    DK_OE,
    DK_AA,
    DK_AE_UPPER,
    DK_OE_UPPER,
    DK_AA_UPPER
};

const uint32_t PROGMEM unicode_map[] = {
    [BANG]    = 0x203D,  // ‽
    [IRONY]   = 0x2E2E,  // ⸮
    [SNEK]    = 0x1F40D, // 🐍
    [ROLL]    = 0x1F923, // 🤣
    [CAT]     = 0x1F639, // 😹
    [SMILE]   = 0x1F60A, // 😊
    [UPSIDE]  = 0x1F643, // 🙃
    [WINK]    = 0x1F602, // 😂
    [LOVE]    = 0x1F60D, // 😍
    [DK_AE]   = 0x00E6,  // æ
    [DK_OE]   = 0x00F8,  // ø
    [DK_AA]   = 0x00E5,  // å
    [DK_AE_UPPER]   = 0x00C6,  // Æ
    [DK_OE_UPPER]   = 0x00D8,  // Ø
    [DK_AA_UPPER]   = 0x00C5,  // Å
};

// {{{1 Combos

enum combos {
    LSEMI_ENTER,
    QW_ESC,
};

const uint16_t PROGMEM lsemi_enter[] = {KC_L, KC_SCLN, COMBO_END};
const uint16_t PROGMEM qw_esc[] = {KC_Q, KC_W, COMBO_END};

combo_t key_combos[] = {
    [LSEMI_ENTER] = COMBO(lsemi_enter, KC_ENT),
    [QW_ESC] = COMBO(qw_esc, KC_ESC),
};


// {{{1 Debug
void keyboard_post_init_user() {
  // Debug
  // debug_enable=true;
  // debug_matrix=true;
  // debug_keyboard=true;
  // debug_mouse=true;

  // Initialize RGB to static black
  // rgblight_enable_noeeprom();
  // rgblight_sethsv_noeeprom(HSV_BLACK);
  // rgblight_mode_noeeprom(RGBLIGHT_MODE_STATIC_LIGHT);
}

// void housekeeping_task_user(void) {
//     switch (get_highest_layer(layer_state | default_layer_state)) {
//         case 0:
//             // Default layer
//             rgblight_setrgb_at(RGB_BLACK, 0);
//             break;
//         case 1:
//             rgblight_setrgb_at(RGB_RED, 0);
//             break;
//         case 2:
//             rgblight_setrgb_at(RGB_GREEN, 0);
//             break;
//         case 3:
//             rgblight_setrgb_at(RGB_BLUE, 0);
//             break;
//     }
// }
// {{{1 Generated layout

#include "sofle-layout.h"

/*
const uint16_t PROGMEM keymaps[][MATRIX_ROWS][MATRIX_COLS] = {
    [0] = LAYOUT(KC_GRV,   KC_1,    KC_2,    KC_3,     KC_4,      KC_5,                       KC_6,    KC_7,    KC_8,    KC_9,    KC_0,    KC_BSPC,
                 KC_TAB,   KC_Q,    KC_W,    KC_E,     KC_R,      KC_T,                       KC_Y,    KC_U,    KC_I,    KC_O,    KC_P,    KC_BSLS,
                 KC_LSFT,  KC_A,    KC_S,    KC_D,     KC_F,      KC_G,                       KC_H,    KC_J,    KC_K,    KC_L,    KC_SCLN, KC_QUOT,
                 KC_LCTL,  KC_Z,    KC_X,    KC_C,     KC_V,      KC_B,    KC_MUTE, XXXXXXX,  KC_N,    KC_M,    KC_COMM, KC_DOT,  KC_SLSH, KC_RSFT,
                           KC_LGUI, KC_LALT, KC_LCTL,  SC_SENT,    MO(1),                      KC_SPC,  MO(2),   KC_RCTL, KC_RALT, KC_RGUI),

    [1] = LAYOUT(_______, KC_F1,   KC_F2,   KC_F3,   KC_F4,      KC_F5,                      KC_F6,   KC_F7,   KC_F8,   KC_F9,   KC_F10,   KC_F11,
                 KC_GRV,  KC_1,    KC_2,    KC_3,    KC_4,       KC_5,                       KC_6,    KC_7,    KC_8,    KC_9,    KC_0,     KC_F12,
                 _______, KC_EXLM, KC_AT,   KC_HASH, KC_DLR,     KC_PERC,                    KC_HOME, KC_LEFT, KC_DOWN, KC_UP,   KC_RIGHT, KC_END,
                 _______, KC_EQL,  KC_MINS, KC_PLUS, KC_LCBR,    KC_RCBR, _______, _______,  KC_LBRC, KC_RBRC, KC_SCLN, KC_COLN, KC_BSLS,  _______,
                          _______, _______, _______, _______,    _______,                    _______, MO(3),   _______, _______, _______),

    [2] = LAYOUT(KC_ESC, UM(BANG), UM(IRONY), UM(ROLL), UM(SMILE), UM(UPSIDE),              UM(WINK),   UM(LOVE),  KC_X,    KC_F9,   UC_PREV, UC_NEXT,
                 KC_GRV,  KC_1,    KC_2,    KC_3,    KC_4,       KC_5,                       KC_6,    KC_7,    KC_8,    KC_9,    KC_0,    KC_F12,
                 _______, KC_EXLM, KC_AT,   KC_HASH, KC_DLR,     KC_PERC,                    KC_CIRC, KC_AMPR, KC_ASTR, KC_LPRN, KC_RPRN, KC_PIPE,
                 _______, KC_EQL,  KC_MINS, KC_PLUS, KC_LCBR,    KC_RCBR, _______, _______,  KC_LBRC, KC_RBRC, KC_SCLN, KC_COLN, KC_BSLS, _______,
                          _______, _______, _______, _______,    _______,                    _______, MO(1),   _______, _______, _______),

    [3] = LAYOUT(XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, RGB_TOG, RGB_HUI, RGB_SAI, RGB_VAI, XXXXXXX, XXXXXXX, KC_VOLD, KC_MUTE, KC_VOLU, XXXXXXX, XXXXXXX, XXXXXXX, RGB_MOD, RGB_HUD, RGB_SAD, RGB_VAD, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, KC_MPRV, KC_MPLY, KC_MNXT, XXXXXXX, XXXXXXX, _______, _______, _______, _______, _______, _______, _______, _______, _______, _______)
};


#if defined(ENCODER_ENABLE) && defined(ENCODER_MAP_ENABLE)
const uint16_t PROGMEM encoder_map[][NUM_ENCODERS][NUM_DIRECTIONS] = {
    [0] = {ENCODER_CCW_CW(KC_VOLD, KC_VOLU), ENCODER_CCW_CW(KC_PGUP, KC_PGDN)},
    [1] = {ENCODER_CCW_CW(KC_VOLD, KC_VOLU), ENCODER_CCW_CW(KC_PGUP, KC_PGDN)},
    [2] = {ENCODER_CCW_CW(KC_VOLD, KC_VOLU), ENCODER_CCW_CW(KC_PGUP, KC_PGDN)},
    [3] = {ENCODER_CCW_CW(KC_VOLD, KC_VOLU), ENCODER_CCW_CW(KC_PGUP, KC_PGDN)}
};
#endif // defined(ENCODER_ENABLE) && defined(ENCODER_MAP_ENABLE)

*/
