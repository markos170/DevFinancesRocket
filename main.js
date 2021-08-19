
const Modal = {
    open(){
        document
            .querySelector('.modal-overlay') /*seleciona .modal-overlay*/
            .classList
            .add('active')/**adciona a classe active*/ 
    },
    close(){
        document
            .querySelector('.modal-overlay')
            .classList
            .remove('active') /**remove a classe active**/
    }
}

const transactions = [
{
    id: 1,
    description: 'Luz',
    amount: -50000,
    date: '23/01/2021',
},

{
    id: 2,
    description: 'Criação website',
    amount: 500000,
    date: '23/01/2021',
}, 

{ 
    id: 3,
    description: 'Internet',
    amount: -150000,
    date: '23/01/2021',
},

{ 
    id: 4,
    description: 'Sale',
    amount: 40000,
    date: '23/01/2021',
},

]

const Transaction = {
    incomes() {
        /*somar as entradas*/
    },
    expenses() {
       /*somar as saídas*/
    },
    total() {
        //entradas - saídas
    }
}

// substituir os dados do html com os dados do JS
//
const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index){
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)
        DOM.transactionsContainer.appendChild(tr)
    },

    innerHTMLTransaction(transaction){
        const CSSclass = transaction.amount > 0 ? "income" :
        "expense"
        const amount = Utils.formatCurrency(transaction.amount)

        const html = ` 
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
            <img src="/assets/minus.svg" alt="Remover transação">
        </td>
        `
        return html
    },

    updateBalance(){
        document
            .getElementById('incomeDisplay')
            .innerHTML = "Discover"
        document
            .getElementById('expenseDisplay')
            .innerHTML = "Discover"
        document
            .getElementById('totalDisplay')
            .innerHTML = "Discover"
        
    }   
}

const Utils = {
    formatCurrency(value) {
       const signal = Number(value) < 0 ? "-" : ""

       value = String(value).replace(/\D/g, "")
       value = Number(value) / 100
       value = value.toLocaleString("pt-BR", {
           style: "currency",
           currency: "BRL"
       })
       
       return signal + value
    }
}

transactions.forEach(function(transaction){
    DOM.addTransaction(transaction)
})

DOM.updateBalance()