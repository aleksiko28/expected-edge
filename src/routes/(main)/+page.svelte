<script lang="ts">
  import {
    WebsiteName,
    WebsiteBaseUrl,
    WebsiteDescription,
  } from "./../../config"

  const ldJson = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: WebsiteName,
    url: WebsiteBaseUrl,
  }
  const jsonldScript = `<script type="application/ld+json">${
    JSON.stringify(ldJson) + "<"
  }/script>`
</script>

<svelte:head>
  <title>{WebsiteName}</title>
  <meta name="description" content={WebsiteDescription} />
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html jsonldScript}
</svelte:head>

<div class="hero min-h-[60vh] p-8">
  <div class="container mx-auto flex flex-col items-center justify-center">
    <h1 class="text-4xl font-bold text-center">
      Welcome to {WebsiteName}
    </h1>
    <p class="text-lg text-center mt-4">
      {WebsiteDescription}
    </p>
  </div>
</div>
