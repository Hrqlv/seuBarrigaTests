import { expect, type Page } from '@playwright/test';

export class CadastroPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goTo() {
        await this.page.goto('https://seubarriga.wcaquino.me/cadastro')
    }
}
