import random

def flip(input):
    if random.randint(0,1):
        return "Heads" + input
    return "Tails" + input

def flipNoParam():
    if random.randint(0,1):
        return "Heads"
    return "Tails"
