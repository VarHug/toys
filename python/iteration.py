List = range(1, 101)
for num in List:
  if num % 7 == 0:
    print(num)

L = ['Adam', 'Lisa', 'Bart', 'Paul']
for (index, name) in enumerate(L):
  index += 1
  print(index, '-', name)

for (index, name) in zip(range(1, len(L) + 1), L):
  print(index, '-', name)

d = {
  'Adam': 95,
  'Lisa': 85,
  'Bart': 59,
  'Paul': 74
}
sum = 0
for score in d.values():
  sum += score
print(sum / len(d))
# python3+不存在itervalues方法

for (key, value) in d.items():
  print(key + ':', value)
