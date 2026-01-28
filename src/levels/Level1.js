import Level from './Level.js'
import Platform from '../Platform.js'
import Enemy from '../Enemy.js'
import FlyingEnemy from '../FlyingEnemy.js'
import TankEnemy from '../TankEnemy.js'
import StrongFlyingEnemy from '../Strongflyenemy.js'
import Background from '../Background.js'
import BackgroundObject from '../BackgroundObject.js'

// Stage 1 environment
import dirt1 from "../assets/Project Tree/Environment/dirt1.png"
import ground1 from "../assets/Project Tree/Environment/ground1.png"
import platform1 from "../assets/Project Tree/Environment/platform1.png"
import sky1 from "../assets/Project Tree/Environment/sky1.png"
import trees1 from "../assets/Project Tree/Environment/trees1.png"
import clouds1 from "../assets/Project Tree/Environment/clouds1.png"

// Stage 2 environment
import dirt2 from "../assets/Project Tree/Environment/dirt2.png"
import ground2 from "../assets/Project Tree/Environment/ground2.png"
import platform2 from "../assets/Project Tree/Environment/platform2.png"
import sky2 from "../assets/Project Tree/Environment/sky2.png"
import trees2 from "../assets/Project Tree/Environment/trees2.png"
import clouds2 from "../assets/Project Tree/Environment/clouds2.png"

// Stage 3 environment
import dirt3 from "../assets/Project Tree/Environment/dirt3.png"
import ground3 from "../assets/Project Tree/Environment/ground3.png"
import platform3 from "../assets/Project Tree/Environment/platform3.png"
import sky3 from "../assets/Project Tree/Environment/sky3.png"
import trees3 from "../assets/Project Tree/Environment/trees3.png"
import clouds3 from "../assets/Project Tree/Environment/clouds3.png"

// Stage 4 environment
import dirt4 from "../assets/Project Tree/Environment/dirt4.png"
import ground4 from "../assets/Project Tree/Environment/ground4.png"
import platform4 from "../assets/Project Tree/Environment/platform4.png"
import sky4 from "../assets/Project Tree/Environment/sky4.png"
import trees4 from "../assets/Project Tree/Environment/trees4.png"
import clouds4 from "../assets/Project Tree/Environment/clouds4.png"

/**
 * Level 1 - Den första nivån i spelet
 * Enklare layout för att introducera spelmekaniker
 */
export default class Level1 extends Level {
    constructor(game) {
        super(game)
        
        // Player spawn position för denna level
        this.playerSpawnX = 1600
        this.playerSpawnY = -200

        this.enemies = []
        
        // Initiera level
        this.init()
    }

    createBackgrounds() {
        this.backgrounds = [
            // Far background
            new Background(this.game, sky1, {
                scrollSpeed: 0, // Långsam parallax (långt bort)
                tiled: true,
            }),
            new Background(this.game, clouds1, {
                scrollSpeed: 0,
                tiled: false,
                yPosition: 0
            }),
            new Background(this.game, trees1, {
                scroolSpeed: 0.7,
                tiled: false
            })
        ]
    }

    createBackgrounds2() {
        this.backgrounds = [
            // Far background
            new Background(this.game, sky2, {
                scrollSpeed: 0, // Långsam parallax (långt bort)
                tiled: true,
            }),
            new Background(this.game, clouds2, {
                scrollSpeed: 0,
                tiled: false,
                yPosition: 0
            }),
            new Background(this.game, trees2, {
                scroolSpeed: 0.7,
                tiled: false
            })
        ]

        return this.backgrounds
    }

    createBackgrounds3() {
        this.backgrounds = [
            // Far background
            new Background(this.game, sky3, {
                scrollSpeed: 0, // Långsam parallax (långt bort)
                tiled: true,
            }),
            new Background(this.game, clouds3, {
                scrollSpeed: 0,
                tiled: false,
                yPosition: 0
            }),
            new Background(this.game, trees3, {
                scroolSpeed: 0.7,
                tiled: false
            })
        ]

        return this.backgrounds
    }

