---
humanName: Jenkins
heading: 'Backstage Jenkins Plugin'
lead: 'Build, test, and deploy on Jenkins CI/CD platform.'
attribution:
  text: '@timja'
  href: https://github.com/timja

seo:
  title: 'Backstage Jenkins Plugin | Roadie'
  description: |
    Build, test, and deploy on Jenkins CI/CD platform.

logoImage: '../../assets/logos/jenkins/logo-jenkins.png'
coverImage: '../../assets/backstage/plugins/jenkins/jenkins-plugin.png'
coverImageAlt: 'A screenshot of the Jenkins plugin.'

gettingStarted:
  - intro: Install the plugin.
    language: bash
    code: |
      cd packages/app
      yarn add @backstage/plugin-jenkins

  - intro: Add the plugin API to your Backstage app.
    language: typescript
    code: |
      // packages/app/src/components/catalog/EntityPage.tsx
      import { EntityJenkinsContent } from '@backstage/plugin-jenkins';

      // add new Jenkins tab to the service component page
      const serviceEntityPage = (
        <EntityLayout>
          ...
          <EntityLayout.Route path="/jenkins" title="Jenkins">
            <EntityJenkinsContent />
          </EntityLayout.Route>
          ...
        </EntityLayout>
      );

  - intro: Add proxy configuration to your Backstage app's config. A Jenkins API token is required. See [how to get a Jenkins API token](#how-to-get-a-jenkins-api-token) below.
    language: YAML
    code: |
      // app-config.yaml
      proxy:
        '/jenkins/api':
          target: 'http://localhost:8080'
          changeOrigin: true
          headers:
            Authorization: Basic ${JENKINS_BASIC_AUTH_HEADER}
      
  - intro: Add Jenkins plugin annotation to your component's config.
    language: YAML
    code: |
      // catalog-info.yaml
      metadata:
        annotations:
          jenkins.io/github-folder: '[github-organization-project-name/job-name]

---

### Jenkins plugin features

The Jenkins plugin can pull bulid information from a GitHub Organization project in Jenkins. Other Jenkins project types like Freestyle project and Pipeline are not supported yet.

![Jenkins menu to create new items](../../assets/backstage/plugins/jenkins/jenkins-new-item-options.png)

The plugin shows a list of the most recent builds in Backstage. This list includes builds from all projects that are available in the GitHub Organization project in Jenkins.

![Jenkins and Backstage side-by-side](../../assets/backstage/plugins/jenkins/jenkins-and-backstage-side-by-side.png)

View additional build information by selecting a build from the list.

![Backstage Jenkins job details](../../assets/backstage/plugins/jenkins/backstage-jenkins-job-details.png)

### How to get a Jenkins API token

Your Backstage app's backend connects to your Jenkins server using the Jenkins API. A Jenkins API token is required. This token can be obtained from a system environment variable (ex. JENKINS_BASIC_AUTH_HEADER) containing a base64 encoded string.

1. Access the settings page of the Jenkins user for which you want to create an API token. For example, for a user named "admin" on a local Jenkins server: [http://localhost:8080/user/admin/](http://localhost:8080/user/admin/).
2. Add a new token under the 'API Token' section. Copy the token before leaving the page.
3. Construct a base64 encoded basic authorization string using your Jenkins user's name and the API token. For example, in a Bash shell:

    ```
    echo -n admin:1147f3bd451f3c48b8f21fd3aba13e58eb | base64
    ``` 

4. Save the base64 encoded string to an environment variable named `JENKINS_BASIC_AUTH_HEADER`. This variable can be used in the Jenkins proxy configuration in your Backstage app's `app-config.yaml`.


### Setting up a local Jenkins environment

If you want to try out this plugin but you don't have a Jenkins server to test it with, you can quickly setup a local Jenkins server with docker. See the instructions available in the [official Jenkins Docker GitHub repo](https://github.com/jenkinsci/docker/blob/master/README.md).


