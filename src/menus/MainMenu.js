import Menu from './Menu.js'
import ControlsMenu from './ControlsMenu.js'

export default class MainMenu extends Menu {
    getTitle() {
        return 'Game Menu'
    }
    
    getOptions() {
        const options = []
        
        // Visa "Continue" om det finns sparad data
        if (this.game.saveManager.hasSave()) {
            const saveInfo = this.game.saveManager.getSaveInfo()
            console.log(saveInfo)
            options.push({
                text: `Continue (wave ${saveInfo.wave}, stage ${saveInfo.playerStage})`,
                key: 'c',
                action: () => {
                    this.game.loadGame()
                    this.game.inputHandler.keys.clear()
                }
            })
        }
        
        // Start Game (eller New Game om det finns en save)
        options.push({
            text: this.game.saveManager.hasSave() ? 'New Game' : 'Start Game',
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
        
        return options
    }
}