    createBackgrounds4() {
        this.backgrounds = [
            // Far background
            new Background(this.game, sky4, {
                scrollSpeed: 0, // Långsam parallax (långt bort)
                tiled: true,
            }),
            new Background(this.game, clouds4, {
                scrollSpeed: 0,
                tiled: false,
                yPosition: 0
            }),
            new Background(this.game, trees4, {
                scroolSpeed: 0.7,
                tiled: false
            })
        ]

        return this.backgrounds
    }

    createBackgroundObjects() {
        const height = this.game.height

        this.backgroundObjects = [
            
        ]
    }

    createPlatforms() {
        const height = this.game.height
        const worldWidth = this.game.worldWidth

        const dirtConfig = {
            image: dirt1,
            sourceWidth: 32,
            sourceHeight: 32,
            tile: "both"
        }

        const groundConfig = {
            image: ground1,
            sourceWidth: 32,
            sourceHeight: 32,
            tile: "both",
        }
        const platformConfig = {
            image: platform1,
            sourceWidth: 32,
            sourceHeight: 32,
            tile: "both",
        }

        this.platforms = [
            // Map Edge
            new Platform(this.game, 0, height - 40, worldWidth, 32, {sprite: groundConfig}),
            new Platform(this.game, 0, height - 1576, worldWidth, 32, {sprite: groundConfig}),
            new Platform(this.game, 0, height - 1536, 32, 1536, {sprite: groundConfig}),
            new Platform(this.game, worldWidth, height - 1536, 32, 1536, {sprite: groundConfig}),
            new Platform(this.game, 0, height - 8, worldWidth, 32, {sprite: dirtConfig}),
            // Left-side Platforms
            new Platform(this.game, this.game.worldWidth / 6 - 256, height - 266, 416, 64, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth / 3 - 192, height - 500, 288, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth / 3 - 192, height - 1000, 288, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth / 6 - 256, height - 1266, 416, 64, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth / 3 - 128, height - 250, 160, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth / 6 - 128, height - 500, 160, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth / 6 - 128, height - 1000, 160, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth / 3 - 128, height - 1250, 160, 32, {sprite: platformConfig}),
            // Centre Platforms
            new Platform(this.game, this.game.worldWidth / 2 - 128, height - 70, 288, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth / 2 - 192, height - this.game.height + 32, 416, 64, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth / 6 - 192, height - this.game.height + 48, 288, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth * 5 / 6 - 96, height - this.game.height + 48, 288, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth / 3 - 128, height - this.game.height + 48, 160, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth * 2 / 3 - 32, height - this.game.height + 48, 160, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth / 2 - 128, height - 1250, 288, 32, {sprite: platformConfig}),
            // Right-side Platforms
            new Platform(this.game, this.game.worldWidth * 5 / 6 - 160, height - 266, 416, 64, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth * 2 / 3 - 96, height - 500, 288, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth * 2 / 3 - 96, height - 1000, 288, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth * 5 / 6 - 160, height - 1266, 416, 64, {sprite: platformConfig}), 
            new Platform(this.game, this.game.worldWidth * 2 / 3 - 32, height - 250, 160, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth * 5 / 6 - 32, height - 500, 160, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth * 5/ 6 - 32, height - 1000, 160, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth * 2/ 3 - 32, height - 1250, 160, 32, {sprite: platformConfig}),
           
        ]
        for (let plat = 0; plat < 4; plat++) {
            this.platforms.push(new Platform(this.game, this.game.worldWidth / 2 - 224 + 32*plat, height - 70 - 32*plat, 448 - 64*plat, 32, {sprite: platformConfig}),)
        }

        return this.platforms
    }

