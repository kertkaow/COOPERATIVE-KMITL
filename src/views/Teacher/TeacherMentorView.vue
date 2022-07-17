<template>
<div v-if="loading">
<LoadingComponent />
</div>
  <!-- The sidebar -->
  <div v-else class="row">
    <div class="col col-2" style="margin-top:60px;max-width: 220px;">
      <div class="sidebar">
        <a href="/AllMatchingView">โครงการสหกิจทั้งหมด</a>
        <a href="/TeacherMentorView" style="background-color: #FF6E30;color:#FFFF">อาจารย์ที่ปรึกษา</a>
        <a href="/TeacherDirectorView">กรรมการนิเทศ</a>
      </div>
    </div>
    <div class="col-10">
      <!-- Display Student Content -->
      <div class="d-flex head-container">
        <h1 class="mb-4 formtitle-1">ข้อมูลสหกิจที่เป็น [ อาจารย์ที่ปรึกษา ]</h1>
      </div>
      <div class="row">
        <div class="col-md-12">
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
              <tr v-for="MatchingMentor in MatchingsMentor" :key="MatchingMentor.id">
                <td>
                  <router-link :to="{ path: `/MatchingDetails/${MatchingMentor.id}` }"
                    class="text-decoration-none btn btn-primary" style="color:white;">
                    ข้อมูลสหกิจ
                  </router-link>
                </td>
                <td>{{ MatchingMentor.studentData.studentID }}</td>
                <td>{{ MatchingMentor.studentData.firstName }}</td>
                <td>{{ MatchingMentor.studentData.lastName }}</td>
                <td>{{ MatchingMentor.companyData.thaiName }}</td>
                <td>{{ MatchingMentor.companyData.projectName }}</td>
                <td>{{ MatchingMentor.companyData.projectName }}</td>
                <td>{{ MatchingMentor.companyData.projectTeacherMentor.userName }}</td>
                <td>{{ MatchingMentor.companyData.projectTeacherDirector.userName }}</td>
                <td>{{ MatchingMentor.cooperativeStatus.projectStatusNow }}</td>
                <td>
                  <router-link :to="{ path: `/MentorWatchMemo/${MatchingMentor.id}` }"
                    class="text-decoration-none btn btn-primary" style="color:white;">
                    ดู Memo
                  </router-link>
                </td>
                <td>{{ MatchingMentor.companyData.workLocation }}</td>
                <td>{{ MatchingMentor.cooperativeStatus.projectExamdate }}</td>
                <td>{{ MatchingMentor.cooperativeStatus.projectStatus }}</td>
                <td>
                  <router-link :to="{ path: `/EditMatchingDetails/${MatchingMentor.id}` }"
                    class="text-decoration-none btn edit-btn" style="color:white;">
                    อัพเดต
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import LoadingComponent from "../LoadingComponent.vue";
  import {
    matchingCollection
  } from "@/firebase";
  import {
    getDocs,
    query,
    where,
  } from "firebase/firestore";
  export default {
    components: { 
      // ExportComponent,
      LoadingComponent
    },
    data() {
      return {
        loading:true,
        MatchingsMentor: [],
      };
    },
    methods: {
      async fetchMatchingMentorByUserId() {
        const userId = sessionStorage.getItem("userId")
        const getMatchingDataByStudentUserId = query(matchingCollection, where(
          "companyData.projectTeacherMentor.userId", "==", userId));
        const matchingSnapShot = await getDocs(getMatchingDataByStudentUserId);
        let MatchingsMentor = [];
        matchingSnapShot.forEach((matching) => {
          let matchingData = matching.data();
          matchingData.id = matching.id;
          MatchingsMentor.push(matchingData);
        });
        this.MatchingsMentor = MatchingsMentor;
        console.log(MatchingsMentor)
      },
      async fetchMatchingDirectorByUserId() {
        const userId = sessionStorage.getItem("userId")
        const getMatchingDataByStudentUserId = query(matchingCollection, where(
          "companyData.projectTeacherDirector.userId", "==", userId));
        const matchingSnapShot = await getDocs(getMatchingDataByStudentUserId);
        let MatchingsDirector = [];
        matchingSnapShot.forEach((matching) => {
          let matchingData = matching.data();
          matchingData.id = matching.id;
          MatchingsDirector.push(matchingData);
        });
        this.MatchingsDirector = MatchingsDirector;
        console.log(MatchingsDirector)
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
        }, 1000)
      },
    },
    created() {
      this.settimeOut();
      this.fetchMatchingMentorByUserId();
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
    width: 1200px
  }

  table {
    margin-left: 0;
    display: inline-block;
    justify-content: center;
                   animation: fade 0.3s ease-in-out 0s;


    text-align: right;
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
    width: auto;
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