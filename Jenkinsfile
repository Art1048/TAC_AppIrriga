pipeline {
    agent any // Roda em qualquer agente disponível

    stages {
        stage('Build and Run Docker Compose') {
            steps {
                // Muda o diretório de trabalho para a pasta 'app'
                dir('app') {
                    script {
                        try {
                            // Agora os comandos serão executados dentro da pasta 'app'
                            sh 'docker-compose down --remove-orphans'
                            sh 'docker-compose up --build -d'
                        } catch (e) {
                            sh 'docker-compose down --remove-orphans'
                            error "Falha ao executar o Docker Compose: ${e}"
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finalizado.'
        }
    }
}