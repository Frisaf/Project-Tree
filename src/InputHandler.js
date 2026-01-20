export default class InputHandler {
    constructor(game) {
        this.game = game
        this.keys = new Set()
        this.mouseButtons = new Set()
        
        window.addEventListener('keydown', (event) => {
            console.log(event.key)
            this.keys.add(event.key)
        })
        window.addEventListener('keyup', (event) => {
            this.keys.delete(event.key)
        })

        window.addEventListener("mousemove", (event) => {
            this.mouseX = event.clientX
            this.mouseY = event.clientY - 250
        })

        window.addEventListener('mousedown', (event) => {
            this.mouseButtons.add(event.button)
            console.log('Mouse button pressed:', event.button)
        })
        
        window.addEventListener('mouseup', (event) => {
            this.mouseButtons.delete(event.button)
        })
    }
}