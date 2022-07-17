<template>
 <div v-if="loading">
    <LoadingComponent />
  </div>
  <div v-else  class="form-group">
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
        loading:true,
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
        console.log(companyData)
        await updateDoc(companyRef, {
          'fileName': this.uploadTask.name
        });
      },
      onUpload() {
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
            this.uploadFileStatus()
            alert("อัพโหลดไฟล์เรียบร้อย")
            this.$router.push('/showprojectcom');
          },
          (error) => {
            console.log(error)
          },
          () => {
            (this.uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
            });
          }, )
      },
      async uploadFileStatus() {
        let companyRef = doc(companyCollection, this.companyDataId);
        this.companyDoc = companyRef
        let company = await getDoc(this.companyDoc);
        let companyData = company.data();
        console.log(companyData)
        await updateDoc(companyRef, {
          'fileStatus': true,
        });
      },
      checkRole() {
        const userRole = sessionStorage.getItem("userRole")
        if (userRole != 'Company') {
          alert("คุณไม่มีสิทธิ์เข้าถึง")
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