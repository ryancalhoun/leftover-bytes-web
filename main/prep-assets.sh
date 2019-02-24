#!/bin/bash

sed -i 's|rel=manifest .*manifest.json|rel=manifest href=/manifest.json|' index.html
sed -i 's|"./img|"https://static.leftoverbytes.com/img|' manifest.json
