import json
class Person(object):
  __count = 0
  @classmethod
  def how_many(cls):
    return cls.__count
  def __init__(self, name, gender, birth, score, **kw):
    Person.__count += 1
    self.name = name
    self.gender = gender
    self.birth = birth
    self.__score = score
    self.__data = 'none'
    for k, v in kw.items():
      setattr(self, k, v)
  def get_grade(self):
    if self.__score >= 85:
      return 'A'
    elif self.__score >= 70:
      return 'B'
    elif self.__score >= 60:
      return 'C'
    else:
      return 'D'
tom = Person('Tom', 'male', '1990-1-1', 100, job='Student')
print(tom.get_grade())
print(Person.how_many())
jack = Person('Jack', 'male', '1991-1-1', 59, job='Student')
print(jack.get_grade())
print(Person.how_many())
