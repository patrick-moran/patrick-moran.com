node {
    def frontend
    def backend

    def buildname = 'b' + env.BUILD_NUMBER

    stage('Get Code') {
        checkout scm
    }

    stage('Build Frontend') {
        frontend = docker.build("kristianwindsor/valley-frontend", "./frontend/")
    }

    stage('Build Backend') {
        backend = docker.build("kristianwindsor/valley-backend", "./backend/")
    }

    stage('Push Images') {
        docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
            frontend.push(buildname)
            frontend.push("latest")
            backend.push(buildname)
            backend.push("latest")
        }
    }
    stage('Deploy') {
        sh """
            sed -i "s/kristianwindsor\\/valley-frontend.*/kristianwindsor\\/valley-frontend:$buildname/" deployment.yaml
            sed -i "s/kristianwindsor\\/valley-backend.*/kristianwindsor\\/valley-backend:$buildname/" deployment.yaml
            cat deployment.yaml
            kubectl apply -f deployment.yaml
        """
    }
}