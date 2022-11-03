const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sEmpresa = document.querySelector('#m-empresa')
const sFuncao = document.querySelector('#m-funcao')
const sSalario = document.querySelector('#m-salario')
const sSaida = document.querySelector('#m-saida')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    sEmpresa.value = itens[index].empresa
    sFuncao.value = itens[index].funcao
    sSalario.value = itens[index].salario
    sSaida.value = itens[index].saida
    id = index
  } else {
    sNome.value = ''
    sEmpresa.value = ''
    sFuncao.value = ''
    sSalario.value = ''
    sSaida.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.empresa}</td>
    <td>${item.saida}</td>
    <td>${item.funcao}</td>
    <td> ${item.salario}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sNome.value == '' || sEmpresa.value == '' || sFuncao.value == ''   || sSalario.value == '' || sSaida.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].empresa = sNome.value
    itens[id].funcao = sFuncao.value
    itens[id].salario = sSalario.value
    itens[id].saida = sSaida.value
  } else {
    itens.push({'nome': sNome.value,  'empresa': sEmpresa.value, 'funcao': sFuncao.value, 'salario': sSalario.value, 'saida': sSaida.value,})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}




const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()