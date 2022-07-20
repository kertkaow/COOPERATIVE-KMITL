<template>
  <div v-if="loading">
    <LoadingComponent />
  </div>
  <div v-else class="form-group">
    <label for="file">*หมายเหตุ รายละเอียดของโครงการสามารถเป็นเอกสารแนบมาได้
      และในกรณีที่บริษัทนำเสนอโครงการสหกิจเป็นครั้งแรกให้กับภาควิชาวิทยาการคอมพิวเตอร์
      คณะวิทยาศาสตร์ สจล.
      กรุณาแนบเอกสารแนะนำบริษัทของท่านมาในเอกสารแนบด้วย</label>
    <input type="file" class="form-control" @change="uploadFile" />
    <p>{{progress}}%</p>
    <button class="btn btn-success mt-5" @click="onUpload">upload</button>
  </div>
</template>

<script>
  import LoadingComponent from "../LoadingComponent.vue"
  import {
    storage,
    companyCollection
  } from '@/firebase';

  import {
    ref,
    uploadBytesResumable
  } from "firebase/storage";

  import {
    doc,
    updateDoc,
    getDoc,
  } from "firebase/firestore";
  export default {
    components: {
      // ExportComponent,
      LoadingComponent
    },

    data() {
      return {
        loading: true,
        uploadTask: null,
        progress: 0,
        companyDataId: null,

      }
    },
    methods: {
      //อัพโหลดไฟล์
      async uploadFile(e) {
        this.uploadTask = e.target.files[0]
        this.uploadTask = e.target.files[0]
        let companyRef = doc(companyCollection, this.companyDataId);
        this.companyDoc = companyRef
        let company = await getDoc(this.companyDoc);
        let companyData = company.data();
        this.companyData = companyData

      },

      async onUpload() {
        if (this.uploadTask !== null || this.uploadTask !== '') {
            let companyRef = doc(companyCollection, this.companyDataId);
        this.companyDoc = companyRef
        let company = await getDoc(this.companyDoc);
        let companyData = company.data();
        console.log(companyData)
        await updateDoc(companyRef, {
          'fileStatus': true
        });
          const storageRef = ref(storage, `companyFiles/${this.companyDataId}/` + this.uploadTask.name);
          this.uploadTask = uploadBytesResumable(storageRef, this.uploadTask)
          this.uploadTask.on('state_changed', (snapshot) => {
              this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              switch (snapshot.state) {
                case 'paused':
                  break;
                case 'running':
                  break;
              }
              this.$router.push('/showprojectcom');
            },
            (error) => {
              this.$toast.error(error, {
                timeout: 2500,
                position: 'top-right',
              })
            },
            () => {
              (this.uploadTask.snapshot.ref).then((downloadURL) => {
                this.$toast.error('File available at', downloadURL, {
                  timeout: 2500,
                  position: 'top-right',
                })
              });
            }, )

          this.$toast.success("อัพโหลดไฟล์เอกสารแนบเรียบร้อยแล้ว", {
            timeout: 2500,
            position: 'top-right',
          })
        } else {
          this.$toast.error("กรุณาเลือกไฟล์", {
            timeout: 2500,
            position: 'top-right',
          })
        }
      },
      async uploadFileStatus() {
      

      },
      checkRole() {
        const userRole = sessionStorage.getItem("userRole")
        if (userRole != 'Company') {
          this.$toast.error("คุณไม่มีสิทธิ์เข้าถึง", {
            timeout: 2500,
            position: 'top-right',
          })
          this.$router.push("/")
        }
      },
      settimeOut() {
        setTimeout(() => {
          this.loading = false;
        }, "1000")
      },
    },
    created() {
      let companyDataId = this.$route.params.companyDataId;
      this.companyDataId = companyDataId;
      this.settimeOut();
      this.checkRole();
    }
  }
</script>

<style>
  .form-group {
    animation: fade 0.3s ease-in-out forwards 0s;

  }



  @keyframes fade {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 100;
    }

  }
</style>