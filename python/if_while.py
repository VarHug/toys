score = 75
if score >= 60:
  print('passed')
else:
  print('no passed')

age = 8
if age >= 18:
  print('adult')
elif age >= 10:
  print('teenager')
elif age >= 3:
  print('kid')
else:
  print('body')

scores = [75, 92, 59, 68]
sum = 0
for score in scores:
  sum += score
print(sum / 4)

sum2 = 0
x = 1
while x < 100:
  sum2 += x
  x += 2
print(sum2)

sum3 = 0
x2 = 1
n = 1
while True:
  if n > 20:
    break
  sum3 += x2
  x2 *= 2
  n += 1
print(sum3)

sum4 = 0
x4 = 0
while True:
  x4 += 1
  if x4 & 1 == 0:
    continue
  if x4 > 100:
    break
  sum4 += x4
print(sum4)

decades = [1, 2, 3, 4, 5, 6, 7, 8, 9]
digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
for decade in decades:
  for digit in digits:
    if decade < digit:
      print(decade * 10 + digit)
