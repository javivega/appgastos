var budgetController = (function(){
    
    var incomes = function(id, desc, val){
        this.id = id;
        this.desc = desc;
        this.val = val;
    }
    
    var expenses = function(id, desc, val){
        this.id = id;
        this.desc = desc;
        this.val = val;
    }
    
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        
        totals: {
            exp: 0,
            inc: 0
        }
    }
    
    return {
        addItem: function(type, desc, val){
            var element, ID;
            
            if(data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            
            
            if(type === 'exp'){
                element = new expenses(ID, desc, val);
            } else if(type === 'inc'){
                element = new incomes(ID, desc, val);
            }
            
            data.allItems[type].push(element);
            return element;
        }
        
    }
    
    
    
})();



var UiController = (function(){
    
    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        addButton: '.add__btn',
        expense: '.expenses__list',
        income: '.income__list'
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
        },
        
        clearInputs: function(){
            document.querySelector(DOMStrings.inputDescription).value = "";
            document.querySelector(DOMStrings.inputValue).value = "";
            
            document.querySelector(DOMStrings.inputDescription).focus();
            
            
        },
        
        displayItem: function(obj, type){
            var html, newHtml, element;
            
            if(type === 'inc'){
                element = document.querySelector(DOMStrings.income);
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%val%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
        
            else if(type === 'exp'){
                element = document.querySelector(DOMStrings.expense);
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%val%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            
            newHtml = html.replace('%id', obj.id);
            newHtml = newHtml.replace('%desc%', obj.desc);
            newHtml = newHtml.replace('%val%', obj.val);
            
            element.insertAdjacentHTML('beforeend', newHtml);
            
            
        }
    }
    
    
    
})();



var Controller = (function(bdgCtrl, uiCtrl){
    
    
    var DOM = uiCtrl.getStrings()
    
    var ctrlAddItem = function(){
        var getInputs = uiCtrl.getInputData();
        console.log(getInputs);
        
        if(getInputs.description != "" && !isNaN(getInputs.value) && getInputs.description != 0){
            var getItem = bdgCtrl.addItem(getInputs.type, getInputs.description, getInputs.value);console.log(getItem);uiCtrl.clearInputs();uiCtrl.displayItem(getItem, getInputs.type);
        }
        
    }
  
    var setupEventListeners = function(){
        document.querySelector(DOM.addButton).addEventListener('click', ctrlAddItem);
    
        document.addEventListener('keypress', function(event){
        
        if(event.keyCode === 13 || event.which === 13){
            ctrlAddItem();
        }
    })
    }
    
    return {
        init: function(){
            console.log('configurado');
            setupEventListeners();
        }
    }
    
    
    
    
    
    
})(budgetController, UiController);


Controller.init();
