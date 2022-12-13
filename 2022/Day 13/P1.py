def output (data):
    print(f"Result: {data}");
    with open("output.txt", "w") as f:
        f.write(str(data));

def checkOrder (left, right):
    if isinstance(left, int) and isinstance(right, int):
        return None if left == right else left < right;

    if isinstance(left, int): left = [left];
    if isinstance(right, int): right = [right];

    for a, b in zip(left, right):
        substr = checkOrder(a, b);
        if substr != None: return substr;

    if len(left) < len(right): return True;
    elif len(left) > len(right): return False;
    else: return None;

def solve (data):
    packets = data = data.split("\n\n");
    pairs = [tuple(map(eval,packet.splitlines())) for packet in packets];

    ans = sum(i for i, pair in enumerate(pairs, 1) if checkOrder(*pair));
    output(ans);

with open("input.txt", "r") as f:
    solve(f.read());
