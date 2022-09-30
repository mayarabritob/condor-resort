const KEY_BD = '@usuariosestudo'

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
     const tbody = document.getElementById('registerList-body')
     if(tbody){
          var data = registerList.users;
          if(filter.trim()){
               const expReg = eval(`/${filter.trim().replace(/[^\d\w]+/g,'.*')}/i`)
            data = data.filter( user => {
                return expReg.test( user.cpf ) || expReg.test( user.name ) || expReg.test( user.tel )
            } )
        }
        data = data
          .sort( (a,b) => {
               return a.name < b.name ? -1 : 1
          })
          .map( usuario => {
               return `<tr>
                       <td>${user.id}</td>
                       <td>${user.cpf}</td>
                       <td>${user.name}</td>
                       <td>${user.tel}</td>
                       <td>
                           <button onclick='view("new",false,${user.id})'>Editar</button>
                           <button class='button-register' onclick='perguntarSeDeleta(${user.id})'>Deletar</button>
                       </td>
                   </tr>`
           } )
       tbody.innerHTML = data.join('')
   }
}

function insertUser(cpf, name, tel){
     const id = registerList.lastId + 1;
     registerList.lastId = id;
     registerList.users.push({
         id, cpf, name, tel
     })
     saveBD()
     render()
     view('list')
 }
 
 function editUser(id, cpf, name, tel){
     var user = registerList.users.find( user => user.id == id )
     user.name = name;
     user.tel = tel;
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
     document.getElementById('name').value = ''
     document.getElementById('tel').value = ''
 }
 
function view(page, new=false, id=null){
     document.body.setAttribute('page', page)
     if(new) limparEdicao()
     if(id){
         const user = registerList.users.find( user => user.id == id )
         if(user){
             document.getElementById('id').value = user.id
             document.getElementById('cpf').value = user.cpf
             document.getElementById('name').value = usuario.name
             document.getElementById('tel').value = usuario.tel
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
         tel: document.getElementById('tel').value,
     }
     if(data.id){
         editUser(data.id, data.cpf, data.name, data.tel)
     }else{
         insertUser(data.cpf, data.name, data.tel )
     }
 }


 window.addEventListener('load', () => {
     readBD()
     document.getElementById('new-register').addEventListener('submit', submit)
 })