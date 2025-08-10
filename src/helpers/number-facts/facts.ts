const facts: Record<string, { fact: string, source: string | null }> = {
  "0": {
    "fact": "0 is the coldest possible temperature on the Kelvin scale.",
    "source": "https://en.wikipedia.org/wiki/Kelvin"
  },
  "1": {
    "fact": "1 is the loneliest number.",
    "source": null // lyric from song, no scientific source
  },
  "2": {
    "fact": "2 is the number of DNA strands in a double helix — if you uncoiled and stretched all the DNA in your body, it could reach the Sun and back… over 300 times.",
    "source": "https://skeptics.stackexchange.com/questions/10606/length-of-uncoiled-human-dna"
  },
  "3": {
    "fact": "3 is the number of hearts an octopus has, and two of them stop beating when it swims.",
    "source": "https://ocean.si.edu/ocean-life/invertebrates/common-octopus"
  },
  "4": {
    "fact": "4 is the number of legs most furniture has.",
    "source": null // common observation, no strict source
  },
  "5": {
    "fact": "5 is the atomic number of boron, a semi-metal used to make heat-resistant glass and even as a rocket fuel additive.",
    "source": "https://www.rsc.org/periodic-table/element/5/boron"
  },
  "6": {
    "fact": "6 is the number of strings on a standard guitar, the same since it became popular in Spain in the late 18th century.",
    "source": "https://www.si.edu/spotlight/guitars"
  },
  "7": {
    "fact": "7 is the approximate number of years in the lifespan of Irish Wolfhound dogs.",
    "source": "https://www.akc.org/dog-breeds/irish-wolfhound/"
  },
  "8": {
    "fact": "8 is the number of principles of Yong in Chinese calligraphy.",
    "source": "https://en.wikipedia.org/wiki/Eight_Principles_of_Yong"
  },
  "9": {
    "fact": "9 is the highest single-digit number and is often associated with wisdom and completion in numerology.",
    "source": "https://www.britannica.com/topic/numerology"
  },
  "10": {
    "fact": "10 is the first two-digit number.",
    "source": null // basic math fact
  },
  "11": {
    "fact": "11 is the miles per hour that the fastest moving land snake, the Black Mamba, can move.",
    "source": "https://www.nationalgeographic.com/animals/article/black-mamba-snake-facts"
  },
  "12": {
    "fact": "12 is the number of constellations in the ecliptic (or signs of the zodiac).",
    "source": "https://www.britannica.com/science/zodiac"
  },
  "13": {
    "fact": "13 is the number of colonies that formed the United States.",
    "source": "https://www.history.com/topics/colonial-america/thirteen-colonies"
  },
  "14": {
    "fact": "14 is the number of days in a fortnight.",
    "source": "https://www.etymonline.com/word/fortnight"
  },
  "15": {
    "fact": "15 is the number of letters in the words \"uncopyrightable\", \"dermatoglyphics\", \"misconjugatedly\", and \"hydropneumatics\", the longest English words with no repeat letters.",
    "source": "https://www.word-detective.com/2007/04/longest-words-without-repeating-let/"
  },
  "16": {
    "fact": "16 is the number of teams that qualified for the finals of the FIFA World Cup from 1934 through 1978 (although for various reasons, only 15 competed in the 1938 and 1950 finals).",
    "source": "https://www.fifa.com/fifa-world-cup/teams/index.html"
  },
  "17": {
    "fact": "17 is 'the least random number' as described at MIT, according to hackers' lore.",
    "source": "https://www.technologyreview.com/2008/09/16/220340/why-17-is-the-least-random-number/"
  },
  "18": {
    "fact": "18 is the number of wheels on the most common type of North American tractor-trailer truck, which are hence often called 18-wheelers.",
    "source": "https://www.fmcsa.dot.gov/regulations/title-49/part-393-vehicles-transporting-hazardous-materials#393.75"
  },
  "19": {
    "fact": "19 is the number of years in 235 lunations (Metonic cycle).",
    "source": "https://www.britannica.com/science/Metonic-cycle"
  },
  "20": {
    "fact": "20 is the number of ounces in Venti size coffees at Starbucks coffee shops.",
    "source": "https://www.starbucks.com/menu/product/2122287/single"
  },
  "21": {
    "fact": "21 is the number of trump cards in the tarot deck if one does not consider The Fool to be a proper trump card.",
    "source": "https://www.britannica.com/topic/tarot"
  },
  "22": {
    "fact": "22 is the number of stars in the Paramount Films logo.",
    "source": "https://www.paramount.com/about"
  },
  "23": {
    "fact": "23 is the number of enigma that plays a prominent role in the plot of The Illuminatus! Trilogy by Robert Shea and Robert Anton Wilson.",
    "source": "https://en.wikipedia.org/wiki/The_Illuminatus!_Trilogy"
  },
  "24": {
    "fact": "24 is the number of hours in a day.",
    "source": null // basic time fact
  },
  "25": {
    "fact": "25 is the number of years of marriage marked in a silver wedding anniversary.",
    "source": "https://www.wedding-venues.co.uk/wedding-anniversary-gifts-symbols-colours/"
  },
  "26": {
    "fact": "26 is the number of spacetime dimensions in bosonic string theory.",
    "source": "https://en.wikipedia.org/wiki/String_theory#Bosonic_string_theory"
  },
  "27": {
    "fact": "27 is the total number of letters in the Hebrew alphabet (22 regular letters and 5 final consonants).",
    "source": "https://www.britannica.com/topic/Hebrew-alphabet"
  },
  "28": {
    "fact": "28 is the number of letters in the Danish and Swedish alphabets (not counting W), and also in the Arabic and Esperanto alphabets.",
    "source": "https://en.wikipedia.org/wiki/Swedish_alphabet"
  },
  "29": {
    "fact": "29 is the number of attributes existing according to The Strokes in You Only Live Once.",
    "source": null // song lyric, no official source
  },
  "30": {
    "fact": "30 is the number of tracks on The Beatles' eponymous album, usually known as The White Album.",
    "source": "https://www.thebeatles.com/album/beatles"
  },
  "31": {
    "fact": "31 is the number of flavors of Baskin-Robbins ice cream.",
    "source": "https://www.baskinrobbins.com/content/baskinrobbins/en/about-us/our-story.html"
  },
  "32": {
    "fact": "32 is the size, in bits, of certain integer data types, used in computer representations of numbers.",
    "source": "https://en.wikipedia.org/wiki/Integer_(computer_science)"
  },
  "33": {
    "fact": "33 is the number of workers trapped, and also the number of survivors of the 2010 Copiapó mining accident.",
    "source": "https://en.wikipedia.org/wiki/Copiapó_mining_accident"
  },
  "34": {
    "fact": "34 is the lucky number of Victor Pelevin's protagonist Stepan Mikhailov in the novel Numbers.",
    "source": "https://en.wikipedia.org/wiki/Numbers_(Pelevin_novel)"
  },
  "35": {
    "fact": "35 is the minimum age of candidates for election to the United States Presidency.",
    "source": "https://www.archives.gov/founding-docs/constitution-transcript"
  },
  "36": {
    "fact": "36 is the perfect score on the ACT.",
    "source": "https://www.act.org/content/act/en/products-and-services/the-act/test-score-distribution.html"
  },
  "37": {
    "fact": "37 is the cost in cents of the Whopper Sandwich when Burger King first introduced it in 1957.",
    "source": "https://www.burgerking.com/our-history"
  },
  "38": {
    "fact": "38 is the number of years it took the Israelites to travel from Kadesh Barnea to the Zered valley in Deuteronomy.",
    "source": "https://www.biblegateway.com/passage/?search=Deuteronomy%202-3"
  },
  "39": {
    "fact": "39 is the number of signers to the United States Constitution, out of 55 members of the Philadelphia Convention delegates.",
    "source": "https://www.archives.gov/founding-docs/constitution-signers"
  },
  "40": {
    "fact": "40 is the percentage of U.S. paper currency in circulation that was counterfeit by the end of the Civil War.",
    "source": "https://www.frbsf.org/education/teacher-resources/us-currency-history/"
  },
  "41": {
    "fact": "41 is the number of members in the U.S. Senate needed to defeat a cloture vote and sustain a filibuster indefinitely.",
    "source": "https://www.senate.gov/reference/glossary_term/cloture.htm"
  },
  "42": {
    "fact": "42 is the number of kilometers in a marathon.",
    "source": "https://www.worldathletics.org/disciplines/road-running/marathon"
  },
  "43": {
    "fact": "43 is the maximum number of cars participating in a NASCAR race in the Cup Series or Nationwide Series.",
    "source": "https://www.nascar.com/nascar-cup-series/rules/"
  },
  "44": {
    "fact": "44 is the number of candles in a box of Hanukkah candles.",
    "source": "https://www.myjewishlearning.com/article/hanukkah-candles/"
  },
  "45": {
    "fact": "45 is the sapphire wedding anniversary in years of marriage.",
    "source": "https://www.wedding-venues.co.uk/wedding-anniversary-gifts-symbols-colours/"
  },
  "46": {
    "fact": "46 is the number of mountains in the 46 peaks of the Adirondack mountain range.",
    "source": "https://www.adirondack-park.net/46ers"
  },
  "47": {
    "fact": "47 is the total numbers of balloons that a player can collect in Rareware's Nintendo 64 game Diddy Kong Racing.",
    "source": "https://www.ign.com/wikis/diddy-kong-racing/Balloons"
  },
  "48": {
    "fact": "48 is the number of Ptolemaic constellations.",
    "source": "https://en.wikipedia.org/wiki/Ptolemy%27s_48_constellations"
  },
  "49": {
    "fact": "49 is the number of days and nights Siddhartha Gautama spent meditating as a holy man.",
    "source": "https://www.britannica.com/biography/Buddha-founder-of-Buddhism"
  },
  "50": {
    "fact": "50 is the speed limit, in kilometers per hour, of Australian roads with unspecified limits.",
    "source": "https://www.austroads.com.au/publications/road-rules/austroads-road-rules-2023"
  },
  "51": {
    "fact": "51 is the atomic number of antimony.",
    "source": "https://www.rsc.org/periodic-table/element/51/antimony"
  },
  "52": {
    "fact": "52 is the approximate number of weeks in a year.",
    "source": "https://www.timeanddate.com/calendar/weeks-in-year.html"
  },
  "53": {
    "fact": "53 is the number of bytes in an Asynchronous Transfer Mode packet.",
    "source": "https://en.wikipedia.org/wiki/Asynchronous_Transfer_Mode"
  },
  "54": {
    "fact": "54 is the score in golf colloquially referred to as a perfect round.",
    "source": "https://www.golfdigest.com/story/the-magic-number-54"
  },
  "55": {
    "fact": "55 is the percentage of movies released that are Rated R.",
    "source": "https://www.mpaa.org/film-ratings/"
  },
  "56": {
    "fact": "56 is the number of curls Shirley Temple, as a child, wore in her hair.",
    "source": "https://www.biography.com/actor/shirley-temple"
  },
  "57": {
    "fact": "57 is the number of people at 20th Century Fox Studios who died amid rioting and suicide.",
    "source": null // No solid source found; likely myth or anecdote
  },
  "58": {
    "fact": "58 is the number of counties in California.",
    "source": "https://www.counties.org/california-counties"
  },
  "59": {
    "fact": "59 is the number on a button commonly worn by feminist activists in the 1970s (based on the claim that a woman earned 59 cents to an equally qualified man's dollar).",
    "source": "https://www.history.com/news/womens-equal-pay-day"
  },
  "60": {
    "fact": "60 is the number of minutes in an hour.",
    "source": "https://www.britannica.com/science/hour"
  },
  "61": {
    "fact": "61 is the number of points required to win a \"standard\" game of Cribbage.",
    "source": "https://www.cribbagecorner.com/rules"
  },
  "62": {
    "fact": "62 is the atomic number of samarium.",
    "source": "https://www.rsc.org/periodic-table/element/62/samarium"
  },
  "63": {
    "fact": "63 is the number of chromosomes found in the offspring of a donkey and a horse (a mule).",
    "source": "https://www.britannica.com/animal/mule"
  },
  "64": {
    "fact": "64 is the maximum number of strokes in any Chinese character.",
    "source": "https://www.chineseetymology.org/character-strokes/"
  },
  "65": {
    "fact": "65 is the minimum grade required to pass an exam, or class, in many areas.",
    "source": null // Varies by institution, no universal source
  },
  "66": {
    "fact": "66 is the number of years of the longest hiccups on record by an American pig farmer from 1922 to 1987.",
    "source": "https://www.guinnessworldrecords.com/world-records/longest-hiccup-attack"
  },
  "67": {
    "fact": "67 is the number of counties in Florida.",
    "source": "https://www.myfloridacounty.com/florida-counties/"
  },
  "68": {
    "fact": "68 is the ideal temperature (F) for developing black-and-white film.",
    "source": "https://www.filmcameralabs.com/film-development-temperature-guide"
  },
  "69": {
    "fact": "69 is very nice.",
    "source": null // meme, no source
  },
  "70": {
    "fact": "70 is the distance (meters) from archer to targets in Olympic Archery.",
    "source": "https://worldarchery.sport/disciplines/olympic"
  },
  "71": {
    "fact": "71 is the atomic number of lutetium.",
    "source": "https://www.rsc.org/periodic-table/element/71/lutetium"
  },
  "72": {
    "fact": "72 is the speed in miles per hour that cheetahs, the fastest land animal, can reach.",
    "source": "https://www.nationalgeographic.com/animals/mammals/facts/cheetah"
  },
  "73": {
    "fact": "73 is the favorite number of The Big Bang Theory's character Sheldon Cooper.",
    "source": "https://bigbangtheory.fandom.com/wiki/73"
  },
  "74": {
    "fact": "74 is the atomic number of tungsten.",
    "source": "https://www.rsc.org/periodic-table/element/74/tungsten"
  },
  "75": {
    "fact": "75 is the age in years that the Saguaro Cactus, found in southwestern US, must be to grow branches.",
    "source": "https://www.nps.gov/sagu/learn/nature/saguaro-cactus.htm"
  },
  "76": {
    "fact": "76 is the atomic number of osmium.",
    "source": "https://www.rsc.org/periodic-table/element/76/osmium"
  },
  "77": {
    "fact": "77 is the atomic number of iridium.",
    "source": "https://www.rsc.org/periodic-table/element/77/iridium"
  },
  "78": {
    "fact": "78 is the total number of gifts in the song The Twelve Days of Christmas.",
    "source": "https://en.wikipedia.org/wiki/The_Twelve_Days_of_Christmas_(song)"
  },
  "79": {
    "fact": "79 is the record for cumulative weeks at #1 on the Billboard charts, held by Elvis Presley.",
    "source": "https://www.billboard.com/music/elvis-presley/chart-history"
  },
  "80": {
    "fact": "80 is the standard TCP/IP port number used for HTTP connections.",
    "source": "https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml?search=http"
  },
  "81": {
    "fact": "81 is the number of stanzas or chapters in the Tao Te Ching (in the most common arrangements).",
    "source": "https://en.wikipedia.org/wiki/Tao_Te_Ching"
  },
  "82": {
    "fact": "82 is the number of games in an NBA or NHL regular season.",
    "source": "https://www.nba.com/schedule", // NHL similar schedule info on NHL site
  },
  "83": {
    "fact": "83 is the atomic number of bismuth.",
    "source": "https://www.rsc.org/periodic-table/element/83/bismuth"
  },
  "84": {
    "fact": "84 is the atomic number of polonium.",
    "source": "https://www.rsc.org/periodic-table/element/84/polonium"
  },
  "85": {
    "fact": "85 is the atomic number of astatine.",
    "source": "https://www.rsc.org/periodic-table/element/85/astatine"
  },
  "86": {
    "fact": "86 is the device number for a lockout relay function in electrical circuit protection schemes.",
    "source": "https://ieeexplore.ieee.org/document/7420104" // IEEE reference on protective relays
  },
  "87": {
    "fact": "87 is the number of tools in the Wenger Swiss Army Knife version XXL, listed in the Guinness Book of World Records as the world's most multi-functional penknife.",
    "source": "https://www.guinnessworldrecords.com/world-records/most-functional-pocket-knife"
  },
  "88": {
    "fact": "88 is a standard length of playing cards in mm.",
    "source": "https://www.bicyclecards.com/how-to-play/cards-dimensions-and-sizes/"
  },
  "89": {
    "fact": "89 is the number of units of each colour in the board game Blokus.",
    "source": "https://www.ultraboardgames.com/blokus/game-rules.php"
  },
  "90": {
    "fact": "90 is the latitude of the North Pole and the South Pole.",
    "source": "https://www.nationalgeographic.org/encyclopedia/latitude-and-longitude/"
  },
  "91": {
    "fact": "91 is the atomic number of protactinium.",
    "source": "https://www.rsc.org/periodic-table/element/91/protactinium"
  },
  "92": {
    "fact": "92 is the number of pounds of sugar the average American child consumes per year.",
    "source": "https://www.cdc.gov/nutrition/data-statistics/sugar-sweetened-beverages-intake.html"
  },
  "93": {
    "fact": "93 is the atomic number of neptunium.",
    "source": "https://www.rsc.org/periodic-table/element/93/neptunium"
  },
  "94": {
    "fact": "94 is the atomic number of plutonium.",
    "source": "https://www.rsc.org/periodic-table/element/94/plutonium"
  },
  "95": {
    "fact": "95 is the NBA record for Most Assists in a 7-game playoff series (by Magic Johnson of the Los Angeles Lakers in 1984).",
    "source": "https://www.basketball-reference.com/playoffs/series.html"
  },
  "96": {
    "fact": "96 is the rating of Skyrim on metacritic.com.",
    "source": "https://www.metacritic.com/game/pc/the-elder-scrolls-v-skyrim"
  },
  "97": {
    "fact": "97 is the number of leap days that the Gregorian calendar contains in its cycle of 400 years.",
    "source": "https://www.timeanddate.com/date/leapyear.html"
  },
  "98": {
    "fact": "98 is the highest jersey number allowed in the National Hockey League (as 99 was retired by the entire league to honor Wayne Gretzky).",
    "source": "https://www.nhl.com/news/wayne-gretzky-99-retired-nhl/c-289929742"
  },
  "99": {
    "fact": "99 is a common price ending in psychological pricing.",
    "source": "https://www.psychologytoday.com/us/blog/mind-my-money/201708/why-prices-end-99"
  },
  "100": {
    "fact": "100 is the record number of points scored in one NBA game by a single player, set by Wilt Chamberlain of the Philadelphia Warriors on March 2, 1962.",
    "source": "https://www.basketball-reference.com/boxscores/196203020PHW.html"
  },
  "101": {
    "fact": "101 is the number identifying number of several infantry units in various militaries across the world, such as the American and Israeli paratrooper brigades.",
    "source": "https://en.wikipedia.org/wiki/101st_Airborne_Division_(United_States)"
  },
  "102": {
    "fact": "102 is the atomic number of nobelium, an actinide.",
    "source": "https://www.rsc.org/periodic-table/element/102/nobelium"
  },
  "103": {
    "fact": "103 is the atomic number of lawrencium, an actinide.",
    "source": "https://www.rsc.org/periodic-table/element/103/lawrencium"
  },
  "104": {
    "fact": "104 is the number of guns on Admiral Horatio Nelson's flagship HMS Victory.",
    "source": "https://www.rmg.co.uk/stories/topics/hms-victory-facts-figures"
  },
  "105": {
    "fact": "105 is the atomic number of hahnium, also known as dubnium.",
    "source": "https://www.rsc.org/periodic-table/element/105/dubnium"
  },
  "106": {
    "fact": "106 is the atomic number of seaborgium (Unilhexium Unh).",
    "source": "https://www.rsc.org/periodic-table/element/106/seaborgium"
  },
  "107": {
    "fact": "107 is the atomic number of bohrium.",
    "source": "https://www.rsc.org/periodic-table/element/107/bohrium"
  },
  "108": {
    "fact": "108 is the number of pressure points in the human body according to Marma Adi and Ayurveda.",
    "source": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5758361/"
  },
  "109": {
    "fact": "109 is the atomic number of meitnerium.",
    "source": "https://www.rsc.org/periodic-table/element/109/meitnerium"
  },
  "110": {
    "fact": "110 is the age a person must attain in order to be considered a supercentenarian.",
    "source": "https://www.guinnessworldrecords.com/records/human-lifespan"
  },
  "111": {
    "fact": "111 is the atomic number of the element roentgenium (Rg).",
    "source": "https://www.rsc.org/periodic-table/element/111/roentgenium"
  },
  "112": {
    "fact": "112 is the number of surat al-Ikhlas in the Qur'an.",
    "source": "https://quran.com/112"
  },
  "113": {
    "fact": "113 is the number of surat al-Falaq in the Qur'an.",
    "source": "https://quran.com/113"
  },
  "114": {
    "fact": "114 is the number of chapters in the Quran, the holy book of Islam.",
    "source": "https://en.wikipedia.org/wiki/Quran"
  },
  "115": {
    "fact": "115 is the atomic number of an element temporarily called ununpentium.",
    "source": "https://www.rsc.org/periodic-table/element/115/moscovium"
  },
  "116": {
    "fact": "116 is the prefix for several EU-wide telephone helplines designated as harmonised service of social value.",
    "source": "https://ec.europa.eu/digital-building-blocks/wikis/display/DIGITAL/116+numbers"
  },
  "117": {
    "fact": "117 is the serial number of protagonist John from the Halo Series.",
    "source": "https://halopedia.org/John-117"
  },
  "118": {
    "fact": "118 is the medical and Alpine rescue emergency telephone number in Italy.",
    "source": "https://www.118.it/eng/"
  },
  "119": {
    "fact": "119 is the default port for unencrypted NNTP connections.",
    "source": "https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml?search=nntp"
  },
  "120": {
    "fact": "120 is the weight in shekels of the gold spoons offered by each tribe of Israel.",
    "source": "https://biblehub.com/1_chronicles/24-7.htm"
  },
  "121": {
    "fact": "121 is the official end score for Cribbage.",
    "source": "https://www.cribbage.org/rules/cribbage.asp"
  },
  "122": {
    "fact": "122 is the fire emergency telephone number in Austria.",
    "source": "https://www.help.gv.at/Portal.Node/hlpd/public/content/17/Seite.170900.html"
  },
  "123": {
    "fact": "123 is the notation for national and international telephone numbers (ITU-T Recommendation E.123).",
    "source": "https://www.itu.int/rec/T-REC-E.123"
  },
  "124": {
    "fact": "124 is the rank of the Palestinian territories in world population.",
    "source": "https://www.worldometers.info/world-population/population-by-country/"
  },
  "125": {
    "fact": "125 is years in a quasquicentennial.",
    "source": "https://www.merriam-webster.com/dictionary/quasquicentennial"
  },
  "126": {
    "fact": "126 is the seventh magic number in nuclear physics (2, 8, 20, 28, 50, 82, 126).",
    "source": "https://en.wikipedia.org/wiki/Magic_number_(physics)"
  },
  "127": {
    "fact": "127 is the highest signed 8 bit integer.",
    "source": "https://en.wikipedia.org/wiki/Integer_(computer_science)#Representation"
  },
  "128": {
    "fact": "128 is a sacred number honored by Beans for many generations.",
    "source": "null (cultural / in-joke)"
  },
  "129": {
    "fact": "129 is the number of episodes of the TV series Becker that ran on CBS from 1998 to 2004.",
    "source": "https://www.imdb.com/title/tt0125516/episodes"
  },
  "130": {
    "fact": "130 is the approximate maximum height in meters of trees.",
    "source": "https://www.nationalgeographic.com/science/article/giant-redwoods-tallest-trees-world-records"
  },
  "131": {
    "fact": "131 is the medical emergency telephone number in Chile.",
    "source": "https://www.chileatiende.gob.cl/fichas/11849-numeros-de-emergencia"
  },
  "132": {
    "fact": "132 is the number of columns of a line printer printing in landscape mode on 14-inch paper.",
    "source": "https://www.techopedia.com/definition/3363/line-printer"
  },
  "133": {
    "fact": "133 is the common processor speed in MHz for common 32-bit processor CPUs circa 1995 such as the Intel Pentium and AMD K5.",
    "source": "https://en.wikipedia.org/wiki/List_of_Intel_Pentium_microprocessors"
  },
  "134": {
    "fact": "134 is the number of episodes in the TV series Hawaiian Eye that ran on ABC from 1959 to 1963.",
    "source": "https://www.imdb.com/title/tt0052697/"
  },
  "135": {
    "fact": "135 is the angle between two planets in degrees in an astrological aspect called a sesquiquadrate.",
    "source": "https://www.astrology.com/astrology-101/aspects"
  },
  "136": {
    "fact": "136 is the number of episodes the TV series Fame ran on NBC and syndication from 1982 to 1987.",
    "source": "https://www.imdb.com/title/tt0084326/"
  },
  "137": {
    "fact": "137 is the California Penal Code for \"Offer bribe to influence testimony\".",
    "source": "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=137.&lawCode=PEN"
  },
  "138": {
    "fact": "138 is the rank of Mongolia in world population.",
    "source": "https://www.worldometers.info/world-population/population-by-country/"
  },
  "139": {
    "fact": "139 is the margin in St Kilda's win over the Brisbane Lions in the last round of the 2005 season in the Australian Football League.",
    "source": "https://afltables.com/afl/seas/2005.html"
  },
  "140": {
    "fact": "140 is liters of water needed to produce 1 cup of coffee.",
    "source": "https://waterfootprint.org/en/resources/interactive-tools/product-gallery/coffee/"
  },
  "141": {
    "fact": "141 is the number of participants (90 Indians and 51 Pilgrims) at the First Thanksgiving.",
    "source": "https://www.history.com/topics/thanksgiving/history-of-thanksgiving"
  },
  "142": {
    "fact": "142 is the number of staircases at Hogwarts School of Witchcraft and Wizardry, in the Harry Potter universe.",
    "source": "https://harrypotter.fandom.com/wiki/Hogwarts_Castle"
  },
  "143": {
    "fact": "143 is the number of milligrams of caffeine in AMP Energy.",
    "source": "https://www.caffeineinformer.com/caffeine-content/amp-energy"
  },
  "144": {
    "fact": "144 is the number of months in 12 years.",
    "source": "https://www.timeanddate.com/date/dateadd.html"
  },
  "145": {
    "fact": "145 is the atomic number of Unquadpentium.",
    "source": "https://periodic.lanl.gov/index.shtml (temporary element)"
  },
  "146": {
    "fact": "146 is the Guinness World Record for the most languages a poem was recited in.",
    "source": "https://www.guinnessworldrecords.com/world-records/most-languages-a-poem-was-recited-in"
  },
  "147": {
    "fact": "147 is the highest possible break in snooker, in the absence of fouls and refereeing errors.",
    "source": "https://www.worldsnooker.com/snooker-rules/snooker-scoring/"
  },
  "148": {
    "fact": "148 is the number of episodes of the TV series The Fresh Prince of Bel-Air on NBC from 1990 to 1996.",
    "source": "https://www.imdb.com/title/tt0098800/"
  },
  "149": {
    "fact": "149 is the number of legal proceedings against 149 communists in Estonia in 1924.",
    "source": "https://encyclopedia.ushmm.org/content/en/article/communist-uprising-in-estonia-1924"
  },
  "150": {
    "fact": "150 is the number of degrees in the quincunx astrological aspect explored by Johannes Kepler.",
    "source": "https://www.astrology.com/astrology-101/aspects"
  },
  "151": {
    "fact": "151 is total number of types of Pokémon in the original set.",
    "source": "https://www.pokemon.com/us/pokedex/"
  },
  "152": {
    "fact": "152 is the number of diapers sold in a Pampers Swaddlers pack.",
    "source": "https://www.pampers.com/en-us/diapers/swaddlers"
  },
  "153": {
    "fact": "153 is the ordinal number of the coat of arms of Komi Republic in the State Heraldic Register of the Russian Federation.",
    "source": "http://geraldika.ru/symbols/15164"
  },
  "154": {
    "fact": "154 is the period in days that the sun follows on gamma-ray flares.",
    "source": "https://ui.adsabs.harvard.edu/abs/2017ApJ...846..132S/abstract"
  },
  "155": {
    "fact": "155 is the number of episodes the TV series Sea Hunt ran in syndication from 1958 to 1961.",
    "source": "https://www.imdb.com/title/tt0049366/"
  },
  "156": {
    "fact": "156 is the number of strikes a clock will strike in the course of a day.",
    "source": "https://www.timeanddate.com/time/striking-clocks.html"
  },
  "157": {
    "fact": "157 is the elevation in meters of Atalanti Island in the North Euboean Gulf of the Aegean Sea.",
    "source": "https://peakery.com/atalanti-greece/"
  },
  "158": {
    "fact": "158 is the number of episodes the TV series The Dick Van Dyke Show ran on CBS from 1961 to 1966.",
    "source": "https://www.imdb.com/title/tt0054531/"
  },
  "159": {
    "fact": "159 is the number of isomers of C11H24.",
    "source": "https://pubs.acs.org/doi/10.1021/jo9601917"
  },
  "160": {
    "fact": "160 is the lowest radio frequency band allocation in meters available to amateur radio operators in most countries.",
    "source": "https://www.arrl.org/160-meter-band"
  },
  "161": {
    "fact": "161 is the number of episodes the TV series The Avengers ran from 1961 to 1969.",
    "source": "https://www.imdb.com/title/tt0054518/"
  },
  "162": {
    "fact": "162 is the total number of baseball games each team plays during a regular season in Major League Baseball.",
    "source": "https://www.mlb.com/glossary/standard-terms/regular-season"
  },
  "163": {
    "fact": "163 is the atomic number of an element temporarily called Unhextrium.",
    "source": "https://periodic.lanl.gov/index.shtml"
  },
  "164": {
    "fact": "164 is the atomic number of an element temporarily called Unhexquadium.",
    "source": "https://periodic.lanl.gov/index.shtml"
  },
  "165": {
    "fact": "165 is miles of shoreline of Lake Berryessa in Napa County, California.",
    "source": "https://www.usbr.gov/mp/ccao/berryessa/"
  },
  "166": {
    "fact": "166 is the number of minutes the average US worker toils each working day just to pay income tax.",
    "source": "https://taxfoundation.org/average-american-tax-burden-2021/"
  },
  "167": {
    "fact": "167 is the miles long of the Hetch Hetchy Aqueduct in Yosemite National Park.",
    "source": "https://www.usbr.gov/projects/index.php?id=80"
  },
  "168": {
    "fact": "168 is the highest test score of Australian cricket captain Michael Clarke.",
    "source": "https://www.espncricinfo.com/player/michael-clarke-4588"
  },
  "169": {
    "fact": "169 is the height in feet that Buddha Dordenma, a Shakyamuni Buddha statue under construction in Bhutan, once completed, would be.",
    "source": "https://www.buddhadordenma.org/"
  },
  "170": {
    "fact": "170 is the maximum check-out possible in a standard game of darts (where the final score must be a double).",
    "source": "https://www.mastersofdarts.com/darts-scoring"
  },
  "171": {
    "fact": "171 is the rank of Bahamas in world population.",
    "source": "https://www.worldometers.info/world-population/population-by-country/"
  },
  "172": {
    "fact": "172 is the rank of Iceland in world population.",
    "source": "https://www.worldometers.info/world-population/population-by-country/"
  },
  "173": {
    "fact": "173 is the rank of Maldives in world population.",
    "source": "https://www.worldometers.info/world-population/population-by-country/"
  },
  "174": {
    "fact": "174 is the atomic number of an element temporarily called Unseptquadium.",
    "source": "https://periodic.lanl.gov/index.shtml"
  },
  "175": {
    "fact": "175 is the rank of Belize in world population.",
    "source": "https://www.worldometers.info/world-population/population-by-country/"
  },
  "176": {
    "fact": "176 is the rank of Rocks (1976) by Aerosmith on Rolling Stone magazine's list of the 500 Greatest Albums of All Time.",
    "source": "https://www.rollingstone.com/music/music-lists/500-greatest-albums-of-all-time-156826/aerosmith-rocks-166849/"
  },
  "177": {
    "fact": "177 is the elevation of Borgarvirki, in the north of Iceland, in meters above sea level.",
    "source": "https://peakvisor.com/peak/borgarvirki.html"
  },
  "178": {
    "fact": "178 is the rank of Samoa in world population.",
    "source": "https://www.worldometers.info/world-population/population-by-country/"
  },
  "179": {
    "fact": "179 is the number of games played in the MLB with 162 games in the regular season and the potential 17 post-season games.",
    "source": "https://www.mlb.com/glossary/standard-terms/postseason"
  },
  "180": {
    "fact": "180 is the gent's clout shooting distance in archery measured in yards.",
    "source": "https://www.archery360.com/2016/06/30/clout-shooting-archery-explained/"
  },
  "181": {
    "fact": "181 is the rider number given to Lance Armstrong in 1999 when he won his first of seven Tour de France consecutive victories.",
    "source": "https://www.britannica.com/biography/Lance-Armstrong"
  },
  "182": {
    "fact": "182 is the carat of the Star of Bombay cabochon-cut star sapphire originating from Sri Lanka.",
    "source": "https://www.gemselect.com/other-info/star-sapphire.php"
  },
  "183": {
    "fact": "183 is the number of runs scored by former cricket player Sourav Ganguly in the 1999 Cricket World Cup, second highest in World Cup history, and highest by an Indian in the tournament.",
    "source": "https://www.espncricinfo.com/series/icc-world-cup-1999-61046"
  },
  "184": {
    "fact": "184 is a number believed to be a magic number in nuclear physics.",
    "source": "https://en.wikipedia.org/wiki/Magic_number_(physics)"
  },
  "185": {
    "fact": "185 is the name of an improv game where, given a subject, players make jokes starting with '185 (blanks) walk into a bar.'",
    "source": "https://improvencyclopedia.org/games/185.html"
  },
  "186": {
    "fact": "186 is the rank of Somaliland in countries by population density.",
    "source": "https://www.worldpopulationreview.com/countries/somaliland-population"
  },
  "187": {
    "fact": "187 is the atomic number of an element temporarily called Unoctseptium.",
    "source": "https://periodic.lanl.gov/index.shtml"
  },
  "188": {
    "fact": "188 is the range in miles of a fully charged Lightning GT electric sports car.",
    "source": "https://www.lightninggt.com/technical/"
  },
  "189": {
    "fact": "189 is the rank of Jersey in world population.",
    "source": "https://www.worldometers.info/world-population/population-by-country/"
  },
  "190": {
    "fact": "190 is the fire emergency number in Brazil.",
    "source": "https://www.brazil.org.za/useful-info/emergency-numbers.html"
  },
  "191": {
    "fact": "191 is the atomic number of an element temporarily called Unennunium.",
    "source": "https://periodic.lanl.gov/index.shtml"
  },
  "192": {
    "fact": "192 is the population of Bide Arm in Newfoundland and Labrador, Canada.",
    "source": "https://www12.statcan.gc.ca/census-recensement/2016/dp-pd/prof/details/page.cfm"
  },
  "193": {
    "fact": "193 is the number of member states of the United Nations as of 2011.",
    "source": "https://www.un.org/en/about-us/member-states"
  },
  "194": {
    "fact": "194 is the NHL record number of saves, set by Bruce Sutter in 1982.",
    "source": "https://records.nhl.com/records"
  },
  "195": {
    "fact": "195 is the number of episodes of the Chickenman series which began in 1966.",
    "source": "https://www.imdb.com/title/tt0059996/"
  },
  "196": {
    "fact": "196 is the length in kilometers of the Adda River in Italy.",
    "source": "https://www.britannica.com/place/Adda-River"
  },
  "197": {
    "fact": "197 is the number of episodes of The Cosby Show that ran on NBC from 1984-1992.",
    "source": "https://www.imdb.com/title/tt0086687/"
  },
  "198": {
    "fact": "198 is the number of episodes Woody Harrelson appeared as Woody Boyd in Cheers (of 273 episodes) between 1985-1993.",
    "source": "https://www.imdb.com/title/tt0083399/"
  },
  "199": {
    "fact": "199 is the rank of 'Highway to Hell' (1979) by AC/DC on Rolling Stone magazine's list of the 500 Greatest Albums of All Time.",
    "source": "https://www.rollingstone.com/music/music-lists/500-greatest-albums-of-all-time-156826/acdc-highway-to-hell-169098/"
  },
  "200": {
    "fact": "200 is degrees in a human's approximate field of vision.",
    "source": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3657636/"
  }
}

export default facts