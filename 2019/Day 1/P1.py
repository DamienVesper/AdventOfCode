def output (data):
    print(f"Result: {data}");
    with open("output.txt", "w") as f:
        f.write(data);

def solve (data):
    total = 0;
    for i in range(0, len(data), 1):
        total += int(int(data[i]) / 3) - 2;
    output(str(total));

with open("input.txt", "r") as f:
    solve(f.readlines());
