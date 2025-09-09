import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve rejeitar animal duplicado na lista', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA', '', 'Rex,Fofo,Rex');
    expect(resultado.erro).toBe('Animal inválido');
  });

  test('Deve rejeitar brinquedo inválido (não existente)', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,PEDRA', '', 'Rex');
    expect(resultado.erro).toBe('Brinquedo inválido');
  });

  test('Deve rejeitar brinquedo duplicado na lista de uma pessoa', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,RATO,BOLA', '', 'Rex');
    expect(resultado.erro).toBe('Brinquedo inválido');
  });

  test('REGRA 4: Se ambos podem adotar, o animal fica no abrigo (desempate)', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA', 'RATO,BOLA', 'Rex');
    expect(resultado.lista[0]).toBe('Rex - abrigo');
  });
  
  test('REGRA 5: Uma pessoa não pode adotar mais de 3 animais', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'LASER,RATO,BOLA,CAIXA,NOVELO', '', 'Rex,Bebe,Zero,Bola');

    expect(resultado.lista[0]).toBe('Bebe - pessoa 1');
    expect(resultado.lista[1]).toBe('Bola - abrigo');
    expect(resultado.lista[2]).toBe('Rex - pessoa 1');
    expect(resultado.lista[3]).toBe('Zero - pessoa 1');
  });

  test('REGRA 6: Loco deve ficar no abrigo se não tiver companhia', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('SKATE,RATO', '', 'Loco');
    expect(resultado.lista[0]).toBe('Loco - abrigo');
  });

  test('REGRA 6: Loco pode ser adotado se tiver outra companhia na mesma adoção', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('SKATE,RATO,BOLA', '', 'Loco,Rex');
    expect(resultado.lista[0]).toBe('Loco - pessoa 1');
    expect(resultado.lista[1]).toBe('Rex - pessoa 1');
  });

  test('REGRA 6: Loco não se importa com a ordem dos brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('SKATE,RATO,BOLA', '', 'Loco,Rex');
    expect(resultado.lista[0]).toBe('Loco - pessoa 1');
    expect(resultado.lista[1]).toBe('Rex - pessoa 1');
  });

  test('REGRA 1: A ordem dos brinquedos importa para animais que não são o Loco', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,RATO', '', 'Rex');
    expect(resultado.lista[0]).toBe('Rex - abrigo');
  });

  test('Deve lidar com entradas vazias sem gerar erro', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('', '', '');
    expect(resultado.lista.length).toBe(0);
    expect(resultado.erro).toBeFalsy();
  });

});
