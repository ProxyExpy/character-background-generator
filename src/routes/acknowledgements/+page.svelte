<script>
  import { Listgroup, ListgroupItem } from 'flowbite-svelte';
</script>

<main class="max-w-3xl mx-auto p-6 text-gray-800 dark:text-gray-100 space-y-6">
  <h1 class="text-3xl font-bold text-primary-700 dark:text-primary-300">Acknowledgements</h1>

  <section>
    <h2 class="text-xl font-semibold mb-2">BehindTheName</h2>
    <p>
      This site uses given name and surname data courtesy of
      <a href="https://www.behindthename.com/" class="text-primary-600 underline hover:text-primary-700" target="_blank">
        BehindTheName.com
      </a>, a comprehensive and well-curated source for name etymology and usage.
    </p>
  </section>

  <section>
    <h2 class="text-xl font-semibold mb-2">Heroes of Legend</h2>
    <p>
      This project is inspired by the incredible random character generation tables from
      <strong>Heroes of Legend</strong> by <em>Central Casting</em>, originally published by Task Force Games.
      Their books pioneered deep, narrative-rich character creation and remain a beloved tool in tabletop RPG communities.
    </p>
  </section>

  <section>
    <h2 class="text-xl font-semibold mb-4">Open-Source & Tools</h2>
    <Listgroup class="rounded-lg">
      <ListgroupItem>SvelteKit — for building the frontend</ListgroupItem>
      <ListgroupItem>TailwindCSS — for styling</ListgroupItem>
      <ListgroupItem>Flowbite-Svelte — for UI components</ListgroupItem>
      <ListgroupItem>PostgreSQL — for fast, reliable data storage</ListgroupItem>
      <ListgroupItem>Liquibase — for schema versioning and migration management</ListgroupItem>
      <ListgroupItem>Python — for some small utility scripts</ListgroupItem>
    </Listgroup>
  </section>
</main>