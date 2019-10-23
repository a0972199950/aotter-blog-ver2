<template>
    <section>
        <label>{{ title }}</label>
        <div class="image-inputer mb-3" :style="{ width, height }">
            <img :src="previewImageUrl || imageUrl">
            <div class="middle">
                <button @click="changeImage" class="btn btn-secondary rounded-circle p-3">
                    <font-awesome-icon :icon="['fas', 'camera']" size="lg" />
                </button>
                <input type="file" ref="fileSelector" @change="fileSelected" style="display: none">
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

interface IProp {
    title: string | null
    width: string
    height: string
    imageUrl: string | null
}

interface IData {
    previewImageUrl: string | null
}

@Component
export default class ImageInputer extends Vue {
    @Prop({ type: String, default: null }) 
    readonly title!: IProp["title"]

    @Prop({ type: String, default: "300px" }) 
    readonly width!: IProp["width"]

    @Prop({ type: String, default: "200px" }) 
    readonly height!: IProp["height"]

    @Prop({ type: String, default: null }) 
    readonly imageUrl!: IProp["imageUrl"]

    previewImageUrl: IData["previewImageUrl"] = null

    changeImage(): void {
        const fileSelector = this.$refs.fileSelector;
        if(fileSelector instanceof HTMLElement){
            fileSelector.click();
        }
    }

    fileSelected(e: any): void {
        const image: Blob = e.target.files[0];
        if(!image) return;
        
        if(!image.type.match(/^image\//)) {
            this.$swal.fire("預覽失敗", "請選擇圖片檔案", "error");
            return;
        }

        const previewImageUrl = URL.createObjectURL(image);
        this.previewImageUrl = previewImageUrl;
        this.$emit("fileSelected", image);
    }
}
</script>

<style lang="scss" scoped>
.image-inputer {
    position: relative;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .middle {
        transition: .5s ease;
        opacity: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%)
    }

    &:hover {
        img {
            opacity: 0.3;
        }

        .middle {
            opacity: 1;
        }
    }
}
</style>
