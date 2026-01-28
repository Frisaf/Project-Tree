import titlescreen from '../assets/Project Tree/Menu/titlescreen.png'
import titleicon from '../assets/Project Tree/Menu/titletext.png'
import startoptionimage from '../assets/Project Tree/Menu/start1.png'
import controlsoptionimage from '../assets/Project Tree/Menu/control1.png'
import quitoptionimage from '../assets/Project Tree/Menu/quit1.png'
export default class Menu {
    constructor(game) {
        this.game = game
        this.visible = true
        
        // Subclasses must provide these
        this.title = this.getTitle()
        this.options = this.getOptions()
        

        // Hitta första valbara option (skippa null actions)
        this.selectedIndex = 0
        for (let i = 0; i < this.options.length; i++) {
            if (this.options[i].action !== null) {
                this.selectedIndex = i
                break
            }
        }
        
        // Visual styling
        this.backgroundColor = 'rgba(0, 0, 0, 1)'
        this.backgroundImage = new Image()
        this.backgroundImage.src = titlescreen
        this.titletextimage = new Image()
        this.titletextimage.src = titleicon
        this.startoption = new Image()
        this.startoption.src = startoptionimage
        this.controlsoption = new Image ()
        this.controlsoption.src = controlsoptionimage
        this.quitoption = new Image ()
        this.quitoption.src = quitoptionimage
        this.titleColor = '#FFFFFF'
        this.optionColor = '#CCCCCC'
        this.selectedColor = '#FFD700'
        this.keyColor = '#4CAF50'
        
        // Track which keys have been pressed (för att undvika upprepade tryckningar)
        this.lastKeys = new Set()
    }
    
    // Abstract methods - subclasses must override
    getTitle() {
        throw new Error('Menu subclass must implement getTitle()')
    }
    
    getOptions() {
        throw new Error('Menu subclass must implement getOptions()')
    }
    
    update(deltaTime) {
        const keys = this.game.inputHandler.keys
        
        // Kolla Enter för vald option
        if (keys.has('Enter') && !this.lastKeys.has('Enter')) {
            const selectedOption = this.options[this.selectedIndex]
            if (selectedOption && selectedOption.action) {
                selectedOption.action()
            }
        }
        
        // Kolla om någon key-shortcut har tryckts
        this.options.forEach(option => {
            if (option.key && option.action && keys.has(option.key) && !this.lastKeys.has(option.key)) {
                option.action()
            }
        })
        
        // Pil upp/ner för att navigera
        if (keys.has('ArrowDown') && !this.lastKeys.has('ArrowDown')) {
            // Hitta nästa valbara option (skippa null actions)
            let newIndex = this.selectedIndex
            do {
                newIndex = (newIndex + 1) % this.options.length
            } while (this.options[newIndex].action === null && newIndex !== this.selectedIndex)
            this.selectedIndex = newIndex
        }
        if (keys.has('ArrowUp') && !this.lastKeys.has('ArrowUp')) {
            // Hitta föregående valbara option (skippa null actions)
            let newIndex = this.selectedIndex
            do {
                newIndex = (newIndex - 1 + this.options.length) % this.options.length
            } while (this.options[newIndex].action === null && newIndex !== this.selectedIndex)
            this.selectedIndex = newIndex
        }
        
        // Uppdatera lastKeys
        this.lastKeys = new Set(keys)
    }
    
    draw(ctx) {
        if (!this.visible) return
        
        ctx.save()
        
        // Rita bakgrundsbild
        if (this.backgroundImage && this.title === 'TitleScreen') {
            ctx.drawImage(this.backgroundImage, 0, 0, this.game.width, this.game.height)
        } else {
            // Fallback till färg om bilden inte är laddad
            ctx.fillStyle = this.backgroundColor
            ctx.fillRect(0, 0, this.game.width, this.game.height)
        }
        
        // Rita title
        ctx.fillStyle = this.titleColor
            ctx.font = 'bold 48px Arial'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
        if (this.title === 'TitleScreen') {
            ctx.drawImage(this.titletextimage, this.game.width / 2.35, 60, this.game.width / 6, 80)
        } else {
            ctx.fillText(this.title, this.game.width / 2, 80)
        }

        // Rita options
        const startY = 160
        const lineHeight = 60
        
        this.options.forEach((option, index) => {
            const y = startY + index * lineHeight
            const isSelected = index === this.selectedIndex
            
            // Rita option text
            ctx.font = '32px Arial'
            ctx.fillStyle = isSelected ? this.selectedColor : this.optionColor
            
            // Lägg till ">" för vald option
            if (option.text === "Start") {
                ctx.drawImage(this.startoption, this.game.width / 2.20, y, this.game.width / 10, y / 5)
            } else if (option.text === "Controls") {
                ctx.drawImage(this.controlsoption, this.game.width / 2.25, y, this.game.width / 8, y / 6)
            } else if (option.text === "Quit") {
                ctx.drawImage(this.quitoption, this.game.width / 2, y, this.game.width / 8, y / 7)
            } else {
                ctx.fillText(displayText, this.game.width / 2, y)      
            }
            
        })
        
        // Rita instruktioner längst ner
        ctx.fillStyle = '#888888'
        ctx.font = '18px Arial'
        ctx.fillText('Use Arrow Keys to navigate, Enter to select', this.game.width / 2, this.game.height - 50)
        
        ctx.restore()
    }
}
