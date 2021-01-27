node {
    def frontend

    def buildname = 'b' + env.BUILD_NUMBER

    stage('Get Code') {
        checkout scm
    }

    stage('Build Frontend') {
        frontend = docker.build("kristianwindsor/valley-frontend", "./")
    }

    stage('Push Images') {
        docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
            frontend.push(buildname)
            frontend.push("latest")
        }
    }
    stage('Deploy') {
        sh """
            sed -i "s/kristianwindsor\\/valley-frontend.*/kristianwindsor\\/valley-frontend:$buildname/" deployment.yaml
            cat deployment.yaml
            kubectl apply -f deployment.yaml
        """
    }
}