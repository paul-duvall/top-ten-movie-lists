<template>
    <Header />
    <router-view/>
</template>

<script>
import Header from '@/components/App/Header';

export default {
    components: {
      Header
    },
}
</script>
