data = File.read("input.txt").split("\n")
total = 0

for line in data
    dimensions = line.split("x").map{|x| Integer(x)}

    l = dimensions[0]
    w = dimensions[1]
    h = dimensions[2]

    plw = 2 * (l + w)
    pwh = 2 * (w + h)
    phl = 2 * (h + l)

    v = l * w * h
    
    ribbonLength = [plw, pwh, phl].min()
    total += ribbonLength + v
end

puts "Result: #{total}"
