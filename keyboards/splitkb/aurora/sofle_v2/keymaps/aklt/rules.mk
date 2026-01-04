
# Debugging
# https://docs.qmk.fm/unit_testing#unit-testing
KEYCODE_STRING_ENABLE = yes
VARIABLE_TRACE = 1
CONSOLE_ENABLE = yes

# Encoder
ENCODER_ENABLE = yes
ENCODER_MAP_ENABLE = yes

# Send String
ENABLE_SEND_STRING = yes

# Tri Layer
# TRI_LAYER_ENABLE = yes

# https://docs.qmk.fm/features/os_detection
OS_DETECTION_ENABLE = yes

# Tap Dance
#TAP_DANCE_ENABLE = yes

# Leader key
# LEADER_ENABLE = yes

# KEY_LOCK_ENABLE = yes

# TODO Recording macros - https://docs.qmk.fm/features/dynamic_macros
# DYNAMIC_MACRO_ENABLE = yes

# RGB Matrix
RGBLIGHT_ENABLE = no
BACKLIGHT_ENABLE = no
RGB_MATRIX_ENABLE = yes
RGB_MATRIX_DRIVER = ws2812
SPLIT_KEYBOARD = yes
RAW_ENABLE = yes

# Oled
OLED_ENABLE = yes

EXTRAKEY_ENABLE = yes
BOOTMAGIC_ENABLE = yes

SWAP_HANDS_ENABLE = yes

# QMK
CONVERT_TO=liatris
RP2040_BOOTLOADER_DOUBLE_TAP_RESET = yes
MOUSEKEY_ENABLE = yes

# Unicode keys
UNICODE_COMMON = yes
UNICODEMAP_ENABLE = yes

# Combos
COMBO_ENABLE = yes
