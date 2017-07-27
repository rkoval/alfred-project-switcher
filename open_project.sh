#!/bin/bash
query=$1
project=`basename $query`

if ! ./focus_window.scpt $project; then
  source ~/.bashrc
  if [ $project == 'simplenote' ]; then
    ENABLE_NERDTREE=0 exec mvim -c "set titlestring=$project | SimplenoteList"
  elif [ $project == 'mysql' ]; then
    file="/nastygoat/dbext-sessions/$(date +%Y-%m-%dT%H:%M:%S%z).sql"
    cd /nastygoat/dbext-sessions && exec mvim -c "set titlestring=$project | DBSetOption dbname=@askg" "$file"
  else
    cd $query && exec mvim -c "set titlestring=$project"
  fi
fi
