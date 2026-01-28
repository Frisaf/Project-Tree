import GameObject from './GameObject.js'
import runSprite from "./assets/Project Tree/Enemies/walking.png"
import fallSprite from "./assets/Project Tree/Enemies/falling_walking.png"
import walkingAudio from "./assets/Project Tree/Audio/walking.mp3"
import shootAudio from "./assets/Project Tree/Audio/enemy_shoot.mp3"

export default class Enemy extends GameObject {
    constructor(game, x, y, width, height, patrolDistance = null) {
        super(game, x, y, width, height)
        this.color = 'red' // Röd
        
        // Fysik
        this.velocityX = 0
        this.velocityY = 0
        this.isGrounded = false
        
        // Patrol AI
        this.startX = x
        this.patrolDistance = patrolDistance
        this.endX = patrolDistance !== null ? x + patrolDistance : null
        this.speed = 0.1
        this.direction = 1 // 1 = höger, -1 = vänster
        
        this.health = 1 // Fiendens hälsa
        this.damage = 1 // Hur mycket skada fienden gör
        this.drops = 4 // Antal vatten droppar som släpps vid död

        this.canShoot = true
        this.shootCooldown = Math.floor(3000 + Math.random() * 5000) // millisekunder mellan skott
        this.shootCooldownTimer = 0

        this.canJump = true
        this.jumpCooldown = Math.floor(5000 + Math.random() * 10000)
        this.jumpCooldownTimer = Math.floor(5000 + Math.random() * 10000)
        this.jumpPower = -0.6

        this.loadSprite("run", runSprite, 6, 100)
        this.loadSprite("fall", fallSprite, 1)

        this.currentAnimation = "run"

        this.audio = new Audio(walkingAudio)
        this.audio.volume = 0.03
        this.audio.speed = 2
        this.audio.loop = true
        this.audio.play().catch(e => console.log('Playing the audio failed:', e))

        this.shootAudio = new Audio(shootAudio)
        this.shootAudio.volume = 0.2
    }

    shoot() {
        const centerX = this.x + this.width / 2
        const centerY = this.y + this.height / 2

        this.game.addProjectile(centerX, centerY, -1, null, true)
        this.game.addProjectile(centerX, centerY, 1, null, true)
        this.shootAudio.play().catch(e => console.log('Playing the sfx failed:', e))
        
        // Sätt cooldown
        this.canShoot = false
        this.shootCooldownTimer = this.shootCooldown
    }

    stopAudio() {
        this.audio.pause()
        this.audio.currentTime = 0
    }

    update(deltaTime) {
        // Applicera gravitation
        this.velocityY += this.game.gravity * deltaTime
        
        // Applicera luftmotstånd
        if (this.velocityY > 0) {
            this.velocityY -= this.game.friction * deltaTime
            if (this.velocityY < 0) this.velocityY = 0
        }
        
        // Patruller när på marken
        if (this.isGrounded) {
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
            // Annars fortsätter fienden tills den kolliderar med något
        } else {
            this.velocityX = 0
        }
        
        // Uppdatera position
        this.x += this.velocityX * deltaTime
        this.y += this.velocityY * deltaTime

        if (!this.canShoot) {
            this.shootCooldownTimer -= deltaTime
            if (this.shootCooldownTimer <= 0) {
                this.canShoot = true
            }
        }

        else (
            this.shoot()
        )

        if (!this.canJump) {
            this.jumpCooldownTimer -= deltaTime

            if (this.shootCooldownTimer <= 0) {
                this.canJump = true
            }
        }

        else {
            this.jump()
        }

        if (this.velocityX !== 0) {
            this.setAnimation("run")
        }

        else if (!this.isGrounded) {
            this.setAnimation("fall")
        }

        this.updateAnimation(deltaTime)
    }

    handlePlatformCollision(platform) {
        const collision = this.getCollisionData(platform)
        
        if (collision) {
            if (collision.direction === 'top' && this.velocityY > 0) {
                // Fienden landar på plattformen
                this.y = platform.y - this.height
                this.velocityY = 0
                this.isGrounded = true
            } else if (collision.direction === 'bottom' && this.velocityY < 0) {
                // Fienden träffar huvudet
                this.y = platform.y + platform.height
                this.velocityY = 0
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
        const collisionData = this.getCollisionData(otherEnemy)

        if (this.intersects(otherEnemy) && (collisionData.direction === "left" || collisionData.direction === "right")) {
            this.direction *= -1
        }

        else if (this.intersects(otherEnemy) && (collisionData.direction === "top")) {
            this.canJump = true
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
    }

    jump() {
        this.velocityY = this.jumpPower
        this.velocityX = this.speed
        this.canJump = false
        this.isGrounded = false
        this.shootCooldownTimer = this.jumpCooldown
    }

    draw(ctx, camera = null) {
        // Beräkna screen position (om camera finns)
        const screenX = camera ? this.x - camera.x : this.x
        const screenY = camera ? this.y - camera.y : this.y

        const spriteDrawn = this.drawSprite(ctx, camera, this.direction === -1)

        if (!spriteDrawn) {
            // Rita fienden som en röd rektangel
            ctx.fillStyle = this.color
            ctx.fillRect(screenX, screenY, this.width, this.height)
        }
    }
}
