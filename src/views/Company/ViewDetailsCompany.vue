<template>
   <div v-if="loading">
        <LoadingComponent />
    </div>
  <div v-else class="row justify-content-center">
    <div class="col-md-6 bgbd">
      <!-- แบบ Forms -->
      <h1 class="d-flex justify-content-center formtitle-1">บริษัท : [ {{ Companys.thaiName }} ] โครงการ : [
        {{ Companys.projectName }} ] </h1>
      <form>
        <div class="form-group">
          <label for="thaiName">ชื่อสถานประกอบการ/หน่วยงาน (ภาษาไทย)</label>
          <input type="text" class="form-control" v-model="Companys.thaiName" disabled>
        </div>
        <div class="form-group">
          <label for="engName">ชื่อสถานประกอบการ/หน่วยงาน (ภาษาอังกฤษ)</label>
          <input type="text" class="form-control" v-model="Companys.engName" disabled>
        </div>
        <div class="form-group">
          <label for="address">ที่อยู่</label>
          <input type="text" class="form-control" v-model="Companys.address" disabled>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" class="form-control" v-model="Companys.email" disabled>
        </div>
        <div class="form-group">
          <label for="phone">เบอร์โทรศัพท์</label>
          <input type="text" class="form-control" v-model="Companys.phone" disabled>
        </div>
        <div class="form-group">
          <label for="managerName">ผู้จัดการโครงการ/หัวหน้าหน่วยงาน/ผู้จัดการ (ชื่อ-สกุล)</label>
          <input type="text" class="form-control" v-model="Companys.managerName" disabled>
        </div>
        <div class="form-group">
          <label for="managerPosition">ผู้จัดการโครงการ/หัวหน้าหน่วยงาน/ผู้จัดการ (ตำแหน่ง)</label>
          <input type="text" class="form-control" v-model="Companys.managerPosition" disabled>
        </div>
        <div class="form-group">
          <label for="managerDepartment">ผู้จัดการโครงการ/หัวหน้าหน่วยงาน/ผู้จัดการ (แผนก)</label>
          <input type="text" class="form-control" v-model="Companys.managerDepartment" disabled>
        </div>
        <div class="form-group">
          <label for="managerPhone">ผู้จัดการโครงการ/หัวหน้าหน่วยงาน/ผู้จัดการ (เบอร์โทรศัพท์)</label>
          <input type="text" class="form-control" v-model="Companys.managerPhone" disabled>
        </div>
        <div class="form-group">
          <label for="managerEmail">ผู้จัดการโครงการ/หัวหน้าหน่วยงาน/ผู้จัดการ (Email)</label>
          <input type="text" class="form-control" v-model="Companys.managerEmail" disabled>
        </div>

        <div class="form-group">
          <label for="contact">ช่องทางการติดต่อประสานงาน</label>
          <input type="text" class="form-control" v-model="Companys.contact" disabled>
        </div>

        <div class="form-group">
          <label for="coordinatorDetails">รายละเอียดของผู้ประสานงานของสถานประกอบการ/หน่วยงาน</label>
          <input type="text" class="form-control" v-model="Companys.coordinatorDetails" disabled>
        </div>
        <div class="form-group">
          <label for="projectName">ชื่อโครงการ</label>
          <input type="text" class="form-control" v-model="Companys.projectName" disabled>
        </div>
        <div class="form-group">
          <label for="projectObjective">วัตถุประสงค์ของโครงการ</label>
          <input type="text" class="form-control" v-model="Companys.projectObjective" disabled>
        </div>
        <div class="form-group">
          <label for="projectPeriod">ระยะเวลาของโครงการ</label>
          <input type="text" class="form-control" v-model="Companys.projectPeriod" disabled>
        </div>
        <div class="form-group">
          <label for="studentQuantityRequire">จำนวนนักศึกษาที่ต้องการ</label>
          <input type="number" class="form-control" v-model="Companys.studentQuantityRequire" disabled>
        </div>
        <div class="form-group">
          <label for="projectDescription">ลักษณะงานที่นักศึกษาต้องปฏิบัติและรับผิดชอบ</label>
          <input type="text" class="form-control" v-model="Companys.projectDescription" disabled>
        </div>
        <div class="form-group">
          <label for="projectSkill">เครื่องมือและทักษะที่ต้องใช้ในการทำโครงการ</label>
          <input type="text" class="form-control" v-model="Companys.projectSkill" disabled>
        </div>
        <div class="form-group">
          <label for="projectSalary">เงินเดือนฝึกงาน</label>
          <input type="text" class="form-control" v-model="Companys.projectSalary" disabled>
        </div>
        <div class="form-group">
          <label for="projectMentor">พี่เลี้ยงประจำโครงการ</label>
          <input type="text" class="form-control" v-model="Companys.projectMentor" disabled>
        </div>

        <!-- Check Box สถานที่ทำงาน -->
        <div class="form-group">
          <label for="workLocation">สถานที่ปฏิบัติงาน</label>
          <input type="text" class="form-control" v-model="Companys.workLocation" disabled>
        </div>

        <div class="form-group">
          <label for="projectInformantName">ชื่อผู้ให้ข้อมูลนี้</label>
          <input type="text" class="form-control" v-model="Companys.projectInformantName" disabled>
        </div>
        <div class="form-group">
          <label for="projectInformantPosition">ตำแหน่งผู้ให้ข้อมูลนี้</label>
          <input type="text" class="form-control" v-model="Companys.projectInformantPosition" disabled>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
    import LoadingComponent from "../LoadingComponent.vue"
  import {
    companyCollection
  } from "@/firebase";
  import {
    getDoc,
    doc
  } from "firebase/firestore";
  export default {
      components: {
            // ExportComponent,
            LoadingComponent
        },
    data() {
      return {
        loading:true,
        companyDataId: null,
        companyDoc: null,
        Companys: {
          thaiName: null,
          engName: null,
          address: null,
          email: null,
          phone: null,
          managerName: null,
          managerPosition: null,
          managerDepartment: null,
          managerPhone: null,
          managerEmail: null,
          contact: null,
          coordinatorDetails: null,
          projectName: null,
          projectObjective: null,
          projectPeriod: null,
          studentQuantityRequire: null,
          projectDescription: null,
          projectSkill: null,
          projectSalary: null,
          projectMentor: null,
          workLocation: null,
          projectInformantName: null,
          projectInformantPosition: null,
        }
      };
    },
    methods: {
      async getCompany() {
        let companyRef = doc(companyCollection, this.companyDataId);
        this.companyDoc = companyRef;
        let company = await getDoc(this.companyDoc);
        let companyData = company.data();
        this.Companys.thaiName = companyData.thaiName;
        this.Companys.engName = companyData.engName;
        this.Companys.address = companyData.address;
        this.Companys.email = companyData.email;
        this.Companys.phone = companyData.phone;
        this.Companys.managerName = companyData.managerName;
        this.Companys.managerPosition = companyData.managerPosition;
        this.Companys.managerDepartment = companyData.managerDepartment;
        this.Companys.managerPhone = companyData.managerPhone;
        this.Companys.managerEmail = companyData.managerEmail;
        this.Companys.contact = companyData.contact;
        this.Companys.coordinatorDetails = companyData.coordinatorDetails;
        this.Companys.projectName = companyData.projectName;
        this.Companys.projectObjective = companyData.projectObjective;
        this.Companys.projectPeriod = companyData.projectPeriod;
        this.Companys.studentQuantityRequire = companyData.studentQuantityRequire;
        this.Companys.projectDescription = companyData.projectDescription;
        this.Companys.projectSkill = companyData.projectSkill;
        this.Companys.projectSalary = companyData.projectSalary;
        this.Companys.projectMentor = companyData.projectMentor;
        this.Companys.workLocation = companyData.workLocation;
        this.Companys.projectInformantName = companyData.projectInformantName;
        this.Companys.projectInformantPosition = companyData.projectInformantPosition;
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
      this.getCompany();
    },
  }
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }
  @keyframes fade {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 100;
        }

    }
  /* Body */
  h1 {
    animation: fade 0.3s ease-in-out forwards 0s;
  }

  label,
  input {
    line-height: 28px;
  }

  label {
    margin-top: 0.7rem;
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
    width: 60rem;
    height: 125rem;
    padding: 3rem;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
    animation: fade 0.3s ease-in-out forwards 0s;


  }

  .submit-btn {
    margin: auto;
    display: block;
    width: 75rem;
    padding: 10px 20px;
    border: 2px solid #FF6E30;
    border-radius: 50px;
    color: black;
    font-size: 18px;
    font-weight: 600;
    text-decoration: none;
    transition: .3s ease;
  }

  .submit-btn:hover {
    background: #FF6E30;
    color: white;
  }

  .btn-focus {
    background: white;
    color: black;
    border: 2px solid #FF6E30;
  }

  .btn-focus:hover {
    background: #FF6E30;
    color: white;
  }

  .btn-focus:active,
  .btn-focus:focus {
    background-color: #FF6E30;
    color: white;
  }

  .formtitle-1 {
    margin-bottom: 1rem;
    margin-top: -2vh;
    margin-left: auto;
    margin-right: auto;
    width: 700px;
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