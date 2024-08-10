import { expect, type Page } from '@playwright/test';

export class CadastroPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goTo() {
        await this.page.goto('https://seubarriga.wcaquino.me/cadastro')
    }

    async preecherDadosValidos(nome: string, email: string, senha: string) {
        await this.page.locator('input[id="nome"]').fill(nome)
        await this.page.locator('input[id="email"]').fill(email)
        await this.page.locator('input[id="senha"]').fill(senha)
        await this.page.locator('input[value="Cadastrar"]').click()   
    }
}
