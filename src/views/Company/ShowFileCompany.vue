<template>
    <!-- <div v-if="loading" class="box">
        <div class="loading">
            <span class="circle"></span>
            <span class="circle"></span>
            <span class="circle"></span>
            <span class="circle"></span>
        </div>
    </div> -->

    <div>
        <div class="form-group" v-if="Companys">
            <label for="file" class="d-flex justify-content-center mb-3">เอกสารแนบของคุณ</label>
            <div v-if="Companys.fileStatus === true">
                <a :href="url" class="d-flex justify-center btn edit-btn mb-4" id="myimg"
                    target="blank">เอกสารแนบ</a>
            </div>
            <div class="d-flex" v-if="Companys.fileStatus !== true">
                <router-link :to="{path: `/CreateFileCompany/${this.companyDataId}`}"
                    class="mx-auto justify-content-center text-decoration-none btn btn-primary">
                    เพิ่มเอกสารแนบ
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
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
        data() {
            return {
                loading: true,
                companyDataId: null,
                listRef: null,
                url: null,
                itemsName: null,
                Companys: null,
                downloadName: null
            };
        },
        methods: {
    //           getUserData() {
    //     this.userProfile.firstName = sessionStorage.getItem("userFirstName");
    //     this.userProfile.lastName = sessionStorage.getItem("userLastName");
    //     this.userProfile.email = sessionStorage.getItem("userEmail");
    //     this.userProfile.roles = sessionStorage.getItem("userRole");
    //   },
            getfile() {
                const storage = getStorage();
                const listRef = ref(storage, `companyFiles/${this.companyDataId}/`);
                this.listRef = listRef;
                listAll(listRef)
                    .then((res) => {
                        res.prefixes.forEach((folderRef) => {
                            this.itemsFloder = folderRef;
                        });
                        res.items.forEach((itemRef) => {
                            this.downloadName = itemRef.name;
                        });
                    }).catch((error) => {
                        alert(error.message);
                    });
            },
            async getDownloadFile() {
                let companyRef = doc(companyCollection, this.companyDataId);
                this.companyDoc = companyRef;
                let company = await getDoc(this.companyDoc);
                let companyData = company.data();
                this.Companys = companyData;
                const storage = getStorage();
                getDownloadURL(ref(storage, `companyFiles/${this.companyDataId}/${companyData.fileName}`))
                    .then((url) => {
                        this.url = url;
                        console.log(url);
                        const img = document.getElementById("myimg");
                        img.setAttribute("src", url);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            // settimeOut() {
            //     setTimeout(() => {
            //         this.loading = false;
            //     }, "1000")
            // }
        },
        created() {
            let companyDataId = this.$route.params.companyDataId;
            this.companyDataId = companyDataId;
            // this.getUserData();
            this.getfile();
            this.getDownloadFile();
            // this.settimeOut();
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

    .edit-btn {
        width: 11rem;
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
        width: 11rem;
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