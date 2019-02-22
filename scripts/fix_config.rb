#!/usr/bin/env ruby

# PARAM 1 - prod|staging|dev

def replace_line_in_file(file_name, line_pattern, replacement)
  text = File.read(file_name)
  puts("replacing '#{line_pattern}' with '#{replacement}'")
  new_contents = text.gsub(line_pattern, replacement)
  File.open(file_name, "w") {|file| file.puts new_contents }
end


# fixes list
configs = ['prod', 'staging', 'dev']
fix1 = ['android/app/src/main/java/com/locktrip/StompModule.java', 
        /String _url.*/,
        {
          'prod'    => "String _url = \"wss://beta.locktrip.com/socket\";",
          'staging' => "String _url = \"wss://staging.locktrip.com/socket\";",
          'dev'     => "String _url = \"wss://dev.locktrip.com/socket\";"
        }
]

# execute
fixes = [fix1];
cfg = ARGV[0]

puts("#{ARGV.count}")
if configs.index(cfg) != nil && ARGV.count == 1 && ['help','--help','/h','-h'].index(cfg) == nil
  fixes.each do |item|
    file = item[0]
    regexp = item[1]
    repl = item[2][cfg]
    puts("Reading file #{file}")
    puts("Replacing regexp result of '#{regexp}' with '#{repl}'")
    replace_line_in_file(file, regexp, repl)
  end
end