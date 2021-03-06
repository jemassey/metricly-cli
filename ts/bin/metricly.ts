#! /usr/bin/env node

import * as caporal from 'caporal';
import chalk from 'chalk';
import * as updateNotifier from 'update-notifier';

import ConfigCommands from '../commands/ConfigCommands';
import DashboardCommands from '../commands/DashboardCommands';
import PackageCommands from '../commands/PackageCommands';
import PolicyCommands from '../commands/PolicyCommands';
import ReportCommands from '../commands/ReportCommands';

// tslint:disable-next-line:no-var-requires
const pkg = require('../../package.json');

const notifier = updateNotifier({ pkg });
const update = notifier.update;

if (update) {
  notifier.notify({
    defer: false,
    message: [
      'Update available ' + chalk.dim(update.current) + chalk.reset(' → ') + chalk.green(update.latest),
      'Run ' + chalk.cyan('npm i -g metricly-cli') + ' or download the latest binary to upgrade',
      chalk.blue('https://github.com/metricly/metricly-cli/releases/latest')
    ].join('\n')
  });
}

(caporal as any)
  .version(pkg.version)
  .description(pkg.description);

ConfigCommands.addCommands();
PackageCommands.addCommands();
PolicyCommands.addCommands();
DashboardCommands.addCommands();
ReportCommands.addCommands();

(caporal as any).parse(process.argv);
