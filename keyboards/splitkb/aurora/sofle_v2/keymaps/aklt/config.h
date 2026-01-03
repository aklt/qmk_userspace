/* SPDX-License-Identifier: GPL-2.0-or-later */
/* Copyright 2023 splitkb.com <support@splitkb.com> */

#pragma once

#ifdef OLED_ENABLE
#   define OLED_FONT_H "keyboards/splitkb/aurora/sofle_v2/glcdfont.c"
#endif

#define OS_DETECTION_KEYBOARD_RESET
#define OS_DETECTION_SINGLE_REPORT

// Turn off controller LED - See https://docs.splitkb.com/product-guides/liatris/power-led
#define LED_CAPS_LOCK_PIN 24
#define LED_PIN_ON_STATE 0

// #undef NO_ACTION_LAYER
#define SPLIT_ACTIVITY_ENABLE
#define SPLIT_LAYER_STATE_ENABLE
#define SPLIT_LED_STATE_ENABLE
#define SPLIT_MODS_ENABLE
#define SPLIT_OLED_ENABLE
#define SPLIT_TRANSPORT_MIRROR
#define SPLIT_WPM_ENABLE

    // SPLIT_HAND_MATRIX_GRID
    // SPLIT_HAND_PIN
    // SPLIT_USB_DETECT
    // SPLIT_USB_TIMEOUT
    // SPLIT_USB_TIMEOUT_POLL
    // SPLIT_WATCHDOG_ENABLE
    // SPLIT_WATCHDOG_TIMEOUT
    // SPLIT_DETECTED_OS_ENABLE
    // SPLIT_HAPTIC_ENABLE
    // SPLIT_LED_STATE_ENABLE
    // SPLIT_MODS_ENABLE
    // SPLIT_OLED_ENABLE
    // SPLIT_ST7565_ENABLE
    // SPLIT_WPM_ENABLE
    //

#define RGB_MATRIX_DEFAULT_ON true
#define RGB_TRIGGER_ON_KEYDOWN
// These are defined in default sofle_v2 keymap
// #define RGB_MATRIX_LED_COUNT 58
// #define RGB_MATRIX_SPLIT {29, 29}

//#define DYNAMIC_KEYMAP_LAYER_COUNT 12
#define UNICODE_SELECTED_MODES UNICODE_MODE_LINUX, UNICODE_MODE_MACOS, UNICODE_MODE_WINCOMPOSE

// ms within which to trigger the combo
#define COMBO_TERM 60
// Combos keys are always checked from layer 0, even if other layers are active.
#define COMBO_ONLY_FROM_LAYER 0

// Tri Layer
#define TRI_LAYER_LOWER_LAYER	4
#define TRI_LAYER_UPPER_LAYER	5
#define TRI_LAYER_ADJUST_LAYER  6

// Tap Dance
#define TAPPING_TERM 175
#define TAPPING_TERM_PER_KEY

// Leader key - https://docs.qmk.fm/features/leader_key
#define LEADER_TIMEOUT 250
#define LEADER_PER_KEY_TIMING
#define LEADER_NO_TIMEOUT
#define LEADER_KEY_STRICT_KEY_PROCESSING

// Mouse Key
#define MK_COMBINED
#define MK_C_OFFSET_UNMOD 2

// #define ENABLE_RGB_MATRIX_SOLID_REACTIVE_MULTICROSS
// #define RGB_MATRIX_DEFAULT_MODE RGB_MATRIX_SOLID_REACTIVE_MULTICROSS

// This will make the hue cycle automatically for reactive animations.
//#define RGB_MATRIX_SOLID_REACTIVE_GRADIENT_MODE
