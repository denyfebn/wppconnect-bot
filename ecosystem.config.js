module.exports = {
    apps: [
      {
        name: "server",
        script: "dist/server.js",
        cwd: "/home/wppconnect-bot",
        watch: false,
      },
      {
        name: "worker",
        script: "worker.js",
        cwd: "/home/wppconnect-bot",
        watch: false,
      },
      {
        name: "checker",
        script: "checker.js",
        cwd: "/home/wppconnect-bot",
        watch: false,
      },
    ],
  };
  