import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import '../css/resume.scss';
import chineseDict from '../lang/chinese';


enum Language {
  chinese = 'chinese',
  english = 'english'
}

const resumeData: { [key: string]: { [key: string]: string } } = {
  name: {
    [Language.chinese]: '邹乐 Le Zou',
    [Language.english]: 'Le Zou 邹乐',
  },
  currentPosition: {
    [Language.chinese]: '全栈工程师',
    [Language.english]: 'Fullstack Engineer'
  },
  summary: {
    [Language.chinese]: '热爱编程。具有五年开发经验，在后端开发和前端开发领域都相当熟悉，工作中参与并主导了公司内部系统中即时通信软件、云盘、视频会议系统从零到一的完整历程。在这个互联网技术大跃进的浪潮里，对新技术始终保持着学习的热情。不过，在工作中会评估它们的实用价值后再审慎的引入它们。现在在公司担任内部办公应用移动端组长，兼任视频会议系统的搭建和功能开发。',
    [Language.english]: 'I love programming. I have five years of development experience and I\'m familliar with both the frontend and the backend. I have participated in and led the whole developement of the IM system, cloud disk, and video conferencing application for internal usage from zero to one. I enjoy learing new technologies, but I don\'t always adopt them in production. I am currently working in Eastmoney as the dev leader of the mobile communication App, and I am also responsible for the construction and feature development of the video conference system.',
  },
  educationTitle: {
    [Language.chinese]: '学历',
    [Language.english]: 'Education',
  },
  workExpirenceTitle: {
    [Language.chinese]: '工作经历',
    [Language.english]: 'Work Expirence',
  },
  skillTitle: {
    [Language.chinese]: '专业技能',
    [Language.english]: 'Qualification & Skills',
  },
  projectTitle: {
    [Language.chinese]: '项目经历',
    [Language.english]: 'Projects',
  },
}

const educationData = {
  [Language.chinese]: [
    {
      id: 1,
      school: '上海交通大学',
      degree: '学术硕士 结构工程',
      location: '上海',
      date: '2015.9 - 2018.3'
    },
    {
      id: 2,
      school: '上海交通大学',
      degree: '学士 土木工程',
      location: '上海',
      date: '2011.9 - 2015.6'
    }
  ],
  [Language.english]: [
    {
      id: 1,
      school: 'Shanghai Jiao Tong University',
      degree: 'Master of Science, Structural Engineering',
      location: 'Shanghai',
      date: '2015.9 - 2018.3'
    },
    {
      id: 2,
      school: 'Shanghai Jiao Tong University',
      degree: 'Bachelor of Engineering, Civil Engineering',
      location: 'Shanghai',
      date: '2011.9 - 2015.6'
    }
  ]
}

const workExpirenceData = {
  [Language.chinese]: [
    {
      id: 1,
      company: '东方财富信息股份有限公司',
      title: '运维研发工程师 -> 移动端开发工程师',
      location: '上海',
      date: '2018.4 - 至今'
    }
  ],
  [Language.english]: [
    {
      id: 1,
      company: 'East Money Information Co.,Ltd.',
      title: 'Software Engineer',
      location: 'Shanghai',
      date: '2018.4 - Present'
    }
  ]
}

const skillsData = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React', score: 4.5 },
      { name: 'React Native', score: 4.5 },
      { name: 'Unstated/Redux', score: 4 },
      { name: 'Typescipt', score: 4 },
      { name: 'Performance Tuning', score: 4 },
      { name: 'Vue', score: 3.5 },
      { name: 'Webpack & Babel', score: 3 },
      // { name: 'Antd', score: 3 },
      // { name: 'Bootstrap', score: 3 },
      { name: 'Sass', score: 2 },
      { name: 'iOS & Android', score: 2 },
    ]
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Python', score: 5 },
      { name: 'Django', score: 4.5 },
      { name: 'RESTful APIs', score: 4.5 },
      { name: 'System Design', score: 4 },
      { name: 'Performance Tuning', score: 4 },
      { name: 'Golang', score: 3 },
      { name: 'MySQL', score: 3 },
      { name: 'Node', score: 2 },
      // { name: 'Redis', score: 2 },
      // { name: 'Java', score: 2 },
      { name: 'C(w/ STL)', score: 2 },
    ],
  },
  {
    title: 'General',
    skills: [
      { name: 'Web Search', score: 5 },
      { name: 'Data Structure', score: 4 },
      { name: 'English', score: 4 },
      { name: 'Nginx', score: 4 },
      { name: 'Docker', score: 4 },
      { name: 'System Programming', score: 3 },
      { name: 'Jenkins', score: 3 },
      { name: 'Project Management', score: 3 },
      { name: 'Machine Learning', score: 2 }
    ]
  }
]

