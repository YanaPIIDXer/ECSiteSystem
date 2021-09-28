<template>
    <div>
        <h1>カート</h1>
        <hr />
        <div class="container mt-5">
            <div v-for="item in list" :key="item.name">
                <div class="row">
                    <div class="col-3">
                        <img class="item_image" :src="item.imageUrl" />
                    </div>
                    <div class="col-5 mt-5">
                        <p>{{ item.name }}</p>
                        <p>単価：{{ item.price }}</p>
                    </div>
                    <div class="col-4 mt-5">
                        <label class="form-label">数量</label>
                        <input type="number" v-model="item.count" class="form-control" />
                        <button @click="update(item)">変更</button>
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
    },
    methods: {
        update: async function (item) {
            alert(item.count);
        },
    }
}
</script>

<style scoped>
.item_image {
    width: 200px;
    height: 200px;
}
</style>
