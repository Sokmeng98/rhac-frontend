<template>
	<vue-date-picker :enable-time-picker="false" :format="formatForUser" />
</template>

<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { formatForUser } from '~~/util/format-timestamp'
</script>
