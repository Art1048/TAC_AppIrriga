pipeline {
    // Define que o agente para este pipeline será um contêiner Docker
    agent {
        docker {
            image 'docker/compose:1.29.2' // Imagem oficial que contém docker-compose
            // Argumento crucial para permitir que este contêiner controle outros contêineres
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }

    stages {
        stage('Run Docker Compose Application') {
            steps {
                // Como o agente já é o container com as ferramentas,
                // e o Jenkins já fez o checkout do código, podemos ir direto ao ponto.
                
                // Entramos na pasta 'App' onde está o seu docker-compose.yml
                dir('App') {
                    script {
                        try {
                            echo "Running docker-compose commands from inside a docker/compose container..."
                            
                            // Os comandos agora funcionarão, pois o agente tem o 'docker-compose'
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