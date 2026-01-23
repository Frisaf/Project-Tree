export default class Camera {
    constructor(x = 0, y = 0, width = 800, height = 600) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        
        // World bounds (nivåns storlek)
        this.worldWidth = width
        this.worldHeight = height
        
        // Smooth following
        this.smoothing = 0.05 // 0-1, högre = snabbare följning
        this.targetX = x
        this.targetY = y
    }
    
    setWorldBounds(width, height) {
        this.worldWidth = width
        this.worldHeight = height
    }
    
    follow(target) {
        // Beräkna spelarens position relativt till kamerans centrum
        let targetCenterX = target.x + target.width / 2
        let targetCenterY = target.y + target.height / 2
        
        // Centrera kameran på spelaren
        this.targetX = targetCenterX - this.width / 2
        this.targetY = targetCenterY - this.height / 2
        
        if (targetCenterY > 350) {
            this.targetY = this.worldHeight / 20 - 15
        }
        if (targetCenterY < -400) {
            this.targetY = -this.worldHeight
        }
        if (targetCenterX < 800) {
            this.targetX = this.worldWidth / 100 - 40
        }
        if (targetCenterX > 2400) {
            this.targetX = this.worldWidth / 1.95
        }
        console.log(this.targetX, this.targetY)
    }
    
    update(deltaTime) {
        // Smooth lerp till target position
        this.x += (this.targetX - this.x) * this.smoothing
        this.y += (this.targetY - this.y) * this.smoothing
        
        // Avrunda för att undvika pixel-jitter
        this.x = Math.round(this.x)
        this.y = Math.round(this.y)
    }
    
    // Konvertera world coordinates till screen coordinates
    worldToScreen(worldX, worldY) {
        return {
            x: worldX - this.x,
            y: worldY - this.y
        }
    }
    
    // Konvertera screen coordinates till world coordinates
    screenToWorld(screenX, screenY) {
        return {
            x: screenX + this.x,
            y: screenY + this.y
        }
    }
    
    // Kolla om ett objekt är synligt på skärmen
    isVisible(object) {
        return !(object.x + object.width < this.x ||
                object.x > this.x + this.width ||
                object.y + object.height < this.y ||
                object.y > this.y + this.height)
    }
}
