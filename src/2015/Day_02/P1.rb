data = File.read("input.txt").split("\n")
total = 0

for line in data
    dimensions = line.split("x").map{|x| Integer(x)}

    l = dimensions[0]
    w = dimensions[1]
    h = dimensions[2]

    alw = l * w
    awh = w * h
    ahl = h * l
    
    slack = [alw, awh, ahl].min()
    total += 2 * (alw + awh + ahl) + slack
end

puts "Result: #{total}"
