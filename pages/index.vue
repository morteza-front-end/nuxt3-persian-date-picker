<template>
    <div class="w-1/2 mx-auto mt-16">
        <ClientOnly>
            <Form :initial-values="{dateOfBirth:''}"
                    :validation-schema="schema"
                    @submit="sendData">
                <base-date-picker simple class="mt-" name="dateOfBirth" label="date of birth" max="2008/05/02"/>
                <button data-color="blue" type="submit"
                        class="bg-green-400 border border-blue-400 rounded-lg px-6 py-2 mt-12"> Submit
                </button>
            </Form>
        </ClientOnly>
    </div>
</template>
<script setup lang="ts">
import {Form} from 'vee-validate'
import {useSideValidator} from '~/composables/schemaValidate'

const {schema} = useSideValidator()

function sendData(data: any) {
    console.log(data)
}

</script>