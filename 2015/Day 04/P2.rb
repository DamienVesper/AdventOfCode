require 'openssl'

data = File.read("input.txt")

for i in 1..10000000 do
    md5 = OpenSSL::Digest::MD5.hexdigest(data + i.to_s())
    if md5 =~ /^000000/
        puts "Result: #{i}"
        exit
    end
end
