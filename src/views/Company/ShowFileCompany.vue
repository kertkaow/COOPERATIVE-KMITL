<template>
    <div v-if="loading">
        <LoadingComponent />
    </div>
    <div v-if="loading" class="box">
        <div class="loading">
            <span class="circle"></span>
            <span class="circle"></span>
            <span class="circle"></span>
            <span class="circle"></span>
        </div>
    </div>
    <div v-else class="animation">
        <div class="form-group" v-if="Companys">
            <label for="file" class="d-flex justify-content-center mb-3">เอกสารแนบของคุณ</label>
            <div>
            <div  v-for="(url_item,index) in url" :key="index" >
             <a  :href="url_item" class="d-flex justify-center btn edit-btn mb-4" id="myimg"
                    target="blank">
                    <span> เอกสารที่ {{ index + 1 }}</span></a>
            </div>
               
                    
            </div>
            <div class="d-flex">
                <router-link v-if="user_roles === 'Company'" :to="{path: `/CreateFileCompany/${this.companyDataId}`}"
                    class="mx-auto justify-content-center text-decoration-none btn btn-primary">
                    เพิ่มเอกสารแนบ
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import LoadingComponent from "../LoadingComponent.vue"
    import {
        getStorage,
        ref,
        listAll,
        getDownloadURL
    }
    from "firebase/storage";
    import {
        doc,
        getDoc,
    } from "firebase/firestore";
    import {
        companyCollection
    } from '@/firebase';

    export default {
        components: {
            // ExportComponent,
            LoadingComponent
        },
        data() {
            return {
                loading: true,
                companyDataId: null,
                listRef: null,
                url: [],
                itemsName: null,
                Companys: null,
                downloadName: null,
                url_name:[],
                user_roles:null,
            };
        },
        mounted(){
            this.user_roles = sessionStorage.getItem("userRole")
        },
        methods: {
            getfile() {
                const storage = getStorage();
                const itemRef = ref(storage, `companyFiles/${this.companyDataId}/`);
                this.listRef = itemRef;
                listAll(itemRef)
                    .then((res) => {
                        res.prefixes.forEach((folderRef) => {
                            this.itemsFloder = folderRef;
                        });
                        res.items.forEach((itemRef) => {
                        getDownloadURL(itemRef)
                        .then((url) => {
                        this.url_name.push(itemRef.name);
                        this.url.push(url)
                        const img = document.getElementById("myimg");
                        img.setAttribute("src", url);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                        });
                    }).catch((error) => {
                        alert(error.message);
                    });
            },
            downloadFileAnimation() {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                }, "1000")
            },
            async getDownloadFile() {
                let companyRef = doc(companyCollection, this.companyDataId);
                this.companyDoc = companyRef;
                let company = await getDoc(this.companyDoc);
                let companyData = company.data();
                this.Companys = companyData;

            },
            settimeOut() {
                setTimeout(() => {
                    this.loading = false;
                }, "1000")
            }
        },
        created() {
            let companyDataId = this.$route.params.companyDataId;
            this.companyDataId = companyDataId;
            this.getfile();
            this.getDownloadFile();
            this.settimeOut();
        },
    }
</script>
<style>
    /* .box {
        width: 300px;
        height: 300px;
        background: #FF6E30;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.3);
    }

    .loading {
        height: 15px;
        width: 105px;
        display: flex;
        position: relative;

    }

    .circle {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: #fff;
        animation: move 500ms linear 0ms infinite;
        margin-right: 30px;
    }

    .circle:first-child {
        position: absolute;
        top: 0;
        left: 0;
        animation: grow 500ms linear 0ms infinite;
    }

    .circle:last-child {
        position: absolute;
        top: 0;
        right: 0;
        margin-right: 0;
        animation: grow 500ms linear 0s infinite reverse;
    }

    @keyframes grow {
        from {
            transform: scale(0, 0);
            opacity: 0;
        }

        to {
            transform: scale(1, 1);
            opacity: 1;
        }
    }

    @keyframes move {
        from {
            transform: translateX(0px)
        }

        to {
            transform: translateX(45px)
        }
    } */
    .animation {
        animation: fade 0.3s ease-in-out ;
    }

    @keyframes fade {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 100;
        }

    }

    .edit-btn {
        width: auto;
        justify-content: center;
        margin: 0.07rem;
        text-align: center;
        display: flex;
        margin-right: auto;
        margin-left: auto;
        margin-bottom: 0.3rem;
        background: #FF6E30;
        border: 2px solid #FF6E30;
        color: white;
    }

    .edit-btn:hover {
        width: auto;
        justify-content: center;
        margin: 0.07rem;
        text-align: center;
        display: flex;
        margin-right: auto;
        margin-left: auto;
        margin-bottom: 0.3rem;
        background: #e6571a;
        border: 2px solid #e6571a;
        color: white;
    }
</style>