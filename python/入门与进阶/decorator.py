import time, functools
def performance(unit):
  def perf_decorator(f):
    @functools.wraps(f)
    def wrapper(*args, **kw):
      t1 = time.time()
      r = f(*args, **kw)
      t2 = time.time()
      t = (t2 - t1) * 1000 if unit == 'ms' else (t2 - t1)
      print('call %s() in %f %s' % (f.__name__, t, unit))
      return r
    return wrapper
  return perf_decorator

@performance('ms')
def factorial(n):
    return functools.reduce(lambda x,y: x*y, range(1, n+1))
print(factorial(10))
print(factorial.__name__)

sorted_ignore_case = functools.partial(sorted, key = lambda x: x.lower())
print(sorted_ignore_case(['bob', 'about', 'Zoo', 'Credit']))
