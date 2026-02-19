#include "aklt.h"

// {{{1 Unicode Map
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

// {{{1 Globals
static char         DetectedOsName[MAX_DETECTED_OS_LENGTH] = "Unknown";
static os_variant_t DetectedOs                             = OS_UNSURE;
static uint8_t      theColor                               = -10;

// {{{1 QMK Hooks
// LED state - See https://docs.splitkb.com/product-guides/liatris/power-led
void keyboard_pre_init_user(void) {
    gpio_set_pin_output(24);
    gpio_write_pin_high(24);
}

void keyboard_post_init_user(void) {
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

// {{{1 Process Record
// https://docs.qmk.fm/understanding_qmk#process-record
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
                res      = false;
            }
            break;
        case CK_FLAS:
            if (record->event.pressed) {
                SEND_STRING("qmk flash --keyboard splitkb/aurora/sofle_v2/rev1 --keymap aklt\n");
                res = false;
            }
            break;
        case CK_LINT:
            if (record->event.pressed) {
                SEND_STRING("qmk lint\n");
                res = false;
            }
            break;
        case CK_CAPS:
            if (record->event.pressed) {
                caps_word_toggle();
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

// {{{1 LED Helper
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

// {{{1 RGB Matrix Indicators
bool rgb_matrix_indicators_user(void) {
    rgb_matrix_set_color(theColor, 22, 33, 223);
    return true;
}

void housekeeping_task_user(void) {
    rgb_matrix_set_color(1, 255, 0, 0);
    rgb_matrix_set_color(36, 0, 255, 44);
    rgb_matrix_set_color(theColor, 0, 255, 44);
}

// {{{1 Leader Key
#ifdef LEADER_ENABLE
void leader_start_user(void) {
    println("Leader started");
}

void leader_end_user(void) {
    if (leader_sequence_one_key(KC_1)) {
        SEND_STRING(SS_LCTL(SS_LSFT("t")));
    } else if (leader_sequence_one_key(KC_2)) {
        SEND_STRING(SS_LGUI("r") "cmd\n" SS_LCTL("c"));
    }
}
#endif // LEADER_ENABLE

// {{{1 OLED Display
#ifdef OLED_ENABLE
oled_rotation_t oled_init_user(oled_rotation_t rotation) {
    if (is_keyboard_master()) {
        return OLED_ROTATION_0;
    }
    return OLED_ROTATION_270;
}

bool oled_task_user(void) {
    if (is_keyboard_master()) {
    } else {
        oled_set_cursor(0, 4);
    }
    return false;
}
#endif // OLED_ENABLE

// {{{1 Encoder
#ifdef ENCODER_ENABLE
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
#endif // ENCODER_ENABLE

// {{{1 OS Detection
#ifdef OS_DETECTION_ENABLE
bool process_detected_host_os_user(os_variant_t detected_os) {
    DetectedOs = detected_os;
    switch (detected_os) {
        case OS_MACOS:
        case OS_IOS:
            set_unicode_input_mode(UNICODE_MODE_MACOS);
            strncpy(DetectedOsName, "MacOS/iOS", 10);
            break;
        case OS_WINDOWS:
            set_unicode_input_mode(UNICODE_MODE_WINDOWS);
            strncpy(DetectedOsName, "Windows", 8);
            break;
        case OS_LINUX:
            set_unicode_input_mode(UNICODE_MODE_LINUX);
            strncpy(DetectedOsName, "Linux", 6);
            break;
        case OS_UNSURE:
            set_unicode_input_mode(UNICODE_MODE_LINUX);
            strncpy(DetectedOsName, "Unsure", 7);
            break;
        default:
            strncpy(DetectedOsName, "Unknown", 8);
            break;
    }

    return false;
}
#endif // OS_DETECTION_ENABLE
