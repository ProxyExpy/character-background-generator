<script lang="ts">
  import '../app.css';
  import { page } from '$app/stores';
  import { Sidebar, SidebarGroup, SidebarItem } from 'flowbite-svelte';
  import {
    HomeSolid,
    BarsOutline,
    InfoCircleOutline
  } from 'flowbite-svelte-icons';

  // Path-aware reactive highlight
  $: currentPath = $page.url.pathname;

  // Icon mapping

  const navItems = [
    { name: 'Home', href: '/', icon: HomeSolid },
    { name: 'Character Generator', href: '/generator', icon: BarsOutline },
    { name: 'Acknowledgements', href: '/acknowledgements', icon: InfoCircleOutline }
  ];
</script>

<div class="flex min-h-screen bg-gray-50 dark:bg-gray-900">
  <Sidebar
    class="relative w-64 h-screen border-r border-gray-200 dark:border-gray-700"
    activeClass="bg-indigo-100 text-indigo-900 dark:bg-indigo-700 dark:text-white font-semibold"
    nonActiveClass="text-gray-800 dark:text-gray-300"
  >
    <SidebarGroup>
      {#each navItems as item}
        <SidebarItem href={item.href} label={item.name} active={currentPath === item.href}>
          {#snippet icon()}
            <svelte:component this={item.icon} class="text-gray-500 dark:text-gray-400" />
          {/snippet}
        </SidebarItem>
      {/each}
    </SidebarGroup>
  </Sidebar>

  <main class="flex-1 p-6">
    <slot />
  </main>
</div>