const projectsData = [
  {
    id: 1,
    name: '咚咚 (内部IM) 移动端',
    date: '2019.5 - 至今',
    keywords: ['React Native', 'Typescript', '即时聊天', 'CI/CD', '热更新', '视频会议'],
    details: [
      '背景: 于2019年5月独立接手未上线的半成品RN项目, 采用 Typescript 进行了全部重写, 耗时2个月上线。初版具备流程审批和简单文字、图片消息的即时通信功能。',
      '状态管理: 采用 Unstated 作为全局状态管理工具编写客户端聊天引擎, 采用面向对象风格完成聊天消息的收、发、加载、存储、更新等业务。在Unstated与UI组件连接的部分设计缓存以优化性能。',
      '性能优化: 早期采用 TypeORM + Sqlite 做消息的客户端持久化, 随后为降低 TypeORM 运行时开销, 减少 bridge 通信成本, 将重要且稳定的业务替换成raw sql。',
      '后端优化: 指导后端以"写扩散"思路重新设计数据库Schema, 要求以RESTful风格编写接口, 排查后端 N+1 问题, 实现可靠高效的历史消息拉取、已读、咚（类似于钉钉的“钉一下”）、机器人消息等增强功能。',
      '视频会议: 基于 jitsi-meet(WebRTC SFU) 开源项目，二次开发音视频会议功能, 为公司内部远程办公、开会、视频面试等业务提供支持。',
      '功能开发: 研发、审校日常办公功能，如：流程批量处理, 薪资查询, 远程办公打卡, 日程, 通讯录, 活动页, 集成微信sdk等。',
      '研发管理: 制定研发规范, 统一项目整体代码风格, 明确研发工作流, 提高模块实现质量。',
      '基础设施: 编写自动化打包脚本、搭建Sentry、Jenkins等, 为项目自动化部署、异常监控提供支持。',
      '热更新: 基于替换JSBundle实现APP热更新, 开发了对应的静态资源存储、分发平台 MyAppCenter, 开发了灵活的策略支持对指定用户、部门或者全员推送更新。',
      '搭建DevOps工作流: 研发Merge Request会自动触发Jenkins构建并推送到 MyAppCenter, 对应Bundle会以二维码图片消息推送给相关人员, 通过APP内置扫码功能即可更新。测试通过的Bundle即可作为RC随时推送给用户, 提升App功能的开发和交付的效率。'
    ],
    detailsInEnglish: [
      'Background: In May 2019, I took over the half-finished RN project that was not delivered. I refactored and delivered that OA App with Typescript in next 2 months. In the first version, users could approve flow and communicate through text and pictures.',
      'State Management: I adopt unstated library to handle messages in object-orient style. A cache was impletmented in the section where Unstated connects with UI components to optimize performance.',
      'IO Performance Optimization: Replace typeorm with raw sql in critial path, to reduce the overhead of runtime and the load of JS-bridge.',
      'Backend refaction: I re-designed the IM system in "write ahead" way, and asked the backend engineer to develop API in RESTful style. I founed and solved most of the N+1 problem in backend system. After refaction, a lot of advanced IM features were implented, such as read receipts and alerts.',
      'Video Conferening: Integrated the jitsi-meet (an open source WebRTC SFU) into IM App, to provide support for remote conference and video interview.',
      'Feature Development: R&D and code review of daily demands, such as: workflow batch processing, salary inquiry, remote office sign-in, calendar, contact, integration of WeChat SDK, etc.',
      'Specification Development: Norm-setting the code style and R&D workflow, to improve the quality of module implementation.'
    ]
  },
  {
    id: 2,
    name: '视频会议系统',
    date: '2020.10 - 至今',
    keywords: ['WebRTC', 'React & Redux', '监控', '横向扩容'],
    details: [
      '背景: 于2021年10月启动, 经过一定时间的调研后, 决定基于 Jitsi Meet 项目二次开发内部视频会议系统。',
      '集成: 业务上, 主导了二次开发会议系统后端、视频会议内的Web端和App端, 打通账户认证, 实现主客户端中立即开会、预约会议、会议中发送邀请消息卡片等功能。',
      '调参: 根据实际使用情况, 调整视频编码、音频码率、入会控制等参数, 提升用户使用体验。魔改了其信令组件以提供实时会议状态接口供监控系统使用。',
      '设备检测: 开发设备检测页, 尽力解决由于客户端的麦克风、播放器、系统隐私授权造成的会议不可用问题，界面上提供对应问题的提示引导，并帮助技术支持更好的现场解决问题。',
      '监控: 为监测会议质量, 开发客户端agent, 对用户实际进出会议，会议中网络质量, WebRTC部分指标进行收集上报, 后端开发统计接口, 形成类似于CallStat.io的监控Dashboard。',
      '集群化: 根据官方文档结合源码实现了jvb集群部署模式, 解决jvb组件的单点问题的同时为视频会议提供了横向扩容的能力。',
      '会议室终端: 采用Electron开发会议室终端, 集成内部IM的会议安排管理和视频会议功能, 对公司部分会议室实现数字化管理。',
    ],
  },
  {
    id: 3,
    name: '内部云盘',
    date: '2020.6 - 2021.6',
    keywords: ['Django', 'Seafile', 'React', '云文档'],
    details: [
      '背景: 基于Seafile二次开发内部云盘, 打通账号系统, 支持员工将云盘文件作为消息卡片在主应用中进行收发。',
      '改造: 扩展了部分Seahub(Seafile子项目)的API, 弱化目录、路径等概念, 开发"最近使用", "群文档"等功能, 加强与主应用的集成。',
      '在线办公套件: 集成并二次开发了OnlyOffice作为在线办公套件, 实现大部分word, excel文档的实时在线协同编辑。',
      '强化权限: 应部分部门需求, 开发细粒度的文件权限管理模块、手机验证码登录、查看等功能。',
    ],
  },
  {
    id: 4,
    name: '其他',
    date: '',
    keywords: ['Dashboard', '监控系统', 'ECharts'],
    details: [
      '研发插件(2021.10 - 至今): 以开发的简易OIDC Provider为基础, 通过webhooks打通代码仓库、项目管理系统和内部IM, 并提供代码统计功能。',
      '文字头像渲染服务(2021.9): 开发服务端渲染方案, 解决文字头像业务在各端出现的兼容性问题。项目中计算与存储分离, 性能通过了压测, 已在全产品中应用。',
      '周报系统(2021.8): 开发了统一的内部周报系统, 具有附件、填写提醒、汇总导入、抄送等功能, 与内部IM深度集成。',
      '运营大屏(2018.4 - 2019.5): 从数据中台的报表数据库取数, 为运营中台持续开发并维护业务监控大屏。',
      '第一届WAIC会展大屏(2018.8): 开发公司在第一届世界人工智能大会的会展大屏, 展示实时股票市场数据和数据分析系统的数据。',
      'Abaqus自动化建模(2017.1-2018.3): 基于Abaqus的Python接口开发网壳结构的自动化建模和迭代找形程序, 探索一种可简易布置后一次拉升成型的网壳建筑方案的可行性。'
    ]
  }
]

