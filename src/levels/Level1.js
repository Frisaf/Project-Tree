import Level from './Level.js'
import Platform from '../Platform.js'
import Enemy from '../Enemy.js'
import FlyingEnemy from '../FlyingEnemy.js'
import TankEnemy from '../TankEnemy.js'
import Background from '../Background.js'
import BackgroundObject from '../BackgroundObject.js'
import bigClouds from '../assets/clouds/Big Clouds.png'
import cloud1 from '../assets/clouds/Small Cloud 1.png'
import cloud2 from '../assets/clouds/Small Cloud 2.png'
import cloud3 from '../assets/clouds/Small Cloud 3.png'
import backgroundImage from "../assets//Project Tree/Environment/background1.png"

/**
 * Level 1 - Den första nivån i spelet
 * Enklare layout för att introducera spelmekaniker
 */
export default class Level1 extends Level {
    constructor(game) {
        super(game)
        
        // Player spawn position för denna level
        this.playerSpawnX = 50
        this.playerSpawnY = 50

        this.enemies = []
        
        // Initiera level
        this.init()
    }

    createBackgrounds() {
        this.backgrounds = [
            // Far background - blå himmel
            new Background(this.game, backgroundImage, {
                tiled: false,
                tileWidth: 64,
                tileHeight: 64,
                scrollSpeed: 0.3 // Långsam parallax (långt bort)
            }),
        ]
    }

    createBackgroundObjects() {
        const height = this.game.height

        this.backgroundObjects = [
            // Små moln som rör sig oberoende
            new BackgroundObject(this.game, 200, height - 300, cloud1, {
                speed: 0.02,
                scrollSpeed: 0.4
            }),
            new BackgroundObject(this.game, 600, height - 250, cloud2, {
                speed: 0.015,
                scrollSpeed: 0.4
            }),
            new BackgroundObject(this.game, 1200, height - 280, cloud3, {
                speed: 0.018,
                scrollSpeed: 0.4
            }),
            new BackgroundObject(this.game, 1800, height - 320, cloud1, {
                speed: 0.022,
                scrollSpeed: 0.4
            }),
            new BackgroundObject(this.game, 2200, height - 260, cloud2, {
                speed: 0.016,
                scrollSpeed: 0.4
            })
        ]
    }

    createPlatforms() {
        const height = this.game.height
        const worldWidth = this.game.worldWidth
        new Platform(this.game, this.game.worldWidth / 2 - 128, height - 70, 288, 32, {sprite: {platform: true}}),
        this.platforms = [
            // Map Edge
            new Platform(this.game, 0, height - 40, worldWidth, 32, {sprite: {ground: true}}),
            new Platform(this.game, 0, height - 1576, worldWidth, 32, {sprite: {ground: true}}),
            new Platform(this.game, 0, height - 1536, 32, 1536, {sprite: {ground: true}}),
            new Platform(this.game, worldWidth, height - 1536, 32, 1536, {sprite: {ground: true}}),
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
        const spawnPoints = [[250, 220], [1000, 440], [360, 200], [500, 900]]

        function random_choice(array) {
            const result = array[Math.floor(Math.random() * array.length)]

            return result
        };

        let coordinates

        // Bara basic enemies
        if (this.game.currentWave <= 3) {
            for (let i = 0; i <= this.enemyAmount; i++) {
                coordinates = random_choice(spawnPoints)

                let spawnX = coordinates[0]
                let spawnY = coordinates[1]

                this.enemies.push(new Enemy(this.game, spawnX + Math.floor(300 + Math.random() * 1000), height - spawnY + Math.floor(Math.random() * -200), 40, 40))
            }
        }
        // Bara flying och basic
        else if (this.game.currentWave > 3 && this.game.currentWave <= 5) { 
            for(let i = 0; i <= this.enemyAmount; i++) {
                coordinates = random_choice(spawnPoints)
                let spawnX = coordinates[0]
                let spawnY = coordinates[1]
                let result = Math.random()

                if (result < 0.5) {
                    this.enemies.push(new Enemy(this.game, spawnX + Math.floor(300 + Math.random() * 1000), height - spawnY + Math.floor(50 + Math.random() * -200), 40, 40))
                } else {
                    this.enemies.push(new FlyingEnemy(this.game, spawnX + Math.floor(300 + Math.random() * 1000), height - spawnY + Math.floor(50 + Math.random() * -200), 40, 40))
                }
            }
        }
        // Alla enemies
        else { 
            for(let i = 0; i <= this.enemyAmount; i++) {
                coordinates = random_choice(spawnPoints)
                let spawnX = coordinates[0]
                let spawnY = coordinates[1]
                let result = Math.random()

                if (result < 0.33) {
                    this.enemies.push(new Enemy(this.game, spawnX + Math.floor(300 + Math.random() * 1000), height - spawnY + Math.floor(50 + Math.random() * -200), 40, 40))
                } else if (result < 0.66) {
                    this.enemies.push(new FlyingEnemy(this.game, spawnX + Math.floor(300 + Math.random() * 1000), height - spawnY + Math.floor(50 + Math.random() * -200), 40, 40))
                } else {
                    this.enemies.push(new TankEnemy(this.game, spawnX + Math.floor(300 + Math.random() * 1000), height - spawnY + Math.floor(50 + Math.random() * -200), 80, 80))
                }
            }
        }

    }
}
