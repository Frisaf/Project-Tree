export default class EnemyArrowIndicator {
    constructor(game) {
        this.game = game 
        this.padding = 30 // distance from screen edge
        this.size = 16 // arrow size
        this.padding = 48
    }

    drawArrow(ctx, enemy) {
        const camera = this.game.camera 
        const player = this.game.player

        // If enemy IS visible = no arrow
        if (camera.isVisible(enemy)) return

        // Player center (screen space)
        const playerScreen = camera.worldToScreen(
            player.x + player.width / 2,
            player.y + player.height / 2
        )

        // Enemy center (screen space)
        const enemyScreen = camera.worldToScreen(
            enemy.x + enemy.width / 2,
            enemy.y + enemy.height / 2
        )

        // Direction vector
        const dx = enemyScreen.x - playerScreen.x
        const dy = enemyScreen.y - playerScreen.y
        const angle = Math.atan2(dy, dx)

       
        let arrowX = enemyScreen.x
        let arrowY = enemyScreen.y

        // Clamp to screen edges
        arrowX = Math.max(this.padding, Math.min(this.game.width - this.padding, arrowX))
        arrowY = Math.max(this.padding, Math.min(this.game.height - this.padding, arrowY))

        // Snap to closest edge
        const distLeft   = arrowX
        const distRight  = this.game.width - arrowX
        const distTop    = arrowY
        const distBottom = this.game.height - arrowY

        const minDist = Math.min(distLeft, distRight, distTop, distBottom)

        if (minDist === distLeft) arrowX = this.padding 
        else if (minDist === distRight) arrowX = this.game.width - this.padding 
        else if (minDist === distTop) arrowY = this.padding 
        else arrowY = this.game.height - this.padding

        this.size = 16 + Math.sin(performance.now() / 200) * 4

        // Draw arrow
        ctx.save()
        ctx.translate(arrowX, arrowY)
        ctx.rotate(angle)

        ctx.fillStyle = "black"
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(-this.size, -this.size / 2)
        ctx.lineTo(-this.size, this.size / 2)
        ctx.closePath()
        ctx.fill()


        ctx.restore()
    }
}
