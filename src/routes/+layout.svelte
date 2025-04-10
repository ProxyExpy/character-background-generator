<script>
  import { page } from '$app/stores';
  import '../app.css';
  $: currentPath = $page.url.pathname;
</script>

<div class="flex min-h-screen bg-gray-100">
  <!-- Sidebar -->
  <aside class="w-64 bg-white shadow-md">
    <div class="p-6 text-xl font-bold border-b">Backstory Tools</div>
    <nav class="flex flex-col p-4 space-y-2">
		<a
			href="/"
			class="px-4 py-2 rounded hover:bg-indigo-100 transition 
			font-medium 
			{currentPath === '/' ? 'bg-indigo-200 text-indigo-900' : 'text-gray-800'}"
		>
			Home
		</a>
		<a
			href="/generate"
			class="px-4 py-2 rounded hover:bg-indigo-100 transition 
			font-medium 
			{currentPath === '/generate' ? 'bg-indigo-200 text-indigo-900' : 'text-gray-800'}"
		>
			Character Generator
		</a>
		<a
			href="/acknowledgements"
			class="px-4 py-2 rounded hover:bg-indigo-100 transition font-medium
			{currentPath === '/acknowledgements' ? 'bg-indigo-200 text-indigo-900' : 'text-gray-800'}"
		>
			Acknowledgements
		</a>
    </nav>
  </aside>

  <!-- Page Content -->
  <main class="flex-1 p-6">
    <slot />
  </main>
</div>
