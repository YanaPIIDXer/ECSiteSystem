<template>
    <div>
        <h1>商品追加</h1>
        <hr />
        <label class="form-label">商品名</label>
        <input type="text" class="form-control" v-model="name" />
        <label class="form-label">値段</label>
        <input type="number" class="form-control" v-model="price" />
        <label class="form-label">画像URL</label>
        <input type="text" class="form-control" v-model="imageUrl" />
        <label class="form-label">商品概要</label>
        <textarea class="form-control" v-model="description"></textarea>
        <button class="btn btn-primary" @click="add">追加</button>
    </div>
</template>

<script>
import { post } from '../modules/APIConnection';

export default {
    name: "AddProduct",
    data: function () {
        return {
            name: "",
            price: 0,
            imageUrl: "",
            description: "",
        };
    },
    methods: {
        add: async function () {
            if (!confirm("追加しますか？")) { return; }

            var params = new URLSearchParams();
            params.append("name", this.name);
            params.append("price", this.price);
            params.append("imageUrl", this.imageUrl);
            params.append("description", this.description);
            const res = await post("/admin/product/add", params);
            if (res.status != 200) {
                alert("追加に失敗しました");
                return;
            }

            if (!res.json.result) {
                alert(res.json.errorMessage);
                return;
            }

            alert("追加しました");
            this.$router.push("/admin");
        }
    }
}
</script>
