#!/usr/bin/env bash

PWD="$( pwd )"

DATA_DIR="/Users/jamesrutledge/Desktop/archiver/data"

# node "${PWD}"/script/modeler.js "${DATA_DIR}"/testing_grounds.json
# node "${PWD}"/script/modeler.js "${DATA_DIR}"/trailers.json
# node "${PWD}"/script/modeler.js "${DATA_DIR}"/rbc_mock_data.json

# Work Passport Cinema
node "${PWD}"/script/modeler.js "${DATA_DIR}"/cinema_map.json

# Cinema
# node "${PWD}"/script/modeler.js "${DATA_DIR}"/cinema_map.json