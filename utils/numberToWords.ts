
export function numeroParaExtenso(valor: string): string {
  const v = valor.replace(/[^\d,]/g, '').replace(',', '.');
  const n = parseFloat(v);
  
  if (isNaN(n) || n === 0) return '';

  const unidades = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'];
  const dezena1 = ['dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
  const dezenas = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
  const centenas = ['', 'cem', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'];

  function converter_grupo(g: number) {
    if (g === 100) return 'cem';
    let res = '';
    const c = Math.floor(g / 100);
    const d = Math.floor((g % 100) / 10);
    const u = g % 10;

    if (c > 0) res += (c === 1 && (d > 0 || u > 0) ? 'cento' : centenas[c]);
    if (d > 0) {
      if (res !== '') res += ' e ';
      if (d === 1) {
        res += dezena1[u];
        return res;
      }
      res += dezenas[d];
    }
    if (u > 0) {
      if (res !== '') res += ' e ';
      res += unidades[u];
    }
    return res;
  }

  const partes = n.toFixed(2).split('.');
  const inteiro = parseInt(partes[0]);
  const centavos = parseInt(partes[1]);

  let extenso = '';

  if (inteiro > 0) {
    const milhao = Math.floor(inteiro / 1000000);
    const mil = Math.floor((inteiro % 1000000) / 1000);
    const uni = inteiro % 1000;

    if (milhao > 0) {
      extenso += converter_grupo(milhao) + (milhao > 1 ? ' milhões' : ' milhão');
    }
    if (mil > 0) {
      if (extenso !== '') extenso += ' e ';
      extenso += (mil === 1 ? '' : converter_grupo(mil)) + ' mil';
    }
    if (uni > 0) {
      if (extenso !== '') extenso += (uni < 100 ? ' e ' : ' ');
      extenso += converter_grupo(uni);
    }
    extenso += (inteiro === 1 ? ' real' : ' reais');
  }

  if (centavos > 0) {
    if (extenso !== '') extenso += ' e ';
    extenso += converter_grupo(centavos) + (centavos === 1 ? ' centavo' : ' centavos');
  }

  return extenso.trim();
}
