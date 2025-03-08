#!/bin/sh

# Use entr to watch the Downloads directory and when a file named "test.txt" is created, run the command "echo 'test.txt created'"
while true; do
    echo "$HOME/Downloads" | entr -d 'echo'
    NEWFILE=`find "$HOME/Downloads" -type f -printf '%T@ %p\n' | sort -n | tail -1 | cut -d' ' -f2-`
    case "$NEWFILE" in
        *splitkb_aurora_sofle_v2_rev1_layout_*)
            mv -v "$NEWFILE" sofle-layout.json
            make hfile
            ;;
        *)
            echo "Unknown file created: $NEWFILE"
            ;;
    esac
    sleep 1
done
