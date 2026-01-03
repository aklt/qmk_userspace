#include QMK_KEYBOARD_H

#include "quantum.h"

#if __has_include("keymap.h")
#    include "keymap.h"
#endif

// {{{1 LED state - See https://docs.splitkb.com/product-guides/liatris/power-led
void keyboard_pre_init_user(void) {
    gpio_set_pin_output(24);
    gpio_write_pin_high(24);
}

// {{{1 Keymap Layers
//
// clang-format off
enum layers {
    BASE_SOFLE = 0,
    OVERLAY_NUMPAD,
};

enum custom_keycodes {
    C_1 = QK_USER,
    CK_REST,           // Reset Layout
    CK_COLO,           // color toggle
    CK_FLAS,           // bootloader
    CK_CONS,           // console
    CK_LINT,           // lint
    NOT_A_KEY,
};

// Default layers
#define DF_BASE DF(BASE_SOFLE)

// Toggle
#define L1_LEAD LT(OVERLAY_NUMPAD, KC_ENT)

#define GUI_ESC    MT(MOD_LGUI, KC_ESC)

#define CC_UP C(KC_UP)
#define CC_DOWN C(KC_DOWN)
#define CC_LEFT C(KC_LEFT)
#define CC_RIGH C(KC_RIGHT)


const uint16_t PROGMEM keymaps[][MATRIX_ROWS][MATRIX_COLS] = {
    [BASE_SOFLE] = LAYOUT(
        KC_GRV,  KC_1,    KC_2,    KC_3,    KC_4,    KC_5,                      KC_6,    KC_7,    KC_8,    KC_9,    KC_0,    KC_BSPC,
        KC_TAB,  KC_Q,    KC_W,    KC_E,    KC_R,    KC_T,                      KC_Y,    KC_U,    KC_I,    KC_O,    KC_P,    KC_BSLS,
        KC_LSFT, KC_A,    KC_S,    KC_D,    KC_F,    KC_G,                      KC_H,    KC_J,    KC_K,    KC_L,    KC_SCLN, SC_SENT,
        KC_LCTL, KC_Z,    KC_X,    KC_C,    KC_V,    KC_B,    KC_MUTE, KC_TAB,  KC_N,    KC_M,    KC_COMM, KC_DOT,  KC_SLSH, RCTL_T(KC_QUOT),
                          KC_LGUI, KC_LALT, KC_ESC,  KC_ENT,  L1_LEAD, KC_SPACE,GUI_ESC, KC_TAB,  KC_APP,  KC_RGUI
    ),
    [OVERLAY_NUMPAD] = LAYOUT(
        KC_ESC,  KC_EXLM, KC_AT,   KC_HASH, KC_DLR,  KC_PERC,                   CK_COLO, KC_AMPR, KC_ASTR, KC_UNDS, KC_MINS, KC_EQL,
        KC_INS,  _______, _______, _______, _______, KC_CAPS,                   KC_HOME, KC_END,  S(KC_9), S(KC_0), KC_LBRC, KC_RBRC,
        KC_DEL,  _______, _______, _______, _______, KC_NUM,                    KC_LEFT, KC_DOWN, KC_UP,   KC_RGHT, KC_LCBR, KC_RCBR,
        CK_COLO, _______, _______, _______, _______, KC_SCRL, _______, _______, CC_LEFT, KC_PGDN, KC_PGUP, CC_RIGH, LSFT(KC_SLSH), LSFT(KC_QUOT),
                          _______, _______, _______, _______, _______, _______, _______, _______, _______, _______
    )
};


// {{{1 Functions

static uint8_t theColor = -10;
// static uint8_t colorIndex = 1;

// hkeyboards/splitkb/aurora/sofle_v2/keymaps/aklt_keymap/README.mdttps://docs.qmk.fm/understanding_qmk#process-record
bool process_record_user(uint16_t keycode, keyrecord_t *record) {
    layer_debug();
    bool res = true;
    switch (keycode) {
        case CK_REST:
            if (record->event.pressed) {
                layer_clear();
                set_single_default_layer(BASE_SOFLE);
                layer_on(BASE_SOFLE);
                res = false;
            }
            break;
        case CK_COLO:
            if (record->event.pressed) {
                theColor = (theColor + 1) % 100;
                res = false;
            }
            break;
        case CK_FLAS:
            if (record->event.pressed) {
                SEND_STRING("qmk flash --keyboard splitkb/aurora/sofle_v2 --keymap aklt\n");
                res = false;
            }
            break;
        case CK_LINT:
            if (record->event.pressed) {
                SEND_STRING("qmk lint\n");
                res = false;
            }
            break;
        case CK_CONS:
            if (record->event.pressed) {
                SEND_STRING("qmk console");
                res = false;
            }
            break;
        case NOT_A_KEY:
            // TODO sm_td avoid unused variable error from sm_td
            // LAYER_PUSH(100)
            // LAYER_RESTORE()
            res = false;
            break;
        default:
            break;
    }
    if (record->event.pressed) {
        // Handle key press
        dprintf("Layer %032b %032b\n", layer_state, default_layer_state);
    } else {
        // Handle key release
    }

    return res; // Process all other keycodes normally
}


// {{{1 QMK Hooks
void keyboard_post_init_user() {
    layer_on(BASE_SOFLE);

    // Debug
    debug_enable = true;
    // debug_matrix=true;
    // debug_keyboard = true;
    // debug_mouse=true;

    // Initialize RGB to static black
    rgb_matrix_enable_noeeprom();
    rgb_matrix_sethsv_noeeprom(HSV_BLACK);
}

bool rgb_matrix_indicators_user(void) {
    rgb_matrix_set_color(theColor, 22, 33, 223);
    return true;
}

void housekeeping_task_user(void) {
    rgb_matrix_set_color(1, 255, 0, 0);
    rgb_matrix_set_color(36, 0, 255, 44);
    rgb_matrix_set_color(theColor, 0, 255, 44);
}

