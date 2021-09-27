<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-3" v-for="item in list" :key="item.id">
                    <div class="card">
                        <img :src="item.imageUrl" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">{{ item.name }}</h5>
                            <p class="card-text">{{ item.description }}</p>
                            <button class="btn btn-primary">カートに入れる</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { get } from '../modules/APIConnection';

export default {
    name: "Top",
    data: function () {
        return {
            list: [],
        };
    },
    mounted: async function () {
        const res = await get("/product/list");
        if (res.status != 200) { return; }
        this.list = res.json;
    }
}
</script>
