data = File.read("input.txt").split("\n")
total = 0

vowels = ["a", "e", "i", "o", "u"]
blacklist = ["ab", "cd", "pq", "xy"]

for line in data
    vowelCount = 0
    hasDuplicate = false
    blacklisted = false

    i = 0
    for char in line.split("")
        if vowels.include? char
            vowelCount += 1
        end

        if hasDuplicate == false and line.length() != i and char == line[i + 1]
            hasDuplicate = true
        end

        if blacklisted == false and line.length() != i and blacklist.include? "#{char}#{line[i + 1]}"
            blacklisted = true
            break
        end

        i += 1
    end

    if vowelCount >= 3 && hasDuplicate && !blacklisted
        total += 1
    end
end

puts "Result: #{total}"
