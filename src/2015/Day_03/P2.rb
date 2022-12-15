data = File.read("input.txt").split("")

houses = ["0:0"]
checked = 1

posS = [0, 0]
posR = [0, 0]

i = 0
for token in data
    ch = i % 2 === 0

    if token === "<"
        ch ? posS[0] -= 1 : posR[0] -= 1
    elsif token === ">"
        ch ? posS[0] += 1 : posR[0] += 1
    elsif token === "^"
        ch ? posS[1] += 1 : posR[1] += 1
    else
        ch ? posS[1] -= 1 : posR[1] -= 1
    end

    coord = "#{ch ? posS[0] : posR[0]}:#{ch ? posS[1] : posR[1]}"
    i += 1

    if houses.include? coord
        next
    else
        houses.append(coord)
        checked += 1
    end
end

puts "Result: #{checked}"
