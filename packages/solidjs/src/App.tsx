import { createSignal, For } from 'solid-js'

function App() {
  const [activeTab, setActiveTab] = createSignal('solidjs')
  const [copiedCommand, setCopiedCommand] = createSignal('')

  const frameworks = [
    {
      id: 'solidjs',
      name: 'SolidJS',
      icon: '⚡',
      color: 'bg-gradient-to-r from-blue-600 to-indigo-600',
    },
    {
      id: 'react',
      name: 'React',
      icon: '⚛️',
      color: 'bg-gradient-to-r from-cyan-500 to-blue-500',
    },
    {
      id: 'node',
      name: 'Node.js',
      icon: '🟢',
      color: 'bg-gradient-to-r from-green-500 to-emerald-600',
    },
  ]

  const commands = [
    {
      id: 'install',
      command: 'pnpm install',
      description: 'Install dependencies',
    },
    {
      id: 'serve-solidjs',
      command: 'pnpm serve-solidjs',
      description: 'Run SolidJS example',
    },
    {
      id: 'serve-react',
      command: 'pnpm serve-react',
      description: 'Run React example',
    },
    { id: 'dev', command: 'pnpm dev', description: 'Run Node.js example' },
    { id: 'build', command: 'pnpm build', description: 'Build for production' },
  ]

  const features = [
    {
      title: 'TypeScript Support',
      description: 'Out of the box TypeScript configuration',
      icon: '📘',
    },
    {
      title: 'Vite Powered',
      description: 'Fast development with Vite and Vite Node',
      icon: '⚡',
    },
    {
      title: 'Monorepo Ready',
      description: 'PNPM workspace support for multiple packages',
      icon: '📦',
    },
    {
      title: 'Easy Deployment',
      description: 'Netlify deployment ready with simple configuration',
      icon: '🚀',
    },
  ]

  const copyToClipboard = async (command: string, id: string) => {
    try {
      await navigator.clipboard.writeText(command)
      setCopiedCommand(id)
      setTimeout(() => setCopiedCommand(''), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div class="container mx-auto px-4 py-8 max-w-6xl">
        <header class="text-center mb-12">
          <div class="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 rounded-full mb-6 shadow-2xl ring-4 ring-white/10 backdrop-blur-sm">
            <span class="text-4xl font-bold text-white">🎬</span>
          </div>
          <h1 class="text-6xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Template Repository
          </h1>
          <p class="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A pnpm template repository with TypeScript, Vite out of box
          </p>
        </header>

        <div class="grid md:grid-cols-2 gap-8 mb-8">
          <div class="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
            <h2 class="text-3xl font-semibold text-white mb-6">
              📋 Quick Commands
            </h2>
            <div class="space-y-3">
              <For each={commands}>
                {(cmd) => (
                  <div class="flex items-center justify-between p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/10">
                    <div>
                      <code class="text-sm font-mono text-gray-100">
                        {cmd.command}
                      </code>
                      <p class="text-xs text-gray-300 mt-1">
                        {cmd.description}
                      </p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(cmd.command, cmd.id)}
                      class="px-4 py-2 text-sm bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      {copiedCommand() === cmd.id ? '✓' : '📋'}
                    </button>
                  </div>
                )}
              </For>
            </div>
          </div>

          <div class="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
            <h2 class="text-3xl font-semibold text-white mb-6">✨ Features</h2>
            <div class="grid grid-cols-2 gap-4">
              <For each={features}>
                {(feature) => (
                  <div class="text-center p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-white/10 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                    <div class="text-4xl mb-3">{feature.icon}</div>
                    <h3 class="font-bold text-white mb-2">{feature.title}</h3>
                    <p class="text-sm text-gray-200">{feature.description}</p>
                  </div>
                )}
              </For>
            </div>
          </div>
        </div>

        <footer class="text-center text-gray-300 pt-8 border-t border-white/10">
          <p class="mb-3 text-lg">
            🚀 Deploy ready for{' '}
            <a
              href="https://netlify.app"
              class="text-blue-400 hover:text-blue-300 underline transition-colors"
            >
              Netlify
            </a>
          </p>
          <p class="text-sm text-gray-400">
            Template Repository - Development Setup
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
