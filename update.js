module.exports = {
  run: [{
    method: "shell.run",
    params: {
      message: "git pull"
    }
  }, {
    method: "shell.run",
    params: {
      path: "app",
      message: [
        "git checkout .",
        "git pull"
      ]
    }
  }, {
    method: "shell.run",
    params: {
      message: "python patch.py"
    }
  }]
}
