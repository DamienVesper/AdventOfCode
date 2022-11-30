def output (data):
    print(f"Result: {data}");
    with open("output.txt", "w") as f:
        f.write(data);

def calculateFuel (mass):
    return int(int(mass) / 3) - 2;

def calculateMaxFuel (mass):
    init = calculateFuel(mass);
    total = init;

    while (init > 0):
        init = calculateFuel(init);
        total += init;
    total -= init;
    return total;

def solve (data):
    total = 0;
    for i in range(0, len(data), 1):
        total += calculateMaxFuel(data[i]);
    output(str(total));

with open("input.txt", "r") as f:
    solve(f.readlines());
