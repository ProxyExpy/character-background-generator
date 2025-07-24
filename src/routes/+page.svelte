<script>
  import { goto } from '$app/navigation';
  import { Button } from 'flowbite-svelte';

  const start = () => goto('/generator');
</script>

<main class="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-center px-4">
  <h1 class="text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-4">
    Character Backstory Generator
  </h1>

  <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
    Inspired by <em>Heroes of Legend</em>
  </p>

  <Button
    size="xl"
    color="blue"
    class="rounded-lg shadow"
    onclick={start}
  >
    Begin Generation
  </Button>
</main>