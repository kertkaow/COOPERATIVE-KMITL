<template>
<div v-if="loading">
    <LoadingComponent />
  </div>

  <div v-else class="row justify-content-center">
    <div class="col-md-6 bgbd">
      <!-- Content goes here -->
      <h1 class="d-flex justify-content-center formtitle-1">[ {{ Matchings.firstName }} {{ Matchings.lastName }} ]
        รหัสนักศึกษา : [ {{ Matchings.studentID }} ] บริษัท : [ {{ Matchings.Name}} ] โครงการ : [
        {{ Matchings.projectName }} ]</h1>
      <form @submit.prevent="updateStudent">
        <div class="form-group">

          <!-- รหัสนักศึกษา -->
          <label for="studentID">สถานะปัจจุบัน</label>
          <input type="text" class="form-control" v-model="Matchings.cooperativeStatus.projectStatusNow">
        </div>

        <!-- นามสกุล  -->
        <div class="form-group">
          <label for="projectExamdate">นัดสอบโปรเจค</label>
          <input type="date" class="form-control" v-model="Matchings.cooperativeStatus.projectExamdate">
        </div>

        <!-- Email  -->
        <div class="form-group">
          <label for="projectStatus">สถานะ</label>
          <input type="text" class="form-control" v-model="Matchings.cooperativeStatus.projectStatus">
        </div>


        <!-- แก้ไขข้อมูล -->
        <div class="form-group">
          <button class="btn submit-btn col-12 mt-3">อัพเดตข้อมูล</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import LoadingComponent from "../LoadingComponent.vue"
  import {
    matchingCollection
  } from '@/firebase'
  import {
    usersProfileCollection
  } from '@/firebase';
  import {
    getDoc,
    doc,
    updateDoc
  } from 'firebase/firestore'
  export default {
      components: {
      // ExportComponent,
      LoadingComponent
    },
    data() {
      return {
        loading:true,
        Companys: [],
        matchingDataId: null,
        matchingDoc: null,
        Matchings: {
          thaiName: null,
          projectName: null,
          studentID: null,
          firstName: null,
          lastName: null,
          cooperativeStatus: {
            projectExamdate: null,
            projectStatus: null,
            projectStatusNow: null,
          },
          userProfile: {
            firstName: '',
            lastName: '',
            email: '',
            roles: '',
          },
          userId: ''
        }
      };
    },
    methods: {
      async getUserData() {
        let userId = sessionStorage.getItem("userId");
        let userRef = doc(usersProfileCollection, userId);
        this.userDoc = userRef;
        let userProfile = await getDoc(this.userDoc);
        let userData = userProfile.data();
        sessionStorage.setItem("userFirstName", userData.firstName);
        sessionStorage.setItem("userLastName", userData.lastName);
        sessionStorage.setItem("userEmail", userData.email);
        sessionStorage.setItem("userRole", userData.roles);
        this.userProfile.firstName = sessionStorage.getItem("userFirstName");
        this.userProfile.lastName = sessionStorage.getItem("userLastName");
        this.userProfile.email = sessionStorage.getItem("userEmail");
        this.userProfile.roles = sessionStorage.getItem("userRole");
      },
      async getMatchingData() {
        let matchingRef = doc(matchingCollection, this.matchingDataId);
        this.matchingDoc = matchingRef;
        let matching = await getDoc(this.matchingDoc);
        let matchingData = matching.data();
        this.Matchings.Name = matchingData.companyData.thaiName;
        this.Matchings.projectName = matchingData.companyData.projectName
        this.Matchings.studentID = matchingData.studentData.studentID
        this.Matchings.firstName = matchingData.studentData.firstName;
        this.Matchings.lastName = matchingData.studentData.lastName;
        this.Matchings.cooperativeStatus.projectExamdate = matchingData.cooperativeStatus.projectExamdate;
        this.Matchings.cooperativeStatus.projectStatus = matchingData.cooperativeStatus.projectStatus;
        this.Matchings.cooperativeStatus.projectStatusNow = matchingData.cooperativeStatus.projectStatusNow;
      },
      async updateStudent() {
        await updateDoc(this.matchingDoc, {
          ...this.Matchings,
        });
          this.$toast.success("อัพเดตข้อมูลเรียบร้อยแล้ว", {
        timeout: 2500,
        position:'top-right',
          })
        this.$router.back()

      },
       settimeOut() {
        setTimeout(() => {
          this.loading = false;
        }, 1000)
      },
      checkRole() {
        const userRole = sessionStorage.getItem("userRole")
        if (userRole != "Teacher" && userRole != "Student") {
            this.$toast.error("คุณไม่มีสิทธิ์เข้าถึง", {
        timeout: 2500,
        position:'top-right',
          })
          this.$router.push("/")
        }
      }
    },
    created() {
      let matchingDataId = this.$route.params.matchingDataId;
      this.matchingDataId = matchingDataId;
      this.settimeOut();
      this.getMatchingData();
      this.checkRole();
      this.getUserData();
    }
  }
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }

  /* Body */
  h1 {
    animation: fade 0.3s ease-in-out forwards 0s;
  }

  label,
  input {
    line-height: 28px;
  }

  button {
    border: 1px solid var(--contrast-color);
    border-radius: 50px;
    padding: 8px 12px;
    font-size: 16px;
    text-transform: uppercase;
    position: relative;
    margin-top: 15px;
    outline: none;
    animation: fade 0.3s ease-in-out forwards 0s;
  }

  div.bgbd {
    border-radius: 15px;
    background: white;
    border: 0.3rem solid #FF6E30;
    width: 40rem;
    height: 31rem;
    padding: 3rem;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
    animation: fade 0.3s ease-in-out forwards 0s;
  }

  label {
    margin-top: 0.8rem;
  }

  .submit-btn {
    margin: auto;
    display: block;
    width: 22rem;
    padding: 10px 20px;
    border: 2px solid #FF6E30;
    background: #FF6E30;
    border-radius: 50px;
    color: white;
    font-size: 18px;
    font-weight: 600;
    text-decoration: none;
    transition: 0.3s;
  }

  .submit-btn:hover {
    background: #c04a17;
    border: 2px solid #c04a17;
    color: white;
  }

  .btn-focus {
    background: white;
    color: black;
    border: 2px solid #FF6E30;
    transition: 0.3s;
  }

  .btn-focus:hover {
    background: #FF6E30;
    color: white;
  }

  input:checked~.btn-focus {
    background: #FF6E30;
    color: white;
  }


  .formtitle-1 {
    margin-bottom: 1rem;
    margin-top: -2vh;
    margin-left: 0;
    width: 100%;
    justify-content: center;
    text-align: center;
    background-color: #FF6E30;
    border: 0;
    border-radius: 15px;
    color: #fff;
    display: inline-block;
    font-family: system-ui, -apple-system, system-ui, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif;
    font-size: 18px;
    font-weight: 600;
    outline: 0;
    padding: 16px 21px;
    position: relative;
    text-align: center;
    text-decoration: none;
    transition: all .3s;
    user-select: none;
    -webkit-user-select: none;
  }
 @keyframes fade {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 100;
    }

  }

  /* Animation */
  @keyframes slideIn {
    0% {
      transform: translateX(500px) scale(.2);
    }

    100% {
      transform: translateX(0px) scale(1);
    }
  }

  @keyframes slideUp {
    0% {
      transform: translateY(200px);
    }

    100% {
      transform: translateY(0px);
    }
  }

  @keyframes expand {
    0% {
      transform: translateX(500px);
    }

    100% {
      transform: translateX(0px);
    }
  }

  @keyframes expandForm {
    0% {
      transform: translateX(50px);
    }

    100% {
      transform: translateX(0px);
    }
  }
</style>