function validarCNPJ(cnpj) {
    // Remove caracteres não numéricos
    cnpj = cnpj.replace(/[^\d]+/g, '');
  
    // Verifica se tem 14 dígitos
    if (cnpj.length !== 14) return false;
  
    // Elimina CNPJs inválidos conhecidos (como todos os números iguais)
    if (/^(\d)\1+$/.test(cnpj)) return false;
  
    const calcularDigito = (cnpj, posicaoInicial) => {
      let soma = 0;
      let peso = posicaoInicial;
  
      for (let i = 0; i < cnpj.length; i++) {
        soma += parseInt(cnpj[i]) * peso;
        peso = peso === 2 ? 9 : peso - 1;
      }
  
      const resto = soma % 11;
      return resto < 2 ? 0 : 11 - resto;
    };
  
    // Verifica os dois dígitos verificadores
    const corpo = cnpj.slice(0, 12);
    const digito1 = calcularDigito(corpo, 5);
    const digito2 = calcularDigito(corpo + digito1, 6);
  
    return cnpj === corpo + digito1 + digito2;
  }
  
module.exports = validarCNPJ;
  