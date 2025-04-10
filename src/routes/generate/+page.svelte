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
  <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">Generate Your Character</h2>
  <form class="space-y-6" on:submit|preventDefault={generate}>
    <button
      type="submit"
      class="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow"
    >
      Generate Backstory
    </button>
  </form>
</main>
