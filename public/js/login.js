const loginHandler = async (event) =>{
    event.preventDefault();

    const password = document.querySelector("#password-login").value.trim()
    const email = document.querySelector("#email-login").value.trim()

    if(email && password) {
        const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
        });
        const results = await response.json()
        console.log(results)
        if (response.ok) {
            document.location.replace('/')
        }
    }
}