pipeline {
    agent any

    environment {
        AWS_DEFAULT_REGION = 'us-east-1'
    }

    stages {
        stage('Clone Repo') {
            steps {
                git branch: 'main', url: 'https://github.com/AnuragRajput-cyber/ServerlessApplication.git'
            }
        }

        stage('Use AWS Credentials') {
            steps {
                withAWS(credentials: 'aws-credentials') {
                    echo "AWS credentials injected successfully"
                }
            }
        }

        stage('Deploy Backend to Lambda') {
            steps {
                dir('backend') {
                    withAWS(credentials: 'aws-credentials') {
                        bat 'npm install'
                        bat 'npx serverless deploy'
                    }
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        stage('Upload Frontend to S3') {
            steps {
                dir('frontend\\build') { // Windows path ke liye "\\" use kiya
                    withAWS(credentials: 'aws-credentials') {
                        bat 'aws s3 sync . s3://my-mern-frontend2/ --delete'
                    }
                }
            }
        }
    }
}
