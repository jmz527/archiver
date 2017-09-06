#!/usr/bin/env bash

PWD="$( pwd )"

DATA_DIR="/Users/jamesrutledge/Desktop/archiver/data"
DEST_DIR="/Users/jamesrutledge/Desktop/target_dirs/testing_destination"

node "${PWD}"/script/reformmer.js "${DATA_DIR}"/testing_grounds.json "${DEST_DIR}"
node "${PWD}"/script/reformmer.js "${DATA_DIR}"/trailers.json "${DEST_DIR}"
node "${PWD}"/script/reformmer.js "${DATA_DIR}"/rbc_mock_data.json "${DEST_DIR}"