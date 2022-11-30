data = File.read("input.txt").split("")
floor = 0

for token in data
    if token === "("
        floor += 1
    else
        floor -= 1
    end
end

puts "Result: #{floor}"
