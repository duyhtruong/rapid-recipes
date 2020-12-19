const ul = document.getElementById('resultsList');
const url = 'https://randomuser.me/api/?results=3';

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
                span = createNode('span'),
                authorFirstName = createNode('p'),
                authorLastName = createNode('p'),
                authorEmail = createNode('p'),
                authorAge = createNode('p');
                divTop = createNode('div');
                divBottom = createNode('div');

            img.src = author.picture.large; // Add source of image to be src of img
            authorFirstName.innerHTML=`${author.name.first}`;
            authorLastName.innerHTML=`${author.name.last}`;
            authorEmail.innerHTML=`${author.email}`;
            authorAge.innerHTML=`${author.dob.age}`;

            append(divTop,img);
            divTop.classList.add("resultsCardTop");

            span.classList.add('resultTextGroup')
            append(span,authorFirstName);
            append(span,authorLastName);
            append(span,authorEmail);
            append(span,authorAge);
            
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

