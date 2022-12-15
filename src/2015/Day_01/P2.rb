data = File.read("input.txt").split("")
floor = 0
result = 0

i = 0
for token in data
    if token === "("
        floor += 1
    else
        floor -= 1
    end

    if result === 0 && floor === -1
        result = i + 1
    end
    i += 1
end

puts "Result: #{result}"
