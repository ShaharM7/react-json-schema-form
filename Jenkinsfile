pipeline {
  agent none
  stages {
    stage('build') {
    agent {
           docker { image 'node:16.13.1' }
          }
      steps {
        sh 'npm install --force'
        sh 'npm ci'
        sh 'npm run cy:verify'
      }
    }

    stage('start local server') {
      agent {
       docker { image 'node:16.13.1' }
      }
      steps {
        sh 'npm start'
      }
    }

    stage('Run e2e tests') {
      agent {
        docker { image 'cypress/base:16.13.0' }
      }
      steps {
        sh 'npm run cy:run'
      }
    }
  }

  post {
    always {
      echo 'Stopping local server'
      sh 'pkill -f http-server'
    }
  }
}