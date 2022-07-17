<template>
 <div v-if="loading">
    <LoadingComponent />
  </div>
  <!-- When Student never Submit Form  -->
  <div v-else>
  <div v-if="this.checkExist.userId !== this.userId" class="row justify-content-center">
    <div class="col-md-6 bgbd">
      <!-- Content goes here -->
      <h1 class="d-flex justify-content-center formtitle-1">แบบฟอร์มลงทะเบียนสหกิจศึกษา</h1>
      <form @submit.prevent="createStudentData">
        <div class="form-group">

          <!-- รหัสนักศึกษา -->
          <label for="studentID">1.รหัสนักศึกษา</label>
          <input type="text" class="form-control" v-model="Students.studentID">
        </div>

        <!-- ชื่อ  -->
        <div class="form-group">
          <label for="firstName">2.ชื่อ</label>
          <input type="text" class="form-control" v-model="Students.firstName" disabled>
        </div>

        <!-- นามสกุล  -->
        <div class="form-group">
          <label for="lastName">3.นามสกุล</label>
          <input type="text" class="form-control" v-model="Students.lastName" disabled>
        </div>

        <!-- Email  -->
        <div class="form-group">
          <label for="email">4.Email</label>
          <input type="email" class="form-control" v-model="Students.email" disabled>
        </div>

        <!-- เลือกบริษัท -->
        <label for="firstChoice">5.บริษัทที่ 1</label>
        <br>
        <select v-model="this.Companys.firstChoice" @change="onChangeFirstChoice($event)" required>
          <option v-for="company in Companys" :key="company.id" :value="company.id"> {{ company.thaiName }} -
            {{ company.projectName }}</option>
        </select>
        <br>
        <label for="firstChoice">6.บริษัทที่ 2</label> <br>
        <select v-model="this.Companys.secondChoice" @change="onChangeSecondChoice($event)" required>
          <option v-for="company in Companys" :key="company.id" :value="company.id"> {{ company.thaiName }} -
            {{ company.projectName }}</option>
        </select>
        <br>
        <label for="firstChoice">7.บริษัทที่ 3</label> <br>
        <select v-model="this.Companys.thirdChoice" @change="onChangeThirdChoice($event)" required>
          <br>
          <option v-for="company in Companys" :key="company.id" :value="company.id"> {{ company.thaiName }} -
            {{ company.projectName }}</option>
        </select>

        <!--  เกรดเฉลี่ย  -->
        <div class="form-group">
          <label for="gpm">8.เกรดเฉลี่ย</label>
          <input type="text" class="form-control" v-model="Students.gpm" required>
        </div>

        <!-- สถานะ MVC -->
        <label for="mvcStatus" class="check-button">สถานะ MVC</label>
        <div class="form-group buttonfocus">
          <input type="radio" class="btn-check" value="ผ่าน" id="mvcStatus1" v-model="Students.mvcStatus" required>
          <label class="btn Mvc-pass mt-2" for="mvcStatus1">
            ผ่าน
          </label>
        </div>
        <div class="form-group buttonfocus">
          <input type="radio" class="btn-check btn-focus" value="ไม่ผ่าน" id="mvcStatus2" v-model="Students.mvcStatus"
            required>
          <label class="btn Mvc-not-pass mt-2" for="mvcStatus2">
            ไม่ผ่าน
          </label>
        </div>
        <!-- ปุ่มลงทะเบียน -->
        <div class="form-group d-flex justify-content-center submit">
          <button class="btn submit-btn mt-4">ลงทะเบียนสหกิจ</button>
        </div>
      </form>
    </div>
  </div>
  </div>
</template>

