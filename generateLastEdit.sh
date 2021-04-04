# https://stackoverflow.com/questions/49184557/convert-bash-array-to-json-array-and-insert-to-file-using-jq

# https://stackoverflow.com/questions/39895965/how-to-write-json-file-using-bash

createLastModified(){
  echo "["
  git ls-tree -r --name-only HEAD | while read filename; do
    echo "{$(git log -1 --format="%ad" -- $filename) $filename}" >> lastModified.txt
  done
  echo "]"
}

cd ./blog
rm -rf lastModified.txt
createLastModified

cd ../coin
rm -rf lastModified.txt
createLastModified