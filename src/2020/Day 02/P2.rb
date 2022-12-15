data = File.read("input.txt").split("\n")
total = 0

for line in data
    fLine = line.split(" ")

    pos = fLine[0].split("-").map{|x| Integer(x)}
    token = fLine[1][0]
    password = fLine[2].split("")

    if password[pos[0] - 1] === token && password[pos[1] - 1] === token
        next
    elsif password[pos[0] - 1] === token || password[pos[1] - 1] === token
        total += 1
    end
end

puts "Result: #{total}"
