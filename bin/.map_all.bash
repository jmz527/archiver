#!/usr/bin/env bash

PWD="$( pwd )"

TARGET_DIR="/Users/jamesrutledge/Desktop/target_dirs"
DATA_DIR="/Users/jamesrutledge/Desktop/archiver/data"

# Testing Grounds
# node "${PWD}"/script/mapper.js "${TARGET_DIR}"/testing_grounds "${DATA_DIR}"/testing_grounds
# node "${PWD}"/script/mapper.js "${TARGET_DIR}"/trailers "${DATA_DIR}"/trailers
# node "${PWD}"/script/mapper.js "${TARGET_DIR}"/rbc_mock_data "${DATA_DIR}"/rbc_mock_data

# Work Passport Cinema
node "${PWD}"/script/mapper.js /Volumes/Work\ Passport/cinema "${DATA_DIR}"/cinema_map

# Cinema
# node "${PWD}"/script/mapper.js /Volumes/Passport/cinema "${DATA_DIR}"/cinema_map