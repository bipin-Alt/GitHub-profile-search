const  profileSearch = async() =>{
    //select different elements from the html//
    const loader = document.querySelector(".loader");
    const result = document.querySelector(".output");
    const username = document.getElementById('github-profile-search').value;
//function for the loader
    const loading = () =>{
        loader.style.display = "block";
        return;
    };
    setTimeout(loading, 0);//starting from the 0 

const showResultAfterLoading= () =>{
    loader.style.display ="none";
     if(!username){
        result.style.visibility ="visible";
        result.textContent ="Please enter a valid username.";
        
     }
    return;
}
setTimeout(showResultAfterLoading,1000);//ends after 1 second
//not a good practice to display the loader like this but works..     :) 

 try {
    //using an api to fetch the data//
    const response = await fetch(`https://api.github.com/users/${username}`);
    if(!response.ok){ //if response is not good then do that
        throw new Error("User not found!");
    }
 //converting the API's text to the javascript object to access the values //
    const data = await response.json();
    //updating the output with necessary information//
    result.innerHTML =`
    <h2>${data.login}</h2>
    <img src ="${data.avatar_url}" alt ="Avatar" width="100" styles ="border-radius:50%">
    <p><strong>${data.name || "Not provided"}</strong></p>
    <p><strong>Bio:</strong> ${data.bio || "No bio"}</p>
    <p><strong>Public Repos:</strong> ${data.public_repos}</p>
    <p><strong>Followers :</strong>${data.followers}</p>
    <p></strong>Following :</strong>${data.following}</P>
    `;
}
//handles the errors from the try block//
 catch(error){
       result.textContent = `Error : ${error.message}`;
 }

};
//making the output section visible//
document.querySelector(".output").style.visibility ="visible";

//adding event listener to the search button
document.getElementById("search-btn").addEventListener('click',profileSearch);