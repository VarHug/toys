import os
print(os.path.isdir(r'./slice.py'))
print(os.path.isfile(r'./number.py'))

try:
  import json
except ImportError:
  import simplejson as json
print(json.dumps({
  'python': 3.6
}))
