<template>
	<div class="container py-8 lg:pb-16 lg:pt-8">
		<div class="grid grid-cols-1 gap-5 rounded-sm sm:grid-cols-2 lg:gap-14">
			<HeroStudyResourceCard
				link="/method-bank/student"
				:title="$t('for_learner')"
				:question="$t('home_resource_link_for_learner_title')"
				brightness="dark"
			/>
			<HeroStudyResourceCard
				link="/method-bank/educator"
				:title="$t('for_educator')"
				:question="$t('home_resource_link_for_educator_title')"
				brightness="light"
			/>
		</div>
	</div>
</template>
