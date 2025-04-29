pipeline {
    agent any

    environment {
        AWS_DEFAULT_REGION = 'us-east-1'
        PATH = "${env.PATH};C:/Program Files/nodejs/"   
        NPM_CONFIG_CACHE = "${WORKSPACE}\\.npm"         
    }

    options {
        skipStagesAfterUnstable()
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/AnuragRajput-cyber/ServerlessApplication.git'
            }
        }

        stage('Install and Deploy Backend') {
            steps {
                dir('backend') {
                    withAWS(credentials: 'aws-credentials') {
                        bat '''
                            if not exist %USERPROFILE%\\.npm mkdir %USERPROFILE%\\.npm
                            npm install -g serverless@3
                            serverless deploy
                        '''
                    }
                }
            }
        }

        stage('Build Frontend') {
    steps {
        dir('frontend') {
            bat 'npm install'
            bat 'npm run build'
            
            bat 'dir build'
        }
    }
}


        stage('Upload Frontend to S3') {
            steps {
                withAWS(credentials: 'aws-credentials') {
                    bat '''
                        aws s3 sync frontend\\build\\ s3://my-mern-frontend2/ --delete
                    '''
                }
            }
        }
    }

    post {
        success {
            echo ' Deployment Successful!'
        }
        failure {
            echo ' Deployment Failed!'
        }
    }
}
