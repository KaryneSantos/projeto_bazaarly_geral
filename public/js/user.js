const buttonSign = document.getElementById('signup-btn');

buttonSign.addEventListener('click', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const conf_password = document.getElementById('confirm_password').value;
    const type = document.getElementById('user_type').value;

    console.log(name);
    console.log(email);
    console.log(password);
    console.log(conf_password);


    if(!name) {
        displayErrors('Todos os campos são obrigatórios.');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        displayErrors('E-mail inválido.');
        return;
    }


    if(password.length < 8) {
        displayErrors('A senha deve conter pelo menos 8 caracteres.');
        return;
    }

    if(!password || !conf_password) {
        displayErrors('Senha é obrigatório.');
        return;
    }

    if(password != conf_password) {
        displayErrors('As senhas não coincidem.');
        return;
    }

    try {
        const response = await fetch('/sign', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, email, password, confirm_password: conf_password, user_type: type})
        });

        console.log({name, email, password, conf_password, user_type: type});
                
        if(!response.ok) {
            const {errors} = await response.json();
            displayErrors(errors);
            return;
        } else {
            const form = document.getElementById('form-cadastro');
            form.submit();
            window.location = '/profile';
        }

    } catch(err) {
        console.error('Erro ao enviar o formulário:', err);
        displayErrors('Erro ao cadastrar usuário, tente novamente!');
    }
});

function displayErrors(errors) {
    const errorContainer = document.getElementById('msg');
    errorContainer.innerHTML = '';

    if (typeof errors === 'string') {
        const errorElement = document.createElement('p');
        errorElement.textContent = errors;
        errorElement.classList.add('error-message');
        console.log(errorElement);
        errorContainer.appendChild(errorElement);
    } else if (Array.isArray(errors)) {
        errors.forEach((error) => {
            const errorElement = document.createElement('p');
            errorElement.textContent = error.msg;
            errorElement.classList.add('error-message');
            console.log(errorElement);
            errorContainer.appendChild(errorElement);
        });
    }
}