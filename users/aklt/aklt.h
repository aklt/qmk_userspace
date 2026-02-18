#pragma once

#include QMK_KEYBOARD_H
#include "os_detection.h"
#include "transactions.h"
#include "quantum.h"
#include "ws2812.h"

#include "macros.h"

#define AKLT_VERSION "0.0.1"

// Constants
#define MAX_DETECTED_OS_LENGTH 10
#define MASTER_LED_COUNT 35

// User callback function declarations
void keyboard_pre_init_user(void);
void keyboard_post_init_user(void);
bool process_record_user(uint16_t keycode, keyrecord_t *record);
void set_led(uint8_t index, uint8_t red, uint8_t green, uint8_t blue);
bool rgb_matrix_indicators_user(void);
void housekeeping_task_user(void);

#ifdef LEADER_ENABLE
void leader_start_user(void);
void leader_end_user(void);
#endif

#ifdef OLED_ENABLE
oled_rotation_t oled_init_user(oled_rotation_t rotation);
bool oled_task_user(void);
#endif

#ifdef ENCODER_ENABLE
bool encoder_update_user(uint8_t index, bool clockwise);
#endif

#ifdef OS_DETECTION_ENABLE
bool process_detected_host_os_user(os_variant_t detected_os);
#endif
