<template>
 <div v-if="loading">
    <LoadingComponent />
  </div>
  <div v-else class="row justify-content-center">
    <div class="col-md-6 bgbd">
      <!-- Content goes here -->
      <h1 class="d-flex justify-content-center formtitle-1">แก้ไขบริษัทของนักศึกษาชื่อ : [ {{ Students.firstName }}
        {{ Students.lastName }} ] รหัสนักศึกษา : [ {{ Students.studentID }} ]</h1>
      <form @submit.prevent="updateStudent">
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

        <!-- เลือกบริษัท -->
        <label for="firstChoice">บริษัทที่ 1</label>
        <br>
        <select v-model="this.Students.firstChoice.companyNameAndProjectName" @change="onChangeFirstChoice($event)">
          <option disabled selected hidden>{{ this.Students.firstChoice.companyNameAndProjectName }}</option>
          <option v-for="company in Companys" :key="company.id" :value="company.id"> {{ company.thaiName }} -
            {{ company.projectName }}</option>
        </select>
        <br>
        <label for="firstChoice">บริษัทที่ 2</label> <br>
        <select v-model="this.Students.secondChoice.companyNameAndProjectName" @change="onChangeSecondChoice($event)">
          <option disabled selected hidden>{{ this.Students.secondChoice.companyNameAndProjectName }}</option>
          <option v-for="company in Companys" :key="company.id" :value="company.id"> {{ company.thaiName }} -
            {{ company.projectName }}</option>
        </select>
        <br>
        <label for="firstChoice">บริษัทที่ 3</label> <br>
        <select v-model="this.Students.thirdChoice.companyNameAndProjectName" @change="onChangeThirdChoice($event)">
          <br>
          <option disabled selected hidden>{{ this.Students.thirdChoice.companyNameAndProjectName }}</option>
          <option v-for="company in Companys" :key="company.id" :value="company.id"> {{ company.thaiName }} -
            {{ company.projectName }}</option>
        </select>

        <!--  เกรดเฉลี่ย  -->
        <div class="form-group">
          <label for="gpm">เกรดเฉลี่ย</label>
          <input type="text" class="form-control" v-model="Students.gpm" disabled>
        </div>

        <!-- สถานะ MVC -->
        <label for="mvcStatus" class="">สถานะ MVC</label>
        <div class="form-group">
          <input type="radio" class="btn-check" value="ผ่าน" id="option1" v-model="Students.mvcStatus" disabled>
          <label class="btn btn-success mt-2" for="option1">
            ผ่าน
          </label>
        </div>
        <div class="form-group">
          <input type="radio" class="btn-check" value="ไม่ผ่าน" id="option2" v-model="Students.mvcStatus" disabled>
          <label class="btn btn-danger mt-2" for="option2">
            ไม่ผ่าน
          </label>

          <!-- ปุ่มลงทะเบียน -->
          <div class="form-group">
            <button class="btn submit-btn col-12 mt-3">ยืนยัน</button>
          </div>
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
    doc,
    serverTimestamp,
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
      async updateStudent() {
        await updateDoc(this.studentDoc, {
          ...this.Students,
          SubmitDateTime: serverTimestamp()
        });
        alert(
          `อัพเดตข้อมูลเรียบร้อยแล้ว`
        );
        this.$router.push("/AdminStudent");
      },
     
      // get Companydata in to database Companys //
      async getCompanyData() {
        const getApproveStatus = query(companyCollection, where("companyLevel", ">=", "3"));
        let companySnapShot = await getDocs(getApproveStatus);
        let Companys = [];
        companySnapShot.forEach((company) => {
          let companyData = company.data();
          companyData.id = company.id;
          Companys.push(companyData);
        });
        this.Companys = Companys;

      },
      // Put Value from option Select field in to Database -- firstChoice //
      onChangeFirstChoice(event) {
        this.Students.firstChoice.companyId = event.target.value;
        var name = event.target.options[event.target.options.selectedIndex].text;
        this.Students.firstChoice.companyNameAndProjectName = name;

      },
      // Put Value from option Select field in to Database -- secondChoice //
      onChangeSecondChoice(event) {
        this.Students.secondChoice.companyId = event.target.value
        var name = event.target.options[event.target.options.selectedIndex].text;
        this.Students.secondChoice.companyNameAndProjectName = name;


      },
      // Put Value from option Select field in to Database -- thirdChoice //
      onChangeThirdChoice(event) {
        this.Students.thirdChoice.companyId = event.target.value
        var name = event.target.options[event.target.options.selectedIndex].text;
        this.Students.thirdChoice.companyNameAndProjectName = name;


      },
      checkRole() {
        const userRole = sessionStorage.getItem("userRole")
        if (userRole != 'Teacher') {
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
      let studentDataId = this.$route.params.studentDataId;
      this.studentDataId = studentDataId;
      this.settimeOut();
      this.getCompanyData();
      this.getStudentData();
      this.checkRole();

    }
  }
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }

  select {
    width: 15rem;
    height: 1.8rem;
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    border-radius: 0.3rem;
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
    margin-top: 0.7vh;
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

  .Mvc-pass {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 8vh;
    height: 4vh;
    border: 2px solid rgb(22, 184, 22);
    transition: 0.3s;
  }

  .Mvc-pass:hover {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 8vh;
    height: 4vh;
    border: 3px solid rgb(22, 184, 22);
    background: rgb(22, 184, 22);
    color: white
  }

  input:checked~.Mvc-pass {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 8vh;
    height: 4vh;
    border: 3px solid rgb(22, 184, 22);
    background: rgb(22, 184, 22);
    color: white
  }

  .Mvc-not-pass {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 8vh;
    height: 4vh;
    border: 2px solid rgb(242, 26, 26);
    transition: 0.3s;
  }

  .Mvc-not-pass:hover {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 8vh;
    height: 4vh;
    border: 3px solid rgb(242, 26, 26);
    background: rgb(242, 26, 26);
    color: white
  }

  input:checked~.Mvc-not-pass {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 8vh;
    height: 4vh;
    border: 3px solid rgb(242, 26, 26);
    background: rgb(242, 26, 26);
    color: white
  }

  .submit {
    display: flex;
  }

  .submit-btn {
    margin: auto;
    display: block;
    width: 15rem;
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

  div.bgbd {
    border-radius: 15px;
    background: white;
    border: 0.3rem solid #FF6E30;
    width: 50rem;
    height: 58.5rem;
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
   @keyframes fade {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 100;
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