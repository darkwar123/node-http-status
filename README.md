# HttpStatus class for Node.js
This module provides HTTP errors and success codes with title and description.
# Usage
```javascript
let HttpStatus = require('node-http-status')
notFoundError = new HttpStatus(404)
throw notFoundError
```
