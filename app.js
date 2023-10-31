
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

let latestRequestId = null;

const handleInputChange = _.debounce(async () => {
    const url = inputElem.value;

    // Clear the message as soon as the user starts typing a new URL
    messageElem.textContent = "";

    if (!isValidURL(url)) {
        messageElem.textContent = "Invalid URL format.";
        return;
    }

    // Generate a unique identifier for the request using timestamp
    const currentRequestId = Date.now();
    latestRequestId = currentRequestId;

    messageElem.textContent = "Checking...";
    const { exists, type } = await checkURLExists(url);

    // Only update the UI if the current request Id is equal to the latest one
    if (latestRequestId === currentRequestId) {
        // Check the URL format again before updating the message
        if (!isValidURL(url)) {
            messageElem.textContent = "Invalid URL format.";
        } else if (exists) {
            messageElem.textContent = `URL exists and it is a ${type}.`;
        } else {
            messageElem.textContent = "URL does not exist.";
        }
    }
}, 500);  // Throttle the server request to every 500ms

inputElem.addEventListener('input', handleInputChange);
