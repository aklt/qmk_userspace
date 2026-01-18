# AKLTs Keymap

This is a keymap that I made for use on Linux and Mac for the Sofle keyboard
and hopefully also for the Ferris Sweep.

Features:

- 2 ways to handle layers: hold for temporary, tap to cycle overlays
- Orbital mouse
- SM_TD Homerow mods
- Qwerty and Colemak-dh
- Case-Word

Principles:
- vim HJKL

Clusters:
- LHS: Character and Editor navigation
- RHS: WM and UI navigation

## Tasks

- COMBO definitions
- Use Eurkey across mac and Linux
- print OS in display
- Words move and select

## Layers

    - IDEA Tap left key to cycle right/left overlay layers and vice versa
  Layers
    - Qwerty and Colemak
    - NUM / FN - Numbers and F keys
    - NUMPAD
    - Browser
    - RGB
    - BOTH Keys: cycle Qwerty / Colemak / Gaming

## Inspiration
 https://github.com/HellSingCoder/qmk_firmware/tree/33d7fa1180d232dcdb024c68a8f4629dced32afb/keyboards/sofle/keymaps/helltm
  . https://www.jonashietala.se/blog/2022/09/06/the_current_t-34_keyboard_layout/
  . https://dreymar.colemak.org/
  . https://stevep99.github.io/seniply/
  . https://github.com/drashna
  . https://github.com/manna-harbour/miryoku
  . https://github.com/skychil/kombol/tree/main
  . https://keymapdb.com/keymaps/ShamalLakshan/
  . https://github.com/TGPSKI/qmk_firmware/blob/tgpski-custom-keychron/keyboards/keychron/q0_max/encoder/keymaps/TGPSKI/keymap.c#L137
  . https://keymapdb.com/keymaps/default-ferris/
  . https://github.com/stephenostermiller/qmk_modules?tab=readme-ov-file
  . https://github.com/archydragon/lily-layout/blob/main/README.md 
  . Call function F(0) on keypress https://github.com/qmk/qmk_firmware/blob/ca01d94005f67ec4fa9528353481faa622d949ae/keyboards/clueboard/keymaps/default/keymap.c#L47
  . https://github.com/qmk/qmk_firmware/blob/master/docs/custom_quantum_functions.md
  . https://www.reddit.com/r/ErgoMechKeyboards/comments/1f18d8h/i_have_fixed_home_row_mods_in_qmk_for_everyone/
  Sofle
  . https://github.com/euwbah/sofle_rgb_qmk/blob/euwbah-keymap/keyboards/sofle/sofle.c
  . RGB https://github.com/euwbah/sofle_rgb_qmk/blob/euwbah-keymap/keyboards/sofle/keymaps/euwbah/keymap.c
  . https://github.com/andrewjrae/kyria-keymap/tree/master

INFO Splitkb Sofle
  Keyboard layout
    . See ./doc/sofle-layout.adoc

  Prevent USB autosuspend for just the keyboard via udev.
      1) Find VID:PID: lsusb (e.g. “ID 1b4f:9205”).
      2) Create /etc/udev/rules.d/50-usb-keyboard-nosuspend.rules with:
        ACTION=="add", SUBSYSTEM=="usb", ATTR{idVendor}=="VVVV", ATTR{idProduct}=="PPPP", TEST=="power/control", ATTR{power/control}="on"
      3) sudo udevadm control --reload && replug the keyboard.

