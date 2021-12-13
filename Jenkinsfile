pipeline {
  agent {
    docker {
      image 'cypress/base:16.13.0'
    }
  }


  stages {
    stage('build') {
      steps {
        sh 'npm install --force'
        sh 'npm ci'
        sh 'npm run cy:verify'
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