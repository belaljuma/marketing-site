---
title: Installing Custom Plugins
lastUpdated: '2021-03-16T17:55:00.0Z'
description: How to add a custom Backstage plugin to Roadie
---

# Introduction

Your plugins can be installed via npm or yarn, like publishing a normal package. We will provide you a unique scope for
your plugins, and we host a dedicated npm registry which you can publish to.

## Prerequisites

- For our alpha release you'll need to give us some information upfront about your plugin. We plan to make all of this
  self-service going forward but currently backstage doesn't support this out-of-the-box. For now, we will need you to
  fill out [this form][form].

- Get your credentials for the npm registry. Follow [this link][forgot-password] to reset your password. The username is
  `<your-company>-roadie`. This will send a reset link to the email we have associated with your account. You can
  change this email as you wish.

- Configure npm. There are two options:

  - Interactively using npm login. Suitable for a developer testing the process.
    <pre>
    npm config set @<b>&lt;your-company&gt;</b>-roadie:registry https://roadiehq.jfrog.io/artifactory/api/npm/<b>&lt;your-company&gt;</b>-roadie/
    npm login --scope=@<b>&lt;your-company&gt;</b>-roadie 
    # This will prompt for your username, password and email
    </pre>

  - In a CI/CD environment you can write a local `.npmrc` file
    <pre>
    @<b>&lt;your-company&gt;</b>-roadie:registry &lt;https://roadiehq.jfrog.io/artifactory/api/npm/<b>&lt;your-company&gt;</b>-roadie/&gt;
    _auth = username:password # converted to base64
    # _auth = ${NPM_AUTH} # You can also use an environment variable
    always-auth = true
    </pre>

## Publishing

Once you're ready to publish your plugin these are the steps you'll need to follow:

1. Ensure your package is scoped correctly in package.json. The name field should follow this pattern
   `@<your-company>-roadie/<package-name>`
2. Select a new package version to publish. You can't overwrite a version once published (e.g. npm version patch)
3. Build your plugin (e.g. yarn install && yarn tsc && yarn build)
4. Publish your plugin npm publish
5. (Optional) Check the registry npm info `@<your-company>-roadie/<package-name>`

[forgot-password]: https://roadiehq.jfrog.io/ui/login/forgot-password
[form]: https://docs.google.com/forms/d/e/1FAIpQLSdSNr4Ps_RpKEx0V2QbxWaKLb3-DKi0W7U09Wth0SXHQoPyXQ/viewform