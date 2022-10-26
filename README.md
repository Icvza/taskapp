# Taskit

Taskit is the third project for Road To hire using Node.js, JS, HTML & css

## Installation

This is the front end of the project you must also clone the backend at https://github.com/Icvza/awsTask

Install all dependencies 

```bash
npm install 
```
Start local server 
```bash
node.app.js
```

## Info

This app was deployed to an EC2 Instance in AWS for project requirments after Oct 26 2022 the EC2 Instance will be terminated so make sure to change the const url 
```bash
const URL = "YOUR LOCAL HOST:PORT NUMBER"
```

## R2H Requirments:

Some of the errors I faced while creating this project as CORS being blocked. I solved this by installing the cors package. Another error I faced was deployment on amplify. To solve this I spit the app into two repos one for the front end deployed on aws and the backend deployed 
on and EC2 Instance which I then connected to and started the server. 

I started the project by creating the server first with endpoints defined. I then created the front end and made sure I waas able to hit the endpoints in the server. 
Once eveything was working I created the logic to read a write to my local JSON file.  After deploying in aws I had to change the URL of the post requests to EC ip address.


## License
[MIT](https://choosealicense.com/licenses/mit/)
