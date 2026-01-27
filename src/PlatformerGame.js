import GameBase from './GameBase.js'
import Player from './Player.js'
import WaterDrop from './WaterDrop.js'
import Projectile from './Projectile.js'
import Level1 from './levels/Level1.js'
import MainMenu from './menus/MainMenu.js'
import SaveGameManager from './SaveGameManager.js'
import Gun from './Gun.js'

// gun sprites
import startGunSprite from "./assets/Project Tree/gun_start.png"
import gunSprite2 from "./assets/Project Tree/gun2.png"
import gunSprite3 from "./assets/Project Tree/gun3.png"
import gunSprite4 from "./assets/Project Tree/gun4.png"

/**
 * PlatformerGame - En konkret implementation av GameBase för plattformsspel
 * Innehåller plattformsspel-specifik logik som gravity, platforms, coins
 * Använder Level-system för att hantera olika nivåer
 */
export default class PlatformerGame extends GameBase {
    constructor(width, height) {
        super(width, height)
        
        // Plattformsspel behöver en större värld för sidoscrolling
        this.worldWidth = width * 2
        this.worldHeight = height
        this.camera.setWorldBounds(this.worldWidth, this.worldHeight)
        
        // Plattformsspel-specifik fysik
        this.gravity = 0.001 // pixels per millisekund^2
        this.friction = 0.00015 // luftmotstånd för att bromsa fallhastighet
        
        // Level management
        this.currentLevelIndex = 0
        this.levels = [Level1] // Array av level-klasser
        this.currentLevel = null

        this.currentWave = 1
        this.enemiesDefeated = 0
        this.wavecooldown = 0
        this.wavetimer = 5000 // 5 sekunder mellan waves
        this.wavespace = false
        
        // Plattformsspel-specifika arrays
        this.platforms = []
        this.projectiles = []
        this.waterDrops = []
        
        // Background arrays (sätts av levels)
        this.backgrounds = []
        this.backgroundObjects = []
        
        // Save game system
        this.saveManager = new SaveGameManager('platformer-save')
        
        // Initiera spelet
        this.init()
        
        // Skapa och visa huvudmenyn
        this.currentMenu = new MainMenu(this)

        this.gunConfigs = [ // stage 2 and up
            {
                image: gunSprite2,
                sourceWidth: 112,
                sourceHeight: 21
            },
            {
                image: gunSprite3,
                sourceWidth: 134,
                sourceHeight: 24
            },
            {
                image: gunSprite4,
                sourceWidth: 138,
                sourceHeight: 35
            }
        ]
    }
    
    init() {
        // Återställ score (men inte game state - det hanteras av constructor/restart)
        this.score = 0
        
        // Återställ camera
        this.camera.x = 0
        this.camera.y = 0
        this.camera.targetX = 0
        this.camera.targetY = 0

        // Ladda current level
        this.loadLevel(this.currentLevelIndex)
    }
    
    loadLevel(levelIndex) {
        // Säkerställ att level index är giltigt
        if (levelIndex < 0 || levelIndex >= this.levels.length) {
            console.error(`Level ${levelIndex} finns inte`)
            return
        }
        
        // Skapa ny level instance
        const LevelClass = this.levels[levelIndex]
        this.currentLevel = new LevelClass(this)
        
        // Hämta level data
        const levelData = this.currentLevel.getData()
        
        // Sätt level data
        this.platforms = levelData.platforms
        this.enemies = levelData.enemies
        
        // Sätt background data
        this.backgrounds = levelData.backgrounds
        this.backgroundObjects = levelData.backgroundObjects
        
        // Skapa player på level spawn position
        if (this.currentWave === 1) {
            this.player = new Player(
                this, 
                levelData.playerSpawnX, 
                levelData.playerSpawnY, 
                50, 50, 'green'
            )
        }
        
        this.startGunConfig = {
            image: startGunSprite, 
            sourceWidth: 112,
            sourceHeight: 21,
        }

        this.gun = new Gun(this, levelData.playerSpawnX + this.player.width, levelData.playerSpawnY, 112, 21, {sprite: this.startGunConfig})
        
        // Återställ projektiler
        this.projectiles = []
        
        // Återställ camera för ny level
        // this.camera.x = 0
        // this.camera.y = 0
        // this.camera.targetX = 0
        // this.camera.targetY = 0
    }
    
