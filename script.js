class Calculator {
    constructor(previousOperandText, currentOperandText) {

        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.answer = 0
        this.preAnswer = 0
        this.clear()
    }
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    factorial(n) {
        let res = 1
        for (let i = 1; i <= n; i++) {
            res *= i
        }
        return res
    }
    Operation(operation) {
        const postFixOperator =
            ['!', '%', 'x²']

        if (postFixOperator.includes(operation)) {

            this.singleOperatorCompute(operation)

            return
        }
        const prefixOperators =
            ['√', 'log']

        if (prefixOperators.includes(operation)) {

            this.operation = operation

            this.previousOperand = operation

            return
        }
        if (this.currentOperand == '') return  // Not execute

        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    appendNumber(number) {
        if (number == '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    singleOperatorCompute(operation) {
        switch (operation) {
            case '!': {
                const num = parseFloat(this.currentOperand)

                if (num < 0 || !Number.isInteger(num)) {
                    this.currentOperand = "Math Error"
                    break
                }

                this.currentOperand = this.factorial(num)
                break
            }

            case '%': {
                const num = parseFloat(this.currentOperand)
                this.currentOperand = num / 100
                break
            }


            case 'x²': {
                const num = parseFloat(this.currentOperand)

                this.currentOperand = num * num
                break
            }

            default:
                return
        }
        if (this.currentOperand !== "Math Error") {
            this.preAnswer = this.answer
            this.answer = this.currentOperand
        }
    }
    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const curr = parseFloat(this.currentOperand)
        if (this.operation === '√') {

    if (isNaN(curr)) return

    if (curr < 0) {
        this.currentOperand = "Math Error"
        return
    }

    this.currentOperand = Math.sqrt(curr)

    this.preAnswer = this.answer
    this.answer = this.currentOperand

    this.operation = undefined
    this.previousOperand = ''

    return
}
if (this.operation === 'log') {

    if (isNaN(curr)) return

    if (curr <= 0) {
        this.currentOperand = "Math Error"
        return
    }

    this.currentOperand = Math.log10(curr)

    this.preAnswer = this.answer
    this.answer = this.currentOperand

    this.operation = undefined
    this.previousOperand = ''

    return
}
        if (isNaN(prev) || isNaN(curr)) return
        switch (this.operation) {
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
                if (curr === 0) {
                    this.currentOperand = "Math Error"
                    this.operation = undefined
                    this.previousOperand = ''
                    return
                }
                computation = prev / curr
                break
            case 'xʸ':
                computation = prev ** curr
                break
            default:
                return

        }

        this.currentOperand = computation
        this.preAnswer = this.answer
        this.answer = computation       // Display answer 
        this.operation = undefined
        this.previousOperand = ''

    }
    getDisplayNumber(number) {

        const stringNumber = number.toString()

        const integerDigits =
            parseFloat(stringNumber.split('.')[0])

        const decimalDigits =
            stringNumber.split('.')[1]

        let integerDisplay

        if (isNaN(integerDigits)) {
            integerDisplay = ''
        }
        else {
            integerDisplay =
                integerDigits.toLocaleString('en', {
                    maximumFractionDigits: 0
                })
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        }

        return integerDisplay
    }
    updateDisplay() {

        if (this.currentOperand === "Math Error") {
            this.currentOperandText.innerText = "Math Error"
        }
        else {
            this.currentOperandText.innerText =
                this.getDisplayNumber(this.currentOperand)
        }
        if(this.operation ==='log' || 
            this.operation === '√')
        {
            this.previousOperandText.innerText = this.operation


        } else if (this.operation != null) {

            this.previousOperandText.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`

        }
        else {
            this.previousOperandText.innerText = ''
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operation = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equal]')
const deleteButton = document.querySelector('[data-delete]')
const ACButton = document.querySelector('[data-clear-all]')
const previousOperandText = document.querySelector('[data-previous-operand]')
const currentOperandText = document.querySelector('[data-current-operand]')
const displayButton = document.querySelectorAll('[data-display]')


const calculator = new Calculator(previousOperandText, currentOperandText);

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

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

displayButton.forEach(button => {
    button.addEventListener('click', () => {
        if (button.innerText == 'Ans') {
            console.log('Ans')
            calculator.appendNumber(calculator.answer)
        }

        if (button.innerText == 'PrAns') {
            console.log('PrAns')
            calculator.appendNumber(calculator.preAnswer)
        }

        calculator.updateDisplay()
    })
})