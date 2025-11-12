import { NextResponse } from 'next/server'

const MINECRAFT_KNOWLEDGE = `You are an expert Minecraft AI assistant with comprehensive knowledge about:

MINECRAFT BASICS:
- Game mechanics, crafting recipes, building techniques
- Survival and creative modes
- Biomes, mobs, and structures
- Combat, enchanting, and brewing
- Redstone engineering
- Farming and automation
- The Nether and End dimensions
- Boss battles (Ender Dragon, Wither, Warden)

MINECRAFT VERSIONS:
- Updates from Alpha to latest versions
- Major features added in each update
- Snapshot and preview information

POPULAR MODS:
- Technical mods: Create, Mekanism, Industrial Craft, Applied Energistics
- Magic mods: Thaumcraft, Botania, Ars Nouveau, Blood Magic
- Adventure mods: Twilight Forest, Aether, Biomes O' Plenty
- Utility mods: JEI, REI, Waystones, JourneyMap
- Performance mods: OptiFine, Sodium, Lithium
- Modpacks: Feed The Beast, All The Mods, SkyFactory, RLCraft

MOD LOADERS:
- Forge, Fabric, NeoForge, Quilt
- Installation and compatibility

SERVERS & MULTIPLAYER:
- Server setup and hosting
- Plugins (Bukkit, Spigot, Paper)
- Multiplayer gameplay tips

Provide detailed, accurate, and helpful responses. Include specific crafting recipes when asked. Explain mod features and how to use them. Give step-by-step instructions when appropriate.`

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface RequestBody {
  message: string
  history: Message[]
}

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json()
    const { message, history } = body

    // Build context from history
    let conversationContext = MINECRAFT_KNOWLEDGE + '\n\n'

    if (history.length > 0) {
      conversationContext += 'Previous conversation:\n'
      history.slice(-6).forEach(msg => {
        conversationContext += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n`
      })
    }

    conversationContext += `\nUser: ${message}\nAssistant:`

    // Generate response using AI knowledge base
    const response = generateMinecraftResponse(message, conversationContext)

    return NextResponse.json({ response })
  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}

function generateMinecraftResponse(question: string, context: string): string {
  const lowerQuestion = question.toLowerCase()

  // Crafting recipes
  if (lowerQuestion.includes('craft') || lowerQuestion.includes('recipe')) {
    if (lowerQuestion.includes('diamond pickaxe')) {
      return `To craft a Diamond Pickaxe, you need:
- 3 Diamonds
- 2 Sticks

Crafting pattern:
[D] [D] [D]
[ ] [S] [ ]
[ ] [S] [ ]

Where D = Diamond, S = Stick

Place the items in a crafting table in this pattern. Diamond pickaxes are essential for mining obsidian and ancient debris!`
    }
    if (lowerQuestion.includes('enchanting table') || lowerQuestion.includes('enchantment table')) {
      return `To craft an Enchanting Table, you need:
- 1 Book
- 2 Diamonds
- 4 Obsidian

Crafting pattern:
[ ] [B] [ ]
[D] [O] [D]
[O] [O] [O]

Where B = Book, D = Diamond, O = Obsidian

Surround it with bookshelves (up to 15) for maximum enchantment levels!`
    }
  }

  // Mods
  if (lowerQuestion.includes('mod')) {
    if (lowerQuestion.includes('create')) {
      return `The Create mod is a technology and decoration mod focusing on realistic mechanical engineering!

Key Features:
- Kinetic systems with rotational power
- Conveyor belts, mechanical arms, and deployers
- Trains and rail systems
- Crushing wheels, millstones, and mechanical presses
- Wind and water wheels for power generation
- Complex automation possibilities

Great for players who love building factories and contraptions. Works on Forge and Fabric (versions 1.16+).`
    }
    if (lowerQuestion.includes('aether')) {
      return `The Aether is a popular dimension mod that adds a heavenly floating island dimension!

Key Features:
- Access by building a glowstone portal and using water
- New mobs: Moas, Aerwhales, Zephyrs
- Dungeons with bosses (Slider, Valkyrie Queen)
- Unique blocks: Skyroot, Holystone, Ambrosium
- Flying pigs you can ride!
- Gravitite ore that floats upward

A classic adventure mod that's been around since early Minecraft. Available for modern versions through continued development.`
    }
    if (lowerQuestion.includes('optifine') || lowerQuestion.includes('performance')) {
      return `For Minecraft performance improvement, consider these mods:

**OptiFine** (Forge):
- HD textures, shaders support
- Better FPS, graphics settings
- Connected textures, custom sky
- Most popular performance mod

**Sodium** (Fabric):
- Massive FPS improvements
- Modern rendering engine
- Better than OptiFine for FPS

**Lithium** (Fabric):
- Server-side optimizations
- Reduces lag without changing mechanics

**Starlight** (Fabric/Forge):
- Rewrites lighting engine
- Eliminates lighting lag

For best results: Sodium + Lithium + Starlight on Fabric!`
    }
  }

  // Boss fights
  if (lowerQuestion.includes('ender dragon') || lowerQuestion.includes('dragon')) {
    return `Here's how to defeat the Ender Dragon:

**Preparation:**
- Full diamond/netherite armor with Protection IV
- Diamond/netherite sword with Sharpness V
- Bow with Power V and Infinity
- Slow Falling potions
- Healing potions and golden apples
- Blocks for towering

**Strategy:**
1. Destroy End Crystals on obsidian pillars (some in cages)
2. Shoot dragon when perched on portal
3. Hit dragon when it dives at you
4. Avoid dragon's breath (purple clouds)
5. Use Slow Falling when knocked into the air
6. Collect dragon's breath with bottles (useful for potions)

After defeating it, you get 12,000 XP and access to End Cities via End Gateway portals!`
  }

  if (lowerQuestion.includes('wither')) {
    return `Here's how to summon and defeat the Wither:

**Summoning:**
Place 4 Soul Sand in a T-shape, then place 3 Wither Skeleton Skulls on top:
[S] [S] [S]
    [S]

**Preparation:**
- Full netherite armor with Blast Protection
- Smite V sword (undead damage)
- Bow with Power V
- Strength II and Regeneration potions
- Golden apples and milk (removes Wither effect)

**Strategy:**
1. Spawn underground or in a enclosed space
2. When health drops to 50%, it gains Wither Armor (immune to arrows)
3. Switch to melee combat
4. Dodge Wither projectiles (cause Wither effect)
5. Drink milk to remove Wither debuff

Drops a Nether Star - used to craft Beacons!`
  }

  // Updates
  if (lowerQuestion.includes('1.20') || lowerQuestion.includes('update')) {
    return `Minecraft 1.20 - Trails & Tales Update (June 2023):

**Major Features:**
- **Archaeology**: Suspicious sand/gravel with brush tool
- **Cherry Blossom biome**: Pink trees, new wood type
- **Armor Trims**: Customize armor appearance
- **Smithing Template**: New smithing table recipes
- **Hanging Signs**: Decorative signage
- **Camels**: 2-player rideable mobs
- **Sniffers**: Ancient mob from eggs, finds ancient seeds
- **Bamboo wood set**: Full wood variant
- **Chiseled Bookshelves**: Interactive book storage

Latest version (1.21) added:
- Trial Chambers
- The Breeze mob
- Mace weapon
- Copper and Tuff blocks`
  }

  // Redstone
  if (lowerQuestion.includes('redstone')) {
    return `Redstone is Minecraft's electrical system for creating circuits and contraptions!

**Basic Components:**
- Redstone Dust: Transmits signal 15 blocks
- Torch: Power source, inverts signal
- Repeater: Delays and extends signal
- Comparator: Compares signals, reads containers
- Lever/Button: Manual activation
- Observer: Detects block updates
- Piston/Sticky Piston: Moves blocks

**Common Builds:**
- Automatic doors
- Hidden staircases
- Item sorters
- Farms (wheat, melon, pumpkin)
- Mob grinders
- Combination locks
- Flying machines

**Pro Tips:**
- Use hoppers for item transport
- Observers detect block changes instantly
- Comparators can subtract signals
- Target blocks emit signal strength based on projectile hits

Redstone can be incredibly complex - start simple and experiment!`
  }

  // Farming
  if (lowerQuestion.includes('farm') && !lowerQuestion.includes('mod')) {
    return `Here are essential Minecraft farms:

**Food Farms:**
- Wheat/Carrot/Potato: 9x9 with water in center
- Sugarcane: Plant next to water
- Pumpkin/Melon: Needs space to grow adjacent

**Mob Farms:**
- Basic: Dark spawning platform with fall damage
- Advanced: Use water streams, hoppers for collection
- Iron Farm: Village mechanics, requires villagers + zombie

**Automated Farms:**
- Observer + Piston for sugarcane/bamboo
- Villager trading halls for emeralds
- Creeper farm for gunpowder (use cats to scare away)

**Animal Farms:**
- Breeding with wheat (cows/sheep), seeds (chickens), carrots (pigs)
- Automatic egg collector with hoppers
- Honey farm with beehives and flowers

**Pro Tip:** Use Fortune III pickaxe for more drops from crops like melons, glowstone, and diamonds!`
  }

  // Enchanting
  if (lowerQuestion.includes('enchant')) {
    return `Minecraft Enchanting Guide:

**Best Weapon Enchantments:**
- Sword: Sharpness V, Looting III, Sweeping Edge III, Unbreaking III, Mending
- Bow: Power V, Infinity/Mending, Flame, Punch II, Unbreaking III
- Trident: Loyalty III/Riptide III, Impaling V, Channeling, Unbreaking III, Mending

**Best Armor Enchantments:**
- Helmet: Protection IV, Respiration III, Aqua Affinity, Unbreaking III, Mending
- Chestplate: Protection IV, Unbreaking III, Mending
- Leggings: Protection IV, Unbreaking III, Mending
- Boots: Protection IV, Feather Falling IV, Depth Strider III, Unbreaking III, Mending

**Best Tool Enchantments:**
- Pickaxe: Efficiency V, Fortune III/Silk Touch, Unbreaking III, Mending
- Axe: Efficiency V, Silk Touch, Unbreaking III, Mending
- Shovel: Efficiency V, Silk Touch, Unbreaking III, Mending

**Tips:**
- Use 15 bookshelves for max level (30)
- Lapis Lazuli required for enchanting
- Grindstone removes enchantments
- Combine books in anvil for better enchants`
  }

  // General fallback with helpful information
  return `I'm your Minecraft AI assistant! I can help you with:

🔨 **Crafting & Recipes** - Ask about any item crafting
⚔️ **Combat & Bosses** - Strategies for Ender Dragon, Wither, Warden
🏗️ **Building & Redstone** - Contraptions and automation
🌍 **Exploration** - Biomes, structures, dimensions
✨ **Enchanting & Potions** - Best enchantments and brewing
🎮 **Mods** - Information about popular mods like Create, Aether, OptiFine, etc.
🌾 **Farming** - Automatic and manual farm designs
📦 **Mod Loaders** - Forge, Fabric, installation help

Examples:
- "How do I craft a diamond pickaxe?"
- "What is the Create mod?"
- "How do I beat the Ender Dragon?"
- "Best enchantments for armor?"
- "How to install Forge mods?"

Ask me anything specific about Minecraft or its mods!`
}
