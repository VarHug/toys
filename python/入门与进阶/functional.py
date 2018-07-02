import math
def add(x, y, fun):
  return fun(x) + fun(y)
print(add(25, 9, math.sqrt))


def format_name(s):
  return s[0].upper() + s[1:].lower()
print(list(map(format_name, ['adam', 'LISA', 'tOM'])))

import functools
def prod(x, y):
  return x * y
print(functools.reduce(prod, [2, 4, 5, 7, 12]))

def is_sqr(x):
  return math.sqrt(x) in range(1, 11)
print(list(filter(is_sqr, range(1, 101))))

print(
  sorted(
    ['bob', 'about', 'Zoo', 'Credit'], 
    key = lambda x: x.lower())
)

def calc_prod(lst):
  def lazy_prod():
    return functools.reduce(lambda x, y: x * y, lst)
  return lazy_prod
f = calc_prod([1, 2, 3, 4])
print(f())

# def count():
#   fs = []
#   for i in range(1, 4):
#     def f():
#       return i * i
#     fs.append(f)
#   return fs
# f1, f2, f3 = count()
# print(f1(), f2(), f3())
# 9, 9, 9

def count():
  fs = []
  for i in range(1, 4):
    def f(j):
      def g():
        return j * j
      return g
    fs.append(f(i))
  return fs
f1, f2, f3 = count()
print(f1(), f2(), f3())

print(
  list(
    filter(
      lambda s: s and len(s.strip()) > 0,
      ['test', None, '', 'str', '  ', 'END']
    )
  )
)


