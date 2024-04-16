
# 🐷 Warpig API

 ⌨️ with ❤︎ by <a href="https://muxed.dev">MuXeD</a>


[![License](https://img.shields.io/github/license/juananmuxed/warpig-api?label=License)](LICENSE) [![Discord](https://img.shields.io/discord/324463341819133953?color=purple&label=Discord&logo=discord)](https://discord.gg/88rzwfU)

### GitHub Status

![Release](https://img.shields.io/github/v/release/juananmuxed/warpig-api?include_prereleases&label=Release&logo=github) ![GitHub issues by-label](https://img.shields.io/github/issues/juananmuxed/warpig-api/bug?label=Bugs%20Opened&logo=github) ![GitHub commit activity](https://img.shields.io/github/commit-activity/m/juananmuxed/warpig-api?label=Activity&logo=github)

### Demo deploy status

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/juananmuxed/warpig-api/deploy.yml?label=Workflow)

## 🎱 Introduction

Warpig is a Pairing software API to create tournament of different Wargames

## ☕️ Buy Me a Coffee

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/U7U21M2BE)

## 🐛 Report a bug

Please follow one of this links to report a bug:
- [Github issues](https://github.com/juananmuxed/warpig-api/issues)
- [Discord](https://discord.gg/88rzwfU)

## 💻 Development

To fix bugs or simply check code.

Requirements:

- Install MariaDB (and create a database called warpig)
- Node 12 at least

Clone the repo

```bash
git clone https://github.com/juananmuxed/warpig-api.git
```

Access to the folder

```bash
cd warpig-api
```

Run NPM to install dependencies and run dev environment

```bash
cd npm i
cd npm run dev
```

Clone .env.example or rename as .env

And you can access to the swagger via web browser in http://localhost:3000/swagger

## Docker production

Create a `.env.production` with params of DB and run `npm run docker:deploy`

Remember you need a Database with a `name-of-table` table chosen in the `.env.production` file.

## 🏗 Built with

- [Node](https://nodejs.org)
- [Express](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)

## 📌 Versions

Used [SemVer](http://semver.org/) for versions. For all available version, see [tags](https://github.com/juananmuxed/warpig-api/tags).

And here the [Changelog](CHANGELOG.md)

## 🍰 Contributing

Please read [CONTRIBUTING](CONTRIBUTING.md) for details on our [CODE OF CONDUCT](CODE_OF_CONDUCT.md), and the process for submitting pull requests.

## 📄 License

This project is under license (MIT) - see [LICENSE](LICENSE) for details.
