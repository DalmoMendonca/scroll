// Generated journey data — the 24 books of the Tanakh as regions of one world.
// 200 comprehensive beats. Caption text is King James Version scripture from the
// Hebrew Bible (the scene); each echo is a King James New Testament verse that
// the story points toward. Per-book visual fields from the tanakh-journey-script.

export const SECTION_NAMES = { Torah: 'Torah', Neviim: "Nevi\u2019im", Ketuvim: 'Ketuvim' };

export const THREAD_COLORS = { core: '#ff4d3a', bright: '#ffcf6b' };

export const BOOKS = [
  {
    "id": "genesis",
    "ordinal": 1,
    "en": "Genesis",
    "he": "בְּרֵאשִׁית",
    "translit": "Bereshit",
    "section": "Torah",
    "oneLine": "First light over the deep",
    "setting": "A young green world threaded by bright rivers, its hills still soft as if newly shaped. Eastward the land dries into flood-scoured plain and bare summits under an enormous night sky.",
    "terrain": {
      "style": "riverlands",
      "amplitude": 0.45,
      "water": "river"
    },
    "palette": {
      "skyTop": "#150f2e",
      "skyHorizon": "#7a5a7e",
      "fog": "#3a2f52",
      "sun": "#f2d8a0",
      "sunElevation": -0.05,
      "terrainLow": "#0e0a1f",
      "terrainHigh": "#3d3358",
      "accent": "#ffe9b8",
      "timeOfDay": "predawn",
      "stars": 0.55
    },
    "particles": "stars",
    "creatures": [
      "birds",
      "serpent",
      "doves"
    ],
    "threadGlow": 0.15,
    "stories": [
      {
        "title": "Creation begins",
        "verses": [
          {
            "t": "In the beginning God created the heaven and the earth. And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.",
            "ref": "Genesis 1:1–2"
          }
        ],
        "echo": {
          "t": "In the beginning was the Word, and the Word was with God, and the Word was God. The same was in the beginning with God.",
          "ref": "John 1:1–2"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "Humanity is made in God’s image",
        "verses": [
          {
            "t": "And God said, Let us make man in our image, after our likeness: and let them have dominion over the fish of the sea, and over the fowl of the air, and over the cattle, and over all the earth, and over every creeping thing that creepeth upon the earth. So God created man in his own image, in the image of God created he him; male and female created he them.",
            "ref": "Genesis 1:26–27"
          }
        ],
        "echo": {
          "t": "Who is the image of the invisible God, the firstborn of every creature: For by him were all things created, that are in heaven, and that are in earth, visible and invisible, whether they be thrones, or dominions, or principalities, or powers: all things were created by him, and for him:",
          "ref": "Colossians 1:15–16"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "Adam receives the garden and command",
        "verses": [
          {
            "t": "And the LORD God commanded the man, saying, Of every tree of the garden thou mayest freely eat: But of the tree of the knowledge of good and evil, thou shalt not eat of it: for in the day that thou eatest thereof thou shalt surely die.",
            "ref": "Genesis 2:16–17"
          }
        ],
        "echo": {
          "t": "Wherefore, as by one man sin entered into the world, and death by sin; and so death passed upon all men, for that all have sinned: (For until the law sin was in the world: but sin is not imputed when there is no law.",
          "ref": "Romans 5:12–13"
        },
        "prop": "gardenTree",
        "flare": false
      },
      {
        "title": "Woman and man become one flesh",
        "verses": [
          {
            "t": "And Adam said, This is now bone of my bones, and flesh of my flesh: she shall be called Woman, because she was taken out of Man. Therefore shall a man leave his father and his mother, and shall cleave unto his wife: and they shall be one flesh.",
            "ref": "Genesis 2:23–24"
          }
        ],
        "echo": {
          "t": "And he answered and said unto them, Have ye not read, that he which made them at the beginning made them male and female, And said, For this cause shall a man leave father and mother, and shall cleave to his wife: and they twain shall be one flesh?",
          "ref": "Matthew 19:4–5"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "The serpent deceives and humanity falls",
        "verses": [
          {
            "t": "And when the woman saw that the tree was good for food, and that it was pleasant to the eyes, and a tree to be desired to make one wise, she took of the fruit thereof, and did eat, and gave also unto her husband with her; and he did eat.",
            "ref": "Genesis 3:6–7"
          }
        ],
        "echo": {
          "t": "Therefore as by the offence of one judgment came upon all men to condemnation; even so by the righteousness of one the free gift came upon all men unto justification of life. For as by one man’s disobedience many were made sinners, so by the obedience of one shall many be made righteous.",
          "ref": "Romans 5:18–19"
        },
        "prop": "gardenTree",
        "flare": false
      },
      {
        "title": "God announces the conflict of the woman’s seed",
        "verses": [
          {
            "t": "And the LORD God said unto the serpent, Because thou hast done this, thou art cursed above all cattle, and above every beast of the field; upon thy belly shalt thou go, and dust shalt thou eat all the days of thy life: And I will put enmity between thee and the woman, and between thy seed and her seed; it shall bruise thy head, and thou shalt bruise his heel.",
            "ref": "Genesis 3:14–15"
          }
        ],
        "echo": {
          "t": "Forasmuch then as the children are partakers of flesh and blood, he also himself likewise took part of the same; that through death he might destroy him that had the power of death, that is, the devil; And deliver them who through fear of death were all their lifetime subject to bondage.",
          "ref": "Hebrews 2:14–15"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "Adam and Eve are expelled from Eden",
        "verses": [
          {
            "t": "Therefore the LORD God sent him forth from the garden of Eden, to till the ground from whence he was taken. So he drove out the man; and he placed at the east of the garden of Eden Cherubims, and a flaming sword which turned every way, to keep the way of the tree of life.",
            "ref": "Genesis 3:23–24"
          }
        ],
        "echo": {
          "t": "And he shewed me a pure river of water of life, clear as crystal, proceeding out of the throne of God and of the Lamb.",
          "ref": "Revelation 22:1–2"
        },
        "prop": "pillarOfFire",
        "flare": false
      },
      {
        "title": "Cain murders Abel",
        "verses": [
          {
            "t": "And Cain talked with Abel his brother: and it came to pass, when they were in the field, that Cain rose up against Abel his brother, and slew him. And the LORD said unto Cain, Where is Abel thy brother? And he said, I know not: Am I my brother’s keeper?",
            "ref": "Genesis 4:8–9"
          }
        ],
        "echo": {
          "t": "Not as Cain, who was of that wicked one, and slew his brother. And wherefore slew he him? Because his own works were evil, and his brother’s righteous. Marvel not, my brethren, if the world hate you.",
          "ref": "1 John 3:12–13"
        },
        "prop": "altar",
        "flare": false
      },
      {
        "title": "Human violence fills the earth",
        "verses": [
          {
            "t": "And God saw that the wickedness of man was great in the earth, and that every imagination of the thoughts of his heart was only evil continually. And it repented the LORD that he had made man on the earth, and it grieved him at his heart.",
            "ref": "Genesis 6:5–6"
          }
        ],
        "echo": {
          "t": "But as the days of Noe were, so shall also the coming of the Son of man be.",
          "ref": "Matthew 24:37–38"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "God covenants with Noah and commands the ark",
        "verses": [
          {
            "t": "But with thee will I establish my covenant; and thou shalt come into the ark, thou, and thy sons, and thy wife, and thy sons’ wives with thee. And of every living thing of all flesh, two of every sort shalt thou bring into the ark, to keep them alive with thee; they shall be male and female.",
            "ref": "Genesis 6:18–19"
          }
        ],
        "echo": {
          "t": "Which sometime were disobedient, when once the longsuffering of God waited in the days of Noah, while the ark was a preparing, wherein few, that is, eight souls were saved by water.",
          "ref": "1 Peter 3:20–21"
        },
        "prop": "ark",
        "flare": false
      },
      {
        "title": "The floodwaters recede",
        "verses": [
          {
            "t": "And God remembered Noah, and every living thing, and all the cattle that was with him in the ark: and God made a wind to pass over the earth, and the waters asswaged; The fountains also of the deep and the windows of heaven were stopped, and the rain from heaven was restrained;",
            "ref": "Genesis 8:1–2"
          }
        ],
        "echo": {
          "t": "For this they willingly are ignorant of, that by the word of God the heavens were of old, and the earth standing out of the water and in the water: Whereby the world that then was, being overflowed with water, perished:",
          "ref": "2 Peter 3:5–6"
        },
        "prop": "ark",
        "flare": false
      },
      {
        "title": "God gives the rainbow covenant",
        "verses": [
          {
            "t": "And God said, This is the token of the covenant which I make between me and you and every living creature that is with you, for perpetual generations: I do set my bow in the cloud, and it shall be for a token of a covenant between me and the earth.",
            "ref": "Genesis 9:12–13"
          }
        ],
        "echo": {
          "t": "And immediately I was in the spirit: and, behold, a throne was set in heaven, and one sat on the throne. And he that sat was to look upon like a jasper and a sardine stone: and there was a rainbow round about the throne, in sight like unto an emerald.",
          "ref": "Revelation 4:2–3"
        },
        "prop": "rainbow",
        "flare": false
      },
      {
        "title": "Humanity builds Babel",
        "verses": [
          {
            "t": "And they said, Go to, let us build us a city and a tower, whose top may reach unto heaven; and let us make us a name, lest we be scattered abroad upon the face of the whole earth. And the LORD came down to see the city and the tower, which the children of men builded.",
            "ref": "Genesis 11:4–5"
          }
        ],
        "echo": {
          "t": "Now when this was noised abroad, the multitude came together, and were confounded, because that every man heard them speak in his own language. And they were all amazed and marvelled, saying one to another, Behold, are not all these which speak Galilaeans?",
          "ref": "Acts 2:6–7"
        },
        "prop": "ziggurat",
        "flare": false
      },
      {
        "title": "Abram is called to bless the nations",
        "verses": [
          {
            "t": "And I will make of thee a great nation, and I will bless thee, and make thy name great; and thou shalt be a blessing: And I will bless them that bless thee, and curse him that curseth thee: and in thee shall all families of the earth be blessed.",
            "ref": "Genesis 12:2–3"
          }
        ],
        "echo": {
          "t": "And the scripture, foreseeing that God would justify the heathen through faith, preached before the gospel unto Abraham, saying, In thee shall all nations be blessed. So then they which be of faith are blessed with faithful Abraham.",
          "ref": "Galatians 3:8–9"
        },
        "prop": "tent",
        "flare": false
      },
      {
        "title": "Melchizedek blesses Abram",
        "verses": [
          {
            "t": "And Melchizedek king of Salem brought forth bread and wine: and he was the priest of the most high God. And he blessed him, and said, Blessed be Abram of the most high God, possessor of heaven and earth:",
            "ref": "Genesis 14:18–19"
          }
        ],
        "echo": {
          "t": "For this Melchisedec, king of Salem, priest of the most high God, who met Abraham returning from the slaughter of the kings, and blessed him; To whom also Abraham gave a tenth part of all; first being by interpretation King of righteousness, and after that also King of Salem, which is, King of peace;",
          "ref": "Hebrews 7:1–2"
        },
        "prop": "altar",
        "flare": false
      },
      {
        "title": "Abram believes God’s covenant promise",
        "verses": [
          {
            "t": "And he brought him forth abroad, and said, Look now toward heaven, and tell the stars, if thou be able to number them: and he said unto him, So shall thy seed be. And he believed in the LORD; and he counted it to him for righteousness.",
            "ref": "Genesis 15:5–6"
          }
        ],
        "echo": {
          "t": "Even as Abraham believed God, and it was accounted to him for righteousness. Know ye therefore that they which are of faith, the same are the children of Abraham.",
          "ref": "Galatians 3:6–7"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "Hagar encounters God in the wilderness",
        "verses": [
          {
            "t": "And the angel of the LORD said unto her, Return to thy mistress, and submit thyself under her hands. And the angel of the LORD said unto her, I will multiply thy seed exceedingly, that it shall not be numbered for multitude.",
            "ref": "Genesis 16:9–10"
          }
        ],
        "echo": {
          "t": "For it is written, that Abraham had two sons, the one by a bondmaid, the other by a freewoman. But he who was of the bondwoman was born after the flesh; but he of the freewoman was by promise.",
          "ref": "Galatians 4:22–23"
        },
        "prop": "well",
        "flare": false
      },
      {
        "title": "God promises Isaac as the covenant son",
        "verses": [
          {
            "t": "And God said, Sarah thy wife shall bear thee a son indeed; and thou shalt call his name Isaac: and I will establish my covenant with him for an everlasting covenant, and with his seed after him. And as for Ishmael, I have heard thee: Behold, I have blessed him, and will make him fruitful, and will multiply him exceedingly; twelve princes shall he beget, and I will make him a great nation.",
            "ref": "Genesis 17:19–20"
          }
        ],
        "echo": {
          "t": "Neither, because they are the seed of Abraham, are they all children: but, In Isaac shall thy seed be called. That is, They which are the children of the flesh, these are not the children of God: but the children of the promise are counted for the seed.",
          "ref": "Romans 9:7–8"
        },
        "prop": "tent",
        "flare": false
      },
      {
        "title": "Sarah laughs at the promised birth",
        "verses": [
          {
            "t": "Now Abraham and Sarah were old and well stricken in age; and it ceased to be with Sarah after the manner of women. Therefore Sarah laughed within herself, saying, After I am waxed old shall I have pleasure, my lord being old also?",
            "ref": "Genesis 18:11–12"
          }
        ],
        "echo": {
          "t": "Through faith also Sara herself received strength to conceive seed, and was delivered of a child when she was past age, because she judged him faithful who had promised.",
          "ref": "Hebrews 11:11–12"
        },
        "prop": "tent",
        "flare": false
      },
      {
        "title": "Abraham intercedes for Sodom",
        "verses": [
          {
            "t": "Peradventure there be fifty righteous within the city: wilt thou also destroy and not spare the place for the fifty righteous that are therein? That be far from thee to do after this manner, to slay the righteous with the wicked: and that the righteous should be as the wicked, that be far from thee: Shall not the Judge of all the earth do right?",
            "ref": "Genesis 18:24–25"
          }
        ],
        "echo": {
          "t": "But this man, because he continueth ever, hath an unchangeable priesthood. Wherefore he is able also to save them to the uttermost that come unto God by him, seeing he ever liveth to make intercession for them.",
          "ref": "Hebrews 7:24–25"
        },
        "prop": "city",
        "flare": false
      },
      {
        "title": "Sodom falls and Lot’s wife looks back",
        "verses": [
          {
            "t": "And he overthrew those cities, and all the plain, and all the inhabitants of the cities, and that which grew upon the ground. But his wife looked back from behind him, and she became a pillar of salt.",
            "ref": "Genesis 19:25–26"
          }
        ],
        "echo": {
          "t": "Even as Sodom and Gomorrha, and the cities about them in like manner, giving themselves over to fornication, and going after strange flesh, are set forth for an example, suffering the vengeance of eternal fire.",
          "ref": "Jude 7"
        },
        "prop": "city",
        "flare": false
      },
      {
        "title": "Isaac is born",
        "verses": [
          {
            "t": "And the LORD visited Sarah as he had said, and the LORD did unto Sarah as he had spoken. For Sarah conceived, and bare Abraham a son in his old age, at the set time of which God had spoken to him.",
            "ref": "Genesis 21:1–2"
          }
        ],
        "echo": {
          "t": "Now we, brethren, as Isaac was, are the children of promise. But as then he that was born after the flesh persecuted him that was born after the Spirit, even so it is now.",
          "ref": "Galatians 4:28–29"
        },
        "prop": "tent",
        "flare": false
      },
      {
        "title": "Abraham binds Isaac",
        "verses": [
          {
            "t": "And the angel of the LORD called unto him out of heaven, and said, Abraham, Abraham: and he said, Here am I. And he said, Lay not thine hand upon the lad, neither do thou any thing unto him: for now I know that thou fearest God, seeing thou hast not withheld thy son, thine only son from me.",
            "ref": "Genesis 22:11–12"
          }
        ],
        "echo": {
          "t": "By faith Abraham, when he was tried, offered up Isaac: and he that had received the promises offered up his only begotten son, Of whom it was said, That in Isaac shall thy seed be called:",
          "ref": "Hebrews 11:17–18"
        },
        "prop": "altar",
        "flare": true
      },
      {
        "title": "Esau sells his birthright",
        "verses": [
          {
            "t": "And Jacob said, Swear to me this day; and he sware unto him: and he sold his birthright unto Jacob. Then Jacob gave Esau bread and pottage of lentiles; and he did eat and drink, and rose up, and went his way: thus Esau despised his birthright.",
            "ref": "Genesis 25:33–34"
          }
        ],
        "echo": {
          "t": "Lest there be any fornicator, or profane person, as Esau, who for one morsel of meat sold his birthright. For ye know how that afterward, when he would have inherited the blessing, he was rejected: for he found no place of repentance, though he sought it carefully with tears.",
          "ref": "Hebrews 12:16–17"
        },
        "prop": "tent",
        "flare": false
      },
      {
        "title": "Jacob receives Isaac’s blessing",
        "verses": [
          {
            "t": "Therefore God give thee of the dew of heaven, and the fatness of the earth, and plenty of corn and wine: Let people serve thee, and nations bow down to thee: be lord over thy brethren, and let thy mother’s sons bow down to thee: cursed be every one that curseth thee, and blessed be he that blesseth thee.",
            "ref": "Genesis 27:28–29"
          }
        ],
        "echo": {
          "t": "It was said unto her, The elder shall serve the younger. As it is written, Jacob have I loved, but Esau have I hated.",
          "ref": "Romans 9:12–13"
        },
        "prop": "tent",
        "flare": false
      },
      {
        "title": "Jacob dreams at Bethel",
        "verses": [
          {
            "t": "And he dreamed, and behold a ladder set up on the earth, and the top of it reached to heaven: and behold the angels of God ascending and descending on it.",
            "ref": "Genesis 28:12–13"
          }
        ],
        "echo": {
          "t": "Jesus answered and said unto him, Because I said unto thee, I saw thee under the fig tree, believest thou? thou shalt see greater things than these. And he saith unto him, Verily, verily, I say unto you, Hereafter ye shall see heaven open, and the angels of God ascending and descending upon the Son of man.",
          "ref": "John 1:50–51"
        },
        "prop": "ladder",
        "flare": false
      },
      {
        "title": "Jacob wrestles and receives the name Israel",
        "verses": [
          {
            "t": "And he said, Thy name shall be called no more Jacob, but Israel: for as a prince hast thou power with God and with men, and hast prevailed. And Jacob asked him, and said, Tell me, I pray thee, thy name. And he said, Wherefore is it that thou dost ask after my name? And he blessed him there.",
            "ref": "Genesis 32:28–29"
          }
        ],
        "echo": {
          "t": "For in Christ Jesus neither circumcision availeth any thing, nor uncircumcision, but a new creature. And as many as walk according to this rule, peace be on them, and mercy, and upon the Israel of God.",
          "ref": "Galatians 6:15–16"
        },
        "prop": "wrestle",
        "flare": false
      },
      {
        "title": "Jacob and Esau reconcile",
        "verses": [
          {
            "t": "And he passed over before them, and bowed himself to the ground seven times, until he came near to his brother. And Esau ran to meet him, and embraced him, and fell on his neck, and kissed him: and they wept.",
            "ref": "Genesis 33:3–4"
          }
        ],
        "echo": {
          "t": "For he is our peace, who hath made both one, and hath broken down the middle wall of partition between us; Having abolished in his flesh the enmity, even the law of commandments contained in ordinances; for to make in himself of twain one new man, so making peace;",
          "ref": "Ephesians 2:14–15"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "Joseph is sold into Egypt",
        "verses": [
          {
            "t": "Then there passed by Midianites merchantmen; and they drew and lifted up Joseph out of the pit, and sold Joseph to the Ishmeelites for twenty pieces of silver: and they brought Joseph into Egypt. And Reuben returned unto the pit; and, behold, Joseph was not in the pit; and he rent his clothes.",
            "ref": "Genesis 37:28–29"
          }
        ],
        "echo": {
          "t": "And the patriarchs, moved with envy, sold Joseph into Egypt: but God was with him, And delivered him out of all his afflictions, and gave him favour and wisdom in the sight of Pharaoh king of Egypt; and he made him governor over Egypt and all his house.",
          "ref": "Acts 7:9–10"
        },
        "prop": "well",
        "flare": false
      },
      {
        "title": "Judah and Tamar preserve Judah’s line",
        "verses": [
          {
            "t": "And Judah acknowledged them, and said, She hath been more righteous than I; because that I gave her not to Shelah my son. And he knew her again no more. And it came to pass in the time of her travail, that, behold, twins were in her womb.",
            "ref": "Genesis 38:26–27"
          }
        ],
        "echo": {
          "t": "And Judas begat Phares and Zara of Thamar; and Phares begat Esrom; and Esrom begat Aram;",
          "ref": "Matthew 1:3"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "Joseph is exalted over Egypt",
        "verses": [
          {
            "t": "And Pharaoh said unto Joseph, Forasmuch as God hath shewed thee all this, there is none so discreet and wise as thou art: Thou shalt be over my house, and according unto thy word shall all my people be ruled: only in the throne will I be greater than thou.",
            "ref": "Genesis 41:39–40"
          }
        ],
        "echo": {
          "t": "And delivered him out of all his afflictions, and gave him favour and wisdom in the sight of Pharaoh king of Egypt; and he made him governor over Egypt and all his house.",
          "ref": "Acts 7:10"
        },
        "prop": "city",
        "flare": false
      },
      {
        "title": "Joseph reveals himself and forgives",
        "verses": [
          {
            "t": "And Joseph said unto his brethren, Come near to me, I pray you. And they came near. And he said, I am Joseph your brother, whom ye sold into Egypt. Now therefore be not grieved, nor angry with yourselves, that ye sold me hither: for God did send me before you to preserve life.",
            "ref": "Genesis 45:4–5"
          }
        ],
        "echo": {
          "t": "And at the second time Joseph was made known to his brethren; and Joseph’s kindred was made known unto Pharaoh. Then sent Joseph, and called his father Jacob to him, and all his kindred, threescore and fifteen souls.",
          "ref": "Acts 7:13–14"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "Jacob blesses Judah with kingship",
        "verses": [
          {
            "t": "Judah is a lion’s whelp: from the prey, my son, thou art gone up: he stooped down, he couched as a lion, and as an old lion; who shall rouse him up? The sceptre shall not depart from Judah, nor a lawgiver from between his feet, until Shiloh come; and unto him shall the gathering of the people be.",
            "ref": "Genesis 49:9–10"
          }
        ],
        "echo": {
          "t": "And one of the elders saith unto me, Weep not: behold, the Lion of the tribe of Juda, the Root of David, hath prevailed to open the book, and to loose the seven seals thereof.",
          "ref": "Revelation 5:5–6"
        },
        "prop": "throne",
        "flare": false
      }
    ]
  },
  {
    "id": "exodus",
    "ordinal": 2,
    "en": "Exodus",
    "he": "שְׁמוֹת",
    "translit": "Shemot",
    "section": "Torah",
    "oneLine": "The sea opens; the mountain burns",
    "setting": "The green ribbon of the Nile frays into red desert, and a road runs straight through split waters. Ahead, one granite mountain smokes beneath a low dark cloud.",
    "terrain": {
      "style": "desert",
      "amplitude": 0.7,
      "water": "sea"
    },
    "palette": {
      "skyTop": "#3a86b5",
      "skyHorizon": "#e8c98f",
      "fog": "#d9b57e",
      "sun": "#fff3d6",
      "sunElevation": 0.95,
      "terrainLow": "#b5793f",
      "terrainHigh": "#e8c37a",
      "accent": "#ff9d45",
      "timeOfDay": "noon",
      "stars": 0
    },
    "particles": "manna",
    "creatures": [
      "locusts",
      "serpent",
      "birds"
    ],
    "threadGlow": 0.7,
    "stories": [
      {
        "title": "Israel is oppressed and Moses is born",
        "verses": [
          {
            "t": "And there went a man of the house of Levi, and took to wife a daughter of Levi. And the woman conceived, and bare a son: and when she saw him that he was a goodly child, she hid him three months.",
            "ref": "Exodus 2:1–2"
          }
        ],
        "echo": {
          "t": "The same dealt subtilly with our kindred, and evil entreated our fathers, so that they cast out their young children, to the end they might not live. In which time Moses was born, and was exceeding fair, and nourished up in his father’s house three months:",
          "ref": "Acts 7:19–20"
        },
        "prop": "city",
        "flare": false
      },
      {
        "title": "Moses kills an Egyptian and flees",
        "verses": [
          {
            "t": "And he said, Who made thee a prince and a judge over us? intendest thou to kill me, as thou killedst the Egyptian? And Moses feared, and said, Surely this thing is known. Now when Pharaoh heard this thing, he sought to slay Moses. But Moses fled from the face of Pharaoh, and dwelt in the land of Midian: and he sat down by a well.",
            "ref": "Exodus 2:14–15"
          }
        ],
        "echo": {
          "t": "Wilt thou kill me, as thou diddest the Egyptian yesterday? Then fled Moses at this saying, and was a stranger in the land of Madian, where he begat two sons.",
          "ref": "Acts 7:28–29"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "God calls Moses from the burning bush",
        "verses": [
          {
            "t": "And when the LORD saw that he turned aside to see, God called unto him out of the midst of the bush, and said, Moses, Moses. And he said, Here am I. And he said, Draw not nigh hither: put off thy shoes from off thy feet, for the place whereon thou standest is holy ground.",
            "ref": "Exodus 3:4–5"
          }
        ],
        "echo": {
          "t": "And as touching the dead, that they rise: have ye not read in the book of Moses, how in the bush God spake unto him, saying, I am the God of Abraham, and the God of Isaac, and the God of Jacob?",
          "ref": "Mark 12:26–27"
        },
        "prop": "burningBush",
        "flare": false
      },
      {
        "title": "God reveals the divine name",
        "verses": [
          {
            "t": "And God said unto Moses, I AM THAT I AM: and he said, Thus shalt thou say unto the children of Israel, I AM hath sent me unto you.",
            "ref": "Exodus 3:14–15"
          }
        ],
        "echo": {
          "t": "Jesus said unto them, Verily, verily, I say unto you, Before Abraham was, I am. Then took they up stones to cast at him: but Jesus hid himself, and went out of the temple, going through the midst of them, and so passed by.",
          "ref": "John 8:58–59"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "Moses resists his call and Aaron is appointed",
        "verses": [
          {
            "t": "And he said, O my LORD, send, I pray thee, by the hand of him whom thou wilt send. And the anger of the LORD was kindled against Moses, and he said, Is not Aaron the Levite thy brother? I know that he can speak well. And also, behold, he cometh forth to meet thee: and when he seeth thee, he will be glad in his heart.",
            "ref": "Exodus 4:13–14"
          }
        ],
        "echo": {
          "t": "This Moses whom they refused, saying, Who made thee a ruler and a judge? the same did God send to be a ruler and a deliverer by the hand of the angel which appeared to him in the bush.",
          "ref": "Acts 7:35–36"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "Pharaoh increases Israel’s burdens",
        "verses": [
          {
            "t": "Ye shall no more give the people straw to make brick, as heretofore: let them go and gather straw for themselves. And the tale of the bricks, which they did make heretofore, ye shall lay upon them; ye shall not diminish ought thereof: for they be idle; therefore they cry, saying, Let us go and sacrifice to our God.",
            "ref": "Exodus 5:7–8"
          }
        ],
        "echo": {
          "t": "Come unto me, all ye that labour and are heavy laden, and I will give you rest. Take my yoke upon you, and learn of me; for I am meek and lowly in heart: and ye shall find rest unto your souls.",
          "ref": "Matthew 11:28–29"
        },
        "prop": "city",
        "flare": false
      },
      {
        "title": "Israel receives the Passover",
        "verses": [
          {
            "t": "And ye shall keep it up until the fourteenth day of the same month: and the whole assembly of the congregation of Israel shall kill it in the evening. And they shall take of the blood, and strike it on the two side posts and on the upper door post of the houses, wherein they shall eat it.",
            "ref": "Exodus 12:6–7"
          }
        ],
        "echo": {
          "t": "Purge out therefore the old leaven, that ye may be a new lump, as ye are unleavened. For even Christ our passover is sacrificed for us: Therefore let us keep the feast, not with old leaven, neither with the leaven of malice and wickedness; but with the unleavened bread of sincerity and truth.",
          "ref": "1 Corinthians 5:7–8"
        },
        "prop": "passover",
        "flare": true
      },
      {
        "title": "The firstborn die in the final plague",
        "verses": [
          {
            "t": "And it came to pass, that at midnight the LORD smote all the firstborn in the land of Egypt, from the firstborn of Pharaoh that sat on his throne unto the firstborn of the captive that was in the dungeon; and all the firstborn of cattle.",
            "ref": "Exodus 12:29–30"
          }
        ],
        "echo": {
          "t": "Through faith he kept the passover, and the sprinkling of blood, lest he that destroyed the firstborn should touch them. By faith they passed through the Red sea as by dry land: which the Egyptians assaying to do were drowned.",
          "ref": "Hebrews 11:28–29"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "God leads Israel by cloud and fire",
        "verses": [
          {
            "t": "And the LORD went before them by day in a pillar of a cloud, to lead them the way; and by night in a pillar of fire, to give them light; to go by day and night: He took not away the pillar of the cloud by day, nor the pillar of fire by night, from before the people.",
            "ref": "Exodus 13:21–22"
          }
        ],
        "echo": {
          "t": "Moreover, brethren, I would not that ye should be ignorant, how that all our fathers were under the cloud, and all passed through the sea; And were all baptized unto Moses in the cloud and in the sea;",
          "ref": "1 Corinthians 10:1–2"
        },
        "prop": "pillarOfCloud",
        "flare": false
      },
      {
        "title": "Israel crosses the sea",
        "verses": [
          {
            "t": "And Moses stretched out his hand over the sea; and the LORD caused the sea to go back by a strong east wind all that night, and made the sea dry land, and the waters were divided. And the children of Israel went into the midst of the sea upon the dry ground: and the waters were a wall unto them on their right hand, and on their left.",
            "ref": "Exodus 14:21–22"
          }
        ],
        "echo": {
          "t": "By faith they passed through the Red sea as by dry land: which the Egyptians assaying to do were drowned.",
          "ref": "Hebrews 11:29"
        },
        "prop": "pillarOfFire",
        "flare": false
      },
      {
        "title": "Moses and Miriam sing at the sea",
        "verses": [
          {
            "t": "Then sang Moses and the children of Israel this song unto the LORD, and spake, saying, I will sing unto the LORD, for he hath triumphed gloriously: the horse and his rider hath he thrown into the sea. The LORD is my strength and song, and he is become my salvation: he is my God, and I will prepare him an habitation; my father’s God, and I will exalt him.",
            "ref": "Exodus 15:1–2"
          }
        ],
        "echo": {
          "t": "And they sing the song of Moses the servant of God, and the song of the Lamb, saying, Great and marvellous are thy works, Lord God Almighty; just and true are thy ways, thou King of saints. Who shall not fear thee, O Lord, and glorify thy name?",
          "ref": "Revelation 15:3–4"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "God gives manna",
        "verses": [
          {
            "t": "And when the dew that lay was gone up, behold, upon the face of the wilderness there lay a small round thing, as small as the hoar frost on the ground. And when the children of Israel saw it, they said one to another, It is manna: for they wist not what it was. And Moses said unto them, This is the bread which the LORD hath given you to eat.",
            "ref": "Exodus 16:14–15"
          }
        ],
        "echo": {
          "t": "Then Jesus said unto them, Verily, verily, I say unto you, Moses gave you not that bread from heaven; but my Father giveth you the true bread from heaven. For the bread of God is he which cometh down from heaven, and giveth life unto the world.",
          "ref": "John 6:32–33"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "Water comes from the rock",
        "verses": [
          {
            "t": "And the LORD said unto Moses, Go on before the people, and take with thee of the elders of Israel; and thy rod, wherewith thou smotest the river, take in thine hand, and go. Behold, I will stand before thee there upon the rock in Horeb; and thou shalt smite the rock, and there shall come water out of it, that the people may drink.",
            "ref": "Exodus 17:5–6"
          }
        ],
        "echo": {
          "t": "And did all eat the same spiritual meat; And did all drink the same spiritual drink: for they drank of that spiritual Rock that followed them: and that Rock was Christ.",
          "ref": "1 Corinthians 10:3–4"
        },
        "prop": "stones",
        "flare": false
      },
      {
        "title": "Israel arrives at Sinai",
        "verses": [
          {
            "t": "And it came to pass on the third day in the morning, that there were thunders and lightnings, and a thick cloud upon the mount, and the voice of the trumpet exceeding loud; so that all the people that was in the camp trembled. And Moses brought forth the people out of the camp to meet with God; and they stood at the nether part of the mount.",
            "ref": "Exodus 19:16–17"
          }
        ],
        "echo": {
          "t": "For ye are not come unto the mount that might be touched, and that burned with fire, nor unto blackness, and darkness, and tempest, And the sound of a trumpet, and the voice of words; which voice they that heard intreated that the word should not be spoken to them any more:",
          "ref": "Hebrews 12:18–19"
        },
        "prop": "tablets",
        "flare": false
      },
      {
        "title": "God gives the Ten Words",
        "verses": [
          {
            "t": "I am the LORD thy God, which have brought thee out of the land of Egypt, out of the house of bondage. Thou shalt have no other gods before me.",
            "ref": "Exodus 20:2–3"
          }
        ],
        "echo": {
          "t": "Jesus said unto him, Thou shalt love the Lord thy God with all thy heart, and with all thy soul, and with all thy mind. This is the first and great commandment.",
          "ref": "Matthew 22:37–38"
        },
        "prop": "tablets",
        "flare": false
      },
      {
        "title": "The covenant is sealed with blood",
        "verses": [
          {
            "t": "And he took the book of the covenant, and read in the audience of the people: and they said, All that the LORD hath said will we do, and be obedient. And Moses took the blood, and sprinkled it on the people, and said, Behold the blood of the covenant, which the LORD hath made with you concerning all these words.",
            "ref": "Exodus 24:7–8"
          }
        ],
        "echo": {
          "t": "For when Moses had spoken every precept to all the people according to the law, he took the blood of calves and of goats, with water, and scarlet wool, and hyssop, and sprinkled both the book, and all the people, Saying, This is the blood of the testament which God hath enjoined unto you.",
          "ref": "Hebrews 9:19–20"
        },
        "prop": "altar",
        "flare": false
      },
      {
        "title": "The elders of Israel see God",
        "verses": [
          {
            "t": "And they saw the God of Israel: and there was under his feet as it were a paved work of a sapphire stone, and as it were the body of heaven in his clearness. And upon the nobles of the children of Israel he laid not his hand: also they saw God, and did eat and drink.",
            "ref": "Exodus 24:10–11"
          }
        ],
        "echo": {
          "t": "And there shall be no more curse: but the throne of God and of the Lamb shall be in it; and his servants shall serve him: And they shall see his face; and his name shall be in their foreheads.",
          "ref": "Revelation 22:3–4"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "Israel makes the golden calf",
        "verses": [
          {
            "t": "And he received them at their hand, and fashioned it with a graving tool, after he had made it a molten calf: and they said, These be thy gods, O Israel, which brought thee up out of the land of Egypt. And when Aaron saw it, he built an altar before it; and Aaron made proclamation, and said, To morrow is a feast to the LORD.",
            "ref": "Exodus 32:4–5"
          }
        ],
        "echo": {
          "t": "Saying unto Aaron, Make us gods to go before us: for as for this Moses, which brought us out of the land of Egypt, we wot not what is become of him. And they made a calf in those days, and offered sacrifice unto the idol, and rejoiced in the works of their own hands.",
          "ref": "Acts 7:40–41"
        },
        "prop": "altar",
        "flare": false
      },
      {
        "title": "Moses intercedes after Israel’s apostasy",
        "verses": [
          {
            "t": "And Moses returned unto the LORD, and said, Oh, this people have sinned a great sin, and have made them gods of gold. Yet now, if thou wilt forgive their sin--; and if not, blot me, I pray thee, out of thy book which thou hast written.",
            "ref": "Exodus 32:31–32"
          }
        ],
        "echo": {
          "t": "But this man, because he continueth ever, hath an unchangeable priesthood. Wherefore he is able also to save them to the uttermost that come unto God by him, seeing he ever liveth to make intercession for them.",
          "ref": "Hebrews 7:24–25"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "God renews the covenant and reveals glory",
        "verses": [
          {
            "t": "And the LORD passed by before him, and proclaimed, The LORD, The LORD God, merciful and gracious, longsuffering, and abundant in goodness and truth, Keeping mercy for thousands, forgiving iniquity and transgression and sin, and that will by no means clear the guilty; visiting the iniquity of the fathers upon the children, and upon the children’s children, unto the third and to the fourth generation.",
            "ref": "Exodus 34:6–7"
          }
        ],
        "echo": {
          "t": "But if the ministration of death, written and engraven in stones, was glorious, so that the children of Israel could not stedfastly behold the face of Moses for the glory of his countenance; which glory was to be done away: How shall not the ministration of the spirit be rather glorious?",
          "ref": "2 Corinthians 3:7–8"
        },
        "prop": "tablets",
        "flare": false
      },
      {
        "title": "Bezalel is filled with the Spirit",
        "verses": [
          {
            "t": "And Moses said unto the children of Israel, See, the LORD hath called by name Bezaleel the son of Uri, the son of Hur, of the tribe of Judah; And he hath filled him with the spirit of God, in wisdom, in understanding, and in knowledge, and in all manner of workmanship;",
            "ref": "Exodus 35:30–31"
          }
        ],
        "echo": {
          "t": "Know ye not that ye are the temple of God, and that the Spirit of God dwelleth in you? If any man defile the temple of God, him shall God destroy; for the temple of God is holy, which temple ye are.",
          "ref": "1 Corinthians 3:16–17"
        },
        "prop": "menorah",
        "flare": false
      },
      {
        "title": "The tabernacle is filled with glory",
        "verses": [
          {
            "t": "Then a cloud covered the tent of the congregation, and the glory of the LORD filled the tabernacle. And Moses was not able to enter into the tent of the congregation, because the cloud abode thereon, and the glory of the LORD filled the tabernacle.",
            "ref": "Exodus 40:34–35"
          }
        ],
        "echo": {
          "t": "And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth.",
          "ref": "John 1:14"
        },
        "prop": "tent",
        "flare": false
      }
    ]
  },
  {
    "id": "leviticus",
    "ordinal": 3,
    "en": "Leviticus",
    "he": "וַיִּקְרָא",
    "translit": "Vayikra",
    "section": "Torah",
    "oneLine": "The fire that never goes out",
    "setting": "The flight slows at the still center of the camp: a flat desert plain ringed by distant dunes, where a single tent stands beneath a low cloud and altar smoke climbs in one unbroken line into the sky.",
    "terrain": {
      "style": "desert",
      "amplitude": 0.2,
      "water": "none"
    },
    "palette": {
      "skyTop": "#4a2e52",
      "skyHorizon": "#d17a4a",
      "fog": "#8a5a5e",
      "sun": "#e8874f",
      "sunElevation": 0.12,
      "terrainLow": "#5e3844",
      "terrainHigh": "#a8705e",
      "accent": "#ffb36b",
      "timeOfDay": "dusk",
      "stars": 0.1
    },
    "particles": "embers",
    "creatures": [
      "doves",
      "birds"
    ],
    "threadGlow": 0.65,
    "stories": [
      {
        "title": "Aaron and his sons are ordained",
        "verses": [
          {
            "t": "And ye shall not go out of the door of the tabernacle of the congregation in seven days, until the days of your consecration be at an end: for seven days shall he consecrate you. As he hath done this day, so the LORD hath commanded to do, to make an atonement for you.",
            "ref": "Leviticus 8:33–34"
          }
        ],
        "echo": {
          "t": "And no man taketh this honour unto himself, but he that is called of God, as was Aaron. So also Christ glorified not himself to be made an high priest; but he that said unto him, Thou art my Son, to day have I begotten thee.",
          "ref": "Hebrews 5:4–5"
        },
        "prop": "tent",
        "flare": false
      },
      {
        "title": "Nadab and Abihu offer unauthorized fire",
        "verses": [
          {
            "t": "And Nadab and Abihu, the sons of Aaron, took either of them his censer, and put fire therein, and put incense thereon, and offered strange fire before the LORD, which he commanded them not. And there went out fire from the LORD, and devoured them, and they died before the LORD.",
            "ref": "Leviticus 10:1–2"
          }
        ],
        "echo": {
          "t": "Wherefore we receiving a kingdom which cannot be moved, let us have grace, whereby we may serve God acceptably with reverence and godly fear: For our God is a consuming fire.",
          "ref": "Hebrews 12:28–29"
        },
        "prop": "altar",
        "flare": false
      },
      {
        "title": "The scapegoat bears Israel’s sins away",
        "verses": [
          {
            "t": "And Aaron shall lay both his hands upon the head of the live goat, and confess over him all the iniquities of the children of Israel, and all their transgressions in all their sins, putting them upon the head of the goat, and shall send him away by the hand of a fit man into the wilderness: And the goat shall bear upon him all their iniquities unto a land not inhabited: and he shall let go the goat in the wilderness.",
            "ref": "Leviticus 16:21–22"
          }
        ],
        "echo": {
          "t": "Wherefore Jesus also, that he might sanctify the people with his own blood, suffered without the gate. Let us go forth therefore unto him without the camp, bearing his reproach.",
          "ref": "Hebrews 13:12–13"
        },
        "prop": "altar",
        "flare": false
      }
    ]
  },
  {
    "id": "numbers",
    "ordinal": 4,
    "en": "Numbers",
    "he": "בְּמִדְבַּר",
    "translit": "Bamidbar",
    "section": "Torah",
    "oneLine": "Forty years of dust and cloud",
    "setting": "A wide ochre wilderness ringed by far mesas, forty years deep in drifting dust. A cloud-column moves along the horizon, and the whole desert arranges itself around one small tent.",
    "terrain": {
      "style": "desert",
      "amplitude": 0.45,
      "water": "none"
    },
    "palette": {
      "skyTop": "#0b1026",
      "skyHorizon": "#2e3a5e",
      "fog": "#1e2742",
      "sun": "#cfd8e8",
      "sunElevation": -0.15,
      "terrainLow": "#14192e",
      "terrainHigh": "#3a4468",
      "accent": "#ff8c42",
      "timeOfDay": "starryNight",
      "stars": 0.9
    },
    "particles": "dust",
    "creatures": [
      "birds",
      "serpent"
    ],
    "threadGlow": 0.85,
    "stories": [
      {
        "title": "The Spirit rests on the seventy elders",
        "verses": [
          {
            "t": "And Moses went out, and told the people the words of the LORD, and gathered the seventy men of the elders of the people, and set them round about the tabernacle.",
            "ref": "Numbers 11:24–25"
          }
        ],
        "echo": {
          "t": "And it shall come to pass in the last days, saith God, I will pour out of my Spirit upon all flesh: and your sons and your daughters shall prophesy, and your young men shall see visions, and your old men shall dream dreams: And on my servants and on my handmaidens I will pour out in those days of my Spirit; and they shall prophesy:",
          "ref": "Acts 2:17–18"
        },
        "prop": "tent",
        "flare": false
      },
      {
        "title": "The spies see the land and its giants",
        "verses": [
          {
            "t": "And they told him, and said, We came unto the land whither thou sentest us, and surely it floweth with milk and honey; and this is the fruit of it. Nevertheless the people be strong that dwell in the land, and the cities are walled, and very great: and moreover we saw the children of Anak there.",
            "ref": "Numbers 13:27–28"
          }
        ],
        "echo": {
          "t": "For some, when they had heard, did provoke: howbeit not all that came out of Egypt by Moses. But with whom was he grieved forty years? was it not with them that had sinned, whose carcases fell in the wilderness?",
          "ref": "Hebrews 3:16–17"
        },
        "prop": "vineyard",
        "flare": false
      },
      {
        "title": "Israel refuses the promised land",
        "verses": [
          {
            "t": "And all the congregation lifted up their voice, and cried; and the people wept that night. And all the children of Israel murmured against Moses and against Aaron: and the whole congregation said unto them, Would God that we had died in the land of Egypt! or would God we had died in this wilderness!",
            "ref": "Numbers 14:1–2"
          }
        ],
        "echo": {
          "t": "Let us therefore fear, lest, a promise being left us of entering into his rest, any of you should seem to come short of it. For unto us was the gospel preached, as well as unto them: but the word preached did not profit them, not being mixed with faith in them that heard it.",
          "ref": "Hebrews 4:1–2"
        },
        "prop": "tent",
        "flare": false
      },
      {
        "title": "Korah rebels against Moses and Aaron",
        "verses": [
          {
            "t": "Now Korah, the son of Izhar, the son of Kohath, the son of Levi, and Dathan and Abiram, the sons of Eliab, and On, the son of Peleth, sons of Reuben, took men: And they rose up before Moses, with certain of the children of Israel, two hundred and fifty princes of the assembly, famous in the congregation, men of renown:",
            "ref": "Numbers 16:1–2"
          }
        ],
        "echo": {
          "t": "Woe unto them! for they have gone in the way of Cain, and ran greedily after the error of Balaam for reward, and perished in the gainsaying of Core.",
          "ref": "Jude 11"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "Moses strikes the rock at Meribah",
        "verses": [
          {
            "t": "And Moses lifted up his hand, and with his rod he smote the rock twice: and the water came out abundantly, and the congregation drank, and their beasts also. And the LORD spake unto Moses and Aaron, Because ye believed me not, to sanctify me in the eyes of the children of Israel, therefore ye shall not bring this congregation into the land which I have given them.",
            "ref": "Numbers 20:11–12"
          }
        ],
        "echo": {
          "t": "And did all eat the same spiritual meat; And did all drink the same spiritual drink: for they drank of that spiritual Rock that followed them: and that Rock was Christ.",
          "ref": "1 Corinthians 10:3–4"
        },
        "prop": "stones",
        "flare": false
      },
      {
        "title": "The bronze serpent brings healing",
        "verses": [
          {
            "t": "And the LORD said unto Moses, Make thee a fiery serpent, and set it upon a pole: and it shall come to pass, that every one that is bitten, when he looketh upon it, shall live. And Moses made a serpent of brass, and put it upon a pole, and it came to pass, that if a serpent had bitten any man, when he beheld the serpent of brass, he lived.",
            "ref": "Numbers 21:8–9"
          }
        ],
        "echo": {
          "t": "And as Moses lifted up the serpent in the wilderness, even so must the Son of man be lifted up: That whosoever believeth in him should not perish, but have eternal life.",
          "ref": "John 3:14–15"
        },
        "prop": "serpentPole",
        "flare": true
      },
      {
        "title": "Balaam’s donkey speaks",
        "verses": [
          {
            "t": "And the LORD opened the mouth of the ass, and she said unto Balaam, What have I done unto thee, that thou hast smitten me these three times? And Balaam said unto the ass, Because thou hast mocked me: I would there were a sword in mine hand, for now would I kill thee.",
            "ref": "Numbers 22:28–29"
          }
        ],
        "echo": {
          "t": "Which have forsaken the right way, and are gone astray, following the way of Balaam the son of Bosor, who loved the wages of unrighteousness; But was rebuked for his iniquity: the dumb ass speaking with man’s voice forbad the madness of the prophet.",
          "ref": "2 Peter 2:15–16"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "Balaam sees the star from Jacob",
        "verses": [
          {
            "t": "I shall see him, but not now: I shall behold him, but not nigh: there shall come a Star out of Jacob, and a Sceptre shall rise out of Israel, and shall smite the corners of Moab, and destroy all the children of Sheth. And Edom shall be a possession, Seir also shall be a possession for his enemies; and Israel shall do valiantly.",
            "ref": "Numbers 24:17–18"
          }
        ],
        "echo": {
          "t": "I Jesus have sent mine angel to testify unto you these things in the churches. I am the root and the offspring of David, and the bright and morning star.",
          "ref": "Revelation 22:16"
        },
        "prop": "altar",
        "flare": false
      },
      {
        "title": "Israel sins at Peor",
        "verses": [
          {
            "t": "And Israel abode in Shittim, and the people began to commit whoredom with the daughters of Moab. And they called the people unto the sacrifices of their gods: and the people did eat, and bowed down to their gods.",
            "ref": "Numbers 25:1–2"
          }
        ],
        "echo": {
          "t": "Neither be ye idolaters, as were some of them; as it is written, The people sat down to eat and drink, and rose up to play. Neither let us commit fornication, as some of them committed, and fell in one day three and twenty thousand.",
          "ref": "1 Corinthians 10:7–8"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "Phinehas stops the plague",
        "verses": [
          {
            "t": "And when Phinehas, the son of Eleazar, the son of Aaron the priest, saw it, he rose up from among the congregation, and took a javelin in his hand; And he went after the man of Israel into the tent, and thrust both of them through, the man of Israel, and the woman through her belly. So the plague was stayed from the children of Israel.",
            "ref": "Numbers 25:7–8"
          }
        ],
        "echo": {
          "t": "But I have a few things against thee, because thou hast there them that hold the doctrine of Balaam, who taught Balac to cast a stumblingblock before the children of Israel, to eat things sacrificed unto idols, and to commit fornication. So hast thou also them that hold the doctrine of the Nicolaitanes, which thing I hate.",
          "ref": "Revelation 2:14–15"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "The daughters of Zelophehad receive inheritance",
        "verses": [
          {
            "t": "And the LORD spake unto Moses, saying, The daughters of Zelophehad speak right: thou shalt surely give them a possession of an inheritance among their father’s brethren; and thou shalt cause the inheritance of their father to pass unto them.",
            "ref": "Numbers 27:6–7"
          }
        ],
        "echo": {
          "t": "There is neither Jew nor Greek, there is neither bond nor free, there is neither male nor female: for ye are all one in Christ Jesus. And if ye be Christ’s, then are ye Abraham’s seed, and heirs according to the promise.",
          "ref": "Galatians 3:28–29"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "Joshua is commissioned",
        "verses": [
          {
            "t": "And the LORD said unto Moses, Take thee Joshua the son of Nun, a man in whom is the spirit, and lay thine hand upon him; And set him before Eleazar the priest, and before all the congregation; and give him a charge in their sight.",
            "ref": "Numbers 27:18–19"
          }
        ],
        "echo": {
          "t": "For if Jesus had given them rest, then would he not afterward have spoken of another day. There remaineth therefore a rest to the people of God.",
          "ref": "Hebrews 4:8–9"
        },
        "prop": "tent",
        "flare": false
      }
    ]
  },
  {
    "id": "deuteronomy",
    "ordinal": 5,
    "en": "Deuteronomy",
    "he": "דְּבָרִים",
    "translit": "Devarim",
    "section": "Torah",
    "oneLine": "Last words within sight of the land",
    "setting": "The steppes of Moab at evening: a wide camp of tents on the river plain, the Jordan glinting below, and beyond it the dim green of a land seen but not yet entered. One bare mountain rises at the path's end.",
    "terrain": {
      "style": "riverlands",
      "amplitude": 0.45,
      "water": "river"
    },
    "palette": {
      "skyTop": "#5e6ea0",
      "skyHorizon": "#f0b56a",
      "fog": "#c9946e",
      "sun": "#ffcf7a",
      "sunElevation": 0.15,
      "terrainLow": "#7a5a52",
      "terrainHigh": "#c99a6e",
      "accent": "#ffd98c",
      "timeOfDay": "goldenHour",
      "stars": 0
    },
    "particles": "stars",
    "creatures": [
      "birds",
      "fireflies"
    ],
    "threadGlow": 0.6,
    "stories": [
      {
        "title": "Moses retells the wilderness rebellion",
        "verses": [
          {
            "t": "Notwithstanding ye would not go up, but rebelled against the commandment of the LORD your God: And ye murmured in your tents, and said, Because the LORD hated us, he hath brought us forth out of the land of Egypt, to deliver us into the hand of the Amorites, to destroy us.",
            "ref": "Deuteronomy 1:26–27"
          }
        ],
        "echo": {
          "t": "To whom our fathers would not obey, but thrust him from them, and in their hearts turned back again into Egypt, Saying unto Aaron, Make us gods to go before us: for as for this Moses, which brought us out of the land of Egypt, we wot not what is become of him.",
          "ref": "Acts 7:39–40"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "Israel receives the Shema",
        "verses": [
          {
            "t": "Hear, O Israel: The LORD our God is one LORD: And thou shalt love the LORD thy God with all thine heart, and with all thy soul, and with all thy might.",
            "ref": "Deuteronomy 6:4–5"
          }
        ],
        "echo": {
          "t": "And Jesus answered him, The first of all the commandments is, Hear, O Israel; The Lord our God is one Lord: And thou shalt love the Lord thy God with all thy heart, and with all thy soul, and with all thy mind, and with all thy strength: this is the first commandment.",
          "ref": "Mark 12:29–30"
        },
        "prop": "tablets",
        "flare": false
      },
      {
        "title": "Moses sets life and death before Israel",
        "verses": [
          {
            "t": "I call heaven and earth to record this day against you, that I have set before you life and death, blessing and cursing: therefore choose life, that both thou and thy seed may live: That thou mayest love the LORD thy God, and that thou mayest obey his voice, and that thou mayest cleave unto him: for he is thy life, and the length of thy days: that thou mayest dwell in the land which the LORD sware unto thy fathers, to Abraham, to Isaac, and to Jacob, to give them.",
            "ref": "Deuteronomy 30:19–20"
          }
        ],
        "echo": {
          "t": "But what saith it? The word is nigh thee, even in thy mouth, and in thy heart: that is, the word of faith, which we preach; That if thou shalt confess with thy mouth the Lord Jesus, and shalt believe in thine heart that God hath raised him from the dead, thou shalt be saved.",
          "ref": "Romans 10:8–9"
        },
        "prop": "stones",
        "flare": false
      },
      {
        "title": "Moses teaches the covenant song",
        "verses": [
          {
            "t": "Because I will publish the name of the LORD: ascribe ye greatness unto our God. He is the Rock, his work is perfect: for all his ways are judgment: a God of truth and without iniquity, just and right is he.",
            "ref": "Deuteronomy 32:3–4"
          }
        ],
        "echo": {
          "t": "And they sing the song of Moses the servant of God, and the song of the Lamb, saying, Great and marvellous are thy works, Lord God Almighty; just and true are thy ways, thou King of saints. Who shall not fear thee, O Lord, and glorify thy name?",
          "ref": "Revelation 15:3–4"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "Moses dies within sight of the land",
        "verses": [
          {
            "t": "And the LORD said unto him, This is the land which I sware unto Abraham, unto Isaac, and unto Jacob, saying, I will give it unto thy seed: I have caused thee to see it with thine eyes, but thou shalt not go over thither. So Moses the servant of the LORD died there in the land of Moab, according to the word of the LORD.",
            "ref": "Deuteronomy 34:4–5"
          }
        ],
        "echo": {
          "t": "Yet Michael the archangel, when contending with the devil he disputed about the body of Moses, durst not bring against him a railing accusation, but said, The Lord rebuke thee.",
          "ref": "Jude 9"
        },
        "prop": "palms",
        "flare": false
      }
    ]
  },
  {
    "id": "joshua",
    "ordinal": 6,
    "en": "Joshua",
    "he": "יְהוֹשֻׁעַ",
    "translit": "Yehoshua",
    "section": "Neviim",
    "oneLine": "The waters stand; the walls fall",
    "setting": "The Jordan runs flood-high through green riverlands, then heaps upstream into a glassy wall. Beyond the dry bed, the plain of Jericho spreads out under palms, ringed by tawny hills where stone circles mark the camps of a people newly landed.",
    "terrain": {
      "style": "riverlands",
      "amplitude": 0.4,
      "water": "river"
    },
    "palette": {
      "skyTop": "#4a8ab5",
      "skyHorizon": "#e8dfae",
      "fog": "#b8cfc2",
      "sun": "#fff0c2",
      "sunElevation": 0.45,
      "terrainLow": "#5e8a5a",
      "terrainHigh": "#a8c98a",
      "accent": "#ffcf6b",
      "timeOfDay": "morning",
      "stars": 0
    },
    "particles": "dust",
    "creatures": [
      "birds",
      "butterflies"
    ],
    "threadGlow": 0.5,
    "stories": [
      {
        "title": "Joshua is commissioned to lead Israel",
        "verses": [
          {
            "t": "There shall not any man be able to stand before thee all the days of thy life: as I was with Moses, so I will be with thee: I will not fail thee, nor forsake thee. Be strong and of a good courage: for unto this people shalt thou divide for an inheritance the land, which I sware unto their fathers to give them.",
            "ref": "Joshua 1:5–6"
          }
        ],
        "echo": {
          "t": "Let your conversation be without covetousness; and be content with such things as ye have: for he hath said, I will never leave thee, nor forsake thee. So that we may boldly say, The Lord is my helper, and I will not fear what man shall do unto me.",
          "ref": "Hebrews 13:5–6"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "Rahab shelters the spies",
        "verses": [
          {
            "t": "And she said unto the men, I know that the LORD hath given you the land, and that your terror is fallen upon us, and that all the inhabitants of the land faint because of you.",
            "ref": "Joshua 2:9–10"
          }
        ],
        "echo": {
          "t": "By faith the harlot Rahab perished not with them that believed not, when she had received the spies with peace.",
          "ref": "Hebrews 11:31"
        },
        "prop": "wall",
        "flare": true
      },
      {
        "title": "Israel crosses the Jordan",
        "verses": [
          {
            "t": "That the waters which came down from above stood and rose up upon an heap very far from the city Adam, that is beside Zaretan: and those that came down toward the sea of the plain, even the salt sea, failed, and were cut off: and the people passed over right against Jericho.",
            "ref": "Joshua 3:16–17"
          }
        ],
        "echo": {
          "t": "Buried with him in baptism, wherein also ye are risen with him through the faith of the operation of God, who hath raised him from the dead.",
          "ref": "Colossians 2:12–13"
        },
        "prop": "ark",
        "flare": false
      },
      {
        "title": "Joshua meets the commander of YHWH’s army",
        "verses": [
          {
            "t": "And he said, Nay; but as captain of the host of the LORD am I now come. And Joshua fell on his face to the earth, and did worship, and said unto him, What saith my lord unto his servant? And the captain of the LORD’s host said unto Joshua, Loose thy shoe from off thy foot; for the place whereon thou standest is holy. And Joshua did so.",
            "ref": "Joshua 5:14–15"
          }
        ],
        "echo": {
          "t": "And I saw heaven opened, and behold a white horse; and he that sat upon him was called Faithful and True, and in righteousness he doth judge and make war. His eyes were as a flame of fire, and on his head were many crowns; and he had a name written, that no man knew, but he himself.",
          "ref": "Revelation 19:11–12"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "Jericho falls",
        "verses": [
          {
            "t": "So the people shouted when the priests blew with the trumpets: and it came to pass, when the people heard the sound of the trumpet, and the people shouted with a great shout, that the wall fell down flat, so that the people went up into the city, every man straight before him, and they took the city.",
            "ref": "Joshua 6:20–21"
          }
        ],
        "echo": {
          "t": "By faith the walls of Jericho fell down, after they were compassed about seven days.",
          "ref": "Hebrews 11:30"
        },
        "prop": "wall",
        "flare": false
      },
      {
        "title": "Achan’s hidden sin troubles Israel",
        "verses": [
          {
            "t": "And Achan answered Joshua, and said, Indeed I have sinned against the LORD God of Israel, and thus and thus have I done: When I saw among the spoils a goodly Babylonish garment, and two hundred shekels of silver, and a wedge of gold of fifty shekels weight, then I coveted them, and took them; and, behold, they are hid in the earth in the midst of my tent, and the silver under it.",
            "ref": "Joshua 7:20–21"
          }
        ],
        "echo": {
          "t": "But a certain man named Ananias, with Sapphira his wife, sold a possession, And kept back part of the price, his wife also being privy to it, and brought a certain part, and laid it at the apostles’ feet.",
          "ref": "Acts 5:1–2"
        },
        "prop": "stones",
        "flare": false
      },
      {
        "title": "Caleb receives his inheritance",
        "verses": [
          {
            "t": "Now therefore give me this mountain, whereof the LORD spake in that day; for thou heardest in that day how the Anakims were there, and that the cities were great and fenced: if so be the LORD will be with me, then I shall be able to drive them out, as the LORD said. And Joshua blessed him, and gave unto Caleb the son of Jephunneh Hebron for an inheritance.",
            "ref": "Joshua 14:12–13"
          }
        ],
        "echo": {
          "t": "For if Jesus had given them rest, then would he not afterward have spoken of another day. There remaineth therefore a rest to the people of God.",
          "ref": "Hebrews 4:8–9"
        },
        "prop": "palms",
        "flare": false
      },
      {
        "title": "Joshua renews the covenant at Shechem",
        "verses": [
          {
            "t": "Now therefore fear the LORD, and serve him in sincerity and in truth: and put away the gods which your fathers served on the other side of the flood, and in Egypt; and serve ye the LORD.",
            "ref": "Joshua 24:14–15"
          }
        ],
        "echo": {
          "t": "No man can serve two masters: for either he will hate the one, and love the other; or else he will hold to the one, and despise the other. Ye cannot serve God and mammon.",
          "ref": "Matthew 6:24"
        },
        "prop": "stones",
        "flare": false
      }
    ]
  },
  {
    "id": "judges",
    "ordinal": 7,
    "en": "Judges",
    "he": "שׁוֹפְטִים",
    "translit": "Shoftim",
    "section": "Neviim",
    "oneLine": "No king — the watchfires gutter and flare",
    "setting": "Terraced hill country that slides between shadow and firelight in slow cycles. Burned watchtowers, threshing floors, and one high palm mark the winding road down toward a leaning hall by the sea.",
    "terrain": {
      "style": "hills",
      "amplitude": 0.55,
      "water": "river"
    },
    "palette": {
      "skyTop": "#2e3440",
      "skyHorizon": "#7a6a52",
      "fog": "#55504a",
      "sun": "#b09a6e",
      "sunElevation": 0.5,
      "terrainLow": "#3a3a32",
      "terrainHigh": "#6e6652",
      "accent": "#ffb347",
      "timeOfDay": "storm",
      "stars": 0
    },
    "particles": "embers",
    "creatures": [
      "locusts",
      "lionEyes",
      "fireflies"
    ],
    "threadGlow": 0.4,
    "stories": [
      {
        "title": "Othniel delivers Israel",
        "verses": [
          {
            "t": "And when the children of Israel cried unto the LORD, the LORD raised up a deliverer to the children of Israel, who delivered them, even Othniel the son of Kenaz, Caleb’s younger brother. And the Spirit of the LORD came upon him, and he judged Israel, and went out to war: and the LORD delivered Chushanrishathaim king of Mesopotamia into his hand; and his hand prevailed against Chushanrishathaim.",
            "ref": "Judges 3:9–10"
          }
        ],
        "echo": {
          "t": "And what shall I more say? for the time would fail me to tell of Gedeon, and of Barak, and of Samson, and of Jephthae; of David also, and Samuel, and of the prophets: Who through faith subdued kingdoms, wrought righteousness, obtained promises, stopped the mouths of lions,",
          "ref": "Hebrews 11:32–33"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "Ehud defeats Eglon and Moab",
        "verses": [
          {
            "t": "And Ehud came unto him; and he was sitting in a summer parlour, which he had for himself alone. And Ehud said, I have a message from God unto thee. And he arose out of his seat. And Ehud put forth his left hand, and took the dagger from his right thigh, and thrust it into his belly:",
            "ref": "Judges 3:20–21"
          }
        ],
        "echo": {
          "t": "And what shall I more say? for the time would fail me to tell of Gedeon, and of Barak, and of Samson, and of Jephthae; of David also, and Samuel, and of the prophets: Who through faith subdued kingdoms, wrought righteousness, obtained promises, stopped the mouths of lions,",
          "ref": "Hebrews 11:32–33"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "Deborah and Barak defeat Sisera",
        "verses": [
          {
            "t": "And Deborah said unto Barak, Up; for this is the day in which the LORD hath delivered Sisera into thine hand: is not the LORD gone out before thee? So Barak went down from mount Tabor, and ten thousand men after him.",
            "ref": "Judges 4:14–15"
          }
        ],
        "echo": {
          "t": "And what shall I more say? for the time would fail me to tell of Gedeon, and of Barak, and of Samson, and of Jephthae; of David also, and Samuel, and of the prophets: Who through faith subdued kingdoms, wrought righteousness, obtained promises, stopped the mouths of lions,",
          "ref": "Hebrews 11:32–33"
        },
        "prop": "palms",
        "flare": false
      },
      {
        "title": "Gideon is called while hiding",
        "verses": [
          {
            "t": "And the LORD looked upon him, and said, Go in this thy might, and thou shalt save Israel from the hand of the Midianites: have not I sent thee? And he said unto him, Oh my Lord, wherewith shall I save Israel? behold, my family is poor in Manasseh, and I am the least in my father’s house.",
            "ref": "Judges 6:14–15"
          }
        ],
        "echo": {
          "t": "But God hath chosen the foolish things of the world to confound the wise; and God hath chosen the weak things of the world to confound the things which are mighty; And base things of the world, and things which are despised, hath God chosen, yea, and things which are not, to bring to nought things that are:",
          "ref": "1 Corinthians 1:27–28"
        },
        "prop": "vineyard",
        "flare": false
      },
      {
        "title": "Gideon’s three hundred defeat Midian",
        "verses": [
          {
            "t": "And they stood every man in his place round about the camp; and all the host ran, and cried, and fled. And the three hundred blew the trumpets, and the LORD set every man’s sword against his fellow, even throughout all the host: and the host fled to Bethshittah in Zererath, and to the border of Abelmeholah, unto Tabbath.",
            "ref": "Judges 7:21–22"
          }
        ],
        "echo": {
          "t": "But God hath chosen the foolish things of the world to confound the wise; and God hath chosen the weak things of the world to confound the things which are mighty; And base things of the world, and things which are despised, hath God chosen, yea, and things which are not, to bring to nought things that are:",
          "ref": "1 Corinthians 1:27–28"
        },
        "prop": "altar",
        "flare": false
      },
      {
        "title": "Abimelech seizes kingship through violence",
        "verses": [
          {
            "t": "And he went unto his father’s house at Ophrah, and slew his brethren the sons of Jerubbaal, being threescore and ten persons, upon one stone: notwithstanding yet Jotham the youngest son of Jerubbaal was left; for he hid himself. And all the men of Shechem gathered together, and all the house of Millo, and went, and made Abimelech king, by the plain of the pillar that was in Shechem.",
            "ref": "Judges 9:5–6"
          }
        ],
        "echo": {
          "t": "But Jesus called them to him, and saith unto them, Ye know that they which are accounted to rule over the Gentiles exercise lordship over them; and their great ones exercise authority upon them.",
          "ref": "Mark 10:42–43"
        },
        "prop": "city",
        "flare": false
      },
      {
        "title": "Jephthah’s vow brings tragedy upon his daughter",
        "verses": [
          {
            "t": "And Jephthah came to Mizpeh unto his house, and, behold, his daughter came out to meet him with timbrels and with dances: and she was his only child; beside her he had neither son nor daughter. And it came to pass, when he saw her, that he rent his clothes, and said, Alas, my daughter!",
            "ref": "Judges 11:34–35"
          }
        ],
        "echo": {
          "t": "And what shall I more say? for the time would fail me to tell of Gedeon, and of Barak, and of Samson, and of Jephthae; of David also, and Samuel, and of the prophets:",
          "ref": "Hebrews 11:32"
        },
        "prop": "altar",
        "flare": false
      },
      {
        "title": "Samson’s birth is announced",
        "verses": [
          {
            "t": "Now therefore beware, I pray thee, and drink not wine nor strong drink, and eat not any unclean thing: For, lo, thou shalt conceive, and bear a son; and no razor shall come on his head: for the child shall be a Nazarite unto God from the womb: and he shall begin to deliver Israel out of the hand of the Philistines.",
            "ref": "Judges 13:4–5"
          }
        ],
        "echo": {
          "t": "And thou shalt have joy and gladness; and many shall rejoice at his birth. For he shall be great in the sight of the Lord, and shall drink neither wine nor strong drink; and he shall be filled with the Holy Ghost, even from his mother’s womb.",
          "ref": "Luke 1:14–15"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "Delilah betrays Samson",
        "verses": [
          {
            "t": "And she made him sleep upon her knees; and she called for a man, and she caused him to shave off the seven locks of his head; and she began to afflict him, and his strength went from him. And she said, The Philistines be upon thee, Samson. And he awoke out of his sleep, and said, I will go out as at other times before, and shake myself.",
            "ref": "Judges 16:19–20"
          }
        ],
        "echo": {
          "t": "Wherefore let him that thinketh he standeth take heed lest he fall.",
          "ref": "1 Corinthians 10:12–13"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "Samson dies destroying the Philistine temple",
        "verses": [
          {
            "t": "And Samson took hold of the two middle pillars upon which the house stood, and on which it was borne up, of the one with his right hand, and of the other with his left. And Samson said, Let me die with the Philistines. And he bowed himself with all his might; and the house fell upon the lords, and upon all the people that were therein.",
            "ref": "Judges 16:29–30"
          }
        ],
        "echo": {
          "t": "And what shall I more say? for the time would fail me to tell of Gedeon, and of Barak, and of Samson, and of Jephthae; of David also, and Samuel, and of the prophets: Who through faith subdued kingdoms, wrought righteousness, obtained promises, stopped the mouths of lions,",
          "ref": "Hebrews 11:32–33"
        },
        "prop": "temple",
        "flare": false
      },
      {
        "title": "Israel descends into tribal civil war and moral anarchy",
        "verses": [
          {
            "t": "And the children of Israel departed thence at that time, every man to his tribe and to his family, and they went out from thence every man to his inheritance. In those days there was no king in Israel: every man did that which was right in his own eyes.",
            "ref": "Judges 21:24–25"
          }
        ],
        "echo": {
          "t": "And even as they did not like to retain God in their knowledge, God gave them over to a reprobate mind, to do those things which are not convenient; Being filled with all unrighteousness, fornication, wickedness, covetousness, maliciousness; full of envy, murder, debate, deceit, malignity; whisperers,",
          "ref": "Romans 1:28–29"
        },
        "prop": "city",
        "flare": false
      }
    ]
  },
  {
    "id": "samuel",
    "ordinal": 8,
    "en": "Samuel",
    "he": "שְׁמוּאֵל",
    "translit": "Shmuel",
    "section": "Neviim",
    "oneLine": "A lamp, a sling, an endless throne",
    "setting": "High shepherd country: terraced hills and sheep-paths, a brook threading a wide battle valley, and on the far ridge the first lamps of a new-taken city.",
    "terrain": {
      "style": "hills",
      "amplitude": 0.5,
      "water": "river"
    },
    "palette": {
      "skyTop": "#232b4a",
      "skyHorizon": "#8a7a9e",
      "fog": "#4a4a6e",
      "sun": "#f2d8a8",
      "sunElevation": -0.02,
      "terrainLow": "#2e3352",
      "terrainHigh": "#6e6a8e",
      "accent": "#ffdf9e",
      "timeOfDay": "predawn",
      "stars": 0.4
    },
    "particles": "stars",
    "creatures": [
      "birds",
      "lionEyes"
    ],
    "threadGlow": 0.45,
    "stories": [
      {
        "title": "Hannah prays and Samuel is born",
        "verses": [
          {
            "t": "And they rose up in the morning early, and worshipped before the LORD, and returned, and came to their house to Ramah: and Elkanah knew Hannah his wife; and the LORD remembered her. Wherefore it came to pass, when the time was come about after Hannah had conceived, that she bare a son, and called his name Samuel, saying, Because I have asked him of the LORD.",
            "ref": "1 Samuel 1:19–20"
          }
        ],
        "echo": {
          "t": "And Mary said, My soul doth magnify the Lord, And my spirit hath rejoiced in God my Saviour.",
          "ref": "Luke 1:46–47"
        },
        "prop": "tent",
        "flare": false
      },
      {
        "title": "Hannah sings of God’s great reversal",
        "verses": [
          {
            "t": "The LORD maketh poor, and maketh rich: he bringeth low, and lifteth up. He raiseth up the poor out of the dust, and lifteth up the beggar from the dunghill, to set them among princes, and to make them inherit the throne of glory: for the pillars of the earth are the LORD’s, and he hath set the world upon them.",
            "ref": "1 Samuel 2:7–8"
          }
        ],
        "echo": {
          "t": "He hath put down the mighty from their seats, and exalted them of low degree. He hath filled the hungry with good things; and the rich he hath sent empty away.",
          "ref": "Luke 1:52–53"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "God calls Samuel",
        "verses": [
          {
            "t": "Therefore Eli said unto Samuel, Go, lie down: and it shall be, if he call thee, that thou shalt say, Speak, LORD; for thy servant heareth. So Samuel went and lay down in his place. And the LORD came, and stood, and called as at other times, Samuel, Samuel. Then Samuel answered, Speak; for thy servant heareth.",
            "ref": "1 Samuel 3:9–10"
          }
        ],
        "echo": {
          "t": "To him the porter openeth; and the sheep hear his voice: and he calleth his own sheep by name, and leadeth them out. And when he putteth forth his own sheep, he goeth before them, and the sheep follow him: for they know his voice.",
          "ref": "John 10:3–4"
        },
        "prop": "tent",
        "flare": false
      },
      {
        "title": "The ark is captured and Eli’s house falls",
        "verses": [
          {
            "t": "And the messenger answered and said, Israel is fled before the Philistines, and there hath been also a great slaughter among the people, and thy two sons also, Hophni and Phinehas, are dead, and the ark of God is taken.",
            "ref": "1 Samuel 4:17–18"
          }
        ],
        "echo": {
          "t": "Now all these things happened unto them for ensamples: and they are written for our admonition, upon whom the ends of the world are come. Wherefore let him that thinketh he standeth take heed lest he fall.",
          "ref": "1 Corinthians 10:11–12"
        },
        "prop": "ark",
        "flare": false
      },
      {
        "title": "The ark humiliates Dagon",
        "verses": [
          {
            "t": "And when they of Ashdod arose early on the morrow, behold, Dagon was fallen upon his face to the earth before the ark of the LORD. And they took Dagon, and set him in his place again.",
            "ref": "1 Samuel 5:3–4"
          }
        ],
        "echo": {
          "t": "That at the name of Jesus every knee should bow, of things in heaven, and things in earth, and things under the earth; And that every tongue should confess that Jesus Christ is Lord, to the glory of God the Father.",
          "ref": "Philippians 2:10–11"
        },
        "prop": "ark",
        "flare": false
      },
      {
        "title": "Israel demands a king",
        "verses": [
          {
            "t": "But the thing displeased Samuel, when they said, Give us a king to judge us. And Samuel prayed unto the LORD. And the LORD said unto Samuel, Hearken unto the voice of the people in all that they say unto thee: for they have not rejected thee, but they have rejected me, that I should not reign over them.",
            "ref": "1 Samuel 8:6–7"
          }
        ],
        "echo": {
          "t": "But his citizens hated him, and sent a message after him, saying, We will not have this man to reign over us.",
          "ref": "Luke 19:14–15"
        },
        "prop": "throne",
        "flare": false
      },
      {
        "title": "Saul is anointed",
        "verses": [
          {
            "t": "Then Samuel took a vial of oil, and poured it upon his head, and kissed him, and said, Is it not because the LORD hath anointed thee to be captain over his inheritance?",
            "ref": "1 Samuel 10:1–2"
          }
        ],
        "echo": {
          "t": "And afterward they desired a king: and God gave unto them Saul the son of Cis, a man of the tribe of Benjamin, by the space of forty years.",
          "ref": "Acts 13:21–22"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "Saul rescues Jabesh-gilead",
        "verses": [
          {
            "t": "And the Spirit of God came upon Saul when he heard those tidings, and his anger was kindled greatly. And he took a yoke of oxen, and hewed them in pieces, and sent them throughout all the coasts of Israel by the hands of messengers, saying, Whosoever cometh not forth after Saul and after Samuel, so shall it be done unto his oxen.",
            "ref": "1 Samuel 11:6–7"
          }
        ],
        "echo": {
          "t": "The Spirit of the Lord is upon me, because he hath anointed me to preach the gospel to the poor; he hath sent me to heal the brokenhearted, to preach deliverance to the captives, and recovering of sight to the blind, to set at liberty them that are bruised, To preach the acceptable year of the Lord.",
          "ref": "Luke 4:18–19"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "Saul offers unlawful sacrifice",
        "verses": [
          {
            "t": "And Samuel said to Saul, Thou hast done foolishly: thou hast not kept the commandment of the LORD thy God, which he commanded thee: for now would the LORD have established thy kingdom upon Israel for ever.",
            "ref": "1 Samuel 13:13–14"
          }
        ],
        "echo": {
          "t": "And when he had removed him, he raised up unto them David to be their king; to whom also he gave testimony, and said, I have found David the son of Jesse, a man after mine own heart, which shall fulfil all my will.",
          "ref": "Acts 13:22–23"
        },
        "prop": "altar",
        "flare": false
      },
      {
        "title": "Saul is rejected after sparing Amalek",
        "verses": [
          {
            "t": "And Samuel said, Hath the LORD as great delight in burnt offerings and sacrifices, as in obeying the voice of the LORD? Behold, to obey is better than sacrifice, and to hearken than the fat of rams. For rebellion is as the sin of witchcraft, and stubbornness is as iniquity and idolatry. Because thou hast rejected the word of the LORD, he hath also rejected thee from being king.",
            "ref": "1 Samuel 15:22–23"
          }
        ],
        "echo": {
          "t": "Not every one that saith unto me, Lord, Lord, shall enter into the kingdom of heaven; but he that doeth the will of my Father which is in heaven. Many will say to me in that day, Lord, Lord, have we not prophesied in thy name? and in thy name have cast out devils?",
          "ref": "Matthew 7:21–22"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "David is anointed",
        "verses": [
          {
            "t": "And he sent, and brought him in. Now he was ruddy, and withal of a beautiful countenance, and goodly to look to. And the LORD said, Arise, anoint him: for this is he. Then Samuel took the horn of oil, and anointed him in the midst of his brethren: and the Spirit of the LORD came upon David from that day forward. So Samuel rose up, and went to Ramah.",
            "ref": "1 Samuel 16:12–13"
          }
        ],
        "echo": {
          "t": "The Spirit of the Lord is upon me, because he hath anointed me to preach the gospel to the poor; he hath sent me to heal the brokenhearted, to preach deliverance to the captives, and recovering of sight to the blind, to set at liberty them that are bruised, To preach the acceptable year of the Lord.",
          "ref": "Luke 4:18–19"
        },
        "prop": "well",
        "flare": false
      },
      {
        "title": "David defeats Goliath",
        "verses": [
          {
            "t": "And David put his hand in his bag, and took thence a stone, and slang it, and smote the Philistine in his forehead, that the stone sunk into his forehead; and he fell upon his face to the earth. So David prevailed over the Philistine with a sling and with a stone, and smote the Philistine, and slew him; but there was no sword in the hand of David.",
            "ref": "1 Samuel 17:49–50"
          }
        ],
        "echo": {
          "t": "Forasmuch then as the children are partakers of flesh and blood, he also himself likewise took part of the same; that through death he might destroy him that had the power of death, that is, the devil; And deliver them who through fear of death were all their lifetime subject to bondage.",
          "ref": "Hebrews 2:14–15"
        },
        "prop": "stones",
        "flare": false
      },
      {
        "title": "Jonathan covenants with David",
        "verses": [
          {
            "t": "Then Jonathan and David made a covenant, because he loved him as his own soul. And Jonathan stripped himself of the robe that was upon him, and gave it to David, and his garments, even to his sword, and to his bow, and to his girdle.",
            "ref": "1 Samuel 18:3–4"
          }
        ],
        "echo": {
          "t": "Greater love hath no man than this, that a man lay down his life for his friends. Ye are my friends, if ye do whatsoever I command you.",
          "ref": "John 15:13–14"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "David receives the holy bread at Nob",
        "verses": [
          {
            "t": "And David answered the priest, and said unto him, Of a truth women have been kept from us about these three days, since I came out, and the vessels of the young men are holy, and the bread is in a manner common, yea, though it were sanctified this day in the vessel.",
            "ref": "1 Samuel 21:5–6"
          }
        ],
        "echo": {
          "t": "But he said unto them, Have ye not read what David did, when he was an hungred, and they that were with him; How he entered into the house of God, and did eat the shewbread, which was not lawful for him to eat, neither for them which were with him, but only for the priests?",
          "ref": "Matthew 12:3–4"
        },
        "prop": "tent",
        "flare": false
      },
      {
        "title": "Saul massacres the priests of Nob",
        "verses": [
          {
            "t": "And the king said to Doeg, Turn thou, and fall upon the priests. And Doeg the Edomite turned, and he fell upon the priests, and slew on that day fourscore and five persons that did wear a linen ephod. And Nob, the city of the priests, smote he with the edge of the sword, both men and women, children and sucklings, and oxen, and asses, and sheep, with the edge of the sword.",
            "ref": "1 Samuel 22:18–19"
          }
        ],
        "echo": {
          "t": "Wherefore, behold, I send unto you prophets, and wise men, and scribes: and some of them ye shall kill and crucify; and some of them shall ye scourge in your synagogues, and persecute them from city to city: That upon you may come all the righteous blood shed upon the earth, from the blood of righteous Abel unto the blood of Zacharias son of Barachias, whom ye slew between the temple and the altar.",
          "ref": "Matthew 23:34–35"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "David spares Saul",
        "verses": [
          {
            "t": "Moreover, my father, see, yea, see the skirt of thy robe in my hand: for in that I cut off the skirt of thy robe, and killed thee not, know thou and see that there is neither evil nor transgression in mine hand, and I have not sinned against thee; yet thou huntest my soul to take it.",
            "ref": "1 Samuel 24:11–12"
          }
        ],
        "echo": {
          "t": "Dearly beloved, avenge not yourselves, but rather give place unto wrath: for it is written, Vengeance is mine; I will repay, saith the Lord. Therefore if thine enemy hunger, feed him; if he thirst, give him drink: for in so doing thou shalt heap coals of fire on his head.",
          "ref": "Romans 12:19–20"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "Abigail restrains David from bloodguilt",
        "verses": [
          {
            "t": "And David said to Abigail, Blessed be the LORD God of Israel, which sent thee this day to meet me: And blessed be thy advice, and blessed be thou, which hast kept me this day from coming to shed blood, and from avenging myself with mine own hand.",
            "ref": "1 Samuel 25:32–33"
          }
        ],
        "echo": {
          "t": "Blessed are the peacemakers: for they shall be called the children of God.",
          "ref": "Matthew 5:9"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "Saul consults the medium of Endor",
        "verses": [
          {
            "t": "And when Saul enquired of the LORD, the LORD answered him not, neither by dreams, nor by Urim, nor by prophets. Then said Saul unto his servants, Seek me a woman that hath a familiar spirit, that I may go to her, and enquire of her. And his servants said to him, Behold, there is a woman that hath a familiar spirit at Endor.",
            "ref": "1 Samuel 28:6–7"
          }
        ],
        "echo": {
          "t": "And he said, Nay, father Abraham: but if one went unto them from the dead, they will repent. And he said unto him, If they hear not Moses and the prophets, neither will they be persuaded, though one rose from the dead.",
          "ref": "Luke 16:30–31"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "Saul dies on Mount Gilboa",
        "verses": [
          {
            "t": "Then said Saul unto his armourbearer, Draw thy sword, and thrust me through therewith; lest these uncircumcised come and thrust me through, and abuse me. But his armourbearer would not; for he was sore afraid. Therefore Saul took a sword, and fell upon it. And when his armourbearer saw that Saul was dead, he fell likewise upon his sword, and died with him.",
            "ref": "1 Samuel 31:4–5"
          }
        ],
        "echo": {
          "t": "And afterward they desired a king: and God gave unto them Saul the son of Cis, a man of the tribe of Benjamin, by the space of forty years.",
          "ref": "Acts 13:21–22"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "David becomes king over all Israel",
        "verses": [
          {
            "t": "So all the elders of Israel came to the king to Hebron; and king David made a league with them in Hebron before the LORD: and they anointed David king over Israel. David was thirty years old when he began to reign, and he reigned forty years.",
            "ref": "2 Samuel 5:3–4"
          }
        ],
        "echo": {
          "t": "He shall be great, and shall be called the Son of the Highest: and the Lord God shall give unto him the throne of his father David: And he shall reign over the house of Jacob for ever; and of his kingdom there shall be no end.",
          "ref": "Luke 1:32–33"
        },
        "prop": "throne",
        "flare": false
      },
      {
        "title": "David brings the ark to Jerusalem",
        "verses": [
          {
            "t": "And David danced before the LORD with all his might; and David was girded with a linen ephod. So David and all the house of Israel brought up the ark of the LORD with shouting, and with the sound of the trumpet.",
            "ref": "2 Samuel 6:14–15"
          }
        ],
        "echo": {
          "t": "And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth.",
          "ref": "John 1:14"
        },
        "prop": "ark",
        "flare": false
      },
      {
        "title": "God covenants with David",
        "verses": [
          {
            "t": "And when thy days be fulfilled, and thou shalt sleep with thy fathers, I will set up thy seed after thee, which shall proceed out of thy bowels, and I will establish his kingdom. He shall build an house for my name, and I will stablish the throne of his kingdom for ever.",
            "ref": "2 Samuel 7:12–13"
          }
        ],
        "echo": {
          "t": "He shall be great, and shall be called the Son of the Highest: and the Lord God shall give unto him the throne of his father David: And he shall reign over the house of Jacob for ever; and of his kingdom there shall be no end.",
          "ref": "Luke 1:32–33"
        },
        "prop": "throne",
        "flare": false
      },
      {
        "title": "David welcomes Mephibosheth to his table",
        "verses": [
          {
            "t": "And David said unto him, Fear not: for I will surely shew thee kindness for Jonathan thy father’s sake, and will restore thee all the land of Saul thy father; and thou shalt eat bread at my table continually. And he bowed himself, and said, What is thy servant, that thou shouldest look upon such a dead dog as I am?",
            "ref": "2 Samuel 9:7–8"
          }
        ],
        "echo": {
          "t": "But when thou makest a feast, call the poor, the maimed, the lame, the blind: And thou shalt be blessed; for they cannot recompense thee: for thou shalt be recompensed at the resurrection of the just.",
          "ref": "Luke 14:13–14"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "David takes Bathsheba and kills Uriah",
        "verses": [
          {
            "t": "And it came to pass in the morning, that David wrote a letter to Joab, and sent it by the hand of Uriah. And he wrote in the letter, saying, Set ye Uriah in the forefront of the hottest battle, and retire ye from him, that he may be smitten, and die.",
            "ref": "2 Samuel 11:14–15"
          }
        ],
        "echo": {
          "t": "And Jesse begat David the king; and David the king begat Solomon of her that had been the wife of Urias;",
          "ref": "Matthew 1:6"
        },
        "prop": "city",
        "flare": false
      },
      {
        "title": "Nathan confronts David",
        "verses": [
          {
            "t": "And Nathan said to David, Thou art the man. Thus saith the LORD God of Israel, I anointed thee king over Israel, and I delivered thee out of the hand of Saul; And I gave thee thy master’s house, and thy master’s wives into thy bosom, and gave thee the house of Israel and of Judah; and if that had been too little, I would moreover have given unto thee such and such things.",
            "ref": "2 Samuel 12:7–8"
          }
        ],
        "echo": {
          "t": "Wherefore I say unto thee, Her sins, which are many, are forgiven; for she loved much: but to whom little is forgiven, the same loveth little. And he said unto her, Thy sins are forgiven.",
          "ref": "Luke 7:47–48"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "Amnon violates Tamar and Absalom takes revenge",
        "verses": [
          {
            "t": "Howbeit he would not hearken unto her voice: but, being stronger than she, forced her, and lay with her. Then Amnon hated her exceedingly; so that the hatred wherewith he hated her was greater than the love wherewith he had loved her. And Amnon said unto her, Arise, be gone.",
            "ref": "2 Samuel 13:14–15"
          }
        ],
        "echo": {
          "t": "But every man is tempted, when he is drawn away of his own lust, and enticed. Then when lust hath conceived, it bringeth forth sin: and sin, when it is finished, bringeth forth death.",
          "ref": "James 1:14–15"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "Absalom rebels and dies",
        "verses": [
          {
            "t": "Then said Joab, I may not tarry thus with thee. And he took three darts in his hand, and thrust them through the heart of Absalom, while he was yet alive in the midst of the oak. And ten young men that bare Joab’s armour compassed about and smote Absalom, and slew him.",
            "ref": "2 Samuel 18:14–15"
          }
        ],
        "echo": {
          "t": "But so shall it not be among you: but whosoever will be great among you, shall be your minister: And whosoever of you will be the chiefest, shall be servant of all.",
          "ref": "Mark 10:43–44"
        },
        "prop": "tree",
        "flare": false
      },
      {
        "title": "David’s census leads to judgment and an altar",
        "verses": [
          {
            "t": "And the king said unto Araunah, Nay; but I will surely buy it of thee at a price: neither will I offer burnt offerings unto the LORD my God of that which doth cost me nothing. So David bought the threshingfloor and the oxen for fifty shekels of silver. And David built there an altar unto the LORD, and offered burnt offerings and peace offerings.",
            "ref": "2 Samuel 24:24–25"
          }
        ],
        "echo": {
          "t": "Jesus answered and said unto them, Destroy this temple, and in three days I will raise it up. Then said the Jews, Forty and six years was this temple in building, and wilt thou rear it up in three days?",
          "ref": "John 2:19–20"
        },
        "prop": "altar",
        "flare": false
      }
    ]
  },
  {
    "id": "kings",
    "ordinal": 9,
    "en": "Kings",
    "he": "מְלָכִים",
    "translit": "Melachim",
    "section": "Neviim",
    "oneLine": "The house is built; the house burns",
    "setting": "Terraced royal hill country climbing to a gold-capped height, cedar rows lining the ascent. The road runs down from glory through drought-browned ridges toward a far city lit by its own burning.",
    "terrain": {
      "style": "hills",
      "amplitude": 0.55,
      "water": "river"
    },
    "palette": {
      "skyTop": "#5e548e",
      "skyHorizon": "#f0a860",
      "fog": "#b58a72",
      "sun": "#ffc46b",
      "sunElevation": 0.2,
      "terrainLow": "#6e4e46",
      "terrainHigh": "#c98f5e",
      "accent": "#ffd76b",
      "timeOfDay": "goldenHour",
      "stars": 0
    },
    "particles": "embers",
    "creatures": [
      "ravens",
      "lionEyes"
    ],
    "threadGlow": 0.5,
    "stories": [
      {
        "title": "Solomon receives wisdom",
        "verses": [
          {
            "t": "And God said unto him, Because thou hast asked this thing, and hast not asked for thyself long life; neither hast asked riches for thyself, nor hast asked the life of thine enemies; but hast asked for thyself understanding to discern judgment; Behold, I have done according to thy words: lo, I have given thee a wise and an understanding heart; so that there was none like thee before thee, neither after thee shall any arise like unto thee.",
            "ref": "1 Kings 3:11–12"
          }
        ],
        "echo": {
          "t": "The queen of the south shall rise up in the judgment with this generation, and shall condemn it: for she came from the uttermost parts of the earth to hear the wisdom of Solomon; and, behold, a greater than Solomon is here.",
          "ref": "Matthew 12:42"
        },
        "prop": "throne",
        "flare": false
      },
      {
        "title": "Solomon builds and dedicates the temple",
        "verses": [
          {
            "t": "And it came to pass, when the priests were come out of the holy place, that the cloud filled the house of the LORD, So that the priests could not stand to minister because of the cloud: for the glory of the LORD had filled the house of the LORD.",
            "ref": "1 Kings 8:10–11"
          }
        ],
        "echo": {
          "t": "Jesus answered and said unto them, Destroy this temple, and in three days I will raise it up. Then said the Jews, Forty and six years was this temple in building, and wilt thou rear it up in three days?",
          "ref": "John 2:19–20"
        },
        "prop": "temple",
        "flare": false
      },
      {
        "title": "The queen of Sheba visits Solomon",
        "verses": [
          {
            "t": "And she said to the king, It was a true report that I heard in mine own land of thy acts and of thy wisdom. Howbeit I believed not the words, until I came, and mine eyes had seen it: and, behold, the half was not told me: thy wisdom and prosperity exceedeth the fame which I heard.",
            "ref": "1 Kings 10:6–7"
          }
        ],
        "echo": {
          "t": "The queen of the south shall rise up in the judgment with this generation, and shall condemn it: for she came from the uttermost parts of the earth to hear the wisdom of Solomon; and, behold, a greater than Solomon is here.",
          "ref": "Matthew 12:42"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "Solomon’s loves turn his heart from God",
        "verses": [
          {
            "t": "And he had seven hundred wives, princesses, and three hundred concubines: and his wives turned away his heart. For it came to pass, when Solomon was old, that his wives turned away his heart after other gods: and his heart was not perfect with the LORD his God, as was the heart of David his father.",
            "ref": "1 Kings 11:3–4"
          }
        ],
        "echo": {
          "t": "No man can serve two masters: for either he will hate the one, and love the other; or else he will hold to the one, and despise the other. Ye cannot serve God and mammon.",
          "ref": "Matthew 6:24"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "The kingdom divides",
        "verses": [
          {
            "t": "So when all Israel saw that the king hearkened not unto them, the people answered the king, saying, What portion have we in David? neither have we inheritance in the son of Jesse: to your tents, O Israel: now see to thine own house, David. So Israel departed unto their tents. But as for the children of Israel which dwelt in the cities of Judah, Rehoboam reigned over them.",
            "ref": "1 Kings 12:16–17"
          }
        ],
        "echo": {
          "t": "And this spake he not of himself: but being high priest that year, he prophesied that Jesus should die for that nation; And not for that nation only, but that also he should gather together in one the children of God that were scattered abroad.",
          "ref": "John 11:51–52"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "The man of God confronts Jeroboam’s altar",
        "verses": [
          {
            "t": "And, behold, there came a man of God out of Judah by the word of the LORD unto Bethel: and Jeroboam stood by the altar to burn incense.",
            "ref": "1 Kings 13:1–2"
          }
        ],
        "echo": {
          "t": "Now all these things happened unto them for ensamples: and they are written for our admonition, upon whom the ends of the world are come. Wherefore let him that thinketh he standeth take heed lest he fall.",
          "ref": "1 Corinthians 10:11–12"
        },
        "prop": "altar",
        "flare": false
      },
      {
        "title": "Elijah announces drought and is fed by ravens",
        "verses": [
          {
            "t": "And Elijah the Tishbite, who was of the inhabitants of Gilead, said unto Ahab, As the LORD God of Israel liveth, before whom I stand, there shall not be dew nor rain these years, but according to my word. And the word of the LORD came unto him, saying,",
            "ref": "1 Kings 17:1–2"
          }
        ],
        "echo": {
          "t": "Elias was a man subject to like passions as we are, and he prayed earnestly that it might not rain: and it rained not on the earth by the space of three years and six months. And he prayed again, and the heaven gave rain, and the earth brought forth her fruit.",
          "ref": "James 5:17–18"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "Elijah sustains the widow of Zarephath",
        "verses": [
          {
            "t": "And she went and did according to the saying of Elijah: and she, and he, and her house, did eat many days. And the barrel of meal wasted not, neither did the cruse of oil fail, according to the word of the LORD, which he spake by Elijah.",
            "ref": "1 Kings 17:15–16"
          }
        ],
        "echo": {
          "t": "But I tell you of a truth, many widows were in Israel in the days of Elias, when the heaven was shut up three years and six months, when great famine was throughout all the land; But unto none of them was Elias sent, save unto Sarepta, a city of Sidon, unto a woman that was a widow.",
          "ref": "Luke 4:25–26"
        },
        "prop": "well",
        "flare": false
      },
      {
        "title": "Elijah raises the widow’s son",
        "verses": [
          {
            "t": "And he stretched himself upon the child three times, and cried unto the LORD, and said, O LORD my God, I pray thee, let this child’s soul come into him again. And the LORD heard the voice of Elijah; and the soul of the child came into him again, and he revived.",
            "ref": "1 Kings 17:21–22"
          }
        ],
        "echo": {
          "t": "And he came and touched the bier: and they that bare him stood still. And he said, Young man, I say unto thee, Arise. And he that was dead sat up, and began to speak. And he delivered him to his mother.",
          "ref": "Luke 7:14–15"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "Elijah confronts Baal on Carmel",
        "verses": [
          {
            "t": "Hear me, O LORD, hear me, that this people may know that thou art the LORD God, and that thou hast turned their heart back again. Then the fire of the LORD fell, and consumed the burnt sacrifice, and the wood, and the stones, and the dust, and licked up the water that was in the trench.",
            "ref": "1 Kings 18:37–38"
          }
        ],
        "echo": {
          "t": "Elias was a man subject to like passions as we are, and he prayed earnestly that it might not rain: and it rained not on the earth by the space of three years and six months. And he prayed again, and the heaven gave rain, and the earth brought forth her fruit.",
          "ref": "James 5:17–18"
        },
        "prop": "altar",
        "flare": false
      },
      {
        "title": "Elijah meets God at Horeb",
        "verses": [
          {
            "t": "And he said, Go forth, and stand upon the mount before the LORD.",
            "ref": "1 Kings 19:11–12"
          }
        ],
        "echo": {
          "t": "Lord, they have killed thy prophets, and digged down thine altars; and I am left alone, and they seek my life. But what saith the answer of God unto him? I have reserved to myself seven thousand men, who have not bowed the knee to the image of Baal.",
          "ref": "Romans 11:3–4"
        },
        "prop": "stones",
        "flare": false
      },
      {
        "title": "Ahab seizes Naboth’s vineyard",
        "verses": [
          {
            "t": "And it came to pass, when Jezebel heard that Naboth was stoned, and was dead, that Jezebel said to Ahab, Arise, take possession of the vineyard of Naboth the Jezreelite, which he refused to give thee for money: for Naboth is not alive, but dead.",
            "ref": "1 Kings 21:15–16"
          }
        ],
        "echo": {
          "t": "And they took him, and killed him, and cast him out of the vineyard. What shall therefore the lord of the vineyard do? he will come and destroy the husbandmen, and will give the vineyard unto others.",
          "ref": "Mark 12:8–9"
        },
        "prop": "vineyard",
        "flare": false
      },
      {
        "title": "Ahab dies despite disguising himself",
        "verses": [
          {
            "t": "And a certain man drew a bow at a venture, and smote the king of Israel between the joints of the harness: wherefore he said unto the driver of his chariot, Turn thine hand, and carry me out of the host; for I am wounded.",
            "ref": "1 Kings 22:34–35"
          }
        ],
        "echo": {
          "t": "Be not deceived; God is not mocked: for whatsoever a man soweth, that shall he also reap. For he that soweth to his flesh shall of the flesh reap corruption; but he that soweth to the Spirit shall of the Spirit reap life everlasting.",
          "ref": "Galatians 6:7–8"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "Elijah ascends and Elisha succeeds him",
        "verses": [
          {
            "t": "And it came to pass, as they still went on, and talked, that, behold, there appeared a chariot of fire, and horses of fire, and parted them both asunder; and Elijah went up by a whirlwind into heaven. And Elisha saw it, and he cried, My father, my father, the chariot of Israel, and the horsemen thereof.",
            "ref": "2 Kings 2:11–12"
          }
        ],
        "echo": {
          "t": "And was transfigured before them: and his face did shine as the sun, and his raiment was white as the light. And, behold, there appeared unto them Moses and Elias talking with him.",
          "ref": "Matthew 17:2–3"
        },
        "prop": "whirlwind",
        "flare": false
      },
      {
        "title": "Elisha multiplies the widow’s oil",
        "verses": [
          {
            "t": "And it came to pass, when the vessels were full, that she said unto her son, Bring me yet a vessel. And he said unto her, There is not a vessel more. And the oil stayed. Then she came and told the man of God. And he said, Go, sell the oil, and pay thy debt, and live thou and thy children of the rest.",
            "ref": "2 Kings 4:6–7"
          }
        ],
        "echo": {
          "t": "But I tell you of a truth, many widows were in Israel in the days of Elias, when the heaven was shut up three years and six months, when great famine was throughout all the land; But unto none of them was Elias sent, save unto Sarepta, a city of Sidon, unto a woman that was a widow.",
          "ref": "Luke 4:25–26"
        },
        "prop": "well",
        "flare": false
      },
      {
        "title": "Elisha raises the Shunammite’s son",
        "verses": [
          {
            "t": "And he went up, and lay upon the child, and put his mouth upon his mouth, and his eyes upon his eyes, and his hands upon his hands: and he stretched himself upon the child; and the flesh of the child waxed warm. Then he returned, and walked in the house to and fro; and went up, and stretched himself upon him: and the child sneezed seven times, and the child opened his eyes.",
            "ref": "2 Kings 4:34–35"
          }
        ],
        "echo": {
          "t": "Women received their dead raised to life again: and others were tortured, not accepting deliverance; that they might obtain a better resurrection:",
          "ref": "Hebrews 11:35"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "Naaman is healed in the Jordan",
        "verses": [
          {
            "t": "And his servants came near, and spake unto him, and said, My father, if the prophet had bid thee do some great thing, wouldest thou not have done it? how much rather then, when he saith to thee, Wash, and be clean?",
            "ref": "2 Kings 5:13–14"
          }
        ],
        "echo": {
          "t": "And many lepers were in Israel in the time of Eliseus the prophet; and none of them was cleansed, saving Naaman the Syrian.",
          "ref": "Luke 4:27"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "Elisha’s feast ends hostility with Aram",
        "verses": [
          {
            "t": "And he answered, Thou shalt not smite them: wouldest thou smite those whom thou hast taken captive with thy sword and with thy bow? set bread and water before them, that they may eat and drink, and go to their master. And he prepared great provision for them: and when they had eaten and drunk, he sent them away, and they went to their master.",
            "ref": "2 Kings 6:22–23"
          }
        ],
        "echo": {
          "t": "But I say unto you which hear, Love your enemies, do good to them which hate you, Bless them that curse you, and pray for them which despitefully use you.",
          "ref": "Luke 6:27–28"
        },
        "prop": "tent",
        "flare": false
      },
      {
        "title": "Jehu destroys Ahab’s house and Baal’s temple",
        "verses": [
          {
            "t": "And they brake down the image of Baal, and brake down the house of Baal, and made it a draught house unto this day. Thus Jehu destroyed Baal out of Israel.",
            "ref": "2 Kings 10:27–28"
          }
        ],
        "echo": {
          "t": "And I gave her space to repent of her fornication; and she repented not. Behold, I will cast her into a bed, and them that commit adultery with her into great tribulation, except they repent of their deeds.",
          "ref": "Revelation 2:21–22"
        },
        "prop": "temple",
        "flare": false
      },
      {
        "title": "Athaliah usurps the throne; Joash is preserved",
        "verses": [
          {
            "t": "But Jehosheba, the daughter of king Joram, sister of Ahaziah, took Joash the son of Ahaziah, and stole him from among the king’s sons which were slain; and they hid him, even him and his nurse, in the bedchamber from Athaliah, so that he was not slain. And he was with her hid in the house of the LORD six years. And Athaliah did reign over the land.",
            "ref": "2 Kings 11:2–3"
          }
        ],
        "echo": {
          "t": "And his tail drew the third part of the stars of heaven, and did cast them to the earth: and the dragon stood before the woman which was ready to be delivered, for to devour her child as soon as it was born.",
          "ref": "Revelation 12:4–5"
        },
        "prop": "temple",
        "flare": false
      },
      {
        "title": "Samaria falls to Assyria",
        "verses": [
          {
            "t": "In the ninth year of Hoshea the king of Assyria took Samaria, and carried Israel away into Assyria, and placed them in Halah and in Habor by the river of Gozan, and in the cities of the Medes.",
            "ref": "2 Kings 17:6–7"
          }
        ],
        "echo": {
          "t": "Well; because of unbelief they were broken off, and thou standest by faith. Be not highminded, but fear: For if God spared not the natural branches, take heed lest he also spare not thee.",
          "ref": "Romans 11:20–21"
        },
        "prop": "city",
        "flare": false
      },
      {
        "title": "Jerusalem is delivered from Sennacherib",
        "verses": [
          {
            "t": "And it came to pass that night, that the angel of the LORD went out, and smote in the camp of the Assyrians an hundred fourscore and five thousand: and when they arose early in the morning, behold, they were all dead corpses. So Sennacherib king of Assyria departed, and went and returned, and dwelt at Nineveh.",
            "ref": "2 Kings 19:35–36"
          }
        ],
        "echo": {
          "t": "And immediately the angel of the Lord smote him, because he gave not God the glory: and he was eaten of worms, and gave up the ghost. But the word of God grew and multiplied.",
          "ref": "Acts 12:23–24"
        },
        "prop": "wall",
        "flare": false
      },
      {
        "title": "Hezekiah is healed",
        "verses": [
          {
            "t": "Turn again, and tell Hezekiah the captain of my people, Thus saith the LORD, the God of David thy father, I have heard thy prayer, I have seen thy tears: behold, I will heal thee: on the third day thou shalt go up unto the house of the LORD.",
            "ref": "2 Kings 20:5–6"
          }
        ],
        "echo": {
          "t": "I say unto thee, Arise, and take up thy bed, and go thy way into thine house. And immediately he arose, took up the bed, and went forth before them all; insomuch that they were all amazed, and glorified God, saying, We never saw it on this fashion.",
          "ref": "Mark 2:11–12"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "Josiah finds the Torah and reforms Judah",
        "verses": [
          {
            "t": "And Shaphan the scribe shewed the king, saying, Hilkiah the priest hath delivered me a book. And Shaphan read it before the king. And it came to pass, when the king had heard the words of the book of the law, that he rent his clothes.",
            "ref": "2 Kings 22:10–11"
          }
        ],
        "echo": {
          "t": "And he came to Nazareth, where he had been brought up: and, as his custom was, he went into the synagogue on the sabbath day, and stood up for to read. And there was delivered unto him the book of the prophet Esaias.",
          "ref": "Luke 4:16–17"
        },
        "prop": "temple",
        "flare": false
      },
      {
        "title": "Jerusalem and the temple fall to Babylon",
        "verses": [
          {
            "t": "And he burnt the house of the LORD, and the king’s house, and all the houses of Jerusalem, and every great man’s house burnt he with fire. And all the army of the Chaldees, that were with the captain of the guard, brake down the walls of Jerusalem round about.",
            "ref": "2 Kings 25:9–10"
          }
        ],
        "echo": {
          "t": "And when ye shall see Jerusalem compassed with armies, then know that the desolation thereof is nigh. Then let them which are in Judaea flee to the mountains; and let them which are in the midst of it depart out; and let not them that are in the countries enter thereinto.",
          "ref": "Luke 21:20–21"
        },
        "prop": "temple",
        "flare": false
      }
    ]
  },
  {
    "id": "isaiah",
    "ordinal": 10,
    "en": "Isaiah",
    "he": "יְשַׁעְיָהוּ",
    "translit": "Yeshayahu",
    "section": "Neviim",
    "oneLine": "Every valley lifted, every cedar bowed",
    "setting": "A high holy mountain wrapped in smoke, its ridges stepping down into pale wilderness. Wherever the road passes, dry ground breaks into blossom, and the crooked valleys are slowly being made straight.",
    "terrain": {
      "style": "mountains",
      "amplitude": 0.75,
      "water": "river"
    },
    "palette": {
      "skyTop": "#6ba3cf",
      "skyHorizon": "#f2ead0",
      "fog": "#d8e2e8",
      "sun": "#fffbe8",
      "sunElevation": 1,
      "terrainLow": "#7a8fa8",
      "terrainHigh": "#d8d2c2",
      "accent": "#fff2b0",
      "timeOfDay": "noon",
      "stars": 0
    },
    "particles": "petals",
    "creatures": [
      "doves",
      "lionEyes"
    ],
    "threadGlow": 0.35,
    "stories": [
      {
        "title": "Isaiah sees YHWH enthroned and is commissioned",
        "verses": [
          {
            "t": "In the year that king Uzziah died I saw also the LORD sitting upon a throne, high and lifted up, and his train filled the temple. Above it stood the seraphims: each one had six wings; with twain he covered his face, and with twain he covered his feet, and with twain he did fly.",
            "ref": "Isaiah 6:1–2"
          }
        ],
        "echo": {
          "t": "He hath blinded their eyes, and hardened their heart; that they should not see with their eyes, nor understand with their heart, and be converted, and I should heal them. These things said Esaias, when he saw his glory, and spake of him.",
          "ref": "John 12:40–41"
        },
        "prop": "throne",
        "flare": false
      },
      {
        "title": "Isaiah gives Ahaz the sign of Immanuel",
        "verses": [
          {
            "t": "And he said, Hear ye now, O house of David; Is it a small thing for you to weary men, but will ye weary my God also? Therefore the Lord himself shall give you a sign; Behold, a virgin shall conceive, and bear a son, and shall call his name Immanuel.",
            "ref": "Isaiah 7:13–14"
          }
        ],
        "echo": {
          "t": "Now all this was done, that it might be fulfilled which was spoken of the Lord by the prophet, saying, Behold, a virgin shall be with child, and shall bring forth a son, and they shall call his name Emmanuel, which being interpreted is, God with us.",
          "ref": "Matthew 1:22–23"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "A royal child is promised David’s throne",
        "verses": [
          {
            "t": "For unto us a child is born, unto us a son is given: and the government shall be upon his shoulder: and his name shall be called Wonderful, Counsellor, The mighty God, The everlasting Father, The Prince of Peace.",
            "ref": "Isaiah 9:6–7"
          }
        ],
        "echo": {
          "t": "He shall be great, and shall be called the Son of the Highest: and the Lord God shall give unto him the throne of his father David: And he shall reign over the house of Jacob for ever; and of his kingdom there shall be no end.",
          "ref": "Luke 1:32–33"
        },
        "prop": "tree",
        "flare": false
      },
      {
        "title": "A voice announces a new exodus through the wilderness",
        "verses": [
          {
            "t": "The voice of him that crieth in the wilderness, Prepare ye the way of the LORD, make straight in the desert a highway for our God. Every valley shall be exalted, and every mountain and hill shall be made low: and the crooked shall be made straight, and the rough places plain:",
            "ref": "Isaiah 40:3–4"
          }
        ],
        "echo": {
          "t": "As it is written in the prophets, Behold, I send my messenger before thy face, which shall prepare thy way before thee. The voice of one crying in the wilderness, Prepare ye the way of the Lord, make his paths straight.",
          "ref": "Mark 1:2–3"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "YHWH’s servant becomes a light to the nations",
        "verses": [
          {
            "t": "And now, saith the LORD that formed me from the womb to be his servant, to bring Jacob again to him, Though Israel be not gathered, yet shall I be glorious in the eyes of the LORD, and my God shall be my strength.",
            "ref": "Isaiah 49:5–6"
          }
        ],
        "echo": {
          "t": "Which thou hast prepared before the face of all people; A light to lighten the Gentiles, and the glory of thy people Israel.",
          "ref": "Luke 2:31–32"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "The obedient servant gives his back to attackers",
        "verses": [
          {
            "t": "The Lord GOD hath opened mine ear, and I was not rebellious, neither turned away back. I gave my back to the smiters, and my cheeks to them that plucked off the hair: I hid not my face from shame and spitting.",
            "ref": "Isaiah 50:5–6"
          }
        ],
        "echo": {
          "t": "And they smote him on the head with a reed, and did spit upon him, and bowing their knees worshipped him. And when they had mocked him, they took off the purple from him, and put his own clothes on him, and led him out to crucify him.",
          "ref": "Mark 15:19–20"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "The suffering servant bears the people’s wounds",
        "verses": [
          {
            "t": "Surely he hath borne our griefs, and carried our sorrows: yet we did esteem him stricken, smitten of God, and afflicted. But he was wounded for our transgressions, he was bruised for our iniquities: the chastisement of our peace was upon him; and with his stripes we are healed.",
            "ref": "Isaiah 53:4–5"
          }
        ],
        "echo": {
          "t": "Who his own self bare our sins in his own body on the tree, that we, being dead to sins, should live unto righteousness: by whose stripes ye were healed. For ye were as sheep going astray; but are now returned unto the Shepherd and Bishop of your souls.",
          "ref": "1 Peter 2:24–25"
        },
        "prop": "altar",
        "flare": true
      },
      {
        "title": "Isaiah sees new heavens and a new earth",
        "verses": [
          {
            "t": "For, behold, I create new heavens and a new earth: and the former shall not be remembered, nor come into mind. But be ye glad and rejoice for ever in that which I create: for, behold, I create Jerusalem a rejoicing, and her people a joy.",
            "ref": "Isaiah 65:17–18"
          }
        ],
        "echo": {
          "t": "And I saw a new heaven and a new earth: for the first heaven and the first earth were passed away; and there was no more sea. And I John saw the holy city, new Jerusalem, coming down from God out of heaven, prepared as a bride adorned for her husband.",
          "ref": "Revelation 21:1–2"
        },
        "prop": null,
        "flare": false
      }
    ]
  },
  {
    "id": "jeremiah",
    "ordinal": 11,
    "en": "Jeremiah",
    "he": "יִרְמְיָהוּ",
    "translit": "Yirmiyahu",
    "section": "Neviim",
    "oneLine": "Fire in the bones, clay on the wheel",
    "setting": "A drought-cracked valley beneath a smoke-red sky, the burning city glowing on the ridge behind. Broken cisterns hold only dust, and a single almond tree blossoms white against the ash.",
    "terrain": {
      "style": "valley",
      "amplitude": 0.45,
      "water": "none"
    },
    "palette": {
      "skyTop": "#3a2e4e",
      "skyHorizon": "#b06a52",
      "fog": "#6e5560",
      "sun": "#d1764a",
      "sunElevation": 0.06,
      "terrainLow": "#46384a",
      "terrainHigh": "#8a6656",
      "accent": "#ff8a5e",
      "timeOfDay": "dusk",
      "stars": 0.15
    },
    "particles": "ash",
    "creatures": [
      "lionEyes",
      "ravens"
    ],
    "threadGlow": 0.25,
    "stories": [
      {
        "title": "Jeremiah is called before birth",
        "verses": [
          {
            "t": "Then the word of the LORD came unto me, saying, Before I formed thee in the belly I knew thee; and before thou camest forth out of the womb I sanctified thee, and I ordained thee a prophet unto the nations.",
            "ref": "Jeremiah 1:4–5"
          }
        ],
        "echo": {
          "t": "But when it pleased God, who separated me from my mother’s womb, and called me by his grace, To reveal his Son in me, that I might preach him among the heathen; immediately I conferred not with flesh and blood:",
          "ref": "Galatians 1:15–16"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "Jeremiah proclaims judgment at the temple",
        "verses": [
          {
            "t": "And come and stand before me in this house, which is called by my name, and say, We are delivered to do all these abominations? Is this house, which is called by my name, become a den of robbers in your eyes? Behold, even I have seen it, saith the LORD.",
            "ref": "Jeremiah 7:10–11"
          }
        ],
        "echo": {
          "t": "And he taught, saying unto them, Is it not written, My house shall be called of all nations the house of prayer? but ye have made it a den of thieves.",
          "ref": "Mark 11:17–18"
        },
        "prop": "temple",
        "flare": false
      },
      {
        "title": "Jeremiah watches the potter reshape clay",
        "verses": [
          {
            "t": "Then I went down to the potter’s house, and, behold, he wrought a work on the wheels. And the vessel that he made of clay was marred in the hand of the potter: so he made it again another vessel, as seemed good to the potter to make it.",
            "ref": "Jeremiah 18:3–4"
          }
        ],
        "echo": {
          "t": "Nay but, O man, who art thou that repliest against God? Shall the thing formed say to him that formed it, Why hast thou made me thus? Hath not the potter power over the clay, of the same lump to make one vessel unto honour, and another unto dishonour?",
          "ref": "Romans 9:20–21"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "Jeremiah wears a yoke before the kings",
        "verses": [
          {
            "t": "Thus saith the LORD to me; Make thee bonds and yokes, and put them upon thy neck, And send them to the king of Edom, and to the king of Moab, and to the king of the Ammonites, and to the king of Tyrus, and to the king of Zidon, by the hand of the messengers which come to Jerusalem unto Zedekiah king of Judah;",
            "ref": "Jeremiah 27:2–3"
          }
        ],
        "echo": {
          "t": "Take my yoke upon you, and learn of me; for I am meek and lowly in heart: and ye shall find rest unto your souls. For my yoke is easy, and my burden is light.",
          "ref": "Matthew 11:29–30"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "Jeremiah announces the new covenant",
        "verses": [
          {
            "t": "Behold, the days come, saith the LORD, that I will make a new covenant with the house of Israel, and with the house of Judah: Not according to the covenant that I made with their fathers in the day that I took them by the hand to bring them out of the land of Egypt; which my covenant they brake, although I was an husband unto them, saith the LORD:",
            "ref": "Jeremiah 31:31–32"
          }
        ],
        "echo": {
          "t": "And he took bread, and gave thanks, and brake it, and gave unto them, saying, This is my body which is given for you: this do in remembrance of me. Likewise also the cup after supper, saying, This cup is the new testament in my blood, which is shed for you.",
          "ref": "Luke 22:19–20"
        },
        "prop": "tablets",
        "flare": false
      },
      {
        "title": "Jeremiah buys a field during Jerusalem’s siege",
        "verses": [
          {
            "t": "Thus saith the LORD of hosts, the God of Israel; Take these evidences, this evidence of the purchase, both which is sealed, and this evidence which is open; and put them in an earthen vessel, that they may continue many days. For thus saith the LORD of hosts, the God of Israel; Houses and fields and vineyards shall be possessed again in this land.",
            "ref": "Jeremiah 32:14–15"
          }
        ],
        "echo": {
          "t": "These all died in faith, not having received the promises, but having seen them afar off, and were persuaded of them, and embraced them, and confessed that they were strangers and pilgrims on the earth. For they that say such things declare plainly that they seek a country.",
          "ref": "Hebrews 11:13–14"
        },
        "prop": "city",
        "flare": false
      },
      {
        "title": "Jehoiakim burns Jeremiah’s scroll",
        "verses": [
          {
            "t": "Now the king sat in the winterhouse in the ninth month: and there was a fire on the hearth burning before him. And it came to pass, that when Jehudi had read three or four leaves, he cut it with the penknife, and cast it into the fire that was on the hearth, until all the roll was consumed in the fire that was on the hearth.",
            "ref": "Jeremiah 36:22–23"
          }
        ],
        "echo": {
          "t": "Heaven and earth shall pass away, but my words shall not pass away.",
          "ref": "Matthew 24:35"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "Jeremiah is lowered into a cistern and rescued",
        "verses": [
          {
            "t": "Then took they Jeremiah, and cast him into the dungeon of Malchiah the son of Hammelech, that was in the court of the prison: and they let down Jeremiah with cords. And in the dungeon there was no water, but mire: so Jeremiah sunk in the mire.",
            "ref": "Jeremiah 38:6–7"
          }
        ],
        "echo": {
          "t": "Be not forgetful to entertain strangers: for thereby some have entertained angels unawares. Remember them that are in bonds, as bound with them; and them which suffer adversity, as being yourselves also in the body.",
          "ref": "Hebrews 13:2–3"
        },
        "prop": "well",
        "flare": false
      }
    ]
  },
  {
    "id": "ezekiel",
    "ordinal": 12,
    "en": "Ezekiel",
    "he": "יְחֶזְקֵאל",
    "translit": "Yechezkel",
    "section": "Neviim",
    "oneLine": "By the rivers of exile, heaven opens",
    "setting": "A flat land of canals and willow banks under an enormous bruised sky, far from home. Storm light moves along the water, and something burns amber inside the cloud.",
    "terrain": {
      "style": "riverlands",
      "amplitude": 0.3,
      "water": "river"
    },
    "palette": {
      "skyTop": "#26323a",
      "skyHorizon": "#8fae9a",
      "fog": "#4a6660",
      "sun": "#d8e8b0",
      "sunElevation": 0.6,
      "terrainLow": "#2e4440",
      "terrainHigh": "#6e8f7e",
      "accent": "#d8f07a",
      "timeOfDay": "storm",
      "stars": 0
    },
    "particles": "embers",
    "creatures": [
      "lionEyes",
      "birds",
      "fish"
    ],
    "threadGlow": 0.18,
    "stories": [
      {
        "title": "Ezekiel sees the divine chariot and glory",
        "verses": [
          {
            "t": "And above the firmament that was over their heads was the likeness of a throne, as the appearance of a sapphire stone: and upon the likeness of the throne was the likeness as the appearance of a man above upon it.",
            "ref": "Ezekiel 1:26–27"
          }
        ],
        "echo": {
          "t": "And immediately I was in the spirit: and, behold, a throne was set in heaven, and one sat on the throne. And he that sat was to look upon like a jasper and a sardine stone: and there was a rainbow round about the throne, in sight like unto an emerald.",
          "ref": "Revelation 4:2–3"
        },
        "prop": "throne",
        "flare": false
      },
      {
        "title": "Ezekiel eats the prophetic scroll",
        "verses": [
          {
            "t": "Moreover he said unto me, Son of man, eat that thou findest; eat this roll, and go speak unto the house of Israel. So I opened my mouth, and he caused me to eat that roll.",
            "ref": "Ezekiel 3:1–2"
          }
        ],
        "echo": {
          "t": "And I went unto the angel, and said unto him, Give me the little book. And he said unto me, Take it, and eat it up; and it shall make thy belly bitter, but it shall be in thy mouth sweet as honey.",
          "ref": "Revelation 10:9–10"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "Ezekiel enacts Jerusalem’s siege",
        "verses": [
          {
            "t": "Thou also, son of man, take thee a tile, and lay it before thee, and pourtray upon it the city, even Jerusalem: And lay siege against it, and build a fort against it, and cast a mount against it; set the camp also against it, and set battering rams against it round about.",
            "ref": "Ezekiel 4:1–2"
          }
        ],
        "echo": {
          "t": "For the days shall come upon thee, that thine enemies shall cast a trench about thee, and compass thee round, and keep thee in on every side, And shall lay thee even with the ground, and thy children within thee; and they shall not leave in thee one stone upon another; because thou knewest not the time of thy visitation.",
          "ref": "Luke 19:43–44"
        },
        "prop": "city",
        "flare": false
      },
      {
        "title": "Ezekiel sees the temple’s corruption and glory depart",
        "verses": [
          {
            "t": "Then the glory of the LORD departed from off the threshold of the house, and stood over the cherubims. And the cherubims lifted up their wings, and mounted up from the earth in my sight: when they went out, the wheels also were beside them, and every one stood at the door of the east gate of the LORD’s house; and the glory of the God of Israel was over them above.",
            "ref": "Ezekiel 10:18–19"
          }
        ],
        "echo": {
          "t": "Wherefore God also gave them up to uncleanness through the lusts of their own hearts, to dishonour their own bodies between themselves: Who changed the truth of God into a lie, and worshipped and served the creature more than the Creator, who is blessed for ever. Amen.",
          "ref": "Romans 1:24–25"
        },
        "prop": "temple",
        "flare": false
      },
      {
        "title": "Ezekiel condemns the shepherds and promises one Davidic shepherd",
        "verses": [
          {
            "t": "And I will set up one shepherd over them, and he shall feed them, even my servant David; he shall feed them, and he shall be their shepherd. And I the LORD will be their God, and my servant David a prince among them; I the LORD have spoken it.",
            "ref": "Ezekiel 34:23–24"
          }
        ],
        "echo": {
          "t": "I am the good shepherd: the good shepherd giveth his life for the sheep. But he that is an hireling, and not the shepherd, whose own the sheep are not, seeth the wolf coming, and leaveth the sheep, and fleeth: and the wolf catcheth them, and scattereth the sheep.",
          "ref": "John 10:11–12"
        },
        "prop": "throne",
        "flare": false
      },
      {
        "title": "Ezekiel sees the valley of dry bones",
        "verses": [
          {
            "t": "Then he said unto me, Son of man, these bones are the whole house of Israel: behold, they say, Our bones are dried, and our hope is lost: we are cut off for our parts. Therefore prophesy and say unto them, Thus saith the Lord GOD; Behold, O my people, I will open your graves, and cause you to come up out of your graves, and bring you into the land of Israel.",
            "ref": "Ezekiel 37:11–12"
          }
        ],
        "echo": {
          "t": "Verily, verily, I say unto you, The hour is coming, and now is, when the dead shall hear the voice of the Son of God: and they that hear shall live.",
          "ref": "John 5:25–26"
        },
        "prop": "bones",
        "flare": false
      },
      {
        "title": "Gog gathers against restored Israel",
        "verses": [
          {
            "t": "And thou shalt come from thy place out of the north parts, thou, and many people with thee, all of them riding upon horses, a great company, and a mighty army: And thou shalt come up against my people of Israel, as a cloud to cover the land; it shall be in the latter days, and I will bring thee against my land, that the heathen may know me, when I shall be sanctified in thee, O Gog, before their eyes.",
            "ref": "Ezekiel 38:15–16"
          }
        ],
        "echo": {
          "t": "And shall go out to deceive the nations which are in the four quarters of the earth, Gog and Magog, to gather them together to battle: the number of whom is as the sand of the sea.",
          "ref": "Revelation 20:8–9"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "The life-giving river flows from the new temple",
        "verses": [
          {
            "t": "Then said he unto me, These waters issue out toward the east country, and go down into the desert, and go into the sea: which being brought forth into the sea, the waters shall be healed.",
            "ref": "Ezekiel 47:8–9"
          }
        ],
        "echo": {
          "t": "And he shewed me a pure river of water of life, clear as crystal, proceeding out of the throne of God and of the Lamb.",
          "ref": "Revelation 22:1–2"
        },
        "prop": "temple",
        "flare": false
      }
    ]
  },
  {
    "id": "the-twelve",
    "ordinal": 13,
    "en": "The Twelve",
    "he": "תְּרֵי עֲשַׂר",
    "translit": "Trei Asar",
    "section": "Neviim",
    "oneLine": "Twelve voices, one storm, the returning rain",
    "setting": "A patchwork of small territories under fast-moving weather — locust-stripped fields, a blooming vineyard in a scarred valley, hills tumbling down to a storm-dark sea. Light breaks through and closes again, twelve times.",
    "terrain": {
      "style": "hills",
      "amplitude": 0.5,
      "water": "sea"
    },
    "palette": {
      "skyTop": "#2e2a52",
      "skyHorizon": "#c97a6e",
      "fog": "#6e5a72",
      "sun": "#ffb87a",
      "sunElevation": -0.03,
      "terrainLow": "#3a3452",
      "terrainHigh": "#8a6e6e",
      "accent": "#ffcf8f",
      "timeOfDay": "predawn",
      "stars": 0.35
    },
    "particles": "rain",
    "creatures": [
      "greatFish",
      "locusts",
      "doves"
    ],
    "threadGlow": 0.3,
    "stories": [
      {
        "title": "Hosea’s marriage embodies YHWH’s wounded covenant love",
        "verses": [
          {
            "t": "The beginning of the word of the LORD by Hosea. And the LORD said to Hosea, Go, take unto thee a wife of whoredoms and children of whoredoms: for the land hath committed great whoredom, departing from the LORD. So he went and took Gomer the daughter of Diblaim; which conceived, and bare him a son.",
            "ref": "Hosea 1:2–3"
          }
        ],
        "echo": {
          "t": "As he saith also in Osee, I will call them my people, which were not my people; and her beloved, which was not beloved. And it shall come to pass, that in the place where it was said unto them, Ye are not my people; there shall they be called the children of the living God.",
          "ref": "Romans 9:25–26"
        },
        "prop": "vineyard",
        "flare": false
      },
      {
        "title": "Joel promises the Spirit before the Day of YHWH",
        "verses": [
          {
            "t": "And it shall come to pass afterward, that I will pour out my spirit upon all flesh; and your sons and your daughters shall prophesy, your old men shall dream dreams, your young men shall see visions: And also upon the servants and upon the handmaids in those days will I pour out my spirit.",
            "ref": "Joel 2:28–29"
          }
        ],
        "echo": {
          "t": "And it shall come to pass in the last days, saith God, I will pour out of my Spirit upon all flesh: and your sons and your daughters shall prophesy, and your young men shall see visions, and your old men shall dream dreams: And on my servants and on my handmaidens I will pour out in those days of my Spirit; and they shall prophesy:",
          "ref": "Acts 2:17–18"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "Amos promises David’s fallen booth restored",
        "verses": [
          {
            "t": "In that day will I raise up the tabernacle of David that is fallen, and close up the breaches thereof; and I will raise up his ruins, and I will build it as in the days of old: That they may possess the remnant of Edom, and of all the heathen, which are called by my name, saith the LORD that doeth this.",
            "ref": "Amos 9:11–12"
          }
        ],
        "echo": {
          "t": "After this I will return, and will build again the tabernacle of David, which is fallen down; and I will build again the ruins thereof, and I will set it up: That the residue of men might seek after the Lord, and all the Gentiles, upon whom my name is called, saith the Lord, who doeth all these things.",
          "ref": "Acts 15:16–17"
        },
        "prop": "tent",
        "flare": false
      },
      {
        "title": "Obadiah sees Edom judged and YHWH’s kingdom established",
        "verses": [
          {
            "t": "And the captivity of this host of the children of Israel shall possess that of the Canaanites, even unto Zarephath; and the captivity of Jerusalem, which is in Sepharad, shall possess the cities of the south. And saviours shall come up on mount Zion to judge the mount of Esau; and the kingdom shall be the LORD’s.",
            "ref": "Obadiah 20–21"
          }
        ],
        "echo": {
          "t": "Lest there be any fornicator, or profane person, as Esau, who for one morsel of meat sold his birthright. For ye know how that afterward, when he would have inherited the blessing, he was rejected: for he found no place of repentance, though he sought it carefully with tears.",
          "ref": "Hebrews 12:16–17"
        },
        "prop": "city",
        "flare": false
      },
      {
        "title": "Jonah flees, descends, and is delivered to preach to Nineveh",
        "verses": [
          {
            "t": "Then Jonah prayed unto the LORD his God out of the fish’s belly, And said, I cried by reason of mine affliction unto the LORD, and he heard me; out of the belly of hell cried I, and thou heardest my voice.",
            "ref": "Jonah 2:1–2"
          }
        ],
        "echo": {
          "t": "For as Jonas was three days and three nights in the whale’s belly; so shall the Son of man be three days and three nights in the heart of the earth.",
          "ref": "Matthew 12:40–41"
        },
        "prop": "boat",
        "flare": false
      },
      {
        "title": "Micah locates Israel’s ruler in Bethlehem",
        "verses": [
          {
            "t": "Now gather thyself in troops, O daughter of troops: he hath laid siege against us: they shall smite the judge of Israel with a rod upon the cheek. But thou, Bethlehem Ephratah, though thou be little among the thousands of Judah, yet out of thee shall he come forth unto me that is to be ruler in Israel; whose goings forth have been from of old, from everlasting.",
            "ref": "Micah 5:1–2"
          }
        ],
        "echo": {
          "t": "And they said unto him, In Bethlehem of Judaea: for thus it is written by the prophet, And thou Bethlehem, in the land of Juda, art not the least among the princes of Juda: for out of thee shall come a Governor, that shall rule my people Israel.",
          "ref": "Matthew 2:5–6"
        },
        "prop": "manger",
        "flare": true
      },
      {
        "title": "Nahum announces Nineveh’s fall",
        "verses": [
          {
            "t": "And the LORD hath given a commandment concerning thee, that no more of thy name be sown: out of the house of thy gods will I cut off the graven image and the molten image: I will make thy grave; for thou art vile. Behold upon the mountains the feet of him that bringeth good tidings, that publisheth peace!",
            "ref": "Nahum 1:14–15"
          }
        ],
        "echo": {
          "t": "But after thy hardness and impenitent heart treasurest up unto thyself wrath against the day of wrath and revelation of the righteous judgment of God; Who will render to every man according to his deeds:",
          "ref": "Romans 2:5–6"
        },
        "prop": "city",
        "flare": false
      },
      {
        "title": "Habakkuk questions God and learns to live by faith",
        "verses": [
          {
            "t": "For the vision is yet for an appointed time, but at the end it shall speak, and not lie: though it tarry, wait for it; because it will surely come, it will not tarry. Behold, his soul which is lifted up is not upright in him: but the just shall live by his faith.",
            "ref": "Habakkuk 2:3–4"
          }
        ],
        "echo": {
          "t": "For I am not ashamed of the gospel of Christ: for it is the power of God unto salvation to every one that believeth; to the Jew first, and also to the Greek. For therein is the righteousness of God revealed from faith to faith: as it is written, The just shall live by faith.",
          "ref": "Romans 1:16–17"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "Zephaniah foresees a purified, humble remnant",
        "verses": [
          {
            "t": "I will also leave in the midst of thee an afflicted and poor people, and they shall trust in the name of the LORD. The remnant of Israel shall not do iniquity, nor speak lies; neither shall a deceitful tongue be found in their mouth: for they shall feed and lie down, and none shall make them afraid.",
            "ref": "Zephaniah 3:12–13"
          }
        ],
        "echo": {
          "t": "These are they which were not defiled with women; for they are virgins. These are they which follow the Lamb whithersoever he goeth. These were redeemed from among men, being the firstfruits unto God and to the Lamb. And in their mouth was found no guile: for they are without fault before the throne of God.",
          "ref": "Revelation 14:4–5"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "Haggai summons the returned exiles to rebuild the temple",
        "verses": [
          {
            "t": "Thus saith the LORD of hosts; Consider your ways. Go up to the mountain, and bring wood, and build the house; and I will take pleasure in it, and I will be glorified, saith the LORD.",
            "ref": "Haggai 1:7–8"
          }
        ],
        "echo": {
          "t": "Jesus answered and said unto them, Destroy this temple, and in three days I will raise it up. Then said the Jews, Forty and six years was this temple in building, and wilt thou rear it up in three days?",
          "ref": "John 2:19–20"
        },
        "prop": "temple",
        "flare": false
      },
      {
        "title": "Zechariah sees the Branch unite priesthood and kingship",
        "verses": [
          {
            "t": "And speak unto him, saying, Thus speaketh the LORD of hosts, saying, Behold the man whose name is The BRANCH; and he shall grow up out of his place, and he shall build the temple of the LORD: Even he shall build the temple of the LORD; and he shall bear the glory, and shall sit and rule upon his throne; and he shall be a priest upon his throne: and the counsel of peace shall be between them both.",
            "ref": "Zechariah 6:12–13"
          }
        ],
        "echo": {
          "t": "Now of the things which we have spoken this is the sum: We have such an high priest, who is set on the right hand of the throne of the Majesty in the heavens; A minister of the sanctuary, and of the true tabernacle, which the Lord pitched, and not man.",
          "ref": "Hebrews 8:1–2"
        },
        "prop": "throne",
        "flare": false
      },
      {
        "title": "Malachi promises a messenger before YHWH’s arrival",
        "verses": [
          {
            "t": "Behold, I will send my messenger, and he shall prepare the way before me: and the LORD, whom ye seek, shall suddenly come to his temple, even the messenger of the covenant, whom ye delight in: behold, he shall come, saith the LORD of hosts. But who may abide the day of his coming? and who shall stand when he appeareth?",
            "ref": "Malachi 3:1–2"
          }
        ],
        "echo": {
          "t": "As it is written in the prophets, Behold, I send my messenger before thy face, which shall prepare thy way before thee. The voice of one crying in the wilderness, Prepare ye the way of the Lord, make his paths straight.",
          "ref": "Mark 1:2–3"
        },
        "prop": "altar",
        "flare": false
      }
    ]
  },
  {
    "id": "psalms",
    "ordinal": 14,
    "en": "Psalms",
    "he": "תְּהִלִּים",
    "translit": "Tehillim",
    "section": "Ketuvim",
    "oneLine": "Every valley here has learned to sing",
    "setting": "A long green valley strung with still waters and dry ravines by turns, where wind moves through the cedars like breath through a reed. The path itself feels metered — falling into lament, rising into praise, and rising again.",
    "terrain": {
      "style": "valley",
      "amplitude": 0.5,
      "water": "river"
    },
    "palette": {
      "skyTop": "#0e1435",
      "skyHorizon": "#3a4a7a",
      "fog": "#263258",
      "sun": "#e8eef8",
      "sunElevation": -0.18,
      "terrainLow": "#1a2242",
      "terrainHigh": "#4a5a8a",
      "accent": "#b8d0ff",
      "timeOfDay": "starryNight",
      "stars": 1
    },
    "particles": "stars",
    "creatures": [
      "birds",
      "doves",
      "lionEyes"
    ],
    "threadGlow": 0.4,
    "stories": [
      {
        "title": "YHWH enthrones his anointed Son over the nations",
        "verses": [
          {
            "t": "Yet have I set my king upon my holy hill of Zion. I will declare the decree: the LORD hath said unto me, Thou art my Son; this day have I begotten thee.",
            "ref": "Psalm 2:6–7"
          }
        ],
        "echo": {
          "t": "And we declare unto you glad tidings, how that the promise which was made unto the fathers, God hath fulfilled the same unto us their children, in that he hath raised up Jesus again; as it is also written in the second psalm, Thou art my Son, this day have I begotten thee.",
          "ref": "Acts 13:32–33"
        },
        "prop": "throne",
        "flare": false
      },
      {
        "title": "The righteous sufferer cries from apparent abandonment",
        "verses": [
          {
            "t": "My God, my God, why hast thou forsaken me? why art thou so far from helping me, and from the words of my roaring? O my God, I cry in the day time, but thou hearest not; and in the night season, and am not silent.",
            "ref": "Psalm 22:1–2"
          }
        ],
        "echo": {
          "t": "And when the sixth hour was come, there was darkness over the whole land until the ninth hour. And at the ninth hour Jesus cried with a loud voice, saying, Eloi, Eloi, lama sabachthani? which is, being interpreted, My God, my God, why hast thou forsaken me?",
          "ref": "Mark 15:33–34"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "David sees a priest-king seated at God’s right hand",
        "verses": [
          {
            "t": "The LORD said unto my Lord, Sit thou at my right hand, until I make thine enemies thy footstool. The LORD shall send the rod of thy strength out of Zion: rule thou in the midst of thine enemies.",
            "ref": "Psalm 110:1–2"
          }
        ],
        "echo": {
          "t": "For David himself said by the Holy Ghost, The LORD said to my Lord, Sit thou on my right hand, till I make thine enemies thy footstool. David therefore himself calleth him Lord; and whence is he then his son? And the common people heard him gladly.",
          "ref": "Mark 12:36–37"
        },
        "prop": "throne",
        "flare": false
      }
    ]
  },
  {
    "id": "proverbs",
    "ordinal": 15,
    "en": "Proverbs",
    "he": "מִשְׁלֵי",
    "translit": "Mishlei",
    "section": "Ketuvim",
    "oneLine": "Two roads leave the same gate",
    "setting": "A terraced hill-city in the grey before dawn — lamps burning low in the gates, streets climbing to high open places. Two roads leave the walls: one rising into first light, one sinking into shadow.",
    "terrain": {
      "style": "hills",
      "amplitude": 0.4,
      "water": "none"
    },
    "palette": {
      "skyTop": "#5ea0c2",
      "skyHorizon": "#f2e6b8",
      "fog": "#cfe0d8",
      "sun": "#fff2c8",
      "sunElevation": 0.4,
      "terrainLow": "#6e9a6e",
      "terrainHigh": "#c2d19a",
      "accent": "#ffd884",
      "timeOfDay": "morning",
      "stars": 0
    },
    "particles": "dust",
    "creatures": [
      "birds",
      "fireflies",
      "lionEyes"
    ],
    "threadGlow": 0.35,
    "stories": [
      {
        "title": "Wisdom stands beside God at creation",
        "verses": [
          {
            "t": "The LORD possessed me in the beginning of his way, before his works of old. I was set up from everlasting, from the beginning, or ever the earth was.",
            "ref": "Proverbs 8:22–23"
          }
        ],
        "echo": {
          "t": "Who is the image of the invisible God, the firstborn of every creature: For by him were all things created, that are in heaven, and that are in earth, visible and invisible, whether they be thrones, or dominions, or principalities, or powers: all things were created by him, and for him:",
          "ref": "Colossians 1:15–16"
        },
        "prop": "tree",
        "flare": false
      }
    ]
  },
  {
    "id": "job",
    "ordinal": 16,
    "en": "Job",
    "he": "אִיּוֹב",
    "translit": "Iyov",
    "section": "Ketuvim",
    "oneLine": "Where were you when the stars sang",
    "setting": "A wind-scoured gray plain at the edge of the east, strewn with fallen stones and drifting ash. On the horizon a whirlwind stands and does not move.",
    "terrain": {
      "style": "plain",
      "amplitude": 0.2,
      "water": "none"
    },
    "palette": {
      "skyTop": "#3a4252",
      "skyHorizon": "#8a8a7a",
      "fog": "#5e6266",
      "sun": "#e8dcb0",
      "sunElevation": 0.55,
      "terrainLow": "#4a4a44",
      "terrainHigh": "#8a8878",
      "accent": "#ffe9a0",
      "timeOfDay": "storm",
      "stars": 0
    },
    "particles": "ash",
    "creatures": [
      "ravens",
      "lionEyes",
      "serpent"
    ],
    "threadGlow": 0.25,
    "stories": [
      {
        "title": "Job is tested, protests, and finally encounters God",
        "verses": [
          {
            "t": "Then the LORD answered Job out of the whirlwind, and said, Who is this that darkeneth counsel by words without knowledge?",
            "ref": "Job 38:1–2"
          }
        ],
        "echo": {
          "t": "Take, my brethren, the prophets, who have spoken in the name of the Lord, for an example of suffering affliction, and of patience. Behold, we count them happy which endure. Ye have heard of the patience of Job, and have seen the end of the Lord; that the Lord is very pitiful, and of tender mercy.",
          "ref": "James 5:10–11"
        },
        "prop": "altar",
        "flare": false
      }
    ]
  },
  {
    "id": "song-of-songs",
    "ordinal": 17,
    "en": "Song of Songs",
    "he": "שִׁיר הַשִּׁירִים",
    "translit": "Shir HaShirim",
    "section": "Ketuvim",
    "oneLine": "The land itself falls in love",
    "setting": "Terraced vineyards and spice-hills in full blossom, threaded by streams running down from the cedar ridges of Lebanon. At the valley's heart a walled garden keeps its spring under seal, and the whole air is heavy with myrrh and apple bloom.",
    "terrain": {
      "style": "hills",
      "amplitude": 0.45,
      "water": "river"
    },
    "palette": {
      "skyTop": "#8e5a8a",
      "skyHorizon": "#ffb88a",
      "fog": "#d98f9e",
      "sun": "#ffc98f",
      "sunElevation": 0.1,
      "terrainLow": "#58604e",
      "terrainHigh": "#b08a72",
      "accent": "#ff9eae",
      "timeOfDay": "goldenHour",
      "stars": 0
    },
    "particles": "petals",
    "creatures": [
      "doves",
      "butterflies",
      "fireflies"
    ],
    "threadGlow": 0.5,
    "stories": [
      {
        "title": "The bride and bridegroom delight in covenantal love",
        "verses": [
          {
            "t": "My beloved spake, and said unto me, Rise up, my love, my fair one, and come away. For, lo, the winter is past, the rain is over and gone;",
            "ref": "Song of Songs 2:10–11"
          }
        ],
        "echo": {
          "t": "For this cause shall a man leave his father and mother, and shall be joined unto his wife, and they two shall be one flesh. This is a great mystery: but I speak concerning Christ and the church.",
          "ref": "Ephesians 5:31–32"
        },
        "prop": "vineyard",
        "flare": false
      }
    ]
  },
  {
    "id": "ruth",
    "ordinal": 18,
    "en": "Ruth",
    "he": "רוּת",
    "translit": "Rut",
    "section": "Ketuvim",
    "oneLine": "A stranger gleans in the house of bread",
    "setting": "The land softens into low terraced hills gold with barley at harvest, a small walled town warm on its rise. A single road comes down from the Moab plateau across the valley, thin as a thread, and vanishes into the fields.",
    "terrain": {
      "style": "hills",
      "amplitude": 0.3,
      "water": "none"
    },
    "palette": {
      "skyTop": "#7ab0cf",
      "skyHorizon": "#f2dfae",
      "fog": "#e0cf9e",
      "sun": "#fff0be",
      "sunElevation": 0.3,
      "terrainLow": "#a08a4e",
      "terrainHigh": "#e0c882",
      "accent": "#ffe08f",
      "timeOfDay": "morning",
      "stars": 0
    },
    "particles": "dust",
    "creatures": [
      "doves",
      "butterflies",
      "fireflies"
    ],
    "threadGlow": 0.55,
    "stories": [
      {
        "title": "Ruth’s loyalty and Boaz’s redemption preserve David’s line",
        "verses": [
          {
            "t": "So Boaz took Ruth, and she was his wife: and when he went in unto her, the LORD gave her conception, and she bare a son. And the women said unto Naomi, Blessed be the LORD, which hath not left thee this day without a kinsman, that his name may be famous in Israel.",
            "ref": "Ruth 4:13–14"
          }
        ],
        "echo": {
          "t": "And Salmon begat Booz of Rachab; and Booz begat Obed of Ruth; and Obed begat Jesse; And Jesse begat David the king; and David the king begat Solomon of her that had been the wife of Urias;",
          "ref": "Matthew 1:5–6"
        },
        "prop": "city",
        "flare": true
      }
    ]
  },
  {
    "id": "lamentations",
    "ordinal": 19,
    "en": "Lamentations",
    "he": "אֵיכָה",
    "translit": "Eichah",
    "section": "Ketuvim",
    "oneLine": "How lonely sits the city",
    "setting": "Jerusalem in ruin under a starless dusk — breached walls, blackened stones, streets silted with ash where pilgrim roads once climbed singing. Nothing moves but smoke, and far to the east, one thin band of gray light.",
    "terrain": {
      "style": "hills",
      "amplitude": 0.5,
      "water": "none"
    },
    "palette": {
      "skyTop": "#17141a",
      "skyHorizon": "#3a2a26",
      "fog": "#2e2624",
      "sun": "#6e3a2e",
      "sunElevation": -0.1,
      "terrainLow": "#1a1614",
      "terrainHigh": "#40342e",
      "accent": "#d1512e",
      "timeOfDay": "night",
      "stars": 0.05
    },
    "particles": "ash",
    "creatures": [
      "ravens",
      "lionEyes"
    ],
    "threadGlow": 0.07,
    "stories": [
      {
        "title": "Jerusalem mourns after its destruction",
        "verses": [
          {
            "t": "How doth the city sit solitary, that was full of people! how is she become as a widow! she that was great among the nations, and princess among the provinces, how is she become tributary! She weepeth sore in the night, and her tears are on her cheeks: among all her lovers she hath none to comfort her: all her friends have dealt treacherously with her, they are become her enemies.",
            "ref": "Lamentations 1:1–2"
          }
        ],
        "echo": {
          "t": "And when he was come near, he beheld the city, and wept over it, Saying, If thou hadst known, even thou, at least in this thy day, the things which belong unto thy peace! but now they are hid from thine eyes.",
          "ref": "Luke 19:41–42"
        },
        "prop": "city",
        "flare": false
      }
    ]
  },
  {
    "id": "ecclesiastes",
    "ordinal": 20,
    "en": "Ecclesiastes",
    "he": "קֹהֶלֶת",
    "translit": "Kohelet",
    "section": "Ketuvim",
    "oneLine": "A breath, and the wind turns round",
    "setting": "A gray-gold plain of drifting mist where a king's terraced vineyards and planted gardens fade in and out of the haze. Slow rivers wind toward a far sea that never fills, and the sun wheels low, rising and setting almost in one breath.",
    "terrain": {
      "style": "riverlands",
      "amplitude": 0.2,
      "water": "river"
    },
    "palette": {
      "skyTop": "#4a5266",
      "skyHorizon": "#a8988e",
      "fog": "#7e7a7a",
      "sun": "#d8c49a",
      "sunElevation": 0.05,
      "terrainLow": "#55524e",
      "terrainHigh": "#948a7e",
      "accent": "#ccd4d8",
      "timeOfDay": "dusk",
      "stars": 0.2
    },
    "particles": "dust",
    "creatures": [
      "birds",
      "butterflies"
    ],
    "threadGlow": 0.2,
    "stories": [
      {
        "title": "Qohelet tests life under the sun and finds it vapor",
        "verses": [
          {
            "t": "And I gave my heart to seek and search out by wisdom concerning all things that are done under heaven: this sore travail hath God given to the sons of man to be exercised therewith. I have seen all the works that are done under the sun; and, behold, all is vanity and vexation of spirit.",
            "ref": "Ecclesiastes 1:13–14"
          }
        ],
        "echo": {
          "t": "For the creature was made subject to vanity, not willingly, but by reason of him who hath subjected the same in hope, Because the creature itself also shall be delivered from the bondage of corruption into the glorious liberty of the children of God.",
          "ref": "Romans 8:20–21"
        },
        "prop": "vineyard",
        "flare": false
      }
    ]
  },
  {
    "id": "esther",
    "ordinal": 21,
    "en": "Esther",
    "he": "אֶסְתֵּר",
    "translit": "Esther",
    "section": "Ketuvim",
    "oneLine": "The hidden name turns every lot",
    "setting": "A broad Persian plain under a low golden haze, where the walled citadel of Susa rises beside a slow river — lamplit gates, glazed lion friezes, gardens glowing like a feast that never ends.",
    "terrain": {
      "style": "plain",
      "amplitude": 0.2,
      "water": "river"
    },
    "palette": {
      "skyTop": "#1e1a3e",
      "skyHorizon": "#5e3a6e",
      "fog": "#3a2e58",
      "sun": "#e8d8f0",
      "sunElevation": -0.12,
      "terrainLow": "#2a2248",
      "terrainHigh": "#5e4a7e",
      "accent": "#ffbe6b",
      "timeOfDay": "night",
      "stars": 0.6
    },
    "particles": "stars",
    "creatures": [
      "lionEyes"
    ],
    "threadGlow": 0.3,
    "stories": [
      {
        "title": "Esther risks her life and the threatened Jews are delivered",
        "verses": [
          {
            "t": "Then Esther bade them return Mordecai this answer, Go, gather together all the Jews that are present in Shushan, and fast ye for me, and neither eat nor drink three days, night or day: I also and my maidens will fast likewise; and so will I go in unto the king, which is not according to the law: and if I perish, I perish.",
            "ref": "Esther 4:15–16"
          }
        ],
        "echo": {
          "t": "And I heard a loud voice saying in heaven, Now is come salvation, and strength, and the kingdom of our God, and the power of his Christ: for the accuser of our brethren is cast down, which accused them before our God day and night.",
          "ref": "Revelation 12:10–11"
        },
        "prop": "throne",
        "flare": false
      }
    ]
  },
  {
    "id": "daniel",
    "ordinal": 22,
    "en": "Daniel",
    "he": "דָּנִיֵּאל",
    "translit": "Daniel",
    "section": "Ketuvim",
    "oneLine": "Night falls on Babylon; visions rise",
    "setting": "A vast night plain under strange stars: Babylon's glazed blue walls and its ziggurat burn with banquet light, and the river runs quiet past the city. Dream and waking blur here — the air itself seems to be seeing something.",
    "terrain": {
      "style": "plain",
      "amplitude": 0.2,
      "water": "river"
    },
    "palette": {
      "skyTop": "#0c1230",
      "skyHorizon": "#33456e",
      "fog": "#223052",
      "sun": "#dfe8ff",
      "sunElevation": -0.15,
      "terrainLow": "#16204a",
      "terrainHigh": "#46639a",
      "accent": "#c9b8ff",
      "timeOfDay": "starryNight",
      "stars": 0.95
    },
    "particles": "stars",
    "creatures": [
      "lionEyes"
    ],
    "threadGlow": 0.5,
    "stories": [
      {
        "title": "The stone kingdom shatters the empires",
        "verses": [
          {
            "t": "And in the days of these kings shall the God of heaven set up a kingdom, which shall never be destroyed: and the kingdom shall not be left to other people, but it shall break in pieces and consume all these kingdoms, and it shall stand for ever.",
            "ref": "Daniel 2:44–45"
          }
        ],
        "echo": {
          "t": "And he beheld them, and said, What is this then that is written, The stone which the builders rejected, the same is become the head of the corner? Whosoever shall fall upon that stone shall be broken; but on whomsoever it shall fall, it will grind him to powder.",
          "ref": "Luke 20:17–18"
        },
        "prop": "shatter",
        "flare": false
      },
      {
        "title": "Daniel survives the lions’ den",
        "verses": [
          {
            "t": "My God hath sent his angel, and hath shut the lions’ mouths, that they have not hurt me: forasmuch as before him innocency was found in me; and also before thee, O king, have I done no hurt. Then was the king exceeding glad for him, and commanded that they should take Daniel up out of the den.",
            "ref": "Daniel 6:22–23"
          }
        ],
        "echo": {
          "t": "Who through faith subdued kingdoms, wrought righteousness, obtained promises, stopped the mouths of lions, Quenched the violence of fire, escaped the edge of the sword, out of weakness were made strong, waxed valiant in fight, turned to flight the armies of the aliens.",
          "ref": "Hebrews 11:33–34"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "One like a son of man receives everlasting dominion",
        "verses": [
          {
            "t": "I saw in the night visions, and, behold, one like the Son of man came with the clouds of heaven, and came to the Ancient of days, and they brought him near before him. And there was given him dominion, and glory, and a kingdom, that all people, nations, and languages, should serve him: his dominion is an everlasting dominion, which shall not pass away, and his kingdom that which shall not be destroyed.",
            "ref": "Daniel 7:13–14"
          }
        ],
        "echo": {
          "t": "But he held his peace, and answered nothing. Again the high priest asked him, and said unto him, Art thou the Christ, the Son of the Blessed? And Jesus said, I am: and ye shall see the Son of man sitting on the right hand of power, and coming in the clouds of heaven.",
          "ref": "Mark 14:61–62"
        },
        "prop": "throne",
        "flare": true
      },
      {
        "title": "Daniel foresees resurrection and final judgment",
        "verses": [
          {
            "t": "And at that time shall Michael stand up, the great prince which standeth for the children of thy people: and there shall be a time of trouble, such as never was since there was a nation even to that same time: and at that time thy people shall be delivered, every one that shall be found written in the book.",
            "ref": "Daniel 12:1–2"
          }
        ],
        "echo": {
          "t": "Marvel not at this: for the hour is coming, in the which all that are in the graves shall hear his voice, And shall come forth; they that have done good, unto the resurrection of life; and they that have done evil, unto the resurrection of damnation.",
          "ref": "John 5:28–29"
        },
        "prop": null,
        "flare": false
      }
    ]
  },
  {
    "id": "ezra-nehemiah",
    "ordinal": 23,
    "en": "Ezra-Nehemiah",
    "he": "עֶזְרָא־נְחֶמְיָה",
    "translit": "Ezra-Nechemiah",
    "section": "Ketuvim",
    "oneLine": "Stone by stone, the exiles come home",
    "setting": "Grey-gold hills strewn with fallen stone, where a burned city is slowly standing back up. Scaffolds catch the dawn, and new mortar gleams wet between blackened blocks.",
    "terrain": {
      "style": "hills",
      "amplitude": 0.45,
      "water": "none"
    },
    "palette": {
      "skyTop": "#2a2e56",
      "skyHorizon": "#b57a62",
      "fog": "#5e5268",
      "sun": "#ffc890",
      "sunElevation": -0.02,
      "terrainLow": "#4a3e46",
      "terrainHigh": "#9a7262",
      "accent": "#ffb45e",
      "timeOfDay": "predawn",
      "stars": 0.3
    },
    "particles": "dust",
    "creatures": [
      "doves",
      "birds"
    ],
    "threadGlow": 0.6,
    "stories": [
      {
        "title": "The exiles return and rebuild the temple",
        "verses": [
          {
            "t": "And the elders of the Jews builded, and they prospered through the prophesying of Haggai the prophet and Zechariah the son of Iddo. And they builded, and finished it, according to the commandment of the God of Israel, and according to the commandment of Cyrus, and Darius, and Artaxerxes king of Persia.",
            "ref": "Ezra 6:14–15"
          }
        ],
        "echo": {
          "t": "Jesus answered and said unto them, Destroy this temple, and in three days I will raise it up. Then said the Jews, Forty and six years was this temple in building, and wilt thou rear it up in three days?",
          "ref": "John 2:19–20"
        },
        "prop": "temple",
        "flare": false
      },
      {
        "title": "Ezra reads the Torah to the restored community",
        "verses": [
          {
            "t": "And Ezra opened the book in the sight of all the people; (for he was above all the people;) and when he opened it, all the people stood up: And Ezra blessed the LORD, the great God. And all the people answered, Amen, Amen, with lifting up their hands: and they bowed their heads, and worshipped the LORD with their faces to the ground.",
            "ref": "Nehemiah 8:5–6"
          }
        ],
        "echo": {
          "t": "And he came to Nazareth, where he had been brought up: and, as his custom was, he went into the synagogue on the sabbath day, and stood up for to read. And there was delivered unto him the book of the prophet Esaias.",
          "ref": "Luke 4:16–17"
        },
        "prop": "wordsrising",
        "flare": false
      }
    ]
  },
  {
    "id": "chronicles",
    "ordinal": 24,
    "en": "Chronicles",
    "he": "דִּבְרֵי הַיָּמִים",
    "translit": "Divrei HaYamim",
    "section": "Ketuvim",
    "oneLine": "All the names, and an open door",
    "setting": "Terraced golden hills at the end of the world, where every stone bears a carved name and a single road climbs toward a shining, half-ruined city. The light is late and honeyed, as if the whole journey were being remembered at once.",
    "terrain": {
      "style": "hills",
      "amplitude": 0.55,
      "water": "none"
    },
    "palette": {
      "skyTop": "#4a6ea8",
      "skyHorizon": "#ffd9a0",
      "fog": "#d8b8a0",
      "sun": "#fff0c8",
      "sunElevation": 0.08,
      "terrainLow": "#7a6a6e",
      "terrainHigh": "#d8ae8a",
      "accent": "#ffe6a8",
      "timeOfDay": "dawn",
      "stars": 0.1
    },
    "particles": "dust",
    "creatures": [
      "doves",
      "lionEyes"
    ],
    "threadGlow": 0.95,
    "stories": [
      {
        "title": "The Hebrew Bible ends with Cyrus authorizing return and rebuilding",
        "verses": [
          {
            "t": "Now in the first year of Cyrus king of Persia, that the word of the LORD spoken by the mouth of Jeremiah might be accomplished, the LORD stirred up the spirit of Cyrus king of Persia, that he made a proclamation throughout all his kingdom, and put it also in writing, saying, Thus saith Cyrus king of Persia, All the kingdoms of the earth hath the LORD God of heaven given me; and he hath charged me to build him an house in Jerusalem, which is in Judah. Who is there among you of all his people? The LORD his God be with him, and let him go up.",
            "ref": "2 Chronicles 36:22–23"
          }
        ],
        "echo": {
          "t": "The Spirit of the Lord is upon me, because he hath anointed me to preach the gospel to the poor; he hath sent me to heal the brokenhearted, to preach deliverance to the captives, and recovering of sight to the blind, to set at liberty them that are bruised, To preach the acceptable year of the Lord.",
          "ref": "Luke 4:18–19"
        },
        "prop": "city",
        "flare": true
      }
    ]
  }
];