// PAT 证书校验地址: https://www.patest.cn/certificates


const t = (key: string, lang: Language = Language.chinese) => {
  return resumeData[key][lang];
}

const tK = (lang: Language) => {
  const func = (text) => {
    if (lang === Language.chinese && chineseDict[text] !== undefined) {
      return chineseDict[text]
    }
    return text;
  }
  return func;
}

function ProjectDesc({ text }: { text: string }) {
  let indexOfSubTitle = text.indexOf(': ');
  if (indexOfSubTitle === -1) {
    return <span>{text}</span>;
  } else {
    let subTitle = text.slice(0, indexOfSubTitle + 2);
    let _text = text.slice(indexOfSubTitle + 2);
    return <><b>{subTitle}</b><span>{_text}</span></>;
  }
}

// TODO: utilize docuarus language support

function Resume() {
  const { siteConfig } = useDocusaurusContext();
  const [lang, setLang] = React.useState<Language>(Language.chinese);

  const onClickSwitchLang = React.useCallback((e) => {
    if (lang === Language.chinese) {
      setLang(Language.english);
    } else {
      setLang(Language.chinese);
    }
  }, [lang]);

  const _educationData = educationData[lang];
  const _workExpirenceData = workExpirenceData[lang];

  const _t = tK(lang);

  return (
    <Layout
      title={`${_t('Resume')} | ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"

    >
      <main>
        <div className="resume-container">
          <section>
            <button className='my-button-primary' onClick={onClickSwitchLang}>
              {
                lang === Language.chinese ? 'Switch To English' : '查看中文版本'
              }
            </button>
          </section>
          <section className='my-section header-container'>
            <div className='header-basic-info'>
              <h1>{t('name', lang)}</h1>
              <h2>{t('currentPosition', lang)}</h2>
              <h4>15026950096 | aweffr@foxmail.com | {_t('WeChat')}: aweffr</h4>
            </div>
            <div className='header-summary'>
              {/* <p>{t('summary', lang)}</p> */}
            </div>
          </section>

          <section className='my-section education-container'>
            <h2>
              {t('educationTitle', lang)}
            </h2>
            <div className='education-list'>
              {
                _educationData.map(item => (
                  <div className='my-list-item education-list-item' key={item.id}>
                    <div className='main-content'>
                      <div>{item.school}</div>
                      <div>{item.degree}</div>
                    </div>
                    <div className='location-and-date'>
                      <div>{item.location}</div>
                      <div>{item.date}</div>
                    </div>
                  </div>
                ))
              }
            </div>
          </section>

          <section className='my-section work-expirence-conatainer'>
            <h2>
              {t('workExpirenceTitle', lang)}
            </h2>
            <div>
              {
                _workExpirenceData.map(item => (
                  <div className='my-list-item' key={item.id}>
                    <div className='main-content'>
                      <div>{item.company}</div>
                      <div>{item.title}</div>
                    </div>
                    <div className='location-and-date'>
                      <div>{item.location}</div>
                      <div>{item.date}</div>
                    </div>
                  </div>
                ))
              }
            </div>

          </section>


          <div>
            <h2>
              {t('skillTitle', lang)}
            </h2>
            <div className='skill-container'>
              {
                skillsData.map(aspect => (
                  <div className='skill-column' key={aspect.title}>
                    <h3>{_t(aspect.title)}</h3>
                    <div>
                      {
                        aspect.skills.map(skill => (
                          <div key={skill.name} className='skill-item'>
                            <div className='skill-name'>{_t(skill.name)}</div>
                            <div className='skill-score'>{_t(skill.score)}</div>
                          </div>
                        ))
                      }
                    </div>

                  </div>
                ))
              }
            </div>
          </div>

          <section className="my-section section-project">
            <h2>
              {t('projectTitle', lang)}
            </h2>
            <div>
              {
                projectsData.map(project => (
                  <div key={project.id} className="project">
                    <div className='project-basic-info'>
                      <h3>{project.name}</h3>
                      <div>{project.date}</div>
                    </div>
                    <div className='project-keywords'>
                      <span>关键字: </span>
                      {
                        project.keywords.map((k, idx) => {
                          let txt = k;
                          if (idx !== project.keywords.length - 1) {
                            txt += ', '
                          }
                          return <span key={k}>{txt}</span>
                        })
                      }
                    </div>
                    <ul>
                      {
                        project.details.map((text, idx) => {
                          if (lang === Language.english && project.detailsInEnglish?.[idx]) {
                            return <li key={idx}><ProjectDesc text={project.detailsInEnglish[idx]} /></li>
                          } else {
                            return <li key={idx}><ProjectDesc text={text} /></li>
                          }
                        })
                      }
                    </ul>
                  </div>
                ))
              }
            </div>
          </section>

        </div>
      </main>
    </Layout>
  )
}

export default Resume;
