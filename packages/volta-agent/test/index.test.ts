import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { tmpdir } from 'node:os'
import { VoltaAgent } from '../src/index.js'

describe('VoltaAgent', () => {
  let volta: VoltaAgent
  let testVoltaHome: string
  let originalVoltaHome: string | undefined

  beforeEach(() => {
    // Create a temporary directory for testing
    testVoltaHome = fs.mkdtempSync(path.join(tmpdir(), 'volta-test-'))
    originalVoltaHome = process.env.VOLTA_HOME
    process.env.VOLTA_HOME = testVoltaHome

    volta = new VoltaAgent()
  })

  afterEach(() => {
    // Cleanup
    if (originalVoltaHome) {
      process.env.VOLTA_HOME = originalVoltaHome
    } else {
      delete process.env.VOLTA_HOME
    }
    fs.rmSync(testVoltaHome, { recursive: true, force: true })
  })

  it('should create VoltaAgent instance', () => {
    expect(volta).toBeInstanceOf(VoltaAgent)
  })

  it('should return null for config when no config exists', () => {
    const config = volta.readConfig()
    expect(config).toBeNull()
  })

  it('should write and read config', () => {
    const testConfig = {
      node: '20.19.0',
      npm: '10.9.0',
      yarn: '4.9.0',
      pnpm: '9.15.0',
    }

    volta.writeConfig(testConfig)
    const readConfig = volta.readConfig()

    expect(readConfig).toEqual(testConfig)
  })

  it('should list available versions', () => {
    const versions = volta.listAvailableVersions()
    expect(versions).toBeInstanceOf(Array)
    expect(versions.length).toBeGreaterThan(0)
  })

  it('should install Node.js version', async () => {
    const result = await volta.installNode('20.19.0')
    expect(result).toBe(true)

    const config = volta.readConfig()
    expect(config?.node).toBe('20.19.0')
  })

  it('should install npm version', async () => {
    await volta.installNode('20.19.0')
    const result = await volta.installNpm('10.9.0')
    expect(result).toBe(true)

    const config = volta.readConfig()
    expect(config?.npm).toBe('10.9.0')
  })

  it('should install yarn version', async () => {
    await volta.installNode('20.19.0')
    const result = await volta.installYarn('4.9.0')
    expect(result).toBe(true)

    const config = volta.readConfig()
    expect(config?.yarn).toBe('4.9.0')
  })

  it('should install pnpm version', async () => {
    await volta.installNode('20.19.0')
    const result = await volta.installPnpm('9.15.0')
    expect(result).toBe(true)

    const config = volta.readConfig()
    expect(config?.pnpm).toBe('9.15.0')
  })

  it('should pin Node.js version for project', async () => {
    // Create a temp project directory
    const projectDir = fs.mkdtempSync(path.join(tmpdir(), 'project-'))
    const packageJsonPath = path.join(projectDir, 'package.json')

    // Create a package.json
    fs.writeFileSync(
      packageJsonPath,
      JSON.stringify({ name: 'test-project' }, null, 2),
    )

    try {
      volta.pinNodeVersion('20.19.0', projectDir)

      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
      expect(packageJson.volta?.node).toBe('20.19.0')
    } finally {
      fs.rmSync(projectDir, { recursive: true, force: true })
    }
  })

  it('should throw error when pinning without package.json', () => {
    const projectDir = fs.mkdtempSync(path.join(tmpdir(), 'project-'))

    try {
      expect(() => volta.pinNodeVersion('20.19.0', projectDir)).toThrow(
        'package.json not found',
      )
    } finally {
      fs.rmSync(projectDir, { recursive: true, force: true })
    }
  })

  it('should get pinned Node.js version', async () => {
    const projectDir = fs.mkdtempSync(path.join(tmpdir(), 'project-'))
    const packageJsonPath = path.join(projectDir, 'package.json')

    fs.writeFileSync(
      packageJsonPath,
      JSON.stringify(
        {
          name: 'test-project',
          volta: { node: '20.19.0' },
        },
        null,
        2,
      ),
    )

    try {
      const version = volta.getPinnedNodeVersion(projectDir)
      expect(version).toBe('20.19.0')
    } finally {
      fs.rmSync(projectDir, { recursive: true, force: true })
    }
  })

  it('should return null for pinned version when not set', () => {
    const projectDir = fs.mkdtempSync(path.join(tmpdir(), 'project-'))
    const packageJsonPath = path.join(projectDir, 'package.json')

    fs.writeFileSync(
      packageJsonPath,
      JSON.stringify({ name: 'test-project' }, null, 2),
    )

    try {
      const version = volta.getPinnedNodeVersion(projectDir)
      expect(version).toBeNull()
    } finally {
      fs.rmSync(projectDir, { recursive: true, force: true })
    }
  })
})
