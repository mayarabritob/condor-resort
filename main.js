const KEY_BD = '@clientes'

var registerList = {
     lastId:0,
     users:[
        {id:1, cpf:'03621688145', name:'Mayara Brito de Oliveira', fone:'67 99296-4312'}
     ]
}


function saveBD(){
     localStorage.setItem(KEY_BD, JSON.stringify(registerList) )
 }

 function readBD(){
     const data = localStorage.getItem(KEY_BD)
     if(data){
          registerList = JSON.parse(data)
     }
     render()
 }
 

function render(){
     const tbody = document.getElementById('register-list-body')
     if(tbody){

        data = data
          .sort( (a,b) => {
               return a.name < b.name ? -1 : 1
          })
          .map( user => {
               return `<tr>
                       <td>${user.id}</td>
                       <td>${user.cpf}</td>
                       <td>${user.name}</td>
                       <td>${user.fone}</td>
                       <td>
                           <button class='button-register' onclick='view("new",false,${user.id})'>Editar</button>
                           <button class='button-register' onclick='perguntarSeDeleta(${user.id})'>Deletar</button>
                       </td>
                   </tr>`
           } )
       tbody.innerHTML = data.join('')
   }
}

function insertUser(cpf, name, fone){
     const id = registerList.lastId + 1;
     registerList.lastId = id;
     registerList.users.push({
         id, cpf, name, fone
     })
     saveBD()
     render()
     view('list')
 }
 
 function editUser(id, cpf, name, fone){
     var user = registerList.users.find( user => user.id == id )
     user.cpf = cpf;
     user.name = name;
     user.fone = fone;
     saveBD()
     render()
     view('list')
 }
 
 function delUser(id){
     registerList.users = registerList.users.filter( user => {
         return user.id != id
     } )
     saveBD()
     render()
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
     document.body.setAttribute('page', page)
     if(newP) limparEdicao()
     if(id){
         const user = registerList.users.find( user => user.id == id )
         if(user){
             document.getElementById('id').value = user.id
             document.getElementById('cpf').value = user.cpf
             document.getElementById('name').value = user.name
             document.getElementById('fone').value = user.fone
         }
     }
     document.getElementById('name').focus()
 }

function submit(e){
     e.preventDefault()
     const data = {
         id: document.getElementById('id').value,
         cpf: document.getElementById('cpf').value,
         name: document.getElementById('name').value,
         fone: document.getElementById('fone').value,
     }
     if(data.id){
         editUser(data.id, data.cpf, data.name, data.fone)
     }else{
         insertUser(data.cpf, data.name, data.fone)
     }
 }


 window.addEventListener('load', () => {
     readBD()
     document.getElementById('new-register').addEventListener('submit', submit)
 })