<template>
    <div>
        <h1>購入履歴</h1>
        <hr />
        <div class="container mt-5">
            <div v-for="item in list" :key="item.id">
                <div class="row">
                    <div class="col-3">
                        <img class="item_image" :src="item.product.imageUrl" />
                    </div>
                    <div class="col-5 mt-5">
                        <p>{{ item.product.name }}</p>
                        <p>単価：{{ item.product.price }}</p>
                        <p>数量：{{ item.count }}</p>
                        <p>合計価格：{{ item.product.price * item.count }}</p>
                    </div>
                    <hr />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { get } from '../modules/APIConnection';

export default {
    name: "UserHistoryView",
    data: function () {
        return {
            list: []
        }
    },
    mounted: async function () {
        const res = await get("/user/history");
        if (res.status != 200) {
            alert("購入履歴の取得に失敗しました。");
            return;
        }
        this.list = res.json.list;
    }
}
</script>

<style scoped>
.item_image {
    width: 200px;
    height: 200px;
}
</style>
