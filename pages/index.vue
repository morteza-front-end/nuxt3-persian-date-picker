<template>
	<div class="w-1/2 mx-auto">
		<ClientOnly>
            <Form
			:initial-values="{dateOfBirth:'',firstName:''}"
			:validation-schema="schema"
		     @submit="()=>alert('test')">
			<base-date-picker v-model="dateCh" simple class="mt-" name="dateOfBirth" label="Test" max="2008/05/02" />
			<button data-color="blue" type="submit" class="mt-12"> Submit</button>
		</Form>
        </ClientOnly>
	</div>
</template>
<script setup lang="ts">
import {Form} from 'vee-validate'
import {useSideValidator} from '~/composables/schemaValidate'
const {schema} = useSideValidator()
const dateCh = ref('')
</script>