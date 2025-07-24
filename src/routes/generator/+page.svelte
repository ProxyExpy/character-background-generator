<script>
// @ts-nocheck
  import { Button, Listgroup, ListgroupItem, Accordion, AccordionItem } from 'flowbite-svelte';

  let player = null;
  let error = null;
  let loading = true;

  async function generate() {
    try {
      const res = await fetch('/api/generate', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      player = await res.json();
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }

function formatSkillBonuses(bonuses) {
  return bonuses.map(bonus => {
    let rankValue;

    if (typeof bonus.rank === 'number') {
      rankValue = bonus.rank;
    } else if (typeof bonus.rank === 'object' && bonus.rank !== null) {
      rankValue = JSON.stringify(bonus.rank);
    } else {
      rankValue = '0';
    }

    return {
      name: bonus.skill,
      value: rankValue,
      chance: bonus.chance ? `${bonus.chance}%` : '100%'
    };
  });
}
</script>

<main class="max-w-4xl mx-auto mt-12 px-4 space-y-8">
  <!-- Form block -->
  <div class="p-6 bg-white dark:bg-gray-900 shadow rounded-xl">
    <h2 class="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">Generate Your Character</h2>

    <form class="text-center" on:submit|preventDefault={generate}>
      <Button type="submit" color="green" size="lg">
        Generate Backstory
      </Button>
    </form>
  </div>

  {#if !loading && player}
    <div class="p-6 bg-white dark:bg-gray-900 shadow rounded-xl space-y-6">
      <h1 class="text-2xl font-bold text-gray-800 dark:text-white text-center">{player.name}</h1>

      <!-- Gender -->
      <div>
        <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-200">Gender</h3>
        <p>{player.gender.name}</p>
      </div>
    
    <Accordion flush={true} multiple={true}>
      <!-- Race -->
      <AccordionItem title="Race" open>
        {#snippet header()}<h3 class="text-xl font-semibold text-gray-700 dark:text-gray-200">Race</h3>{/snippet}
        <div>
          <p>{player.race.name} ({player.race.type})</p>
          <p class="text-sm text-gray-600 dark:text-gray-300">Attributes: {JSON.stringify(player.race.ability_modifiers)}</p>

          <h4 class="mt-2 font-medium">Traits:</h4>
          <Listgroup>
            {#each player.race.racial_traits as trait}
              <ListgroupItem>
                {trait}
              </ListgroupItem>
            {/each}
          </Listgroup>

          <p class="mt-2">Size: {player.race.size} | Speed: {player.race.base_speed} ft</p>

          <div class="mt-2">
            <span class="italic">Languages:</span><br>
            Automatic: {player.race.languages.automatic.join(', ')}<br>
            Bonus: {player.race.languages.bonus.join(', ')}
          </div>
        </div>
      </AccordionItem>

      <!-- Culture -->
      <AccordionItem title="Culture" open>
        {#snippet header()}<h3 class="text-xl font-semibold text-gray-700 dark:text-gray-200">Culture</h3>{/snippet}
        <div>
          <p>{player.culture.name}</p>
          <p class="text-sm text-gray-600 dark:text-gray-300">
            Native Literacy: {player.culture.native_literacy}%<br>
            Environment: {player.culture.environment.environment}
          </p>

          {#if player.culture.skill_bonuses.length > 0}
            <h4 class="mt-2 font-medium italic">Skill Bonuses</h4>
            <Listgroup>
              {#each formatSkillBonuses(player.culture.skill_bonuses) as skill}
                <ListgroupItem>
                  {skill.name}: {skill.value} — <span class="text-sm text-gray-600">{skill.chance}</span>
                </ListgroupItem>
              {/each}
            </Listgroup>
          {/if}
        </div>
      </AccordionItem>
    
      <!-- Social Status -->
      <AccordionItem title="Social Status" open>
        {#snippet header()}<h3 class="text-xl font-semibold text-gray-700 dark:text-gray-200">Social Status</h3>{/snippet}
        <div>
          <p>{player.socialStatus.name}</p>
          <p class="text-sm text-gray-600 dark:text-gray-300">
            Money Multiplier: {player.socialStatus.money_multiplier}x<br>
            Literacy Modifier: {(player.socialStatus.literacy_modifier * 100).toFixed(0)}%
          </p>

          {#if player.socialStatus.skill_bonuses.length > 0}
            <h4 class="mt-2 font-medium italic">Skill Bonuses</h4>
            <Listgroup>
              {#each formatSkillBonuses(player.socialStatus.skill_bonuses) as skill}
                <ListgroupItem>
                  {skill.name}: {skill.value} — <span class="text-sm text-gray-600">{skill.chance}</span>
                </ListgroupItem>
              {/each}
            </Listgroup>
          {/if}
        </div>
      </AccordionItem>

        <!-- Noble Status (if any) -->
        {#if player.nobleStatus}
          <AccordionItem title="Noble Status" open>
            {#snippet header()}<h3 class="text-xl font-semibold text-gray-700 dark:text-gray-200">Noble Status</h3>{/snippet}
            <div>
              <p>{player.nobleStatus.name}</p>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                Money Multiplier: {player.nobleStatus.money_multiplier}x<br>
                Literacy Modifier: {(player.nobleStatus.literacy_modifier * 100).toFixed(0)}%
              </p>

              {#if player.nobleStatus.skill_bonuses.length > 0}
                <h4 class="mt-2 font-medium italic">Skill Modifiers</h4>
                <Listgroup>
                  {#each formatSkillBonuses(player.nobleStatus.skill_bonuses) as skill}
                    <ListgroupItem>
                      {skill.name}: {skill.value} — <span class="text-sm text-gray-600">{skill.chance}</span>
                    </ListgroupItem>
                  {/each}
                </Listgroup>
              {/if}

              {#if player.nobleStatus.traits.length > 0}
                <h4 class="mt-2 font-medium italic">Traits</h4>
                <Listgroup>
                  {#each player.nobleStatus.traits as trait}
                    <ListgroupItem>
                      {trait.trait}
                    </ListgroupItem>
                  {/each}
                </Listgroup>
              {/if}
            </div>
          </AccordionItem>
        {/if}
      </Accordion>
    </div>
  {:else if !loading && error}
    <p class="text-red-600 text-center">Error: {error}</p>
  {/if}
</main>