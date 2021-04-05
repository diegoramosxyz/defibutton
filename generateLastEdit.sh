# https://stackoverflow.com/questions/49184557/convert-bash-array-to-json-array-and-insert-to-file-using-jq

# https://stackoverflow.com/questions/39895965/how-to-write-json-file-using-bash

# https://stackoverflow.com/questions/36823741/how-delete-last-comma-in-json-file-using-bash

# This script generates a lastModified.json file containing the path to the mdx files and 
# the last modified date.

createLastModified(){
  # Create JSON as an array of objects
  echo "[" >> lastModified.json

  # Loop through all the files in the directory recursively and add one line with the data
  # on every iteration
  git ls-tree -r --name-only HEAD | while read filename; do
    echo "{ \"path\": \"/$filename\", \"lastModified\": \"$(git log -1 --date=iso8601-strict --format="%ad" -- $filename)\" }," | sed 's/.mdx//' >> lastModified.json
  # the sed command removes the .mdx extension from the paths
  done

  echo "]" >> lastModified.json

  # Remove the last comma of the generated .json file to make it valid JSON
  sed -i -zr 's/,([^,]*$)/\1/' lastModified.json
}

cd ./blog
# Remove old json file
rm -f lastModified.json
# Create new json file
createLastModified

cd ../coin
rm -f lastModified.json
createLastModified