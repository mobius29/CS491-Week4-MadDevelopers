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
  

def switchExtension(extension, original, output):  
  if extension == "c":
    with open(output, "w") as f:
      removeCommentsInCAndJava(f, original)

  elif extension == "cc":
    with open(output, "w") as f:
      removeCommentsInCAndJava(f, original)

  elif extension == "java":
    with open(output, "w") as f:
      removeCommentsInCAndJava(f, original)

  elif extension == "py":
    with open(output, "w") as f:
      removeCommentsInPy(f, original)

  else:
    print("extension error")

args = sys.argv
switchExtension(args[1], args[2], args[3]);
