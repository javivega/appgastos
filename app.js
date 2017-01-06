var budgetController = (function(){
    
    
    
    
    
})();



var UiController = (function(){
    
    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        addButton: '.add__btn'
    }
    
    return {
        getInputData: function(){
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value
            }
        },
        
        getStrings: function(){
            return DOMStrings;
        }
    }
    
    
    
})();



var Controller = (function(bdgCtrl, uiCtrl){
    
    
    var DOM = uiCtrl.getStrings()
    
    var ctrlAddItem = function(){
        var getInputs = uiCtrl.getInputData();
        console.log(getInputs);
    }
  

    
    
    document.querySelector(DOM.addButton).addEventListener('click', ctrlAddItem);
    
    document.addEventListener('keypress', function(event){
        
        if(event.keyCode === 13 || event.which === 13){
            ctrlAddItem();
        }
    })
    
    
    
})(budgetController, UiController);
