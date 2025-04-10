<script>
  import { goto } from '$app/navigation';
  let characterName = '';
  let origin = '';
  let family = '';

  async function generate() {
    const response = await fetch('/api/generate', {
      method: 'POST',
      body: JSON.stringify({ characterName, origin, family }),
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();
    localStorage.setItem('generatedCharacter', JSON.stringify(data));
    goto('/generate/result');
  }
</script>

<main class="max-w-2xl mx-auto mt-12 px-4">
  <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">Create Your Character</h2>
  <form class="space-y-6" on:submit|preventDefault={generate}>
    <div>
      <label class="block mb-1 text-gray-700 font-medium">Character Name</label>
      <input
        type="text"
        bind:value={characterName}
        class="w-full p-3 border border-gray-300 rounded shadow-sm focus:ring focus:ring-indigo-200"
      />
    </div>

    <div>
      <label class="block mb-1 text-gray-700 font-medium">Place of Origin</label>
      <input
        type="text"
        bind:value={origin}
        class="w-full p-3 border border-gray-300 rounded shadow-sm focus:ring focus:ring-indigo-200"
      />
    </div>

    <div>
      <label class="block mb-1 text-gray-700 font-medium">Family Background</label>
      <input
        type="text"
        bind:value={family}
        class="w-full p-3 border border-gray-300 rounded shadow-sm focus:ring focus:ring-indigo-200"
      />
    </div>

    <button
      type="submit"
      class="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow"
    >
      Generate Backstory
    </button>
  </form>
</main>
