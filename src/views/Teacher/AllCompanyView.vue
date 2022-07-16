<template>
  <!-- The sidebar -->
  <div class="row">
    <div class="col col-2" style="margin-top:64px;max-width: 220px;">
      <div class="sidebar">
        <a href="/AdminCompany">เเบ่งกลุ่มตามโครงการ/อนุมัติสิทธิ์</a>
        <a class="/active" href="/AllCompanyView"
          style="background:#FF6E30;color:white">เเสดงความประสงค์ที่ปรึกษา/กรรมการนิเทศสหกิจ</a>
        <a href="/AdminStudent">บันทึกผลการสัมภาษณ์</a>
        <a href="/AdminMatching">สหกิจศึกษา</a>
      </div>
    </div>
    <div class="col col-10">
      <!-- Display Student Content -->
      <h1 class="mb-4 formtitle-1">ข้อมูลโครงการสหกิจ</h1>
      <table class="table table-hover">
        <thead class="table table-striped thead-light clm" style="background-color: #FF6E30;">
          <tr>
            <th>รายละเอียด</th>
            <th>ชื่อบริษัท</th>
            <th>สถานที่ทำงาน</th>
            <th>ผู้จัดการโครงการ/หัวหน้า</th>
            <th>ชื่อโครงการ</th>
            <th>ลักษณะงาน</th>
            <th>เครื่องมือที่ต้องใช้</th>
            <th>เเสดงความประสงค์อาจารย์ที่ปรึกษา</th>
            <th>เสดงความประสงค์กรรมการนิเทศสหกิจ</th>
            <th>อาจารย์ที่ปรึกษา</th>
            <th>กรรมการนิเทศสหกิจ</th>
            <th>ข้อมูลเพิ่มเติม</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="company in Companys" :key="company.id">
            <td>
              <router-link :to="{path: `/CompanyDetails/${company.id}`}" class="btn btn-primary">
                ข้อมูลบริษัท
              </router-link>
            </td>
            <td>{{ company.thaiName }}</td>
            <td>{{ company.workLocation }}</td>

            <td>{{ company.managerName }}</td>
            <td>{{ company.projectName }}</td>

            <td>{{ company.projectDescription }}</td>
            <td>{{ company.projectSkill}}</td>
            <td v-if="company.projectTeacherMentor.userName != '' && this.userProfile.roles == 'Teacher' ">
              {{ company.projectTeacherMentor.userName }}
              <button class="btn signed-btn mt-2" @click="addInterestedMentor(company.id)">ลงชื่อสำรอง</button>
            </td>

            <td v-else-if="this.userProfile.roles == 'Teacher'">
              <!-- <button v-if="teacherSigned" @click="removeInterestedMentor(company.id)" class="btn btn-success">ลงชื่อแล้ว</button> -->
              <button class="btn signed-btn" @click="addInterestedMentor(company.id)">ลงชื่อ</button>
            </td>
            <td v-else-if="company.projectTeacherMentor.userName == ''">
              <div>ไม่มีข้อมูล</div>
            </td>
            <td v-else-if="company.projectTeacherMentor.userName != ''">
              <div>{{ company.projectTeacherMentor.userName }}</div>
            </td>
            <td v-if="company.projectTeacherDirector.userName != '' && this.userProfile.roles == 'Teacher'">
              {{ company.projectTeacherDirector.userName }}
              <button class="btn signed-btn mt-2" @click="addInterestedDirector(company.id)">ลงชื่อสำรอง</button>
            </td>

            <td v-else-if="this.userProfile.roles == 'Teacher'">
              <!-- <button v-if="teacherSigned" @click="removeInterestedMentor(company.id)" class="btn btn-success">ลงชื่อแล้ว</button> -->
              <button class="btn signed-btn" @click="addInterestedDirector(company.id)">ลงชื่อ</button>
            </td>
            <td
              v-else-if="company.projectTeacherDirector.userName == '' && (this.userProfile.roles == 'Student' || this.userProfile.roles == 'Company')">
              <div>ไม่มีข้อมูล</div>
            </td>
            <td
              v-else-if="company.projectTeacherDirector.userName != '' && (this.userProfile.roles == 'Student' || this.userProfile.roles == 'Company')">
              <div>{{ company.projectTeacherDirector.userName }}</div>
            </td>
            <td>
              <select v-if="company.projectTeacherMentor.userName ==  '' "
                @change="chooseProjectMentor($event,company.id)" class="MentorAndDirector">
                <option v-if="company.projectMentorSigned == '' "> ไม่มีข้อมูล </option>
                <option :value="''" v-else-if="company.projectMentorSigned !== '' " disabled selected>
                  เลือกอาจารย์ที่ปรึกษา </option>
                <option v-for="mentor in company.projectMentorSigned" :key="mentor.id" :value="mentor.userId">
                  {{ mentor.userName }} </option>

              </select>
              <select v-if="company.projectTeacherMentor.userName != '' "
                @change="changeProjectMentor($event,company.id)" class="MentorAndDirector">
                <option v-if="company.projectMentorSigned == '' "> ไม่มีข้อมูล </option>
                <option :value="''" v-else-if="company.projectMentorSigned !== '' " disabled selected>
                  {{ company.projectTeacherMentor.userName }} (ปัจจุบัน)</option>
                <option v-for="mentor in company.projectMentorSigned" :key="mentor.id" :value="mentor.userId">
                  {{ mentor.userName }} </option>

              </select>
            </td>
            <td>
              <select v-if="company.projectTeacherDirector.userName == '' "
                @change="chooseProjectDirector($event,company.id)" class="MentorAndDirector">
                <option v-if="company.projectDirectorSigned == '' "> ไม่มีข้อมูล </option>
                <option :value="''" v-else-if="company.projectDirectorSigned !== '' " disabled selected>
                  เลือกกรรมการนิเทศสหกิจ </option>
                <option v-for="mentor in company.projectDirectorSigned" :key="mentor.id" :value="mentor.userId">
                  {{ mentor.userName }} </option>
              </select>
              <select v-if="company.projectTeacherDirector.userName != '' "
                @change="changeProjectDirector($event,company.id)" class="MentorAndDirector">
                <option v-if="company.projectDirectorSigned == '' "> ไม่มีข้อมูล </option>
                <option :value="''" v-else-if="company.projectDirectorSigned !== '' " disabled selected>
                  {{ company.projectTeacherDirector.userName }} (ปัจจุบัน)</option>
                <option v-for="mentor in company.projectDirectorSigned" :key="mentor.id" :value="mentor.userId">
                  {{ mentor.userName }} </option>
              </select>
            </td>
            <td>
                 <router-link :to="{path: `/AdminFileCompany/${company.id}`}"
                    class="text-decoration-none btn btn-secondary">
                    เอกสารแนบ
                  </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import {
    companyCollection,
  } from "@/firebase";
  import {
    getDocs,
    query,
    where,
    doc,
    updateDoc,
    getDoc,
    arrayUnion
  } from 'firebase/firestore'
  import {
    getAuth
  } from '@firebase/auth';
  export default {

    data() {
      return {
        userDoc: '',
        Companys: [],
        userProfile: {
          firstName: '',
          lastName: '',
          email: '',
          roles: ''
        },
        userId: '',
        projectMentorSigned: [],
        projectDirectorSigned: []
      };

    },
    methods: {
      getUserData() {
        this.userProfile.firstName = sessionStorage.getItem("userFirstName");
        this.userProfile.lastName = sessionStorage.getItem("userLastName");
        this.userProfile.email = sessionStorage.getItem("userEmail");
        this.userProfile.roles = sessionStorage.getItem("userRole");
      },
      async fetchCompanyData() {
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
      async addInterestedMentor(companyDataId) {
        const auth = getAuth();
        const user = auth.currentUser;
        let companyRef = doc(companyCollection, companyDataId);
        this.companyDoc = companyRef;
        let company = await getDoc(this.companyDoc);
        let companyData = company.data();
        this.Companys.projectMentor = companyData.projectMentor;
        this.Companys.thaiName = companyData.thaiName;
        this.Companys.projectName = companyData.projectName;
        await updateDoc(companyRef, {
          'projectMentorSigned': arrayUnion({
            'userId': user.uid,
            'userName': this.userProfile.firstName + " " + this.userProfile.lastName
          })
        });
        if (window.confirm("คุณ [ " + this.userProfile.firstName + " " + this.userProfile.lastName +
            " ] ต้องการลงชื่อแสดงความประสงค์เป็นอาจารย์ที่ปรึกษาของ  บริษัท " + "[ " + this.Companys.thaiName + " ]" +
            "  โครงการ : " + "[ " + this.Companys.projectName + " ]" + " ใช่หรือไม่?")) {
          alert("คุณ " + this.userProfile.firstName + " " + this.userProfile.lastName +
            " ลงชื่อแสดงความประสงค์เป็นอาจารย์ที่ปรึกษาของ  บริษัท " + "[ " + this.Companys.thaiName + " ]" +
            "  โครงการ : " + "[ " + this.Companys.projectName + " ]" + " เรียบร้อยแล้ว");
        }

      },
      async addInterestedDirector(companyDataId) {
        const auth = getAuth();
        const user = auth.currentUser;
        let companyRef = doc(companyCollection, companyDataId);
        this.companyDoc = companyRef;
        let company = await getDoc(this.companyDoc);
        let companyData = company.data();
        this.Companys.projectDirector = companyData.projectDirector;
        this.Companys.thaiName = companyData.thaiName;
        this.Companys.projectName = companyData.projectName;
        await updateDoc(companyRef, {
          'projectDirectorSigned': arrayUnion({
            'userId': user.uid,
            'userName': this.userProfile.firstName + " " + this.userProfile.lastName
          })
        });
        if (window.confirm("คุณ : [ " + this.userProfile.firstName + " " + this.userProfile.lastName +
            " ] ต้องการลงชื่อแสดงความประสงค์เป็นกรรมการนิเทศสหกิจของบริษัท : [ " + this.Companys.thaiName + " ]" +
            "  โครงการ : " + "[ " + this.Companys.projectName + " ]" + " ใช่หรือไม่?")) {
          alert("คุณ " + this.userProfile.firstName + " " + this.userProfile.lastName +
            " ลงชื่อแสดงความประสงค์เป็นกรรมการนิเทศสหกิจของ  บริษัท " + "[ " + this.Companys.thaiName + " ]" +
            "  โครงการ : " + "[ " + this.Companys.projectName + " ]" + " เรียบร้อยแล้ว");
        }
      },
      // Choose ProjectMentor for Company //
      async chooseProjectMentor(event, companyDataId) {
        console.log(event.target.value)
        var name = event.target.options[event.target.options.selectedIndex].text
        console.log(name)
        let companyRef = doc(companyCollection, companyDataId);
        this.companyDoc = companyRef;
        let company = await getDoc(this.companyDoc);
        let companyData = company.data();
        if (window.confirm("คุณต้องการเลือกอาจารย์ : [ " + name + " ] เป็นอาจารย์ที่ปรึกษาบริษัท : [ " + companyData
            .thaiName + " ] โครงการ : [ " + companyData.projectName + " ] ใช่หรือไม่")) {
          await updateDoc(companyRef, {
            'projectTeacherMentor.userId': (event.target.value)
          });
          await updateDoc(companyRef, {
            'projectTeacherMentor.userName': (name)
          });
          alert("เลือกให้อาจารย์ : [ " + name + " ] เป็นอาจารย์ที่ปรึกษา : [ " + companyData.thaiName +
            " ] โครงการ : [ " + companyData.projectName + " ] เรียบร้อยแล้ว");
        }
      },
      async changeProjectMentor(event, companyDataId) {
        console.log(event.target.value)
        var name = event.target.options[event.target.options.selectedIndex].text
        console.log(name)
        let companyRef = doc(companyCollection, companyDataId);
        this.companyDoc = companyRef;
        let company = await getDoc(this.companyDoc);
        let companyData = company.data();
        if (window.confirm("คุณต้องการเปลี่ยนให้อาจารย์ : [ " + name + " ] เป็นอาจารย์ที่ปรึกษาบริษัท : [ " +
            companyData.thaiName + " ] โครงการ : [ " + companyData.projectName + " แทนอาจารย์ : [ " + companyData
            .projectTeacherMentor.userName + " ] ใช่หรือไม่")) {
          await updateDoc(companyRef, {
            'projectTeacherMentor.userId': (event.target.value)
          });
          await updateDoc(companyRef, {
            'projectTeacherMentor.userName': (name)
          });
          alert("เลือกให้อาจารย์ : [ " + name + " ] เป็นอาจารย์ที่ปรึกษา : [ " + companyData.thaiName +
            " ] โครงการ : [ " + companyData.projectName + " ] เรียบร้อยแล้ว");
          this.$router.push("/AdminCompany");

        }
      },
      // Choose ProjectDirector for Company //
      async chooseProjectDirector(event, companyDataId) {
        console.log(event.target.value)
        var name = event.target.options[event.target.options.selectedIndex].text
        console.log(name)
        let companyRef = doc(companyCollection, companyDataId);
        this.companyDoc = companyRef;
        let company = await getDoc(this.companyDoc);
        let companyData = company.data();
        if (window.confirm("คุณต้องการเลือกอาจารย์ : [ " + name + " ] เป็นกรรมการนิเทศสหกิจ : [ " + companyData
            .thaiName + " ] โครงการ : [ " + companyData.projectName + " ] ใช่หรือไม่")) {
          await updateDoc(companyRef, {
            'projectTeacherDirector.userId': (event.target.value)
          });
          await updateDoc(companyRef, {
            'projectTeacherDirector.userName': (name)
          });
          alert("เลือกให้อาจารย์ : [ " + name + " ] เป็นกรรมการนิเทศสหกิจ : [ " + companyData.thaiName +
            " ] โครงการ : [ " + companyData.projectName + " ] เรียบร้อยแล้ว");
          this.$router.push("/AdminCompany");
        }
      },
      async changeProjectDirector(event, companyDataId) {
        console.log(event.target.value)
        var name = event.target.options[event.target.options.selectedIndex].text
        console.log(name)
        let companyRef = doc(companyCollection, companyDataId);
        this.companyDoc = companyRef;
        let company = await getDoc(this.companyDoc);
        let companyData = company.data();
        if (window.confirm("คุณต้องการเปลี่ยนให้อาจารย์ : [ " + name + " ] เป็นกรรมการนิเทศที่บริษัท : [ " +
            companyData.thaiName + " ] โครงการ : [ " + companyData.projectName + " แทนอาจารย์ : [ " + companyData
            .projectTeacherMentor.userName + " ] ใช่หรือไม่")) {
          await updateDoc(companyRef, {
            'projectTeacherDirector.userId': (event.target.value)
          });
          await updateDoc(companyRef, {
            'projectTeacherDirector.userName': (name)
          });
          alert("เลือกให้อาจารย์ : [ " + name + " ] เป็นกรรมการนิเทศ : [ " + companyData.thaiName +
            " ] โครงการ : [ " + companyData.projectName + " ] เรียบร้อยแล้ว");
        }
      },
    },
    created() {
      this.fetchCompanyData();
      this.getUserData()
    },
  }
</script>

<style scoped>
  .MentorAndDirector {
    max-width: 250px;
  }

  .btn {
    width: 7rem;
    justify-content: center;
    margin: 0.07rem;
    margin-right: auto;
    margin-left: auto;
    text-align: center;
    display: flex;
    margin-bottom: 0.3rem;
  }

  .signed-btn {
    width: 7rem;
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

  .signed-btn:hover {
    width: 7rem;
    justify-content: center;
    margin: 0.07rem;
    text-align: center;
    display: flex;
    margin-right: auto;
    margin-left: auto;
    margin-bottom: 0.3rem;
    background: #e6571a;
    border: 2px solid #e6571a;
  }

  th,
  tr,
  td,
  th {
    text-align: center;
    justify-content: center;
  }

  table {
    justify-content: center;
    animation: expandRight 0.8s ease-in-out 0s;
    text-align: center;
  }


  tbody {
    margin-left: 0;
    justify-content: center;

  }

  #button {
    margin-right: 5px;

  }

  .clm {
    border: 0.2rem solid #FF6E30;
    border-radius: 10px;
    color: white;
  }

  .formtitle-1 {
    margin-bottom: 1rem;
    margin-top: -2vh;
    margin-left: 0;
    margin-left: 2%;
    width: 300px;
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
    animation: expandLeft 0.8s ease-in-out 0s;
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

  @keyframes expandRight {
    0% {
      transform: translateX(800px);
    }

    100% {
      transform: translateX(0px);
    }
  }

  @keyframes expandLeft {
    0% {
      transform: translateX(-500px);
    }

    100% {
      transform: translateX(0px);
    }
  }

  .filter-option {
    display: inline-flex;
    margin-left: 1vh;
    border-radius: 10px;
    animation: fadeInOpacity 0.8s ease-in-out;
  }

  .sidebar {
    padding: 0;
    width: 100%;
    max-width: 200px;
    background-color: #f1f1f1;
    height: auto;
    overflow: auto;
    transition: 0.3s;
    animation: fadeInOpacity 0.5s ease-in-out 0s;
  }

  @keyframes fadeInOpacity {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  /* Sidebar links */
  .sidebar a {
    display: block;
    color: black;
    padding: 16px;
    text-decoration: none;
    transition: 0.3s;
  }

  /* Active/current link */
  .sidebar a.active {
    background-color: #FF6E30;
    color: white;
  }

  /* Links on mouse-over */
  .sidebar a:hover:not(.active) {
    background-color: rgb(85, 85, 85);
    color: white;
  }

  /* Page content. The value of the margin-left property should match the value of the sidebar's width property */

  /* On screens that are less than 700px wide, make the sidebar into a topbar */
  @media screen and (max-width: 700px) {
    .sidebar {
      width: 100%;
      height: auto;
      position: relative;
    }

    .sidebar a {
      float: left;
    }

    div.content {
      margin-left: 0;
    }
  }

  /* On screens that are less than 400px, display the bar vertically, instead of horizontally */
  @media screen and (max-width: 400px) {
    .sidebar a {
      text-align: center;
      float: none;
    }
  }

  @media only screen and (min-width: 768px) {
    /* For desktop: */
  }
</style>