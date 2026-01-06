import { createSignal } from 'solid-js'

function App() {
  const [count, setCount] = createSignal(0)

  return (
    <div class="p-8">
      <h1 class="text-2xl font-bold mb-4">SolidJS Example</h1>
      <div class="space-y-4">
        <p class="text-lg">Count: {count()}</p>
        <button
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setCount(count() + 1)}
        >
          Increment
        </button>
        <button
          class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-2"
          onClick={() => setCount(count() - 1)}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}

export default App
