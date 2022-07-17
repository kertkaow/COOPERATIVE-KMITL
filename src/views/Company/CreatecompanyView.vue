<template>
 <div v-if="loading">
        <LoadingComponent />
    </div>
  <div v-else class="row justify-content-center">
    <div class="col-md-6 bgbd">
      <!-- แบบ Forms -->
      <h1 class="d-flex justify-content-center formtitle-1">แบบฟอร์มเสนอโครงการสหกิจศึกษา</h1>
      <form @submit.prevent="createCompanyData">
        <div class="form-group">
          <label for="thaiName">1.ชื่อสถานประกอบการ/หน่วยงาน (ภาษาไทย)</label>
          <input type="text" class="form-control" v-model="thaiName" required>
        </div>
        <div class="form-group">
          <label for="engName">2.ชื่อสถานประกอบการ/หน่วยงาน (ภาษาอังกฤษ)</label>
          <input type="text" class="form-control" v-model="engName" required>
        </div>
        <div class="form-group">
          <label for="address">3.ที่อยู่</label>
          <input type="text" class="form-control" v-model="address" required>
        </div>
        <div class="form-group">
          <label for="email">4.Email</label>
          <input type="email" class="form-control" v-model="email" required>
        </div>
        <div class="form-group">
          <label for="phone">5.เบอร์โทรศัพท์</label>
          <input type="text" class="form-control" v-model="phone" required>
        </div>
        <div class="form-group">
          <label for="managerName">6.ชื่อผู้จัดการโครงการ/หัวหน้าหน่วยงาน/ผู้จัดการ (ชื่อ-สกุล)</label>
          <input type="text" class="form-control" v-model="managerName" required>
        </div>
        <div class="form-group">
          <label for="managerPosition">7.ผู้จัดการโครงการ/หัวหน้าหน่วยงาน/ผู้จัดการ (ตำแหน่ง)</label>
          <input type="text" class="form-control" v-model="managerPosition" required>
        </div>
        <div class="form-group">
          <label for="managerDepartment">8.ผู้จัดการโครงการ/หัวหน้าหน่วยงาน/ผู้จัดการ (แผนก)</label>
          <input type="text" class="form-control" v-model="managerDepartment" required>
        </div>
        <div class="form-group">
          <label for="managerPhone">9.ผู้จัดการโครงการ/หัวหน้าหน่วยงาน/ผู้จัดการ (เบอร์โทรศัพท์)</label>
          <input type="text" class="form-control" v-model="managerPhone" required>
        </div>
        <div class="form-group">
          <label for="managerEmail">10.ผู้จัดการโครงการ/หัวหน้าหน่วยงาน/ผู้จัดการ (อีเมล)</label>
          <input type="text" class="form-control" v-model="managerEmail" required>
        </div>

        <!-- Check Box ติดต่อประสานงาน -->
        <label for="contact" class="">11.หากมหาวิทยาลัยฯ ประสงค์จะติดต่อประสานงานในรายละเอียดกับสถานประกอบการ/หน่วยงาน
          ขอให้ติดต่อที่ใคร</label>
        <div class="form-group">
          <input type="radio" class="btn-check" value="ติดต่อโดยตรงกับผู้จัดการโครงการ/หัวหน้าหน่วยงาน/ผู้จัดการ"
            id="contact1" v-model="contact" required>
          <label class="btn btn-focus mt-2" for="contact1">
            1.ติดต่อโดยตรงกับผู้จัดการโครงการ/หัวหน้าหน่วยงาน/ผู้จัดการ
          </label>
        </div>
        <div class="form-group">
          <input type="radio" class="btn-check" value="ติดต่อกับบุคคลที่สถานประกอบการ/หน่วยงาน มอบหมายต่อไปนี้"
            id="contact2" v-model="contact" required>
          <label class="btn btn-focus mt-2" for="contact2">
            2.ติดต่อกับบุคคลที่ สถานประกอบการ/หน่วยงาน มอบหมายต่อไปนี้ (หากตอบข้อนี้กรุณาตอบคำถามด้านล่าง)
          </label>
        </div>

        <div class="form-group">
          <label for="coordinatorDetails">11.1 หากข้อที่แล้วตอบข้อ 2
            โปรดใส่รายละเอียดของผู้ประสานงานของสถานประกอบการ/หน่วยงาน ผู้ประสานงานของสถานประกอบการ/หน่วยงาน (ชื่อ-สกุล,
            ตำแหน่ง, แผนก, โทรศัพท์, อีเมล)</label>
          <input type="text" class="form-control" v-model="coordinatorDetails">
        </div>
        <div class="form-group">
          <label for="projectName">12.ชื่อโครงการ</label>
          <input type="text" class="form-control" v-model="projectName" required>
        </div>
        <div class="form-group">
          <label for="projectObjective">13.วัตถุประสงค์ของโครงการ</label>
          <input type="text" class="form-control" v-model="projectObjective" required>
        </div>
        <div class="form-group">
          <label for="projectPeriod">14.ระยะเวลาของโครงการ (ตั้งแต่เดือนไหนถึงเดือนไหน)</label>
          <input type="text" class="form-control" v-model="projectPeriod" required>
        </div>
        <div class="form-group">
          <label for="studentQuantityRequire">15.จำนวนนักศึกษาที่ต้องการ</label>
          <input type="number" class="form-control" v-model="studentQuantityRequire" required>
        </div>
        <div class="form-group">
          <label for="projectDescription">16.ลักษณะงานที่นักศึกษาต้องปฏิบัติและรับผิดชอบ</label>
          <input type="text" class="form-control" v-model="projectDescription" required>
        </div>
        <div class="form-group">
          <label for="projectSkill">17.เครื่องมือและทักษะที่ต้องใช้ในการทำโครงการ</label>
          <input type="text" class="form-control" v-model="projectSkill" required>
        </div>
        <div class="form-group">
          <label for="projectSalary">18.เงินเดือนฝึกงาน</label>
          <input type="text" class="form-control" v-model="projectSalary" required>
        </div>
        <div class="form-group">
          <label for="projectMentor">19.พี่เลี้ยงประจำโครงการ (มีได้มากกว่า 1 คน) โปรดใส่ ชื่อ-สกุล ตำแหน่ง
            เบอร์โทรศัพท์ และอีเมล</label>
          <input type="text" class="form-control" v-model="projectMentor" required>
        </div>

        <!-- Check Box สถานที่ทำงาน -->
        <label for="workLocation" class="check-button">20.สถานที่ปฏิบัติงาน</label>
        <div class="form-group buttonfocus">
          <input type="radio" class="btn-check" value="บริษัท" id="workLocation1" v-model="workLocation" required>
          <label class="btn btn-focus mt-2" for="workLocation1">
            บริษัท
          </label>
        </div>
        <div class="form-group buttonfocus">
          <input type="radio" class="btn-check btn-focus" value="Work From Home" id="workLocation2"
            v-model="workLocation" required>
          <label class="btn btn-focus mt-2" for="workLocation2">
            Work From Home
          </label>
        </div>

        <div class="form-group">
          <label for="projectInformantName">21.ลงชื่อผู้ให้ข้อมูลนี้</label>
          <input type="text" class="form-control" v-model="projectInformantName" required>
        </div>
        <div class="form-group">
          <label for="projectInformantPosition">22.ตำแหน่งผู้ให้ข้อมูลนี้</label>
          <input type="text" class="form-control" v-model="projectInformantPosition" required>
        </div>

        <!-- Submit Button -->
        <div class="form-group d-flex justify-content-center">
          <button class="btn submit-btn mt-5">ลงทะเบียนโครงการสหกิจศึกษา</button>
        </div>


      </form>
    </div>
  </div>
