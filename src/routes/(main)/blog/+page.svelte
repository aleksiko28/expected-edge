<script lang="ts">
	import { sortedBlogPosts, blogInfo } from './posts';
	import * as Card from '$lib/components/ui/card';
</script>

<svelte:head>
	<title>{blogInfo.name}</title>
	<meta name="description" content="Our blog posts." />
</svelte:head>

<div class="py-8 lg:py-12 px-6 w-fit mx-auto">
	<div
		class="text-3xl lg:text-5xl font-medium text-primary flex gap-3 items-baseline text-center place-content-center"
	>
		<div
			class="text-center leading-relaxed font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
		>
			{blogInfo.name}
		</div>
		<a href="/blog/rss.xml" target="_blank" rel="noreferrer">
			<img class="flex-none w-5 h-5 object-contain" src="/images/rss.svg" alt="rss feed" />
		</a>
	</div>

	<div class="flex flex-col gap-4">
		{#each sortedBlogPosts as post}
			<a href={post.link}>
				<Card.Root>
					<Card.Header>
						<Card.Title>{post.title}</Card.Title>
						<Card.Description
							>{post.parsedDate?.toLocaleDateString('en-US', {
								month: 'short',
								day: 'numeric',
								year: 'numeric'
							})}</Card.Description
						>
					</Card.Header>
					<Card.Content>
						<p>{post.description}</p>
					</Card.Content>
				</Card.Root>
			</a>
		{/each}
	</div>
</div>
