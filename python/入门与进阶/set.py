months = set(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])
items = {
  'x1': 'Feb',
  'x2': 'Sun'
}
for item in items:
  if items.get(item) in months:
    print(item + ': ok')
  else:
    print(item + ': error')

s = set([
  ('Adam', 95),
  ('Lisa', 85),
  ('Bart', 59)
])
for item in s:
  print(item[0] + ':', item[1])

nameSet = set(['Adam', 'Lisa', 'Paul'])
nameList = ['Adam', 'Lisa', 'Bart', 'Paul', 'Tom']
for name in nameList:
  if name in nameSet:
    nameSet.remove(name)
  else:
    nameSet.add(name)
print(nameSet)
