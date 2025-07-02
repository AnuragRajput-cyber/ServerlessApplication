# Serverless MERN Application Deployment Pipeline

This project demonstrates a **complete CI/CD pipeline** using **Jenkins**, **GitHub**, **AWS Lambda**, and **Amazon S3** to deploy a serverless MERN stack application automatically.

---

## 📋 Project Overview

- **Backend**: Node.js serverless functions deployed to AWS Lambda using [Serverless Framework](https://www.serverless.com/).
- **Frontend**: React application deployed to an S3 bucket as a static website.
- **CI/CD**: Jenkins Pipeline automates:
  - Cloning code from GitHub
  - Installing dependencies
  - Building and deploying backend and frontend
  - Uploading frontend build artifacts to S3

---

## 🛠️ Prerequisites

Before running the Jenkins pipeline, ensure you have:

1. **AWS CLI Installed and Configured**
   ```powershell
   aws configure
````

> Enter your AWS Access Key, Secret Key, and Region.

2. **Serverless Framework Installed Globally**

   ```powershell
   npm install -g serverless@3
   ```

3. **Node.js Installed**

   * [Download Node.js](https://nodejs.org/)
   * Verify:

     ```powershell
     node -v
     npm -v
     ```

4. **Docker Installed (if needed by Jenkins agents)**

   * [Install Docker Desktop](https://www.docker.com/products/docker-desktop)

5. **Jenkins Installed**

   * [Download Jenkins](https://www.jenkins.io/download/)
   * Start Jenkins and install recommended plugins.

6. **Jenkins AWS Credentials**

   * In Jenkins, add credentials:

     ```
     Type: AWS Credentials
     ID: aws-credentials
     ```
   * These credentials will be used by `withAWS(credentials: 'aws-credentials')`.

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

The pipeline defined in `Jenkinsfile` consists of **four main stages**:

1. **Checkout Code**

   * Pulls the latest code from the `main` branch on GitHub.

2. **Install and Deploy Backend**

   * Installs Serverless Framework.
   * Deploys backend Lambda functions using `serverless deploy`.

3. **Build Frontend**

   * Installs npm dependencies.
   * Builds the React application.

4. **Upload Frontend to S3**

   * Syncs the `frontend/build` directory to the target S3 bucket:

     ```
     s3://my-mern-frontend2
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
        stage('Checkout') { ... }
        stage('Deploy Backend') { ... }
        stage('Build Frontend') { ... }
        stage('Upload to S3') { ... }
    }
}
```

> **Note:** All backend deployments use Serverless Framework with your configured AWS credentials.

---

## 🧪 How to Run the Pipeline

1. Start Jenkins and ensure Docker and Node.js are installed.
2. Create a **Pipeline job** in Jenkins.
3. Configure the GitHub repository URL.
4. Paste the `Jenkinsfile` contents into the pipeline script.
5. Add AWS credentials in Jenkins credentials store.
6. Click **Build Now**.
7. Check the console output for deployment progress.

---

## ✅ S3 Bucket Configuration

To host the frontend, ensure the S3 bucket is set to serve a static website:

1. **Enable Static Website Hosting:**

   * In S3 console, select your bucket.
   * Enable static website hosting.
   * Set `index.html` as the default document.

2. **Make Objects Public (if required):**

   * Configure bucket policy to allow public read access.

---

## 📝 Troubleshooting

* **Serverless not recognized in Jenkins**

  * Ensure Node.js is installed and in PATH:

    ```
    C:/Program Files/nodejs/
    ```
  * Install serverless globally in the Jenkins step:

    ```
    npm install -g serverless@3
    ```

* **AWS CLI not found**

  * Verify `aws` is in system PATH.
  * Test by running:

    ```
    aws --version
    ```

* **S3 Permissions**

  * Ensure the IAM user has:

    ```
    s3:PutObject
    s3:ListBucket
    s3:DeleteObject
    ```

    permissions for your bucket.

---

## 🎯 Future Improvements

* Add automated testing stages.
* Set up notifications (Slack, Email) for deployments.
* Use versioned S3 deployments.
* Configure CloudFront CDN for frontend.

---

## 🙏 Credits

Built by [Anurag Rajput](https://github.com/AnuragRajput-cyber).
Using Jenkins, AWS Lambda, S3, Serverless Framework, and React.

---

## 📄 License

This project is licensed under the MIT License.

