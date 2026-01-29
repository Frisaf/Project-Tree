import Menu from './Menu.js'
import ControlsMenu from './ControlsMenu.js'

export default class TitleScreen extends Menu {
    getTitle() {
        return 'TitleScreen'
    }
    
    getOptions() {
        const options = []
        // Visa "Continue" om det finns sparad data
        
        // Start Game (eller New Game om det finns en save)
        options.push({
            text: this.game.saveManager.hasSave() ? 'Start' : 'Start Game',
            key: ' ',
            action: () => {
                this.game.restart() // Restart för att starta från början
                this.game.inputHandler.keys.clear()
            }
        })
        
        // Controls
        options.push({
            text: 'Controls',
            key: 'k',
            action: () => {
                this.game.currentMenu = new ControlsMenu(this.game)
            }
        })

        options.push({
            text: 'Credits',
            key: 'l',
            action: () => {
                this.game.close()
            }
        })
        
        return options
    }
}
