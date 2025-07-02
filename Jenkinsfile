pipeline {
    agent any // Define que o pipeline pode rodar em qualquer agente disponível

    stages {
        stage('Checkout') {
            steps {
                // Clona o repositório Git.
                // Substitua a URL pelo endereço do seu repositório.
                // Se o repositório for privado, adicione a opção 'credentialsId'
                git url: 'https://github.com/seu-usuario/seu-repositorio.git', branch: 'main'
            }
        }

        stage('Build and Run Docker Compose') {
            steps {
                script {
                    try {
                        // Para e remove contêineres de execuções anteriores para evitar conflitos
                        sh 'docker-compose down --remove-orphans'

                        // Constrói as imagens (se necessário) e sobe os contêineres em background
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
        // Bloco 'always' é executado sempre ao final do pipeline, independentemente do resultado
        always {
            echo 'Pipeline finalizado. Para parar os serviços, execute "docker-compose down" manualmente ou configure um novo estágio.'
            // Você pode adicionar um passo de 'input' para decidir se deve parar os serviços
            // ou criar um job separado para o 'down'.
        }
    }
}