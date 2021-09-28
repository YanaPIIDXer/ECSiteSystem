<template>
    <div>
        <h1>カート</h1>
        <div class="container">
            <div v-for="item in list" :key="item.name">
                <div class="row">
                    <div class="col-3">
                        <img class="item_image" :src="item.imageUrl" />
                    </div>
                    <div class="col-5 mt-5">
                        <p>{{ item.name }}</p>
                    </div>
                    <div class="col-4 mt-5">
                        <label class="form-label">数量</label>
                        <input type="number" v-model="item.count" class="form-control" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { get } from '../modules/APIConnection';

export default {
    name: "CartView",
    data: function () {
        return {
            list: [],
        };
    },
    mounted: async function () {
        const res = await get("/user/cart");
        this.list = res.json.products;
    }
}
</script>

<style scoped>
.item_image {
    width: 200px;
    height: 200px;
}
</style>
