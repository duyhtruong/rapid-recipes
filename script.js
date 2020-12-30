const ul = document.getElementById('resultsList');
const url = 'https://api.spoonacular.com/recipes/random';
const api_key = '?apiKey=42c7b9a170cc429f84ebee0ade358384'
const url_query = '&number=3' 
const complete_url = url + api_key + url_query;

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
                resultsID = createNode('p'),
                cookTime = createNode('p'),
                detailButton = createNode('button'),
                
                divTop = createNode('div');
                divBottom = createNode('div');

            img.src = searchResults.image; // Add source of image to be src of img
            resultsTitle.innerHTML=`${searchResults.title}`;
            resultsID.innerHTML=`${searchResults.id}`;
            cookTime.innerHTML=`Ready In ${searchResults.readyInMinutes} Minutes`;
            detailButton.innerHTML = `${searchResults.id}`

            append(divTop,img);
            divTop.classList.add("resultsCardTop");

            span.classList.add('resultTextGroup')
            append(span,resultsTitle);
            append(span,resultsID);
            append(span,cookTime);
            append(span, detailButton);
            
            
            append(divBottom,span);
            divBottom.classList.add("resultsCardBottom");
            append(li,divTop);
            append(li, divBottom);
            li.classList.add("resultStyle");
            li.classList.add("animate__animated", "animate__fadeInUp");
            append(ul,li);
        })
    })
    .catch(function(error){
        console.log(error);
        //Run code if server returns any errors
    });
}

