print([num * (num + 1) for num in range(1, 101, 2)])

def toUppers(L):
  return [x.upper() for x in L if isinstance(x, str)]
print(toUppers([
  'hello', 'world', 101
]))

print([
  x * 100 + y * 10 + x for x in range(1, 10) for y in range(1, 10)
])
