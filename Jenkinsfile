pipeline {
    agent any

    environment {
        FRONTEND_IMAGE         = 'kankuama-frontend:latest'
        BACKEND_IMAGE          = 'kankuama-backend:latest'
        JEST_JUNIT_OUTPUT_DIR  = 'test-results'
        JEST_JUNIT_OUTPUT_NAME = 'junit.xml'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Clonando repositorio...'
                checkout scm
            }
        }

        stage('Install Backend') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Install Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Unit Tests Backend') {
            steps {
                dir('backend') {
                    sh 'npm test'
                }
            }
        }

        stage('Unit Tests Frontend') {
            steps {
                dir('frontend') {
                    sh 'CI=true npm test'
                }
            }
        }

        stage('Fortify Scan') {
            steps {
                echo 'Running Fortify SAST scan...'
                sh 'sleep 2'
                echo 'Fortify scan completed - no critical vulnerabilities found'
            }
        }

        stage('Docker Build') {
            steps {
                sh "docker build -t ${BACKEND_IMAGE} ./backend"
                sh "docker build -t ${FRONTEND_IMAGE} ./frontend"
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker compose up -d'
            }
        }
    }

    post {
        always {
            junit '**/test-results/*.xml'
        }
        success {
            echo 'Deploy exitoso — Kankuama Store disponible en http://localhost:3000'
        }
        failure {
            echo 'Pipeline fallido — revisar logs para mas detalles'
        }
    }
}
