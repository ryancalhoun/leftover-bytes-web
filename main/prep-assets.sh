#!/bin/bash

sed -i 's|rel=manifest .*manifest.json|rel=manifest href=/manifest.json|' index.html
sed -i 's|"./img|"https://storage.googleapis.com/leftoverbytes-content/img|' manifest.json
