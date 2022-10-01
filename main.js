let cadastro = false;

function render(){
    const tbody = document.getElementById('register-list-body');
    const data = localStorage.getItem("users_db");
    if(tbody && data != null) {
        const clientes = JSON.parse(data);
        clientes.sort( (a,b) => {
            return a.id < b.id ? -1 : 1
        })
        tbody.innerHTML = clientes.map( user => {
            return `<tr>
                        <td hidden>${user.id}</td>
                        <td>${user.cpf}</td>
                        <td>${user.name}</td>
                        <td>${user.fone}</td>
                        <td>
                            <button class='button-list' onclick='view("new",false,${user.id})'><span class="material-symbols-outlined">
                            edit</span></button>
                            <button class='button-list' onclick='askDel(${user.id})'><span class="material-symbols-outlined">
                            delete</span></button>
                        </td>
                    </tr>`
        })
    }
}

function insertUser() {
    let cpf = document.getElementById("cpf").value;
    let name = document.getElementById("name").value;
    let fone = document.getElementById("fone").value;
    const usersStorage = JSON.parse(localStorage.getItem("users_db"));
    const clienteCadastrado = usersStorage?.filter((user) => user.cpf===cpf);

    if(clienteCadastrado?.length) {
        clienteCadastrado[0].cpf = document.getElementById('cpf').value;
        clienteCadastrado[0].name = document.getElementById('name').value;
        clienteCadastrado[0].fone = document.getElementById('fone').value;
        cadastro = true;
        alert("Cadastro foi atualizado!");

    }

    let novoCliente;

    if(usersStorage && cadastro===false) {
        let id = usersStorage.length + 1;
        novoCliente = [...usersStorage, { id, cpf, name, fone }];
    } else {
        id = 1;
        novoCliente = [{ id, cpf, name, fone }];
    }

    if(cadastro) {
        novoCliente = [...usersStorage];
    }

    localStorage.setItem("users_db", JSON.stringify(novoCliente));
    render()
    view('list')
    cadastro=false;
}
 
 function editUser(id, cpf, name, fone){
    const usersStorage = JSON.parse(localStorage.getItem("users_db"));
    const clienteCadastrado = usersStorage?.filter((user) => user.id===id);
    clienteCadastrado.cpf = cpf;
    clienteCadastrado.name = name;
    clienteCadastrado.fone = fone;
}
 
 function delUser(id){
    const usersStorage = JSON.parse(localStorage.getItem("users_db"));
    const clienteCadastrado = usersStorage?.filter( user => {
        return user.id != id
    })
    localStorage.clear();
    localStorage.setItem("users_db", JSON.stringify(clienteCadastrado));
    window.location.reload(true);
}
 
 function askDel(id){
     if(confirm('Quer deletar o registro de id '+id)){
          delUser(id)
     }
}
 
 function limparEdicao(){
    document.getElementById('cpf').value = ''
     document.getElementById('name').value = ''
     document.getElementById('fone').value = ''
}
 
function view(page, newP=false, id=null){
     document.body.setAttribute('page', page);
     if(newP) limparEdicao()
     if(id){
        const usersStorage = JSON.parse(localStorage.getItem("users_db"));
        const clienteCadastrado = usersStorage?.filter((user) => user.id===id);
        if(clienteCadastrado){
            document.getElementById('cpf').value = clienteCadastrado[0].cpf
            document.getElementById('name').value = clienteCadastrado[0].name
            document.getElementById('fone').value = clienteCadastrado[0].fone
        }
     }
     document.getElementById('name').focus()
 }

function submit(e){
     e.preventDefault();
}

window.addEventListener('load', () => {
    render();
    document.getElementById('new-register').addEventListener('submit', submit);
})