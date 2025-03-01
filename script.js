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
        const bg = Math.floor(Math.random() * 24) + 1;
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
              if (n == data.length){
                window.location.href = `?n=1`;
              } else{
                window.location.href = `?n=${n+1}`;
              }
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



      let activeFireflies = 0;
      const maxFireflies = 15;

      function createFirefly() {
          if (activeFireflies >= maxFireflies) return;
          activeFireflies++;

          const heading = document.getElementById("mainheading");
          const rect = heading.getBoundingClientRect();
          const firefly = document.createElement("div");
          firefly.classList.add("firefly");
          document.body.appendChild(firefly);
          
          const x = rect.left + Math.random() * (rect.width - 20);
          const y = rect.top + Math.random() * (rect.height+20);
          firefly.style.left = `${x}px`;
          firefly.style.top = `${y}px`;
          
          // Assign random properties for size, glow, movement, and speed
          firefly.style.setProperty('--size', Math.random() * 0.7 + 0.25);
          firefly.style.setProperty('--glow', Math.random() * 0.45 + 0.28);
          firefly.style.setProperty('--twinkle-time', `${Math.random() * 3 + 2}s`);
          firefly.style.setProperty('--twinkle-opacity', Math.random() * 0.1 + 0.2);
          firefly.style.setProperty('--speed', `${Math.random() * 4 + 14}s`);
          firefly.style.setProperty('--randomX1', Math.random());
          firefly.style.setProperty('--randomY1', Math.random());
          firefly.style.setProperty('--randomX2', Math.random());
          firefly.style.setProperty('--randomY2', Math.random());
          firefly.style.setProperty('--randomX3', Math.random());
          firefly.style.setProperty('--randomY3', Math.random());
          firefly.style.setProperty('--randomX4', Math.random());
          firefly.style.setProperty('--randomY4', Math.random());
          
          firefly.style.animation = `moveRandom var(--speed) ease-in-out forwards, fadeInOut var(--speed) ease-in-out, twinkle var(--twinkle-time) infinite`;
          
          setTimeout(() => {
              firefly.remove();
              activeFireflies--;
          }, parseFloat(firefly.style.getPropertyValue('--speed')) * 1000);
      }
      
      function spawnFireflies() {
          setInterval(() => {
              if (activeFireflies < maxFireflies) {
                  const count = Math.min(Math.floor(Math.random() * 4) + 4, maxFireflies - activeFireflies);
                  for (let i = 0; i < count; i++) {
                      setTimeout(createFirefly, Math.random() * 5000);
                  }
              }
          }, 4000);
      }
      
      spawnFireflies();
