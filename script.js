class Calculator{
    constructor(previousOperandText,currentOperandText){

        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;

        this.clear()
    }
    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }
    Operation (operation){
        if (this.currentOperand == '') return  // Not execute
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    appendNumber(number){
        if (number == '.' && this.currentOperand.includes('.')) return
        this.currentOperand =this.currentOperand.toString() + number.toString()
    }
    compute(){
        let computation 
        const prev = parseFloat(this.previousOperand)
        const curr = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(curr)) return
        switch(this.operation){
            case '+': 
                computation = prev + curr
                break
            case '-':
                computation = prev - curr
                break
            case '*':
                computation = prev * curr
                break
            case '/':
                if (curr===0) {
                    computation = "Math Error"
                    break
                }
                computation = prev / curr
                break
            default : 
                return
            
        }
        this.currentOperand = computation
        this.operation= undefined
        this.previousOperand = ''

    }
    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay= ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en',{
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }
    updateDisplay(){
        this.currentOperandText.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null){
            this.previousOperandText.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`             // Display comma in calculator 
        } else {
            this.previousOperandText.innerText = ''
        }
        
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operation = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector ('[data-equal]')
const deleteButton = document.querySelector ('[data-delete]')
const ACButton = document.querySelector ('[data-clear-all]')
const previousOperandText = document.querySelector ('[data-previous-operand]')
const currentOperandText = document.querySelector ('[data-current-operand]')


const calculator = new Calculator(previousOperandText,currentOperandText);

// Xử lý các nút chọn số của các button 

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
       calculator.appendNumber(button.innerText)
       calculator.updateDisplay()
    })
})
// Xử lý các thông số operation phép toán 
operation.forEach(button => {
    button.addEventListener('click', () => {
       calculator.Operation(button.innerText)
       calculator.updateDisplay()
    })
})
equalsButton.addEventListener('click', button => {

    calculator.compute()
    calculator.updateDisplay()

})

ACButton.addEventListener('click', button => {

    calculator.clear()
    calculator.updateDisplay()

})

deleteButton.addEventListener('click',button => {
    calculator.delete()
    calculator.updateDisplay()
})