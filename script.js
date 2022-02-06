
// Modal responsável por inserir novas transações

const Modal = {
    open() {
         //Abrir modal
        // Adicionar a class active ao modal
        document
        .querySelector('.modal-overlay')
        .classList
        .add('active')

    },
    close() {
        // fechar o modal
        // remover a classe active do modal
        document.querySelector('.modal-overlay').classList.remove('active')
    }
}

// Substituir os dados do HTML com os dados que temos aqui no JavaScript 
// Primeiro somar as entradas
// Depois somas as saídas  
// remover das entradas o valor das saídas
// para obter o valor total. 

const Transaction = {
    // Dados de transações na tabela
    all: transactions = [
        {
            description: 'Luz',
            amount: -50000,
            date: '17/01/2022'
        },
        
        { 
            description: 'Website',
            amount: 500000,
            date: '17/01/2022'
        },
    
        { 
            description: 'Internet',
            amount: -20000,
            date: '17/01/2022'
        },
    ],
    
    add(transaction) {
        Transaction.all.push(transaction)
        App.reload()
    },

    remove(index) {
        Transaction.all.splice(index, 1)

        App.reload()
    },

    incomes(){
        let income = 0;
        // pegar todas as transações
        // para cada transação,
        Transaction.all.forEach(transaction => {
            // se ela for maior que zero
            if (transaction.amount > 0) {
            // se for maior que 0, somar a uma variável e retorná-la
                income += transaction.amount
            }
        })
    
        return income
    },
    expenses() {
        let expenses = 0;
        // pegar todas as transações
        // para cada transação,
        Transaction.all.forEach(transaction => {
            // se ela for menor que zero
            if (transaction.amount < 0) {
            // se for maior que 0, somar a uma variável e retorná-la
                expenses += transaction.amount
            }
        })
    
        return expenses
    },
    total () {
        return Transaction.incomes() + Transaction.expenses()
    }
}


const DOM = {
    
    transactionsContainer: document.querySelector('#data-table tbody'),
    
    addTransactions(transactions, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transactions)

        DOM.transactionsContainer.appendChild(tr)
    },
   
    innerHTMLTransaction(transactions) {
        const CSSclass = transactions.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transactions.amount)

        const html = `
        <td class="description">${transactions.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transactions.date}</td>
        <td><img src="assets/minus.svg" alt="Remover transação"></td>
        ` 
        
        return html
    },

    updateBalance() {
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

    clearTransactions () {
        DOM.transactionsContainer.innerHTML = ""
    }
}

// Responsável pela formatação dos valores numéricos 

const Utils = {
    formatCurrency(value) {
       const signal = Number(value) < 0 ? "-" : ""
        
       value = String(value).replace(/\D/g, "")
    
       value = Number(value) / 100

       value = value.toLocaleString("pt-br", {
           style: "currency",
           currency: "BRL"
       })
        
      return signal + value
    },

    formatAmount(value) {
        console.log(value)
    }

}

const App = {
    init () {
        
        Transaction.all.forEach(transaction =>  {
            DOM.addTransactions(transaction)
        })
        
        DOM.updateBalance()
        
       
    },
    reload () {
        DOM.clearTransactions()
        App.init()
    },
}

const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },

    validateFields() {
        const {description, amount, date} = Form.getValues()

        if( description.trim() ==="" ||
            amount.trim() ==="" ||
            date.trim() ==="") {
                throw new Error("Por favor, preencha todos os campos.")
        }
        console.log(Form.getValues())
    },

    formatData() {
        console.log('formatar os dados')
    },
    
    formatValues() {
        let { description, amount, date} = Form.getValues()
        amount = Utils.formatAmount()
    },

    submit(event) {
       event.preventDefault()
      
        
       try { 
      //  Form.validateFields()
        // formatar os dados para salvar
        Form.formatValues()
        // salvar 
        // apagar os dados preenchidos no formulário para utilizar novamente
        // modal fechar
        // atualizar a aplicação

       } catch (error) {
            alert(error.message)             
       }
       // veriicar se todas as infos foram preenchidas     
}   
}

App.init()

Transaction.add({
    id:3,
    description: 'Alo',
    amount: 200,
    date: '04/02/2022'
})

