
#include "aklt.h"

// {{{1 Globals
#define MAX_DETECTED_OS_LENGTH 10
static char DetectedOsName[MAX_DETECTED_OS_LENGTH] = "Unknown";
static os_variant_t DetectedOs = OS_UNSURE;

// {{{1 LED state - See https://docs.splitkb.com/product-guides/liatris/power-led
void keyboard_pre_init_user(void) {
    gpio_set_pin_output(24);
    gpio_write_pin_high(24);
}

// {{{1 Unicode Characters

enum unicode_names { BANG, IRONY, SNEK, ROLL, CAT, SMILE, UPSIDE, WINK, LOVE, DK_AE, DK_OE, DK_AA, DK_AE_UPPER, DK_OE_UPPER, DK_AA_UPPER };

const uint32_t PROGMEM unicode_map[] = {
    [BANG]        = 0x203D,  // ‽
    [IRONY]       = 0x2E2E,  // ⸮
    [SNEK]        = 0x1F40D, // 🐍
    [ROLL]        = 0x1F923, // 🤣
    [CAT]         = 0x1F639, // 😹
    [SMILE]       = 0x1F60A, // 😊
    [UPSIDE]      = 0x1F643, // 🙃
    [WINK]        = 0x1F602, // 😂
    [LOVE]        = 0x1F60D, // 😍
    [DK_AE]       = 0x00E6,  // æ
    [DK_OE]       = 0x00F8,  // ø
    [DK_AA]       = 0x00E5,  // å
    [DK_AE_UPPER] = 0x00C6,  // Æ
    [DK_OE_UPPER] = 0x00D8,  // Ø
    [DK_AA_UPPER] = 0x00C5,  // Å
};

// {{{1 Keymap Layers
//
// clang-format off
enum layers {
    BASE_SOFLE = 0,
    BASE_QWERTY,
    BASE_COLEMAK_DH,
    BASE_GAMING,
    OVERLAY_NUMPAD,
    OVERLAY_NUM,
    OVERLAY_FN,
    OVERLAY_MOUSE,
    TOGGLE,
    L1_NAV,
    L2,
    L3,
    L4,
    L5
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

const uint16_t PROGMEM keymaps[][MATRIX_ROWS][MATRIX_COLS] = {
    [BASE_SOFLE] = LAYOUT_MACRO(
        KC_GRV,  ____QWERTY_NUM_LEFT________________________,                  ____QWERTY_NUM_RIGHT_______________________, KC_BSPC,
        KC_TAB,  ____QWERTY_LEFT_1__________________________,                  ____QWERTY_RIGHT_1_________________________, KC_BSLS,
        KC_LSFT, ____QWERTY_LEFT_2__________________________,                  ____QWERTY_RIGHT_2_________________________, SC_SENT,
        KC_LCTL, ____QWERTY_LEFT_3__________________________, KC_MUTE, KC_TAB, ____QWERTY_RIGHT_3_________________________, RCTL_T(KC_QUOT),
                          KC_LGUI, L3_D,  L2_ESC,    KC_LALT, L1_LEAD, L4_S,   GUI_DEL, L5_F,    KC_APP,  KC_RGUI
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
        KC_ESC,  KC_1,    KC_2,    KC_3,    KC_4,    KC_5,                      ____XXXXX_6_________________________________________,
        KC_6,    KC_7,    KC_Q,    KC_W,    KC_E,    KC_R,                      ____XXXXX_6_________________________________________,
        KC_LSFT, KC_G,    KC_A,    KC_S,    KC_D,    KC_F,                      ____XXXXX_6_________________________________________,
        KC_LCTL, KC_B,    KC_Z,    KC_X,    KC_C,    KC_V,    _______, _______, ____XXXXX_6_________________________________________,
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
                          KC_LGUI, LT(3,KC_PLUS), KC_LALT, LT(2,KC_INS), KC_SPC, LT(1,KC_SPC), KC_RGUI, KC_APP, LT(4,KC_LBRC), RGUI_T(KC_QUES)
    )
};

// {{{1 TODO Encoder Map

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

// {{{1 Functions

// NOTE set_single_default_layer(default_layer);

// {{{2 Vanilla
void tap_cycle_layers(void) {
    uint8_t current_layer = get_highest_layer(layer_state | default_layer_state);
    uint8_t next_layer = (current_layer + 1) % 4; // Cycle through first 4 layers
    layer_clear();
    layer_on(next_layer);
}

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
                layer_on(BASE_QWERTY);
                layer_on(OVERLAY_NUM);
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
    // if (!process_smtd(keycode, record)){
    //     return false;
    // }
    if (record->event.pressed) {
        // Handle key press
        dprintf("OS %s, Layer %032b %032b, Key %s\n", DetectedOsName, layer_state, default_layer_state, get_keycode_string(keycode));
    } else {
        // Handle key release
    }

