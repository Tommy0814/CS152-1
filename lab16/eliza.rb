#! /usr/bin/ruby -w

#Represents a Rogerian psychiatrist
class Shrink

  #initializes 'memory' of Eliza.
  def initialize()
    @he="he"
    @she="she"
	@they="they"
  end

  #read a statement and convert it to a psychiatric response.
  def generateResponse(blather)
    #downcase for ease of substitution
    blather = blather.downcase

	#Adding new rules
	#If the patient says "always", "never", or something similar, Eliza should respond CAN YOU BE MORE SPECIFIC?
	if (blather.chomp.to_s == "always" || (blather.chomp.to_s.eql? "never"))
		blather = "CAN YOU BE MORE SPECIFIC"
	end
	
	#If the patient asks a question beginning with "Are you" or something similar, ELIZA should respond with IS IT IMPORTANT IF I AM <original statement>
	if (blather.split[0].to_s == "are" && blather.split[1].to_s == "you")
		blather.sub!(/\b(are you)\b/, "IS IT IMPORTANT IF I AM")
	end
	
	#Filter out words like 'Well" or "Perhaps" from the beginning of the sentence.
	if blather.start_with?("well")
		blather = blather.split(' ')[1..-1].join(' ')
	elsif blather.start_with?("perhaps")
		blather = blather.split(' ')[1..-1].join(' ')
	elsif blather.start_with?("also") #extra also remove
		blather = blather.split(' ')[1..-1].join(' ')
	end
	
	if blather.include? "was"
		blather.gsub!(/\bwas\b/, "were") #extra tense correction
	elsif blather.include? "were"
		blather.gsub!(/\bwere\b/, "was") #extra tense correction
	end
	
	if blather.include? "am"
		blather.gsub!(/\bam\b/, "are") #extra tense correction
	elsif blather.include? "are"
		blather.gsub!(/\bare\b/, "am") #extra tense correction
	end
	
    #change 'you', 'your', etc. to uppercase 'I', 'MY'
    blather.gsub!(/\byour\b/,"MY")
    blather.gsub!(/\byou\b/,'I')

    #Replace 'my' with 'your', 'me' with 'you', 'I' with 'you', etc.
    blather.gsub!(/\bmy\b/,"your")
    blather.gsub!(/\bme\b/,"you")
    blather.gsub!(/\bi\b/,'you')

    #Sub in past references, but only for the 1st occurrence or it looks weird
    blather.sub!(/\b(he|him)\b/, @he)
    blather.sub!(/\b(she|her)\b/, @she)
	#Add an additional memory for Eliza to support "they", following the pattern for "he" and "she".
	blather.sub!(/\b(they|them)\b/, @they)

    #Get future references -- note that these do NOT change the immediate output
    hePat=/.*\b(your (father|brother|(ex-?)?(husband|boyfriend)))\b.*/
    shePat = /.*\b(your (mother|sister|(ex-?)?(wife|girlfriend)))\b.*/
    @he=blather.sub(hePat, '\1').chomp if blather =~ hePat 
    @she=blather.sub(shePat, '\1').chomp if blather =~ shePat
	#Get future references
	theyPat=/.*\b(your (family|friends|classmates|roommates|teachers|group))\b.*/
	@they=blather.sub(theyPat, '\1').chomp if blather =~ theyPat 

    #Deal with name
    namePat=/.*\byour name is (\w+).*/
    @name=blather.sub(namePat,'\1')
    blather.sub!(namePat,'nice to meet you, \1.  How can I help you')
	
	#Extra say my own name
	blather.sub!(/what is MY name/, "I am Eliza, what about you")

    #results are uppercased, for aesthetics.
    return blather.upcase.chomp + "?"
  end
end


#main -- reads from standard input unless -test is the first parameter.
eliza = Shrink.new()
if ARGV[0] == "-test"
    ['My girlfriend never listens to me',
     "I think she might be deaf",
     "yes",
     "I am afraid of clowns",
     "Well, they just seem creepy",
     "Also, when I was a kid, a clown killed my dad",
      "Are you a clown in disguise?",
    ].each do |stmt|
        puts stmt
        puts eliza.generateResponse(stmt)
    end
else
  while line = gets
    response = eliza.generateResponse line
    puts response
  end
end
