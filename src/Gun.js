import GameObject from "./GameObject"
import Sprite from "./Sprite"

export default class Gun extends GameObject {
    constructor(game, x, y, width, height, options = {}) {
        super(game, x, y, width, height)

        this.color = "blue"
        this.angle = 0

        if (options.sprite) {
            this.sprite = new Sprite(options.sprite)
        }
    }

    update() {
        this.x = this.game.player.x + 25
        this.y = this.game.player.y + 30
        this.mouseX = this.game.inputHandler.mouseX + (this.game.camera ? this.game.camera.x : 0)
        this.mouseY = this.game.inputHandler.mouseY + (this.game.camera ? this.game.camera.y : 0)
    }

    draw(ctx, camera = null) {
        const screenX = camera ? this.x - camera.x : this.x
        const screenY = camera ? this.y - camera.y : this.y
        const spriteDrawn = this.drawSprite(ctx, camera, this.direction === -1)

        this.angle = Math.atan2(this.mouseY - this.y, this.mouseX - this.x)

        ctx.save()
        ctx.translate(screenX, screenY)
        ctx.rotate(this.angle)

        if (this.sprite && this.sprite.draw(ctx, screenX, screenY, this.width, this.height)) {
            return
        }

        else {
            ctx.fillStyle = this.color
            ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height)
        }

        ctx.restore()
    }
}