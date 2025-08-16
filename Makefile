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

build:
	qmk compile -e CONVERT_TO=liatris -kb splitkb/aurora/sofle_v2 -km vial

sofle-build.json: sofle-layout.json
	sed -e 's/KC_F13/UP(DK_AE, DK_AE_UPPER)/g' \
        -e 's/KC_F14/UP(DK_OE, DK_OE_UPPER)/g' \
        -e 's/KC_F15/UP(DK_AA, DK_AA_UPPER)/g' \
		-e 's/KC_F16/UC_PREV/g' \
		-e 's/KC_F17/UC_NEXT/g' sofle-layout.json > sofle-build.json
	qmk json2c sofle-build.json -o keyboards/splitkb/aurora/sofle_v2/keymaps/vial/sofle-layout.h
	rm -fv sofle-build.json
	+$(MAKE) -C $(QMK_FIRMWARE_ROOT) $(MAKECMDGOALS) QMK_USERSPACE=$(QMK_USERSPACE)