    nextWave() {
        this.currentWave += 1
        this.enemiesDefeated = 0
        // Ladda nästa level
        this.loadLevel(this.currentLevelIndex)
        this.gameState = 'PLAYING'
        console.log(this.currentWave) 
    }
    
    addProjectile(x, y, directionX, directionY, enemyProjectile = false) {
        const projectile = new Projectile(this, x, y, directionX, directionY, enemyProjectile)
        this.projectiles.push(projectile)
    }
    
    restart() {
        this.currentWave = 1, this.enemiesDefeated = 0
        this.currentMenu = null
        this.waterDrops = []
        this.init()
        this.gameState = 'PLAYING',
        this.player.health = this.player.maxHealth / 2
    }
    
    /**
     * Sparar nuvarande spelläge
     */
    saveGame() {
        // Kolla att spelaren finns (kan inte spara om spelet inte har startat)
        if (!this.player) {
            console.warn('Cannot save: game not started')
            return false
        }
        
        return this.saveManager.save({
            currentLevelIndex: this.currentLevelIndex,
            score: this.score,
            health: this.player.health,
            playerX: this.player.x,
            playerY: this.player.y
        })
    }
    
    /**
     * Laddar sparat spelläge
     * @returns {boolean} True om laddning lyckades
     */
    loadGame() {
        const saveData = this.saveManager.load()
        if (!saveData) {
            console.warn('No save data found')
            return false
        }
        
        // Ladda level först
        this.currentLevelIndex = saveData.currentLevelIndex
        this.loadLevel(this.currentLevelIndex)
        
        // Återställ spelarens position och hälsa
        this.player.x = saveData.playerX
        this.player.y = saveData.playerY
        this.player.health = saveData.health
        
        // Återställ progress
        this.score = saveData.score
        
        // Starta spelet
        this.gameState = 'PLAYING'
        this.currentMenu = null
        
        console.log('Game loaded!')
        return true
    }

