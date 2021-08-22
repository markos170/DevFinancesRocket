
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

const Storage = {
    get(){
        return JSON.parse(localStorage.getItem("dev.finances:transactions")) || []
    },
    set(transactions){
        localStorage.setItem("dev.finances:transactions", JSON.stringify(transactions))
    }

}

const Transaction = {
    all: Storage.get(),
  

    add(transaction){
       Transaction.all.push(transaction)
       App.reload()
    },

    remove(index){
        Transaction.all.splice(index, 1)
        App.reload()
    },

    incomes() {
        //criar uma variavel 
        let income = 0;
        // pegar todas as transações
        //para cada transação
        Transaction.all.forEach(transaction => {
            //se ela for maior que zero
            if(transaction.amount > 0) {
                //somar a uma variavel e retornar a variavel
                income += transaction.amount;
            }

        })
        
        return income;
    },

    expenses() {
        //criar uma variavel 
        let expense = 0;
        // pegar todas as transações
        //para cada transação
        Transaction.all.forEach(transaction => {
            //se ela for menor que zero
            if(transaction.amount < 0) {
                //somar a uma variavel e retornar a variavel
                expense += transaction.amount;
            }
 
        })
         
        return expense;
    
    },

    total() {
        return Transaction.incomes() + Transaction.expenses();    
    }
}
// substituir os dados do html com os dados do JS
//
const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index){
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
        
        DOM.transactionsContainer.appendChild(tr)
    },

    innerHTMLTransaction(transaction, index){
        const CSSclass = transaction.amount > 0 ? "income" :
        "expense"
        const amount = Utils.formatCurrency(transaction.amount)

        const html = ` 
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
            <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover transação">
        </td>
        `
        return html
    },

    updateBalance(){
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes())
        document
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.expenses())
        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.total())
        
    },
    
    clearTransaction(){
        DOM.transactionsContainer.innerHTML = ""
    }
}

const Utils = {
    formatAmount(value){
        value = Number(value) * 100        
        return value
    },  

    formatDate(date){
        const splitteDate = date.split("-") 
        return `${splitteDate[2]}/${splitteDate[1]}/${splitteDate[0]}`       
    },

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

//verificar se todas as informações
//formatar os dados para salvar
//salvar
//apagar os dados do formulário
//atualizar a aplicação
const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues(){
        return{
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value    
        }
    },

    formatValues(){
        let {description, amount, date} = Form.getValues()
        amount = Utils.formatAmount(amount)
        date = Utils.formatDate(date)
        
        return{
            description,
            amount,
            date,
        }
    },
    
    validateField(){
        const {description, amount, date} = Form.getValues()
        //valida se recebeu conteúdo 
        if (description.trim() === "" || 
            amount.trim() === "" ||
            date.trim() === "") {
                throw new Error("Por favor, preencha todos os campos")

        }
    },

    clearFields(){
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
        
    },

    submit(event){
        event.preventDefault()
        
        try{
            Form.validateField()// validando formulário
            const transaction = Form.formatValues()//formatando data
            Transaction.add(transaction)//salvando dados
            Form.clearFields()//limpar form
            Modal.close()//fechar Modal

        } catch (error){
            alert(error.message)
        }   
        
    }
}

const App = {
    init() {
        Transaction.all.forEach((transaction, index) => {
            DOM.addTransaction(transaction, index)
        })
        
        DOM.updateBalance()
        Storage.set(Transaction.all)
    },
    reload() {
        DOM.clearTransaction()
        App.init()
    },

}
App.init()





  
