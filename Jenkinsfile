pipeline {
  agent {
     docker { image 'node:16.13.1' }
  }

  stages {
    stage('build') {

      steps {
        sh 'npm install cypress --save-dev'
        sh 'npm install --force'
        sh 'npm ci'
        sh 'npm run cy:verify'
        sh 'npm run build'
      }

    }

    stage('start local server') {
      steps {
        sh 'npm start'
      }
    }

    stage('Run e2e tests') {
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