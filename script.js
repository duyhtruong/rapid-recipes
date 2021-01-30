const ul = document.getElementById('resultsList');
const base_url = 'https://api.spoonacular.com/recipes/';
const random_search = 'random';
const api_key = '?apiKey=42c7b9a170cc429f84ebee0ade358384'
const url_query = '&number=3' 
const complete_url = base_url + random_search + api_key + url_query;
const ulIngredients = document.getElementById('ingredientsList');
const ingredientsContainer = document.getElementById('ingredientsContainer');

function createNode(element){
    return document.createElement(element); // Create type of element you pass in param
}

function append(parent, el){
    return parent.appendChild(el); // append second parameter to first
}

function searchAPI(){
    fetch(complete_url) // Call the fetch function passing url of API
    .then((resp)=>resp.json()) // Transform the data into json
    .then(function(data){
        let searchResults = data.recipes; // get the results
        return searchResults.map(function(searchResults){ //map through results
            let li = createNode('li'), // Create elements we need
                img = createNode('img'),
                span = createNode('span'),
                resultsTitle = createNode('p'),
                
                cookTime = createNode('p'),
                detailButton = createNode('button'),
                
                divTop = createNode('div'),
                divBottom = createNode('div');

            let full_recipe_url = base_url + searchResults.id + '/ingredientWidget.json' + api_key;
            let full_steps_url = base_url + searchResults.id + '/analyzedInstructions' + api_key;

            img.src = searchResults.image; // Add source of image to be src of img
            resultsTitle.innerHTML=`${searchResults.title}`;
            
            cookTime.innerHTML=`Ready In ${searchResults.readyInMinutes} Minutes`;
            detailButton.innerHTML="FULL RECIPE";
            img.classList.add("resultsImageSetWidth");
            detailButton.classList.add("resultsFullRecipeButton");
            resultsTitle.classList.add("resultsTitleFont");
           

            append(divTop,img);
            
            divTop.classList.add("resultsCardTop");

            span.classList.add('resultTextGroup')
            append(span,resultsTitle);
            
            append(span,cookTime);
         
            append(span, detailButton);
            
            
            append(divBottom,span);
            divBottom.classList.add("resultsCardBottom");
            append(li,divTop);
            append(li, divBottom);
            li.classList.add("resultStyle");
            li.classList.add("animate__animated", "animate__fadeInUp");
            append(ul,li);

            detailButton.onclick = function(){
                getIngredients(full_recipe_url,resultsTitle, img, full_steps_url);
                clearResults(ul);
            };

        })
    })
    .catch(function(error){
        console.log(error);
        //Run code if server returns any errors
    });
    //ul.classList.remove('displayNone');
}

function clearResults(...variables){
    for (var i = 0; i < variables.length; i++){
        variables[i].innerHTML = '';
    }
}

function getIngredients(full_recipe_url,resultsTitle, img, full_steps_url){
    fetch(full_recipe_url) // Call the fetch function passing url of API
    .then((resp)=>resp.json()) // Transform the data into json
    .then(function(data){
        let ingredientResults = data.ingredients,
            divLeft = createNode('div'),
            divRight = createNode('div'),
            divContainer = createNode('div');
            ingredientTitle = createNode('h2');
            ingredientTitle.innerHTML = 'Ingredients:';
            ingredientTitle.classList.add("ingredientTitle");
            divContainer.classList.add('justifyRow');
            divLeft.classList.add("divLeftDetail");
            divRight.classList.add("divRightDetail");
            resultsTitle.classList.add("recipeDetailTitle");
            append(divLeft, resultsTitle);
            append(divLeft, img);
            append(divRight, ingredientTitle);
            append(divContainer, divLeft);
            append(divContainer, divRight);
            append(ingredientsContainer,divContainer);
            getRecipeSteps(full_steps_url);
        return ingredientResults.map(function(ingredientResults){
            //create variables
            let li = createNode('li'),
                ingredientName = createNode('p');
            ingredientName.innerHTML = `${ingredientResults.amount.us.value}` + ` ${ingredientResults.amount.us.unit}` + ` ${ingredientResults.name}`;
            append(li,ingredientName);
            append(ulIngredients, li);
            append(divRight, ulIngredients);

        })
        
    })
    .catch(function(error){
        console.log(error);
        //Run code if server returns any errors
    });
    //ul.classList.add('displayNone');
    
}

function getRecipeSteps(full_steps_url){
    fetch(full_steps_url) // Call fetch function passing url of api passed from onclick
    .then((resp)=>resp.json()) //transform data into json
    .then(function(data){
        let recipeStepsResults = data[0].steps;
            stepsUl = createNode('ul');
            stepsUl.classList.add("ingredientsListFormat");
            stepsTitle = createNode('h2');
                stepsTitle.innerHTML = ('Instructions: ');
                stepsTitle.classList.add("stepsTitle");
            append(ulIngredients, stepsTitle);
        return recipeStepsResults.map(function(recipeStepsResults){
            let stepsLi = createNode('li'),
                step = createNode('p');
                step.innerHTML = `${recipeStepsResults.number}. ` + `${recipeStepsResults.step}`;
                
                append(stepsLi,step);
                append(stepsUl, stepsLi);
                
                append(ulIngredients, stepsUl);
        })
    })
    .catch(function(error){
        console.log(error);
        //Run code if server returns any errors
    });
}