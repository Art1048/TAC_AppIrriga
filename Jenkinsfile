pipeline {
    agent any // Define que o pipeline pode rodar em qualquer agente

    stages {
        stage('Build and Run Docker Compose') {
            steps {
                script {
                    try {
                        // O código já está disponível aqui pelo checkout automático do Jenkins
                        
                        // Para e remove contêineres de execuções anteriores
                        sh 'docker-compose down --remove-orphans'

                        // Constrói as imagens e sobe os contêineres
                        sh 'docker-compose up --build -d'
                    } catch (e) {
                        // Em caso de falha, garante que os contêineres sejam parados
                        sh 'docker-compose down --remove-orphans'
                        error "Falha ao executar o Docker Compose: ${e}"
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