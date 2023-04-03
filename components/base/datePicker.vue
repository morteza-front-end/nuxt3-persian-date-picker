<template>
    <div class="form-control">
        <Vue3PersianDatetimePicker
                ref="datePicker"
                v-model="selectedDate"
                :locale-config="localeConfig"
                locale="ar"
                v-bind="attrs"
                @blur="handleBlur"
                @change="handleChange"
        />

        <div :class="[
				$refs.datePicker?.visible === true ? '!border-blue-44' : '',
				$attrs.disabled ? 'bg-gray-74' : '#fff',
				{ 'border-red-400': !!errorMessage, success: meta.valid}]"
             class="relative cursor-pointer border border-gray-14 bg-white rounded-[30px] p-4 h-[58px]"
             @click="open">
            <slot :value="modelValue" name="value">
                <div :class="{ disabled: $attrs.disabled}" class="group">
                    <label :class="{	active: selectedDate}"
                           :for="name"
                           class="datepicker_label pointer-events-none absolute
                           right-9 transition-all duration-200 text-gray-18">
                        {{ label }}
                    </label>
                    <div :style="{
					               	border: $attrs.disabled ? 'solid 1px transparent !important' : '0 !important',
					            		color: $attrs.disabled ? '#a1a1aa !important' : '#000',
			                          }"
                         class="custom-input text-[18px]"
                         @click="open"
                    >
                        {{ selectedDate ? $moment(selectedDate).format("YYYY-MM-DD") : "" }}
                    </div>
                </div>
            </slot>
        </div>
    </div>

</template>

<script lang="ts" setup>
import Vue3PersianDatetimePicker from "vue3-persian-datetime-picker"
import {useField} from "vee-validate"

interface Props {
    modelValue?: string,
    label: string,
    name: string,
    rules?: string
}

const {$moment} = useNuxtApp()
const selectedDate = ref('')
const emit = defineEmits(["update:modelValue"])
const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    label: '',
    name: '',
    rules: ''
})
const {
    value: inputValue,
    errorMessage,
    handleBlur,
    handleChange,
    meta,
    setValue,
} = useField(props.name, [], {
    initialValue: props.modelValue,
    validateOnValueUpdate: false
})
watchEffect(() => {
    if(!inputValue.value){
        inputValue.value= ''
    }
    let date = JSON.parse(JSON.stringify(unref(inputValue)))
    if(![null,undefined,'Invalid date',''].includes(date)){
        console.log(inputValue.value,'let date')
        emit("update:modelValue", $moment(date).format("YYYY-MM-DD"))
    }
})
watch(
    () => selectedDate.value,
    async (newValue, oldValue) => {
        if (newValue !== oldValue) {
            setValue(newValue)
        }
    }
)
const $attrs = useAttrs()
const attrs = computed(() => {
    return {"display-format": "YYYY-MM-DD", format: "YYYY-MM-DD", ...$attrs}
})
const localeConfig = computed(() => {
    return {
        ar: {
            dow: 6,
            dir: "rtl",
            displayFormat: null,
            lang: {
                label: "التاريخ",
                submit: "موافق",
                cancel: "إلغاء",
                now: "الآن",
                nextMonth: "الشهر الماضي",
                prevMonth: "الشهر القادم",
                year: "السنة",
                month: "الشهر",
                day: "اليوم"
            }
        }
    }
})
const datePicker = ref<any | null>(null)

function open() {
    if (!datePicker) return;
    datePicker.value.visible = true
    let el = document.getElementById("display_for_cool_light_box")
    if (!el) return
    el.classList.add("display-for-cool-light-box")
}

</script>

<style lang="scss">
/* display-for-cool-light-box use in admin.vue*/
.display-for-cool-light-box {
  animation: unset;
  opacity: 1;
  z-index: 99;
  transform: none;
}

.vpd-input-group {
  display: none;
}

.datepicker_label {
  @apply text-sm z-10 absolute right-9 top-1/2 -translate-y-1/2 text-sm transition-all duration-200;
  &.active {
    @apply -top-[2px] text-sm;
    &::before {
      @apply content-[''] bg-white absolute w-[calc(100%+30px)] h-[1px] top-[11px] right-[-15px] z-[-1] transition-all;
    }
  }
}

.disabled {
  input,
  label {
    @apply text-gray-300;
  }
}

//label.datepicker_label {
//	@apply translate-y-[-205%] md:translate-y-[-215%] text-sm;
//	&::before {
//		@apply content-[''] bg-white absolute w-[calc(100%+30px)] h-[1px] top-[12px] right-[-15px] z-[-1] transition-all;
//	}
//}

.vpd-container::v-deep {
  z-index: 10 !important;
}
</style>