    update(deltaTime) {
        // Uppdatera menyn om den är aktiv
        if (this.gameState === 'MENU' && this.currentMenu) {
            this.currentMenu.update(deltaTime)
            this.inputHandler.keys.clear() // Rensa keys så de inte läcker till spelet
            return
        }

        
        
        // Kolla Escape för att öppna menyn under spel
        if (this.inputHandler.keys.has('Escape') && this.gameState === 'PLAYING') {
            this.gameState = 'MENU'
            this.currentMenu = new MainMenu(this)
            return
        }
        
        // Kolla restart input
        if (this.inputHandler.keys.has('r') || this.inputHandler.keys.has('R')) {
            if (this.gameState === 'GAME_OVER' || this.gameState === 'WIN') {
                this.restart()
                return
            }
        }
        
        // Debug: Byt level med N-tangenten (för testning)
        if (this.inputHandler.keys.has('n') || this.inputHandler.keys.has('N')) {
            // Ta bort tangenten så den inte triggas flera gånger
            this.inputHandler.keys.delete('n')
            this.inputHandler.keys.delete('N')
            
            // Gå till nästa level (loopa runt om nödvändigt)
            this.currentWave++
            this.loadLevel(this.currentLevelIndex)
            this.gameState = 'PLAYING'
            return
        }

        if (this.inputHandler.keys.has("b")) {
            this.inputHandler.keys.delete("b")
            this.player.grow()

            const gunWidth = this.gunConfigs[this.player.stage - 1].sourceWidth
            const gunHeight = this.gunConfigs[this.player.stage - 1].sourceHeight

            this.gun.markedForDeletion = true
            this.gun = new Gun(this, this.player.x + this.player.height, this.player.y, gunWidth, gunHeight, {sprite: this.gunConfigs[this.player.stage - 1]})

            this.gameState = "PLAYING"
            return
        }
        
        // Spara spelet med S-tangenten (endast när spelet körs)
        if ((this.inputHandler.keys.has('s') || this.inputHandler.keys.has('S')) && this.gameState === 'PLAYING') {
            // Ta bort tangenten så den inte triggas flera gånger
            this.inputHandler.keys.delete('s')
            this.inputHandler.keys.delete('S')
            
            this.saveGame()
            return
        }

        if (this.player.health === this.player.maxHealth && this.player.stage < 4) {
            this.gameState = "GROW_READY"
            
            if (this.inputHandler.keys.has("g") || this.inputHandler.keys.has("G")) {
                this.inputHandler.keys.delete("g")
                this.inputHandler.keys.delete("G")

                this.player.grow()

                const gunWidth = this.gunConfigs[this.player.stage - 1].sourceWidth
                const gunHeight = this.gunConfigs[this.player.stage - 1].sourceHeight

                this.gun.markedForDeletion = true
                this.gun = new Gun(this, this.player.x + this.player.height, this.player.y, gunWidth, gunHeight, {sprite: this.gunConfigs[this.player.stage - 1]})

                this.gameState = "PLAYING"
            }
        }
        
        // Uppdatera bara om spelet är i PLAYING state
        if (this.gameState !== 'PLAYING' && this.gameState !== "GROW_READY") return
        
        // Uppdatera background objects
        this.backgroundObjects.forEach(obj => obj.update(deltaTime))
        
        // Uppdatera plattformar (även om de är statiska)
        this.platforms.forEach(platform => platform.update(deltaTime))
        
        // Uppdatera fiender (med plattformsfysik)
        this.enemies.forEach(enemy => enemy.update(deltaTime))
        
        // Uppdatera spelaren
        this.player.update(deltaTime)

        this.gun.update(deltaTime)

        // Antag att spelaren inte står på marken, tills vi hittar en kollision
        this.player.isGrounded = false

        // Kontrollera kollisioner med plattformar
        this.platforms.forEach(platform => {
            this.player.handlePlatformCollision(platform)
        })

        // Kontrollera kollisioner för fiender med plattformar
        this.enemies.forEach(enemy => {
            enemy.isGrounded = false
            
            this.platforms.forEach(platform => {
                enemy.handlePlatformCollision(platform)
            })
            
            // Vänd vid world bounds istället för screen bounds
            enemy.handleScreenBounds(this.worldWidth)
        })
        
        // Kontrollera kollisioner mellan fiender
        this.enemies.forEach((enemy, index) => {
            this.enemies.slice(index + 1).forEach(otherEnemy => {
                enemy.handleEnemyCollision(otherEnemy)
                otherEnemy.handleEnemyCollision(enemy)
            })
        })
        
        // Kontrollera kollision med fiender
        this.enemies.forEach(enemy => {
            if (this.player.intersects(enemy) && !enemy.markedForDeletion) {
                // Spelaren tar skada
                this.player.takeDamage(enemy.damage)
            }
        })

        // Kontrollera kollision med waterdrop
        this.waterDrops.forEach(waterDrop => {
            waterDrop.update(deltaTime)

            if (this.player.intersects(waterDrop) && !waterDrop.markedForDeletion) {
                this.player.gainHealth(1)
                waterDrop.markedForDeletion = true
            }
        })
        
        // Uppdatera projektiler
        this.projectiles.forEach(projectile => {
            projectile.update(deltaTime)
            
            // Kolla kollision med fiender
            this.enemies.forEach(enemy => {
                if (projectile.intersects(enemy) && !enemy.markedForDeletion && !projectile.enemyProjectile) {
                    if (enemy.health <= 0) {
                        enemy.markedForDeletion = true
                        this.enemiesDefeated += 1
                        projectile.markedForDeletion = true
                        this.dropWater(enemy.x, enemy.y, enemy.drops)
                        this.score += enemy.points || 50 // Använd enemy.points om det finns, annars 50    
                    } else {
                        enemy.health -= 1
                        projectile.markedForDeletion = true
                    }
                    
                }
            })

            // Kolla projektil-kollision med plattformar (plattformsspel-specifikt)
            // Kontrollerar dessutom enemyprojectile med platform
            this.platforms.forEach(platform => {
                this.projectileX = 0
                this.projectileY = 0
                if (projectile.intersects(platform)) {
                    const projectiledata = projectile.getCollisionData(platform)
                    this.projectileY = projectile.y

                    if (projectiledata.direction === 'left') {
                        this.projectileX = projectile.x - 30
                    }

                    else if (projectiledata.direction === "right") {
                        this.projectileX = projectile.x + 30
                    }

                    else if (projectiledata.direction === "top") {
                        this.projectileX = projectile.x
                        this.projectileY -= 30
                    }
                    
                    else {
                        this.projectileX = projectile.x
                    }
                    
                    if (!projectile.enemyProjectile) this.waterDrops.push(new WaterDrop(this, this.projectileX, this.projectileY))
                    projectile.markedForDeletion = true
                }
            })

            if (projectile.enemyProjectile && projectile.intersects(this.player)) {
                this.player.takeDamage(1)
                projectile.markedForDeletion = true
            }
        })
        
        // Ta bort objekt markerade för borttagning
        this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion)
        this.projectiles = this.projectiles.filter(projectile => !projectile.markedForDeletion)
        this.waterDrops = this.waterDrops.filter(WaterDrops => !WaterDrops.markedForDeletion)

