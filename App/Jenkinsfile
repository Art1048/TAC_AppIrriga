pipeline {
    agent any  // Usa qualquer agente disponível (pode ajustar para um específico)

    stages {
        stage('Build Docker Compose') {
            steps {
                script {
                    // Verifica se o docker está disponível
                    if (sh(script: "command -v docker", returnStatus: true) == 0) {
                        sh '''
                            cd App
                            docker compose down || true
                            docker system prune -af || true
                            docker compose up -d --build
                        '''
                    } else {
                        error "Docker CLI não encontrado no ambiente Jenkins"
                    }
                }
            }
        }
    }
}