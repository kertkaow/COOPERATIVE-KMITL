<template>
<div v-if="loading">
    <LoadingComponent />
  </div>
  <div v-else class="row justify-content-center">
    <div class="col-md-6 bgbd">
      <!-- Content goes here -->
      <h1 class="d-flex justify-content-center formtitle-1">ชื่อ : [ {{ Students.firstName }} {{ Students.lastName }} ]
        รหัสนักศึกษา : [ {{ Students.studentID }} ] </h1>
      <form>
        <div class="form-group">

          <!-- รหัสนักศึกษา -->
          <label for="studentID">รหัสนักศึกษา</label>
          <input type="text" class="form-control" v-model="Students.studentID" disabled>
        </div>

        <!-- ชื่อ  -->
        <div class="form-group">
          <label for="firstName">ชื่อ</label>
          <input type="text" class="form-control" v-model="Students.firstName" disabled>
        </div>

        <!-- นามสกุล  -->
        <div class="form-group">
          <label for="lastName">นามสกุล</label>
          <input type="text" class="form-control" v-model="Students.lastName" disabled>
        </div>

        <!-- Email  -->
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" class="form-control" v-model="Students.email" disabled>
        </div>

        <!-- บริษัท -->
        <div>
          <label for="firstChoice">บริษัทที่ 1</label>
          <input type="text" class="form-control" v-model="Students.firstChoice.companyNameAndProjectName" disabled>
        </div>
        <div>
          <label for="secondChoice">บริษัทที่ 2</label>
          <input type="text" class="form-control" v-model="Students.secondChoice.companyNameAndProjectName" disabled>
        </div>
        <div>
          <label for="firstChoice">บริษัทที่ 3</label>
          <input type="text" class="form-control" v-model="Students.thirdChoice.companyNameAndProjectName" disabled>
        </div>

        <!--  เกรดเฉลี่ย  -->
        <div class="form-group">
          <label for="gpm">เกรดเฉลี่ย</label>
          <input type="text" class="form-control" v-model="Students.gpm" disabled>
        </div>

        <!-- สถานะ MVC -->
        <div class="form-group">
          <label for="mvcStatus">สถานะ MVC</label>
          <input type="text" class="form-control" v-model="Students.mvcStatus" disabled>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
  import LoadingComponent from "../LoadingComponent.vue"
  import {
    studentCollection,
    companyCollection
  } from '@/firebase';
  import {
    getDoc,
    getDocs,
    query,
    where,
    doc
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
        studentDataId: null,
        studentDoc: null,
        Students: {
          firstName: null,
          lastName: null,
          studentID: null,
          email: null,
          firstChoice: {},
          secondChoice: {},
          thirdChoice: {},
          gpm: null,
          mvcStatus: null,
        }
      };
    },
    methods: {
      async getStudentData() {
        let studentRef = doc(studentCollection, this.studentDataId);
        this.studentDoc = studentRef;
        let student = await getDoc(this.studentDoc);
        let studentData = student.data();
        this.Students.firstName = studentData.firstName;
        this.Students.lastName = studentData.lastName;
        this.Students.studentID = studentData.studentID;
        this.Students.email = studentData.email;
        this.Students.firstChoice = studentData.firstChoice;
        this.Students.secondChoice = studentData.secondChoice;
        this.Students.thirdChoice = studentData.thirdChoice;
        this.Students.gpm = studentData.gpm;
        this.Students.mvcStatus = studentData.mvcStatus;

      },
      // get Companydata in to database Companys //
      async getCompanyData() {
        const getApproveStatus = query(companyCollection, where("projectLevel", ">=", "3"));
        let companySnapShot = await getDocs(getApproveStatus);
        let Companys = [];
        companySnapShot.forEach((company) => {
          let companyData = company.data();
          companyData.id = company.id;
          Companys.push(companyData);
        });
        this.Companys = Companys;

      },
        settimeOut() {
        setTimeout(() => {
          this.loading = false;
        }, 1000)
      }

    },
    created() {
      let studentDataId = this.$route.params.studentDataId;
      this.studentDataId = studentDataId;
      this.settimeOut();
      this.getCompanyData();
      this.getStudentData();

    }
  }
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }

  select {
    width: 15rem;
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    border-radius: 0.4rem;

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
    @keyframes fade {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 100;
    }

  }

  div.bgbd {
    border-radius: 15px;
    background: white;
    border: 0.3rem solid #FF6E30;
    width: 40rem;
    height: 50rem;
    padding: 3rem;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
        animation: fade 0.3s ease-in-out forwards 0s;

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
    border-radius: 10px;
    color: #fff;
    display: inline-block;
    font-family: system-ui, -apple-system, system-ui, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif;
    font-size: 18px;
    font-weight: 600;
    outline: 0;
    padding: 16px 5px;
    position: relative;
    text-align: center;
    text-decoration: none;
    transition: all .3s;
    user-select: none;
    -webkit-user-select: none;
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