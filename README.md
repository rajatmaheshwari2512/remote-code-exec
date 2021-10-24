<p align="center">
  <a href="https://github.com/rajatmaheshwari2512/remote-code-exec">
  </a>

  <h3 align="center">Remote Code Executor</h3>

  <p align="center">
    Server-side code of a Remote Code Executor
    <br />
    <a href="https://github.com/rajatmaheshwari2512/remote-code-exec/issues">Report Bug</a>
    ·
    <a href="https://github.com/rajatmaheshwari2512/remote-code-exec/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#deployment">Deployment</a></li>
    <li><a href="#screenshots">Screenshots</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This is the server-side code of a Remote Code Executor. This is a project assigned by the Coding forum of my college and is similar to the Online IDEs of websites like CodeChef and Leetcode.

Salient Features:

- Code Sanitisation
- An individual Docker Container is created for every code posted on the API, so no code interferes with any other code
- All Async code so that the server can handle multiple requests without error
- Socket has been implemented along with rooms for seperate users so that the server can handle multiple users in multiple rooms
- Keeping it simple, there is not need for signup or login, you can jump in and start coding
- Timeouts and max memory have been implemented so that no code takes up too much of the server's time
- Implemented SwaggerUI as an API Sandbox so anyone can explore endpoints and familiarize themselves with the server.

### Built With

<a href="https://expressjs.com" target="_blank"> <img src="https://www.vectorlogo.zone/logos/expressjs/expressjs-ar21.svg" alt="express" height="40"/> </a><a href="https://reactjs.org/" target="_blank"> <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="react" width="60" height="40"/> </a><a href="https://nodejs.org" target="_blank"> <img src="https://img.icons8.com/color/48/000000/nodejs.png"/> </a>
<a href="https://www.docker.com/" target="_blank"> <img src="https://www.docker.com/sites/default/files/d8/styles/role_icon/public/2019-07/Moby-logo.png?itok=sYH_JEaJ" alt="docker" width="58" height="50"/> </a> 

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```
- docker
  ```sh
  curl -fsSL https://get.docker.com -o get-docker.sh
  ```
  ```sh
  sudo sh get-docker.sh
  ```

### Installation
#### If you are on a Linux(preferably Ubuntu) Machine
1. Clone the repo
   ```sh
   git clone https://github.com/rajatmaheshwari2512/remote-code-exec
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. To build the docker images
   ```sh 
   cd Dockerfiles 
   ```
   ```sh 
   docker build -t cpp:v1 -f DockerCPP . 
   ```
   ```sh 
   docker build -t python:v1 -f DockerPython . 
   ```
   ```sh 
   docker build -t java:v1 -f DockerJava . 
   ```
   ```sh 
   docker build -t go:v1 -f DockerGo . 
   ```
#### If you are on any other Machine
1. Clone the repo
   ```sh
   git clone https://github.com/rajatmaheshwari2512/remote-code-exec
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Build the Server's Dockerfile
   ```sh
   docker build -t rceserver:v1 .
   ```
4. Run the Docker Image
   ```sh
   docker run --privileged=true -v /var/run/docker.sock:/var/run/docker.sock -d -p 3000:3000 rceserver:v1  
   ```
5. Create a shell to the created Docker Container
   ```sh
   docker ps
   ```
   ```sh
   docker exec -it <container_id> /bin/bash
   ```
6. Build the Images inside the Container
   ```sh 
   cd Dockerfiles 
   ```
   ```sh 
   docker build -t cpp:v1 -f DockerCPP . 
   ```
   ```sh 
   docker build -t python:v1 -f DockerPython . 
   ```
   ```sh 
   docker build -t java:v1 -f DockerJava . 
   ```
   ```sh 
   docker build -t go:v1 -f DockerGo . 
   ```
<!-- USAGE EXAMPLES -->

## Usage

1.  To run the server in dev mode use
    ```sh
    npm run dev
    ```
2.  To run the server in production mode
    ```sh 
    npm start 
    ```
3.  Note that dev mode uses nodemon so that the server can be changed and restarted easily
4.  It is important to note that you will have to setup environment variables to the appropriate endpoints, should you deploy this locally or somewhere else

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/rajatmaheshwari2512/remote-code-exec/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Rajat Maheshwari - mrajat67@yahoo.com

Project Link: [https://github.com/rajatmaheshwari2512/remote-code-exec](https://github.com/rajatmaheshwari2512/remote-code-exec)

Site Link: [SwaggerUI Link](http://65.0.131.144:3001/)

Main Site Link: [FrontEnd UI](http://www.rceui.ml/)

## Deployment
- This project is currently deployed on an EC2 Instance provided by AWS

## Screenshots
<img src="https://i.imgur.com/FOKwshQ.png"></img>
<img src="https://i.imgur.com/lb6Mcjx.png"></img>
<img src="https://i.imgur.com/npnqlZb.png"></img>
<img src="https://i.imgur.com/QxxhIju.png"></img>
<img src="https://i.imgur.com/OtICDoU.png"></img>
