List = range(1, 101)
print(List[:10])
print(List[2::3])
print(List[4:50:5])
print(List[-10:])
print(List[-46::5])

def firstCharUpper(s):
  return s[:1].upper() + s[1:]
print(firstCharUpper('hello'))
print(firstCharUpper('sunday'))
print(firstCharUpper('september'))
