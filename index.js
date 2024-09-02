const submit_button = document.getElementById("submit");
const input = document.getElementById("input");
const images = document.getElementById("images");

let url = '';

submit_button.addEventListener("click", () => {
    url = input.value;
    showPictures();
});



async function showPictures() {

    const response = await fetch(url);

    if (!response.ok) {
        alert('Problem with fetching the url');
        throw new Error('Network response was not ok ' + response.statusText);
    }

    const data = await response.text();

    const lines = data.trim().split('\n');

    const items = JSON.parse(lines[0]);
    const server_image_url = JSON.parse(lines[1]).imagesURL;

    const items_array = Array.from(items);

    items_array.forEach(item => {
        const container = document.createElement("div");
        container.style.display = "flex";
        container.style.alignItems = "center";
        container.style.marginBottom = "20px";

        const imageText = document.createElement("h2");
        imageText.textContent = item.image;
        imageText.style.width = "30%";
        imageText.style.marginRight = "10px";

        const image = document.createElement("img");
        image.src = server_image_url + item.image;
        image.style.width = "30%";
        image.style.maxWidth = "300px";
        image.style.height = "auto";

        container.appendChild(imageText);
        container.appendChild(image);

        images.appendChild(container);
    });

}