    createPlatforms2() {
        const height = this.game.height
        const worldWidth = this.game.worldWidth

        const dirtConfig = {
            image: dirt2,
            sourceWidth: 32,
            sourceHeight: 32,
            tile: "both"
        }

        const groundConfig = {
            image: ground2,
            sourceWidth: 32,
            sourceHeight: 32,
            tile: "both",
        }
        const platformConfig = {
            image: platform2,
            sourceWidth: 32,
            sourceHeight: 32,
            tile: "both",
        }

        this.platforms = [
            // Map Edge
            new Platform(this.game, 0, height - 40, worldWidth, 32, {sprite: groundConfig}),
            new Platform(this.game, 0, height - 1576, worldWidth, 32, {sprite: groundConfig}),
            new Platform(this.game, 0, height - 1536, 32, 1536, {sprite: groundConfig}),
            new Platform(this.game, worldWidth, height - 1536, 32, 1536, {sprite: groundConfig}),
            new Platform(this.game, 0, height - 8, worldWidth, 32, {sprite: dirtConfig}),
            // Left-side Platforms
            new Platform(this.game, this.game.worldWidth / 6 - 256, height - 266, 416, 64, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth / 3 - 192, height - 500, 288, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth / 3 - 192, height - 1000, 288, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth / 6 - 256, height - 1266, 416, 64, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth / 3 - 128, height - 250, 160, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth / 6 - 128, height - 500, 160, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth / 6 - 128, height - 1000, 160, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth / 3 - 128, height - 1250, 160, 32, {sprite: platformConfig}),
            // Centre Platforms
            new Platform(this.game, this.game.worldWidth / 2 - 128, height - 70, 288, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth / 2 - 192, height - this.game.height + 32, 416, 64, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth / 6 - 192, height - this.game.height + 48, 288, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth * 5 / 6 - 96, height - this.game.height + 48, 288, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth / 3 - 128, height - this.game.height + 48, 160, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth * 2 / 3 - 32, height - this.game.height + 48, 160, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth / 2 - 128, height - 1250, 288, 32, {sprite: platformConfig}),
            // Right-side Platforms
            new Platform(this.game, this.game.worldWidth * 5 / 6 - 160, height - 266, 416, 64, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth * 2 / 3 - 96, height - 500, 288, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth * 2 / 3 - 96, height - 1000, 288, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth * 5 / 6 - 160, height - 1266, 416, 64, {sprite: platformConfig}), 
            new Platform(this.game, this.game.worldWidth * 2 / 3 - 32, height - 250, 160, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth * 5 / 6 - 32, height - 500, 160, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth * 5/ 6 - 32, height - 1000, 160, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth * 2/ 3 - 32, height - 1250, 160, 32, {sprite: platformConfig}),
           
        ]
        for (let plat = 0; plat < 4; plat++) {
            this.platforms.push(new Platform(this.game, this.game.worldWidth / 2 - 224 + 32*plat, height - 70 - 32*plat, 448 - 64*plat, 32, {sprite: platformConfig}),)
        }

        return this.platforms
    }

    createPlatforms3() {
        const height = this.game.height
        const worldWidth = this.game.worldWidth

        const dirtConfig = {
            image: dirt3,
            sourceWidth: 32,
            sourceHeight: 32,
            tile: "both"
        }

        const groundConfig = {
            image: ground3,
            sourceWidth: 32,
            sourceHeight: 32,
            tile: "both",
        }
        const platformConfig = {
            image: platform3,
            sourceWidth: 32,
            sourceHeight: 32,
            tile: "both",
        }

        this.platforms = [
            // Map Edge
            new Platform(this.game, 0, height - 40, worldWidth, 32, {sprite: groundConfig}),
            new Platform(this.game, 0, height - 1576, worldWidth, 32, {sprite: groundConfig}),
            new Platform(this.game, 0, height - 1536, 32, 1536, {sprite: groundConfig}),
            new Platform(this.game, worldWidth, height - 1536, 32, 1536, {sprite: groundConfig}),
            new Platform(this.game, 0, height - 8, worldWidth, 32, {sprite: dirtConfig}),
            // Left-side Platforms
            new Platform(this.game, this.game.worldWidth / 6 - 256, height - 266, 416, 64, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth / 3 - 192, height - 500, 288, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth / 3 - 192, height - 1000, 288, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth / 6 - 256, height - 1266, 416, 64, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth / 3 - 128, height - 250, 160, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth / 6 - 128, height - 500, 160, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth / 6 - 128, height - 1000, 160, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth / 3 - 128, height - 1250, 160, 32, {sprite: platformConfig}),
            // Centre Platforms
            new Platform(this.game, this.game.worldWidth / 2 - 128, height - 70, 288, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth / 2 - 192, height - this.game.height + 32, 416, 64, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth / 6 - 192, height - this.game.height + 48, 288, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth * 5 / 6 - 96, height - this.game.height + 48, 288, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth / 3 - 128, height - this.game.height + 48, 160, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth * 2 / 3 - 32, height - this.game.height + 48, 160, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth / 2 - 128, height - 1250, 288, 32, {sprite: platformConfig}),
            // Right-side Platforms
            new Platform(this.game, this.game.worldWidth * 5 / 6 - 160, height - 266, 416, 64, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth * 2 / 3 - 96, height - 500, 288, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth * 2 / 3 - 96, height - 1000, 288, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth * 5 / 6 - 160, height - 1266, 416, 64, {sprite: platformConfig}), 
            new Platform(this.game, this.game.worldWidth * 2 / 3 - 32, height - 250, 160, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth * 5 / 6 - 32, height - 500, 160, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth * 5/ 6 - 32, height - 1000, 160, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth * 2/ 3 - 32, height - 1250, 160, 32, {sprite: platformConfig}),
           
        ]
        for (let plat = 0; plat < 4; plat++) {
            this.platforms.push(new Platform(this.game, this.game.worldWidth / 2 - 224 + 32*plat, height - 70 - 32*plat, 448 - 64*plat, 32, {sprite: platformConfig}),)
        }

        return this.platforms
    }

