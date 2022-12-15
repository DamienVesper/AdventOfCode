data = File.read("input.txt").split("")

houses = ["0:0"]
checked = 1

pos = [0, 0]

for token in data
    if token === "<"
        pos[0] -= 1
    elsif token === ">"
        pos[0] += 1
    elsif token === "^"
        pos[1] += 1
    else
        pos[1] -= 1
    end

    coord = "#{pos[0]}:#{pos[1]}"
    if houses.include? coord
        next
    else
        houses.append(coord)
        checked += 1
    end
end

puts "Result: #{checked}"
