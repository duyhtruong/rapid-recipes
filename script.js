const ul = document.getElementById('resultsList');
const url = 'https://randomuser.me/api/?results=10';

function createNode(element){
    return document.createElement(element); // Create type of element you pass in param
}

function append(parent, el){
    return parent.appendChild(el); // append second parameter to first
}

function searchAPI(){
    fetch(url,{
        mode: 'cors',
        headers:{
            'Content-Type': 'application.json'
        }
    }) // Call the fetch function passing url of API
    .then((resp)=>resp.json()) // Transform the data into json
    .then(function(data){
        let authors = data.results; // get the results
        return authors.map(function(author){ //map through results
            let li = createNode('li'), // Create elements we need
                img = createNode('img'),
                span = createNode('span');
            img.src = author.picture.medium; // Add source of image to be src of img
            span.innerHTML = `${author.name.first} ${author.name.last}`; //add author first and last name in span

            append(li, img);
            append(li, span);
            li.classList.add("resultStyle");
            append(ul,li);
        })
    })
    .catch(function(error){
        console.log(error);
        //Run code if server returns any errors
    });
}

