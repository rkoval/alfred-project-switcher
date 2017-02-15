#!/bin/bash
query=$1
project=`basename $query`

if ! ./focus_window.scpt $project; then
  source ~/.bashrc
  if [ $project == 'simplenote' ]; then
    ENABLE_NERDTREE=0 mvim -c "set titlestring=$project | SimplenoteList"
  else
    cd $query && mvim -c "set titlestring=$project"
  fi
fi
