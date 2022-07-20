<template>
  <div v-if="loading">
    <LoadingComponent />
  </div>
  <!-- The sidebar -->
  <div v-else class="row">
    <div class="col col-2" style="margin-top:64px;max-width: 220px;">
      <div class="sidebar">
        <a href="/AdminCompany">เเบ่งกลุ่มตามโครงการ/อนุมัติสิทธิ์</a>
        <a href="/AllCompanyView">เเสดงความประสงค์ที่ปรึกษา/กรรมการนิเทศสหกิจ</a>
        <a href="/AdminStudent">บันทึกผลการสัมภาษณ์</a>
        <a href="/AdminMatching" style="background:#FF6E30;color:white">สหกิจศึกษา</a>
      </div>
    </div>


    <div class="col col-10">
      <!-- Display Student Content -->
      <h1 class="mb-4 formtitle-1">ข้อมูลสหกิจทั้งหมด (Admin)</h1>
      <select class="mb-3 filter-option" @change="selectedOption($event)">
        <option value="orderByStudentID">รหัสนักศึกษา</option>
        <option value="orderByStudentName">ชื่อนักศึกษา</option>
        <option value="orderByCompanyNameName">บริษัท</option>
        <option value="orderByProject">โครงการ</option>
        <option value="orderByMentor">อาจารย์ที่ปรึกษา</option>
        <option value="orderByDirector">กรรมการนิเทศ</option>
      </select>
      <table class="table table-hover">
        <thead class="table table-striped thead-light clm" style="background-color: #FF6E30">
          <tr>
            <th>รายละเอียด</th>
            <th>รหัสนักศึกษา</th>
            <th>ชื่อ</th>
            <th>นามสกุล</th>
            <th>ชื่อบริษัท</th>
            <th>ตำแหน่งงาน</th>
            <th>โครงการ</th>
            <th>อาจารย์ที่ปรึกษา</th>
            <th>กรรมการนิเทศสหกิจ</th>
            <th>สถานะปัจจุบัน</th>
            <th>Memo</th>
            <th>สถานที่ฝึกงาน</th>
            <th>นัดสอบโปรเจค</th>
            <th>สถานะ</th>
            <th>จัดการ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="Matching in Matchings" :key="Matching.id">
            <td>
              <router-link :to="{ path: `/MatchingDetails/${Matching.id}` }"
                class="text-decoration-none btn btn-primary" style="color:white;" id="button">
                ข้อมูลสหกิจ
              </router-link>
            </td>
            <td>{{ Matching.studentData.studentID }}</td>
            <td>{{ Matching.studentData.firstName }}</td>
            <td>{{ Matching.studentData.lastName }}</td>
            <td>{{ Matching.companyData.thaiName }}</td>
            <td>{{ Matching.companyData.projectName }}</td>
            <td>{{ Matching.companyData.projectName }}</td>
            <td>{{ Matching.companyData.projectTeacherMentor.userName }}</td>
            <td>{{ Matching.companyData.projectTeacherDirector.userName }}</td>
            <td>{{ Matching.cooperativeStatus.projectStatusNow }}</td>
            <td>
              <router-link :to="{ path: `/AdminWatchMemo/${Matching.id}` }" class="text-decoration-none btn btn-primary"
                style="color:white;">
                ดู Memo
              </router-link>
            </td>
            <td>{{ Matching.companyData.workLocation }}</td>
            <td>{{ Matching.cooperativeStatus.projectExamdate }}</td>
            <td>{{ Matching.cooperativeStatus.projectStatus }}</td>


            <td>
              <router-link :to="{ path: `/EditMatchingDetails/${Matching.id}` }"
                class="text-decoration-none btn edit-btn" style="color:white;">
                อัพเดต
              </router-link>

              <button @click.prevent="deleteMatchingData(
                                      Matching.id,
                                      Matching.studentData.studentID,
                                      Matching.studentData.firstName,
                                      Matching.studentData.lastName,
                                      Matching.companyData.thaiName,
                                      Matching.companyData.projectName)" class="btn btn-danger approve-delete-btn ">
                ลบข้อมูล
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import LoadingComponent from "../LoadingComponent.vue"
  import {
    matchingCollection,
    studentCollection
  } from "@/firebase";
  import {
    getDocs,
    doc,
    deleteDoc,
    query,
    updateDoc,
    orderBy
  } from "firebase/firestore";

  export default {
    components: {
      // ExportComponent,
      LoadingComponent
    },
    data() {
      return {
        loading: true,
        selectOption: 'orderByStudentID',
        Matchings: [],
        MatchingsStudentID: [],
        MatchingsStudentName: [],
        MatchingsCompanyName: [],
        MatchingsMentor: [],
        MatchingsDirector: [],
      }
    },
    methods: {
      async fetchMatching() {
        const getMatchingDataByStudentUserId = query(matchingCollection, orderBy("studentData.studentID", "asc"));
        const matchingSnapShot = await getDocs(getMatchingDataByStudentUserId);
        let MatchingsStudentID = [];
        matchingSnapShot.forEach((matching) => {
          let matchingData = matching.data();
          matchingData.id = matching.id;
          MatchingsStudentID.push(matchingData);
        });
        this.Matchings = MatchingsStudentID;
        this.MatchingsStudentID = MatchingsStudentID;


        const orderByUserFirstName = query(matchingCollection, orderBy("studentData.firstName", "asc"))
        const studentDateSnapShot = await getDocs(orderByUserFirstName);
        let MatchingsStudentName = [];
        studentDateSnapShot.forEach((student) => {
          let studentData = student.data();
          studentData.id = student.id;
          MatchingsStudentName.push(studentData);
        });
        this.MatchingsStudentName = MatchingsStudentName;

        const orderByMentor = query(matchingCollection, orderBy("companyData.projectTeacherMentor.userName", "asc"))
        const studentMentorSnapShot = await getDocs(orderByMentor);
        let MatchingsMentor = [];
        studentMentorSnapShot.forEach((student) => {
          let studentData = student.data();
          studentData.id = student.id;
          MatchingsMentor.push(studentData);
        });
        this.MatchingsMentor = MatchingsMentor;

        const orderByDirector = query(matchingCollection, orderBy("companyData.projectTeacherDirector.userName",
          "asc"))
        const studentDirectorSnapShot = await getDocs(orderByDirector);
        let MatchingsDirector = [];
        studentDirectorSnapShot.forEach((student) => {
          let studentData = student.data();
          studentData.id = student.id;
          MatchingsDirector.push(studentData);
        });
        this.MatchingsDirector = MatchingsDirector;

        const orderByCompanyName = query(matchingCollection, orderBy("companyData.projectTeacherDirector.userName",
          "asc"))
        const companyNameSnapShot = await getDocs(orderByCompanyName);
        let MatchingsCompanyName = [];
        companyNameSnapShot.forEach((student) => {
          let studentData = student.data();
          studentData.id = student.id;
          MatchingsCompanyName.push(studentData);
        });
        this.MatchingsCompanyName = MatchingsCompanyName;

        const orderByProject = query(matchingCollection, orderBy("companyData.projectName", "asc"))
        const projectNameSnapShot = await getDocs(orderByProject);
        let MatchingsProject = [];
        projectNameSnapShot.forEach((student) => {
          let studentData = student.data();
          studentData.id = student.id;
          MatchingsProject.push(studentData);
        });
        this.MatchingsProject = MatchingsProject;
      },
      async deleteMatchingData(matchingDataId, studentID, firstName, lastName, companyName, projectName) {
        if (window.confirm("ต้องการลบข้อมูลสหกิจของ : [ " + firstName + " " + lastName + "  (" + studentID + ") ] " +
            " บริษัท : [ " + companyName + " ] " + "โครงการ : [ " + projectName + " ] " + "ใช่หรือไม่?")) {
          let matchingRef = doc(matchingCollection, matchingDataId);
          await deleteDoc(matchingRef);
          let studentRef = doc(studentCollection, matchingDataId);
          await updateDoc(studentRef, {
            gotCompany: false,
            companyConfirm: false
          })
             this.$toast.success("ลบข้อมูลสำเร็จ", {
        timeout: 2500,
        position:'top-right',
          })
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
          }, 1000)
          this.fetchMatching();
        }
      },
      selectedOption(event) {
        this.selectOption = event.target.value;
        if (this.selectOption == 'orderByStudentID' || this.selectOption == '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
          }, 1000)
          this.Matchings = this.MatchingsStudentID
        } else if (this.selectOption == 'orderByStudentName') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
          }, 1000)
          this.Matchings = this.MatchingsStudentName
        } else if (this.selectOption == 'orderByCompanyName') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
          }, 1000)
          this.Matchings = this.MatchingsCompanyName
        } else if (this.selectOption == 'orderByMentor') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
          }, 1000)
          this.Matchings = this.MatchingsMentor
        } else if (this.selectOption == 'orderByDirector') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
          }, 1000)
          this.Matchings = this.MatchingsDirector
        } else if (this.selectOption == 'orderByProject') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
          }, 1000)
          this.Matchings = this.MatchingsProject
        }

      },
      settimeOut() {
        setTimeout(() => {
          this.loading = false;
        }, 1000)
      },
      checkRole() {
        const userRole = sessionStorage.getItem("userRole")
        if (userRole != 'Teacher') {
           this.$toast.error("คุณไม่มีสิทธิ์เข้าถึง", {
        timeout: 2500,
        position:'top-right',
          })
          this.$router.push("/")
        }
      }
    },
    created() {
      this.settimeOut();
      this.fetchMatching();
      this.checkRole();
    },

  };
