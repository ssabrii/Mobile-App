#!/bin/bash
job=$1
branch=$2
# sed "s/const\ travisVersion.*/const\ travisVersion='$job';"  src/version.js > src/version.js
# sed "s/const\ branchName.*/const\ branchName='$branch';"  src/version.js > src/version.js
echo "Job: $job"
echo "Branch: $branch"