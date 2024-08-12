import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { login } from '../../fixture/data';

let loginPage: any

test.describe('[SeuBarriga] Realizar fluxos de login positivo e negativo @LOGIN', async () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto('/')
  })

  test('Realizar login com dados válidos', async ({ page }) => {
    await test.step('Preencher os campos email e senha, apertar em entrar e validar a mensagem de sucesso', async () => {
        await loginPage.realizarLogin(login.email, login.senha);
        await loginPage.clicarEmEntrar()
        await loginPage.validarMensagemDeSucesso()
    })

    await test.step('Validar as mensagens de erro para usuario e senha errada', async () => {
        await loginPage.clicarEmSair()
        await loginPage.realizarLogin('qaTest@gmail','qa');
        await loginPage.clicarEmEntrar()
        await loginPage.validarMensagemDeErroParaUsuarioSenhaErrada()
    })

    await test.step('Validar todas as mensagens de erro para campos obrigatórios', async () => {
      await loginPage.realizarLogin('','');
      await loginPage.clicarEmEntrar()
      await loginPage.validarTodasAsMensagensErros()
  })
  });
})

