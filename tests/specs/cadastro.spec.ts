import { test, expect } from '@playwright/test';
import { CadastroPage } from '../pages/cadastro.page';

let cadastroPage: any

test.describe('[SeuBarriga] Realizar fluxos de cadastro positivo e negativo @CADASTRO', async () => {
  test.beforeEach(async ({ page }) => {
    cadastroPage = new CadastroPage(page);
    cadastroPage.goTo()
  })
  test('Realizar cadastro com dados válidos', async ({ page }) => {
    await test.step('Preencher os campos nome, email e senha e apertar em cadastrar', async () => {
      
    })
  });
})

