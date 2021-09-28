<template>
    <div>
        <h1>カート</h1>
        <hr />
        <div class="container mt-5">
            <div v-for="item in list" :key="item.id">
                <div class="row">
                    <div class="col-3">
                        <img class="item_image" :src="item.imageUrl" />
                    </div>
                    <div class="col-5 mt-5">
                        <p>{{ item.name }}</p>
                        <p>単価：{{ item.price }}</p>
                        <p>小計価格：{{ item.price * item.count }}</p>
                    </div>
                    <div class="col-4 mt-5">
                        <label class="form-label">数量</label>
                        <input type="number" v-model="item.count" class="form-control" />
                        <button @click="update(item)">変更</button>
                    </div>
                </div>
            </div>
        </div>
        <hr />
        <div class="container">
            <div class="row">
                <div class="col-12">
                    合計価格：{{ totalPrice }}
                </div>
                <div class="col-12">
                    <button @click="buy">購入する</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { get, post } from '../modules/APIConnection';

export default {
    name: "CartView",
    data: function () {
        return {
            list: [],
            totalPrice: 0,
        };
    },
    mounted: async function () {
        const res = await get("/user/cart");
        this.list = res.json.products;
        var totalPrice = 0;
        this.list.map(function (item) {
            totalPrice += item.price * item.count;
        });
        this.totalPrice = totalPrice;
    },
    methods: {
        buy: async function () {
            if (!confirm("購入しますか？")) { return; }
            const res = await post("/user/cart/buy", null);
            if (res.status != 200 || !res.json.result) {
                alert("購入に失敗しました");
                return;
            }
            alert("購入しました");
            this.$router.push("/");
        },
        update: async function (item) {
            alert("未実装");
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
