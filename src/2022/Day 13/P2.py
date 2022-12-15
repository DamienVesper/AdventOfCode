def output (data):
    print(f"Result: {data}");
    with open("output.txt", "w") as f:
        f.write(str(data));

class Packet:
    def __init__ (self, data):
        self.data = data;
    def __lt__ (self, test):
        return checkOrder(self.data, test.data);
    def __gt__ (self, test):
        return not checkOrder(self.data, test.data);
    def __eq__ (self, test):
        return self.data == test;
    def __repr__ (self):
        return f"<{repr(self.data)}>";

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

    dividerPackets = [Packet([[2]]), Packet([[6]])];
    newPackets = [dividerPackets[0], dividerPackets[1]];

    for pair in pairs:
        for i in pair:
            newPackets.append(Packet(i));

    newPackets.sort();

    ans = (newPackets.index(dividerPackets[0]) + 1) * (newPackets.index(dividerPackets[1]) + 1);
    output(ans);

with open("input.txt", "r") as f:
    solve(f.read());
