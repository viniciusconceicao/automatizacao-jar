export function validarCpf(cpf) {
    if (!cpf || cpf.length !== 11) {
        return { valido: false, texto: "O CPF deve conter 11 dígitos" }
    } else {
        return { valido: true, texto: "" }
    }
}

export function validarNome(nome) {
    if (!nome || nome.length < 10) {
        return { valido: false, texto: "Por favor, digite seu nome completo" }
    } else {
        return { valido: true, texto: "" }
    }
}

export function validarSenha(senha) {
    if (senha.length < 8 ) {
      return { valido: false, texto: "Senha deve conter no mínimo 8 dígitos" };
    } else {
      return { valido: true, texto: "" };
    }
}

export function validarEmail(email) {
    if (email.length < 10 ) {
        return { valido: false, texto: "Digite um email válido. ex: exemplo@dominio.com" };
      } else {
        return { valido: true, texto: "" };
      }

}

export function validarTelefone(phone) {
    if (phone.length < 11 ) {
        return { valido: false, texto: "Digite um numero de telefone válido. ex: 11999999999" };
      } else {
        return { valido: true, texto: "" };
      }

}
