data = File.read("input.txt").split("\n").map{|x| x.strip()}

total = 0
for triangle in data
    lengths = triangle.split(/\s+/).map{|x| Integer(x)}

    a = lengths[0]
    b = lengths[1]
    c = lengths[2]

    if (a + b) > c and
        (a + c) > b and
        (b + c) > a
        total += 1
    end
end

puts "Result: #{total}"
