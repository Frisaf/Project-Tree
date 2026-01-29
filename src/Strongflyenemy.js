import GameObject from "./GameObject"
import strongflyingSprite from "./assets/Project Tree/Enemies/flying.png"
import strongFlyingAudio from "./assets/Project Tree/Audio/strong_flying.mp3"
import shootAudio from "./assets/Project Tree/Audio/enemy_shoot.mp3"

export default class StrongFlyingEnemy extends GameObject {
    constructor(game, x, y, width, height, patrolDistance = null) {
        super(game, x, y, width, height)
        this.color = "orange"
        this.velocityX = 0

        this.startX = x
        this.patrolDistance = patrolDistance
        this.endX = patrolDistance !== null ? x + patrolDistance : null
        this.speed = 0.1
        this.direction = 1 // 1 = höger, -1 = vänster
        this.damageMod = 0

        if (this.game.currentWave > 5 && this.game.currentWave < 7) {
            this.damageMod = 2
        } else if (this.game.currentWave > 7 && this.game.currentWave < 15) {
            this.damageMod = 3
        } else if (this.game.currentWave > 15) {
            this.damageMod = 6
        }
        
        this.health = 2// Fiendens hälsa
        this.damage = 3 + this.damageMod // Hur mycket skada fienden gör
        this.drops = 4 // Antal vatten droppar som släpps vid död

        this.bobOffset = 0
        this.bobSpeed = 0.04 // hur snabbt fienden gungar
        this.bobDistance = 10 // hur långt upp/ner fienden rör sig

        this.canShoot = true
        this.shootCooldown = Math.floor(3000 + Math.random() * 5000) // millisekunder mellan skott
        this.shootCooldownTimer = 0

        this.loadSprite("fly", strongflyingSprite, 2, 80)

        this.audio = new Audio(strongFlyingAudio)
        this.audio.loop = true
        this.audio.volume = 0.05
        this.audio.play().catch(e => console.log('Playing the audio failed:', e))

        this.shootAudio = new Audio(shootAudio)
        this.shootAudio.volume = 0.2
    }

    stopAudio() {
        this.audio.pause()
        this.audio.currentTime = 0
    }

    shoot() {
        const centerX = this.x + this.width / 2
        const centerY = this.y + this.height / 2

        this.game.addProjectile(centerX, centerY, -1, null, true)
        this.game.addProjectile(centerX, centerY, 1, null, true)
        this.game.addProjectile(centerX, centerY, null, -1, true)
        this.game.addProjectile(centerX, centerY, null, 1, true)
        this.shootAudio.play().catch(e => console.log('Playing the sfx failed:', e))
        
        // Sätt cooldown
        this.canShoot = false
        this.shootCooldownTimer = this.shootCooldown
    }

    update(deltaTime) {
        this.velocityX = this.speed * this.direction
            
            // Om vi har en patrolldistans, vänd vid ändpunkter
        if (this.patrolDistance !== null) {
            if (this.x >= this.endX) {
                this.direction = -1
                this.x = this.endX
            } else if (this.x <= this.startX) {
                this.direction = 1
                this.x = this.startX
            }
        }

        this.bobOffset += this.bobSpeed * deltaTime
        this.x += this.velocityX * deltaTime
        this.y += this.bobSpeed * deltaTime

        if (!this.canShoot) {
        this.shootCooldownTimer -= deltaTime
            if (this.shootCooldownTimer <= 0) {
                this.canShoot = true
            }
        }

        else (
            this.shoot()
        )

        this.setAnimation("fly")
        this.updateAnimation(deltaTime)
    }

    handlePlatformCollision(platform) {
        const collision = this.getCollisionData(platform)
        
        if (collision) {
            if (collision.direction === 'top' && this.bobSpeed > 0) {
                // Fienden landar på plattformen
                this.y = platform.y - this.height
                this.bobSpeed *= -1
            } else if (collision.direction === 'bottom' && this.bobSpeed < 0) {
                // Fienden träffar huvudet
                this.y = platform.y + platform.height
                this.bobSpeed *= -1
            } else if (collision.direction === 'left' && this.velocityX > 0) {
                // Fienden träffar vägg - vänd
                this.x = platform.x - this.width
                this.direction = -1
            } else if (collision.direction === 'right' && this.velocityX < 0) {
                // Fienden träffar vägg - vänd
                this.x = platform.x + platform.width
                this.direction = 1
            }
        }
    }

    handleEnemyCollision(otherEnemy) {
        if (this.intersects(otherEnemy)) {
            this.direction *= -1
        }
    }

    handleScreenBounds(gameWidth) {
        // Vänd vid skärmkanter (för fiender utan patrolDistance)
        if (this.patrolDistance === null) {
            if (this.x <= 0) {
                this.x = 0
                this.direction = 1
            } else if (this.x + this.width >= gameWidth) {
                this.x = gameWidth - this.width
                this.direction = -1
            }
        }

        if (this.y < 0) {
            this.bobSpeed *= -1
        }
    }

    draw(ctx, camera = null) {
        // Beräkna screen position (om camera finns)
        const screenX = camera ? this.x - camera.x : this.x
        const screenY = camera ? this.y - camera.y : this.y

        const spriteDrawn = this.drawSprite(ctx, camera, this.direction === -1)

        if (!spriteDrawn) {
            // Rita fienden som en röd rektangel
            ctx.fillStyle = this.color
            ctx.fillRect(screenX, screenY, this.width+20, this.height)
        }
    }
}