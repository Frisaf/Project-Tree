import GameObject from './GameObject.js'
import playerBullet from "./assets/Project Tree/water.png"
import enemyBullet from "./assets/Project Tree/Enemies/bolt.png"

export default class Projectile extends GameObject {
    constructor(game, x, y, directionX, directionY = 0, enemyProjectile = false) {
        super(game, x, y, 12, 6)
        this.directionX = directionX // -1 för vänster, 1 för höger
        this.directionY = directionY
        this.speed = 0.5 // pixels per millisekund
        this.startX = x // Spara startposition
        this.startY = y
        this.maxDistance = 1283.33 // Max en skärm långt

        if (!enemyProjectile) {
            this.color = 'orange'
        } else {
            this.color = "#b2d145" // yellow
        }
        
        this.enemyProjectile = enemyProjectile

        this.loadSprite("playerBullet", playerBullet, 1)
        this.loadSprite("enemyBullet", enemyBullet, 1)

        this.currentAnimation = "enemyBullet"
    }
    
    update(deltaTime) {
        // Flytta projektilen
        this.x += this.directionX * this.speed * deltaTime
        this.y += this.directionY * this.speed * deltaTime
        
        // Kolla om projektilen har flugit för långt
        const dx = this.x - this.startX
        const dy = this.y - this.startY
        const distanceTraveled = Math.sqrt(dx * dx + dy * dy)
        if (distanceTraveled > this.maxDistance) {
            this.markedForDeletion = true
        }

        if (this.enemyProjectile) {
            this.setAnimation("enemyBullet")
        } else {
            this.setAnimation("playerBullet")
        }

        // if (!this.enemyProjectile) console.log(this.directionX < 1, this.directionX)
    }
    
    draw(ctx, camera = null) {
        // Beräkna screen position
        const screenX = camera ? this.x - camera.x : this.x
        const screenY = camera ? this.y - camera.y : this.y

        if (this.directionY < -0.6) {
            ctx.save()
            ctx.translate(screenX, screenY)
            ctx.rotate(Math.PI / 2)
            ctx.restore()
        }

        const spriteDrawn = this.drawSprite(ctx, camera)

        if (!spriteDrawn) {
            // Rita projektilen som en avlång rektangel
            ctx.fillStyle = this.color
            ctx.fillRect(screenX, screenY, this.width, this.height)
        }
        
        
    }
}
