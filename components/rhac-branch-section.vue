<script setup lang="ts">
import { branches } from '@/util/branches'
</script>

<template>
	<div id="rhac-branch" class="bg-[#E5F6EC]">
		<div class="rhac-branch-container container px-6 py-[30px] lg:py-[74px] lg:px-0">
			<div class="container">
				<div class="mb-8 space-y-3">
					<SectionHeader>{{ $t('rhac_clinic_locations') }}</SectionHeader>
					<p class="italic leading-normal text-center text-gray-700 subtitle">
						{{ $t('rhac_branch_desc') }}
					</p>
				</div>

				<div class="grid gap-5 sm:grid-cols-1 lg:grid-cols-2">
					<div v-for="branch in branches" :key="branch.id" class="h-42 md:h-52 lg:h-56">
						<div class="flex h-full gap-5 p-3 bg-white branch-list-card rounded-xl">
							<NuxtImg
								class="flex-shrink-0 object-cover w-[33%] bg-neutral-100 overflow-hidden rounded-xl"
								:src="branch.image"
								:alt="branch.name_en + ' - ' + branch.name_kh"
								format="webp"
								fit="cover"
								sizes="sm:180px md:280px"
								loading="lazy"
							/>

							<div class="flex flex-col justify-between">
								<div>
									<h3 class="mb-1 text-base font-bold sm:text-lg md:leading-5 lg:mb-2">
										{{ $i18n.locale === 'km' ? branch.name_kh : branch.name_en }}
									</h3>
									<div class="flex items-center gap-1 mb-1 xl:gap-2 lg:mb-2">
										<icon icon="bxs:location-plus" size="18" />
										<p class="flex-1 text-[12px] sm:text-[14px] xl:text-[16px] leading-normal">
											{{ $i18n.locale === 'km' ? branch.location_kh : branch.location_en }}
										</p>
									</div>
									<div class="flex items-center gap-1 xl:gap-2">
										<icon icon="fe:phone" size="18" />
										<div class="flex gap-1 text-xs sm:text-sm lg:text-xs 2xl:text-base">
											<NuxtLink
												:aria-label="`call to ${branch.tel_smart}`"
												:to="`tel:${branch.tel_smart}`"
												class="rounded-md hover:text-primary hover:underline focus:underline lg:gap-3 focus:outline-none focus-visible:ring-1 ring-0 ring-yellow-400 focus-visible:ring-offset-1 ring-offset-0"
											>
												{{ branch.tel_smart }}
											</NuxtLink>
											/
											<NuxtLink
												:aria-label="`call to ${branch.tel_celcard}`"
												:to="`tel:${branch.tel_celcard}`"
												class="rounded-md hover:text-primary hover:underline focus:underline lg:gap-3 focus:outline-none focus-visible:ring-1 ring-0 ring-yellow-400 focus-visible:ring-offset-1 ring-offset-0"
											>
												{{ branch.tel_celcard }}
											</NuxtLink>
											/
											<NuxtLink
												:aria-label="`call to ${branch.tel_metfone}`"
												:to="`tel:${branch.tel_metfone}`"
												class="rounded-md hover:text-primary hover:underline focus:underline lg:gap-3 focus:outline-none focus-visible:ring-1 ring-0 ring-yellow-400 focus-visible:ring-offset-1 ring-offset-0"
											>
												{{ branch.tel_metfone }}
											</NuxtLink>
										</div>
									</div>
								</div>

								<div>
									<NuxtLink
										class="gap-2 mt-2 btn btn-outline sm-mt-0 sm:btn-sm btn-xs focus-visible:bg-yellow-500 focus-visible:ring-2 focus-visible:ring-offset-2 ring-yellow-400 focus:outline-none"
										:to="branch.google_map"
										target="_blank"
									>
										<Icon icon="logos:google-maps" size="16" class="-ml-1" />
										{{ $t('see_map') }}
									</NuxtLink>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
