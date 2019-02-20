#!/bin/bash
job=$1
branch=$2
sed -iE "s/const travisVersion=.*/const travisVersion='$job';/g"  src/version.js
sed -iE "s/const branchName=.*/const branchName='$branch';/g"  src/version.js