</template>

<script>
    import LoadingComponent from "../LoadingComponent.vue"
  import {
    companyCollection
  } from '@/firebase';
  import {
    addDoc,
    serverTimestamp
  } from '@firebase/firestore';
  import {
    getAuth
  } from '@firebase/auth';

  export default {
      components: {
            // ExportComponent,
            LoadingComponent
        },
    data() {
      return {
        loading:true,
        thaiName: '',
        engName: '',
        address: '',
        email: '',
        phone: '',
        managerName: '',
        managerPosition: '',
        managerDepartment: '',
        managerPhone: '',
        managerEmail: '',
        contact: '',
        coordinatorDetails: '',
        projectName: '',
        projectObjective: '',
        projectPeriod: '',
        studentQuantityRequire: '',
        projectDescription: '',
        projectSkill: '',
        projectSalary: '',
        projectMentor: '',
        workLocation: '',
        projectInformantName: '',
        projectInformantPosition: '',
        projectLevel: '',
        approveStatus: '',
        projectMentorSigned: '',
        projectDirectorSigned: '',
        projectTeacherMentor: {
          userName: '',
          userId: ''
        },
        projectTeacherDirector: {
          userName: '',
          userId: ''
        },
        file:{
          fileStatus:'',
          fileName:''
        }

      }
    },
    methods: {
      async createCompanyData() {
        const auth = getAuth();
        const user = auth.currentUser;
        const addCompanyData = await addDoc(companyCollection, {
          ...
          this.$data,
          CompanySubmitDate: serverTimestamp(),
          userSubmitForm: user.uid
        });
        console.log(addCompanyData);
        alert("ลงทะเบียนสหกิจศึกษาเรียบร้อยแล้ว");
        this.loading = true;
          setTimeout(() => {
                    this.loading = false;
                }, "1000")
        this.$router.push('/showprojectcom');
      },
      checkRole() {
        const userRole = sessionStorage.getItem("userRole")
        if (userRole != 'Company') {
          alert("คุณไม่มีสิทธิ์เข้าถึง")
           setTimeout(() => {
                    this.loading = false;
                }, "1000")
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
      this.settimeOut();
      this.checkRole();
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
    @keyframes fade {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 100;
        }

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
    width: 60rem;
    height: 143rem;
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
    width: 400px;
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