data = File.read("input.txt").split("\n")
total = 0

for line in data
    fLine = line.split(" ")
    tokenCount = 0

    range = fLine[0].split("-").map{|x| Integer(x)}
    token = fLine[1][0]
    password = fLine[2]

    for char in password.split("")
        if char === token
            tokenCount += 1
        end
    end

    if tokenCount >= range[0] && tokenCount <= range[1]
        total += 1
    end
end

puts "Result: #{total}"
