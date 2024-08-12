import { test, expect } from '@playwright/test';
import { CadastroPage } from '../pages/cadastro.page';

let cadastroPage: any
let usuarioCadastrado: { email: string, senha: string };

test.describe('[SeuBarriga] Realizar fluxos de cadastro positivo e negativo @CADASTRO', async () => {
  test.beforeEach(async ({ page }) => {
    cadastroPage = new CadastroPage(page);
    await page.goto('/')
    await cadastroPage.clicarNovoUsuario()
  })

  test('Realizar cadastro com dados válidos', async ({ page }) => {
    await test.step('Preencher os campos nome, email e senha, apertar em cadastrar e validar a mensagem de sucesso', async () => {
      usuarioCadastrado = await cadastroPage.cadastrarUsuarioAleatorio();
      await cadastroPage.clicarEmCadastrar()
      await cadastroPage.validarMensagemDeSucesso()
    })

    await test.step('Validar as mensagens de erro', async () => {
      await cadastroPage.clicarNovoUsuario()
      await cadastroPage.clicarEmCadastrar()
      await cadastroPage.validarMensagemDeErro()
    })
  });
})

