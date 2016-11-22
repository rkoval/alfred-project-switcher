#!/bin/bash
query=$1
project=`basename $query`

if ! ./focus_window.scpt $project; then
  source ~/.bashrc
  cd $query && /usr/local/bin/mvim -c "set titlestring=$project"
fi
