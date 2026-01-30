import Menu from './Menu.js'
import MainMenu from './MainMenu.js'
import TitleScreen from './TitleScreen.js'

export default class ControlsMenu extends Menu {
    getTitle() {
        return 'Controls'
    }
    
    getOptions() {
        return [
            {
                text: 'Arrow Keys/WAD - Move',
                key: null,
                action: null
            },
            {
                text: 'Space - Jump/Double Jump',
                key: null,
                action: null
            },
            {
                text: 'M1 (Mouse Left Click) - Shoot',
                key: null,
                action: null
            },
            {
                text: "G - Grow",
                key: null,
                action: null
            },
            {
                text: 'Escape - Menu',
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
            },
            {
                text: '',
                key: null,
                action: null
            },
            {
                text: '-- Aim with your mouse --',
                key: null,
                action: null
            },
            {
                text: '-- Shooting decreases your life force! Kill enemies and pick up water to regain it! --',
                key: null,
                action: null
            }
        ]
    }
}
