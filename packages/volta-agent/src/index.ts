import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { homedir } from 'node:os'

export interface VoltaConfig {
  node: string
  npm?: string
  yarn?: string
  pnpm?: string
}

export interface InstallOptions {
  version: string
  type: 'node' | 'npm' | 'yarn' | 'pnpm'
}

export class VoltaAgent {
  private voltaHome: string
  private configPath: string

  constructor() {
    this.voltaHome = process.env.VOLTA_HOME || path.join(homedir(), '.volta')
    this.configPath = path.join(this.voltaHome, 'user', 'settings.json')
  }

  /**
   * Get current Node.js version
   */
  getCurrentNodeVersion(): string | null {
    try {
      const version = execSync('node --version', { encoding: 'utf-8' }).trim()
      return version.replace('v', '')
    } catch {
      return null
    }
  }

  /**
   * Get current npm version
   */
  getCurrentNpmVersion(): string | null {
    try {
      return execSync('npm --version', { encoding: 'utf-8' }).trim()
    } catch {
      return null
    }
  }

  /**
   * Get current yarn version
   */
  getCurrentYarnVersion(): string | null {
    try {
      return execSync('yarn --version', { encoding: 'utf-8' }).trim()
    } catch {
      return null
    }
  }

  /**
   * Get current pnpm version
   */
  getCurrentPnpmVersion(): string | null {
    try {
      return execSync('pnpm --version', { encoding: 'utf-8' }).trim()
    } catch {
      return null
    }
  }

  /**
   * Read Volta configuration
   */
  readConfig(): VoltaConfig | null {
    try {
      if (!fs.existsSync(this.configPath)) {
        return null
      }
      const content = fs.readFileSync(this.configPath, 'utf-8')
      const settings = JSON.parse(content)
      return {
        node: settings.node?.version || '',
        npm: settings.npm?.version,
        yarn: settings.yarn?.version,
        pnpm: settings.pnpm?.version,
      }
    } catch {
      return null
    }
  }

  /**
   * Write Volta configuration
   */
  writeConfig(config: VoltaConfig): void {
    const dir = path.dirname(this.configPath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    const settings: Record<string, unknown> = {
      node: { version: config.node },
    }
    if (config.npm) settings.npm = { version: config.npm }
    if (config.yarn) settings.yarn = { version: config.yarn }
    if (config.pnpm) settings.pnpm = { version: config.pnpm }

    fs.writeFileSync(this.configPath, JSON.stringify(settings, null, 2))
  }

  /**
   * Install Node.js version (simulated - would download in real implementation)
   */
  async installNode(version: string): Promise<boolean> {
    console.log(`Installing Node.js v${version}...`)

    // In a real implementation, this would download from nodejs.org
    // For now, we just update the config
    const config = this.readConfig() || { node: '' }
    config.node = version
    this.writeConfig(config)

    console.log(`Node.js v${version} configured successfully`)
    return true
  }

  /**
   * Install npm version
   */
  async installNpm(version: string): Promise<boolean> {
    console.log(`Installing npm v${version}...`)

    const config = this.readConfig() || {
      node: this.getCurrentNodeVersion() || '',
    }
    config.npm = version
    this.writeConfig(config)

    console.log(`npm v${version} configured successfully`)
    return true
  }

  /**
   * Install yarn version
   */
  async installYarn(version: string): Promise<boolean> {
    console.log(`Installing Yarn v${version}...`)

    const config = this.readConfig() || {
      node: this.getCurrentNodeVersion() || '',
    }
    config.yarn = version
    this.writeConfig(config)

    console.log(`Yarn v${version} configured successfully`)
    return true
  }

  /**
   * Install pnpm version
   */
  async installPnpm(version: string): Promise<boolean> {
    console.log(`Installing pnpm v${version}...`)

    const config = this.readConfig() || {
      node: this.getCurrentNodeVersion() || '',
    }
    config.pnpm = version
    this.writeConfig(config)

    console.log(`pnpm v${version} configured successfully`)
    return true
  }

  /**
   * Pin a Node.js version for current project
   */
  pinNodeVersion(version: string, projectPath: string = process.cwd()): void {
    const packageJsonPath = path.join(projectPath, 'package.json')

    if (!fs.existsSync(packageJsonPath)) {
      throw new Error('package.json not found')
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
    packageJson.volta = { node: version }

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
    console.log(`Pinned Node.js v${version} for project`)
  }

  /**
   * Get project's pinned Node.js version
   */
  getPinnedNodeVersion(projectPath: string = process.cwd()): string | null {
    const packageJsonPath = path.join(projectPath, 'package.json')

    if (!fs.existsSync(packageJsonPath)) {
      return null
    }

    try {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
      return packageJson.volta?.node || null
    } catch {
      return null
    }
  }

  /**
   * List available Node.js versions (simulated)
   */
  listAvailableVersions(): string[] {
    // In real implementation, this would fetch from nodejs.org
    return [
      '22.15.0',
      '22.14.0',
      '21.7.3',
      '20.19.0',
      '20.18.3',
      '18.20.8',
      '18.19.1',
    ]
  }

  /**
   * Show current configuration
   */
  showConfig(): void {
    const config = this.readConfig()
    const currentNode = this.getCurrentNodeVersion()
    const currentNpm = this.getCurrentNpmVersion()
    const currentYarn = this.getCurrentYarnVersion()
    const currentPnpm = this.getCurrentPnpmVersion()

    console.log('\n=== Volta Agent Configuration ===\n')

    if (config) {
      console.log(`Configured Node.js: v${config.node}`)
      if (config.npm) console.log(`Configured npm: v${config.npm}`)
      if (config.yarn) console.log(`Configured yarn: v${config.yarn}`)
      if (config.pnpm) console.log(`Configured pnpm: v${config.pnpm}`)
    } else {
      console.log('No Volta configuration found')
    }

    console.log('\n=== Current Runtime Versions ===\n')
    console.log(`Node.js: v${currentNode || 'N/A'}`)
    console.log(`npm: v${currentNpm || 'N/A'}`)
    console.log(`yarn: v${currentYarn || 'N/A'}`)
    console.log(`pnpm: v${currentPnpm || 'N/A'}`)

    const pinnedVersion = this.getPinnedNodeVersion()
    if (pinnedVersion) {
      console.log(`\n=== Project Settings ===\n`)
      console.log(`Pinned Node.js: v${pinnedVersion}`)
    }
  }
}

export default VoltaAgent
