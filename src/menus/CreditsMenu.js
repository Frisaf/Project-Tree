import Menu from './Menu.js'
import MainMenu from './MainMenu.js'
import TitleScreen from './TitleScreen.js'

export default class CreditsMenu extends Menu {
    getTitle() {
        return 'Credits'
    }
    
    getOptions() {
        return [
            {
                text: 'Directors - Kevin Tornéus, Robbin Eriksson',
                key: null,
                action: null
            },
            {
                text: 'Programmers - Ash Säfsten, William Grenholm, Adrian Sundlöf Nilsson',
                key: null,
                action: null
            },
            {
                text: 'Designers - William Årdahl, Emma Brändström, Kevin Edin',
                key: null,
                action: null
            },
            {
                text: 'Back to Menu',
                key: 'Escape',
                action: () => {
                    this.game.gameState = 'MENU'
                    this.game.currentMenu = new TitleScreen(this.game)
                }
            }
        ]
    }
}
