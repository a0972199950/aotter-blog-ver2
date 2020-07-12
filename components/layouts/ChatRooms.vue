<template>
    <section>
        <h2>聊天室</h2>
        <div class="chat-rooms pl-2 scrollbar">
            <div v-for="n in 20" :key="n" class="media px-3 py-2">
                <img src="https://picsum.photos/64/64">
                <div class="media-body">
                    <h5>聊天室名稱</h5>
                    <span class="ellipsis w-100">某某人：我發了聊天室最後一篇訊息</span>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class ChatRooms extends Vue {}
</script>

<style lang="scss" scoped>
.chat-rooms {
    overflow-y: auto;
    height: 90vh;

    .media {
        cursor: pointer;
        border-radius: 3px;
        width: 100%;

        &:hover {
            background: rgba(0, 0, 0, .05);
        }
    }
}
</style>