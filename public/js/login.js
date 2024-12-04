const buttonLogin = document.getElementById('button-entrar');

buttonLogin.addEventListener('click', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        displayErrors('E-mail inválido.');
        return;
    }

    if (!password) {
        displayErrors('A senha é obrigatória.');
        return;
    }

    if (password.length < 8) {
        displayErrors('A senha deve conter pelo menos 8 caracteres.');
        return;
    }

    try {
        const response = await fetch('/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Login realizado com sucesso!');
            window.location.href = '/profile';
        } else {
            displayErrors(data.errors || 'Erro ao fazer login. Tente novamente.');
        }
    } catch (error) {
        displayErrors('Erro no servidor. Tente novamente mais tarde.');
        console.error('Erro no login:', error);
    }
});

function displayErrors(errors) {
    const errorContainer = document.getElementById('msg');
    errorContainer.innerHTML = '';

    if (typeof errors === 'string') {
        const errorElement = document.createElement('p');
        errorElement.textContent = errors;
        errorElement.classList.add('error-message');
        errorContainer.appendChild(errorElement);
    } else if (Array.isArray(errors)) {
        errors.forEach((error) => {
            const errorElement = document.createElement('p');
            errorElement.textContent = error.msg;
            errorElement.classList.add('error-message');
            errorContainer.appendChild(errorElement);
        });
    }
}
