#!/usr/bin/osascript
on run argv
    set project to item 1 of argv
    tell application "System Events"
        tell application process "VimR"
            perform action "AXRaise" of (first window whose name is project)
            do shell script "open -a VimR"
        end tell
    end tell
end run
