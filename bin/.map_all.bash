#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

TARGET_DIR="/Users/jamesrutledge/Desktop/target_dirs"
DATA_DIR="/Users/jamesrutledge/Desktop/archiver/data"

node "${DIR}"/script/mapper.js "${TARGET_DIR}"/testing_grounds "${DATA_DIR}"/testing_grounds
node "${DIR}"/script/mapper.js "${TARGET_DIR}"/trailers "${DATA_DIR}"/trailers
node "${DIR}"/script/mapper.js "${TARGET_DIR}"/rbc_mock_data "${DATA_DIR}"/rbc_mock_data