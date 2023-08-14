#!/bin/bash

# Clone the repository
git clone https://github.com/ShivaBhattacharjee/AnimeTrix-next
echo "Cloning done"

# Navigate to the cloned directory
cd AnimeTrix-next

# Open the directory in Visual Studio Code
code .

# Install dependencies
npm install

# Run the development server
npm run dev
