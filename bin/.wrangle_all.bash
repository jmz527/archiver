#!/usr/bin/env bash

PWD="$( pwd )"

DATA_DIR="/Users/jamesrutledge/Desktop/archiver/data"

# Testing Grounds
# node "${PWD}"/script/wrangler.js "${DATA_DIR}"/testing_grounds.json "${DATA_DIR}"
# node "${PWD}"/script/wrangler.js "${DATA_DIR}"/trailers.json "${DATA_DIR}"
# node "${PWD}"/script/wrangler.js "${DATA_DIR}"/rbc_mock_data.json "${DATA_DIR}"

# Work Passport Cinema
node "${PWD}"/script/wrangler.js "${DATA_DIR}"/cinema_map.json "${DATA_DIR}"

# Cinema
# node "${PWD}"/script/wrangler.js "${DATA_DIR}"/cinema_map.json "${DATA_DIR}"