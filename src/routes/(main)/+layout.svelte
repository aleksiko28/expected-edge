<script>
  import { WebsiteName } from "./../../config"
  import "../../app.css"
</script>

<div class="flex py-4 bg-background text-foreground">
  <div class="flex-1 container mx-auto flex items-center justify-between">
    <a class="text-xl flex gap-3 items-center" href="/">
      <img class="h-10" src="/images/logo.webp" alt={WebsiteName} />
      {WebsiteName}
    </a>
    <nav class="flex gap-8">
      <a class="link link-hover" href="/expected">Expected stats</a>
      <a class="link link-hover" href="/price-changes">Price changes</a>
      <a class="link link-hover" href="/fixtures">Fixtures</a>
    </nav>
  </div>
</div>

<div class="bg-zinc-900 text-slate-100 p-4 md:p-8">
  <slot />
</div>

<!-- Spacer grows so the footer can be at bottom on short pages -->
<div class="flex-grow"></div>
<div class="">
  <div class="border-t max-w-[1000px] mx-auto"></div>
  <footer
    class="footer p-10 gap-x-48 lg:gap-x-64 xl:gap-x-96 place-content-center text-base"
  >
    <nav class="flex flex-col gap-1">
      <span class="font-bold mb-2">Navigation</span>
      <a class="link link-hover mb-1" href="/expected">Expected stats</a>
      <a class="link link-hover my-1" href="/price-changes">Price changes</a>
      <a class="link link-hover my-1" href="/fixtures">Fixtures</a>
    </nav>
  </footer>
</div>
