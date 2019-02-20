#!/usr/bin/env python

from tempfile import mkstemp
from shutil import move
from os import fdopen, remove
import sys, re


def replace(file_path, pattern, subst):
    #Create temp file
    fh, abs_path = mkstemp()
    with fdopen(fh,'w') as new_file:
        with open(file_path) as old_file:
            for line in old_file:
                # regexp
                line = re.sub(pattern, subst, line)
                # string
                # line = line.replace(pattern, subst)
                new_file.write(line)
    #Remove original file
    remove(file_path)
    #Move new file
    move(abs_path, file_path)

# execute
file_name = sys.argv[1]
job = sys.argv[2]
branch = sys.argv[3]
print('Reading file %s' % file_name)
print('travisVersion = %s' % job)
replace(file_name, r"const travisVersion.*", "const travisVersion='%s';/" % job)
print('branchName = %s' % branch)
replace(file_name, r"const branchName.*", "const branchName='%s';/" % branch)
