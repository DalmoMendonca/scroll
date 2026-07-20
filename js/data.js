// Generated journey data — the 24 books of the Tanakh as regions of one world.
// Structural/visual fields scripted by the tanakh-journey-script workflow.
// Story text is King James Version scripture (public domain), curated per beat.

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
    "props": [
      {
        "type": "gardenTree",
        "note": "Twin-crowned at the garden's center; gold light pools beneath it"
      },
      {
        "type": "ark",
        "note": "Aground on a far ridge, hull dark with old rain"
      },
      {
        "type": "rainbow",
        "note": "Faint and wide over the flood-plain, half-remembered"
      },
      {
        "type": "altar",
        "note": "Rough stones on the highest bare summit, wood laid in order"
      },
      {
        "type": "ladder",
        "note": "Rising from a sleeping-stone into cloud, rungs faintly lit"
      }
    ],
    "threadGlow": 0.15,
    "stories": [
      {
        "title": "Let There Be Light",
        "verses": [
          {
            "t": "And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.",
            "ref": "Genesis 1:2"
          },
          {
            "t": "And God said, Let there be light: and there was light.",
            "ref": "Genesis 1:3"
          }
        ],
        "echo": null,
        "prop": null,
        "flare": false
      },
      {
        "title": "The Garden",
        "verses": [
          {
            "t": "And out of the ground made the LORD God to grow every tree that is pleasant to the sight, and good for food; the tree of life also in the midst of the garden, and the tree of knowledge of good and evil.",
            "ref": "Genesis 2:9"
          }
        ],
        "echo": {
          "t": "And I will put enmity between thee and the woman, and between thy seed and her seed; it shall bruise thy head, and thou shalt bruise his heel.",
          "ref": "Genesis 3:15"
        },
        "prop": "gardenTree",
        "flare": false
      },
      {
        "title": "The Flood",
        "verses": [
          {
            "t": "And the flood was forty days upon the earth; and the waters increased, and bare up the ark, and it was lift up above the earth.",
            "ref": "Genesis 7:17"
          },
          {
            "t": "And the dove came in to him in the evening; and, lo, in her mouth was an olive leaf pluckt off: so Noah knew that the waters were abated from off the earth.",
            "ref": "Genesis 8:11"
          }
        ],
        "echo": null,
        "prop": "ark",
        "flare": false
      },
      {
        "title": "The Ram in the Thicket",
        "verses": [
          {
            "t": "And Abraham lifted up his eyes, and looked, and behold behind him a ram caught in a thicket by his horns: and Abraham went and took the ram, and offered him up for a burnt offering in the stead of his son.",
            "ref": "Genesis 22:13"
          }
        ],
        "echo": {
          "t": "And Abraham said, My son, God will provide himself a lamb for a burnt offering: so they went both of them together.",
          "ref": "Genesis 22:8"
        },
        "prop": "altar",
        "flare": true
      },
      {
        "title": "The Ladder",
        "verses": [
          {
            "t": "And he dreamed, and behold a ladder set up on the earth, and the top of it reached to heaven: and behold the angels of God ascending and descending on it.",
            "ref": "Genesis 28:12"
          }
        ],
        "echo": {
          "t": "And he was afraid, and said, How dreadful is this place! this is none other but the house of God, and this is the gate of heaven.",
          "ref": "Genesis 28:17"
        },
        "prop": "ladder",
        "flare": false
      },
      {
        "title": "The Brother Sold",
        "verses": [
          {
            "t": "Then there passed by Midianites merchantmen; and they drew and lifted up Joseph out of the pit, and sold Joseph to the Ishmeelites for twenty pieces of silver: and they brought Joseph into Egypt.",
            "ref": "Genesis 37:28"
          }
        ],
        "echo": {
          "t": "But as for you, ye thought evil against me; but God meant it unto good, to bring to pass, as it is this day, to save much people alive.",
          "ref": "Genesis 50:20"
        },
        "prop": null,
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
    "props": [
      {
        "type": "burningBush",
        "note": "on a rocky rise near the region's entrance — aflame yet green, the fire never spreading"
      },
      {
        "type": "pillarOfCloud",
        "note": "drifting slowly ahead of the traveler across the open desert, unhurried"
      },
      {
        "type": "pillarOfFire",
        "note": "standing over the sea-road, holding the dark back on either side"
      },
      {
        "type": "tablets",
        "note": "high on the smoking summit, two stone slabs lit by flickers inside the cloud"
      },
      {
        "type": "tent",
        "note": "alone on the plain below the mountain, glowing from within, cloud resting on its roof"
      }
    ],
    "threadGlow": 0.7,
    "stories": [
      {
        "title": "Night of the Lamb",
        "verses": [
          {
            "t": "And they shall take of the blood, and strike it on the two side posts and on the upper door post of the houses, wherein they shall eat it.",
            "ref": "Exodus 12:7"
          }
        ],
        "echo": {
          "t": "And the blood shall be to you for a token upon the houses where ye are: and when I see the blood, I will pass over you, and the plague shall not be upon you to destroy you, when I smite the land of Egypt.",
          "ref": "Exodus 12:13"
        },
        "prop": null,
        "flare": true
      },
      {
        "title": "The Sea Stands Open",
        "verses": [
          {
            "t": "And Moses stretched out his hand over the sea; and the LORD caused the sea to go back by a strong east wind all that night, and made the sea dry land, and the waters were divided.",
            "ref": "Exodus 14:21"
          },
          {
            "t": "And the children of Israel went into the midst of the sea upon the dry ground: and the waters were a wall unto them on their right hand, and on their left.",
            "ref": "Exodus 14:22"
          }
        ],
        "echo": null,
        "prop": "pillarOfFire",
        "flare": false
      },
      {
        "title": "Bread with the Dew",
        "verses": [
          {
            "t": "And when the dew that lay was gone up, behold, upon the face of the wilderness there lay a small round thing, as small as the hoar frost on the ground.",
            "ref": "Exodus 16:14"
          },
          {
            "t": "And when the children of Israel saw it, they said one to another, It is manna: for they wist not what it was. And Moses said unto them, This is the bread which the LORD hath given you to eat.",
            "ref": "Exodus 16:15"
          }
        ],
        "echo": {
          "t": "Then said the LORD unto Moses, Behold, I will rain bread from heaven for you; and the people shall go out and gather a certain rate every day, that I may prove them, whether they will walk in my law, or no.",
          "ref": "Exodus 16:4"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "The Mountain in Smoke",
        "verses": [
          {
            "t": "And mount Sinai was altogether on a smoke, because the LORD descended upon it in fire: and the smoke thereof ascended as the smoke of a furnace, and the whole mount quaked greatly.",
            "ref": "Exodus 19:18"
          }
        ],
        "echo": null,
        "prop": "tablets",
        "flare": false
      },
      {
        "title": "Glory Fills the Tent",
        "verses": [
          {
            "t": "Then a cloud covered the tent of the congregation, and the glory of the LORD filled the tabernacle.",
            "ref": "Exodus 40:34"
          }
        ],
        "echo": {
          "t": "And let them make me a sanctuary; that I may dwell among them.",
          "ref": "Exodus 25:8"
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
    "props": [
      {
        "type": "tent",
        "note": "the Tent of Meeting at dead center, glowing faintly from within"
      },
      {
        "type": "altar",
        "note": "bronze altar before the tent, coals always lit, smoke rising straight"
      },
      {
        "type": "menorah",
        "note": "seven small flames just visible through the tent's opening at dusk"
      },
      {
        "type": "pillarOfCloud",
        "note": "resting low over the tent, unmoving, soft-edged"
      }
    ],
    "threadGlow": 0.65,
    "stories": [
      {
        "title": "A Voice From the Tent",
        "verses": [
          {
            "t": "Speak unto the children of Israel, and say unto them, If any man of you bring an offering unto the LORD, ye shall bring your offering of the cattle, even of the herd, and of the flock.",
            "ref": "Leviticus 1:2"
          }
        ],
        "echo": {
          "t": "If his offering be a burnt sacrifice of the herd, let him offer a male without blemish: he shall offer it of his own voluntary will at the door of the tabernacle of the congregation before the LORD.",
          "ref": "Leviticus 1:3"
        },
        "prop": "tent",
        "flare": false
      },
      {
        "title": "Fire From the Presence",
        "verses": [
          {
            "t": "And there came a fire out from before the LORD, and consumed upon the altar the burnt offering and the fat: which when all the people saw, they shouted, and fell on their faces.",
            "ref": "Leviticus 9:24"
          }
        ],
        "echo": null,
        "prop": "altar",
        "flare": false
      },
      {
        "title": "The Goat That Leaves",
        "verses": [
          {
            "t": "And Aaron shall lay both his hands upon the head of the live goat, and confess over him all the iniquities of the children of Israel, and all their transgressions in all their sins, putting them upon the head of the goat, and shall send him away by the hand of a fit man into the wilderness:",
            "ref": "Leviticus 16:21"
          }
        ],
        "echo": {
          "t": "And the goat shall bear upon him all their iniquities unto a land not inhabited: and he shall let go the goat in the wilderness.",
          "ref": "Leviticus 16:22"
        },
        "prop": null,
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
    "props": [
      {
        "type": "tent",
        "note": "at the exact center of a vast ring of campsites, small and glowing"
      },
      {
        "type": "pillarOfCloud",
        "note": "drifting ahead on the horizon, always a little farther on"
      },
      {
        "type": "vineyard",
        "note": "a sudden green cleft in the waste, grapes impossibly heavy"
      },
      {
        "type": "serpentPole",
        "note": "on a low rise above the route, bronze catching the late sun"
      },
      {
        "type": "altar",
        "note": "seven, smoldering on a clifftop that overlooks the whole camp"
      }
    ],
    "threadGlow": 0.85,
    "stories": [
      {
        "title": "The Camp in Order",
        "verses": [
          {
            "t": "Then the tabernacle of the congregation shall set forward with the camp of the Levites in the midst of the camp: as they encamp, so shall they set forward, every man in his place by their standards.",
            "ref": "Numbers 2:17"
          }
        ],
        "echo": null,
        "prop": "tent",
        "flare": false
      },
      {
        "title": "Grapes of Eshcol",
        "verses": [
          {
            "t": "And they came unto the brook of Eshcol, and cut down from thence a branch with one cluster of grapes, and they bare it between two upon a staff; and they brought of the pomegranates, and of the figs.",
            "ref": "Numbers 13:23"
          }
        ],
        "echo": null,
        "prop": "vineyard",
        "flare": false
      },
      {
        "title": "The Bronze Serpent",
        "verses": [
          {
            "t": "And Moses made a serpent of brass, and put it upon a pole, and it came to pass, that if a serpent had bitten any man, when he beheld the serpent of brass, he lived.",
            "ref": "Numbers 21:9"
          }
        ],
        "echo": {
          "t": "And the LORD said unto Moses, Make thee a fiery serpent, and set it upon a pole: and it shall come to pass, that every one that is bitten, when he looketh upon it, shall live.",
          "ref": "Numbers 21:8"
        },
        "prop": "serpentPole",
        "flare": false
      },
      {
        "title": "The Star of Jacob",
        "verses": [
          {
            "t": "I shall see him, but not now: I shall behold him, but not nigh: there shall come a Star out of Jacob, and a Sceptre shall rise out of Israel, and shall smite the corners of Moab, and destroy all the children of Sheth.",
            "ref": "Numbers 24:17"
          }
        ],
        "echo": null,
        "prop": "altar",
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
    "props": [
      {
        "type": "tent",
        "note": "a hushed camp spread across the plain; farewell light on the canvas"
      },
      {
        "type": "tablets",
        "note": "the law spoken again, catching the last sun"
      },
      {
        "type": "stones",
        "note": "great plastered stones inscribed edge to edge"
      },
      {
        "type": "altar",
        "note": "uncut fieldstones on a facing slope"
      },
      {
        "type": "palms",
        "note": "far across the river, a haze of palms — the city not yet reached"
      }
    ],
    "threadGlow": 0.6,
    "stories": [
      {
        "title": "The Words on the Plain",
        "verses": [
          {
            "t": "Hear, O Israel: The LORD our God is one LORD:",
            "ref": "Deuteronomy 6:4"
          },
          {
            "t": "And thou shalt love the LORD thy God with all thine heart, and with all thy soul, and with all thy might.",
            "ref": "Deuteronomy 6:5"
          }
        ],
        "echo": {
          "t": "The LORD thy God will raise up unto thee a Prophet from the midst of thee, of thy brethren, like unto me; unto him ye shall hearken;",
          "ref": "Deuteronomy 18:15"
        },
        "prop": "tent",
        "flare": false
      },
      {
        "title": "Blessing and Curse",
        "verses": [
          {
            "t": "I call heaven and earth to record this day against you, that I have set before you life and death, blessing and cursing: therefore choose life, that both thou and thy seed may live:",
            "ref": "Deuteronomy 30:19"
          }
        ],
        "echo": {
          "t": "His body shall not remain all night upon the tree, but thou shalt in any wise bury him that day; (for he that is hanged is accursed of God;) that thy land be not defiled, which the LORD thy God giveth thee for an inheritance.",
          "ref": "Deuteronomy 21:23"
        },
        "prop": "stones",
        "flare": false
      },
      {
        "title": "Mount Nebo",
        "verses": [
          {
            "t": "And Moses went up from the plains of Moab unto the mountain of Nebo, to the top of Pisgah, that is over against Jericho. And the LORD shewed him all the land of Gilead, unto Dan,",
            "ref": "Deuteronomy 34:1"
          },
          {
            "t": "So Moses the servant of the LORD died there in the land of Moab, according to the word of the LORD.",
            "ref": "Deuteronomy 34:5"
          }
        ],
        "echo": {
          "t": "And there arose not a prophet since in Israel like unto Moses, whom the LORD knew face to face,",
          "ref": "Deuteronomy 34:10"
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
    "props": [
      {
        "type": "ark",
        "note": "gold-gleaming at the river's edge, first down into the dry bed"
      },
      {
        "type": "stones",
        "note": "twelve river stones stacked at Gilgal, still dark as if wet"
      },
      {
        "type": "wall",
        "note": "Jericho's ring, collapsed outward into its own rubble"
      },
      {
        "type": "palms",
        "note": "clustered green around the fallen city, the city of palms"
      },
      {
        "type": "altar",
        "note": "uncut stones on a far hill, quiet, half in cloud-shadow"
      }
    ],
    "threadGlow": 0.5,
    "stories": [
      {
        "title": "Crossing on Dry Ground",
        "verses": [
          {
            "t": "And the priests that bare the ark of the covenant of the LORD stood firm on dry ground in the midst of Jordan, and all the Israelites passed over on dry ground, until all the people were passed clean over Jordan.",
            "ref": "Joshua 3:17"
          }
        ],
        "echo": null,
        "prop": "ark",
        "flare": false
      },
      {
        "title": "The Seventh Day",
        "verses": [
          {
            "t": "So the people shouted when the priests blew with the trumpets: and it came to pass, when the people heard the sound of the trumpet, and the people shouted with a great shout, that the wall fell down flat, so that the people went up into the city, every man straight before him, and they took the city.",
            "ref": "Joshua 6:20"
          }
        ],
        "echo": {
          "t": "And she said, According unto your words, so be it. And she sent them away, and they departed: and she bound the scarlet line in the window.",
          "ref": "Joshua 2:21"
        },
        "prop": "wall",
        "flare": true
      },
      {
        "title": "Sun Over Gibeon",
        "verses": [
          {
            "t": "And the sun stood still, and the moon stayed, until the people had avenged themselves upon their enemies. Is not this written in the book of Jasher? So the sun stood still in the midst of heaven, and hasted not to go down about a whole day.",
            "ref": "Joshua 10:13"
          }
        ],
        "echo": null,
        "prop": null,
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
    "props": [
      {
        "type": "palms",
        "note": "Deborah's palm alone on a high ridge, first light catching it"
      },
      {
        "type": "tent",
        "note": "Jael's tent lamplit and quiet on the plain below"
      },
      {
        "type": "altar",
        "note": "Gideon's night altar on the threshing hill, embers still warm"
      },
      {
        "type": "vineyard",
        "note": "the vineyards of Timnah, low and humming in the heat"
      },
      {
        "type": "temple",
        "note": "Dagon's feast-hall at the far edge, its two pillars leaning"
      }
    ],
    "threadGlow": 0.4,
    "stories": [
      {
        "title": "The Palm of Deborah",
        "verses": [
          {
            "t": "And she dwelt under the palm tree of Deborah between Ramah and Bethel in mount Ephraim: and the children of Israel came up to her for judgment.",
            "ref": "Judges 4:5"
          },
          {
            "t": "Blessed above women shall Jael the wife of Heber the Kenite be, blessed shall she be above women in the tent.",
            "ref": "Judges 5:24"
          }
        ],
        "echo": {
          "t": "She put her hand to the nail, and her right hand to the workmen’s hammer; and with the hammer she smote Sisera, she smote off his head, when she had pierced and stricken through his temples.",
          "ref": "Judges 5:26"
        },
        "prop": "palms",
        "flare": false
      },
      {
        "title": "Torches in the Jars",
        "verses": [
          {
            "t": "And the three companies blew the trumpets, and brake the pitchers, and held the lamps in their left hands, and the trumpets in their right hands to blow withal: and they cried, The sword of the LORD, and of Gideon.",
            "ref": "Judges 7:20"
          }
        ],
        "echo": null,
        "prop": "altar",
        "flare": false
      },
      {
        "title": "Honey from the Lion",
        "verses": [
          {
            "t": "And after a time he returned to take her, and he turned aside to see the carcase of the lion: and, behold, there was a swarm of bees and honey in the carcase of the lion.",
            "ref": "Judges 14:8"
          }
        ],
        "echo": {
          "t": "And he said unto them, Out of the eater came forth meat, and out of the strong came forth sweetness. And they could not in three days expound the riddle.",
          "ref": "Judges 14:14"
        },
        "prop": "vineyard",
        "flare": false
      },
      {
        "title": "Between the Pillars",
        "verses": [
          {
            "t": "And Samson said, Let me die with the Philistines. And he bowed himself with all his might; and the house fell upon the lords, and upon all the people that were therein. So the dead which he slew at his death were more than they which he slew in his life.",
            "ref": "Judges 16:30"
          }
        ],
        "echo": null,
        "prop": "temple",
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
    "props": [
      {
        "type": "tent",
        "note": "at Shiloh, its lamp burning low before dawn"
      },
      {
        "type": "well",
        "note": "by Bethlehem's gate, among the sheepfolds"
      },
      {
        "type": "stones",
        "note": "five, smooth, beside the brook of the valley"
      },
      {
        "type": "city",
        "note": "Jerusalem on its ridge, newly lamplit"
      },
      {
        "type": "throne",
        "note": "alone under the night sky, lit as if by promise"
      }
    ],
    "threadGlow": 0.45,
    "stories": [
      {
        "title": "A Voice at Shiloh",
        "verses": [
          {
            "t": "And the LORD came, and stood, and called as at other times, Samuel, Samuel. Then Samuel answered, Speak; for thy servant heareth.",
            "ref": "1 Samuel 3:10"
          }
        ],
        "echo": null,
        "prop": "tent",
        "flare": false
      },
      {
        "title": "Oil in Bethlehem",
        "verses": [
          {
            "t": "And he sent, and brought him in. Now he was ruddy, and withal of a beautiful countenance, and goodly to look to. And the LORD said, Arise, anoint him: for this is he.",
            "ref": "1 Samuel 16:12"
          },
          {
            "t": "Then Samuel took the horn of oil, and anointed him in the midst of his brethren: and the Spirit of the LORD came upon David from that day forward. So Samuel rose up, and went to Ramah.",
            "ref": "1 Samuel 16:13"
          }
        ],
        "echo": null,
        "prop": "well",
        "flare": false
      },
      {
        "title": "Five Smooth Stones",
        "verses": [
          {
            "t": "And he took his staff in his hand, and chose him five smooth stones out of the brook, and put them in a shepherd’s bag which he had, even in a scrip; and his sling was in his hand: and he drew near to the Philistine.",
            "ref": "1 Samuel 17:40"
          }
        ],
        "echo": {
          "t": "And all this assembly shall know that the LORD saveth not with sword and spear: for the battle is the LORD’s, and he will give you into our hands.",
          "ref": "1 Samuel 17:47"
        },
        "prop": "stones",
        "flare": false
      },
      {
        "title": "A House Forever",
        "verses": [
          {
            "t": "And when thy days be fulfilled, and thou shalt sleep with thy fathers, I will set up thy seed after thee, which shall proceed out of thy bowels, and I will establish his kingdom.",
            "ref": "2 Samuel 7:12"
          }
        ],
        "echo": {
          "t": "And thine house and thy kingdom shall be established for ever before thee: thy throne shall be established for ever.",
          "ref": "2 Samuel 7:16"
        },
        "prop": "throne",
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
    "props": [
      {
        "type": "cedars",
        "note": "fresh-cut Lebanon rows flanking the climb to the height"
      },
      {
        "type": "temple",
        "note": "gold-leafed on the highest terrace, cloud pooling at its doors"
      },
      {
        "type": "throne",
        "note": "ivory and gold on the step below, a lion at every stair"
      },
      {
        "type": "altar",
        "note": "twelve soaked stones on a sea-facing ridge, trench dark with water"
      },
      {
        "type": "city",
        "note": "far downslope at journey's end, flame along the walls"
      }
    ],
    "threadGlow": 0.5,
    "stories": [
      {
        "title": "Gold on the Height",
        "verses": [
          {
            "t": "So Solomon overlaid the house within with pure gold: and he made a partition by the chains of gold before the oracle; and he overlaid it with gold.",
            "ref": "1 Kings 6:21"
          },
          {
            "t": "So that the priests could not stand to minister because of the cloud: for the glory of the LORD had filled the house of the LORD.",
            "ref": "1 Kings 8:11"
          }
        ],
        "echo": {
          "t": "But will God indeed dwell on the earth? behold, the heaven and heaven of heavens cannot contain thee; how much less this house that I have builded?",
          "ref": "1 Kings 8:27"
        },
        "prop": "temple",
        "flare": false
      },
      {
        "title": "Ravens at the Brook",
        "verses": [
          {
            "t": "And the ravens brought him bread and flesh in the morning, and bread and flesh in the evening; and he drank of the brook.",
            "ref": "1 Kings 17:6"
          }
        ],
        "echo": null,
        "prop": null,
        "flare": false
      },
      {
        "title": "Fire on Carmel",
        "verses": [
          {
            "t": "Then the fire of the LORD fell, and consumed the burnt sacrifice, and the wood, and the stones, and the dust, and licked up the water that was in the trench.",
            "ref": "1 Kings 18:38"
          },
          {
            "t": "And when all the people saw it, they fell on their faces: and they said, The LORD, he is the God; the LORD, he is the God.",
            "ref": "1 Kings 18:39"
          }
        ],
        "echo": null,
        "prop": "altar",
        "flare": false
      },
      {
        "title": "A Whirlwind of Fire",
        "verses": [
          {
            "t": "And it came to pass, as they still went on, and talked, that, behold, there appeared a chariot of fire, and horses of fire, and parted them both asunder; and Elijah went up by a whirlwind into heaven.",
            "ref": "2 Kings 2:11"
          }
        ],
        "echo": null,
        "prop": null,
        "flare": false
      },
      {
        "title": "The Long Road East",
        "verses": [
          {
            "t": "And he burnt the house of the LORD, and the king’s house, and all the houses of Jerusalem, and every great man’s house burnt he with fire.",
            "ref": "2 Kings 25:9"
          }
        ],
        "echo": {
          "t": "Yet the LORD would not destroy Judah for David his servant’s sake, as he promised him to give him alway a light, and to his children.",
          "ref": "2 Kings 8:19"
        },
        "prop": "city",
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
    "props": [
      {
        "type": "vineyard",
        "note": "terraced on a rich hillside early in the flight; hedge broken open, vines gone wild"
      },
      {
        "type": "cedars",
        "note": "lofty on the ridgelines, bending low as the road climbs toward the summit"
      },
      {
        "type": "throne",
        "note": "high in a summit temple, half-lost in smoke, its hem pouring down the stairs like light"
      },
      {
        "type": "altar",
        "note": "smoking beside the throne; later, small and bare on a lonely hill off the highway"
      },
      {
        "type": "tree",
        "note": "a felled forest of stumps; from one dead stump, a single green shoot"
      }
    ],
    "threadGlow": 0.35,
    "stories": [
      {
        "title": "The Vineyard Song",
        "verses": [
          {
            "t": "Now will I sing to my wellbeloved a song of my beloved touching his vineyard. My wellbeloved hath a vineyard in a very fruitful hill:",
            "ref": "Isaiah 5:1"
          },
          {
            "t": "For the vineyard of the LORD of hosts is the house of Israel, and the men of Judah his pleasant plant: and he looked for judgment, but behold oppression; for righteousness, but behold a cry.",
            "ref": "Isaiah 5:7"
          }
        ],
        "echo": null,
        "prop": "vineyard",
        "flare": false
      },
      {
        "title": "The Throne in the Smoke",
        "verses": [
          {
            "t": "In the year that king Uzziah died I saw also the LORD sitting upon a throne, high and lifted up, and his train filled the temple.",
            "ref": "Isaiah 6:1"
          },
          {
            "t": "And one cried unto another, and said, Holy, holy, holy, is the LORD of hosts: the whole earth is full of his glory.",
            "ref": "Isaiah 6:3"
          }
        ],
        "echo": null,
        "prop": "throne",
        "flare": false
      },
      {
        "title": "A Shoot from the Stump",
        "verses": [
          {
            "t": "And there shall come forth a rod out of the stem of Jesse, and a Branch shall grow out of his roots:",
            "ref": "Isaiah 11:1"
          },
          {
            "t": "Therefore the Lord himself shall give you a sign; Behold, a virgin shall conceive, and bear a son, and shall call his name Immanuel.",
            "ref": "Isaiah 7:14"
          }
        ],
        "echo": {
          "t": "For unto us a child is born, unto us a son is given: and the government shall be upon his shoulder: and his name shall be called Wonderful, Counsellor, The mighty God, The everlasting Father, The Prince of Peace.",
          "ref": "Isaiah 9:6"
        },
        "prop": "tree",
        "flare": false
      },
      {
        "title": "The Servant's Hill",
        "verses": [
          {
            "t": "He is despised and rejected of men; a man of sorrows, and acquainted with grief: and we hid as it were our faces from him; he was despised, and we esteemed him not.",
            "ref": "Isaiah 53:3"
          },
          {
            "t": "But he was wounded for our transgressions, he was bruised for our iniquities: the chastisement of our peace was upon him; and with his stripes we are healed.",
            "ref": "Isaiah 53:5"
          }
        ],
        "echo": {
          "t": "He was oppressed, and he was afflicted, yet he opened not his mouth: he is brought as a lamb to the slaughter, and as a sheep before her shearers is dumb, so he openeth not his mouth.",
          "ref": "Isaiah 53:7"
        },
        "prop": "altar",
        "flare": true
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
    "props": [
      {
        "type": "city",
        "note": "Jerusalem on the ridge behind, breached and burning, its glow bleeding through the smoke"
      },
      {
        "type": "wall",
        "note": "shattered wall segments along the ridge, gaps lit from within"
      },
      {
        "type": "tree",
        "note": "one almond tree in white blossom beside the path, the only living color — the watching branch"
      },
      {
        "type": "well",
        "note": "a dark cistern mouth in the valley floor, a rope trailing over its lip"
      },
      {
        "type": "tablets",
        "note": "cracked stone tablets half-buried face-down, a green shoot rising between them"
      }
    ],
    "threadGlow": 0.25,
    "stories": [
      {
        "title": "The Potter's House",
        "verses": [
          {
            "t": "And the vessel that he made of clay was marred in the hand of the potter: so he made it again another vessel, as seemed good to the potter to make it.",
            "ref": "Jeremiah 18:4"
          },
          {
            "t": "O house of Israel, cannot I do with you as this potter? saith the LORD. Behold, as the clay is in the potter’s hand, so are ye in mine hand, O house of Israel.",
            "ref": "Jeremiah 18:6"
          }
        ],
        "echo": null,
        "prop": null,
        "flare": false
      },
      {
        "title": "Written on the Heart",
        "verses": [
          {
            "t": "But this shall be the covenant that I will make with the house of Israel; After those days, saith the LORD, I will put my law in their inward parts, and write it in their hearts; and will be their God, and they shall be my people.",
            "ref": "Jeremiah 31:33"
          }
        ],
        "echo": {
          "t": "Behold, the days come, saith the LORD, that I will make a new covenant with the house of Israel, and with the house of Judah:",
          "ref": "Jeremiah 31:31"
        },
        "prop": "tablets",
        "flare": false
      },
      {
        "title": "Down in the Cistern",
        "verses": [
          {
            "t": "Then took they Jeremiah, and cast him into the dungeon of Malchiah the son of Hammelech, that was in the court of the prison: and they let down Jeremiah with cords. And in the dungeon there was no water, but mire: so Jeremiah sunk in the mire.",
            "ref": "Jeremiah 38:6"
          },
          {
            "t": "So they drew up Jeremiah with cords, and took him up out of the dungeon: and Jeremiah remained in the court of the prison.",
            "ref": "Jeremiah 38:13"
          }
        ],
        "echo": null,
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
    "props": [
      {
        "type": "throne",
        "note": "a sapphire gleam held high inside the storm cloud, seen only in glimpses"
      },
      {
        "type": "bones",
        "note": "a pale scatter across a sunken valley, half-buried in dust"
      },
      {
        "type": "cedars",
        "note": "one tender sprig planted on the height, green against the grey"
      },
      {
        "type": "temple",
        "note": "far downstream, a measured shining structure the river flows out of"
      }
    ],
    "threadGlow": 0.18,
    "stories": [
      {
        "title": "Wheels Within Wheels",
        "verses": [
          {
            "t": "The appearance of the wheels and their work was like unto the colour of a beryl: and they four had one likeness: and their appearance and their work was as it were a wheel in the middle of a wheel.",
            "ref": "Ezekiel 1:16"
          }
        ],
        "echo": {
          "t": "And he said unto me, Son of man, stand upon thy feet, and I will speak unto thee.",
          "ref": "Ezekiel 2:1"
        },
        "prop": "throne",
        "flare": false
      },
      {
        "title": "The Valley of Bones",
        "verses": [
          {
            "t": "Thus saith the Lord GOD unto these bones; Behold, I will cause breath to enter into you, and ye shall live:",
            "ref": "Ezekiel 37:5"
          },
          {
            "t": "So I prophesied as he commanded me, and the breath came into them, and they lived, and stood up upon their feet, an exceeding great army.",
            "ref": "Ezekiel 37:10"
          }
        ],
        "echo": {
          "t": "And David my servant shall be king over them; and they all shall have one shepherd: they shall also walk in my judgments, and observe my statutes, and do them.",
          "ref": "Ezekiel 37:24"
        },
        "prop": "bones",
        "flare": false
      },
      {
        "title": "The River from the Threshold",
        "verses": [
          {
            "t": "Afterward he brought me again unto the door of the house; and, behold, waters issued out from under the threshold of the house eastward: for the forefront of the house stood toward the east, and the waters came down from under from the right side of the house, at the south side of the altar.",
            "ref": "Ezekiel 47:1"
          }
        ],
        "echo": {
          "t": "And it shall come to pass, that every thing that liveth, which moveth, whithersoever the rivers shall come, shall live: and there shall be a very great multitude of fish, because these waters shall come thither: for they shall be healed; and every thing shall live whither the river cometh.",
          "ref": "Ezekiel 47:9"
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
    "props": [
      {
        "type": "vineyard",
        "note": "Blooming in a scarred valley near the region's start; one gate stands open"
      },
      {
        "type": "boat",
        "note": "Offshore mid-region, pitched on a black swell, lanterns guttering"
      },
      {
        "type": "city",
        "note": "A vast low city far inland, hushed under ash-grey light"
      },
      {
        "type": "manger",
        "note": "A stone trough in a hillside sheepfold outside a small town, held in soft light"
      },
      {
        "type": "menorah",
        "note": "Golden lampstand between two olive trees near the region's end, burning without oil"
      }
    ],
    "threadGlow": 0.3,
    "stories": [
      {
        "title": "A Door of Hope",
        "verses": [
          {
            "t": "And I will give her her vineyards from thence, and the valley of Achor for a door of hope: and she shall sing there, as in the days of her youth, and as in the day when she came up out of the land of Egypt.",
            "ref": "Hosea 2:15"
          }
        ],
        "echo": {
          "t": "After two days will he revive us: in the third day he will raise us up, and we shall live in his sight.",
          "ref": "Hosea 6:2"
        },
        "prop": "vineyard",
        "flare": false
      },
      {
        "title": "The Locust Years",
        "verses": [
          {
            "t": "That which the palmerworm hath left hath the locust eaten; and that which the locust hath left hath the cankerworm eaten; and that which the cankerworm hath left hath the caterpiller eaten.",
            "ref": "Joel 1:4"
          },
          {
            "t": "The sun shall be turned into darkness, and the moon into blood, before the great and the terrible day of the LORD come.",
            "ref": "Joel 2:31"
          }
        ],
        "echo": {
          "t": "And it shall come to pass afterward, that I will pour out my spirit upon all flesh; and your sons and your daughters shall prophesy, your old men shall dream dreams, your young men shall see visions:",
          "ref": "Joel 2:28"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "Flight to Tarshish",
        "verses": [
          {
            "t": "But the LORD sent out a great wind into the sea, and there was a mighty tempest in the sea, so that the ship was like to be broken.",
            "ref": "Jonah 1:4"
          }
        ],
        "echo": null,
        "prop": "boat",
        "flare": false
      },
      {
        "title": "Out of the Deep",
        "verses": [
          {
            "t": "Now the LORD had prepared a great fish to swallow up Jonah. And Jonah was in the belly of the fish three days and three nights.",
            "ref": "Jonah 1:17"
          },
          {
            "t": "I went down to the bottoms of the mountains; the earth with her bars was about me for ever: yet hast thou brought up my life from corruption, O LORD my God.",
            "ref": "Jonah 2:6"
          }
        ],
        "echo": null,
        "prop": "city",
        "flare": false
      },
      {
        "title": "The Smallest Clan",
        "verses": [
          {
            "t": "But thou, Bethlehem Ephratah, though thou be little among the thousands of Judah, yet out of thee shall he come forth unto me that is to be ruler in Israel; whose goings forth have been from of old, from everlasting.",
            "ref": "Micah 5:2"
          }
        ],
        "echo": {
          "t": "And he shall stand and feed in the strength of the LORD, in the majesty of the name of the LORD his God; and they shall abide: for now shall he be great unto the ends of the earth.",
          "ref": "Micah 5:4"
        },
        "prop": "manger",
        "flare": false
      },
      {
        "title": "The Opened Fountain",
        "verses": [
          {
            "t": "In that day there shall be a fountain opened to the house of David and to the inhabitants of Jerusalem for sin and for uncleanness.",
            "ref": "Zechariah 13:1"
          }
        ],
        "echo": {
          "t": "And I will pour upon the house of David, and upon the inhabitants of Jerusalem, the spirit of grace and of supplications: and they shall look upon me whom they have pierced, and they shall mourn for him, as one mourneth for his only son, and shall be in bitterness for him, as one that is in bitterness for his firstborn.",
          "ref": "Zechariah 12:10"
        },
        "prop": "menorah",
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
    "props": [
      {
        "type": "tree",
        "note": "at the region's threshold, planted by the stream, leaves that never wither"
      },
      {
        "type": "throne",
        "note": "high on the hill of Zion, kept for an anointed son"
      },
      {
        "type": "temple",
        "note": "on the far height, doors open toward the rising sun"
      },
      {
        "type": "cedars",
        "note": "along the ridgelines, bending together when the wind speaks"
      },
      {
        "type": "stones",
        "note": "one cast-off block resting at the temple's corner"
      }
    ],
    "threadGlow": 0.4,
    "stories": [
      {
        "title": "The Forsaken Hour",
        "verses": [
          {
            "t": "My God, my God, why hast thou forsaken me? why art thou so far from helping me, and from the words of my roaring?",
            "ref": "Psalms 22:1"
          },
          {
            "t": "They part my garments among them, and cast lots upon my vesture.",
            "ref": "Psalms 22:18"
          }
        ],
        "echo": {
          "t": "For dogs have compassed me: the assembly of the wicked have inclosed me: they pierced my hands and my feet.",
          "ref": "Psalms 22:16"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "Shepherd Valley",
        "verses": [
          {
            "t": "The LORD is my shepherd; I shall not want.",
            "ref": "Psalms 23:1"
          },
          {
            "t": "Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.",
            "ref": "Psalms 23:4"
          }
        ],
        "echo": null,
        "prop": null,
        "flare": false
      },
      {
        "title": "Hallelujah Dawn",
        "verses": [
          {
            "t": "This is the LORD’s doing; it is marvellous in our eyes.",
            "ref": "Psalms 118:23"
          },
          {
            "t": "This is the day which the LORD hath made; we will rejoice and be glad in it.",
            "ref": "Psalms 118:24"
          }
        ],
        "echo": {
          "t": "The stone which the builders refused is become the head stone of the corner.",
          "ref": "Psalms 118:22"
        },
        "prop": "temple",
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
    "props": [
      {
        "type": "city",
        "note": "lamplit gates and climbing stairways; a voice seems to come from its highest places"
      },
      {
        "type": "tree",
        "note": "one green tree on the terraces, branches leaning low over the road"
      },
      {
        "type": "well",
        "note": "at the crossroads, deeper than any rope — water older than the hills"
      },
      {
        "type": "vineyard",
        "note": "a thorn-taken plot on the slope, untended, silvered with dew"
      },
      {
        "type": "wall",
        "note": "the vineyard's field-wall, breached and crumbling open to the road"
      }
    ],
    "threadGlow": 0.35,
    "stories": [
      {
        "title": "A Voice in the Streets",
        "verses": [
          {
            "t": "Wisdom crieth without; she uttereth her voice in the streets:",
            "ref": "Proverbs 1:20"
          },
          {
            "t": "She crieth in the chief place of concourse, in the openings of the gates: in the city she uttereth her words, saying,",
            "ref": "Proverbs 1:21"
          }
        ],
        "echo": null,
        "prop": "city",
        "flare": false
      },
      {
        "title": "A Tree of Life",
        "verses": [
          {
            "t": "She is a tree of life to them that lay hold upon her: and happy is every one that retaineth her.",
            "ref": "Proverbs 3:18"
          }
        ],
        "echo": null,
        "prop": "tree",
        "flare": false
      },
      {
        "title": "Before the Deeps",
        "verses": [
          {
            "t": "When he prepared the heavens, I was there: when he set a compass upon the face of the depth:",
            "ref": "Proverbs 8:27"
          },
          {
            "t": "When he gave to the sea his decree, that the waters should not pass his commandment: when he appointed the foundations of the earth:",
            "ref": "Proverbs 8:29"
          }
        ],
        "echo": {
          "t": "Then I was by him, as one brought up with him: and I was daily his delight, rejoicing always before him;",
          "ref": "Proverbs 8:30"
        },
        "prop": "well",
        "flare": false
      },
      {
        "title": "Her Table Is Set",
        "verses": [
          {
            "t": "Wisdom hath builded her house, she hath hewn out her seven pillars:",
            "ref": "Proverbs 9:1"
          },
          {
            "t": "She hath killed her beasts; she hath mingled her wine; she hath also furnished her table.",
            "ref": "Proverbs 9:2"
          }
        ],
        "echo": {
          "t": "Come, eat of my bread, and drink of the wine which I have mingled.",
          "ref": "Proverbs 9:5"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "The Sluggard's Vineyard",
        "verses": [
          {
            "t": "I went by the field of the slothful, and by the vineyard of the man void of understanding;",
            "ref": "Proverbs 24:30"
          },
          {
            "t": "And, lo, it was all grown over with thorns, and nettles had covered the face thereof, and the stone wall thereof was broken down.",
            "ref": "Proverbs 24:31"
          }
        ],
        "echo": null,
        "prop": "vineyard",
        "flare": false
      },
      {
        "title": "The Gathered Wind",
        "verses": [
          {
            "t": "Who hath ascended up into heaven, or descended? who hath gathered the wind in his fists? who hath bound the waters in a garment? who hath established all the ends of the earth? what is his name, and what is his son’s name, if thou canst tell?",
            "ref": "Proverbs 30:4"
          }
        ],
        "echo": null,
        "prop": null,
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
    "props": [
      {
        "type": "stones",
        "note": "a great house fallen, its stones flung outward by the wind"
      },
      {
        "type": "altar",
        "note": "blackened and small, tended before every sunrise"
      },
      {
        "type": "wall",
        "note": "broken sheepfold walls half-buried in ash, flocks gone"
      }
    ],
    "threadGlow": 0.25,
    "stories": [
      {
        "title": "The Ash Heap",
        "verses": [
          {
            "t": "There was a man in the land of Uz, whose name was Job; and that man was perfect and upright, and one that feared God, and eschewed evil.",
            "ref": "Job 1:1"
          },
          {
            "t": "And he took him a potsherd to scrape himself withal; and he sat down among the ashes.",
            "ref": "Job 2:8"
          }
        ],
        "echo": null,
        "prop": "stones",
        "flare": false
      },
      {
        "title": "My Redeemer Lives",
        "verses": [
          {
            "t": "And though after my skin worms destroy this body, yet in my flesh shall I see God:",
            "ref": "Job 19:26"
          }
        ],
        "echo": {
          "t": "For I know that my redeemer liveth, and that he shall stand at the latter day upon the earth:",
          "ref": "Job 19:25"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "Out of the Whirlwind",
        "verses": [
          {
            "t": "Then the LORD answered Job out of the whirlwind, and said,",
            "ref": "Job 38:1"
          },
          {
            "t": "Where wast thou when I laid the foundations of the earth? declare, if thou hast understanding.",
            "ref": "Job 38:4"
          }
        ],
        "echo": {
          "t": "And the LORD turned the captivity of Job, when he prayed for his friends: also the LORD gave Job twice as much as he had before.",
          "ref": "Job 42:10"
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
    "props": [
      {
        "type": "vineyard",
        "note": "terraced on every hillside, heavy with blossom and first small fruit"
      },
      {
        "type": "gardenTree",
        "note": "one apple tree apart in the wild wood, deep sweet shade"
      },
      {
        "type": "well",
        "note": "the sealed spring inside the walled garden, quiet and full"
      },
      {
        "type": "cedars",
        "note": "cedars of Lebanon crowning the far ridges, green rafters"
      },
      {
        "type": "palms",
        "note": "a lone date palm rising on the near hill, wind-swayed"
      }
    ],
    "threadGlow": 0.5,
    "stories": [
      {
        "title": "The Voice of the Beloved",
        "verses": [
          {
            "t": "The voice of my beloved! behold, he cometh leaping upon the mountains, skipping upon the hills.",
            "ref": "Song of Songs 2:8"
          },
          {
            "t": "My beloved spake, and said unto me, Rise up, my love, my fair one, and come away.",
            "ref": "Song of Songs 2:10"
          }
        ],
        "echo": null,
        "prop": "vineyard",
        "flare": false
      },
      {
        "title": "A Seal on the Heart",
        "verses": [
          {
            "t": "Set me as a seal upon thine heart, as a seal upon thine arm: for love is strong as death; jealousy is cruel as the grave: the coals thereof are coals of fire, which hath a most vehement flame.",
            "ref": "Song of Songs 8:6"
          }
        ],
        "echo": {
          "t": "Many waters cannot quench love, neither can the floods drown it: if a man would give all the substance of his house for love, it would utterly be contemned.",
          "ref": "Song of Songs 8:7"
        },
        "prop": null,
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
    "props": [
      {
        "type": "city",
        "note": "Bethlehem small on its hill, lamplit at dusk, its gate open toward the fields"
      },
      {
        "type": "well",
        "note": "at the field's edge, drawn water waiting in clay vessels for the gleaners"
      },
      {
        "type": "tree",
        "note": "one broad shade tree where the reapers' tools lean at noon"
      },
      {
        "type": "manger",
        "note": "half-hidden in a stable's shadow at the town's edge — empty, swept, waiting"
      }
    ],
    "threadGlow": 0.55,
    "stories": [
      {
        "title": "The Road from Moab",
        "verses": [
          {
            "t": "And Ruth said, Intreat me not to leave thee, or to return from following after thee: for whither thou goest, I will go; and where thou lodgest, I will lodge: thy people shall be my people, and thy God my God:",
            "ref": "Ruth 1:16"
          }
        ],
        "echo": null,
        "prop": null,
        "flare": false
      },
      {
        "title": "Gleaning in the Barley",
        "verses": [
          {
            "t": "And she went, and came, and gleaned in the field after the reapers: and her hap was to light on a part of the field belonging unto Boaz, who was of the kindred of Elimelech.",
            "ref": "Ruth 2:3"
          },
          {
            "t": "And let fall also some of the handfuls of purpose for her, and leave them, that she may glean them, and rebuke her not.",
            "ref": "Ruth 2:16"
          }
        ],
        "echo": null,
        "prop": "well",
        "flare": false
      },
      {
        "title": "The Sandal at the Gate",
        "verses": [
          {
            "t": "Moreover Ruth the Moabitess, the wife of Mahlon, have I purchased to be my wife, to raise up the name of the dead upon his inheritance, that the name of the dead be not cut off from among his brethren, and from the gate of his place: ye are witnesses this day.",
            "ref": "Ruth 4:10"
          }
        ],
        "echo": {
          "t": "And the women said unto Naomi, Blessed be the LORD, which hath not left thee this day without a kinsman, that his name may be famous in Israel.",
          "ref": "Ruth 4:14"
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
    "props": [
      {
        "type": "city",
        "note": "roofless and dark on its hill, gates hanging open onto empty streets"
      },
      {
        "type": "wall",
        "note": "breached and crumbling, its stones spilled down the slope"
      },
      {
        "type": "temple",
        "note": "burned shell, charred beams open to the sky"
      },
      {
        "type": "altar",
        "note": "cold and overturned, gray with old ash"
      }
    ],
    "threadGlow": 0.07,
    "stories": [
      {
        "title": "The Lonely City",
        "verses": [
          {
            "t": "How doth the city sit solitary, that was full of people! how is she become as a widow! she that was great among the nations, and princess among the provinces, how is she become tributary!",
            "ref": "Lamentations 1:1"
          }
        ],
        "echo": {
          "t": "Is it nothing to you, all ye that pass by? behold, and see if there be any sorrow like unto my sorrow, which is done unto me, wherewith the LORD hath afflicted me in the day of his fierce anger.",
          "ref": "Lamentations 1:12"
        },
        "prop": "city",
        "flare": false
      },
      {
        "title": "New Every Morning",
        "verses": [
          {
            "t": "It is of the LORD’s mercies that we are not consumed, because his compassions fail not.",
            "ref": "Lamentations 3:22"
          },
          {
            "t": "They are new every morning: great is thy faithfulness.",
            "ref": "Lamentations 3:23"
          }
        ],
        "echo": {
          "t": "He giveth his cheek to him that smiteth him: he is filled full with reproach.",
          "ref": "Lamentations 3:30"
        },
        "prop": null,
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
    "props": [
      {
        "type": "vineyard",
        "note": "terraced up the mist-slopes, heavy with fruit, half-forgotten"
      },
      {
        "type": "gardenTree",
        "note": "the king's planted parks, rows blurring into haze"
      },
      {
        "type": "throne",
        "note": "an empty seat above the gardens, catching thin sunlight"
      },
      {
        "type": "well",
        "note": "at the road's end, wheel stilled, pitcher in shards beside it"
      }
    ],
    "threadGlow": 0.2,
    "stories": [
      {
        "title": "Vapor of Vapors",
        "verses": [
          {
            "t": "Vanity of vanities, saith the Preacher, vanity of vanities; all is vanity.",
            "ref": "Ecclesiastes 1:2"
          },
          {
            "t": "I have seen all the works that are done under the sun; and, behold, all is vanity and vexation of spirit.",
            "ref": "Ecclesiastes 1:14"
          }
        ],
        "echo": null,
        "prop": "vineyard",
        "flare": false
      },
      {
        "title": "The Broken Pitcher",
        "verses": [
          {
            "t": "Or ever the silver cord be loosed, or the golden bowl be broken, or the pitcher be broken at the fountain, or the wheel broken at the cistern.",
            "ref": "Ecclesiastes 12:6"
          },
          {
            "t": "Then shall the dust return to the earth as it was: and the spirit shall return unto God who gave it.",
            "ref": "Ecclesiastes 12:7"
          }
        ],
        "echo": {
          "t": "The words of the wise are as goads, and as nails fastened by the masters of assemblies, which are given from one shepherd.",
          "ref": "Ecclesiastes 12:11"
        },
        "prop": "well",
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
    "props": [
      {
        "type": "city",
        "note": "Susa the citadel — banners and feast-glow along lamplit walls at dusk"
      },
      {
        "type": "throne",
        "note": "deep in the inner court, one thin line of gold light down the aisle"
      },
      {
        "type": "gardenTree",
        "note": "the palace garden of the wine feast, blossom drifting in night air"
      },
      {
        "type": "tree",
        "note": "a bare gallows-tree, fifty cubits, black against the dawn"
      }
    ],
    "threadGlow": 0.3,
    "stories": [
      {
        "title": "A Hidden Crown",
        "verses": [
          {
            "t": "And the king loved Esther above all the women, and she obtained grace and favour in his sight more than all the virgins; so that he set the royal crown upon her head, and made her queen instead of Vashti.",
            "ref": "Esther 2:17"
          }
        ],
        "echo": null,
        "prop": "city",
        "flare": false
      },
      {
        "title": "The Gold Scepter",
        "verses": [
          {
            "t": "And it was so, when the king saw Esther the queen standing in the court, that she obtained favour in his sight: and the king held out to Esther the golden sceptre that was in his hand. So Esther drew near, and touched the top of the sceptre.",
            "ref": "Esther 5:2"
          }
        ],
        "echo": {
          "t": "Go, gather together all the Jews that are present in Shushan, and fast ye for me, and neither eat nor drink three days, night or day: I also and my maidens will fast likewise; and so will I go in unto the king, which is not according to the law: and if I perish, I perish.",
          "ref": "Esther 4:16"
        },
        "prop": "throne",
        "flare": false
      },
      {
        "title": "Fifty Cubits High",
        "verses": [
          {
            "t": "So they hanged Haman on the gallows that he had prepared for Mordecai. Then was the king’s wrath pacified.",
            "ref": "Esther 7:10"
          }
        ],
        "echo": null,
        "prop": "tree",
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
    "props": [
      {
        "type": "city",
        "note": "Babylon's long blue-glazed walls, lion reliefs glowing faintly in torchlight"
      },
      {
        "type": "ziggurat",
        "note": "rising from the city's heart, crowned in banquet light against the dark"
      },
      {
        "type": "furnace",
        "note": "alone on the open plain, door standing open, white-gold heat spilling out"
      },
      {
        "type": "wall",
        "note": "a palace wall in lamplight, letters of fire hanging half-finished on the plaster"
      },
      {
        "type": "throne",
        "note": "far off and high, wreathed in flame above the night sea of the visions"
      }
    ],
    "threadGlow": 0.5,
    "stories": [
      {
        "title": "The Fourth in the Fire",
        "verses": [
          {
            "t": "And the princes, governors, and captains, and the king’s counsellors, being gathered together, saw these men, upon whose bodies the fire had no power, nor was an hair of their head singed, neither were their coats changed, nor the smell of fire had passed on them.",
            "ref": "Daniel 3:27"
          }
        ],
        "echo": {
          "t": "He answered and said, Lo, I see four men loose, walking in the midst of the fire, and they have no hurt; and the form of the fourth is like the Son of God.",
          "ref": "Daniel 3:25"
        },
        "prop": "furnace",
        "flare": false
      },
      {
        "title": "Writing on the Wall",
        "verses": [
          {
            "t": "In the same hour came forth fingers of a man’s hand, and wrote over against the candlestick upon the plaister of the wall of the king’s palace: and the king saw the part of the hand that wrote.",
            "ref": "Daniel 5:5"
          },
          {
            "t": "And this is the writing that was written, MENE, MENE, TEKEL, UPHARSIN.",
            "ref": "Daniel 5:25"
          }
        ],
        "echo": null,
        "prop": "wall",
        "flare": false
      },
      {
        "title": "The Den of Lions",
        "verses": [
          {
            "t": "Then the king commanded, and they brought Daniel, and cast him into the den of lions. Now the king spake and said unto Daniel, Thy God whom thou servest continually, he will deliver thee.",
            "ref": "Daniel 6:16"
          },
          {
            "t": "My God hath sent his angel, and hath shut the lions’ mouths, that they have not hurt me: forasmuch as before him innocency was found in me; and also before thee, O king, have I done no hurt.",
            "ref": "Daniel 6:22"
          }
        ],
        "echo": {
          "t": "And a stone was brought, and laid upon the mouth of the den; and the king sealed it with his own signet, and with the signet of his lords; that the purpose might not be changed concerning Daniel.",
          "ref": "Daniel 6:17"
        },
        "prop": null,
        "flare": false
      },
      {
        "title": "One on the Clouds",
        "verses": [
          {
            "t": "And there was given him dominion, and glory, and a kingdom, that all people, nations, and languages, should serve him: his dominion is an everlasting dominion, which shall not pass away, and his kingdom that which shall not be destroyed.",
            "ref": "Daniel 7:14"
          }
        ],
        "echo": {
          "t": "I saw in the night visions, and, behold, one like the Son of man came with the clouds of heaven, and came to the Ancient of days, and they brought him near before him.",
          "ref": "Daniel 7:13"
        },
        "prop": "throne",
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
    "props": [
      {
        "type": "altar",
        "note": "rebuilt first, alone on cleared rubble, thin smoke rising before any walls exist"
      },
      {
        "type": "temple",
        "note": "half-raised on old foundations, smaller than the scorch-marks around it, scaffolded in morning light"
      },
      {
        "type": "wall",
        "note": "circling the city in uneven new courses, gaps closing, ladders and heaped stone along its length"
      },
      {
        "type": "city",
        "note": "Jerusalem in ash-grey and fresh limestone, ruin and repair interleaved"
      },
      {
        "type": "stones",
        "note": "tumbled charred blocks everywhere, some hoisted mid-air on ropes"
      }
    ],
    "threadGlow": 0.6,
    "stories": [
      {
        "title": "Songs at the Foundation",
        "verses": [
          {
            "t": "And they sang together by course in praising and giving thanks unto the LORD; because he is good, for his mercy endureth for ever toward Israel. And all the people shouted with a great shout, when they praised the LORD, because the foundation of the house of the LORD was laid.",
            "ref": "Ezra 3:11"
          }
        ],
        "echo": {
          "t": "The glory of this latter house shall be greater than of the former, saith the LORD of hosts: and in this place will I give peace, saith the LORD of hosts.",
          "ref": "Haggai 2:9"
        },
        "prop": "temple",
        "flare": false
      },
      {
        "title": "Sword and Trowel",
        "verses": [
          {
            "t": "They which builded on the wall, and they that bare burdens, with those that laded, every one with one of his hands wrought in the work, and with the other hand held a weapon.",
            "ref": "Nehemiah 4:17"
          },
          {
            "t": "For the builders, every one had his sword girded by his side, and so builded. And he that sounded the trumpet was by me.",
            "ref": "Nehemiah 4:18"
          }
        ],
        "echo": null,
        "prop": "wall",
        "flare": false
      },
      {
        "title": "The Water Gate",
        "verses": [
          {
            "t": "And Ezra opened the book in the sight of all the people; (for he was above all the people;) and when he opened it, all the people stood up:",
            "ref": "Nehemiah 8:5"
          }
        ],
        "echo": {
          "t": "And Ezra the scribe stood upon a pulpit of wood, which they had made for the purpose; and beside him stood Mattithiah, and Shema, and Anaiah, and Urijah, and Hilkiah, and Maaseiah, on his right hand; and on his left hand, Pedaiah, and Mishael, and Malchiah, and Hashum, and Hashbadana, Zechariah, and Meshullam.",
          "ref": "Nehemiah 8:4"
        },
        "prop": null,
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
    "props": [
      {
        "type": "stones",
        "note": "a valley of standing name-stones at the region's threshold, dense at first, thinning as the road climbs"
      },
      {
        "type": "throne",
        "note": "an empty throne on a bare rise, facing the unbuilt hill, evening light pooled in the seat"
      },
      {
        "type": "altar",
        "note": "on the summit threshing floor, smoke rising in one straight thread"
      },
      {
        "type": "temple",
        "note": "crowning the hill: gold, then charred, its doors finally standing open"
      },
      {
        "type": "city",
        "note": "at the road's end, gates open, glowing at the vanishing point"
      }
    ],
    "threadGlow": 0.95,
    "stories": [
      {
        "title": "A River of Names",
        "verses": [
          {
            "t": "Adam, Sheth, Enosh,",
            "ref": "1 Chronicles 1:1"
          },
          {
            "t": "Noah, Shem, Ham, and Japheth.",
            "ref": "1 Chronicles 1:4"
          }
        ],
        "echo": null,
        "prop": "stones",
        "flare": false
      },
      {
        "title": "A House Promised",
        "verses": [
          {
            "t": "He shall build me an house, and I will stablish his throne for ever.",
            "ref": "1 Chronicles 17:12"
          }
        ],
        "echo": {
          "t": "But I will settle him in mine house and in my kingdom for ever: and his throne shall be established for evermore.",
          "ref": "1 Chronicles 17:14"
        },
        "prop": "throne",
        "flare": false
      },
      {
        "title": "The Threshing Floor",
        "verses": [
          {
            "t": "And king David said to Ornan, Nay; but I will verily buy it for the full price: for I will not take that which is thine for the LORD, nor offer burnt offerings without cost.",
            "ref": "1 Chronicles 21:24"
          },
          {
            "t": "And David built there an altar unto the LORD, and offered burnt offerings and peace offerings, and called upon the LORD; and he answered him from heaven by fire upon the altar of burnt offering.",
            "ref": "1 Chronicles 21:26"
          }
        ],
        "echo": null,
        "prop": "altar",
        "flare": false
      },
      {
        "title": "Glory Fills the House",
        "verses": [
          {
            "t": "Now when Solomon had made an end of praying, the fire came down from heaven, and consumed the burnt offering and the sacrifices; and the glory of the LORD filled the house.",
            "ref": "2 Chronicles 7:1"
          }
        ],
        "echo": null,
        "prop": "temple",
        "flare": false
      },
      {
        "title": "The Long Sabbath",
        "verses": [
          {
            "t": "To fulfil the word of the LORD by the mouth of Jeremiah, until the land had enjoyed her sabbaths: for as long as she lay desolate she kept sabbath, to fulfil threescore and ten years.",
            "ref": "2 Chronicles 36:21"
          }
        ],
        "echo": null,
        "prop": null,
        "flare": false
      },
      {
        "title": "Let Him Go Up",
        "verses": [
          {
            "t": "Thus saith Cyrus king of Persia, All the kingdoms of the earth hath the LORD God of heaven given me; and he hath charged me to build him an house in Jerusalem, which is in Judah. Who is there among you of all his people? The LORD his God be with him, and let him go up.",
            "ref": "2 Chronicles 36:23"
          }
        ],
        "echo": null,
        "prop": "city",
        "flare": false
      }
    ]
  }
];
