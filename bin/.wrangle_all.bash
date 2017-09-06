#!/usr/bin/env bash

PWD="$( pwd )"

DATA_DIR="/Users/jamesrutledge/Desktop/archiver/data"

node "${PWD}"/script/wrangler.js "${DATA_DIR}"/testing_grounds.json "${DATA_DIR}"
node "${PWD}"/script/wrangler.js "${DATA_DIR}"/trailers.json "${DATA_DIR}"
node "${PWD}"/script/wrangler.js "${DATA_DIR}"/rbc_mock_data.json "${DATA_DIR}"