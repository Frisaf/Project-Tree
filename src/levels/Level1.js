import Level from './Level.js'
import Platform from '../Platform.js'
import Enemy from '../Enemy.js'
import FlyingEnemy from '../FlyingEnemy.js'
import TankEnemy from '../TankEnemy.js'
import StrongFlyingEnemy from '../Strongflyenemy.js'
import Background from '../Background.js'
import BackgroundObject from '../BackgroundObject.js'

import dirt1 from "../assets/Project Tree/Environment/dirt1.png"

import background1 from "../assets/Project Tree/Environment/sky1.png"
import clouds1 from "../assets/Project Tree/Environment/clouds1.png"
import trees1 from "../assets/Project Tree/Environment/trees1.png"

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
            new Background(this.game, background1, {
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

    createBackgroundObjects() {
        const height = this.game.height

        this.backgroundObjects = [
            
        ]
    }

    createPlatforms() {
        const height = this.game.height
        const worldWidth = this.game.worldWidth

        this.dirtConfig = {
            image: dirt1,
            sourceWidth: 32,
            sourceHeight: 32,
            tile: "both"
        }

        new Platform(this.game, this.game.worldWidth / 2 - 128, height - 70, 288, 32, {sprite: {platform: true}}),
        this.platforms = [
            // Map Edge
            new Platform(this.game, 0, height - 40, worldWidth, 32, {sprite: {ground: true}}),
            new Platform(this.game, 0, height - 1576, worldWidth, 32, {sprite: {ground: true}}),
            new Platform(this.game, 0, height - 1536, 32, 1536, {sprite: {ground: true}}),
            new Platform(this.game, worldWidth, height - 1536, 32, 1536, {sprite: {ground: true}}),
            new Platform(this.game, 0, height - 8, worldWidth, 32, {sprite: this.dirtConfig}),
            // Left-side Platforms
            new Platform(this.game, this.game.worldWidth / 6 - 256, height - 266, 416, 64, {sprite: {platform: true}}),
            new Platform(this.game, this.game.worldWidth / 3 - 192, height - 500, 288, 32, {sprite: {platform: true}}),
            new Platform(this.game, this.game.worldWidth / 3 - 192, height - 1000, 288, 32, {sprite: {platform: true}}),
            new Platform(this.game, this.game.worldWidth / 6 - 256, height - 1266, 416, 64, {sprite: {platform: true}}),
            new Platform(this.game, this.game.worldWidth / 3 - 128, height - 250, 160, 32, {sprite: {platform: true}}),
            new Platform(this.game, this.game.worldWidth / 6 - 128, height - 500, 160, 32, {sprite: {platform: true}}),
            new Platform(this.game, this.game.worldWidth / 6 - 128, height - 1000, 160, 32, {sprite: {platform: true}}),
            new Platform(this.game, this.game.worldWidth / 3 - 128, height - 1250, 160, 32, {sprite: {platform: true}}),
            // Centre Platforms
            new Platform(this.game, this.game.worldWidth / 2 - 192, height - this.game.height + 32, 416, 64, {sprite: {platform: true}}),
            new Platform(this.game, this.game.worldWidth / 6 - 192, height - this.game.height + 48, 288, 32, {sprite: {platform: true}}),
            new Platform(this.game, this.game.worldWidth * 5 / 6 - 96, height - this.game.height + 48, 288, 32, {sprite: {platform: true}}),
            new Platform(this.game, this.game.worldWidth / 3 - 128, height - this.game.height + 48, 160, 32, {sprite: {platform: true}}),
            new Platform(this.game, this.game.worldWidth * 2 / 3 - 32, height - this.game.height + 48, 160, 32, {sprite: {platform: true}}),
            new Platform(this.game, this.game.worldWidth / 2 - 128, height - 1250, 288, 32, {sprite: {platform: true}}),
            // Right-side Platforms
            new Platform(this.game, this.game.worldWidth * 5 / 6 - 160, height - 266, 416, 64, {sprite: {platform: true}}),
            new Platform(this.game, this.game.worldWidth * 2 / 3 - 96, height - 500, 288, 32, {sprite: {platform: true}}),
            new Platform(this.game, this.game.worldWidth * 2 / 3 - 96, height - 1000, 288, 32, {sprite: {platform: true}}),
            new Platform(this.game, this.game.worldWidth * 5 / 6 - 160, height - 1266, 416, 64, {sprite: {platform: true}}), 
            new Platform(this.game, this.game.worldWidth * 2 / 3 - 32, height - 250, 160, 32, {sprite: {platform: true}}),
            new Platform(this.game, this.game.worldWidth * 5 / 6 - 32, height - 500, 160, 32, {sprite: {platform: true}}),
            new Platform(this.game, this.game.worldWidth * 5/ 6 - 32, height - 1000, 160, 32, {sprite: {platform: true}}),
            new Platform(this.game, this.game.worldWidth * 2/ 3 - 32, height - 1250, 160, 32, {sprite: {platform: true}}),
           
        ]
        for (let plat = 0; plat < 4; plat++) {
            this.platforms.push(new Platform(this.game, this.game.worldWidth / 2 - 224 + 32*plat, height - 70 - 32*plat, 448 - 64*plat, 32, {sprite: {platform: true}}),)
        }
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
                if (result < 0.25) {
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
