import Level from './Level.js'
import Platform from '../Platform.js'
import Enemy from '../Enemy.js'
import FlyingEnemy from '../FlyingEnemy.js'
import Background from '../Background.js'
import BackgroundObject from '../BackgroundObject.js'
import blueBg from '../assets/Pixel Adventure 1/Background/Blue.png'
import bigClouds from '../assets/clouds/Big Clouds.png'
import cloud1 from '../assets/clouds/Small Cloud 1.png'
import cloud2 from '../assets/clouds/Small Cloud 2.png'
import cloud3 from '../assets/clouds/Small Cloud 3.png'

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
            new Background(this.game, null, {
                tiled: true,
                tileWidth: 64,
                tileHeight: 64,
                scrollSpeed: 0.3 // Långsam parallax (långt bort)
            }),
            // Mid background - stora moln
            new Background(this.game, bigClouds, {
                tiled: true,
                tileWidth: 448,
                tileHeight: 101,
                tileY: false, // Tila bara horisontellt
                scrollSpeed: 0.6, // Mellan-parallax
                yPosition: this.game.height - 141, // Precis ovanför marken
                height: 101
            })
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

        this.platforms = [
            // Marken (hela nivån)
            new Platform(this.game, 0, height - 40, worldWidth, 40, {sprite: {ground: true}}),
            
            // Plattformar (utspridda över nivån)
            new Platform(this.game, 150, height - 140, 128, 32, {sprite: {platform: true}}),
            new Platform(this.game, 400, height - 200, 128, 32, {sprite: {platform: true}}),
            new Platform(this.game, 100, height - 280, 96, 32, {sprite: {platform: true}}),
            new Platform(this.game, 550, height - 160, 96, 32, {sprite: {platform: true}}),
            new Platform(this.game, 350, height - 320, 160, 32, {sprite: {platform: true}}),
            // Nya plattformar längre bort
            new Platform(this.game, 900, height - 180, 160, 32, {sprite: {platform: true}}),
            new Platform(this.game, 1100, height - 240, 128, 32, {sprite: {platform: true}}),
            new Platform(this.game, 1300, height - 160, 96, 32, {sprite: {platform: true}}),
            new Platform(this.game, 1500, height - 280, 160, 32, {sprite: {platform: true}}),
            new Platform(this.game, 1750, height - 200, 128, 32, {sprite: {platform: true}}),
            new Platform(this.game, 1950, height - 320, 160, 32, {sprite: {platform: true}}),
            new Platform(this.game, 2150, height - 180, 96, 32, {sprite: {platform: true}}),
        ]
    }

    createEnemies() {
        const height = this.game.height
        const spawnPoints = [[200, 220], [1000, 440], [360, 200], [500, 400]]

        function random_choice(array) {
            const result = array[Math.floor(Math.random() * array.length)]

            return result
        };

        let coordinates

        if (this.game.currentWave < 3) {
            for (let i = 0; i <= this.enemyAmount; i++) {
                coordinates = random_choice(spawnPoints)

                let spawnX = coordinates[0]
                let spawnY = coordinates[1]

                this.enemies.push(new Enemy(this.game, spawnX + Math.floor(300 + Math.random() * 1000), height - spawnY + Math.floor(Math.random() * -200), 40, 40))
            }
        }

        else {
            for(let i = 0; i <= this.enemyAmount; i++) {
                coordinates = random_choice(spawnPoints)

                let spawnX = coordinates[0]
                let spawnY = coordinates[1]
                let result = Math.random()

                if (result < 0.5) {
                    this.enemies.push(new Enemy(this.game, spawnX + Math.floor(300 + Math.random() * 1000), height - spawnY + Math.floor(50 + Math.random() * -200), 40, 40))
                }

                else {
                    this.enemies.push(new FlyingEnemy(this.game, spawnX + Math.floor(300 + Math.random() * 1000), height - spawnY + Math.floor(50 + Math.random() * -200), 40, 40))
                }
            }
        }

        // this.enemies = [
        //     new Enemy(this.game, 200, height - 220, 40, 40, 80),
        //     new Enemy(this.game, 450, height - 240, 40, 40),
        //     new Enemy(this.game, 360, height - 440, 40, 40, 50),
        //     // Nya fiender längre bort
        //     new Enemy(this.game, 1000, height - 220, 40, 40, 100),
        //     new Enemy(this.game, 1400, height - 200, 40, 40),
        //     new Enemy(this.game, 1800, height - 240, 40, 40, 150),

        //     new FlyingEnemy(this.game, 100, height - 400, 40, 40, 100)
        // ]
    }
}
