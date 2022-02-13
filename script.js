class Calculator{
    constructor(previousresultText, currentresultText){
        this.previousresultText = previousresultText
        this.currentresultText = currentresultText
        this.clear()
    }

    clear(){
        this.currentresult = ''
        this.previousresult = ''
        this.operation = undefined
    }

    clearentry(){
        this.currentresult = ''
    }

    appendnumber(number){
        if (number == '.' && this.currentresult.includes('.')) return 
        this.currentresult = this.currentresult.toString() + number.toString()
    }

    operationfunction(operation){
        if (this.currentresult === '') return
        if (this.previousresult !== ''){
            this.compute()
        }
        this.operation = operation 
        this.previousresult = this.currentresultText
        this.currentresult = ''
    }

    compute(){
        let computation
        const previous = parseFloat(this.previousresult)
        const current = parseFloat(this.currentresult)
        if (isNaN(previous) || isNaN(current)) return
        switch(this.operation){
            case '+':
                computation = previous + current
                break
            case '-':
                computation = previous - current
                break
            case '*':
                computation = previous * current
                break
            case '/':
                computation = previous / current
                break
            default:
                return
        }
        this.currentresult = computation
        this.operation = undefined
        this.previousresult = ''
    }   

    getresult(number){
        const stringNum = number.toString()
        const integerDigits = parseFloat(stringNum.split('.')[0])
        const decimalDigits = stringNum.split('.')[1]
        let integershow
        if (isNaN(integerDigits)){
            integershow = ''
        } else{
            integershow = integerDigits.toLocaleString('en', {maximumFractionDigits:0})
        } if (decimalDigits != null){
            return `${integershow}.${decimalDigits}`
        } else{
            return integershow
        }
    }

    forward(){
        this.currentresultText.innerText =
            this.getresult(this.currentresult)
        if (this.operation != null){
            this.previousresultText.innerText = 
                `${this.getresult(this.previousresult)} ${this.operation}`
            } else {      
                this.previousresultText.innerText = ''
            }
        }   
    }

const numberbutton = document.querySelectorAll('[data-number]')
const operationbutton = document.querySelectorAll('[data-operation]')
const equalbutton = document.querySelector('[data-equal]')
const clearentrybutton = document.querySelector('[data-clear-entry]')
const clearbutton = document.querySelector('[data-clear]')
const previousresultText = document.querySelector('[data-previous-result]')
const currentresultText = document.querySelector('[data-current-result]')

const calculator = new Calculator(previousresultText, currentresultText)

numberbutton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendnumber(button.innerText)
        calculator.forward()
    })
})

operationbutton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.operationfunction(button.innerText)
        calculator.forward()
    })
})

equalbutton.addEventListener('click', button =>{
    calculator.compute()
    calculator.forward()
})

clearbutton.addEventListener('click', button =>{
    calculator.clear()
    calculator.forward()
})

clearentrybutton.addEventListener('click', button =>{
    calculator.clearentry()
    calculator.forward()
})

(function () {
      
      const remote = require('electron').remote; 
      
      function init() { 
        document.getElementById("min-btn").addEventListener("click", function (e) {
          const window = remote.getCurrentWindow();
          window.minimize(); 
        });
        
        document.getElementById("max-btn").addEventListener("click", function (e) {
          const window = remote.getCurrentWindow();
          if (!window.isMaximized()) {
            window.maximize();
          } else {
            window.unmaximize();
          }	 
        });
        
        document.getElementById("close-btn").addEventListener("click", function (e) {
          const window = remote.getCurrentWindow();
          window.close();
        }); 
      }; 
      
      document.onreadystatechange = function () {
        if (document.readyState == "complete") {
          init(); 
        }
      };
})();