<script>
  import LoadingComponent from "../LoadingComponent.vue"
  import {
    studentCollection,
    companyCollection,
    usersProfileCollection
  } from '@/firebase';
  import {
    getDocs,
    query,
    where,
    serverTimestamp,
    getDoc,
    doc,
    setDoc
  } from 'firebase/firestore'
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
        Companys: [],
        Students: {
          firstName: '',
          lastName: '',
          studentID: '',
          email: '',
          gpm: '',
          mvcStatus: '',
          firstChoice: {
            project_Id: '',
            companyNameAndProjectName: '',
            result: '',

          },
          secondChoice: {
            project_Id: '',
            companyNameAndProjectName: '',
            result: '',
          },
          thirdChoice: {
            project_Id: '',
            companyNameAndProjectName: '',
            result: '',
          },
          gotCompany: false
        },
        userId: '',
        workingAt: '',
        gotCompany: false,
        checkStudent: [],
        userDoc: '',
        checkExistDoc: '',
        checkExist: ''
      }
    },
    methods: {

      // get CompanyData in to database Companys //
      async checkStudentData() {
        const userId = sessionStorage.getItem("userId")
        this.userId = userId
        let checkExistRef = doc(studentCollection, userId);
        this.checkExistDoc = checkExistRef;
        let checkExist = await getDoc(this.checkExistDoc);
        let checkExistData = checkExist.data();
        this.checkExist = checkExistData
      },

      async getCompanyData() {
        const getApproveStatus = query(companyCollection, where("approveStatus", "==", true));
        let companySnapShot = await getDocs(getApproveStatus);
        let Companys = [];
        companySnapShot.forEach((company) => {
          let companyData = company.data();
          companyData.id = company.id;
          Companys.push(companyData);
        });
        this.Companys = Companys;
      },

      async getStudentData() {
        const userId = sessionStorage.getItem("userId")
        let userRef = doc(usersProfileCollection, userId);
        this.userDoc = userRef;
        let users = await getDoc(this.userDoc);
        let userData = users.data();
        this.Students.firstName = userData.firstName;
        this.Students.lastName = userData.lastName;
        this.Students.email = userData.email;
        this.Students.studentID = userData.studentID;
      },

      // add StudentData to database //
      async createStudentData() {
        const user = getAuth().currentUser;
        const studentRef = doc(studentCollection, user.uid)
        const addStudentData = await setDoc(studentRef, {
          ...this.Students,
          userId: user.uid,
          StudentSubmitDate: serverTimestamp(),
        });
        console.log(addStudentData)
        alert("ลงทะเบียนสหกิจศึกษาเรียบร้อยแล้ว");
        this.loading = true;
         setTimeout(() => {
                    this.loading = false;
                }, "1000")
        this.$router.push('/MyStudentView');
      },

      // Put Value from option Select field in to Database -- firstChoice //
      onChangeFirstChoice(event) {
        this.Students.firstChoice.project_Id = event.target.value
        var name = event.target.options[event.target.options.selectedIndex].text;
        this.Students.firstChoice.companyNameAndProjectName = name;
      },
      // Put Value from option Select field in to Database -- secondChoice //
      onChangeSecondChoice(event) {
        this.Students.secondChoice.project_Id = event.target.value
        var name = event.target.options[event.target.options.selectedIndex].text;
        this.Students.secondChoice.companyNameAndProjectName = name;
      },
      // Put Value from option Select field in to Database -- thirdChoice //
      onChangeThirdChoice(event) {
        this.Students.thirdChoice.project_Id = event.target.value
        var name = event.target.options[event.target.options.selectedIndex].text;
        this.Students.thirdChoice.companyNameAndProjectName = name;
      },
      userAlreadySubmitForm() {
        if (this.checkExist == "") {
          this.$router.push("/createstudent")

        } else {
          this.$router.push("/MyStudentView")
           setTimeout(() => {
                    this.loading = false;
                }, "1000")
        }
      },
      checkRole() {
        const userRole = sessionStorage.getItem("userRole")
        if (userRole != 'Student') {
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
      this.settimeOut();
      this.getCompanyData();
      this.getStudentData();
      this.checkStudentData();
      this.userAlreadySubmitForm();
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
    width: 9vh;
    height: 4vh;
    border: 2px solid rgb(242, 26, 26);
    transition: 0.3s;
  }

  .Mvc-not-pass:hover {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 9vh;
    height: 4vh;
    border: 3px solid rgb(242, 26, 26);
    background: rgb(242, 26, 26);
    color: white
  }

  input:checked~.Mvc-not-pass {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 9vh;
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
    height: 58rem;
    padding: 3rem;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
    animation: fade 0.3s ease-in-out forwards 0s;

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