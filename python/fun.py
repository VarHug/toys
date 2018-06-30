List = []
x = 1
while x <= 100:
  List.append(x * x)
  x += 1
print(sum(List))

def square_of_sum(params_list):
  sum = 0
  for item in params_list:
    sum += item * item
  return sum

print(square_of_sum([1, 2, 3, 4, 5]))
print(square_of_sum([-5, 0, 5, 15, 25]))

import math
def quadratic_equation(a, b, c):
  t = math.sqrt(b * b - 4 * a * c)
  return (-b + t) / (2 * a), (-b - t) / (2 * a)
print(quadratic_equation(2, 3, 0))
print(quadratic_equation(1, -6, 5))

# 汉诺塔
def move(n, a, b, c):
  if n == 1:
    print(a, '-->', c)
    return
  move(n - 1, a, c, b)
  print(a, '-->', c)
  move(n - 1, b, a, c)
move(4, 'A', 'B', 'C')

def greet(name='world'):
  print('hello ' + name)
greet()
greet('Tom')

def average(*params):
  sum = 0
  paramsLen = len(params)
  if paramsLen == 0:
    return sum
  for num in params:
    sum += num
  return sum / paramsLen
print(average())
print(average(1, 2))
print(average(1, 2, 3, 4, 5))