    createPlatforms4() {
        const height = this.game.height
        const worldWidth = this.game.worldWidth

        const dirtConfig = {
            image: dirt4,
            sourceWidth: 32,
            sourceHeight: 32,
            tile: "both"
        }

        const groundConfig = {
            image: ground4,
            sourceWidth: 32,
            sourceHeight: 32,
            tile: "both",
        }
        const platformConfig = {
            image: platform4,
            sourceWidth: 32,
            sourceHeight: 32,
            tile: "both",
        }

        this.platforms = [
            // Map Edge
            new Platform(this.game, 0, height - 40, worldWidth, 32, {sprite: groundConfig}),
            new Platform(this.game, 0, height - 1576, worldWidth, 32, {sprite: groundConfig}),
            new Platform(this.game, 0, height - 1536, 32, 1536, {sprite: groundConfig}),
            new Platform(this.game, worldWidth, height - 1536, 32, 1536, {sprite: groundConfig}),
            new Platform(this.game, 0, height - 8, worldWidth, 32, {sprite: dirtConfig}),
            // Left-side Platforms
            new Platform(this.game, this.game.worldWidth / 6 - 256, height - 266, 416, 64, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth / 3 - 192, height - 500, 288, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth / 3 - 192, height - 1000, 288, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth / 6 - 256, height - 1266, 416, 64, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth / 3 - 128, height - 250, 160, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth / 6 - 128, height - 500, 160, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth / 6 - 128, height - 1000, 160, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth / 3 - 128, height - 1250, 160, 32, {sprite: platformConfig}),
            // Centre Platforms
            new Platform(this.game, this.game.worldWidth / 2 - 128, height - 70, 288, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth / 2 - 192, height - this.game.height + 32, 416, 64, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth / 6 - 192, height - this.game.height + 48, 288, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth * 5 / 6 - 96, height - this.game.height + 48, 288, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth / 3 - 128, height - this.game.height + 48, 160, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth * 2 / 3 - 32, height - this.game.height + 48, 160, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth / 2 - 128, height - 1250, 288, 32, {sprite: platformConfig}),
            // Right-side Platforms
            new Platform(this.game, this.game.worldWidth * 5 / 6 - 160, height - 266, 416, 64, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth * 2 / 3 - 96, height - 500, 288, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth * 2 / 3 - 96, height - 1000, 288, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth * 5 / 6 - 160, height - 1266, 416, 64, {sprite: platformConfig}), 
            new Platform(this.game, this.game.worldWidth * 2 / 3 - 32, height - 250, 160, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth * 5 / 6 - 32, height - 500, 160, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth * 5/ 6 - 32, height - 1000, 160, 32, {sprite: platformConfig}),
            new Platform(this.game, this.game.worldWidth * 2/ 3 - 32, height - 1250, 160, 32, {sprite: platformConfig}),
           
        ]
        for (let plat = 0; plat < 4; plat++) {
            this.platforms.push(new Platform(this.game, this.game.worldWidth / 2 - 224 + 32*plat, height - 70 - 32*plat, 448 - 64*plat, 32, {sprite: platformConfig}),)
        }

        return this.platforms
    }

