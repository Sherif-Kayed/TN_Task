
# TN Task - URL Checker

This application provides a simple interface for users to input a URL. As the user types, the system validates the URL format. If the URL format is valid, a mocked server request is made to determine if the URL exists and whether it might be a file or folder.
  
## Features

 - **Real-time URL validation:** As the user types in the URL input field,
   the system immediately validates the URL format and provides
   feedback.
   
 - **Throttled existence check:** To avoid flooding the server with
   requests, the existence check is throttled. Currently, this is set to
   be triggered at most once every 500ms.

 - **Mocked server response:** Since there isn't a real server handling   
   requests, I've simulated server responses. Based on the URL entered, 
   the mock function returns information on whether the URL exists and  
   if it might be a file or folder.

## Important Note on URL Determination

It's essential to understand that from a URL alone, in most cases, you can't accurately determine if it's a file or a folder. 

However, for this I've made the below assumptions to implement the task given:

- If the URL ends with `.com`, it's considered a folder.

- If the URL ends with `.jpg` or `.png`, it's considered a file.

- In all other cases, the URL is considered unknown.

## Dependencies

- Lodash (for the `debounce` function)

## Setup and Running

1. Clone or download the repository.

2. Open `index.html` in your preferred browser.

That's it! Start typing a URL and see the checker in action.