        // Förhindra att spelaren går utöver world bounds
        if (this.player.x < 0) {
            this.player.x = 0
        }
        if (this.player.x + this.player.width > this.worldWidth) {
            this.player.x = this.worldWidth - this.player.width
        }
        
        // Uppdatera kameran för att följa spelaren
        this.camera.follow(this.player)
        this.camera.update(deltaTime)
        
        const levelData = this.currentLevel.getData()

        // Next wave condition när alla fiender är besegrade, med countdown innan waven startar
        if (this.enemiesDefeated === levelData.enemyAmount + 1) {
            if (this.wavespace === false) {
                this.wavecooldown = this.wavetimer
                this.wavespace = true
            } else {
                this.wavecooldown -= deltaTime
                if (this.wavecooldown <= 0) {
                    this.nextWave()
                    this.wavespace = false
                }
            }
        }
    
        // Kolla lose condition - spelaren är död
        if (this.player.health <= 0 && this.gameState === 'PLAYING') {
            this.gameState = 'GAME_OVER'
            this.waterDrops.forEach(WaterDrop => {
                WaterDrop.markedForDeletion = true
            })
        }
    }

    dropWater(x, y, drops) {
        for (let i = 0; i < drops; i++) {
            const randomDrop = Math.floor(Math.random() * 15)
            const Water = new WaterDrop(this, x + i * randomDrop, y + i)
            this.waterDrops.push(Water)    
        }
        
    }

    draw(ctx) {
        // Rita backgrounds FÖRST (längst bak)
        this.backgrounds.forEach(bg => bg.draw(ctx, this.camera))
        
        // Rita background objects
        this.backgroundObjects.forEach(obj => {
            if (this.camera.isVisible(obj)) {
                obj.draw(ctx, this.camera)
            }
        })
        
        // Rita alla plattformar med camera offset
        this.platforms.forEach(platform => {
            if (this.camera.isVisible(platform)) {
                platform.draw(ctx, this.camera)
            }
        })
        
        // Rita fiender med camera offset
        this.enemies.forEach(enemy => {
            if (this.camera.isVisible(enemy)) {
                enemy.draw(ctx, this.camera)
            }
        })
        
        // Rita projektiler med camera offset
        this.projectiles.forEach(projectile => {
            if (this.camera.isVisible(projectile)) {
                projectile.draw(ctx, this.camera)
            }
        })

        this.waterDrops.forEach(drop => {
            drop.draw(ctx, this.camera)
        } )

        this.gun.draw(ctx, this.camera)
        
        // Rita spelaren med camera offset
        this.player.draw(ctx, this.camera)
        
        // Rita UI sist (utan camera offset - alltid synligt)
        this.ui.draw(ctx)
        
        // Rita meny överst om den är aktiv
        if (this.currentMenu) {
            this.currentMenu.draw(ctx)
        }
    }
}