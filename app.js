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
        },
        budget: 0,
        percent: 0
    }
    
    var calculateTotal = function(type){
        var suma = 0;
        data.allItems[type].forEach(function(curr){
            suma += curr.val;
        })
        
        data.totals[type] = suma;
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
        },
		deleteItem: function(type, id){
			var ids, index;

			ids = data.allItems[type].map(function(current){
				return current.id;
			});

			index = ids.indexOf(id);

			if(index !== -1){
				data.allItems[type].splice(index, 1);
			},
		}
        calculateBudget: function(){
            calculateTotal('exp');
            calculateTotal('inc');
            data.budget = data.totals.inc - data.totals.exp;
            
            if (data.totals.inc > 0) {
                data.percent = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percent = -1;
            }      
        },
        
        budgetData: function() {
            return {
                budget: data.budget,
                totalExp: data.totals.exp,
                totalInc: data.totals.inc,
                percent: data.percent
            }
            
                
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
        income: '.income__list',
		budgetIncome: '.budget__income--value',
		budgetIncPercent: '.budget__income--percentage',
		budgetExpense: '.budget__expenses--value',
		budgetExpPercent: '.budget__expenses--percentage',
		budgetValue: '.budget__value',
		container: '.container'
    }
    
    return {
        getInputData: function(){
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
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
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%val%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
        
            else if(type === 'exp'){
                element = document.querySelector(DOMStrings.expense);
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%val%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%desc%', obj.desc);
            newHtml = newHtml.replace('%val%', obj.val);
            
            element.insertAdjacentHTML('beforeend', newHtml);
            
            
        },

		displayBudget: function(obj){
			document.querySelector(DOMStrings.budgetIncome).textContent = obj.totalInc;
			document.querySelector(DOMStrings.budgetExpense).textContent = obj.totalExp;
			document.querySelector(DOMStrings.budgetValue).textContent = obj.budget;

			if(obj.percent > 0){
				document.querySelector(DOMStrings.budgetExpPercent).textContent = obj.percent + '%';
			} else {
				document.querySelector(DOMStrings.budgetExpPercent).textContent = '---';
			}
		}
    }
    
    
    
})();



var Controller = (function(bdgCtrl, uiCtrl){
    
    
    var DOM = uiCtrl.getStrings();
    
    var updateBudget = function(){
        var budget;
        
        bdgCtrl.calculateBudget();
        budget = bdgCtrl.budgetData();
        console.log(budget);
		uiCtrl.displayBudget(budget);

        
    }
    
    var ctrlAddItem = function(){
        var getInputs = uiCtrl.getInputData();
        console.log(getInputs);
        
        if(getInputs.description != "" && !isNaN(getInputs.value) && getInputs.description != 0){
            var getItem = bdgCtrl.addItem(getInputs.type, getInputs.description, getInputs.value);
            console.log(getItem);
            uiCtrl.clearInputs();
            uiCtrl.displayItem(getItem, getInputs.type);
            updateBudget();

        }
        
    }
<<<<<<< HEAD
	
	var ctrlDeleteItem = function(event){
		var itemID, splitID, ID, type;
		itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
		
		if(itemID){
			splitID = itemID.split('-');
			ID = parseFloat(splitID[1]);
			type = splitID[0];
			
			bdgCtrl.deleteItem(type, ID);
		}
		
	}
=======

	var ctrlDeleteItem = function(event){
		var itemID, splitID, type, ID;

		itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

		if(itemID){
			splitID = itemID.split('-');
			type = splitID[0];
			ID = splitID[1];
		}
	};
>>>>>>> 471660d86629f3ae536e8663be4380e72ed699a6
  
    var setupEventListeners = function(){
        document.querySelector(DOM.addButton).addEventListener('click', ctrlAddItem);
    
        document.addEventListener('keypress', function(event){
<<<<<<< HEAD
        
        if(event.keyCode === 13 || event.which === 13){
            ctrlAddItem();
        }
    })
		
=======

			if(event.keyCode === 13 || event.which === 13){
				ctrlAddItem();
			}
		})

>>>>>>> 471660d86629f3ae536e8663be4380e72ed699a6
		document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
    }
    
    return {
        init: function(){
            console.log('configurado');
            setupEventListeners();
			uiCtrl.displayBudget(
				{budget: 0,
                totalExp: 0,
                totalInc: 0,
                percent: -1}
			);
        }
    }
    
    
    
    
    
    
})(budgetController, UiController);


Controller.init();
