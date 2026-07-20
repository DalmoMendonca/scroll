// Generated journey data — the 24 books of the Tanakh as regions of one world.
// Content scripted by the tanakh-journey-script workflow; do not hand-edit story text here
// without also updating the workflow output.

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
        "caption": "Dark water lies waiting under no sky. A word crosses it, and light spills over the deep.",
        "echo": null,
        "prop": null,
        "flare": false
      },
      {
        "title": "The Garden",
        "caption": "Two trees rise at the heart of the green, heavy with fruit. Something slow and glittering moves through the grass, and the gate fills with flame.",
        "echo": "Her seed will crush the serpent",
        "prop": "gardenTree",
        "flare": false
      },
      {
        "title": "The Flood",
        "caption": "Rain unmakes the world. A wooden hull rides the dark with one window lit, and a dove goes out over the water.",
        "echo": null,
        "prop": "ark",
        "flare": false
      },
      {
        "title": "The Ram in the Thicket",
        "caption": "Father and fire climb the bare summit; the wood is laid in order. In the thicket, horns tangle and wait.",
        "echo": "God himself will provide the lamb",
        "prop": "altar",
        "flare": true
      },
      {
        "title": "The Ladder",
        "caption": "A stone for a pillow under a torn sky. Light climbs down, rung by rung, into the sleeping land.",
        "echo": "The gate of heaven stands open",
        "prop": "ladder",
        "flare": false
      },
      {
        "title": "The Brother Sold",
        "caption": "An empty cistern in dry grass; a coat's colors drift south with the caravans. Far off, granaries rise like mountains against the famine sky.",
        "echo": "Sold for silver, he feeds nations",
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
        "caption": "A cry rises over Egypt's dark. Where blood marks the doorframe, the house sleeps unharmed.",
        "echo": "The lamb dies; the household lives.",
        "prop": null,
        "flare": true
      },
      {
        "title": "The Sea Stands Open",
        "caption": "Two walls of water tremble and hold. Between them, wind-dried sand and a column of fire guarding the way.",
        "echo": null,
        "prop": "pillarOfFire",
        "flare": false
      },
      {
        "title": "Bread with the Dew",
        "caption": "Dawn whitens the desert floor with thin flakes, sweet as honey, gone by noon.",
        "echo": "Bread comes down from heaven.",
        "prop": null,
        "flare": false
      },
      {
        "title": "The Mountain in Smoke",
        "caption": "Thunder without rain. The peak shakes under its wrapping of smoke, and two stones wait in the fire above.",
        "echo": null,
        "prop": "tablets",
        "flare": false
      },
      {
        "title": "Glory Fills the Tent",
        "caption": "A small tent of woven cloth stands in the wide plain. Cloud settles over it; light spills from the seams.",
        "echo": "Glory pitches its tent among the tents.",
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
        "caption": "The cloud settles low and the camp goes quiet. From inside the tent a voice calls, and smoke begins to rise.",
        "echo": "Without blemish, offered in your place.",
        "prop": "tent",
        "flare": false
      },
      {
        "title": "Fire From the Presence",
        "caption": "Glory flickers at the tent's door. Fire leaps out and takes the offering whole, and the whole plain kneels in its light.",
        "echo": null,
        "prop": "altar",
        "flare": false
      },
      {
        "title": "The Goat That Leaves",
        "caption": "Two goats stand at the entrance. One stays beside the altar; the other walks into the empty land and does not come back.",
        "echo": "He bears it away, outside the camp.",
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
        "caption": "Tents ring a single tent at the heart of the waste. When the cloud lifts, everything moves.",
        "echo": "One tent stands among the many.",
        "prop": "tent",
        "flare": false
      },
      {
        "title": "Grapes of Eshcol",
        "caption": "A green cleft opens in the rock, vines bowed with fruit. One cluster needs a pole to carry.",
        "echo": null,
        "prop": "vineyard",
        "flare": false
      },
      {
        "title": "The Bronze Serpent",
        "caption": "Serpents of fire thread the sand. Above the camp, bronze coils burn on a raised pole.",
        "echo": "Look up, and live.",
        "prop": "serpentPole",
        "flare": false
      },
      {
        "title": "The Star of Jacob",
        "caption": "Seven altars smolder on the clifftop. Far below, the camp spreads like spilled light, and one star holds its place.",
        "echo": "A star rises out of Jacob.",
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
        "caption": "Evening settles over the tents. One old voice retells the whole road — sea, mountain, wilderness — while the river shines below.",
        "echo": "The word is very near you.",
        "prop": "tent",
        "flare": false
      },
      {
        "title": "Blessing and Curse",
        "caption": "The law stands written on plastered stones. Two slopes face each other, and the wind carries blessing from one, curse from the other.",
        "echo": "Cursed is the one hung on a tree.",
        "prop": "stones",
        "flare": false
      },
      {
        "title": "Mount Nebo",
        "caption": "From the summit the whole land unrolls: palms by the river, hills going blue, a far shimmer of sea. Below, an unmarked valley keeps its grave.",
        "echo": "One like him will yet arise.",
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
        "caption": "The ark goes first into the riverbed. Upstream, the whole Jordan stands in a single trembling heap.",
        "echo": "After three days, the waters open.",
        "prop": "ark",
        "flare": false
      },
      {
        "title": "The Seventh Day",
        "caption": "Seven silent circuits, then the horns. The wall lies down in its own dust; one scarlet cord hangs in a standing window.",
        "echo": "A scarlet thread spares the house.",
        "prop": "wall",
        "flare": true
      },
      {
        "title": "Sun Over Gibeon",
        "caption": "The light stops mid-sky and holds. Shadows keep their places until the day's work is done.",
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
        "caption": "A single palm stands over the mustering hills. Storm bursts on the Kishon; the stars fight from their courses.",
        "echo": "A woman's hand crushes the head",
        "prop": "palms",
        "flare": false
      },
      {
        "title": "Torches in the Jars",
        "caption": "Dew silvers one fleece on a dry threshing floor. In the dark, three hundred small flames wait shut inside clay jars.",
        "echo": "When the jars break, light blazes",
        "prop": "altar",
        "flare": false
      },
      {
        "title": "Honey from the Lion",
        "caption": "Bees thread a lion's white ribs among the vines. Honey gleams in the hollow of the carcass.",
        "echo": "Out of the eater, something sweet",
        "prop": "vineyard",
        "flare": false
      },
      {
        "title": "Between the Pillars",
        "caption": "In Dagon's hall the two pillars begin to lean. Dust sifts through the shouting, then a great stillness.",
        "echo": "Arms stretched wide, the house comes down",
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
        "caption": "The lamp of God still burns in the tent. Before dawn, a name is called into the dark, three times.",
        "echo": null,
        "prop": "tent",
        "flare": false
      },
      {
        "title": "Oil in Bethlehem",
        "caption": "By the well, the youngest is called in from the sheep. Oil runs down his hair, and the hills lean closer.",
        "echo": "A shepherd rises out of Bethlehem.",
        "prop": "well",
        "flare": false
      },
      {
        "title": "Five Smooth Stones",
        "caption": "A giant's shadow lies across the valley. From the brook, five stones; only one leaves the sling.",
        "echo": "One champion stands for the many.",
        "prop": "stones",
        "flare": false
      },
      {
        "title": "A House Forever",
        "caption": "Cedar beams and lamplight in the new city. A word arrives by night: a house, a throne.",
        "echo": "His house and his throne, forever.",
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
        "caption": "Cedar crosses gold-leafed stone on the highest terrace. When the doors shut, a cloud fills the house and will not lift.",
        "echo": "A greater house will rise.",
        "prop": "temple",
        "flare": false
      },
      {
        "title": "Ravens at the Brook",
        "caption": "Drought browns the ridges. At a hidden stream, black wings come at morning and evening, carrying bread.",
        "echo": "Bread still falls in the wilderness.",
        "prop": null,
        "flare": false
      },
      {
        "title": "Fire on Carmel",
        "caption": "Twelve stones stand drenched on the ridge, the trench brimming. Fire drops out of a clean sky and takes even the water.",
        "echo": null,
        "prop": "altar",
        "flare": false
      },
      {
        "title": "A Whirlwind of Fire",
        "caption": "Beyond the parted river, horses of flame turn upward in a spiral of wind. An empty mantle drifts down.",
        "echo": null,
        "prop": null,
        "flare": false
      },
      {
        "title": "The Long Road East",
        "caption": "Ramps lean against the walls and the gold house is burning. A road runs east under low smoke.",
        "echo": "A lamp for David still burns.",
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
        "caption": "A terraced vineyard on a fat hillside, tower and winepress standing ready. The hedge lies open; the vines have gone wild.",
        "echo": null,
        "prop": "vineyard",
        "flare": false
      },
      {
        "title": "The Throne in the Smoke",
        "caption": "Smoke fills the summit temple, and the hem of a robe pours down the stairs like light. From the altar, a live coal lifts, still burning.",
        "echo": null,
        "prop": "throne",
        "flare": false
      },
      {
        "title": "A Shoot from the Stump",
        "caption": "A forest lies felled to its stumps. From one dead stump a green shoot rises, and lion eyes watch from the grass, gentle.",
        "echo": "Unto us a child is born.",
        "prop": "tree",
        "flare": false
      },
      {
        "title": "The Servant's Hill",
        "caption": "A narrow path leaves the highway for a bare hill and a single altar. Wool clings to the thorns; everything is very quiet.",
        "echo": "Led like a lamb, and silent.",
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
        "caption": "A vessel slumps mid-turn on the wheel. Wet hands gather the ruin and begin again.",
        "echo": null,
        "prop": null,
        "flare": false
      },
      {
        "title": "Written on the Heart",
        "caption": "Cracked tablets lie face-down in the dust. Between them a green shoot splits the stone.",
        "echo": "Not on stone this time.",
        "prop": "tablets",
        "flare": false
      },
      {
        "title": "Down in the Cistern",
        "caption": "A rope drops into the dark mouth of the earth. The mire lets go; light returns.",
        "echo": "Drawn up alive from the mire.",
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
        "caption": "A storm wind comes out of the north, fire folding in on itself. Wheels full of eyes turn beneath a sapphire throne.",
        "echo": "A voice says: stand, son of man.",
        "prop": "throne",
        "flare": false
      },
      {
        "title": "The Valley of Bones",
        "caption": "The valley floor is white with bones, very dry. A rattling, bone to bone, and breath comes in from the four winds.",
        "echo": "One shepherd, one flock, forever.",
        "prop": "bones",
        "flare": false
      },
      {
        "title": "The River from the Threshold",
        "caption": "Water seeps from under the temple door and deepens into a river too wide to cross. On both banks, trees whose leaves never fail.",
        "echo": "Everything lives where the river goes.",
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
        "caption": "Fifteen pieces of silver and a measure of barley lie on a threshold. Beyond it, vines bloom in the Valley of Trouble.",
        "echo": "The beloved is bought back",
        "prop": "vineyard",
        "flare": false
      },
      {
        "title": "The Locust Years",
        "caption": "A dark swarm lifts from stripped fields. Behind it the rain begins, and the threshing floors stand full again.",
        "echo": null,
        "prop": null,
        "flare": false
      },
      {
        "title": "Flight to Tarshish",
        "caption": "A ship strains against a black squall. One splash, and the sea goes glass-calm; a vast shadow rises beneath the hull.",
        "echo": null,
        "prop": "boat",
        "flare": false
      },
      {
        "title": "Out of the Deep",
        "caption": "Seaweed and darkness at the roots of the mountains. On the third morning: dry sand, and a great city gone quiet in sackcloth.",
        "echo": "Three days in the deep, then morning",
        "prop": "city",
        "flare": false
      },
      {
        "title": "The Smallest Clan",
        "caption": "Sheep paths thread the hills toward a little town. In a stone fold, an empty feeding trough waits.",
        "echo": "From the least clan, a shepherd of old",
        "prop": "manger",
        "flare": false
      },
      {
        "title": "The Opened Fountain",
        "caption": "Two olive trees flank a golden lampstand. Below the city a fountain breaks open, running clear over the stones.",
        "echo": "They look on the one they pierced",
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
        "caption": "The path drops into a dry ravine and the noon light fails. Low eyes glitter between the rocks; every bone of the land shows.",
        "echo": "Pierced — and the song turns toward dawn",
        "prop": null,
        "flare": false
      },
      {
        "title": "Shepherd Valley",
        "caption": "The ravine opens into green pasture. Water lies still enough to hold the whole sky.",
        "echo": "The shepherd himself becomes the lamb",
        "prop": null,
        "flare": false
      },
      {
        "title": "Hallelujah Dawn",
        "caption": "Dawn floods the valley end to end. On the height the temple doors stand open; every wing lifts into the light.",
        "echo": null,
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
        "caption": "Lamps gutter in the empty market. From the gates a voice keeps calling, up stairway after stairway, and the doors stay shut.",
        "echo": null,
        "prop": "city",
        "flare": false
      },
      {
        "title": "A Tree of Life",
        "caption": "On the terraces one tree holds its green. Its lowest branches lean out over the road, in reach of anyone passing.",
        "echo": "A tree of life, within reach again.",
        "prop": "tree",
        "flare": false
      },
      {
        "title": "Before the Deeps",
        "caption": "The well at the crossroads goes down past all rope. Far below, dark water shivers with a light older than the hills.",
        "echo": "A craftsman at his side, daily delighting.",
        "prop": "well",
        "flare": false
      },
      {
        "title": "Her Table Is Set",
        "caption": "On the highest terrace seven pillars stand open to the sky. A long table waits with bread and mixed wine, and no one has come.",
        "echo": "Come, eat the bread; drink the wine.",
        "prop": null,
        "flare": false
      },
      {
        "title": "The Sluggard's Vineyard",
        "caption": "Thorns have taken a hillside plot. The stone wall lies open to the road, and dew beads the nettles like a mock harvest.",
        "echo": null,
        "prop": "vineyard",
        "flare": false
      },
      {
        "title": "The Gathered Wind",
        "caption": "On the ridge above the city the wind suddenly stills, as if held in a fist. The stones keep a question they cannot answer.",
        "echo": "What is his name, and his son's?",
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
        "caption": "Four shadows cross the plain, each bringing worse news. A man tears his robe, sits down in the ashes, and blesses the Name.",
        "echo": "The blameless one is stricken.",
        "prop": "stones",
        "flare": false
      },
      {
        "title": "My Redeemer Lives",
        "caption": "Three friends sit in the dust seven days, saying nothing. Then the arguments blow like weather, and one cry cuts through them all.",
        "echo": "My redeemer lives, and shall stand on dust",
        "prop": null,
        "flare": false
      },
      {
        "title": "Out of the Whirlwind",
        "caption": "The standing storm bends low and asks of morning stars, sea-gates, the raven's food. When it lifts, the man prays for his friends, and the plain turns green.",
        "echo": "The sufferer prays; his friends are spared.",
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
        "caption": "The hills shake off winter. Vines break into blossom as a voice comes leaping from ridge to ridge, and every terrace turns toward it.",
        "echo": "The bridegroom comes over the mountains.",
        "prop": "vineyard",
        "flare": false
      },
      {
        "title": "A Seal on the Heart",
        "caption": "Night rivers rise against one small flame and fall back, quenching nothing. Morning finds it still burning on the mountains of spice.",
        "echo": "A love the grave cannot hold.",
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
        "caption": "A road winds down from the high country into green barley. Two lines of footprints hold close together, all the way in.",
        "echo": null,
        "prop": null,
        "flare": false
      },
      {
        "title": "Gleaning in the Barley",
        "caption": "Sheaves lean in the warm wind. Along the rows, handfuls of grain lie dropped — too many to be an accident.",
        "echo": "Bread left on purpose for the stranger",
        "prop": "well",
        "flare": false
      },
      {
        "title": "The Sandal at the Gate",
        "caption": "Morning light falls through the open gate onto a single sandal, left on the worn threshold. Beyond the wall the harvest stands finished, heavy and gold.",
        "echo": "The redeemer is near of kin",
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
        "caption": "The gates stand open onto empty streets. Ash drifts down the roads the pilgrims climbed.",
        "echo": "Is any sorrow like this sorrow?",
        "prop": "city",
        "flare": false
      },
      {
        "title": "New Every Morning",
        "caption": "Night lies heavy on the broken stones. Then, faithful as dew, a thin gray light returns.",
        "echo": "He gives his cheek to the smiter",
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
        "caption": "Mist moves through the king's vineyards and planted gardens, and the sun hurries to its setting. Every river runs to a sea that is never full.",
        "echo": null,
        "prop": "vineyard",
        "flare": false
      },
      {
        "title": "The Broken Pitcher",
        "caption": "A pitcher lies in shards at the well, the wheel gone still. Dust lifts from the road and settles back to earth.",
        "echo": "One Shepherd gave all these words.",
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
        "caption": "Feast-light pours from Susa's gates. Deep in the citadel, a crown settles on a name no one speaks.",
        "echo": null,
        "prop": "city",
        "flare": false
      },
      {
        "title": "The Gold Scepter",
        "caption": "Beyond the door waits the throne no one approaches and lives. Slowly, a gold scepter lowers toward the light.",
        "echo": "If I perish, I perish.",
        "prop": "throne",
        "flare": false
      },
      {
        "title": "Fifty Cubits High",
        "caption": "A gallows-tree goes up in a single night. By evening it bears the one who built it, and the streets break into feasting.",
        "echo": "On a tree, the curse undone.",
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
        "caption": "A furnace on the plain, heated seven times over. Through the open door, four shapes walk unbound in the white heat.",
        "echo": "One like a son of the gods.",
        "prop": "furnace",
        "flare": false
      },
      {
        "title": "Writing on the Wall",
        "caption": "Torchlight and gold cups in the banquet hall. Letters of fire appear on the plaster, and the music stops.",
        "echo": null,
        "prop": "wall",
        "flare": false
      },
      {
        "title": "The Den of Lions",
        "caption": "A stone seals the mouth of the pit. In the dark below, golden eyes wait all night, and no jaw opens.",
        "echo": "Sealed under stone, alive at dawn.",
        "prop": null,
        "flare": false
      },
      {
        "title": "One on the Clouds",
        "caption": "Four beasts climb from a churning night sea and fade. Fire streams from a throne, and the clouds carry one who does not fade.",
        "echo": "A kingdom that shall not pass away.",
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
        "caption": "The exiles return carrying silver and cedar. At the temple's bare foundation, weeping and shouting rise as one sound.",
        "echo": "A greater glory will fill this house.",
        "prop": "temple",
        "flare": false
      },
      {
        "title": "Sword and Trowel",
        "caption": "The wall climbs out of its own rubble. Each builder holds a trowel in one hand, a blade in the other.",
        "echo": null,
        "prop": "wall",
        "flare": false
      },
      {
        "title": "The Water Gate",
        "caption": "A wooden platform stands above the square. A scroll opens at first light; the crowd weeps, then feasts.",
        "echo": "The word is lifted up on wood.",
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
        "caption": "Standing stones fill the first valley, thousands of them, each cut with a name. The oldest reads Adam.",
        "echo": "the names run toward a son",
        "prop": "stones",
        "flare": false
      },
      {
        "title": "A House Promised",
        "caption": "An empty throne waits on a bare rise, facing a hill where nothing is built yet. Evening light gathers in the seat.",
        "echo": "the son's throne has no end",
        "prop": "throne",
        "flare": false
      },
      {
        "title": "The Threshing Floor",
        "caption": "Where the plague halted, an altar stands on bought ground, the sword over the hill sheathed. Fire answers from a clear sky.",
        "echo": "he will not offer what costs nothing",
        "prop": "altar",
        "flare": false
      },
      {
        "title": "Glory Fills the House",
        "caption": "Cedar and gold rise from the threshing floor. A cloud settles into the innermost room until the doors shine.",
        "echo": null,
        "prop": "temple",
        "flare": false
      },
      {
        "title": "The Long Sabbath",
        "caption": "Smoke where the gold was. The fallow terraces keep their sabbaths, seventy quiet years of them.",
        "echo": null,
        "prop": null,
        "flare": false
      },
      {
        "title": "Let Him Go Up",
        "caption": "A word crosses the empire like wind through grass. At the road's end a gate stands open, and the way climbs into light.",
        "echo": "a son will yet go up",
        "prop": "city",
        "flare": false
      }
    ]
  }
];