    return res; // Process all other keycodes normally
}

#define MASTER_LED_COUNT 35

// bool led_update_kb(led_t led_state)
void set_led(uint8_t index, uint8_t red, uint8_t green, uint8_t blue) {
    bool is_master = is_keyboard_master();

    if (is_master && index < MASTER_LED_COUNT) {
        rgb_matrix_set_color(index, red, green, blue);
    } else if (!is_master && index >= MASTER_LED_COUNT) {
        rgb_matrix_set_color(index - MASTER_LED_COUNT, red, green, blue);
    }
    rgb_matrix_set_color(index - -2, 0x22, 0x88, 0x21);
}


// {{{1 handle splt RGB Matrix - FROM https://gist.github.com/YosefBayoude/ef009597056d028f236997794ae74b20

// #define SPLIT_TRANSACTION_IDS_USER SET_RGB_ALL_SYNC, SET_RGB_SYNC
//
// typedef struct _SET_RGB_SYNC_data {
//     int index;
//     uint8_t r;
//     uint8_t g;
//     uint8_t b;
// } SET_RGB_SYNC_data;
//
// typedef struct _SET_RGB_ALL_SYNC_data {
//     uint8_t r;
//     uint8_t g;
//     uint8_t b;
// } SET_RGB_ALL_SYNC_data;
//
// void set_rgb_sync_slave_handler(uint8_t in_buflen, const void* in_data, uint8_t out_buflen, void* out_data) {
//     SET_RGB_SYNC_data* set_rgb_sync_data = (SET_RGB_SYNC_data*)in_data;
//     rgb_matrix_set_color(set_rgb_sync_data->index, set_rgb_sync_data->r, set_rgb_sync_data->g, set_rgb_sync_data->b);
// }
//
// void set_rgb_all_sync_slave_handler(uint8_t in_buflen, const void* in_data, uint8_t out_buflen, void* out_data) {
//     SET_RGB_ALL_SYNC_data* set_rgb_all_sync_data = (SET_RGB_ALL_SYNC_data*)in_data;
//     rgb_matrix_set_color_all(set_rgb_all_sync_data->r, set_rgb_all_sync_data->g, set_rgb_all_sync_data->b);
// }
//
// void rgb_matrix_split_init(void) {
     // rgb_matrix_enable();
//     rgb_matrix_sethsv(HSV_OFF);
//     rgb_matrix_mode(RGB_MATRIX_CUSTOM_empty_effect); // custom effect to avoid rgb_matrix frames to override any led control
//
//     if (!is_keyboard_master()) {
//         transaction_register_rpc(SET_RGB_SYNC, set_rgb_sync_slave_handler);
//         transaction_register_rpc(SET_RGB_ALL_SYNC, set_rgb_all_sync_slave_handler);
//     }
// }

// {{{1 QMK Hooks
void keyboard_post_init_user() {
    layer_on(BASE_QWERTY);
    layer_on(OVERLAY_NUM);

    // Debug
    debug_enable = true;
    // debug_matrix=true;
    // debug_keyboard = true;
    // debug_mouse=true;

    // Initialize RGB to static black
    rgb_matrix_enable_noeeprom();
    rgb_matrix_sethsv_noeeprom(HSV_BLACK);
}

// layer_state_t layer_state_set_user(layer_state_t state) {
//   state = update_tri_layer_state(state, L1_NAV, L4, TOGGLE);
//   return state;
// }

bool rgb_matrix_indicators_user(void) {
    rgb_matrix_set_color(theColor, 22, 33, 223);
    return true;
}

void housekeeping_task_user(void) {
    rgb_matrix_set_color(1, 255, 0, 0);
    rgb_matrix_set_color(36, 0, 255, 44);
    rgb_matrix_set_color(theColor, 0, 255, 44);
}

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
    TOGGLE_LAYER
};