    createEnemies() {
        const height = this.game.height
        const spawnPoints = [[-30, 300], [-30, 1350], [2200, 300], [2200, 1350]]
        function random_choice(array) {
            const result = array[Math.floor(Math.random() * array.length)]
            return result
        };

        let coordinates
        let result
        // Bara basic enemies
        if (this.game.currentWave <= 3) {
            for (let i = 0; i <= this.enemyAmount; i++) {
                coordinates = random_choice(spawnPoints)
                let spawnX = coordinates[0]
                let spawnY = coordinates[1]
                this.enemies.push(new Enemy(this.game, spawnX + Math.floor(300 + Math.random() * 400), height - spawnY + Math.floor(Math.random() * -200), 40, 40))
            }
        }
        // Bara flying och basic
        else if (this.game.currentWave > 3 && this.game.currentWave <= 5) { 
            for(let i = 0; i <= this.enemyAmount; i++) {
                coordinates = random_choice(spawnPoints)
                let spawnX = coordinates[0]
                let spawnY = coordinates[1]
                result = Math.random()
                if (result < 0.5) {
                    this.enemies.push(new Enemy(this.game, spawnX + Math.floor(300 + Math.random() * 400), height - spawnY + Math.floor(50 + Math.random() * -200), 40, 40))
                } else {
                    this.enemies.push(new FlyingEnemy(this.game, spawnX + Math.floor(300 + Math.random() * 400), height - spawnY + Math.floor(50 + Math.random() * -200), 40, 40))
                }
            }
        }
        // Alla enemies
        else if (this.game.currentWave > 5 && this.game.currentWave <=7) { 
            for(let i = 0; i <= this.enemyAmount; i++) {
                coordinates = random_choice(spawnPoints)
                let spawnX = coordinates[0]
                let spawnY = coordinates[1]
                result = Math.random()
                if (result < 0.33) {
                    this.enemies.push(new Enemy(this.game, spawnX + Math.floor(300 + Math.random() * 400), height - spawnY + Math.floor(50 + Math.random() * -200), 40, 40))
                } else if (result < 0.66) {
                    this.enemies.push(new FlyingEnemy(this.game, spawnX + Math.floor(300 + Math.random() * 400), height - spawnY + Math.floor(50 + Math.random() * -200), 40, 40))
                } else {
                    this.enemies.push(new TankEnemy(this.game, spawnX + Math.floor(300 + Math.random() * 400), height - spawnY + Math.floor(50 + Math.random() * -200), 80, 80))
                }
            }
        } else {
            for (let i = 0; i <= this.enemyAmount; i++) {
                coordinates = random_choice(spawnPoints)
                let spawnX = coordinates[0]
                let spawnY = coordinates[1]
                result = Math.random()
                if (result < 0.20) {
                    this.enemies.push(new Enemy(this.game, spawnX + Math.floor(300 + Math.random() * 400), height - spawnY + Math.floor(50 + Math.random() * -200), 40, 40))
                } else if (result < 0.5) {
                    this.enemies.push(new FlyingEnemy(this.game, spawnX + Math.floor(300 + Math.random() * 400), height - spawnY + Math.floor(50 + Math.random() * -200), 40, 40))
                } else if (result < 0.75) {
                    this.enemies.push(new TankEnemy(this.game, spawnX + Math.floor(300 + Math.random() * 400), height - spawnY + Math.floor(50 + Math.random() * -200), 80, 80))
                } else {
                    this.enemies.push(new StrongFlyingEnemy(this.game, spawnX + Math.floor(300 + Math.random() * 400), height - spawnY + Math.floor(50 + Math.random() * -200), 40, 40))
                }
            }
        }

    }
}
