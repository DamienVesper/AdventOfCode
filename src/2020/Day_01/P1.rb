data = File.read("input.txt").split("\n")
for i in data
    for j in data
        if Integer(i) + Integer(j) === 2020
            puts "Result: #{Integer(i) * Integer(j)}"
            exit
        end
    end
end