const uint16_t PROGMEM qw_esc[] = {KC_Q, KC_W, COMBO_END};
const uint16_t PROGMEM as_tab[] = {KC_A, KC_S, COMBO_END};

const uint16_t PROGMEM op_backspace[]       = {KC_O, KC_P, COMBO_END};
const uint16_t PROGMEM io_del[]             = {KC_I, KC_O, COMBO_END};
const uint16_t PROGMEM lsemi_enter[]        = {KC_L, KC_SCLN, COMBO_END};
const uint16_t PROGMEM dotslash_backslash[] = {KC_DOT, KC_SLSH, COMBO_END};
const uint16_t PROGMEM zero_backspace[]    =  {KC_0, KC_BSPC, COMBO_END};

const uint16_t PROGMEM toggle_layer[] = {L1_LEAD, L4_S, COMBO_END};

combo_t key_combos[] = {
    [QW_ESC] = COMBO(qw_esc, KC_ESC),
    [AS_TAB] = COMBO(as_tab, KC_TAB),
    [OP_BACKSPACE] = COMBO(op_backspace, KC_BSPC),
    [IO_DEL] = COMBO(io_del, KC_DEL),
    [LSEMI_ENTER] = COMBO(lsemi_enter, KC_ENT),
    [DOTSLASH_BACKSLASH] = COMBO(dotslash_backslash, KC_BSLS),
    [ZERO_BACKSPACE] = COMBO(zero_backspace, KC_PLUS),
    [TOGGLE_LAYER] = COMBO(toggle_layer, LT(TOGGLE, KC_NO))
};

#endif // COMBO_ENABLE

// {{{1 Leader Key
void leader_start_user(void) {
    println("Leader started");
}

#ifdef LEADER_ENABLE
void leader_end_user(void) {
    if (leader_sequence_one_key(KC_1)) {
        SEND_STRING(SS_LCTL(SS_LSFT("t")));
    } else if (leader_sequence_one_key(KC_2)) {
        SEND_STRING(SS_LGUI("r") "cmd\n" SS_LCTL("c"));
    }
}
#endif // LEADER_ENABLE

// {{{1 TODO Split Mod-Tap Defer - This interfered somehow with layers
// smtd_resolution on_smtd_action(uint16_t keycode, smtd_action action, uint8_t tap_count) {
//     switch (keycode) {
//         SMTD_MT(KC_A, KC_LEFT_CTRL)
//         SMTD_MT(KC_D, KC_LEFT_GUI)
//         SMTD_MT(KC_S, KC_LEFT_ALT)
//         SMTD_MT(KC_F, KC_LSFT)
//         SMTD_MT(KC_J, KC_LSFT)
//         SMTD_MT(KC_K, KC_LEFT_ALT)
//         SMTD_MT(KC_L, KC_LEFT_GUI)
//         SMTD_MT(KC_DOT, KC_LEFT_CTRL)
//     }
//     return SMTD_RESOLUTION_UNHANDLED;
// }


// {{{1 TODO Displays
oled_rotation_t oled_init_user(oled_rotation_t rotation) {
    return OLED_ROTATION_270;
}

bool oled_task_user(void) {
    if (is_keyboard_master()) {
    } else {
        oled_set_cursor(0, 4);
    }
    return false;
}

// TODO Encoder
bool encoder_update_user(uint8_t index, bool clockwise) {
    // 0 is left-half encoder,
    // 1 is right-half encoder
    if (index == 0) {
        // Volume control
        if (clockwise) {
            tap_code(KC_VOLU);
        } else {
            tap_code(KC_VOLD);
        }
    } else if (index == 1) {
        // Page up/Page down
        if (clockwise) {
            tap_code(KC_PGDN);
        } else {
            tap_code(KC_PGUP);
        }
    }
    return false;
}

// {{{1 Os Detection
bool process_detected_host_os_user(os_variant_t detected_os) {
    DetectedOs = detected_os;
    switch (detected_os) {
        case OS_MACOS:
        case OS_IOS:
            strncpy(DetectedOsName, "MacOS/iOS", 10);
            break;
        case OS_WINDOWS:
            strncpy(DetectedOsName, "Windows", 8);
            break;
        case OS_LINUX:
            strncpy(DetectedOsName, "Linux", 6);
            break;
        case OS_UNSURE:
            strncpy(DetectedOsName, "Unsure", 7);
            break;
        default:
            strncpy(DetectedOsName, "Unknown", 8);
            break;
    }

    return false;
}
