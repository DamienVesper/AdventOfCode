data = File.read("input.txt").split("\n")
for i in data
    for j in data
        for k in data
            if Integer(i) + Integer(j) + Integer(k) === 2020
                puts "Result: #{Integer(i) * Integer(j) * Integer(k)}"
                exit
            end
        end
    end
end
