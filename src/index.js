//Ensures functions are called after the DOM is loaded
document.addEventListener("DOMContentLoaded", fetchImages);
document.addEventListener("DOMContentLoaded", fetchBreeds);

//Function to fetch random dog photos for banner
function fetchImages() {
    // Fetch images from api
    fetch("https://dog.ceo/api/breeds/image/random/4")
      .then(response => response.json()) 
      .then(data => {
       
        const images = data.message;  
       
        const imageContainer = document.getElementById("dog-image-container");
  
        // Loop through the images
        images.forEach(url => {
          //adds new image element
          const imageElement = document.createElement("img");
          //adds each image url to newly created element
          imageElement.src = url;          
          imageContainer.appendChild(imageElement);
        });
      })
      //processes error during fetching
      .catch(error => {        
        console.error("Error fetching images:", error);
    });
}

//Function to fetch list of dog breeds
function fetchBreeds() {
    //Fetch dog breeds from api
    fetch("https://dog.ceo/api/breeds/list/all")
        .then(response => response.json())
        .then(data => {
            
            const breeds = data.message;

            const breedList = document.getElementById("dog-breeds");

            //loop through breed array to create list element and add breed values
            for (const breed in breeds) {
                const breedElement = document.createElement("li");
                breedElement.textContent = breed;
                //event listener to turn clicked breeds to a red color
                breedElement.addEventListener("click", function() {

                    breedElement.style.color = "firebrick";
                });    
                //appends breed value to new li element
                breedList.appendChild(breedElement);
            }
        })
        //error processing when fetching list
        .catch(error => {
            console.error("Error fetching dog breeds", error);
        });

        //variable to select dropdown element after DOM is loaded
        const breedDropdown = document.getElementById("breed-dropdown");
        //event listener to determine if user has selected a new letter
        breedDropdown.addEventListener("change", function() {
            const selectedLetter = breedDropdown.value;
            filterBreeds(selectedLetter);
        });
}

//function to filter breed list based on dropdown selection
function filterBreeds(letter) {
    //selects all breeds in an array
    const breedList = document.querySelectorAll("#dog-breeds li");

    //loops through breed list array
    breedList.forEach(element => {
        const breed = element.textContent;
        //checks if current breed starts with same letter as dropdown selection
        if (breed.startsWith(letter)) {
            //if it does share first letter this shows that
            element.style.display = "block";
        }
        else {
            //if it does not share letter this hides it
            element.style.display = "none";
        }
    });
}