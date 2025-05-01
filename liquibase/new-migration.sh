#!/bin/bash
set -e

# Prompt user
echo "Is this a DDL or DLM migration? (ddl/dlm)"
read TYPE
if [[ "$TYPE" != "ddl" && "$TYPE" != "dlm" ]]; then
  echo "Invalid type. Must be 'ddl' or 'dlm'."
  exit 1
fi

echo "Enter subfolder (e.g., schema, character_generator):"
read SUBFOLDER

TARGET_DIR="${TYPE}s/${SUBFOLDER}"
DATE=$(date +"%Y%m%d")

# Ensure directory exists
mkdir -p "$TARGET_DIR"

# Find the next migration number
LAST_NUM=$(ls "$TARGET_DIR" | grep "^${DATE}-[0-9][0-9][0-9]" | sort | tail -n 1 | sed -E "s/^${DATE}-([0-9]{3}).*$/\1/")
NEXT_NUM=$(printf "%03d" $((10#$LAST_NUM + 1)))

# Prompt for description
echo "Enter description (optional):"
read DESCRIPTION

FILENAME="${DATE}-${NEXT_NUM}.sql"
FULL_PATH="${TARGET_DIR}/${FILENAME}"

# Create the file
cat <<EOF > "$FULL_PATH"
-- liquibase formatted sql

-- changeset you:${DATE}-${NEXT_NUM}
-- description: ${DESCRIPTION//_/ }

EOF

echo "Created: $FULL_PATH"
