const validateBlankFields = (name, doc, email, phone, description, password, cPassword) => {
    if ((name === '') || (doc === '') || (email === '') || (phone === '') || (description === '') || (password === '') || (cPassword === '')) return false;
    else return true;
}

const validateName = (name) => {
    if (name === '') return false;
    else return true;
}

const validateDoc = (userType, doc) => {
    if (userType[0] === true) {
        if (!(validateCNPJ(doc))) {
            return 'cnpj'
        }
    }
    if (userType[1] === true) {
        if (!(validateCPF(doc))) {
            return 'cpf'
        }
    }
}

const validateCPF = (doc) => {
    var sum;
    var rest;
    var i;
    sum = 0;
    if (doc == "00000000000") return false;

    for (i = 1; i <= 9; i++) sum = sum + parseInt(doc.substring(i - 1, i)) * (11 - i);
    rest = (sum * 10) % 11;

    if ((rest == 10) || (rest == 11)) rest = 0;
    if (rest != parseInt(doc.substring(9, 10))) return false;

    sum = 0;
    for (i = 1; i <= 10; i++) sum = sum + parseInt(doc.substring(i - 1, i)) * (12 - i);
    rest = (sum * 10) % 11;

    if ((rest == 10) || (rest == 11)) rest = 0;
    if (rest != parseInt(doc.substring(10, 11))) return false;
    return true;
}

const validateCNPJ = (s) => {
    let cnpj = s.replace(/[^\d]+/g, '')

    // Valida a quantidade de caracteres
    if (cnpj.length !== 14)
        return false

    // Elimina inválidos com todos os caracteres iguais
    if (/^(\d)\1+$/.test(cnpj))
        return false

    // Cáculo de validação
    let t = cnpj.length - 2,
        d = cnpj.substring(t),
        d1 = parseInt(d.charAt(0)),
        d2 = parseInt(d.charAt(1)),
        calc = x => {
            let n = cnpj.substring(0, x),
                y = x - 7,
                s = 0,
                r = 0

            for (let i = x; i >= 1; i--) {
                s += n.charAt(x - i) * y--;
                if (y < 2)
                    y = 9
            }

            r = 11 - s % 11
            return r > 9 ? 0 : r
        }

    return calc(t) === d1 && calc(t + 1) === d2
}

const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(re.test(String(email).toLowerCase()));
    return re.test(String(email).toLowerCase());
}

const validatePhone = (phone) => {
    if (phone.length < 11) return false;
    if(!/^[0-9]+$/.test(phone)) return false;
    else return true;
}

const validatePasswordMatch = (password, cPassword) => {
    if (password !== cPassword) return false;
    else return true;
}

const validatePasswordLength = (password, cPassword) => {
    if (password.length < 6) return false;
    else if (cPassword.length < 6) return false;
    else return true;
}

const validateUserType = (userType) => {
    console.log('userType :', userType);
    if ((userType[0] === false) && (userType[1] === false)) return false;
    else return true;
}

const RegisterValidation = (name, doc, email, phone, description, password, cPassword, userType) => {
    if (!(validateBlankFields(name, doc, email, phone, description, password, cPassword, userType))) return { validate: 'Preencha todos os campos!', field: 'all' };
    else if (!(validateName(name))) return { validate: 'Nome inválido!', field: 'name' };
    else if (validateDoc(userType, doc) === 'cnpj') return { validate: 'CPNJ inválido!', field: 'doc' };
    else if (validateDoc(userType, doc) === 'cpf') return { validate: 'CPF inválido!', field: 'doc' };
    else if (!(validateEmail(email))) return { validate: 'Email Inválido!', field: 'email' };
    else if (!(validatePhone(phone))) return { validate: 'Número de telefone inválido!', field: 'phone' };
    else if (!(validatePasswordLength(password, cPassword))) return { validate: 'Insira uma senha com pelo menos 6 dígitos!', field: 'password' };
    else if (!(validatePasswordMatch(password, cPassword))) return { validate: 'As senhas são diferentes!', field: 'passwords' };
    else if (!(validateUserType(userType))) return { validate: 'Indique seu tipo de usuário!', field: 'userType' };
    else return { validate: true, field: null };
}

export { RegisterValidation };