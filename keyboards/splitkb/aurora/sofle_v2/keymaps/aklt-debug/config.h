/* SPDX-License-Identifier: GPL-2.0-or-later */
/* Copyright 2023 splitkb.com <support@splitkb.com> */

#pragma once

#ifdef OLED_ENABLE
#   define OLED_FONT_H "keyboards/splitkb/aurora/sofle_v2/glcdfont.c"
#endif

// Turn off controller LED - See https://docs.splitkb.com/product-guides/liatris/power-led
#define LED_CAPS_LOCK_PIN 24
#define LED_PIN_ON_STATE 0

// #define SPLIT_ACTIVITY_ENABLE
// #define SPLIT_LAYER_STATE_ENABLE
// #define SPLIT_LED_STATE_ENABLE
// #define SPLIT_MODS_ENABLE
// #define SPLIT_OLED_ENABLE
#define SPLIT_TRANSPORT_MIRROR
// #define SPLIT_WPM_ENABLE

#ifdef RGB_MATRIX_LED_COUNT
#undef RGB_MATRIX_LED_COUNT
#endif
#define RGB_MATRIX_LED_COUNT 58
#ifdef RGB_MATRIX_SPLIT
#undef RGB_MATRIX_SPLIT
#endif
#define RGB_MATRIX_SPLIT {29, 29}
#define RGB_TRIGGER_ON_KEYDOWN
