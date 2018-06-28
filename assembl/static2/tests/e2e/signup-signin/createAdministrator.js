/* eslint-disable */
const data = require('../../../../../configs/bluenove-server-configs/dev-assembl.config.json');
const { exec } = require('child_process');
// prettier-ignore
exec(
  `cd ../../../../../ source venv/bin/activate && assembl-add-user --email ${data.email} --name ${data.name} --username ${data.username} --password ${data.password} --role "r:administrator" local.ini`,
  (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      console.log(err);
      console.log(data.email);
      return;
    }

    // the *entire* stdout and stderr (buffered)
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  }
);
