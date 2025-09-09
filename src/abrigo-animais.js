const ANIMAIS_DATA = {
  'Rex': { tipo: 'cão', brinquedos: ['RATO', 'BOLA'] },
  'Mimi': { tipo: 'gato', brinquedos: ['BOLA', 'LASER'] },
  'Fofo': { tipo: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] },
  'Zero': { tipo: 'gato', brinquedos: ['RATO', 'BOLA'] },
  'Bola': { tipo: 'cão', brinquedos: ['CAIXA', 'NOVELO'] },
  'Bebe': { tipo: 'cão', brinquedos: ['LASER', 'RATO', 'BOLA'] },
  'Loco': { tipo: 'jabuti', brinquedos: ['SKATE', 'RATO'] },
};

const TODOS_ANIMAIS_NOMES = Object.keys(ANIMAIS_DATA);
const TODOS_BRINQUEDOS_VALIDOS = [...new Set(TODOS_ANIMAIS_NOMES.flatMap(nome => ANIMAIS_DATA[nome].brinquedos))];

class AbrigoAnimais {

  temSubsequencia(listaPrincipal, subsequencia) {
    if (subsequencia.length === 0) return true;
    let i = 0;
    let j = 0;
    while (j < listaPrincipal.length && i < subsequencia.length) {
      if (listaPrincipal[j] === subsequencia[i]) {
        i++;
      }
      j++;
    }
    return i === subsequencia.length;
  }

  encontraPessoas(brinquedosPessoa1Str, brinquedosPessoa2Str, animaisConsideradosStr) {
    
    const animaisConsiderados = animaisConsideradosStr.split(',').map(s => s.trim()).filter(Boolean);
    const brinquedosPessoa1 = brinquedosPessoa1Str.split(',').map(s => s.trim()).filter(Boolean);
    const brinquedosPessoa2 = brinquedosPessoa2Str.split(',').map(s => s.trim()).filter(Boolean);

    const animaisSet = new Set();
    for (const animal of animaisConsiderados) {
      if (!ANIMAIS_DATA[animal] || animaisSet.has(animal)) {
        return { erro: 'Animal inválido' };
      }
      animaisSet.add(animal);
    }

    const validaBrinquedos = (brinquedos) => {
      const brinquedosSet = new Set();
      for (const brinquedo of brinquedos) {
        if (!TODOS_BRINQUEDOS_VALIDOS.includes(brinquedo) || brinquedosSet.has(brinquedo)) {
          return false;
        }
        brinquedosSet.add(brinquedo);
      }
      return true;
    };

    if (!validaBrinquedos(brinquedosPessoa1) || !validaBrinquedos(brinquedosPessoa2)) {
      return { erro: 'Brinquedo inválido' };
    }
    
    const adocoesPessoa1 = [];
    const adocoesPessoa2 = [];
    const resultados = {};

    for (const nomeAnimal of animaisConsiderados) {
      const animal = ANIMAIS_DATA[nomeAnimal];
      let p1Apto = false;
      let p2Apto = false;

      if (adocoesPessoa1.length < 3) {
          if (nomeAnimal === 'Loco') {
              const brinquedosLocoSet = new Set(animal.brinquedos);
              p1Apto = [...brinquedosLocoSet].every(b => brinquedosPessoa1.includes(b));
          } else {
              p1Apto = this.temSubsequencia(brinquedosPessoa1, animal.brinquedos);
          }
      }

      if (adocoesPessoa2.length < 3) {
          if (nomeAnimal === 'Loco') {
              const brinquedosLocoSet = new Set(animal.brinquedos);
              p2Apto = [...brinquedosLocoSet].every(b => brinquedosPessoa2.includes(b));
          } else {
              p2Apto = this.temSubsequencia(brinquedosPessoa2, animal.brinquedos);
          }
      }
      
      if (p1Apto && p2Apto) {
        resultados[nomeAnimal] = 'abrigo';
      } else if (p1Apto) {
        resultados[nomeAnimal] = 'pessoa 1';
        adocoesPessoa1.push(nomeAnimal);
      } else if (p2Apto) {
        resultados[nomeAnimal] = 'pessoa 2';
        adocoesPessoa2.push(nomeAnimal);
      } else {
        resultados[nomeAnimal] = 'abrigo';
      }
    }

    if (resultados['Loco'] === 'pessoa 1' && adocoesPessoa1.length <= 1) {
        resultados['Loco'] = 'abrigo';
    }
    if (resultados['Loco'] === 'pessoa 2' && adocoesPessoa2.length <= 1) {
        resultados['Loco'] = 'abrigo';
    }
    
    const listaFinal = Object.keys(resultados)
      .sort((a, b) => a.localeCompare(b))
      .map(nomeAnimal => `${nomeAnimal} - ${resultados[nomeAnimal]}`);

    return { lista: listaFinal };
  }
}

export { AbrigoAnimais as AbrigoAnimais };
