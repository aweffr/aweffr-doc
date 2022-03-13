---
title: "Jenkins Pipeline: 解决 checkout submodule 问题"
authors: [ aweffr ]
tags: [ "jenkins" ]
---

在配置 Jenkins checkout代码目录本来是很简单:
```
git branch: 'master',
    credentialsId: '12345-1234-4696-af25-123455',
    url: 'ssh://git@your-gitlab.com:company/repo.git'
``` 

但是在实际中, 遇到了一个小问题, 优雅的 git 命令似乎解决不了子模块的问题, 通过了一阵测试之后, 确定work的pipeline代码片段如下:
```
checkout([
    $class: 'GitSCM',
        branches: [[name: "${params.BRANCH}"]],
        doGenerateSubmoduleConfigurations: false,
        extensions: [[
            $class: 'SubmoduleOption',
            disableSubmodules: false,
            parentCredentials: true,
            recursiveSubmodules: true,
            reference: '',
            trackingSubmodules: false
        ]],
        submoduleCfg: [],
        userRemoteConfigs: [[
            credentialsId: '12345-1234-4696-af25-123455',
            url: 'ssh://git@your-gitlab.com:company/repo.git'
        ]]
])
```

## 参考文档
- [StackOverflow: checkout jenkins pipeline git-scm with credentials](https://stackoverflow.com/questions/38461705/checkout-jenkins-pipeline-git-scm-with-credentials)
- [Pipeline: SCM Step](https://www.jenkins.io/doc/pipeline/steps/workflow-scm-step/)