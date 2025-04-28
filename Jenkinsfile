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
                        sh 'npm install'
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

        stage('Upload Frontend to S3') {
            steps {
                dir('frontend/build') {
                    withAWS(credentials: 'aws-credentials') {
                        sh '''
                        aws s3 sync . s3://my-mern-frontend2/ --delete
                        '''
                    }
                }
            }
        }
    }
}
