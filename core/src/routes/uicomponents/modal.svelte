<script>
	import { globalVisibilityStore } from '../globals/globalstores.js';

	let isOpen;

	$: isOpen = $globalVisibilityStore.default.sectionModal;

	console.log($globalVisibilityStore.default);

	function close() {
		$globalVisibilityStore.update((store) => {
			store.default.sectionModal = false;
			return store;
		});
	}

	let selectedItem;

	$: {
		if (selectedItem) {
			document.querySelectorAll('.highlighted').forEach(item => {
				item.classList.remove('highlighted');
			});
			
			selectedItem.classList.add('highlighted')
		}
	}

	function highlightItem(e) {
		console.log(e)
		selectedItem = e.srcElement
	}
</script>

{#if isOpen}
	<div class="fixed inset-0 flex items-center justify-center z-50">
		<div class="bg-black opacity-50 fixed inset-0" on:click={close} />
		<div class="bg-white rounded-lg p-8 shadow-md relative z-10">
			<img src="/icons/close.svg" class="w-8 h-8 absolute -top-10 -right-7" on:click={close} />
			<div class="w-[80vw] h-[80vh] relative bg-white overflow-y-auto">
				<div class="w-full flex justify-between">
					<div class="flex flex-col basis-[25%] gap-3">
						<div class="flex items-center gap-5 text-xl font-semibold">
							<p class="text-black">Add Section</p>
							<p class="text-gray-400">Add Page</p>
						</div>
						<div class="relative">
							<div class="relative mb-6">
								<div
									class="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none"
								>
									<img src='/icons/frame_inspect.svg' class="w-5 h-5" />
								</div>
								<input
									type="text"
									id="input-group-1"
									class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 p-2"
									placeholder="Search for pre-made section blocks"
								/>
							</div>
						</div>
						<div class="flex flex-col gap-3 text-lg font-medium text-black">
							<p class="text-black">All Sections</p>
							<p class="text-black">Blank</p>
							<p class="text-black">Favourites</p>
							<p class="text-black">Saved</p>
							<p class="text-black">Community</p>
							<p class="text-black">Hero</p>
							<p class="text-black">Headers</p>
							<p class="text-black">Footers</p>
							<p class="text-black">Shop</p>
							<p class="text-black">Features</p>
							<p class="text-black">About</p>
							<p class="text-black">Services</p>
							<p class="text-black">Portfolio</p>
							<p class="text-black">Misc</p>
						</div>
					</div>
					<div class="flex flex-col basis-[65%] gap-3 pt-6">
						<div class="relative font-medium text-black text-lg">
							<p>Single</p>
							<div class="flex items-center gap-10 w-full mt-6 flex-wrap">
								<div class="group" on:click={highlightItem}>
									<div class="w-10 h-24 bg-[#E3E3E3] rounded-lg shadow"></div>
								</div>
								<div class="group flex items-center gap-3" on:click={highlightItem}>
									<div class="w-10 h-24 bg-[#B6B6B6] rounded-lg shadow"></div>
									<div class="w-10 h-24 bg-[#B6B6B6] rounded-lg shadow"></div>
								</div>
								<div class="group flex items-center gap-3" on:click={highlightItem}>
									<div class="w-10 h-24 bg-[#E3E3E3] rounded-lg shadow"></div>
									<div class="w-10 h-24 bg-[#E3E3E3] rounded-lg shadow"></div>
									<div class="w-10 h-24 bg-[#E3E3E3] rounded-lg shadow"></div>
								</div>
								<div class="group flex items-center gap-3" on:click={highlightItem}>
									<div class="w-10 h-24 bg-[#B6B6B6] rounded-lg shadow"></div>
									<div class="w-10 h-24 bg-[#B6B6B6] rounded-lg shadow"></div>
									<div class="w-10 h-24 bg-[#B6B6B6] rounded-lg shadow"></div>
									<div class="w-10 h-24 bg-[#B6B6B6] rounded-lg shadow"></div>
								</div>
								<div class="group flex items-center gap-3" on:click={highlightItem}>
									<div class="w-10 h-24 bg-[#E3E3E3] rounded-lg shadow"></div>
									<div class="w-10 h-24 bg-[#E3E3E3] rounded-lg shadow"></div>
									<div class="w-10 h-24 bg-[#E3E3E3] rounded-lg shadow"></div>
									<div class="w-10 h-24 bg-[#E3E3E3] rounded-lg shadow"></div>
									<div class="w-10 h-24 bg-[#E3E3E3] rounded-lg shadow"></div>
								</div>
								<div class="group flex items-center gap-3" on:click={highlightItem}>
									<div class="w-10 h-24 bg-[#B6B6B6] rounded-lg shadow"></div>
									<div class="w-10 h-24 bg-[#B6B6B6] rounded-lg shadow"></div>
									<div class="w-10 h-24 bg-[#B6B6B6] rounded-lg shadow"></div>
									<div class="w-10 h-24 bg-[#B6B6B6] rounded-lg shadow"></div>
									<div class="w-10 h-24 bg-[#B6B6B6] rounded-lg shadow"></div>
									<div class="w-10 h-24 bg-[#B6B6B6] rounded-lg shadow"></div>
								</div>
							</div>
						</div>
						<hr class="my-10" />
						<div class="relative font-medium text-black text-lg">
							<p>Double</p>
							<div class="flex items-center gap-10 w-full mt-6 flex-wrap">
								<div class="group flex flex-col gap-3" on:click={highlightItem}>
									<div class="w-10 h-10 bg-[#E3E3E3] rounded-lg shadow"></div>
									<div class="w-10 h-10 bg-[#B6B6B6] rounded-lg shadow"></div>
								</div>
								<div class="group flex flex-col gap-3" on:click={highlightItem}>
									<div class="flex items-center gap-3">
										<div class="w-10 h-10 bg-[#E3E3E3] rounded-lg shadow"></div>
										<div class="w-10 h-10 bg-[#E3E3E3] rounded-lg shadow"></div>
									</div>
									<div class="flex items-center gap-3">
										<div class="w-10 h-10 bg-[#B6B6B6] rounded-lg shadow"></div>
										<div class="w-10 h-10 bg-[#B6B6B6] rounded-lg shadow"></div>
									</div>
								</div>
								<div class="group flex flex-col gap-3" on:click={highlightItem}>
									<div class="flex items-center gap-3">
										<div class="w-10 h-10 bg-[#E3E3E3] rounded-lg shadow"></div>
										<div class="w-10 h-10 bg-[#E3E3E3] rounded-lg shadow"></div>
										<div class="w-10 h-10 bg-[#E3E3E3] rounded-lg shadow"></div>
									</div>
									<div class="flex items-center gap-3">
										<div class="w-10 h-10 bg-[#B6B6B6] rounded-lg shadow"></div>
										<div class="w-10 h-10 bg-[#B6B6B6] rounded-lg shadow"></div>
										<div class="w-10 h-10 bg-[#B6B6B6] rounded-lg shadow"></div>
									</div>
								</div>
								<div class="group flex flex-col gap-3" on:click={highlightItem}>
									<div class="flex items-center gap-3">
										<div class="w-10 h-10 bg-[#E3E3E3] rounded-lg shadow"></div>
										<div class="w-10 h-10 bg-[#E3E3E3] rounded-lg shadow"></div>
										<div class="w-10 h-10 bg-[#E3E3E3] rounded-lg shadow"></div>
										<div class="w-10 h-10 bg-[#E3E3E3] rounded-lg shadow"></div>
									</div>
									<div class="flex items-center gap-3">
										<div class="w-10 h-10 bg-[#B6B6B6] rounded-lg shadow"></div>
										<div class="w-10 h-10 bg-[#B6B6B6] rounded-lg shadow"></div>
										<div class="w-10 h-10 bg-[#B6B6B6] rounded-lg shadow"></div>
										<div class="w-10 h-10 bg-[#B6B6B6] rounded-lg shadow"></div>
									</div>
								</div>
								<div class="group flex flex-col gap-3" on:click={highlightItem}>
									<div class="flex items-center gap-3">
										<div class="w-10 h-10 bg-[#E3E3E3] rounded-lg shadow"></div>
										<div class="w-10 h-10 bg-[#E3E3E3] rounded-lg shadow"></div>
										<div class="w-10 h-10 bg-[#E3E3E3] rounded-lg shadow"></div>
										<div class="w-10 h-10 bg-[#E3E3E3] rounded-lg shadow"></div>
										<div class="w-10 h-10 bg-[#E3E3E3] rounded-lg shadow"></div>
									</div>
									<div class="flex items-center gap-3">
										<div class="w-10 h-10 bg-[#B6B6B6] rounded-lg shadow"></div>
										<div class="w-10 h-10 bg-[#B6B6B6] rounded-lg shadow"></div>
										<div class="w-10 h-10 bg-[#B6B6B6] rounded-lg shadow"></div>
										<div class="w-10 h-10 bg-[#B6B6B6] rounded-lg shadow"></div>
										<div class="w-10 h-10 bg-[#B6B6B6] rounded-lg shadow"></div>
									</div>
								</div>
								<div class="group flex flex-col gap-3" on:click={highlightItem}>
									<div class="flex items-center gap-3">
										<div class="w-10 h-10 bg-[#E3E3E3] rounded-lg shadow"></div>
										<div class="w-10 h-10 bg-[#E3E3E3] rounded-lg shadow"></div>
										<div class="w-10 h-10 bg-[#E3E3E3] rounded-lg shadow"></div>
										<div class="w-10 h-10 bg-[#E3E3E3] rounded-lg shadow"></div>
										<div class="w-10 h-10 bg-[#E3E3E3] rounded-lg shadow"></div>
										<div class="w-10 h-10 bg-[#E3E3E3] rounded-lg shadow"></div>
									</div>
									<div class="flex items-center gap-3">
										<div class="w-10 h-10 bg-[#B6B6B6] rounded-lg shadow"></div>
										<div class="w-10 h-10 bg-[#B6B6B6] rounded-lg shadow"></div>
										<div class="w-10 h-10 bg-[#B6B6B6] rounded-lg shadow"></div>
										<div class="w-10 h-10 bg-[#B6B6B6] rounded-lg shadow"></div>
										<div class="w-10 h-10 bg-[#B6B6B6] rounded-lg shadow"></div>
										<div class="w-10 h-10 bg-[#B6B6B6] rounded-lg shadow"></div>
									</div>
								</div>
							</div>
						</div>
						<hr class="my-10" />
						<div class="relative font-medium text-black text-lg">
							<p>Mixed</p>
							<div class="flex items-center gap-10 w-full mt-6 flex-wrap">
								<div class="group flex items-center gap-3" on:click={highlightItem}>
									<div class="w-24 h-24 bg-[#E3E3E3] rounded-lg shadow"></div>
									<div class="flex flex-col gap-3">
										<div class="flex items-center gap-3">
											<div class="w-10 h-10 bg-[#E3E3E3] rounded-lg shadow"></div>
											<div class="w-10 h-10 bg-[#E3E3E3] rounded-lg shadow"></div>
										</div>
										<div class="flex items-center gap-3">
											<div class="w-10 h-10 bg-[#B6B6B6] rounded-lg shadow"></div>
											<div class="w-10 h-10 bg-[#B6B6B6] rounded-lg shadow"></div>
										</div>
									</div>
								</div>
								<div class="group flex items-center gap-3" on:click={highlightItem}>
									<div class="flex flex-col gap-3">
										<div class="flex items-center gap-3">
											<div class="w-[5.7rem] h-10 bg-[#E3E3E3] rounded-lg shadow"></div>
											<div class="w-10 h-10 bg-[#E3E3E3] rounded-lg shadow"></div>
										</div>
										<div class="flex items-center gap-3">
											<div class="w-10 h-10 bg-[#B6B6B6] rounded-lg shadow"></div>
											<div class="w-10 h-10 bg-[#B6B6B6] rounded-lg shadow"></div>
											<div class="w-10 h-10 bg-[#B6B6B6] rounded-lg shadow"></div>
										</div>
									</div>
								</div>
								<div class="group flex items-center gap-3" on:click={highlightItem}>
									<div class="flex flex-col gap-3">
										<div class="flex items-center gap-3">
											<div class="w-[5.7rem] h-10 bg-[#E3E3E3] rounded-lg shadow"></div>
											<div class="w-10 h-10 bg-[#E3E3E3] rounded-lg shadow"></div>
										</div>
										<div class="flex items-center gap-3">
											<div class="w-10 h-10 bg-[#B6B6B6] rounded-lg shadow"></div>
											<div class="w-[5.7rem] h-10 bg-[#B6B6B6] rounded-lg shadow"></div>

										</div>
									</div>
								</div>
								<div class="group flex items-center gap-3" on:click={highlightItem}>
									<div class="flex flex-col gap-3">
										<div class="flex items-center gap-3">
											<div class="w-10 h-10 bg-[#E3E3E3] rounded-lg shadow"></div>
											<div class="w-10 h-10 bg-[#E3E3E3] rounded-lg shadow"></div>
											<div class="w-10 h-10 bg-[#E3E3E3] rounded-lg shadow"></div>
										</div>
										<div class="flex items-center gap-3">
											<div class="w-10 h-10 bg-[#B6B6B6] rounded-lg shadow"></div>
											<div class="w-[5.7rem] h-10 bg-[#B6B6B6] rounded-lg shadow"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<style>
		.highlighted {
			border: 2px solid dodgerblue !important;
			transform: scale(1.05);
		}

		.group {
			padding: 2px;
			transition: .3s ease-in all;
			border: 2px solid transparent;
		}

		.group > * {
			pointer-events: none;
		}
	</style>
{/if}
