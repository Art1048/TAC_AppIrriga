pipeline {
    agent any // Roda em qualquer agente disponível

    stages {
        stage('Build and Run Docker Compose in App folder') {
            steps {
                // Correção: O nome do diretório é 'App', com 'A' maiúsculo
                dir('App') {
                    script {
                        try {
                            echo "Running docker-compose commands inside the 'App' directory..."
                            
                            // Agora os comandos serão executados dentro da pasta correta
                            sh 'docker-compose down --remove-orphans'
                            sh 'docker-compose up --build -d'
                            
                            echo "Docker Compose services started successfully."
                        } catch (e) {
                            sh 'docker-compose down --remove-orphans'
                            error "Failed to run Docker Compose: ${e}"
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
    }
}