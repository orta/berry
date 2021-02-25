module.exports = {
  name: `@orta/yarn-plugin-hello-universe`,
  factory: require => {
    const {Command, Option} = require(`clipanion`);
    const t = require(`typanion`);

    class HelloWorldCommand extends Command {
      static paths = [
        [`hello`, `universe`],
      ];

      static usageusage = Command.Usage({
        description: `hello world!`,
        details: `
          This command will print a nice message.
        `,
        examples: [[
          `Say hello to an email user`,
          `yarn hello --email acidburn@example.com`,
        ]],
      });

      email = Option.String(`--email`, {
        validator: t.applyCascade(t.isString(), [
          t.matchesRegExp(/@/),
        ]),
      });

      async execute() {
        this.context.stdout.write(`Hello ${this.email}, from the universe 💌\n`);
      }
    }

    return {
      commands: [
        HelloWorldCommand,
      ],
    };
  },
};
