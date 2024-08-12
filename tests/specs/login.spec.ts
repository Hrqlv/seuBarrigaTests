import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { login } from '../../fixture/data';

let loginPage: any

test.describe('[SeuBarriga] Realizar fluxos de login positivo e negativo @LOGIN', async () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    loginPage.goTo()
  })

  test('Realizar login com dados válidos', async ({ page }) => {
    await test.step('Preencher os campos email e senha, apertar em entrar e validar a mensagem de sucesso', async () => {
        await loginPage.clicarEmLogin()
        await loginPage.realizarLogin(login.email, login.senha);
        await loginPage.clicarEmEntrar()
        await loginPage.validarMensagemDeSucesso()
    })

    await test.step('Validar as mensagens de erro', async () => {
        await loginPage.clicarEmSair()
        await loginPage.realizarLogin('qaTest@gmail','qa');
        await loginPage.clicarEmEntrar()
        await loginPage.validarMensagemDeErro()
    })
  });
})

