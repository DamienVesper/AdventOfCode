def output (data):
    print(f"Result: {data}");
    with open("output.txt", "w") as f:
        f.write(str(data));

def solve (data):
    print("insert solution here");

with open("input.txt", "r") as f:
    solve(f.readlines());
