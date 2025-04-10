<script>
  import { goto } from '$app/navigation';
  const start = () => goto('/generate');
</script>

<main class="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
  <h1 class="text-5xl font-extrabold text-gray-800 mb-4">Character Backstory Generator</h1>
  <p class="text-xl text-gray-600 mb-6">Inspired by *Heroes of Legend*</p>
  <button
    class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow"
    on:click={start}
  >
    Begin Generation
  </button>
</main>