</script>


<style scoped>
  .btn {
    margin-right: 0;
    margin-left: 0;
    width: 7rem;
    justify-content: center;
    margin-left: 0;
    margin-right: 0;
    margin: 0.07rem;
    text-align: center;
    margin-bottom: 0.3rem;
  }

  .edit-btn {
    display: flex;
    width: 7rem;
    justify-content: center;
    margin: 0.07rem;
    margin-right: auto;
    margin-left: auto;
    text-align: center;
    margin-bottom: 0.3rem;
    background: #FF6E30;
    border: 2px solid #FF6E30;
    color: white;
  }

  .edit-btn:hover {
    display: flex;
    width: 7rem;
    justify-content: center;
    margin: 0.07rem;
    margin-right: auto;
    margin-left: auto;
    text-align: center;
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
    margin-left: 0;
    display: inline-block;
    justify-content: center;
    animation: fade 0.3s ease-in-out 0s;

    text-align: right;
  }

  @keyframes fade {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 100;
    }

  }

  tbody {
    margin-left: 0;
    justify-content: center;
  }

  #button {
    margin-right: 0.5px;

  }

  .addData-btn {
    width: 7rem;
    justify-content: center;
    margin: 0.07rem;
    text-align: center;
    display: flex;
    margin-bottom: 0.3rem;
    background: #FF6E30;
    border: 2px solid #FF6E30;
    color: white;
  }

  .addData-btn:hover {
    width: 7rem;
    justify-content: center;
    margin: 0.07rem;
    text-align: center;
    display: flex;
    margin-bottom: 0.3rem;
    background: #e6571a;
    border: 2px solid #e6571a;
  }

  .clm {
    border: 0.2rem solid #FF6E30;
    border-radius: 10px;
    color: white;
  }

  td {
    justify-content: center;
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


  .formtitle-1 {
    margin-bottom: 1rem;
    margin-top: -2vh;
    margin-left: 0;
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
    animation: fade 0.3s ease-in-out 0s;

    -webkit-user-select: none;

  }

  .result-btn-wait {
    margin-top: 0.7rem;
    margin-right: auto;
    margin-left: auto;
    width: 8rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    background-color: #FF6E30;
    border: 0;
    border-radius: 5px;
    color: white;
    border: 2px solid #FF6E30;
    font-family: system-ui, -apple-system, system-ui, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif;
    font-size: 18px;
    font-weight: 300;
    outline: 0;
    position: relative;
    text-align: center;
    transition: all .3s;
    user-select: none;
    -webkit-user-select: none;
  }

  .result-btn-pass {
    margin-top: 0.7rem;
    margin-right: auto;
    margin-left: auto;
    width: 8rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    background-color: #4CAF50;
    border: 0;
    border-radius: 5px;
    color: white;
    border: px solid #4CAF50;
    font-family: system-ui, -apple-system, system-ui, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif;
    font-size: 20px;
    font-weight: 100;
    outline: 0;
    position: relative;
    text-align: center;
    transition: all .3s;
    user-select: none;
  }

  .result-btn-not-pass {
    margin-top: 0.7rem;
    margin-right: auto;
    margin-left: auto;
    width: 8rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    background-color: #f44336;
    border-radius: 5px;
    color: white;
    border: 2px solid #f44336;
    font-family: system-ui, -apple-system, system-ui, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif;
    font-size: 20px;
    font-weight: 100;
    outline: 0;
    text-align: center;
    transition: all .3s;
    user-select: none;
    -webkit-user-select: none;
  }



  .filter-option {
    display: inline-flex;
    margin-left: 1vh;
    border-radius: 10px;
    width: 25vh;
    animation: fade 0.3s ease-in-out 0s;

  }

  .sidebar {
    padding: 0;
    width: 100%;
    max-width: 200px;
    background-color: #f1f1f1;
    height: auto;
    overflow: auto;
    transition: 0.3s;
    animation: fade 0.3s ease-in-out 0s;

  }

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

  @keyframes fadeInOpacity {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
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

  /* Sidebar links */


  /* Page content. The value of the margin-left property should match the value of the sidebar's width property */

  /* On screens that are less than 700px wide, make the sidebar into a topbar */
  @media screen and (max-width: 700px) {
    .sidebar {
      width: 100%;
      height: auto;
      position: relative;
    }
  }

  /* On screens that are less than 400px, display the bar vertically, instead of horizontally */
  @media screen and (max-width: 400px) {
    .sidebar a {
      text-align: center;
      float: none;
    }
  }
</style>