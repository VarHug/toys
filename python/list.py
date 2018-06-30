L = ['Adam', 'Lisa', 'Bart',]
print(L)  # ['Adam', 'Lisa', 'Bart']
print(L[1])  # Lisa
print(L[-1])  # Bart
L.append('Paul') 
print(L)  # ['Adam', 'Lisa', 'Bart', 'Paul']
L.insert(0, 'Tom')
print(L)  # ['Tom', 'Adam', 'Lisa', 'Bart', 'Paul']
L.pop()
print(L)  # ['Tom', 'Adam', 'Lisa', 'Bart']
L.pop(2)
print(L)  # ['Tom', 'Adam', 'Bart']
