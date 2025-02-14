import { expect, type Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    locatorMensagemErro: string;

    constructor(page: Page) {
        this.page = page;
        this.locatorMensagemErro = 'div[class*="alert-danger"]'
    }

    async clicarEmLogin() {
        await this.page.locator('a[href="/login"]').click()
    }

    async realizarLogin(email: string, senha: string) {
        await this.page.locator('input[id="email"]').fill(email)
        await this.page.locator('input[id="senha"]').fill(senha)
    }

    async validarMensagemDeSucesso() {
        await expect(this.page.locator('div[class*="alert-success"]')).toBeVisible()
    }

    async clicarEmEntrar() {
        await this.page.locator('button[class*="btn-primary"]').click()
    }

    async clicarEmSair() {
        await this.page.locator('a[href="/logout"]').click()
    }

    async validarMensagemDeErroParaUsuarioSenhaErrada() {
        await expect(this.page.locator(this.locatorMensagemErro).filter({ hasText: 'Problemas com o login do usuário' })).toBeVisible()
    }

    async validarTodasAsMensagensErros() {
        await expect(this.page.locator(this.locatorMensagemErro).filter({ hasText: 'Email é um campo obrigatório' })).toBeVisible()
        await expect(this.page.locator(this.locatorMensagemErro).filter({ hasText: 'Senha é um campo obrigatório' })).toBeVisible()
    }
}
