/**
* JetBrains Space Automation
* This Kotlin-script file lets you automate build activities
* For more info, refer to https://www.jetbrains.com/help/space/automation.html
*/

job("Build and push Docker") {
    docker {
        build {
            context = "docker"
            file = "./backend/Dockerfile"
            labels["vendor"] = "BobNET Network"
        }

        push("bobnetnetwork.registry.jetbrains.space/p/cms/containers/cms") {
            tag = "version1.0"
        }
    }
}
