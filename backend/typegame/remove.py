import sys
import re

# Python Comments
# regex: (\"\"\"(.|\n)+\"\"\"\n|\#.*\n)
def removeCommentsInPy(f, file_name):
  p = re.compile("(\"\"\"(.|\n)+\"\"\"\n|\#.*\n)")

  with open(file_name, "r") as rf:
    all_line = rf.read()
    splitted_line = re.sub(p, "", all_line).split("\n")

    for line in splitted_line:
      line_trimmed = line.strip()
      if line_trimmed == "":
        continue
      f.write(line_trimmed+"\n")

# C/C++/JAVA comments
# regex: (\/\/.*\n)|(\/\*(\*(?!\/)|[^*])*\*\/) (single_line | multi_line)
def removeCommentsInCAndJava(f, file_name):
  p = re.compile("(\/\/.*\n)|(\/\*(\*(?!\/)|[^*])*\*\/)")

  with open(file_name, "r") as rf:
    all_line = rf.read()
    splitted_line = re.sub(p, "", all_line).split("\n")

    for line in splitted_line:
      line_trimmed = line.strip()
      if line_trimmed == "":
        continue
      f.write(line_trimmed+"\n")
  

def switchExtension(extension):  
  if extension == "c":
    with open("main.c", "w") as f:
      removeCommentsInCAndJava(f, "big_file.c")

  elif extension == "cc":
    with open("main.cpp", "w") as f:
      removeCommentsInCAndJava(f, "big_file.cc")

  elif extension == "java":
    with open("main.java", "w") as f:
      removeCommentsInCAndJava(f, "big_file.java")

  elif extension == "py":
    with open("main.py", "w") as f:
      removeCommentsInPy(f, "big_file.py")

  else:
    print("extension error")

args = sys.argv
switchExtension(args[1])
