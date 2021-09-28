<template>
    <div>
        <h1>カート</h1>
    </div>
</template>

<script>
import { get } from '../modules/APIConnection';

export default {
    name: "CartView",
    mounted: async function () {
        const res = await get("/user/cart");
        console.log(res);
    }
}
</script>
