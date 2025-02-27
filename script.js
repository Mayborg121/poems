const data = window.location.search;
let urlParam = new URLSearchParams(data);
let n = urlParam.get('n') || "";

// URL of the JSON file (replace with your actual JSON URL)
const poemUrl = "https://raw.githubusercontent.com/Mayborg121/poems/refs/heads/main/poems.json";

// Function to fetch JSON from the web
fetch(poemUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json(); // Parse JSON data
    })
    .then(data => {
        data.reverse();
        const poemList = document.getElementById("poemList");
        const contentDiv = document.getElementById("content");
        const Hero = document.getElementById("hero");
        const body = document.querySelector('body');
        const title = document.getElementById("title");
        const poem = document.getElementById("poem");
        const timing = document.getElementById("timing");
        const context = document.getElementById("context");
        const meaning = document.getElementById("meaning");
        const author = document.getElementById("author");
        const poems = document.getElementById("poems");
        const footer = document.querySelector("footer");
        const download = document.getElementById("downloadBtn");
        const container = document.getElementById("content-dnld");


        if(n=='a'){
            footer.style.position = "fixed";
            poems.style.display = "none";
            poemList.style.display = "none";
            Hero.style.display = "none";
            
            author.style.display = "flex";

        }
        const bg = Math.floor(Math.random() * 12) + 1;
        console.log("bg = ",bg);
        n = Number(n);
        console.log(n);
        if (!isNaN(n) && n > 0 && n <= data.length) {
            
            // If 'n' is valid, hide the list and show nth item
            poemList.style.display = "none";
            Hero.style.display = "none";
            container.style.backgroundImage = `url(img/${bg}.webp)`;
            contentDiv.style.display = "flex";
            
            const selectedItem = data.find(data => data.No == n);
            title.textContent = `${selectedItem.Title}`;
            poem.innerHTML = `${selectedItem.Poem}`;
            timing.textContent = `~ ${selectedItem.Time}, Mayborg.`;
            context.textContent = `${selectedItem.Context}`;
            meaning.textContent = `${selectedItem.Meaning}`;
            download.innerHTML = `Download Poem`;
            document.getElementById('nextBtn').addEventListener('click', function() {
              window.location.href = `?n=${n+1}`;
            });
        } 
        else{


            const read = document.getElementById("rp"); 
                const rand = Math.floor(Math.random() * data.length) + 1;
                console.log(rand);

                read.href = `?n=${rand}`;
            // Show list if 'n' is not present or invalid
            data.forEach(item => {
                
                
                
                const li = document.createElement("li");
                const link = document.createElement("a");
    
                link.textContent = item.Title; // Display title
                
                
                li.appendChild(link);
                link.href = `?n=${item.No}` || "#"; // Use the URL, or "#" if missing
                poemList.appendChild(li);
            });
        }
    })
    .catch(error => console.error("Error fetching JSON:", error));



    document.getElementById('downloadBtn').addEventListener('click', function() {
        const element = document.getElementById('content-dnld');
        if (element) {
          html2canvas(element, {
            backgroundColor: null, /* Ensure the background color is captured */
            scale: window.devicePixelRatio, /* Use device pixel ratio for better quality */
            useCORS: true /* Allow cross-origin resource sharing */
          }).then(function(canvas) {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'poem.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }).catch(function(error) {
            console.error('Error capturing the element:', error);
          });
        } else {
          console.error('Element with ID "capture" not found.');
        }
      });
