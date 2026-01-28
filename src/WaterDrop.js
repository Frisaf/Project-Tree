import GameObject from './GameObject'
import waterdropSprite from "./assets/Project Tree/waterdrop.png"

export default class WaterDrop extends GameObject{
    constructor(game, x, y, width = 30, height = 30){
        super(game, x, y, width, height)
        this.color = 'blue'
        this.velocityY = 0.2

        this.positionX = x
        this.positionY = y

        this.width = width
        this.height = height

        this.loadSprite("waterdrop", waterdropSprite, 4, 150)
        this.currentAnimation = "waterdrop"
    }

    update(deltaTime) {
        this.setAnimation("waterdrop")
        this.updateAnimation(deltaTime)
    }

    draw(ctx, camera) {
        const screenX = camera ? this.x - camera.x : this.x
        const screenY = camera ? this.y - camera.y : this.y

        const spriteDrawn = this.drawSprite(ctx, camera)

        if (!spriteDrawn) {
            ctx.fillStyle = this.color
            ctx.fillRect(screenX, screenY, this.width, this.height)
        }
    }
}