require 'pp'
require 'json'
require 'csv'

lists = Dir["./_lists/*"].each.reject{|f| f['.json']}
files = Array.new
lists.map do |list|
    files << list.split(".csv")[0].gsub("_lists","_data")
end

lists.each_with_index  do |list, i|
    objects = Hash.new
    items = Array.new
    CSV.foreach(list, :headers => true, :header_converters => :symbol, :converters => :all) do |row|
        if row.fields[0].is_a? Integer
            items << Hash[row.headers[0..-1].zip(row.fields[0..-1])]
        else
            objects[row.fields[0]] = Hash[row.headers[1..-1].zip(row.fields[1..-1])]
        end
    end
    objects['items'] = items.sort_by { |k| k["id"] } if items.length > 0
    File.open(files[i]+'.json', 'w+') { |f| f.write(JSON.pretty_generate(objects)) }
end