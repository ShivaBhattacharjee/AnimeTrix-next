@echo off

REM Clone the repository
git clone https://github.com/ShivaBhattacharjee/AnimeTrix-next
echo Cloning done

REM Navigate to the cloned directory
cd AnimeTrix-next

REM Open the directory in Visual Studio Code
code .

REM Install dependencies
npm install

REM Run the development server
npm run dev
