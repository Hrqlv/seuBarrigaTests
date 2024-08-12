import { expect, type Page } from '@playwright/test';
import { criarUsuario } from '../../helpers/helpers';

export class CadastroPage {
    readonly page: Page;
    locatorMensagemErro: string;

    constructor(page: Page) {
        this.page = page;
        this.locatorMensagemErro = 'div[class*="alert-danger"]'
    }

    async goTo() {
        await this.page.goto('https://seubarriga.wcaquino.me/cadastro');
    }

    async cadastrarUsuarioAleatorio(): Promise<{ email: string, senha: string }> {
        const usuario = criarUsuario()[0];  
        await this.preecherDadosValidos(usuario.nome, usuario.email, usuario.senha);
        return { email: usuario.email, senha: usuario.senha };
    }

    async preecherDadosValidos(nome: string, email: string, senha: string) {
        await this.page.locator('input[id="nome"]').fill(nome);
        await this.page.locator('input[id="email"]').fill(email);
        await this.page.locator('input[id="senha"]').fill(senha);
    }

    async clicarEmCadastrar() {
        await this.page.locator('input[class*="btn-primary"]').click();
    }

    async clicarNovoUsuario() {
        await this.page.locator('a[href="/cadastro"]').click()
    }

    async validarMensagemDeSucesso() {
        await expect(this.page.locator('div[class*="alert-success"]').filter({ hasText: 'Usuário inserido com sucesso' })).toBeVisible()
    }

    async validarMensagemDeErro() {
        await expect(this.page.locator(this.locatorMensagemErro).filter({ hasText: 'Nome é um campo obrigatório' })).toBeVisible()
        await expect(this.page.locator(this.locatorMensagemErro).filter({ hasText: 'Email é um campo obrigatório' })).toBeVisible()
        await expect(this.page.locator(this.locatorMensagemErro).filter({ hasText: 'Senha é um campo obrigatório' })).toBeVisible()
    }
}
