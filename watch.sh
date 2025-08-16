#!/bin/sh

echo -n "
https://config.qmk.fm/

see keyboards/splitkb/aurora/sofle_v2/keymaps/vial/keymap.c
"

# Use entr to watch the Downloads directory and when a file named "test.txt" is created, run the command "echo 'test.txt created'"
while true; do
    echo "$HOME/Downloads" | entr -d 'echo'
    NEWFILE=`find "$HOME/Downloads" -type f -printf '%T@ %p\n' | sort -n | tail -1 | cut -d' ' -f2-`
    case "$NEWFILE" in
        *splitkb_aurora_sofle_v2_rev1_layout_*)
            mv -v "$NEWFILE" sofle-layout.json
            sed -e 's/KC_F13/UP(DK_AA, DK_AA_UPPER)/g' \
                -e 's/KC_F14/UP(DK_OE, DK_OE_UPPER)/g' \
                -e 's/KC_F15/UP(DK_AE, DK_AE_UPPER)/g' \
                -e 's/KC_F16/UC_PREV/g' \
                -e 's/KC_F17/UC_NEXT/g' \
                -e 's/KC_F18/UM(CAT)/g' \
                -e 's/KC_F19/UM(SMILE)/g' \
                -e 's/KC_F20/UM(UPSIDE)/g' \
                sofle-layout.json > ./keyboards/splitkb/aurora/sofle_v2/keymaps/vial/sofle-build.json
            qmk json2c ./keyboards/splitkb/aurora/sofle_v2/keymaps/vial/sofle-build.json -o keyboards/splitkb/aurora/sofle_v2/keymaps/vial/sofle-layout.h
            ;;
        *)
            echo "Unknown file created: $NEWFILE"
            ;;
    esac
    sleep 1
done
