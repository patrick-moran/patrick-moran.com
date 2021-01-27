node {

    buildname = 'b' + env.BUILD_NUMBER

    stage('Get Code') {
        checkout scm
    }

    stage('Build Docker Image') {
        dockerImage = docker.build("kristianwindsor/patrickmoran", "./")
    }

    stage('Push Docker Image') {
        docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
            dockerImage.push(buildname)
            dockerImage.push("latest")
        }
    }
    stage('Deploy') {
        sh """
            sed -i "s/kristianwindsor\\/patrickmoran.*/kristianwindsor\\/patrickmoran:$buildname/" deployment.yaml
            cat deployment.yaml
            kubectl apply -f deployment.yaml
        """
    }
}