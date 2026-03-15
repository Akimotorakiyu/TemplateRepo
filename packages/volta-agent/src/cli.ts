#!/usr/bin/env node
import { VoltaAgent } from './index.js'

function printHelp() {
  console.log(`
Volta Agent - A simple Node.js version manager

Usage:
  volta-agent <command> [options]

Commands:
  config              Show current configuration
  install <type> <version>  Install a version (node|npm|yarn|pnpm)
  pin <version>       Pin Node.js version for current project
  list                List available Node.js versions
  help                Show this help message

Examples:
  volta-agent config
  volta-agent install node 20.19.0
  volta-agent install npm 10.9.0
  volta-agent install yarn 4.9.0
  volta-agent install pnpm 9.15.0
  volta-agent pin 20.19.0
  volta-agent list
`)
}

async function main() {
  const args = process.argv.slice(2)
  const command = args[0]
  const volta = new VoltaAgent()

  if (!command || command === 'help') {
    printHelp()
    return
  }

  switch (command) {
    case 'config':
      volta.showConfig()
      break

    case 'install': {
      const type = args[1]
      const version = args[2]

      if (!type || !version) {
        console.error('Error: Please specify type and version')
        console.error(
          'Usage: volta-agent install <node|npm|yarn|pnpm> <version>',
        )
        process.exit(1)
      }

      switch (type.toLowerCase()) {
        case 'node':
          await volta.installNode(version)
          break
        case 'npm':
          await volta.installNpm(version)
          break
        case 'yarn':
          await volta.installYarn(version)
          break
        case 'pnpm':
          await volta.installPnpm(version)
          break
        default:
          console.error(`Error: Unknown type '${type}'`)
          console.error('Supported types: node, npm, yarn, pnpm')
          process.exit(1)
      }
      break
    }

    case 'pin': {
      const version = args[1]
      if (!version) {
        console.error('Error: Please specify Node.js version')
        console.error('Usage: volta-agent pin <version>')
        process.exit(1)
      }
      volta.pinNodeVersion(version)
      break
    }

    case 'list': {
      const versions = volta.listAvailableVersions()
      console.log('\nAvailable Node.js versions:\n')
      versions.forEach((v) => console.log(`  v${v}`))
      console.log()
      break
    }

    default:
      console.error(`Error: Unknown command '${command}'`)
      printHelp()
      process.exit(1)
  }
}

main().catch((err) => {
  console.error('Error:', err.message)
  process.exit(1)
})
