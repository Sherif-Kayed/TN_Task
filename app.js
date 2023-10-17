
// Mock function to simulate a server request
function checkURLExists(url) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Mock response, in a real-world scenario, this data will come from the server
            if (url.endsWith('.com')) resolve({ exists: true, type: 'folder' });
            else if (url.endsWith('.jpg') || url.endsWith('.png')) resolve({ exists: true, type: 'file' });
            else resolve({ exists: false, type: 'unknown' });
        }, 1000);
    });
}

function isValidURL(url) {
    const regex = /^(https?:\/\/)?([\w\-])+(\.[\w\-]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?$/;
    return regex.test(url);
}

const inputElem = document.getElementById('urlInput');
const messageElem = document.getElementById('message');

const handleInputChange = _.debounce(async () => {
    const url = inputElem.value;

    if (!isValidURL(url)) {
        messageElem.textContent = "Invalid URL format.";
        return;
    }

    messageElem.textContent = "Checking...";
    const { exists, type } = await checkURLExists(url);

    if (exists) {
        messageElem.textContent = `URL exists and it is a ${type}.`;
    } else {
        messageElem.textContent = "URL does not exist.";
    }

}, 500);  // Throttle the server request to every 500ms

inputElem.addEventListener('input', handleInputChange);
