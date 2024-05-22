<a href="https://github.com/ShivaBhattacharjee/AnimeTrix-next">
<p align="center">
    <img src="https://github.com/ShivaBhattacharjee/AnimeTrix-next/assets/95211406/3984ffef-a0ad-4314-b017-5ffb6213ed9c" width="160px"  alt="animetrix logo" align="center">
  </a>
<br/>
  <h3 align="center">AnimeTrix</h3>


<div align="center" >

![NextJs](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![jwt token](http://jwt.io/img/badge-compatible.svg)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Deno](https://github.com/ShivaBhattacharjee/AnimeTrix-next/actions/workflows/deno.yml/badge.svg)](https://github.com/ShivaBhattacharjee/AnimeTrix-next/actions/workflows/deno.yml)
![GitHub repo size](https://img.shields.io/github/repo-size/shivabhattacharjee/animetrix-next)
[![Animetrix Docker image](https://github.com/ShivaBhattacharjee/AnimeTrix-next/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/ShivaBhattacharjee/AnimeTrix-next/actions/workflows/main.yml)


  </div>
  <p align="center">
    A go to platform to stream/download your favorite anime
    <br/>
    <br/>
    <a href="https://animetrix.xyz/">View Demo</a>
    .
    <a href="https://github.com/ShivaBhattacharjee/AnimeTrix-next/issues">Report Bug</a>
    .
    <a href="https://github.com/ShivaBhattacharjee/AnimeTrix-next/issues">Request Feature</a>
  </p>
</p>



## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [About The Project](#about-the-project)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Local](#local)
  - [Anime API Health test](#anime-api-health-test)
  - [Docker](#docker)
    - [Vist DockerHub Image](#vist-dockerhub-image)
  - [Example](#example)
- [Host your own](#host-your-own)
- [Contributing](#contributing)
  - [Creating A Pull Request](#creating-a-pull-request)
- [Raising an issue](#raising-an-issue)
- [Code of conduct](#code-of-conduct)
- [License](#license)
- [ScreenShots](#screenshots)
  - [Home Page](#home-page)
  - [Details](#details)
  - [Stream](#stream)
    - [Visit Animetrix](#visit-animetrix)
- [Authors](#authors)

## About The Project
![Screenshot (1009)](https://github.com/ShivaBhattacharjee/AnimeTrix-next/assets/95211406/d872a750-4fa9-4a31-8a13-71f859ab8cf9)

Anime Trix is an anime streaming / downloading site that offers a vast collection of anime shows for streaming and downloading. With a user-friendly interface, you can easily find your favorite anime shows and watch them in high-definition quality. Our platform is updated regularly with the latest anime episodes, so you can stay up-to-date with your favorite shows. Anime Trix is the go-to destination for anime lovers who want to watch their favorite shows anytime, anywhere.

## Built With

AnimeTrix is built using NextJs 

* [NextJS](https://nextjs.org)
* [TailwindCss](https://tailwindcss.com/)
* [Mongo DB](https://www.mongodb.com/)
* [BunJS](https://bun.sh/)


## Getting Started


### Prerequisites

<a href="https://git-scm.com/downloads" >Git</a> is a distributed version control system used for software development. It allows multiple developers to work on the same codebase simultaneously, keeping track of changes and managing versions. It also enables users to revert changes and collaborate more effectively.



<a href="https://bun.sh/">BunJS</a> is a JavaScript runtime, package manager, test runner and bundler built from scratch using the Zig programming language. It was designed by Jarred Sumner as a drop-in replacement for Node.js. Bun uses WebKit's JavaScriptCore as the JavaScript engine, unlike Node.js and Deno, which both use V8.


### Installation
### Local
```Rename .env.example to .env.local and fill the required fields```
```bash
git clone https://github.com/ShivaBhattacharjee/AnimeTrix-next
```
```
cd AnimeTrix-next
```
```
bun install
```
```
bun dev
```
Server will start at http://localhost:3000/

### Anime API Health test
```
bun test
```

### Docker

#### Vist <a href="https://hub.docker.com/repository/docker/immashiva/animetrix/general" target="_blank">DockerHub</a> Image

```bash
sudo docker run -p <your-port-number>:3000 \
-e NEXT_PUBLIC_MONGODB_URI=yourmongodburi \
-e NEXT_PUBLIC_JWT_TOKEN=yourjwttoken \
-e NEXT_PUBLIC_EMAIL_SERVICE=gmail \
-e NEXT_PUBLIC_EMAIL=youremail \
-e NEXT_PUBLIC_ANIME_API_URL= self hosted url of https://github.com/consumet/api.consumet.org \
-e NEXT_PUBLIC_EMAIL_PASSWORD=yourpassword \
-e NEXT_PUBLIC_DOMAIN=http:/localhost:3000 \
immashiva/animetrix
```

### Example

```bash
sudo docker run -p 8080:3000 \
-e NEXT_PUBLIC_MONGODB_URI=yourmongodburi \
-e NEXT_PUBLIC_JWT_TOKEN=yourjwttoken \
-e NEXT_PUBLIC_ANIME_API_URL= self hosted url of https://github.com/consumet/api.consumet.org \
-e NEXT_PUBLIC_EMAIL_SERVICE=gmail \
-e NEXT_PUBLIC_EMAIL=youremail \
-e NEXT_PUBLIC_EMAIL_PASSWORD=yourpassword \
-e NEXT_PUBLIC_DOMAIN=http:/localhost:3000 \
immashiva/animetrix
```

## Host your own
* ## Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FShivaBhattacharjee%2FAnimeTrix-next)
<br/>
<br/>

* ## Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/ShivaBhattacharjee/AnimeTrix-next)
<br/>
<br/>

* ## Render

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/ShivaBhattacharjee/AnimeTrix-next)

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.
* If you have suggestions for adding or removing projects, feel free to [open an issue](https://github.com/ShivaBhattacharjee/AnimeTrix-next/issues) to discuss it

* Please make sure you check your spelling and grammar.

### Creating A Pull Request

Wanna contribute to AnimeTrix ?

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/FeatureName`)
3. Commit your Changes (`git commit -m 'Add some FeatureName'`)
4. Push to the Branch (`git push origin feature/FeatureName`)
5. Open a Pull Request


## Raising an issue

If you're experiencing any problems with Animetrix, please be sure to review our [issue template](https://github.com/ShivaBhattacharjee/AnimeTrix-next/tree/main/.github/ISSUE_TEMPLATE) before opening a new issue. The template includes a list of questions and prompts that will help us better understand the issue you're experiencing, and it will ensure that we have all of the necessary information to investigate the problem.

We kindly ask that you provide as much detail as possible when submitting an issue, including steps to reproduce the problem, any error messages that you have seen, and any other relevant information. This will help us to identify and fix the issue more quickly.

Thank you for your cooperation, and we look forward to hearing from you!

## Code of conduct

Developers are requested to go through our <a href="https://github.com/ShivaBhattacharjee/AnimeTrix-next/blob/main/CODE_OF_CONDUCT.md">code of conduct</a> thoroughly to maintain a peaceful environment within our project.

## License

Distributed under the Apache License 2.0 . See [LICENSE](https://github.com/ShivaBhattacharjee/AnimeTrix-next/blob/main/LICENSE) for more information.

## ScreenShots
### Home Page
![Screenshot from 2023-11-09 21-53-05](https://github.com/ShivaBhattacharjee/AnimeTrix-next/assets/95211406/9289e34c-2122-46d6-ba0c-5b31a05cac48)

### Details
![Screenshot from 2023-11-09 21-53-49](https://github.com/ShivaBhattacharjee/AnimeTrix-next/assets/95211406/bb8e291c-9ec9-4d2d-9501-9c46e42915da)

### Stream
![Screenshot from 2023-11-09 21-54-28](https://github.com/ShivaBhattacharjee/AnimeTrix-next/assets/95211406/ea8de1b1-4895-48e7-a98a-7b46386c14bd)

#### Visit <a href = "https://animetrix.xyz" target="_blank">Animetrix</a>
## Authors

* **Shiva Bhattacharjee** - [Shiva Bhattacharjee](https://github.com/ShivaBhattacharjee) - *AnimeTrix*
