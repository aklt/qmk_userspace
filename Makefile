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
	qmk compile -kb splitkb/aurora/sofle_v2 -km aklt

bear: clean
	bear -- $(MAKE) build

install:
	mkdir -p modules
	git submodule add https://github.com/getreuer/qmk-modules.git modules/getreuer
	# git submodule add https://github.com/stasmarkin/sm_td.git modules/stasmarkin
	git submodule update --init --recursive
