# 🚀 Serverless MERN Application Deployment Pipeline

This project demonstrates a **complete CI/CD pipeline** using **Jenkins**, **GitHub**, **AWS Lambda**, and **Amazon S3** to automatically deploy a serverless MERN stack application.

---

## 📋 Project Overview

<table>
  <tr>
    <td align="center"><img src="https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg" alt="Node.js" width="60"/></td>
    <td align="center"><img src="https://cdn.worldvectorlogo.com/logos/react-2.svg" alt="React" width="60"/></td>
    <td align="center"><img src="https://cdn.worldvectorlogo.com/logos/aws-2.svg" alt="AWS" width="60"/></td>
    <td align="center"><img src="https://cdn.worldvectorlogo.com/logos/jenkins-1.svg" alt="Jenkins" width="60"/></td>
    <td align="center"><img src="https://cdn.worldvectorlogo.com/logos/github-icon-1.svg" alt="GitHub" width="60"/></td>
    <td align="center"><img src="https://www.serverless.com/img/logos/serverless-logo.svg" alt="Serverless Framework" width="80"/></td>
  </tr>
  <tr>
    <td align="center">Node.js</td>
    <td align="center">React</td>
    <td align="center">AWS</td>
    <td align="center">Jenkins</td>
    <td align="center">GitHub</td>
    <td align="center">Serverless Framework</td>
  </tr>
</table>

---

* **Backend**: Node.js serverless functions deployed to **AWS Lambda** using [Serverless Framework](https://www.serverless.com/).
* **Frontend**: React application deployed to an **S3 bucket** as a static website.
* **CI/CD Pipeline**: **Jenkins** automates:

  * Cloning code from GitHub
  * Installing dependencies
  * Building and deploying backend and frontend
  * Uploading frontend build artifacts to S3

---

## 🛠️ Prerequisites

Before running the Jenkins pipeline, ensure you have:

### 1️⃣ AWS CLI Installed and Configured

```bash
aws configure
```

> Enter your **AWS Access Key**, **Secret Key**, and **Region**.

---

### 2️⃣ Serverless Framework Installed Globally

```bash
npm install -g serverless@3
```

---

### 3️⃣ Node.js Installed

[Download Node.js](https://nodejs.org/)

Verify installation:

```bash
node -v
npm -v
```

---

### 4️⃣ Docker Installed (if needed by Jenkins agents)

[Install Docker Desktop](https://www.docker.com/products/docker-desktop)

---

### 5️⃣ Jenkins Installed

[Download Jenkins](https://www.jenkins.io/download/)

Start Jenkins and install **recommended plugins**.

---

### 6️⃣ Jenkins AWS Credentials

In Jenkins, add credentials:

* **Type:** AWS Credentials
* **ID:** `aws-credentials`

These credentials will be used by `withAWS(credentials: 'aws-credentials')`.

---

## 📂 Repository Structure

```
ServerlessApplication/
├── backend/
│   ├── handler.js
│   └── serverless.yml
├── frontend/
│   ├── package.json
│   └── src/
│       └── ...
└── Jenkinsfile
```

---

## 🚀 Jenkins Pipeline Explained

The pipeline in the `Jenkinsfile` consists of **four main stages**:

### 1️⃣ Checkout Code

✅ Pulls the latest code from the `main` branch on GitHub.

---

### 2️⃣ Install and Deploy Backend

✅ Installs Serverless Framework
✅ Deploys backend Lambda functions using:

```bash
serverless deploy
```

---

### 3️⃣ Build Frontend

✅ Installs npm dependencies
✅ Builds the React application:

```bash
npm install
npm run build
```

---

### 4️⃣ Upload Frontend to S3

✅ Syncs the `frontend/build` directory to your S3 bucket:

```bash
aws s3 sync ./frontend/build s3://my-mern-frontend2
```

---

## 🧰 Example Jenkins Pipeline Configuration

Below is a simplified snippet of the pipeline logic:

```groovy
pipeline {
    agent any

    environment {
        AWS_DEFAULT_REGION = 'us-east-1'
        PATH = "${env.PATH};C:/Program Files/nodejs/"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/your-repo-url.git'
            }
        }
        stage('Deploy Backend') {
            steps {
                sh 'npm install -g serverless@3'
                dir('backend') {
                    withAWS(credentials: 'aws-credentials') {
                        sh 'serverless deploy'
                    }
                }
            }
        }
        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        stage('Upload to S3') {
            steps {
                withAWS(credentials: 'aws-credentials') {
                    sh 'aws s3 sync ./frontend/build s3://my-mern-frontend2'
                }
            }
        }
    }
}
```

---

## ✅ S3 Bucket Configuration

To host the frontend, configure your bucket:

1️⃣ **Enable Static Website Hosting**

* Go to the **S3 Console**.
* Select your bucket.
* Enable **Static website hosting**.
* Set `index.html` as the default document.

---

2️⃣ **Make Objects Public (if required)**

Example bucket policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-mern-frontend2/*"
    }
  ]
}
```

---

## 🧪 Troubleshooting

### ❌ Serverless Not Recognized in Jenkins

* Ensure Node.js is in the `PATH`.
* Install Serverless globally in the Jenkins step:

  ```bash
  npm install -g serverless@3
  ```

---

### ❌ AWS CLI Not Found

* Verify AWS CLI is installed and accessible:

  ```bash
  aws --version
  ```

---

### ❌ S3 Permissions

Ensure your IAM user has the following permissions:

* `s3:PutObject`
* `s3:ListBucket`
* `s3:DeleteObject`

---

## 🎯 Future Improvements

✅ Add automated testing stages
✅ Set up notifications (Slack, Email)
✅ Use versioned S3 deployments
✅ Configure CloudFront CDN for frontend

---

## 🙏 Credits

Built by [Anurag Rajput](https://github.com/AnuragRajput-cyber)
Using Jenkins, AWS Lambda, S3, Serverless Framework, and React.

---

## 📄 License

This project is licensed under the MIT License.


