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
            const canvas = document.querySelector("#game")
            const rect = canvas.getBoundingClientRect()

            this.mouseX = event.clientX - rect.left
            this.mouseY = event.clientY - rect.top
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