import { login } from '../fixture/data';
import faker, * as fakerBR from 'faker-br';

export interface Usuario {
  nome: string;
  sobrenome: string;
  email: string;
  telefone: string;
  telefonePT: string;
  cpf: string;
  cnpj: string;
  senha: string;
  nomeCompleto: string;
  dataNascimento: string;
}

export function criarUsuario(quantidadeUsuarios = 1): Usuario[] {
  const usuarios = Array.from({ length: quantidadeUsuarios }, (): Usuario => {
    const nome = fakerBR.name.firstName();
    const sobrenome = fakerBR.name.lastName();

    return {
      nome: nome,
      sobrenome: sobrenome,
      email: gerarEmailAleatorio(sobrenome),
      telefone: fakerBR.phone.phoneNumber('11#########'),
      telefonePT: fakerBR.phone.phoneNumber('9########'),
      cpf: fakerBR.br.cpf(),
      cnpj: fakerBR.br.cnpj(),
      senha: login.senha,
      nomeCompleto: gerarNomeCompleto(nome, sobrenome),
      dataNascimento: gerarDataNascimento(),
    };
  });

  return usuarios;
}

export function formatarNome(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').charAt(0).toLowerCase() + str.slice(1);
}

export function gerarNomeCompleto(nome: string, sobrenome: string): string {
  return `${nome} ${sobrenome}`;
}

export function gerarEmailAleatorio(sobrenome: string): string {
  return `qa+${formatarNome(sobrenome)}_${Date.now()}@gipsyy.com`;
}

export function gerarDataNascimento(): string {
  const data = faker.date.past(90);
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();

  return `${dia}/${mes}/${ano}`;
}
