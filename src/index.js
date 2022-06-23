const API_PATH = 'http://localhost:3000/';
const currentForm = document.forms.auth;

function collectData() {
  const data = new FormData(currentForm);
  return {
    login: data.get('login'),
    password: data.get('psw'),
  };
}

function sendForm(method) {
  return fetch(`${API_PATH}${method}`, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(collectData()),
  })
  .then(res => res.json())
  .then(data => {
    if (data.textError) {
      alert(data.textError);
      return;
    }
    
    sessionStorage.setItem('login', true);
    document.location.href = "/script";
  });
}

document.getElementById('login_button').addEventListener('click', e => {
  e.preventDefault();
  sendForm('login');
});

document.getElementById('register_button').addEventListener('click', async (e) => {
  e.preventDefault();
  sendForm('register');
});
