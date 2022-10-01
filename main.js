const KEY_BD = '@clientes'

var registerList = {
     lastId:0,
     users:[]
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
          .sort( (a, b) => {
               return a.name < b.name ? -1 : 1
          })
          .map( user => {
               return `<tr>
                       <td class="table-client">${user.id}</td>
                       <td class="table-client">${user.cpf}</td>
                       <td class="table-client">${user.name}</td>
                       <td class="table-client">${user.fone}</td>
                       <td class="table-client">
                           <button class='button-register' onclick='view("new",false,${user.id})'>
                           <span class="material-symbols-outlined">
                           edit
                      </span></button>
                           <button class='button-register' onclick='askDel(${user.id})'>
                           <span class="material-symbols-outlined">
                           delete
                      </span></button>
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
 
function view(page, newPage=false, id=null){
     document.body.setAttribute('page',page)
     if(newPage) limparEdicao()
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