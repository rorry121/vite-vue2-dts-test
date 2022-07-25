<template>
    <article>
        app
    </article>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs, watch } from '@vue/composition-api';

interface Model {
    name: string;
}

export default defineComponent({
    name: 'app',
    props: {
        value: {
            type: String as PropType<string>,
            default: ''
        },
    },
    setup(props, ctx) {
        const model = reactive<Model>({
            name: ''
        });

        watch( () => props.value, () => {

        });

        return {
            ...toRefs(model),
        };
    }
});
</script>
