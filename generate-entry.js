const inquirer = require("inquirer")
const fs = require("fs")
const path = require("path")

const entryNames = fs
  .readdirSync("./src/entries", { withFileTypes: true })
  .filter((file) => file.isDirectory())
  .map((file) => file.name)

const logger = {
  error(...message) {
    console.error("\x1b[31m%s\x1b[0m", ...message)
  },
  success(...message) {
    console.log("\x1b[32m%s\x1b[0m", ...message)
  },
}

const questions = [
  {
    type: "input",
    name: "title",
    message: "Title of your work",
    validate(value) {
      if (value.length <= 255) {
        return true
      }

      return "Your title must be less than 255 characters"
    },
  },
  {
    type: "input",
    name: "slug",
    message: "Your entry folder name (PascalCase)",
    validate(value) {
      if (value.length > 64) {
        return "Component name must not exceed 64 characters"
      }

      if (!value.match(/^[A-Z][a-z]+(?:[A-Z][a-z]+)*$/)) {
        return "Component name must be in PascalCase"
      }

      if (entryNames.find((name) => name === value)) {
        return "Component name already used. Open src/entries to view all used component names."
      }

      return true
    },
  },
  {
    type: "input",
    name: "description",
    message: "Describe what you're making (optional)",
    validate(value) {
      if (value.length <= 516) {
        return true
      }

      return "Your description must be less than 516 characters"
    },
  },
  {
    type: "input",
    name: "author",
    message: "Author (you can use any alias if you want)",
    validate(value) {
      if (value) {
        return true
      }

      return "Author must not be empty."
    },
  },
  {
    type: "input",
    name: "email",
    message: "Your email address (optional)",
    validate(value) {
      const pass =
        !value ||
        value.match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )

      if (pass) {
        return true
      }

      return "Please enter a valid email address"
    },
  },
  {
    type: "input",
    name: "linkedIn",
    message: "Your LinkedIn profile (optional)",
  },
  {
    type: "input",
    name: "website",
    message: "Your website (optional)",
  },
  {
    type: "confirm",
    name: "confirm",
    message: "Is everything correct?",
  },
]

async function main() {
  console.log("Create your entry for the Rehackt Challenge")

  const { confirm, ...answers } = await inquirer.prompt(questions)

  console.log("\nCreating folder and component...")

  const entriesPath = path.resolve(__dirname, "src/entries")
  const componentDirPath = `${entriesPath}/${answers.slug}`

  if (fs.existsSync(componentDirPath)) {
    logger.error(
      `A folder named ${answers.slug} already exists. Kindly choose a new component name or delete the folder with the same name.`
    )
    return
  }

  try {
    fs.promises.mkdir(componentDirPath)
  } catch (error) {
    logger.error("Cannot create directory.", error?.message)
    return
  }

  let templateData = ""
  try {
    const template = await fs.promises.readFile(".component-template")
    const templateBuffer = Buffer.from(template)
    templateData = templateBuffer
      .toString()
      .replace(/SampleEntry/g, answers.slug)
  } catch (error) {
    logger.error(
      "Cannot fetch template data. Make sure that .component-template exists in the root folder.",
      error?.message
    )
    return
  }

  try {
    await fs.promises.writeFile(
      `${componentDirPath}/${answers.slug}.jsx`,
      templateData
    )
  } catch (error) {
    logger.error(`Cannot create file ${answers.slug}.jsx.`, error?.message)
    return
  }

  console.log("Adding your entry...")

  let entriesFileData

  try {
    entriesFileData = await fs.promises.readFile(`${entriesPath}/index.js`)
  } catch (error) {
    logger.error(`Cannot fetch entries/index.js`, error?.message)
    return
  }

  const entriesBuffer = Buffer.from(entriesFileData)
  const regex = /([\s\S]*)(const entries = )([\s\S]*)(export default entries)/gm
  const entriesSubstrings = regex.exec(entriesBuffer)

  const answersString = JSON.stringify(answers, null, 4).replace(
    /("(\\[^]|[^\\"])*"(?!\s*:))|"((\\[^]|[^\\"])*)"(?=\s*:)/g,
    "$1$3"
  )

  const entriesArray = `${entriesSubstrings[3].substring(
    0,
    entriesSubstrings[3].lastIndexOf("]")
  )}  ${answersString.substring(
    0,
    answersString.lastIndexOf("\n}")
  )},\n  },\n]\n\n`

  const newEntriesData = Object.assign([], entriesSubstrings.splice(1), {
    2: entriesArray,
    5: "\n",
  }).join("")

  try {
    await fs.promises.writeFile(
      `${entriesPath}/index.js`,
      newEntriesData,
      (err) => {
        if (err) {
          return console.error(err)
        }
      }
    )
  } catch (error) {
    logger.error("Cannot update entries/index.js", error?.message)
    return
  }

  logger.success("\nEntry created successfully!\n")

  const componentPath = path.resolve(
    __dirname,
    `src/entries/${answers.slug}/${answers.slug}.jsx`
  )

  console.log(
    "You can now edit your component at",
    "\x1b[42m\x1b[30m",
    `${componentPath}`,
    "\x1b[0m"
  )

  console.log(
    "You can update your entry details anytime at",
    "\x1b[44m\x1b[30m",
    `${entriesPath}/index.js`,
    "\x1b[0m"
  )
}

main()
