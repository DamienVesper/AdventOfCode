def output (data):
    print(f"Result: {data}");
    with open("output.txt", "w") as f:
        f.write(str(data));

def solve (data):
    total = 0;
    for i in range(0, len(data), 1):
        if (data[i][0] == "+"):
            amt = int(data[i][1:]);
        else:
            amt = -1 * int(data[i][1:]);

        total += amt;
    output(total);

with open("input.txt", "r") as f:
    solve(f.readlines());
