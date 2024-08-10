import { test, expect } from '@playwright/test';
import { CadastroPage } from '../pages/cadastro.page';
import { criarUsuario } from '../../helpers/helpers';
import { login } from '../../fixture/data';

let cadastroPage: any
const usuario = criarUsuario()

test.describe('[SeuBarriga] Realizar fluxos de cadastro positivo e negativo @CADASTRO', async () => {
  test.beforeEach(async ({ page }) => {
    cadastroPage = new CadastroPage(page);
    cadastroPage.goTo()
  })
  test('Realizar cadastro com dados válidos', async ({ page }) => {
    await test.step('Preencher os campos nome, email e senha e apertar em cadastrar', async () => {
      cadastroPage.preecherDadosValidos(usuario[0].nome, usuario[0].email, usuario[0].senha)
    })
  });
})

