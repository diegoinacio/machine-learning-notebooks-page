// ! Requires
import enquirer from "enquirer";
import chalk from "chalk";

// ! Imports
import utils from "./utils.cjs";
import adsense from "./adsense.cjs";
import analytics from "./analytics.cjs";
import metatag from "./metatag.cjs";
import style from "./style.cjs";
import template from "./template.cjs";

// * Get all the notebooks from metadata
import { INDEX } from "../metadata.mjs";
const NOTEBOOKS = utils.index_info(INDEX);

enquirer
  .prompt([
    {
      type: "select",
      name: "option",
      message: "Select option: ",
      choices: ["Do all the processes?", "Do a specific process?"],
    },
  ])
  .then((answers) => {
    switch (answers.option) {
      case "Do all the processes?":
        all_processes();
        break;
      case "Do a specific process?":
        specific_process();
        break;
      default:
        // ! No option selected
        console.log(chalk.bold.red("No option was selected!"));
    }
  });

function all_processes() {
  // ! Execute all the processes
  enquirer
    .prompt([
      {
        type: "multiselect",
        name: "notebooks",
        message: "Select notebooks: ",
        limit: 5,
        choices: ["--all", ...Object.keys(NOTEBOOKS)],
      },
    ])
    .then((answers) => {
      // * Removes
      answers.action = "Remove";
      answers.option = "Style";
      console.log(chalk.bold.yellow("Removing style .."));
      style.style_option(answers, NOTEBOOKS);
      answers.option = "Metatag";
      console.log(chalk.bold.yellow("Removing metatag .."));
      metatag.metatag_option(answers, NOTEBOOKS);
      answers.option = "Analytics";
      console.log(chalk.bold.yellow("Removing analytics .."));
      analytics.analytics_option(answers, NOTEBOOKS);
      answers.option = "AdSense";
      console.log(chalk.bold.yellow("Removing adsense .."));
      adsense.adsense_option(answers, NOTEBOOKS);

      // * Includes
      answers.action = "Include";
      answers.option = "Template";
      console.log(chalk.bold.yellow("Including template .."));
      template.template_option(answers, NOTEBOOKS);
      answers.option = "Style";
      console.log(chalk.bold.yellow("Including style .."));
      style.style_option(answers, NOTEBOOKS);
      answers.option = "Metatag";
      console.log(chalk.bold.yellow("Including metatag .."));
      metatag.metatag_option(answers, NOTEBOOKS, { format: true });
      answers.option = "Analytics";
      console.log(chalk.bold.yellow("Including analytics .."));
      analytics.analytics_option(answers, NOTEBOOKS, { format: true });
      answers.option = "AdSense";
      console.log(chalk.bold.yellow("Including adsense .."));
      adsense.adsense_option(answers, NOTEBOOKS, { format: true });
    });
}

function specific_process() {
  // ! Execute a specific process
  enquirer
    .prompt([
      {
        type: "select",
        name: "option",
        message: "Select option: ",
        choices: ["AdSense", "Analytics", "Metatag", "Style", "Template"],
      },
      {
        type: "select",
        name: "action",
        message: "Select action: ",
        choices: ["Show", "Include", "Remove"],
      },
      {
        type: "multiselect",
        name: "notebooks",
        message: "Select notebooks: ",
        limit: 5,
        choices: ["--all", ...Object.keys(NOTEBOOKS)],
      },
    ])
    .then((answers) => {
      console.log(answers);
      switch (answers.option) {
        case "AdSense":
          // ! AdSense option selected
          adsense.adsense_option(answers, NOTEBOOKS, { format: true });
          break;
        case "Analytics":
          // ! Analytics option selected
          analytics.analytics_option(answers, NOTEBOOKS, { format: true });
          break;
        case "Metatag":
          // ! Metatag option selected
          metatag.metatag_option(answers, NOTEBOOKS, { format: true });
          break;
        case "Style":
          // ! Style option selected
          style.style_option(answers, NOTEBOOKS, { format: true });
          break;
        case "Template":
          // ! Style option selected
          template.template_option(answers, NOTEBOOKS, { format: true });
          break;
        default:
          // ! No option selected
          console.log(chalk.bold.red("No option was selected!"));
      }
    });
}
