.SILENT:

MAKEFLAGS += --no-print-directory

QMK_USERSPACE := $(patsubst %/,%,$(dir $(shell realpath "$(lastword $(MAKEFILE_LIST))")))
ifeq ($(QMK_USERSPACE),)
    QMK_USERSPACE := $(shell pwd)
endif

QMK_FIRMWARE_ROOT = $(shell qmk config -ro user.qmk_home | cut -d= -f2 | sed -e 's@^None$$@@g')
ifeq ($(QMK_FIRMWARE_ROOT),)
    $(error Cannot determine qmk_firmware location. `qmk config -ro user.qmk_home` is not set)
endif

SOFLE_KEYMAP_C  = keyboards/splitkb/aurora/sofle_v2/keymaps/aklt/keymap.c
KYRIA_KEYMAP_C  = keyboards/splitkb/kyria/keymaps/aklt/keymap.c
FERRIS_KEYMAP_C = keyboards/ferris/sweep/keymaps/aklt/keymap.c

ZMK_KEYMAP_OUT ?= zmk-config/config/cradio.keymap

KYRIA_KB ?= splitkb/kyria/rev3

generate-qmk-sofle:
	node users/aklt/define-keymap.js qmk sofle > $(SOFLE_KEYMAP_C)

generate-qmk-kyria:
	node users/aklt/define-keymap.js qmk kyria > $(KYRIA_KEYMAP_C)

generate-qmk-ferris:
	node users/aklt/define-keymap.js qmk ferris > $(FERRIS_KEYMAP_C)

generate-zmk:
	node users/aklt/define-keymap.js zmk ferris > $(ZMK_KEYMAP_OUT)

build-sofle: generate-qmk-sofle
	qmk compile -kb splitkb/aurora/sofle_v2/rev1 -km aklt

build-kyria: generate-qmk-kyria
	qmk compile -kb $(KYRIA_KB) -km aklt

build-ferris: generate-qmk-ferris
	qmk compile -kb ferris/sweep -km aklt

build: build-sofle

bear: clean
	bear -- $(MAKE) build

install:
	mkdir -p modules
	git submodule add https://github.com/getreuer/qmk-modules.git modules/getreuer
	# git submodule add https://github.com/stasmarkin/sm_td.git modules/stasmarkin
	git submodule update --init --recursive
