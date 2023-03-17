
var devConfig = require("/Users/tomaspour/Code/Unicorn/3. semestr/uun_project_team_repo_BPMI22WDL004/uun_subjectMan_maing01-hi/env/development.json").uu5Environment;
var config = require("/Users/tomaspour/Code/Unicorn/3. semestr/uun_project_team_repo_BPMI22WDL004/uun_subjectMan_maing01-hi/env/production.json").uu5Environment || {};
if (devConfig) for (var k in devConfig) config[k] = devConfig[k];
window.UU5 = { Environment: config };
