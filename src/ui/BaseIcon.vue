<template>
    <div class="svg-wrapper" aria-hidden="true">
        <font-awesome-icon :icon="[prefix, iconName]"></font-awesome-icon>
    </div>
</template>

<script>
import FontAwesomeIcon from '../assets/fonts/fortawesome/fortawesome-icons.js';

export default {
    components: {
        FontAwesomeIcon,
    },
    props: ['prefix', 'iconName']
}
</script>

<style scoped lang="scss">
.svg-wrapper {
    height: 20px;
    width: 20px;

    svg {
        @include size(100%);
        fill: $color-black;
    }
}
</style>