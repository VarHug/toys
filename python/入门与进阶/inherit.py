import json
class Person(object):
  __slots__ = ('name', 'gender')
  def __init__(self, name, gender):
    self.name = name
    self.gender = gender

class Teacher(Person):
  __slots__ = ('course',)
  def __init__(self, name, gender, course):
    super(Teacher, self).__init__(name, gender)
    self.course = course

class Student(Person):
  __slots__ = ('__score',)
  def __init__(self, name, gender, score):
    super(Student, self).__init__(name, gender)
    if score < 0 or score > 100:
      raise ValueError('invalid score')
    else:
      self.__score = score
  @property
  def score(self):
    return self.__score
  @score.setter
  def score(self, score):
    if score < 0 or score > 100:
      raise ValueError('invalid score')
    else:
      self.__score = score
  @property
  def grade(self):
    if self.score < 60:
        return 'C'
    if self.score < 80:
        return 'B'
    return 'A'
  def __str__(self):
    return '(Student: %s, %s, %s, %s)' % (self.name, self.gender, self.score, self.grade)

s = Student('Tom', 'male', 59)
print(s)
s.score = 80
print(s)
s.name = 'Lily'
print(s)

class Fib(object):
  def __call__(self, num):
    a, b, L = 0, 1, []
    for n in range(num):
      L.append(a)
      a, b = b, a + b
    return L
f = Fib()
print(f(10))
